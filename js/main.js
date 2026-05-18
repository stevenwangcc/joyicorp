/* ================================================================
   謙溢管理顧問 Joyi Corp — Shared Components (Navbar & Footer)
   ================================================================ */

const NAVBAR_HTML = `
<nav class="navbar" id="navbar">
  <div class="navbar-inner">
    <a href="index.html" class="navbar-logo">謙溢<span>管理顧問</span></a>
    <button class="navbar-toggle" id="navToggle" aria-label="開啟選單" aria-expanded="false">
      <i class="fas fa-bars"></i>
    </button>
    <ul class="navbar-links" id="navLinks" role="list">
      <li><a href="index.html">首頁</a></li>
      <li><a href="services.html">服務項目</a></li>
      <li><a href="cases.html">顧客實績</a></li>
      <li><a href="contact.html">聯繫資訊</a></li>
    </ul>
  </div>
</nav>
`;

const FOOTER_HTML = `
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

document.addEventListener('DOMContentLoaded', function () {

  /* --- Inject Navbar --- */
  const navPlaceholder = document.getElementById('navbar-placeholder');
  if (navPlaceholder) {
    navPlaceholder.outerHTML = NAVBAR_HTML;
  }

  /* --- Inject Footer --- */
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.outerHTML = FOOTER_HTML;
  }

  /* --- Highlight Active Nav Link --- */
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-links a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentFile || (currentFile === '' && href === 'index.html')) {
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

    /* Close menu when a link is clicked */
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
      if (window.scrollY > 10) {
        navbar.style.boxShadow = '0 3px 18px rgba(0,0,0,0.35)';
      } else {
        navbar.style.boxShadow = '0 2px 12px rgba(0,0,0,0.25)';
      }
    }
  });

  /* --- Contact Form: Formspree AJAX Submit + Success Message --- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('.btn-submit');
      const successEl = document.getElementById('form-success');

      /* Show loading state */
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = '傳送中…';
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
            alert('送出失敗，請稍後再試或直接來信 stevenwang.cc@gmail.com');
          }
        })
        .catch(function () {
          alert('網路錯誤，請稍後再試或直接來信 stevenwang.cc@gmail.com');
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = '送出諮詢';
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
