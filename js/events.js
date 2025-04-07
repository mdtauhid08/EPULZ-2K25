document.addEventListener('DOMContentLoaded', () => {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        // Initialize tilt effect
        VanillaTilt.init(card, {
            max: 15,
            speed: 400,
            glare: true,
            'max-glare': 0.5,
            scale: 1.05
        });

        // Add hover animations
        card.addEventListener('mouseenter', () => {
            gsap.to(card.querySelector('.card-glow'), {
                opacity: 1,
                duration: 0.3
            });
            gsap.to(card.querySelector('.event-title'), {
                color: '#00f0ff',
                textShadow: '0 0 10px rgba(0, 240, 255, 0.5)',
                duration: 0.3
            });
            gsap.to(card.querySelector('.event-image img'), {
                scale: 1.1,
                duration: 0.5
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card.querySelector('.card-glow'), {
                opacity: 0,
                duration: 0.3
            });
            gsap.to(card.querySelector('.event-title'), {
                color: '#fff',
                textShadow: 'none',
                duration: 0.3
            });
            gsap.to(card.querySelector('.event-image img'), {
                scale: 1,
                duration: 0.5
            });
        });

        // Add click effect
        card.addEventListener('click', () => {
            gsap.to(card, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });
        });
    });
});