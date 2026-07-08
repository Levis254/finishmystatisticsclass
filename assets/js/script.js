document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // 2. Set dynamic copyright year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 3. Navbar solid background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = 'var(--shadow-sm)';
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.85)';
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '1rem 0';
        }
    });
    
    // 4. Form submission to Formspree and WhatsApp redirection
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.textContent = 'Sending...';
            btn.disabled = true;
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;

            // Submit to Formspree
            fetch('https://formspree.io/f/xbddrlzy', {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                // Open WhatsApp chat
                const text = `Hi, I am ${name}. I need help with: ${service}.\nDetails: ${message}\nMy email: ${email}`;
                const encodedText = encodeURIComponent(text);
                const waUrl = `https://wa.me/17373014261?text=${encodedText}`;
                window.open(waUrl, '_blank');

                contactForm.reset();
            }).catch(error => {
                console.error('Submission error:', error);
                // In case of error, still try to open WhatsApp so the user can reach out
                const text = `Hi, I am ${name}. I need help with: ${service}.\nDetails: ${message}\nMy email: ${email}`;
                const encodedText = encodeURIComponent(text);
                const waUrl = `https://wa.me/17373014261?text=${encodedText}`;
                window.open(waUrl, '_blank');
            }).finally(() => {
                btn.textContent = originalText;
                btn.disabled = false;
            });
        });
    }
});
