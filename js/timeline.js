class Timeline {
    constructor() {
        this.timeline = document.querySelector('.timeline');
        this.events = [
            {
                date: '2025-04-15',
                time: '09:00',
                title: 'Opening Ceremony',
                description: 'Welcome to EPULZ 2K25',
                icon: 'fa-rocket'
            },
            {
                date: '2025-04-15',
                time: '10:30',
                title: 'Cyber CTF Begins',
                description: '24-hour hacking challenge',
                icon: 'fa-flag'
            },
            {
                date: '2025-04-15',
                time: '14:00',
                title: 'AI Workshop',
                description: 'Future of AI in Cybersecurity',
                icon: 'fa-robot'
            },
            {
                date: '2025-04-16',
                time: '10:00',
                title: 'Web3 Hackathon',
                description: 'Build the future of web',
                icon: 'fa-cube'
            },
            {
                date: '2025-04-16',
                time: '16:00',
                title: 'Gaming Tournament',
                description: 'Esports championship finals',
                icon: 'fa-gamepad'
            },
            {
                date: '2025-04-16',
                time: '19:00',
                title: 'Closing Ceremony',
                description: 'Awards and celebrations',
                icon: 'fa-trophy'
            }
        ];
        
        this.init();
    }

    init() {
        this.createTimeline();
        this.setupScrollAnimation();
        this.setupHoverEffects();
    }

    createTimeline() {
        const timelineHTML = this.events.map((event, index) => `
            <div class="timeline-item ${index % 2 === 0 ? 'left' : 'right'}" data-aos="fade-up">
                <div class="timeline-content glass-card">
                    <div class="event-icon">
                        <i class="fas ${event.icon}"></i>
                        <div class="icon-glow"></div>
                    </div>
                    <div class="event-time">${event.time}</div>
                    <h3 class="event-title">${event.title}</h3>
                    <p class="event-description">${event.description}</p>
                    <div class="time-marker"></div>
                    <div class="connect-line"></div>
                </div>
            </div>
        `).join('');

        this.timeline.innerHTML = timelineHTML;
    }

    setupScrollAnimation() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        gsap.set(timelineItems, { opacity: 0, y: 50 });

        ScrollTrigger.batch(timelineItems, {
            onEnter: batch => {
                gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.2,
                    duration: 1,
                    ease: 'power4.out'
                });
            },
            start: 'top 80%'
        });
    }

    setupHoverEffects() {
        const items = document.querySelectorAll('.timeline-content');
        
        items.forEach(item => {
            item.addEventListener('mouseenter', () => {
                gsap.to(item, {
                    scale: 1.05,
                    boxShadow: '0 0 30px var(--primary-color)',
                    duration: 0.3
                });
                
                // Animate icon
                const icon = item.querySelector('.event-icon i');
                gsap.to(icon, {
                    rotate: 360,
                    scale: 1.2,
                    duration: 0.5
                });
                
                // Animate glow
                const glow = item.querySelector('.icon-glow');
                gsap.to(glow, {
                    scale: 1.5,
                    opacity: 0.8,
                    duration: 0.3
                });
            });

            item.addEventListener('mouseleave', () => {
                gsap.to(item, {
                    scale: 1,
                    boxShadow: '0 0 20px rgba(0, 240, 255, 0.1)',
                    duration: 0.3
                });
                
                const icon = item.querySelector('.event-icon i');
                gsap.to(icon, {
                    rotate: 0,
                    scale: 1,
                    duration: 0.5
                });
                
                const glow = item.querySelector('.icon-glow');
                gsap.to(glow, {
                    scale: 1,
                    opacity: 0.3,
                    duration: 0.3
                });
            });
        });
    }
}

// Initialize timeline when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Timeline();
});
