// Wait for navigation loader to complete before initializing other features
document.addEventListener('DOMContentLoaded', () => {
    // Handle loader
    const loader = document.querySelector('.loader-container');
    const progress = document.querySelector('.loader-progress');
    const percentage = document.querySelector('.loader-percentage');
    
    // Simulate loading with easing
    const easeOutQuad = t => t * (2 - t);
    let startTime = Date.now();
    let duration = 2000; // 2 seconds for loading
    
    const updateLoader = () => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress_time = Math.min(elapsed / duration, 1);
        
        // Apply easing for smoother progress
        const easedProgress = easeOutQuad(progress_time);
        const width = Math.min(Math.floor(easedProgress * 100), 100);
        
        progress.style.width = `${width}%`;
        percentage.textContent = `${width}%`;
        
        if (width < 100) {
            requestAnimationFrame(updateLoader);
        } else {
            // Fade out loader
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    // Initialize AOS after loader
                    AOS.init({
                        duration: 1000,
                        once: true
                    });
                }, 500);
            }, 300);
        }
    };
    
    // Start the loader animation
    requestAnimationFrame(updateLoader);

    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Form Submission Handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your form submission logic here
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Parallax Effect
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxLayers.forEach(layer => {
            const speed = layer.getAttribute('data-speed');
            const yPos = -(scrolled * speed);
            layer.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Add floating animation to cyber elements
    const cyberElements = document.querySelectorAll('.cyber-element');
    cyberElements.forEach(element => {
        element.style.animation = `float ${3 + Math.random() * 2}s ease-in-out infinite`;
    });
}); 