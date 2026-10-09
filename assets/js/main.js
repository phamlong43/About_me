// About_me — small vanilla JS (no build step, Pages-friendly)
(function () {
  var burger = document.getElementById('burger');
  var links = document.getElementById('navLinks');
  if (burger && links) {
    burger.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) links.classList.remove('open');
    });
  }

  // Active nav on scroll
  var ids = ['about', 'education', 'skills', 'experience', 'contact'];
  var navA = Array.prototype.slice.call(document.querySelectorAll('.links a'));
  function onScroll() {
    var y = window.scrollY + 140;
    var current = ids[0];
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.offsetTop <= y) current = id;
    });
    navA.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) en.target.classList.add('show');
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // Footer year
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
})();
