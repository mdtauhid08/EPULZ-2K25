class ParallaxEffect {
    constructor() {
        this.layers = [];
        this.mouse = { x: 0, y: 0 };
        this.isHovering = false;
        
        this.init();
    }

    init() {
        this.createLayers();
        this.setupEventListeners();
        this.animate();
    }

    createLayers() {
        const heroSection = document.querySelector('.hero');
        const layerCount = 5;
        
        for (let i = 0; i < layerCount; i++) {
            const layer = document.createElement('div');
            layer.className = `parallax-layer layer-${i}`;
            
            // Add different elements to each layer
            switch(i) {
                case 0: // Background layer
                    layer.innerHTML = `
                        <div class="cyber-grid"></div>
                        <div class="noise-overlay"></div>
                    `;
                    break;
                    
                case 1: // Floating shapes
                    for (let j = 0; j < 10; j++) {
                        const shape = document.createElement('div');
                        shape.className = 'floating-shape';
                        shape.style.setProperty('--delay', `${j * 0.5}s`);
                        layer.appendChild(shape);
                    }
                    break;
                    
                case 2: // Glitch text
                    layer.innerHTML = `
                        <div class="glitch-text">
                            <span class="glitch-layer">EPULZ</span>
                            <span class="glitch-layer">EPULZ</span>
                            <span>EPULZ</span>
                        </div>
                    `;
                    break;
                    
                case 3: // Circuit paths
                    layer.innerHTML = `
                        <svg class="circuit-paths" viewBox="0 0 100 100">
                            <path class="circuit-line" d="M10,50 Q30,30 50,50 T90,50"/>
                            <path class="circuit-line" d="M20,20 Q40,40 60,20 T100,20"/>
                            <path class="circuit-line" d="M0,80 Q20,60 40,80 T80,80"/>
                        </svg>
                    `;
                    break;
                    
                case 4: // Foreground elements
                    layer.innerHTML = `
                        <div class="cyber-particles"></div>
                    `;
                    break;
            }
            
            heroSection.appendChild(layer);
            this.layers.push({
                element: layer,
                speed: (i + 1) * 0.05,
                position: { x: 0, y: 0 },
                rotation: 0
            });
        }
    }

    setupEventListeners() {
        document.addEventListener('mousemove', (e) => {
            if (!this.isHovering) return;
            
            // Calculate mouse position relative to center
            const bounds = document.querySelector('.hero').getBoundingClientRect();
            this.mouse.x = (e.clientX - bounds.left - bounds.width / 2) / (bounds.width / 2);
            this.mouse.y = (e.clientY - bounds.top - bounds.height / 2) / (bounds.height / 2);
        });
        
        document.querySelector('.hero').addEventListener('mouseenter', () => {
            this.isHovering = true;
        });
        
        document.querySelector('.hero').addEventListener('mouseleave', () => {
            this.isHovering = false;
            // Reset positions smoothly
            gsap.to(this.layers.map(l => l.position), {
                x: 0,
                y: 0,
                duration: 1,
                ease: 'power2.out'
            });
        });
        
        // Handle device orientation for mobile
        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', (e) => {
                const tiltX = e.gamma / 45; // -1 to 1
                const tiltY = e.beta / 45;
                
                this.mouse.x = tiltX;
                this.mouse.y = tiltY;
            });
        }
    }

    createParticles() {
        const container = document.querySelector('.cyber-particles');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.setProperty('--delay', `${Math.random() * 5}s`);
            container.appendChild(particle);
        }
    }

    animate() {
        // Update layer positions
        this.layers.forEach(layer => {
            if (this.isHovering) {
                layer.position.x += (this.mouse.x * 30 * layer.speed - layer.position.x) * 0.1;
                layer.position.y += (this.mouse.y * 30 * layer.speed - layer.position.y) * 0.1;
                layer.rotation += (this.mouse.x * 15 * layer.speed - layer.rotation) * 0.1;
            }
            
            gsap.set(layer.element, {
                x: layer.position.x,
                y: layer.position.y,
                rotation: layer.rotation
            });
        });
        
        // Animate circuit paths
        const circuitLines = document.querySelectorAll('.circuit-line');
        circuitLines.forEach(line => {
            const length = line.getTotalLength();
            line.style.strokeDasharray = length;
            line.style.strokeDashoffset = length;
            
            gsap.to(line, {
                strokeDashoffset: 0,
                duration: 2,
                repeat: -1,
                ease: 'none'
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize parallax effect when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ParallaxEffect();
});
