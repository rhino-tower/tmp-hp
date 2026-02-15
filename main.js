document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');

  if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', () => {
      nav.style.display = nav.style.display === 'block' ? 'none' : 'block';

      // Simple toggle implementation for mobile
      // Ideally toggling a class is better, let's add class based logic
      nav.classList.toggle('nav--active');
    });
  }

  // Smooth Scroll for Anchor Links (adjusting for fixed header)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });

        // Close mobile menu if open
        if (nav && nav.classList.contains('nav--active')) {
          nav.classList.remove('nav--active');
          nav.style.display = ''; // Reset inline style
        }
      }
    });
  });

  // Scroll Animations (Intersection Observer)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Target elements to animate
  const animatedElements = document.querySelectorAll('.section-title, .strength__card, .service-card, .work-card, .news__item');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });

  /*
  // Contact Form Handling - Deprecated for Google Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('【送信完了】\nお問い合わせありがとうございます。\n担当者よりご連絡させていただきます。');
      contactForm.reset();
    });
  }
  */

  // Inject fade-in class style dynamically or assume it's handled here
  // Let's add the class logic directly to the elements via JS styles for simplicity
  // But a class is cleaner. Let's append a style tag for the animation class.
  const style = document.createElement('style');
  style.innerHTML = `
    .fade-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }

    /* Mobile Nav Active State */
    @media (max-width: 768px) {
      .nav--active {
        display: block !important;
        position: absolute;
        top: 60px;
        left: 0;
        width: 100%;
        background-color: white;
        padding: 1rem;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        animation: slideDown 0.3s ease;
      }

      .nav--active .nav__list {
        flex-direction: column;
        gap: 1rem;
      }

      @keyframes slideDown {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    }
  `;
  document.head.appendChild(style);
});
