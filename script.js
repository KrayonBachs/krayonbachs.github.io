/* ============================================================
   script.js — Portfolio interactions
============================================================ */

// ── Navbar: blur on scroll ─────────────────────────────────
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll(); // run once on load

// ── Mobile menu toggle ─────────────────────────────────────
const menuBtn    = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
  const isOpen = !mobileMenu.classList.contains('hidden');
  mobileMenu.classList.toggle('hidden', isOpen);
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

// ── Smooth scroll for anchor links ────────────────────────
// (html { scroll-behavior: smooth } handles most of it;
//  this version adds navbar-height offset so sections
//  don't hide under the fixed bar)
const NAV_HEIGHT = 72; // px — adjust if navbar height changes

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── Scroll-reveal (IntersectionObserver) ──────────────────
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // animate once
      }
    });
  },
  {
    threshold: 0.12,    // trigger when 12% of element is visible
    rootMargin: '0px 0px -40px 0px', // slight bottom offset
  }
);

revealElements.forEach(el => revealObserver.observe(el));

// ── Active nav link highlight on scroll ───────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const isActive = link.getAttribute('href') === `#${id}`;
          link.style.color = isActive ? '#f0f0f0' : '';
        });
      }
    });
  },
  {
    rootMargin: '-40% 0px -55% 0px',
  }
);

sections.forEach(section => sectionObserver.observe(section));
