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
  // CALENDAR — Booking Assistant
  // ============================================
  (function() {
    const gridWrap = document.getElementById('calendar-grid-wrap');
    if (!gridWrap) return;

    const checkinDisplay = document.getElementById('checkin-display');
    const checkoutDisplay = document.getElementById('checkout-display');
    const guestsDisplay = document.getElementById('guests-display');
    const ctaWrap = document.getElementById('calendar-cta-wrap');
    const whatsappCta = document.getElementById('whatsapp-cta');
    const clearBtn = document.getElementById('calendar-clear');

    const MONTH_NAMES = {
      it: ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'],
      en: ['January','February','March','April','May','June','July','August','September','October','November','December'],
      de: ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
      es: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    };

    const WEEKDAYS = {
      it: ['Lun','Mar','Mer','Gio','Ven','Sab','Dom'],
      en: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      de: ['Mo','Di','Mi','Do','Fr','Sa','So'],
      es: ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom']
    };

    let state = {
      viewDate: new Date(),
      checkIn: null,
      checkOut: null,
      hoverDate: null,
      guests: 2
    };

    function stripTime(d) {
      return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    }

    const today = stripTime(new Date());

    function isSameDay(a, b) {
      if (!a || !b) return false;
      return a.getTime() === b.getTime();
    }

    function isPast(d) {
      return d < today;
    }

    function formatDate(d) {
      if (!d) return '—';
      const lang = window.currentLang || 'it';
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      if (lang === 'it' || lang === 'es') {
        return day + '/' + month + '/' + year;
      } else if (lang === 'de') {
        return day + '.' + month + '.' + year;
      }
      return month + '/' + day + '/' + year;
    }

    function getDaysForMonth(year, month) {
      const first = new Date(year, month, 1);
      const last = new Date(year, month + 1, 0);
      const startDay = (first.getDay() + 6) % 7;
      const days = [];
      for (let i = 0; i < startDay; i++) days.push(null);
      for (let i = 1; i <= last.getDate(); i++) {
        days.push(new Date(year, month, i));
      }
      return days;
    }

    function renderMonth(year, month, index) {
      const lang = window.currentLang || 'it';
      const actualYear = year + Math.floor(month / 12);
      const monthIndex = ((month % 12) + 12) % 12;
      const monthName = MONTH_NAMES[lang][monthIndex] + ' ' + actualYear;
      const days = getDaysForMonth(year, month);

      let html = '<div class="calendar-month">';
      html += '<div class="calendar-month-header">';
      html += '<div class="calendar-month-name">' + monthName + '</div>';
      html += '<div class="calendar-nav">';
      if (index === 0) {
        const prevDisabled = (year === today.getFullYear() && month <= today.getMonth()) ? 'disabled' : '';
        html += '<button class="calendar-nav-btn" onclick="window.calendarApp.prevMonth()" ' + prevDisabled + ' aria-label="Previous month">‹</button>';
        html += '<button class="calendar-nav-btn" onclick="window.calendarApp.nextMonth()" aria-label="Next month">›</button>';
      }
      html += '</div></div>';

      html += '<div class="calendar-weekdays">';
      WEEKDAYS[lang].forEach(function(wd) {
        html += '<span>' + wd + '</span>';
      });
      html += '</div>';

      html += '<div class="calendar-days">';
      days.forEach(function(day) {
        if (!day) {
          html += '<div class="calendar-day" style="visibility:hidden"></div>';
          return;
        }
        const d = stripTime(day);
        const disabled = isPast(d);
        const isCheckIn = isSameDay(d, state.checkIn);
        const isCheckOut = isSameDay(d, state.checkOut);
        const isHoverEnd = state.hoverDate && isSameDay(d, state.hoverDate) && !state.checkOut && state.checkIn && d > state.checkIn;

        let classes = ['calendar-day'];
        if (disabled) classes.push('disabled');
        if (isCheckIn) classes.push('selected-start');
        if (isCheckOut) classes.push('selected-end');
        if (isHoverEnd) classes.push('preview-end');

        const rangeEnd = state.checkOut || state.hoverDate;
        if (state.checkIn && rangeEnd && d > state.checkIn && d < rangeEnd) {
          if (state.checkOut) {
            classes.push('in-range');
          } else {
            classes.push('in-range-preview');
          }
        }
        if (isSameDay(d, today)) classes.push('today');

        const cls = classes.join(' ');
        const onclick = disabled ? '' : 'onclick="window.calendarApp.selectDate(' + d.getFullYear() + ',' + d.getMonth() + ',' + d.getDate() + ')"';
        const onmouseenter = disabled ? '' : 'onmouseenter="window.calendarApp.hoverDate(' + d.getFullYear() + ',' + d.getMonth() + ',' + d.getDate() + ')"';
        const onmouseleave = 'onmouseleave="window.calendarApp.leaveDate()"';

        html += '<button type="button" class="' + cls + '" ' + onclick + ' ' + onmouseenter + ' ' + onmouseleave + ' ' + (disabled ? 'disabled' : '') + '>' + d.getDate() + '</button>';
      });
      html += '</div></div>';
      return html;
    }

    function render() {
      const y = state.viewDate.getFullYear();
      const m = state.viewDate.getMonth();
      gridWrap.innerHTML = renderMonth(y, m, 0) + renderMonth(y, m + 1, 1);

      if (checkinDisplay) checkinDisplay.textContent = formatDate(state.checkIn);
      if (checkoutDisplay) checkoutDisplay.textContent = formatDate(state.checkOut);
      if (guestsDisplay) guestsDisplay.textContent = state.guests;

      if (state.checkIn && state.checkOut) {
        if (ctaWrap) ctaWrap.classList.add('active');
        updateWhatsAppLink();
        if (clearBtn) clearBtn.style.visibility = 'visible';
      } else {
        if (ctaWrap) ctaWrap.classList.remove('active');
        if (clearBtn) clearBtn.style.visibility = state.checkIn ? 'visible' : 'hidden';
      }
    }

    function updateWhatsAppLink() {
      if (!state.checkIn || !state.checkOut || !whatsappCta) return;
      const lang = window.currentLang || 'it';
      const df = formatDate(state.checkIn);
      const dt = formatDate(state.checkOut);
      const persone = state.guests === 1 ? 'persona' : 'persone';
      const messages = {
        it: 'Buongiorno, vorrei verificare la disponibilità per il soggiorno dal ' + df + ' al ' + dt + ' per ' + state.guests + ' ' + persone + '.',
        en: 'Hello, I would like to check availability for a stay from ' + df + ' to ' + dt + ' for ' + state.guests + ' guest' + (state.guests > 1 ? 's' : '') + '.',
        de: 'Guten Tag, ich möchte die Verfügbarkeit für einen Aufenthalt vom ' + df + ' bis zum ' + dt + ' für ' + state.guests + ' Person' + (state.guests > 1 ? 'en' : '') + ' prüfen.',
        es: 'Buenos días, me gustaría verificar la disponibilidad para una estancia del ' + df + ' al ' + dt + ' para ' + state.guests + ' persona' + (state.guests > 1 ? 's' : '') + '.'
      };
      const msg = messages[lang] || messages.it;
      whatsappCta.href = 'https://wa.me/393472479796?text=' + encodeURIComponent(msg);
    }

    window.calendarApp = {
      selectDate: function(y, m, d) {
        const clicked = stripTime(new Date(y, m, d));
        if (!state.checkIn || (state.checkIn && state.checkOut) || clicked <= state.checkIn) {
          state.checkIn = clicked;
          state.checkOut = null;
          state.hoverDate = null;
        } else {
          state.checkOut = clicked;
          state.hoverDate = null;
        }
        render();
      },
      hoverDate: function(y, m, d) {
        const hovered = stripTime(new Date(y, m, d));
        if (state.checkIn && !state.checkOut && hovered > state.checkIn) {
          state.hoverDate = hovered;
          render();
        }
      },
      leaveDate: function() {
        if (state.hoverDate) {
          state.hoverDate = null;
          render();
        }
      },
      prevMonth: function() {
        const current = state.viewDate;
        if (current.getFullYear() === today.getFullYear() && current.getMonth() <= today.getMonth()) return;
        state.viewDate = new Date(current.getFullYear(), current.getMonth() - 1, 1);
        render();
      },
      nextMonth: function() {
        const current = state.viewDate;
        state.viewDate = new Date(current.getFullYear(), current.getMonth() + 1, 1);
        render();
      },
      changeGuests: function(delta) {
        const next = state.guests + delta;
        if (next >= 1 && next <= 8) {
          state.guests = next;
          render();
        }
      },
      clearDates: function() {
        state.checkIn = null;
        state.checkOut = null;
        state.hoverDate = null;
        render();
      },
      render: render
    };

    const originalSetLanguage = window.setLanguage;
    if (originalSetLanguage) {
      window.setLanguage = function(lang) {
        originalSetLanguage(lang);
        if (window.calendarApp && window.calendarApp.render) {
          window.calendarApp.render();
        }
      };
    }

    render();
  })();

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
