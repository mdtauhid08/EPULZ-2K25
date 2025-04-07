class App {
    constructor() {
        this.initializeTheme();
        this.setupEventListeners();
        this.setupMobileMenu();
        this.setupEventCards();
    }

    initializeTheme() {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        document.getElementById('darkMode').checked = savedTheme === 'light';
    }

    setupEventListeners() {
        // Theme toggle
        document.getElementById('darkMode').addEventListener('change', (e) => {
            const theme = e.target.checked ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        });

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Google Forms tracking (optional)
        const formIframe = document.querySelector('.google-form-container iframe');
        if (formIframe) {
            formIframe.addEventListener('load', () => {
                console.log('Google Form loaded successfully');
            });
        }
    }

    setupMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });

        // Handle touch gestures
        const hammer = new Hammer(document.body);
        hammer.on('swiperight', () => {
            navLinks.classList.add('active');
            menuToggle.classList.add('active');
        });
        
        hammer.on('swipeleft', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    }

    setupEventCards() {
        const events = [
            {
                title: 'Cyber CTF',
                description: 'Test your cybersecurity skills in our Capture The Flag competition.',
                icon: 'fa-flag',
                category: 'technical'
            },
            {
                title: 'AI Hackathon',
                description: 'Build innovative AI solutions in 24 hours.',
                icon: 'fa-robot',
                category: 'technical'
            },
            {
                title: 'Web3 Workshop',
                description: 'Learn about blockchain and decentralized applications.',
                icon: 'fa-cube',
                category: 'technical'
            },
            {
                title: 'Cyber Art',
                description: 'Digital art competition with cyberpunk theme.',
                icon: 'fa-paint-brush',
                category: 'non-technical'
            },
            {
                title: 'Tech Quiz',
                description: 'Test your knowledge of technology and science.',
                icon: 'fa-question-circle',
                category: 'non-technical'
            },
            {
                title: 'Gaming Tournament',
                description: 'Compete in our esports tournament.',
                icon: 'fa-gamepad',
                category: 'non-technical'
            }
        ];

        // Populate event cards
        events.forEach(event => {
            const cardHTML = this.createEventCard(event);
            const container = document.querySelector(`.${event.category} .events-grid`);
            if (container) {
                container.insertAdjacentHTML('beforeend', cardHTML);
            }
        });

        // Initialize tilt effect
        VanillaTilt.init(document.querySelectorAll('.event-card'), {
            max: 15,
            speed: 400,
            glare: true,
            'max-glare': 0.5
        });
    }

    createEventCard(event) {
        return `
            <div class="event-card" data-tilt>
                <div class="card-front">
                    <i class="fas ${event.icon} card-icon"></i>
                    <h3 class="card-title">${event.title}</h3>
                    <p class="card-description">${event.description}</p>
                    <button class="cta-button">
                        <span class="button-text">Learn More</span>
                        <div class="button-glitch"></div>
                        <div class="button-glow"></div>
                    </button>
                </div>
                <div class="card-glow"></div>
            </div>
        `;
    }


}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
