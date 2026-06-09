document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (event) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        event.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  const progressBars = document.querySelectorAll('.progress-fill');
  progressBars.forEach((bar, index) => {
    const percent = parseInt(bar.getAttribute('data-progress'), 10) || 0;
    setTimeout(() => {
      bar.style.width = `${percent}%`;
    }, 120 + index * 120);
  });

  const rings = document.querySelectorAll('.circular-progress');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const ring = entry.target;
      const percent = parseInt(ring.getAttribute('data-percentage'), 10) || 0;
      const circle = ring.querySelector('.ring-circle');
      const radius = 70;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (percent / 100) * circumference;
      circle.style.strokeDasharray = circumference;
      circle.style.strokeDashoffset = circumference;
      requestAnimationFrame(() => {
        circle.style.strokeDashoffset = offset;
      });
      observer.unobserve(ring);
    });
  }, { threshold: 0.5 });

  rings.forEach((ring) => observer.observe(ring));
});

