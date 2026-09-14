/**
 * NigeriaGeo Pro — Ultra-Premium Web Experience & Dynamic APK Download Counter
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Automatic Real-Time APK Download Counter ──
  const STORAGE_KEY = 'nigeriageo_apk_downloads_count';
  const BASE_COUNT = 0;

  // Retrieve current stored count or initialize at zero
  function getDownloadCount() {
    // Clear old mockup count from previous iterations
    localStorage.removeItem('nigeriageo_apk_downloads');

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === null || isNaN(parseInt(stored, 10))) {
      localStorage.setItem(STORAGE_KEY, '0');
      return 0;
    }
    const count = parseInt(stored, 10);
    // If it was stored with the old simulated base number, reset to 0
    if (count >= 1482) {
      localStorage.setItem(STORAGE_KEY, '0');
      return 0;
    }
    return count;
  }

  // Update all counter display elements across the page
  function updateCounterDisplays(count, animate = false) {
    const formatted = count.toLocaleString();

    // 1. Big Counter in APK Section
    const bigCounter = document.getElementById('apkCounterBig');
    if (bigCounter) {
      bigCounter.textContent = formatted;
      if (animate) {
        bigCounter.style.transform = 'scale(1.15)';
        bigCounter.style.color = '#FDE047';
        setTimeout(() => {
          bigCounter.style.transform = 'scale(1)';
          bigCounter.style.color = 'var(--gold-bright)';
        }, 300);
      }
    }

    // 2. Hero Section Counters
    const heroCounters = document.querySelectorAll('.hero-counter-val');
    heroCounters.forEach(el => {
      el.textContent = formatted;
      if (animate) {
        el.style.color = '#FDE047';
        setTimeout(() => { el.style.color = ''; }, 300);
      }
    });

    // 3. Navbar and Mobile Counters
    const navBadge = document.getElementById('navCountBadge');
    if (navBadge) navBadge.textContent = formatted;

    const mobileVals = document.querySelectorAll('.mobile-count-val');
    mobileVals.forEach(el => { el.textContent = formatted; });
  }

  // Initial population of counters
  let currentDownloads = getDownloadCount();
  updateCounterDisplays(currentDownloads, false);

  // Toast Notification Controller
  const toast = document.getElementById('downloadToast');
  const toastSub = document.getElementById('toastSub');
  let toastTimer = null;

  function showDownloadToast(count) {
    if (!toast) return;
    if (toastSub) {
      toastSub.textContent = `Total Downloads updated to ${count.toLocaleString()}`;
    }
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  // Attach increment listener to all APK download triggers
  const downloadTriggers = document.querySelectorAll('.apk-download-trigger');
  downloadTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      currentDownloads += 1;
      localStorage.setItem(STORAGE_KEY, currentDownloads.toString());
      updateCounterDisplays(currentDownloads, true);
      showDownloadToast(currentDownloads);
    });
  });

  // ── 2. Mobile Menu Toggle ───────────────────────
  const mobileMenu = document.getElementById('mobileMenu');
  const hamburger = document.getElementById('hamburger');

  window.toggleMenu = function() {
    if (!mobileMenu || !hamburger) return;
    mobileMenu.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (mobileMenu.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  };

  document.addEventListener('click', e => {
    if (mobileMenu && hamburger && !mobileMenu.contains(e.target) && !hamburger.contains(e.target) && mobileMenu.classList.contains('open')) {
      window.toggleMenu();
    }
  });

  // ── 3. Scroll Reveal Animations ────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ── 4. Navbar Scroll Elevation ─────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.style.background = 'rgba(4, 15, 10, 0.92)';
      navbar.style.borderColor = 'rgba(212, 175, 55, 0.45)';
      navbar.style.boxShadow = '0 20px 48px rgba(0, 0, 0, 0.7), 0 0 24px rgba(212, 175, 55, 0.12)';
    } else {
      navbar.style.background = 'rgba(6, 20, 13, 0.75)';
      navbar.style.borderColor = 'rgba(212, 175, 55, 0.22)';
      navbar.style.boxShadow = '0 16px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(212, 175, 55, 0.08)';
    }
  });

  // ── 5. Active Nav Highlighting ──────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      if (window.scrollY >= sectionTop) current = section.getAttribute('id');
    });

    navLinks.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === '#' + current) {
        link.style.color = 'var(--gold-light)';
      }
    });
  });

  // ── 6. Interactive Phone Mockup Conversion Cycle ──
  const samplePoints = [
    {
      src: 'Mid Belt (EPSG:26392)',
      tgt: 'WGS84 (EPSG:4326)',
      east: '584,347.216',
      north: '601,482.773',
      lon: '7.53420000° E',
      lat: '9.07220000° N',
      project: 'Phase 2 Cadastral Traverse',
      points: '4 Stations · Polylines Connected',
      belt: 'Minna Mid Belt',
      location: 'Abuja FCT'
    },
    {
      src: 'West Belt (EPSG:26391)',
      tgt: 'WGS84 (EPSG:4326)',
      east: '108,579.140',
      north: '271,369.820',
      lon: '3.42150000° E',
      lat: '6.45200000° N',
      project: 'Lagos Coastal Perimeter',
      points: '8 Stations · Polylines Connected',
      belt: 'Minna West Belt',
      location: 'Lagos Island'
    },
    {
      src: 'East Belt (EPSG:26393)',
      tgt: 'WGS84 (EPSG:4326)',
      east: '1,181,254.300',
      north: '866,127.500',
      lon: '13.15100000° E',
      lat: '11.83300000° N',
      project: 'Maiduguri Grid Control',
      points: '6 Stations · Polylines Connected',
      belt: 'Minna East Belt',
      location: 'Maiduguri'
    }
  ];

  let currentIndex = 0;
  const swapBtn = document.getElementById('mockSwapBtn');

  if (swapBtn) {
    swapBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % samplePoints.length;
      const pt = samplePoints[currentIndex];

      const srcLabel = document.getElementById('mockSrcLabel');
      const tgtLabel = document.getElementById('mockTgtLabel');
      const eastVal = document.getElementById('mockEastVal');
      const northVal = document.getElementById('mockNorthVal');
      const lonVal = document.getElementById('mockLonVal');
      const latVal = document.getElementById('mockLatVal');
      const projTitle = document.querySelector('.project-card-title');
      const projMeta = document.querySelector('.project-card-meta');
      const beltBadge = document.querySelector('.mock-badge-tag');

      // Subtle fade micro-animation
      const animElements = [eastVal, northVal, lonVal, latVal];
      animElements.forEach(el => {
        if (el) {
          el.style.opacity = '0.3';
          el.style.transform = 'scale(0.96)';
          el.style.transition = 'all 0.2s ease';
        }
      });

      setTimeout(() => {
        if (srcLabel) srcLabel.textContent = pt.src;
        if (tgtLabel) tgtLabel.textContent = pt.tgt;
        if (eastVal) eastVal.textContent = pt.east;
        if (northVal) northVal.textContent = pt.north;
        if (lonVal) lonVal.textContent = pt.lon;
        if (latVal) latVal.textContent = pt.lat;
        if (projTitle) projTitle.textContent = pt.project;
        if (projMeta) projMeta.textContent = pt.points;
        if (beltBadge) beltBadge.textContent = pt.belt;

        animElements.forEach(el => {
          if (el) {
            el.style.opacity = '1';
            el.style.transform = 'scale(1)';
          }
        });
      }, 150);
    });
  }

  // ── 7. Interactive Social Icon Naming UX Feature ──
  const socialBtns = document.querySelectorAll('.social-icon-btn');
  const previewText = document.getElementById('socialPreviewText');
  const previewDot = document.querySelector('.preview-dot');
  const previewContainer = document.getElementById('socialNamePreview');
  const DEFAULT_PREVIEW = 'Hover or touch any icon to view channel';

  if (socialBtns.length && previewText) {
    socialBtns.forEach(btn => {
      const name = btn.getAttribute('data-name');
      const color = btn.getAttribute('data-color') || 'var(--gold-primary)';

      const activate = () => {
        previewText.style.opacity = '0';
        previewText.style.transform = 'translateY(2px)';
        setTimeout(() => {
          previewText.textContent = name;
          previewText.style.color = color;
          previewText.style.opacity = '1';
          previewText.style.transform = 'translateY(0)';
        }, 80);

        if (previewDot) {
          previewDot.style.background = color;
          previewDot.style.boxShadow = `0 0 12px ${color}`;
        }
        if (previewContainer) {
          previewContainer.style.borderColor = color;
          previewContainer.style.boxShadow = `0 6px 20px rgba(0,0,0,0.4), 0 0 16px ${color}33`;
        }
      };

      const deactivate = () => {
        previewText.style.opacity = '0';
        previewText.style.transform = 'translateY(-2px)';
        setTimeout(() => {
          previewText.textContent = DEFAULT_PREVIEW;
          previewText.style.color = '';
          previewText.style.opacity = '1';
          previewText.style.transform = 'translateY(0)';
        }, 80);

        if (previewDot) {
          previewDot.style.background = '';
          previewDot.style.boxShadow = '';
        }
        if (previewContainer) {
          previewContainer.style.borderColor = '';
          previewContainer.style.boxShadow = '';
        }
      };

      btn.addEventListener('mouseenter', activate);
      btn.addEventListener('focus', activate);
      btn.addEventListener('touchstart', activate, { passive: true });

      btn.addEventListener('mouseleave', deactivate);
      btn.addEventListener('blur', deactivate);
    });
  }

});
