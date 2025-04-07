// About Section Animations
class AboutAnimations {
    constructor() {
        this.initializeParticles();
        this.initializeStats();
        this.initializeScrollTriggers();
    }

    initializeParticles() {
        const particleContainer = document.querySelector('.particle-container');
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.setProperty('--delay', `${Math.random() * 5}s`);
            particle.style.setProperty('--moveX', `${Math.random() * 200 - 100}px`);
            particle.style.setProperty('--moveY', `${Math.random() * 200 - 100}px`);
            particleContainer.appendChild(particle);
        }
    }

    initializeStats() {
        const stats = document.querySelectorAll('.stat-number');
        const options = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const value = parseInt(target.closest('.stat-card').dataset.value);
                    this.animateValue(target, 0, value, 2000);
                    observer.unobserve(target);
                }
            });
        }, options);

        stats.forEach(stat => observer.observe(stat));
    }

    animateValue(element, start, end, duration) {
        const range = end - start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range));
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = current;
            
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    initializeScrollTriggers() {
        gsap.registerPlugin(ScrollTrigger);

        // Title animation
        gsap.from('.about-header', {
            scrollTrigger: {
                trigger: '.about-header',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        // About text animation
        gsap.from('.about-text', {
            scrollTrigger: {
                trigger: '.about-text',
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });

        // Stats animation
        gsap.from('.stat-card', {
            scrollTrigger: {
                trigger: '.stats-container',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power2.out'
        });

        // Circuit background parallax
        gsap.to('.circuit-background', {
            scrollTrigger: {
                trigger: '.about',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            y: '20%',
            ease: 'none'
        });
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AboutAnimations();
});
