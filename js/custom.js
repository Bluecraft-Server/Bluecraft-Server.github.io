(function ($) {

    "use strict";

    // MENU
    $('.navbar-collapse a').on('click', function () {
        $(".navbar-collapse").collapse('hide');
    });

    // CUSTOM LINK
    $('.smoothscroll').click(function () {
        var el = $(this).attr('href');
        var elWrapped = $(el);
        var header_height = $('.navbar').height();

        scrollToDiv(elWrapped, header_height);
        return false;

        function scrollToDiv(element, navheight) {
            var offset = element.offset();
            var offsetTop = offset.top;
            var totalScroll = offsetTop - navheight;

            $('body,html').animate({
                scrollTop: totalScroll
            }, 300);
        }
    });

})(window.jQuery);

document.addEventListener('DOMContentLoaded', function() {
  if (window.gsap) {
    if (window.ScrollTrigger) { gsap.registerPlugin(ScrollTrigger); }

    gsap.from('.site-header', {opacity: 0, y: -20, duration: 0.6, ease: 'power2.out'});
    gsap.from('.navbar', {opacity: 0, y: -20, duration: 0.6, ease: 'power2.out', delay: 0.05});

    const heroTl = gsap.timeline({defaults: {immediateRender: false}});
    heroTl
      .from('.hero-section small', {opacity: 0, y: 10, duration: 0.5, ease: 'power2.out'})
      .from('.hero-section h1', {opacity: 0, y: 20, duration: 0.8, ease: 'power2.out'}, '-=0.2')
      .from('.hero-section .middle .btg', {opacity: 0, y: 20, stagger: 0.08, duration: 0.5, ease: 'power2.out'}, '-=0.4')
      .from('.nextaudio', {opacity: 0, y: 15, duration: 0.6, ease: 'power2.out'}, '-=0.3');

    const sections = document.querySelectorAll('.section-padding, .slider, .artists-section, .pricing-section, .evaluation-section');
    sections.forEach(function(sec) {
      gsap.from(sec, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sec,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    gsap.utils.toArray('.pricing-thumb').forEach(function(el) {
      gsap.from(el, {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    var serverCard = document.querySelector('.server-status-container');
    if (serverCard) {
      gsap.from(serverCard, {
        opacity: 0,
        y: 20,
        scale: 0.98,
        duration: 0.6,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: serverCard,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    var evalCard = document.querySelector('.evaluation-card');
    if (evalCard) {
      gsap.from(evalCard, {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: evalCard,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      var chips = evalCard.querySelectorAll('.player-list li');
      if (chips && chips.length) {
        gsap.from(chips, {
          opacity: 0,
          y: 12,
          scale: 0.98,
          duration: 0.4,
          ease: 'power2.out',
          immediateRender: false,
          stagger: { each: 0.015, from: 'center' },
          scrollTrigger: {
            trigger: evalCard,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        });
      }

      gsap.from('.evaluation-title', {
        opacity: 0, y: 14, duration: 0.5, ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: evalCard, start: 'top 85%', toggleActions: 'play none none reverse' }
      });
      gsap.from('.evaluation-subtitle', {
        opacity: 0, y: 10, duration: 0.5, ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: evalCard, start: 'top 85%', toggleActions: 'play none none reverse' }
      });
      gsap.from('.evaluation-note', {
        opacity: 0, y: 8, duration: 0.5, ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: evalCard, start: 'top 85%', toggleActions: 'play none none reverse' }
      });
    }

    gsap.utils.toArray('.nav-dots .dot, .nav-arrows li').forEach(function(el, i) {
      gsap.from(el, {opacity: 0, y: 10, duration: 0.4, ease: 'power2.out', delay: i * 0.02});
    });

    (function() {
      var committeeSection = document.getElementById('section_4');
      var committeeRow = committeeSection ? (committeeSection.querySelector('#committeeList') || committeeSection.querySelector('.row .row')) : null;
      if (!committeeRow) return;
      var items = Array.prototype.slice.call(committeeRow.querySelectorAll('.col-lg-5.col-12'));
      if (!items.length) return;

      var pageSize = 4;
      var pages = [];
      for (var i = 0; i < items.length; i += pageSize) {
        pages.push(items.slice(i, i + pageSize));
      }
      var total = pages.length;
      var current = 0;

      var prevBtn = committeeSection.querySelector('.committee-prev');
      var nextBtn = committeeSection.querySelector('.committee-next');
      var dotsWrap = committeeSection.querySelector('.committee-dots');

      if (dotsWrap) {
        dotsWrap.innerHTML = '';
        for (var d = 0; d < total; d++) {
          var dot = document.createElement('span');
          dot.className = 'committee-dot' + (d === 0 ? ' active' : '');
          dot.setAttribute('role', 'button');
          dot.setAttribute('aria-label', '第' + (d + 1) + '页');
          dot.dataset.index = String(d);
          dotsWrap.appendChild(dot);
        }
      }

      function updateDots(idx) {
        if (!dotsWrap) return;
        var dots = dotsWrap.querySelectorAll('.committee-dot');
        Array.prototype.forEach.call(dots, function(dot, i){ dot.classList.toggle('active', i === idx); });
      }

      function showPage(idx, animate) {
        current = (idx + total) % total;
        items.forEach(function(it){ it.style.display = 'none'; });
        pages[current].forEach(function(it){ it.style.display = ''; });
        updateDots(current);
        if (window.gsap && animate !== false) {
          gsap.from(pages[current], {opacity: 0, y: 12, duration: 0.4, ease: 'power2.out', stagger: 0.05});
        }
      }

      showPage(0, false);

      function nextPage(){ showPage(current + 1); }
      function prevPage(){ showPage(current - 1); }

      if (nextBtn) nextBtn.addEventListener('click', function(){ stopAuto(); nextPage(); startAuto(); });
      if (prevBtn) prevBtn.addEventListener('click', function(){ stopAuto(); prevPage(); startAuto(); });
      if (dotsWrap) {
        dotsWrap.addEventListener('click', function(e){
          var t = e.target;
          if (t && t.classList.contains('committee-dot')) {
            stopAuto();
            var idx = parseInt(t.dataset.index || '0', 10);
            showPage(idx);
            startAuto();
          }
        });
      }

      var AUTO_MS = 5000;
      var autoTimer = null;
      function startAuto(){
        if (total <= 1) return;
        stopAuto();
        autoTimer = setInterval(nextPage, AUTO_MS);
      }
      function stopAuto(){
        if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
      }

      var controls = committeeSection.querySelector('.committee-controls');
      committeeRow.addEventListener('mouseenter', function(){ stopAuto(); });
      committeeRow.addEventListener('mouseleave', function(){ startAuto(); });
      if (controls) {
        controls.addEventListener('mouseenter', function(){ stopAuto(); });
        controls.addEventListener('mouseleave', function(){ startAuto(); });
      }

      startAuto();
    })();

    (function() {
      var section = document.getElementById('section_4');
      if (!section) return;
      var cards = section.querySelectorAll('.artists-thumb');
      if (!cards.length) return;
      cards.forEach(function(card){
        var wrap = card.querySelector('.artists-image-wrap');
        if (!wrap || wrap.querySelector('.artists-basic')) return;
        var hover = card.querySelector('.artists-hover');
        var name = wrap.getAttribute('data-name') || '';
        var rolesAttr = wrap.getAttribute('data-roles') || '';
        var roleText = '';
        if (!name || !rolesAttr) {
          if (hover) {
            var ps = hover.querySelectorAll('p');
            if (!name && ps[0]) {
              var a = ps[0].querySelector('a');
              name = a ? a.textContent.trim() : ps[0].textContent.replace('昵称:', '').trim();
            }
            var jobP = hover.querySelector('p.mb-0');
            if (!rolesAttr && jobP) {
              var a2 = jobP.querySelector('a');
              roleText = a2 ? a2.textContent.trim() : jobP.textContent.trim();
            }
          }
        }
        var roles = rolesAttr ? rolesAttr.split(',').map(function(s){ return s.trim().toUpperCase(); }).filter(Boolean) : deriveRoles(roleText);
        var basic = document.createElement('div');
        basic.className = 'artists-basic';
        var n = document.createElement('div');
        n.className = 'basic-name';
        n.textContent = name || '';
        var rw = document.createElement('div');
        rw.className = 'basic-roles';
        roles.forEach(function(r){
          var s = document.createElement('span');
          s.className = 'role-badge ' + r.toLowerCase();
          s.textContent = r;
          rw.appendChild(s);
        });
        basic.appendChild(n);
        basic.appendChild(rw);
        var jobText = (wrap.getAttribute('data-job') || '').trim() || (roles.length ? roles.join(' / ') : '');
        if (jobText && !basic.querySelector('.basic-job')) {
          var bj = document.createElement('div');
          bj.className = 'basic-job';
          bj.textContent = jobText;
          basic.appendChild(bj);
        }
        wrap.appendChild(basic);
      });

      function deriveRoles(txt){
        var t = (txt || '').toLowerCase();
        var out = [];
        if (t.includes('服主')) out.push('OWNER');
        if (t.includes('网站') || t.includes('开发') || t.includes('模组') || t.includes('更新') || t.includes('调整')) out.push('DEV');
        if (t.includes('运维')) out.push('OPS');
        if (t.includes('pvp')) out.push('PVP');
        if (t.includes('模型')) out.push('ART');
        if (t.includes('建筑')) out.push('BUILD');
        if (t.includes('技术')) out.push('DEV');
        if (t.includes('总监')) out.push('LEAD');
        if (!out.length) out.push('DEV');
        return Array.from(new Set(out));
      }
    })();
  }
});


