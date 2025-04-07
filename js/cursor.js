class CursorEffect {
    constructor() {
        this.createCursorElements();
        this.init();
    }

    createCursorElements() {
        // Create cursor container
        this.container = document.createElement('div');
        this.container.className = 'cursor-container';

        // Create cursor elements
        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor';

        this.ring = document.createElement('div');
        this.ring.className = 'cursor-ring';

        this.lines = document.createElement('div');
        this.lines.className = 'cursor-lines';

        // Create cursor lines
        for (let i = 0; i < 4; i++) {
            const line = document.createElement('div');
            line.className = 'cursor-line';
            this.lines.appendChild(line);
        }

        // Create trail container
        this.trail = document.createElement('div');
        this.trail.className = 'cursor-trail';
        document.body.appendChild(this.trail);

        // Create trail dots
        this.trailDots = [];
        this.maxTrailDots = 10;
        for (let i = 0; i < this.maxTrailDots; i++) {
            const dot = document.createElement('div');
            dot.className = 'trail-dot';
            this.trail.appendChild(dot);
            this.trailDots.push({
                element: dot,
                x: 0,
                y: 0
            });
        }

        // Append elements
        this.container.appendChild(this.cursor);
        this.container.appendChild(this.ring);
        this.container.appendChild(this.lines);
        document.body.appendChild(this.container);

        // Initialize positions and settings
        this.pos = { x: 0, y: 0 };
        this.mouse = { x: 0, y: 0 };
        this.velocity = { x: 0, y: 0 };
        this.lastMouse = { x: 0, y: 0 };
        this.speed = 0.16;
        this.trailSpeed = 0.3;
        this.currentElement = null;
        this.lastTime = performance.now();
    }

    init() {
        this.setupEventListeners();
        this.animate();
    }

    setupEventListeners() {
        // Mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;

            // Calculate velocity
            this.velocity.x = this.mouse.x - this.lastMouse.x;
            this.velocity.y = this.mouse.y - this.lastMouse.y;

            this.lastMouse.x = this.mouse.x;
            this.lastMouse.y = this.mouse.y;
        });

        // Mouse click
        document.addEventListener('mousedown', () => {
            this.container.classList.add('clicking');
        });

        document.addEventListener('mouseup', () => {
            this.container.classList.remove('clicking');
        });

        // Mouse enter/leave
        document.addEventListener('mouseleave', () => {
            this.container.style.opacity = '0';
            this.trail.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            this.container.style.opacity = '1';
            this.trail.style.opacity = '1';
        });

        // Interactive elements
        const interactiveElements = document.querySelectorAll(
            'a, button, .register-button, .countdown-ring, .nav-link'
        );

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.container.classList.add('hover');
                this.currentElement = el;
            });

            el.addEventListener('mouseleave', () => {
                this.container.classList.remove('hover');
                this.currentElement = null;
            });
        });
    }

    updateTrail() {
        // Update trail positions
        for (let i = this.trailDots.length - 1; i > 0; i--) {
            const dot = this.trailDots[i];
            const prevDot = this.trailDots[i - 1];

            dot.x += (prevDot.x - dot.x) * this.trailSpeed;
            dot.y += (prevDot.y - dot.y) * this.trailSpeed;

            const scale = (this.trailDots.length - i) / this.trailDots.length;
            const opacity = scale * 0.5;

            dot.element.style.transform = `translate(${dot.x}px, ${dot.y}px)`;
            dot.element.style.opacity = opacity;
        }

        // Update first dot position
        this.trailDots[0].x = this.pos.x;
        this.trailDots[0].y = this.pos.y;
        this.trailDots[0].element.style.transform = `translate(${this.pos.x}px, ${this.pos.y}px)`;
        this.trailDots[0].element.style.opacity = 0.5;
    }

    animate() {
        const currentTime = performance.now();
        const deltaTime = (currentTime - this.lastTime) / 16; // Normalize to 60fps
        this.lastTime = currentTime;

        if (this.currentElement) {
            // Add magnetic effect
            const bounds = this.currentElement.getBoundingClientRect();
            const centerX = bounds.left + bounds.width / 2;
            const centerY = bounds.top + bounds.height / 2;
            
            this.pos.x += (centerX - this.pos.x) * this.speed * deltaTime;
            this.pos.y += (centerY - this.pos.y) * this.speed * deltaTime;
        } else {
            // Normal cursor following with velocity
            const targetX = this.mouse.x + this.velocity.x * 2;
            const targetY = this.mouse.y + this.velocity.y * 2;

            this.pos.x += (targetX - this.pos.x) * this.speed * deltaTime;
            this.pos.y += (targetY - this.pos.y) * this.speed * deltaTime;
        }

        // Update cursor position
        this.container.style.transform = `translate(${this.pos.x}px, ${this.pos.y}px)`;

        // Update trail
        this.updateTrail();

        // Decay velocity
        this.velocity.x *= 0.9;
        this.velocity.y *= 0.9;

        // Continue animation
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize cursor effect when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CursorEffect();
});
