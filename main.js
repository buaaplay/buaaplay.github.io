(function () {
  function revealAll() {
    document.querySelectorAll('[data-anim]').forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    revealAll();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('[data-anim]').forEach(function (el) {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true
      }
    });
  });

  // Safety net: anything still hidden after load becomes visible.
  window.addEventListener('load', function () {
    setTimeout(function () {
      document.querySelectorAll('[data-anim]').forEach(function (el) {
        if (parseFloat(getComputedStyle(el).opacity) < 0.05) {
          var r = el.getBoundingClientRect();
          if (r.top < window.innerHeight) {
            el.style.opacity = '1';
            el.style.transform = 'none';
          }
        }
      });
    }, 1200);
  });
})();
