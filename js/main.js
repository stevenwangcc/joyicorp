/* ================================================================
   謙溢管理顧問 Joyi Corp — Shared Components (Navbar & Footer)
   ================================================================ */

const _isEN = window.location.pathname.includes('/en/');

const NAVBAR_ZH = `
<nav class="navbar" id="navbar">
  <div class="navbar-inner">
    <a href="/" class="navbar-logo">謙溢<span>管理顧問</span></a>
    <button class="navbar-toggle" id="navToggle" aria-label="開啟選單" aria-expanded="false">
      <i class="fas fa-bars"></i>
    </button>
    <ul class="navbar-links" id="navLinks" role="list">
      <li><a href="/">首頁</a></li>
      <li><a href="/services.html">服務項目</a></li>
      <li><a href="/cases.html">顧客實績</a></li>
      <li><a href="/blog/">知識庫</a></li>
      <li><a href="/contact.html">聯繫資訊</a></li>
      <li class="lang-item">
        <a href="/" class="lang-btn lang-active lang-zh-link">繁中</a>
        <span class="lang-sep">｜</span>
        <a href="/en/" class="lang-btn lang-en-link">EN</a>
      </li>
    </ul>
  </div>
</nav>
`;

const NAVBAR_EN = `
<nav class="navbar" id="navbar">
  <div class="navbar-inner">
    <a href="/en/" class="navbar-logo">Joyi<span> Corp</span></a>
    <button class="navbar-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false">
      <i class="fas fa-bars"></i>
    </button>
    <ul class="navbar-links" id="navLinks" role="list">
      <li><a href="/en/">Home</a></li>
      <li><a href="/en/services.html">Services</a></li>
      <li><a href="/en/cases.html">Client Results</a></li>
      <li><a href="/en/contact.html">Contact</a></li>
      <li class="lang-item">
        <a href="/" class="lang-btn lang-zh-link">繁中</a>
        <span class="lang-sep">｜</span>
        <a href="/en/" class="lang-btn lang-active lang-en-link">EN</a>
      </li>
    </ul>
  </div>
</nav>
`;

const FOOTER_ZH = `
<footer class="footer">
  <div class="footer-inner">
    <div class="footer-top">
      <div>
        <div class="footer-logo-text">謙溢<span>管理顧問</span> Joyi Corp</div>
        <div class="footer-logo-sub">協助企業掌握 AI 時代的競爭優勢</div>
      </div>
      <div class="footer-meta">
        <div><i class="fas fa-envelope" style="color:var(--accent);margin-right:6px;"></i><a href="mailto:stevenwang.cc@gmail.com">stevenwang.cc@gmail.com</a></div>
        <div class="sep"><i class="fas fa-clock" style="color:var(--accent);margin-right:6px;"></i>週一至週五 9:00–18:00</div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2025 謙溢管理顧問 Joyi Corp. All rights reserved.</p>
    </div>
  </div>
</footer>
`;

const FOOTER_EN = `
<footer class="footer">
  <div class="footer-inner">
    <div class="footer-top">
      <div>
        <div class="footer-logo-text">Joyi<span> Corp</span></div>
        <div class="footer-logo-sub">AI &amp; Management Consulting for SMEs</div>
      </div>
      <div class="footer-meta">
        <div><i class="fas fa-envelope" style="color:var(--accent);margin-right:6px;"></i><a href="mailto:stevenwang.cc@gmail.com">stevenwang.cc@gmail.com</a></div>
        <div class="sep"><i class="fas fa-clock" style="color:var(--accent);margin-right:6px;"></i>Mon–Fri 9:00–18:00 (GMT+8)</div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2025 Joyi Corp. All rights reserved.</p>
    </div>
  </div>
</footer>
`;

/* Map page filename → language-specific paths */
const PAGE_MAP = {
  'index.html':    { zh: '/',                  en: '/en/' },
  '':              { zh: '/',                  en: '/en/' },
  'services.html': { zh: '/services.html',     en: '/en/services.html' },
  'cases.html':    { zh: '/cases.html',        en: '/en/cases.html' },
  'contact.html':  { zh: '/contact.html',      en: '/en/contact.html' },
};

document.addEventListener('DOMContentLoaded', function () {

  /* --- Inject Navbar --- */
  const navPlaceholder = document.getElementById('navbar-placeholder');
  if (navPlaceholder) {
    navPlaceholder.outerHTML = _isEN ? NAVBAR_EN : NAVBAR_ZH;
  }

  /* --- Inject Footer --- */
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.outerHTML = _isEN ? FOOTER_EN : FOOTER_ZH;
  }

  /* --- Set Language Switcher Links dynamically --- */
  const slug     = window.location.pathname.split('/').pop() || 'index.html';
  const langMap  = PAGE_MAP[slug] || PAGE_MAP['index.html'];
  const zhLink   = document.querySelector('.lang-zh-link');
  const enLink   = document.querySelector('.lang-en-link');
  if (zhLink) zhLink.setAttribute('href', langMap.zh);
  if (enLink) enLink.setAttribute('href', langMap.en);

  /* --- Highlight Active Nav Link --- */
  const path = window.location.pathname;
  document.querySelectorAll('.navbar-links a:not(.lang-btn)').forEach(function (link) {
    const href = link.getAttribute('href') || '';
    const isRoot = href === '/' || href === '/en/';
    if (isRoot ? path === href : href && path.startsWith(href)) {
      link.classList.add('active');
    }
  });

  /* --- Mobile Menu Toggle --- */
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      const isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.innerHTML = isOpen
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });

    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  /* --- Navbar scroll shadow --- */
  window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      navbar.style.boxShadow = window.scrollY > 10
        ? '0 3px 18px rgba(0,0,0,0.35)'
        : '0 2px 12px rgba(0,0,0,0.25)';
    }
  });

  /* --- Contact Form: Formspree AJAX Submit + Success Message --- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('.btn-submit');
      const successEl = document.getElementById('form-success');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = _isEN ? 'Sending…' : '傳送中…';
      }

      fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            contactForm.reset();
            if (successEl) {
              successEl.style.display = 'flex';
              successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          } else {
            alert(_isEN
              ? 'Submission failed. Please try again or email stevenwang.cc@gmail.com'
              : '送出失敗，請稍後再試或直接來信 stevenwang.cc@gmail.com');
          }
        })
        .catch(function () {
          alert(_isEN
            ? 'Network error. Please try again or email stevenwang.cc@gmail.com'
            : '網路錯誤，請稍後再試或直接來信 stevenwang.cc@gmail.com');
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = _isEN ? 'Send Message' : '送出諮詢';
          }
        });
    });
  }

  /* --- Simple scroll-reveal animation --- */
  if ('IntersectionObserver' in window) {
    const targets = document.querySelectorAll(
      '.card, .why-item, .case-card, .testimonial, .service-item'
    );
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = entry.target.style.transform.replace('translateY(20px)', 'translateY(0)');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    targets.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform += ' translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease';
      observer.observe(el);
    });
  }

});
