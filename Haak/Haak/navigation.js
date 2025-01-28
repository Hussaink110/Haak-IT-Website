// Handle page transitions
document.addEventListener('DOMContentLoaded', () => {
    // Add loading class to body
    document.body.classList.add('loading');
    
    const loaderContainer = document.querySelector('.loader-container');
    const progressBar = document.querySelector('.loader-progress');
    const percentageText = document.querySelector('.loader-percentage');
    let progress = 0;
    
    // Simulate loading progress
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = `${progress}%`;
        percentageText.textContent = `${Math.round(progress)}%`;
        
        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                loaderContainer.style.opacity = '0';
                setTimeout(() => {
                    loaderContainer.style.display = 'none';
                    document.body.classList.remove('loading');
                    // Initialize AOS after loader
                    if (typeof AOS !== 'undefined') {
                        AOS.init({
                            duration: 1000,
                            once: true
                        });
                    }
                }, 500);
            }, 500);
        }
    }, 200);

    // Navigation functionality
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    let isMenuOpen = false;

    function closeMenu() {
        isMenuOpen = false;
        navToggle?.classList.remove('active');
        navLinks?.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = '';
    }

    function openMenu() {
        isMenuOpen = true;
        navToggle?.classList.add('active');
        navLinks?.classList.add('active');
        document.body.classList.add('menu-open');
        document.body.style.overflow = 'hidden';
    }

    // Toggle menu
    if (navToggle) {
        navToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (isMenuOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && navLinks && 
            !navToggle?.contains(e.target) && 
            !navLinks.contains(e.target)) {
            closeMenu();
        }
    });

    // Close menu when clicking on a link
    if (navLinks) {
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });
    }

    // Handle escape key to close menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });

    // Handle resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768 && isMenuOpen) {
                closeMenu();
            }
        }, 250);
    });

    // Change navbar on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const navbar = document.querySelector('.navbar');
        const topHeader = document.querySelector('.top-header');
        
        // Add scrolled class when scrolling down
        if (currentScroll > 50) {
            navbar?.classList.add('scrolled');
            topHeader?.style.transform = 'translateY(-100%)';
            topHeader?.style.transition = 'transform 0.3s ease';
        } else {
            navbar?.classList.remove('scrolled');
            topHeader?.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // Set active menu item based on current page
    const currentPage = window.location.pathname;
    const menuLinks = document.querySelectorAll('.nav-links a');
    menuLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage || 
            (currentPage === '/' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// Handle link clicks for page transitions
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.href && link.href.startsWith(window.location.origin)) {
        const loaderContainer = document.querySelector('.loader-container');
        
        // Show loader
        if (loaderContainer) {
            loaderContainer.style.display = 'flex';
            loaderContainer.style.opacity = '1';
            document.body.classList.add('loading');
        }
    }
});