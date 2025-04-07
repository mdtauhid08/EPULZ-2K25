class Loader {
    constructor() {
        this.loader = document.querySelector('.loader');
        this.progressBar = document.querySelector('.progress-bar');
        this.loaderText = document.querySelector('.loader-text');
        this.resources = [
            '/js/background.js',
            '/js/animations.js',
            '/js/countdown.js',
            '/js/cityscape.js',
            '/css/style.css',
            '/css/animations.css',
            '/css/components.css'
        ];
        this.loadedResources = 0;
        
        this.init();
    }

    init() {
        // Add hexagonal border to loader
        this.createHexBorder();
        
        // Start loading animation
        this.startLoading();
        
        // Simulate resource loading
        this.loadResources();
    }

    createHexBorder() {
        const hexContainer = document.createElement('div');
        hexContainer.className = 'hex-border';
        
        // Create SVG hexagon
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 100 100');
        
        const hexPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        hexPath.setAttribute('d', 'M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z');
        hexPath.setAttribute('fill', 'none');
        hexPath.setAttribute('stroke', 'var(--primary-color)');
        hexPath.setAttribute('stroke-width', '1');
        
        svg.appendChild(hexPath);
        hexContainer.appendChild(svg);
        this.loader.insertBefore(hexContainer, this.loader.firstChild);
    }

    startLoading() {
        // Add glitch effect to loader logo
        const logo = document.querySelector('.loader-logo');
        this.addGlitchEffect(logo);
        
        // Add scanline effect
        this.createScanlines();
        
        // Start progress animation
        this.updateProgress(0);
    }

    addGlitchEffect(element) {
        const content = element.textContent;
        element.innerHTML = `
            <span class="glitch-layer">${content}</span>
            <span class="glitch-layer">${content}</span>
            <span class="main-layer">${content}</span>
        `;
    }

    createScanlines() {
        const scanlines = document.createElement('div');
        scanlines.className = 'scanlines';
        this.loader.appendChild(scanlines);
    }

    updateProgress(progress) {
        this.progressBar.style.width = `${progress}%`;
        
        // Add glow effect based on progress
        const hue = 180 + (progress * 1.8); // Cyan to Pink
        this.progressBar.style.boxShadow = `0 0 10px hsl(${hue}, 100%, 50%)`;
        
        // Update loading text
        const dots = '.'.repeat(Math.floor((progress % 3)) + 1);
        this.loaderText.textContent = `System Initializing${dots}`;
    }

    loadResources() {
        let progress = 0;
        const increment = 100 / this.resources.length;
        
        // Simulate loading each resource
        this.resources.forEach((resource, index) => {
            setTimeout(() => {
                this.loadedResources++;
                progress = (this.loadedResources / this.resources.length) * 100;
                this.updateProgress(progress);
                
                if (this.loadedResources === this.resources.length) {
                    this.finishLoading();
                }
            }, index * 500); // Stagger loading for visual effect
        });
    }

    finishLoading() {
        // Add final glitch effect
        this.loader.classList.add('glitch-out');
        
        setTimeout(() => {
            // Hide loader
            gsap.to(this.loader, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    this.loader.style.display = 'none';
                    
                    // Trigger entrance animations for main content
                    this.animateEntrance();
                }
            });
        }, 500);
    }

    animateEntrance() {
        // Animate hero section elements
        gsap.from('.hero-content > *', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
        });
        
        // Animate navbar
        gsap.from('.navbar', {
            y: -50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }
}

// Initialize loader when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Loader();
});
