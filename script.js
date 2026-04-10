// =============================================
// flagctl.github.io — interactions
// =============================================

(function () {
  'use strict';

  // ---- Sticky nav border on scroll ----
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  // ---- Hamburger menu ----
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }

  // ---- SDK code tab switcher ----
  const codeTabs = document.querySelectorAll('.code-tab');
  const codePanels = document.querySelectorAll('.code-panel');

  codeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const lang = tab.dataset.lang;

      codeTabs.forEach(t => t.classList.remove('code-tab-active'));
      codePanels.forEach(p => p.classList.remove('code-panel-active'));

      tab.classList.add('code-tab-active');
      document.querySelector(`.code-panel[data-lang="${lang}"]`)
        ?.classList.add('code-panel-active');
    });
  });

  // ---- Scroll-triggered fade-up animations ----
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  // Observe cards and steps
  document.querySelectorAll(
    '.feature-card, .step, .pricing-card, .kpi, .code-showcase'
  ).forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
    observer.observe(el);
  });

  // ---- Animate preview bar widths on load ----
  const previewBars = document.querySelectorAll('.preview-bar');
  setTimeout(() => {
    previewBars.forEach(bar => {
      const target = bar.style.width;
      bar.style.width = '0%';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          bar.style.transition = 'width 0.8s ease';
          bar.style.width = target;
        });
      });
    });
  }, 300);

  // ---- Mini chart bars animate ----
  const miniBars = document.querySelectorAll('.mini-bar');
  const chartObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          miniBars.forEach(bar => {
            const h = bar.style.height;
            bar.style.height = '0%';
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                bar.style.transition = 'height 0.6s ease';
                bar.style.height = h;
              });
            });
          });
          chartObserver.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );
  if (miniBars.length > 0) chartObserver.observe(miniBars[0].closest('.feature-mini-chart'));

  // ---- Smooth anchor scrolling with nav offset ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 68; // nav height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
