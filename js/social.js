class SocialMenu {
    constructor() {
        this.container = document.querySelector('.social-menu');
        this.menuItems = [
            { icon: 'fa-discord', url: '#', color: '#7289da' },
            { icon: 'fa-instagram', url: '#', color: '#e1306c' },
            { icon: 'fa-twitter', url: '#', color: '#1da1f2' },
            { icon: 'fa-youtube', url: '#', color: '#ff0000' }
        ];
        
        this.init();
    }

    init() {
        this.createMenu();
        this.setupAnimations();
        this.setupInteractivity();
    }

    createMenu() {
        const menuHTML = this.menuItems.map((item, index) => `
            <div class="social-item" style="--delay: ${index * 0.1}s">
                <a href="${item.url}" target="_blank" rel="noopener noreferrer">
                    <i class="fab ${item.icon}"></i>
                    <div class="social-glow" style="--glow-color: ${item.color}"></div>
                </a>
            </div>
        `).join('');

        this.container.innerHTML = menuHTML;
    }

    setupAnimations() {
        const items = document.querySelectorAll('.social-item');
        
        // Initial state
        gsap.set(items, {
            x: 100,
            opacity: 0
        });

        // Animate in
        gsap.to(items, {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: this.container,
                start: 'top 80%'
            }
        });

        // Floating animation
        items.forEach(item => {
            gsap.to(item, {
                y: '10px',
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut'
            });
        });
    }

    setupInteractivity() {
        const items = document.querySelectorAll('.social-item');
        
        items.forEach(item => {
            const icon = item.querySelector('i');
            const glow = item.querySelector('.social-glow');
            
            item.addEventListener('mouseenter', () => {
                // Scale up icon
                gsap.to(icon, {
                    scale: 1.2,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                
                // Enhance glow
                gsap.to(glow, {
                    scale: 1.5,
                    opacity: 0.8,
                    duration: 0.3
                });
                
                // Add particle burst
                this.createParticleBurst(item);
            });

            item.addEventListener('mouseleave', () => {
                gsap.to(icon, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.in'
                });
                
                gsap.to(glow, {
                    scale: 1,
                    opacity: 0.3,
                    duration: 0.3
                });
            });
        });
    }

    createParticleBurst(item) {
        const particleCount = 10;
        const container = document.createElement('div');
        container.className = 'particle-container';
        item.appendChild(container);
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            container.appendChild(particle);
            
            const angle = (i / particleCount) * Math.PI * 2;
            const radius = gsap.utils.random(20, 40);
            
            gsap.set(particle, {
                x: 0,
                y: 0,
                scale: gsap.utils.random(0.5, 1)
            });
            
            gsap.to(particle, {
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius,
                opacity: 0,
                duration: gsap.utils.random(0.5, 1),
                ease: 'power2.out',
                onComplete: () => particle.remove()
            });
        }
        
        setTimeout(() => container.remove(), 1000);
    }
}

// Initialize social menu when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SocialMenu();
});
