document.addEventListener('DOMContentLoaded', function() {
    /* ==================== Toggle Icon Navbar ==================== */
    let menuIcon = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');

    if (menuIcon) {
        menuIcon.onclick = () => {
            menuIcon.classList.toggle('fa-xmark');
            navbar.classList.toggle('active');
        };
    }

    /* ==================== Scroll Sections Active Link ==================== */
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('header nav a');

    window.onscroll = () => {
        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if(top >= offset && top < offset + height) {
                navLinks.forEach(links => {
                    links.classList.remove('active');
                    let activeLink = document.querySelector('header nav a[href*=' + id + ']');
                    if (activeLink) activeLink.classList.add('active');
                });
            };
        });

        /* ==================== Sticky Navbar ==================== */
        let header = document.querySelector('.header');
        if (header) {
            header.classList.toggle('sticky', window.scrollY > 100);
        }

        /* ==================== Remove Toggle Icon and Navbar when click link ==================== */
        if (menuIcon) menuIcon.classList.remove('fa-xmark');
        if (navbar) navbar.classList.remove('active');
    };

    /* ==================== Scroll Reveal Animation ==================== */
    ScrollReveal({
        distance: '80px',
        duration: 2000,
        delay: 200,
    });

    ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
    ScrollReveal().reveal('.home-img, .portfolio-box, .contact form', { origin: 'bottom' });
    ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
    ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

    /* ==================== Typed JS Animation ==================== */
    const typed = new Typed('.text-animate', {
        strings: ['Full Stack Developer'],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });

    /* ==================== Contact Form - Mailto Fallback ==================== */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button');
            if (!submitBtn) return;

            const name = document.getElementById('name')?.value || '';
            const fromEmail = document.getElementById('email')?.value || '';
            const mobile = document.getElementById('mobile')?.value || '';
            const subject = document.getElementById('subject')?.value || '';
            const message = document.getElementById('message')?.value || '';

            const mailtoLink = `mailto:hasitha.m.wijesekara@gmail.com?subject=${encodeURIComponent(subject)}&body=Name: ${encodeURIComponent(name)}%0D%0AEmail: ${encodeURIComponent(fromEmail)}%0DMobile: ${encodeURIComponent(mobile)}%0D%0D%0A${encodeURIComponent(message)}`;

            Swal.fire({
                title: 'Opening Email Client!',
                text: 'Your message is pre-filled. Hit Send!',
                icon: 'success',
                confirmButtonText: 'OK',
                background: '#151e32',
                color: '#fff'
            }).then(() => {
                window.location.href = mailtoLink;
                contactForm.reset();
            });
        });
    }

    /* ==================== Theme Toggle / Persistence ==================== */
    const themeToggle = document.getElementById('theme-toggle');
    const rootEl = document.documentElement;

    function applyTheme(theme) {
        rootEl.setAttribute('data-theme', theme);
        if (themeToggle) {
            themeToggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
        }
    }

    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = rootEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(current);
            localStorage.setItem('theme', current);
        });
    }

    /* ==================== Certificate Click Functionality ==================== */
    const titleToPdf = {
        'Python for beginners': 'Python_for_Beginners_E-Certificate.pdf',
        'Web Design for Beginners': 'Web_Design_for_Beginners_E-Certificate.pdf',
        'Frontend Web Development': 'Front-End_Web_Development_E-Certificate.pdf'
    };

    const certificatesSection = document.querySelector('#certificates');
    if (certificatesSection) {
        certificatesSection.addEventListener('click', (e) => {
            const portfolioBox = e.target.closest('.portfolio-box');
            if (portfolioBox) {
                const titleEl = portfolioBox.querySelector('.portfolio-layer h4');
                if (titleEl) {
                    const title = titleEl.textContent.trim();
                    const filename = titleToPdf[title];
                    if (filename) {
                        const pdfPath = `files/${filename}`;
                        window.open(pdfPath, '_blank');
                        return;
                    }
                }
            }
        });
    }
});
