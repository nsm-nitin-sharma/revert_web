document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Intersection Observer for Fade-Up Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger rolling number animation when the onboarding mockup is visible
                if (entry.target.querySelector('#rolling-number') || entry.target.classList.contains('onboarding-mockup')) {
                    animateRollingNumber();
                }
                
                // Unobserve after animating
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up');
    animatedElements.forEach(el => observer.observe(el));
    
    // Trigger hero animations slightly faster
    setTimeout(() => {
        const heroElements = document.querySelectorAll('#home .fade-up');
        heroElements.forEach(el => el.classList.add('visible'));
    }, 100);

    // --- Parallax Effect for Background Glows ---
    const glow1 = document.querySelector('.glow-1');
    const glow2 = document.querySelector('.glow-2');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (glow1) glow1.style.transform = `translateY(${scrollY * 0.2}px)`;
        if (glow2) glow2.style.transform = `translateY(${scrollY * -0.15}px)`;
    });

    // --- Rolling Number Animation ---
    let numberAnimated = false;
    function animateRollingNumber() {
        if (numberAnimated) return;
        numberAnimated = true;
        
        const targetNumber = 14.2;
        const duration = 2000; // 2 seconds
        const element = document.getElementById('rolling-number');
        
        if (!element) return;

        let startTime = null;

        function animationStep(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            
            // Easing function (easeOutQuart)
            const easeOut = 1 - Math.pow(1 - percentage, 4);
            const currentNumber = (targetNumber * easeOut).toFixed(1);
            
            element.textContent = currentNumber;

            if (progress < duration) {
                window.requestAnimationFrame(animationStep);
            } else {
                element.textContent = targetNumber.toFixed(1);
            }
        }

        window.requestAnimationFrame(animationStep);
    }
});
