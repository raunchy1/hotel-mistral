/* ============================================
   HOTEL MISTRAL — i18n Engine
   ============================================ */

(function() {
  const SUPPORTED_LANGS = ['it', 'en', 'de', 'es'];
  const DEFAULT_LANG = 'it';
  const STORAGE_KEY = 'hotel-mistral-lang';

  function getBrowserLang() {
    const raw = navigator.language || navigator.userLanguage || 'it';
    const code = raw.split('-')[0].toLowerCase();
    return SUPPORTED_LANGS.includes(code) ? code : DEFAULT_LANG;
  }

  function getSavedLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED_LANGS.includes(saved)) return saved;
    } catch (e) {}
    return null;
  }

  function saveLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function getCurrentLang() {
    return getSavedLang() || getBrowserLang() || DEFAULT_LANG;
  }

  window.currentLang = getCurrentLang();

  function getValue(obj, path) {
    const parts = path.split('.');
    let val = obj;
    for (const p of parts) {
      val = val?.[p];
      if (val === undefined) break;
    }
    return val;
  }

  function interpolate(str, vars) {
    if (!str || typeof str !== 'string') return str;
    return str.replace(/\{\{(\w+)\}\}/g, function(_, key) {
      return vars?.[key] !== undefined ? vars[key] : '{{' + key + '}}';
    });
  }

  function t(key, vars) {
    const langData = window.translations?.[window.currentLang];
    if (!langData) return key;
    const val = getValue(langData, key);
    if (val === undefined) return key;
    return interpolate(val, vars);
  }

  window.t = t;

  function applyTranslations() {
    const lang = window.currentLang;
    const langData = window.translations?.[lang];
    if (!langData) return;

    // Text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = getValue(langData, key);
      if (val !== undefined) {
        if (el.hasAttribute('data-i18n-html')) {
          el.innerHTML = val;
        } else {
          el.textContent = val;
        }
      }
    });

    // Attributes
    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
      const key = el.getAttribute('data-i18n-alt');
      const val = getValue(langData, key);
      if (val !== undefined) el.setAttribute('alt', val);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = getValue(langData, key);
      if (val !== undefined) el.setAttribute('placeholder', val);
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria-label');
      const val = getValue(langData, key);
      if (val !== undefined) el.setAttribute('aria-label', val);
    });

    // Meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      const page = document.body.getAttribute('data-page') || 'home';
      const desc = getValue(langData, 'meta.' + page + '_desc') || getValue(langData, 'meta.home_desc');
      if (desc) metaDesc.setAttribute('content', desc);
    }

    // Title
    const titleEl = document.querySelector('title');
    if (titleEl) {
      const page = document.body.getAttribute('data-page') || 'home';
      const siteName = getValue(langData, 'meta.site_name');
      const pageTitle = getValue(langData, page + '.header_title');
      if (siteName && pageTitle) {
        titleEl.textContent = pageTitle.replace(/\n/g, ' ') + ' — ' + siteName;
      } else if (siteName) {
        titleEl.textContent = siteName;
      }
    }

    // Update lang switcher active state
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const isActive = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', isActive);
      btn.style.opacity = isActive ? '1' : '0.5';
    });

    // Update HTML lang attribute
    document.documentElement.setAttribute('lang', lang);
  }

  window.setLanguage = function(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) return;
    window.currentLang = lang;
    saveLang(lang);
    applyTranslations();
  };

  // Apply when translations are ready
  function waitAndApply() {
    if (window.translations) {
      applyTranslations();
    } else {
      setTimeout(waitAndApply, 50);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitAndApply);
  } else {
    waitAndApply();
  }
})();
