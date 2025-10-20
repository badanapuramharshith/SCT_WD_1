// Navigation: toggle for small screens
const navToggle = document.getElementById('nav-toggle');
const navList = document.getElementById('nav-list');

navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('open');
});

// Smooth scrolling for in-page links
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            // Close mobile nav when selecting
            navList.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Move focus for accessibility after scrolling
            setTimeout(() => target.setAttribute('tabindex', '-1') || target.focus(), 500);
        }
    });
});

// Add scrolled class to navbar after some scroll
const navbar = document.getElementById('navbar');
const SCROLL_THRESHOLD = 35;
function onScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Scroll-spy using IntersectionObserver
const sections = document.querySelectorAll('main section, header.header-section');
const navItems = document.querySelectorAll('#nav-list li');

const observerOptions = { root: null, rootMargin: '0px 0px -40% 0px', threshold: 0 };
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.id;
        const navLink = document.querySelector(`#nav-list a[href="#${id}"]`);
        if (entry.isIntersecting) {
            navItems.forEach(li => li.classList.remove('active'));
            if (navLink && navLink.parentElement) navLink.parentElement.classList.add('active');
        }
    });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

// Add simple hover effect for keyboard users (focus-visible)
document.querySelectorAll('#nav-list a').forEach(link => {
    link.addEventListener('focus', () => link.parentElement.classList.add('active'));
    link.addEventListener('blur', () => link.parentElement.classList.remove('active'));
});

// Defensive: ensure elements exist (works even if markup changes)
if (!navToggle || !navList || !navbar) {
    // nothing critical — script will gracefully do less
}
