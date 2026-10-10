document.addEventListener('DOMContentLoaded', () => {
  // 1. Current Year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile Menu Navigation
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // 3. Active Nav on Scroll & Navbar Glass Style
  const nav = document.getElementById('nav');
  const sections = document.querySelectorAll('section, header');
  const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.style.background = 'rgba(9, 9, 11, 0.88)';
      nav.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
    } else {
      nav.style.background = 'rgba(9, 9, 11, 0.7)';
      nav.style.boxShadow = 'none';
    }

    let currentSection = '';
    const scrollPos = window.scrollY + 180;
    sections.forEach(sec => {
      if (sec.offsetTop <= scrollPos) {
        currentSection = sec.getAttribute('id');
      }
    });

    navAnchors.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === `#${currentSection}`) {
        a.classList.add('active');
      }
    });
  }, { passive: true });

  // 4. Typing Effect in Hero
  const typedEl = document.getElementById('typed');
  if (typedEl) {
    const words = [
      "AI Engineer",
      "Fullstack Software Developer",
      "Edge AI & Deep Learning Specialist",
      "Agent & Multi-Agent Builder"
    ];
    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function handleType() {
      const currentWord = words[wordIdx];
      if (isDeleting) {
        typedEl.textContent = currentWord.substring(0, charIdx - 1);
        charIdx--;
      } else {
        typedEl.textContent = currentWord.substring(0, charIdx + 1);
        charIdx++;
      }

      let speed = isDeleting ? 40 : 80;

      if (!isDeleting && charIdx === currentWord.length) {
        speed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        speed = 400;
      }

      setTimeout(handleType, speed);
    }
    setTimeout(handleType, 600);
  }

  // 5. Scroll Reveal & Skill Progress Bar Trigger
  const animItems = document.querySelectorAll('.anim-item');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');

        // Check if inside a skill-card to animate progress
        const fills = entry.target.querySelectorAll('.progress__fill');
        fills.forEach(fill => {
          const w = fill.getAttribute('data-w');
          if (w) {
            fill.style.width = w + '%';
            fill.classList.add('filled');
          }
        });

        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  animItems.forEach(el => observer.observe(el));

  // 6. Lightbox for Gallery
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbClose = document.querySelector('.lightbox__close');
  const triggers = document.querySelectorAll('.lb-trigger, .mini-gallery img');

  if (lightbox && lbImg) {
    triggers.forEach(img => {
      img.addEventListener('click', () => {
        lbImg.src = img.src;
        lightbox.classList.add('open');
      });
    });

    if (lbClose) {
      lbClose.addEventListener('click', () => {
        lightbox.classList.remove('open');
      });
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('open');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        lightbox.classList.remove('open');
      }
    });
  }
});
