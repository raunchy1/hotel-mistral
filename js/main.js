/* ============================================
   HOTEL MISTRAL — Premium Animation Engine
   Cinematic, subtle, Mediterranean
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.querySelector('.nav');
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
  // LANGUAGE DROPDOWN — collapsed, premium
  // ============================================
  const langDropdowns = document.querySelectorAll('.lang-dropdown');
  langDropdowns.forEach(dd => {
    const trigger = dd.querySelector('.lang-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const opening = !dd.classList.contains('open');
      langDropdowns.forEach(d => d.classList.remove('open'));
      if (opening) dd.classList.add('open');
      trigger.setAttribute('aria-expanded', String(opening));
    });
    dd.querySelectorAll('.lang-opt').forEach(opt => {
      opt.addEventListener('click', () => {
        dd.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      });
    });
  });
  document.addEventListener('click', (e) => {
    langDropdowns.forEach(dd => {
      if (!dd.contains(e.target)) {
        dd.classList.remove('open');
        const t = dd.querySelector('.lang-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      }
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      langDropdowns.forEach(dd => {
        dd.classList.remove('open');
        const t = dd.querySelector('.lang-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // ============================================
  // MOBILE MENU — robust open/close handlers
  // ============================================
  const menuBtn = document.querySelector('.menu-btn');
  const menuCloseBtn = document.querySelector('.menu-close');

  function openMobileMenu() {
    if (mobileMenu) {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }
  function closeMobileMenu() {
    if (mobileMenu) {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', openMobileMenu);
  }
  if (menuCloseBtn) {
    menuCloseBtn.addEventListener('click', closeMobileMenu);
  }

  // Close on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close on backdrop click
  if (mobileMenu) {
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) closeMobileMenu();
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
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
    var wrap = document.getElementById('calendar-grid-wrap');
    if (!wrap) { console.error('Calendar grid not found'); return; }

    var els = {
      checkin: document.getElementById('checkin-display'),
      checkout: document.getElementById('checkout-display'),
      nights: document.getElementById('nights-display'),
      guests: document.getElementById('guests-display'),
      cta: document.getElementById('calendar-cta-wrap'),
      whatsapp: document.getElementById('whatsapp-cta'),
      clear: document.getElementById('calendar-clear')
    };

    var MONTH_NAMES = {
      it: ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'],
      en: ['January','February','March','April','May','June','July','August','September','October','November','December'],
      de: ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
      es: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    };

    var WEEKDAYS = {
      it: ['Lun','Mar','Mer','Gio','Ven','Sab','Dom'],
      en: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      de: ['Mo','Di','Mi','Do','Fr','Sa','So'],
      es: ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom']
    };

    var state = {
      viewDate: new Date(),
      checkIn: null,
      checkOut: null,
      hoverDate: null,
      guests: 2
    };

    function stripTime(d) {
      return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    }

    var today = stripTime(new Date());

    function isSameDay(a, b) {
      if (!a || !b) return false;
      return a.getTime() === b.getTime();
    }

    function isPast(d) {
      return d < today;
    }

    function pad(n) { return String(n).padStart(2, '0'); }

    function formatDate(d) {
      if (!d) return '—';
      var lang = window.currentLang || 'it';
      var day = pad(d.getDate());
      var month = pad(d.getMonth() + 1);
      var year = d.getFullYear();
      if (lang === 'it' || lang === 'es') return day + '/' + month + '/' + year;
      if (lang === 'de') return day + '.' + month + '.' + year;
      return month + '/' + day + '/' + year;
    }

    function nightsText(n) {
      var lang = window.currentLang || 'it';
      if (n <= 0) return '—';
      var t = 'notti';
      try { t = window.translations[lang].calendar[n === 1 ? 'nights_singular' : 'nights']; } catch(e){}
      return n + ' ' + t;
    }

    function getDaysForMonth(year, month) {
      var first = new Date(year, month, 1);
      var last = new Date(year, month + 1, 0);
      var startDay = (first.getDay() + 6) % 7;
      var days = [];
      for (var i = 0; i < startDay; i++) days.push(null);
      for (var i = 1; i <= last.getDate(); i++) {
        days.push(new Date(year, month, i));
      }
      return days;
    }

    function getDayClasses(d) {
      var disabled = isPast(d);
      var isCheckIn = isSameDay(d, state.checkIn);
      var isCheckOut = isSameDay(d, state.checkOut);
      var isHoverEnd = state.hoverDate && isSameDay(d, state.hoverDate) && !state.checkOut && state.checkIn && d > state.checkIn;
      var cls = ['calendar-day'];
      if (disabled) cls.push('disabled');
      if (isCheckIn) cls.push('selected-start');
      if (isCheckOut) cls.push('selected-end');
      if (isHoverEnd) cls.push('preview-end');
      var rangeEnd = state.checkOut || state.hoverDate;
      if (state.checkIn && rangeEnd && d > state.checkIn && d < rangeEnd) {
        cls.push(state.checkOut ? 'in-range' : 'in-range-preview');
      }
      if (isSameDay(d, today)) cls.push('today');
      return cls.join(' ');
    }

    function renderMonth(year, month, index) {
      var lang = window.currentLang || 'it';
      var actualYear = year + Math.floor(month / 12);
      var monthIndex = ((month % 12) + 12) % 12;
      var monthName = MONTH_NAMES[lang][monthIndex] + ' ' + actualYear;
      var days = getDaysForMonth(year, month);

      var html = '<div class="calendar-month">';
      html += '<div class="calendar-month-header">';
      html += '<div class="calendar-month-name">' + monthName + '</div>';
      html += '<div class="calendar-nav">';
      if (index === 0) {
        var prevDisabled = (year === today.getFullYear() && month <= today.getMonth()) ? 'disabled' : '';
        html += '<button class="calendar-nav-btn" data-action="prev" ' + prevDisabled + ' aria-label="Previous month">‹</button>';
        html += '<button class="calendar-nav-btn" data-action="next" aria-label="Next month">›</button>';
      }
      html += '</div></div>';

      html += '<div class="calendar-weekdays">';
      for (var w = 0; w < 7; w++) {
        html += '<span>' + WEEKDAYS[lang][w] + '</span>';
      }
      html += '</div>';

      html += '<div class="calendar-days">';
      for (var i = 0; i < days.length; i++) {
        var day = days[i];
        if (!day) {
          html += '<div class="calendar-day" style="visibility:hidden"></div>';
          continue;
        }
        var d = stripTime(day);
        var disabled = isPast(d);
        var cls = getDayClasses(d);
        var attrs = 'type="button" class="' + cls + '"';
        if (!disabled) {
          attrs += ' data-date="' + d.getTime() + '"';
        }
        if (disabled) attrs += ' disabled';
        html += '<button ' + attrs + '>' + d.getDate() + '</button>';
      }
      html += '</div></div>';
      return html;
    }

    function updateUI() {
      if (els.checkin) els.checkin.textContent = formatDate(state.checkIn);
      if (els.checkout) els.checkout.textContent = formatDate(state.checkOut);

      var nights = 0;
      if (state.checkIn && state.checkOut) {
        nights = Math.round((state.checkOut - state.checkIn) / 86400000);
      }
      if (els.nights) els.nights.textContent = nightsText(nights);
      if (els.guests) els.guests.textContent = state.guests;

      if (state.checkIn && state.checkOut) {
        updateWhatsAppLink();
        if (els.clear) els.clear.style.visibility = 'visible';
        if (els.cta) {
          requestAnimationFrame(function() {
            if (els.cta) els.cta.classList.add('active');
          });
        }
      } else {
        if (els.cta) els.cta.classList.remove('active');
        if (els.clear) els.clear.style.visibility = state.checkIn ? 'visible' : 'hidden';
      }
    }

    function updateDayClasses() {
      var buttons = wrap.querySelectorAll('button[data-date]');
      for (var i = 0; i < buttons.length; i++) {
        var btn = buttons[i];
        var ts = parseInt(btn.getAttribute('data-date'), 10);
        var d = new Date(ts);
        btn.className = getDayClasses(d);
      }
    }

    function render() {
      var y = state.viewDate.getFullYear();
      var m = state.viewDate.getMonth();
      wrap.innerHTML = renderMonth(y, m, 0) + renderMonth(y, m + 1, 1);
      attachListeners();
      updateUI();
    }

    function attachListeners() {
      var buttons = wrap.querySelectorAll('button[data-date]');
      for (var i = 0; i < buttons.length; i++) {
        (function(btn) {
          btn.addEventListener('click', function(e) {
            e.stopPropagation();
            var ts = parseInt(btn.getAttribute('data-date'), 10);
            var clicked = new Date(ts);
            console.log('Calendar click:', formatDate(clicked), 'current checkIn:', state.checkIn ? formatDate(state.checkIn) : null);

            if (!state.checkIn || state.checkOut || clicked <= state.checkIn) {
              state.checkIn = clicked;
              state.checkOut = null;
              state.hoverDate = null;
              console.log('-> Set check-in');
            } else {
              state.checkOut = clicked;
              state.hoverDate = null;
              console.log('-> Set check-out');
            }
            render();
          });

          btn.addEventListener('mouseenter', function() {
            if (!state.checkIn || state.checkOut) return;
            var ts = parseInt(btn.getAttribute('data-date'), 10);
            var hovered = new Date(ts);
            if (hovered > state.checkIn) {
              state.hoverDate = hovered;
              updateDayClasses();
            }
          });

          btn.addEventListener('mouseleave', function() {
            if (state.hoverDate) {
              state.hoverDate = null;
              updateDayClasses();
            }
          });
        })(buttons[i]);
      }

      var navButtons = wrap.querySelectorAll('button[data-action]');
      for (var i = 0; i < navButtons.length; i++) {
        (function(btn) {
          btn.addEventListener('click', function(e) {
            e.stopPropagation();
            var action = btn.getAttribute('data-action');
            if (action === 'prev') {
              var current = state.viewDate;
              if (current.getFullYear() === today.getFullYear() && current.getMonth() <= today.getMonth()) return;
              state.viewDate = new Date(current.getFullYear(), current.getMonth() - 1, 1);
              render();
            } else if (action === 'next') {
              var current = state.viewDate;
              state.viewDate = new Date(current.getFullYear(), current.getMonth() + 1, 1);
              render();
            }
          });
        })(navButtons[i]);
      }
    }

    function updateWhatsAppLink() {
      if (!state.checkIn || !state.checkOut || !els.whatsapp) return;
      var lang = window.currentLang || 'it';
      var df = formatDate(state.checkIn);
      var dt = formatDate(state.checkOut);
      var persone = state.guests === 1 ? 'persona' : 'persone';
      var msg = '';
      if (lang === 'it') {
        msg = 'Buongiorno, vorrei verificare la disponibilità per il soggiorno dal ' + df + ' al ' + dt + ' per ' + state.guests + ' ' + persone + '.';
      } else if (lang === 'en') {
        msg = 'Hello, I would like to check availability for a stay from ' + df + ' to ' + dt + ' for ' + state.guests + ' guest' + (state.guests > 1 ? 's' : '') + '.';
      } else if (lang === 'de') {
        msg = 'Guten Tag, ich möchte die Verfügbarkeit für einen Aufenthalt vom ' + df + ' bis zum ' + dt + ' für ' + state.guests + ' Person' + (state.guests > 1 ? 'en' : '') + ' prüfen.';
      } else if (lang === 'es') {
        msg = 'Buenos días, me gustaría verificar la disponibilidad para una estancia del ' + df + ' al ' + dt + ' para ' + state.guests + ' persona' + (state.guests > 1 ? 's' : '') + '.';
      } else {
        msg = 'Buongiorno, vorrei verificare la disponibilità per il soggiorno dal ' + df + ' al ' + dt + ' per ' + state.guests + ' ' + persone + '.';
      }
      els.whatsapp.href = 'https://wa.me/393472479796?text=' + encodeURIComponent(msg);
    }

    window.calendarApp = {
      changeGuests: function(delta) {
        var next = state.guests + delta;
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

    var originalSetLanguage = window.setLanguage;
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
  // 3D LETTER TESTIMONIALS — tilt on hover
  // ============================================
  const tiltCards = document.querySelectorAll('.letter-card[data-tilt]');

  tiltCards.forEach(card => {
    let rafId = null;
    let targetRotateX = 0;
    let targetRotateY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;
    let isHovering = false;

    const depth = parseFloat(getComputedStyle(card).getPropertyValue('--depth')) || 0;

    function animate() {
      currentRotateX += (targetRotateX - currentRotateX) * 0.12;
      currentRotateY += (targetRotateY - currentRotateY) * 0.12;

      const isSettled = Math.abs(targetRotateX - currentRotateX) < 0.01 && Math.abs(targetRotateY - currentRotateY) < 0.01;

      if (isSettled) {
        currentRotateX = targetRotateX;
        currentRotateY = targetRotateY;
      }

      const lift = isHovering ? -8 : 0;
      card.style.transform = `perspective(800px) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg) translateZ(${depth}) translateY(${lift}px)`;

      if (!isSettled || isHovering) {
        rafId = requestAnimationFrame(animate);
      } else {
        rafId = null;
      }
    }

    card.addEventListener('mouseenter', () => {
      isHovering = true;
      if (!rafId) rafId = requestAnimationFrame(animate);
    });

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      targetRotateY = ((x - centerX) / centerX) * 6;
      targetRotateX = -((y - centerY) / centerY) * 6;

      if (!rafId) {
        rafId = requestAnimationFrame(animate);
      }
    });

    card.addEventListener('mouseleave', () => {
      isHovering = false;
      targetRotateX = 0;
      targetRotateY = 0;
      if (!rafId) {
        rafId = requestAnimationFrame(animate);
      }
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
