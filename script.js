// Small script for mobile menu
const btn = document.getElementById('menu-btn');
const nav = document.getElementById('nav');
if(btn){btn.addEventListener('click',()=>{nav.classList.toggle('open')})}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form: open user's mail client with a pre-filled mailto when the form is submitted
const contactForm = document.getElementById('contact-form');
if(contactForm){
	contactForm.addEventListener('submit', (e)=>{
		e.preventDefault();
		const name = document.getElementById('name').value.trim();
		const email = document.getElementById('email').value.trim();
		const message = document.getElementById('message').value.trim();
		const to = 'lekalderonicky@gmail.com';
		const subject = encodeURIComponent(`Contact from website — ${name}`);
		const body = encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`);
		const mailto = `mailto:${to}?subject=${subject}&body=${body}`;
		// open mail client
		window.location.href = mailto;
	});
}

// Add intersection observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
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
