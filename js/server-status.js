/**
 * 服务器状态检查脚本
 */
(function() {
  'use strict';
  
  // 服务器 IP 和端口
  let SERVER_IP = 'mc.hypixel.net';
  
  // API 端点（可以使用 Minecraft 服务器 API 服务）
  let API_URL = `https://api.mcsrvstat.us/2/${SERVER_IP}`;
  
  // DOM 元素
  let statusDot;
  let statusText;
  let playerCount;
  let serverVersion;
  let serverLatency;
  let playerNames;
  
  // 初始化
  document.addEventListener('DOMContentLoaded', function() {
    statusDot = document.querySelector('.status-dot');
    statusText = document.querySelector('.status-text');
    playerCount = document.getElementById('playerCount');
    serverVersion = document.getElementById('serverVersion');
    serverLatency = document.getElementById('serverLatency');
    playerNames = document.getElementById('playerNames');
    const statusContainer = document.getElementById('serverStatus');
    if (statusContainer && statusContainer.dataset.serverIp) {
      SERVER_IP = statusContainer.dataset.serverIp;
      API_URL = `https://api.mcsrvstat.us/2/${SERVER_IP}`;
    }
    
    // 检查服务器状态
    checkServerStatus();
    
    // 每 5 分钟刷新一次
    setInterval(checkServerStatus, 5 * 60 * 1000);
  });
  
  /**
   * 检查服务器状态
   */
  function checkServerStatus() {
    const statusContainer = document.getElementById('serverStatus');
    const host = (statusContainer && statusContainer.dataset.serverIp) ? statusContainer.dataset.serverIp : SERVER_IP;
    const port = (statusContainer && statusContainer.dataset.serverPort) ? statusContainer.dataset.serverPort : '';
    const primaryUrl = `https://api.mcsrvstat.us/2/${host}${port ? ':' + port : ''}`;

    const t0 = performance.now();
    fetch(primaryUrl)
      .then(r => {
        const t1 = performance.now();
        return r.json().then(data => ({ data, latencyMs: Math.round(t1 - t0) }));
      })
      .then(({ data, latencyMs }) => {
        if (data && data.online) {
          updateStatusUI(data, latencyMs);
        } else {
          const fallbackUrl = `https://api.mcstatus.io/v2/status/java/${host}${port ? ':' + port : ''}`;
          const t2 = performance.now();
          return fetch(fallbackUrl)
            .then(r => {
              const t3 = performance.now();
              return r.json().then(fallback => ({ fallback, latencyMs: Math.round(t3 - t2) }));
            })
            .then(({ fallback, latencyMs }) => updateStatusUI(fallback, latencyMs))
            .catch(err => {
              console.error('服务器状态检查失败(备用):', err);
              setOfflineStatus();
            });
        }
      })
      .catch(error => {
        console.error('服务器状态检查失败:', error);
        setOfflineStatus();
      });
  }
  
  function updatePlayerNamesFromQuery(host, port) {
    const tryMcsrv = `https://api.mcsrvstat.us/query/${host}${port ? ':' + port : ''}`;
    const tryMcstatus = `https://api.mcstatus.io/v2/query/${host}${port ? ':' + port : ''}`;
    const parse = (data) => {
      const players = data && (data.players || data?.players);
      let list = null;
      if (players) {
        if (Array.isArray(players.list)) list = players.list;
        else if (Array.isArray(players.sample)) list = players.sample;
      }
      if (!list || !list.length) return null;
      return list.map(p => {
        if (typeof p === 'string') return p;
        if (p && typeof p === 'object') return p.name_clean || p.name_raw || p.name || p.player || p.id || p.uuid || '';
        return '';
      }).filter(Boolean);
    };
    fetch(tryMcsrv).then(r => r.json()).then(d => {
      const names = parse(d);
      if (names && names.length && playerNames) {
        playerNames.textContent = names.join(', ');
        return;
      }
      return fetch(tryMcstatus).then(r => r.json()).then(dd => {
        const names2 = parse(dd);
        if (names2 && names2.length && playerNames) {
          playerNames.textContent = names2.join(', ');
        }
      }).catch(() => {});
    }).catch(() => {
      fetch(tryMcstatus).then(r => r.json()).then(dd => {
        const names2 = parse(dd);
        if (names2 && names2.length && playerNames) {
          playerNames.textContent = names2.join(', ');
        }
      }).catch(() => {});
    });
  }

  /**
   * 更新状态 UI
   */
  function updateStatusUI(data, latencyMs) {
    const isOnline = !!(data && (typeof data.online !== 'undefined' ? data.online : true));
    if (!isOnline) {
      setOfflineStatus();
      return;
    }

    statusDot.classList.remove('offline');
    statusDot.classList.add('online');
    statusText.textContent = '在线';
    statusText.classList.remove('text-danger');
    statusText.classList.add('text-success');

    const players = data.players || data?.players;
    if (players && typeof players.online !== 'undefined' && typeof players.max !== 'undefined') {
      playerCount.textContent = `${players.online} / ${players.max}`;
    } else if (Array.isArray(players?.list)) {
      playerCount.textContent = `${players.list.length}`;
    } else {
      playerCount.textContent = '-';
    }

    let namesText = '-';
    let list = null;
    if (players) {
      if (Array.isArray(players.list)) list = players.list;
      else if (Array.isArray(players.sample)) list = players.sample;
    }
    if (Array.isArray(list) && list.length > 0) {
      const names = list.map(p => {
        if (typeof p === 'string') return p;
        if (p && typeof p === 'object') return p.name_clean || p.name_raw || p.name || p.player || p.id || p.uuid || '';
        return '';
      }).filter(Boolean);
      namesText = names.length ? names.join(', ') : '-';
    }
    if (playerNames) playerNames.textContent = namesText;

    if (namesText === '-' && players && typeof players.online === 'number' && players.online > 0) {
      const statusContainer = document.getElementById('serverStatus');
      const host = (statusContainer && statusContainer.dataset.serverIp) ? statusContainer.dataset.serverIp : SERVER_IP;
      const port = (statusContainer && statusContainer.dataset.serverPort) ? statusContainer.dataset.serverPort : '';
      updatePlayerNamesFromQuery(host, port);
    }

    const v = data.version;
    if (v && typeof v === 'object') {
      serverVersion.textContent = v.name_clean || v.name || '-';
    } else if (typeof v === 'string') {
      serverVersion.textContent = v;
    } else {
      serverVersion.textContent = '-';
    }

    let latencyDisplay = '-';
    let latencyVal;
    if (typeof latencyMs === 'number' && isFinite(latencyMs)) {
      latencyVal = Math.max(0, Math.round(latencyMs));
      latencyDisplay = `${latencyVal} ms`;
    } else if (typeof data.latency === 'number') {
      latencyVal = Math.round(data.latency);
      latencyDisplay = `${latencyVal} ms`;
    }
    if (serverLatency) {
      serverLatency.textContent = latencyDisplay;
      serverLatency.classList.remove('text-success', 'text-warning', 'text-danger');
      if (typeof latencyVal === 'number') {
        if (latencyVal >= 1 && latencyVal <= 60) {
          serverLatency.classList.add('text-success');
        } else if (latencyVal >= 70 && latencyVal <= 200) {
          serverLatency.classList.add('text-warning');
        } else if (latencyVal >= 210) {
          serverLatency.classList.add('text-danger');
        }
      }
    }


  }
  
  /**
   * 设置离线状态
   */
  function setOfflineStatus() {
    statusDot.classList.remove('online');
    statusDot.classList.add('offline');
    statusText.textContent = '离线';
    statusText.classList.remove('text-success');
    statusText.classList.add('text-danger');
    if (playerCount) playerCount.textContent = '-';
    if (serverVersion) serverVersion.textContent = '-';
    if (serverLatency) {
      serverLatency.classList.remove('text-success', 'text-warning', 'text-danger');
      serverLatency.textContent = '-';
    }
    if (playerNames) playerNames.textContent = '-';
  }
})();