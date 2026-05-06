/* ============================================
   HOTEL MISTRAL — Premium Animation Engine
   Cinematic, subtle, Mediterranean
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.querySelector('header');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');

  // ============================================
  // NAVBAR — glass morphism on scroll
  // ============================================
  function handleNavScroll() {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ============================================
  // MOBILE MENU — close on link click
  // ============================================
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // ============================================
  // SCROLL REVEAL — cinematic, staggered
  // ============================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ============================================
  // PARALLAX — subtle hero movement (ratio 0.08)
  // ============================================
  const parallaxImages = document.querySelectorAll('.parallax-img');

  function handleParallax() {
    parallaxImages.forEach(img => {
      const rect = img.parentElement.getBoundingClientRect();
      const scrolled = window.innerHeight - rect.top;
      if (scrolled > 0 && rect.bottom > 0) {
        const yPos = scrolled * 0.06;
        img.style.transform = `translateY(${yPos}px) scale(1.1)`;
      }
    });
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleParallax();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // ============================================
  // SMOOTH SCROLL — for anchor links
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================
  // CONTACT FORM — demo handling
  // ============================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Message sent';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        contactForm.reset();
      }, 3000);
    });
  }

  // ============================================
  // IMAGE HOVER ZOOM — global enhancement
  // ============================================
  document.querySelectorAll('.group, [class*="overflow-hidden"]').forEach(container => {
    const img = container.querySelector('img');
    if (!img) return;
    
    img.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    
    container.addEventListener('mouseenter', () => {
      img.style.transform = 'scale(1.03)';
    });
    
    container.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
    });
  });

  // ============================================
  // HERO KEN BURNS — subtle zoom on load
  // ============================================
  const heroSection = document.querySelector('section:first-of-type');
  if (heroSection) {
    const heroImg = heroSection.querySelector('.parallax-img img');
    if (heroImg) {
      heroImg.classList.add('hero-zoom-active');
    }
  }
});
