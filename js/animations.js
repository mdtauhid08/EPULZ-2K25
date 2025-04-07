class Animations {
    constructor() {
        this.initializeGSAP();
        this.setupGlitchText();
        this.setupScrollAnimations();
        this.setupHoverEffects();
    }

    initializeGSAP() {
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

        // Create smooth scrolling
        const smoother = ScrollSmoother.create({
            wrapper: '#smooth-wrapper',
            content: '#smooth-content',
            smooth: 1.5,
            effects: true
        });

        // Initialize ScrollTrigger
        ScrollTrigger.defaults({
            toggleActions: 'play none none reverse',
            markers: false
        });
    }

    setupGlitchText() {
        const glitchTexts = document.querySelectorAll('.glitch-text');
        
        glitchTexts.forEach(text => {
            const content = text.getAttribute('data-text');
            
            // Create glitch layers
            const before = document.createElement('span');
            const after = document.createElement('span');
            
            before.className = 'glitch-layer before';
            after.className = 'glitch-layer after';
            
            before.textContent = content;
            after.textContent = content;
            
            text.appendChild(before);
            text.appendChild(after);
            
            // Animate glitch effect
            this.animateGlitch(text);
        });
    }

    animateGlitch(element) {
        const timeline = gsap.timeline({
            repeat: -1,
            repeatDelay: 3
        });

        timeline
            .to(element, {
                skewX: 70,
                duration: 0.1,
                ease: 'power4.inOut'
            })
            .to(element, {
                skewX: 0,
                duration: 0.1,
                ease: 'power4.inOut'
            })
            .to(element.querySelector('.before'), {
                x: -10,
                duration: 0.1,
                ease: 'power4.inOut'
            })
            .to(element.querySelector('.after'), {
                x: 10,
                duration: 0.1,
                ease: 'power4.inOut'
            })
            .to([element.querySelector('.before'), element.querySelector('.after')], {
                x: 0,
                duration: 0.1,
                ease: 'power4.inOut'
            });
    }

    setupScrollAnimations() {
        // Fade in sections
        gsap.utils.toArray('section').forEach(section => {
            gsap.from(section, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%'
                }
            });
        });

        // Animate stats counter
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const value = parseInt(stat.getAttribute('data-value'));
            gsap.to(stat, {
                innerText: value,
                duration: 2,
                snap: { innerText: 1 },
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 80%'
                }
            });
        });

        // Timeline animation
        const timelineEvents = document.querySelectorAll('.timeline-event');
        timelineEvents.forEach((event, index) => {
            gsap.from(event, {
                opacity: 0,
                x: index % 2 === 0 ? -50 : 50,
                duration: 1,
                scrollTrigger: {
                    trigger: event,
                    start: 'top 80%'
                }
            });
        });
    }

    setupHoverEffects() {
        // Initialize vanilla-tilt for cards
        VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
            max: 15,
            speed: 400,
            glare: true,
            'max-glare': 0.5
        });

        // Button hover effects
        const buttons = document.querySelectorAll('.cta-button, .submit-button');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                gsap.to(button.querySelector('.button-glitch'), {
                    x: '0%',
                    duration: 0.3,
                    ease: 'power2.out'
                });
                gsap.to(button.querySelector('.button-glow'), {
                    opacity: 0.5,
                    duration: 0.3
                });
            });

            button.addEventListener('mouseleave', () => {
                gsap.to(button.querySelector('.button-glitch'), {
                    x: '-100%',
                    duration: 0.3,
                    ease: 'power2.in'
                });
                gsap.to(button.querySelector('.button-glow'), {
                    opacity: 0,
                    duration: 0.3
                });
            });
        });

        // Card hover effects
        const cards = document.querySelectorAll('.event-card, .contact-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -10,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                gsap.to(card.querySelector('.card-glow'), {
                    opacity: 0.1,
                    duration: 0.3
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.in'
                });
                gsap.to(card.querySelector('.card-glow'), {
                    opacity: 0,
                    duration: 0.3
                });
            });
        });
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Animations();
});
