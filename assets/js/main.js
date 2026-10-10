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
      "AI Engineer @ Viettel AI",
      "Multi-Agent & FFI Architecture",
      "Edge AI & TinyML Specialist",
      "Security AI & Deep Learning"
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

      let speed = isDeleting ? 35 : 70;

      if (!isDeleting && charIdx === currentWord.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        speed = 350;
      }

      setTimeout(handleType, speed);
    }
    setTimeout(handleType, 500);
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
  }, { threshold: 0.1 });

  animItems.forEach(el => observer.observe(el));

  // 6. Interactive Glowing Custom Cursor Follower
  const cursor = document.getElementById('customCursor');
  if (cursor && window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    }, { passive: true });
  }

  // 7. Interactive 3D Tilt & Mouse Spotlight on Cards
  const cards = document.querySelectorAll('.card, .hero__main-card, .hero__avatar-box, .hero__stat-card');
  if (window.innerWidth > 960) {
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Radial gradient mouse spotlight coordinates
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // Subtle 3D Tilt calculation
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4.5;
        const rotateY = ((x - centerX) / centerX) * 4.5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.removeProperty('--mouse-x');
        card.style.removeProperty('--mouse-y');
      });
    });
  }

  // 8. Ambient Particle Network on Canvas
  const canvas = document.getElementById('ambientCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    // Generate lightweight particles
    const particleCount = window.innerWidth < 768 ? 25 : 55;
    const particles = [];
    const colors = ['rgba(168, 85, 247, 0.4)', 'rgba(6, 182, 212, 0.4)', 'rgba(34, 197, 94, 0.3)'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    let mousePos = { x: -1000, y: -1000 };
    window.addEventListener('mousemove', (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    }, { passive: true });

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and move particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Subtle attraction to mouse
        const mdx = mousePos.x - p.x;
        const mdy = mousePos.y - p.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 140) {
          p.x -= (mdx / mdist) * 0.6;
          p.y -= (mdy / mdist) * 0.6;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      requestAnimationFrame(renderParticles);
    }
    requestAnimationFrame(renderParticles);
  }

  // 9. Lightbox for Gallery
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
