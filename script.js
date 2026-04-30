// Small script for mobile menu
const btn = document.getElementById('menu-btn');
const nav = document.getElementById('nav');
if(btn){btn.addEventListener('click',()=>{nav.classList.toggle('open')})}

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
