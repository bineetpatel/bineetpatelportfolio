document.addEventListener('DOMContentLoaded', () => {
    // 1. Set Current Year in Footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Navbar Scrolling Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Intersection Observer for Fade-In Animations
    const fadeElements = document.querySelectorAll('.fade-in-up, .fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If the element has counters, start counter animation!
                if(entry.target.classList.contains('hero-content')) {
                    startCounters();
                }

                // Optional: Unobserve after animating once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        elementObserver.observe(el);
    });

    // 4. Counter Animation for Stats
    let countersStarted = false;
    const counters = document.querySelectorAll('.stat-number');

    function startCounters() {
        if (countersStarted) return;
        countersStarted = true;

        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            // adjust duration based on target magnitude
            const duration = 2000; 
            const increment = target / (duration / 16); // 16ms is roughly 1 frame

            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            
            updateCounter();
        });
    }

    // Fallback if IntersectionObserver isn't supported or doesn't trigger properly on refresh
    if(window.scrollY < 100) {
        setTimeout(() => {
            document.querySelectorAll('.hero-content.fade-in-up').forEach(el => el.classList.add('visible'));
            startCounters();
        }, 300);
    }
});
