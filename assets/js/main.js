document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Set current year in footer ---
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // --- 2. Mobile Menu Toggle ---
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-cta');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // --- 3. Navbar Scroll Effect & Active Link ---
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section, header');
  
  window.addEventListener('scroll', () => {
    // Navbar styling
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
      navbar.style.background = 'rgba(5, 11, 20, 0.95)';
    } else {
      navbar.style.boxShadow = 'none';
      navbar.style.background = 'rgba(5, 11, 20, 0.8)';
    }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // --- 4. Typing Effect ---
  const typingText = document.getElementById('typing-text');
  if (typingText) {
    const textArray = ["Sinh viên KMA", "Frontend Developer", "Java Enthusiast"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const delayBetweenWords = 2000;

    function type() {
      const currentWord = textArray[textIndex];
      
      if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let timeoutSpeed = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        timeoutSpeed = delayBetweenWords;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        timeoutSpeed = 500;
      }

      setTimeout(type, timeoutSpeed);
    }
    
    // Start typing effect
    setTimeout(type, 1000);
  }

  // --- 5. Scroll Reveal & Skill Bar Animation using Intersection Observer ---
  const revealElements = document.querySelectorAll('.reveal');
  const skillBars = document.querySelectorAll('.progress-bar-fill');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // If it's a skill card, trigger progress bar
        if (entry.target.classList.contains('skill-card')) {
          const bar = entry.target.querySelector('.progress-bar-fill');
          if (bar) {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
          }
        }
        
        // Optional: unobserve after revealing once
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // --- 6. Lightbox for Gallery ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeLightbox = document.querySelector('.lightbox-close');
  const galleryImages = document.querySelectorAll('.lightbox-trigger');

  if (lightbox && lightboxImg && closeLightbox) {
    galleryImages.forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
      });
    });

    closeLightbox.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });
  }
});
