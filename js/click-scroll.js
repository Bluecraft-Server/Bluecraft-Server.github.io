$(document).ready(function(){
  // 初始化导航高亮
  $('.navbar-nav .nav-item .nav-link:link').addClass('inactive');    
  $('.navbar-nav .nav-item .nav-link').eq(0).addClass('active');
  $('.navbar-nav .nav-item .nav-link:link').eq(0).removeClass('inactive');

  // 定义section数组
  var sectionArray = [1, 2, 3, 4, 5, 6];
  var hasInteracted = false; // 用于跟踪用户是否已经与页面交互

  // 为每个section绑定滚动事件和点击事件
  $.each(sectionArray, function(index, value){
      var $section = $('#' + 'section_' + value);

      // 滚动事件，用于导航高亮
      $(document).scroll(function(){
          var offsetSection = $section.offset().top - 83;
          var docScroll = $(document).scrollTop();
          
          if (docScroll >= offsetSection && !hasInteracted) {
              hasInteracted = true; // 标记用户已经与页面交互
              $('.navbar-nav .nav-item .nav-link').removeClass('active');
              $('.navbar-nav .nav-item .nav-link:link').addClass('inactive');  
              $('.navbar-nav .nav-item .nav-link').eq(index).addClass('active');
              $('.navbar-nav .nav-item .nav-link').eq(index).removeClass('inactive');
              startMusic(); // 触发音乐播放
          }
      });

      // 点击事件，用于平滑滚动到指定section
      $('.click-scroll').eq(index).click(function(e){
          var offsetClick = $section.offset().top - 83;
          e.preventDefault();
          $('html, body').animate({
              'scrollTop': offsetClick
          }, 300, function() {
              // 动画完成后，如果尚未交互，则播放音乐
              if (!hasInteracted) {
                  startMusic();
                  hasInteracted = true;
              }
          });
      });
  });
});

// 音乐播放控制
function startMusic() {
  var music = document.getElementById("bg-music");
  if (music.paused) {
      music.play().catch(function() {
          console.log("自动播放被阻止，显示播放按钮提示");
      });
  }
}

// 绑定点击事件，首次点击页面任何地方触发音乐播放
$(document).one('click', function(event) {
  if (!hasInteracted) {
      startMusic();
      hasInteracted = true;
  }
});

// 绑定滚动事件，首次滚动页面触发音乐播放
$(window).one('scroll', function() {
  if (!hasInteracted) {
      startMusic();
      hasInteracted = true;
  }
});

document.addEventListener("DOMContentLoaded", function() {
  var music = document.getElementById("bg-music");
  var control = document.getElementById("audio-control");
  var nextSongBtn = document.getElementById("next-song");
  var prevSongBtn = document.getElementById("prev-song");

  // 移除自动播放属性
  music.autoplay = false;
  music.loop = true; // 设置音乐循环播放

  // 初始音量设置
  music.volume = 0;
  setTimeout(function() {
      music.volume = 0.4; // 设置初始音量
  }, 500); // 1秒后音量增加到40%

  // 音乐播放/暂停切换
  control.addEventListener("click", function() {
      if (music.paused) {
          music.play();
          control.classList.remove("mute");
          control.setAttribute("data-hover-text", "关闭背景音乐");
      } else {
          music.pause();
          control.classList.add("mute");
          control.setAttribute("data-hover-text", "开启背景音乐");
      }
  });

  // 音乐下一首切换
  nextSongBtn.addEventListener("click", function() {
      var sources = music.getElementsByTagName("source");
      var currentSource = music.currentSrc;
      var nextIndex = Array.from(sources).findIndex(source => source.src === currentSource) + 1;
      if (nextIndex < sources.length) {
          music.src = sources[nextIndex].src;
          music.load();
          music.play();
      }
  });

  // 音乐上一首切换
  prevSongBtn.addEventListener("click", function() {
      var sources = music.getElementsByTagName("source");
      var currentSource = music.currentSrc;
      var prevIndex = Array.from(sources).findIndex(source => source.src === currentSource) - 1;
      if (prevIndex >= 0) {
          music.src = sources[prevIndex].src;
          music.load();
          music.play();
      }
  });

  // 监听音乐播放错误
  music.addEventListener('error', function(e) {
      console.error('Media error:', e);
      // 错误处理逻辑
  });
});