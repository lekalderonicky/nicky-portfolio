// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const bodyElement = document.body;

// Load saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
  bodyElement.classList.add('light-mode');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  bodyElement.classList.toggle('light-mode');
  const isLight = bodyElement.classList.contains('light-mode');
  themeToggle.textContent = isLight ? '☀️' : '🌙';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// ===== SCROLL PROGRESS BAR =====
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (window.scrollY / scrollHeight) * 100;
  scrollProgress.style.width = scrolled + '%';
});

// ===== MOBILE MENU TOGGLE =====
const btn = document.getElementById('menu-btn');
const nav = document.getElementById('nav');

if (btn) {
  btn.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

// Close mobile menu when a link is clicked
if (nav) {
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });
}

// ===== SMOOTH SCROLLING & ACTIVE NAV LINK =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    // Don't prevent default for project links that have onclick handlers
    if (href === '#' && this.classList.contains('project-link')) {
      return;
    }
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// ===== CONTACT FORM WITH MAIL CLIENT =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const to = 'lekalderonicky@gmail.com';
    const subject = encodeURIComponent(`Contact from website — ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`);
    const mailto = `mailto:${to}?subject=${subject}&body=${body}`;
    
    // Add brief visual feedback
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '✓ Opening email...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      window.location.href = mailto;
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1000);
    }, 300);
  });
}

// ===== INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe project cards and about items
document.querySelectorAll('.project-card, .about-item').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});

// ===== ENHANCED NAVIGATION STYLES =====
const style = document.createElement('style');
style.textContent = `
  .nav-link.active {
    color: var(--accent);
  }
  .nav-link.active::after {
    width: 100%;
  }
`;
document.head.appendChild(style);

// ===== PARALLAX EFFECT ON PROFILE IMAGE =====
const profileImg = document.getElementById('profile-img');
if (profileImg) {
  window.addEventListener('mousemove', (e) => {
    const rect = profileImg.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = (e.clientY - centerY) * 0.02;
    const rotateY = (e.clientX - centerX) * -0.02;
    
    profileImg.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  profileImg.addEventListener('mouseleave', () => {
    profileImg.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  });
}
