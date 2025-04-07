class AudioVisualizer {
    constructor() {
        this.audio = new Audio();
        this.audio.src = 'assets/music/cyberpunk-background.mp3'; // You'll need to add your music file
        this.audio.loop = true;
        
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'audio-visualizer';
        document.body.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        this.audioContext = null;
        this.analyser = null;
        this.dataArray = null;
        this.isPlaying = false;
        this.particles = [];
        
        this.init();
    }

    init() {
        this.setupAudioContext();
        this.setupCanvas();
        this.createMusicToggle();
        this.animate();
        
        window.addEventListener('resize', () => this.setupCanvas());
    }

    setupAudioContext() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = this.audioContext.createAnalyser();
        
        const source = this.audioContext.createMediaElementSource(this.audio);
        source.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);
        
        this.analyser.fftSize = 256;
        const bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(bufferLength);
    }

    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createMusicToggle() {
        const toggle = document.createElement('div');
        toggle.className = 'music-toggle';
        toggle.innerHTML = `
            <div class="toggle-button">
                <i class="fas fa-volume-mute"></i>
                <div class="button-glow"></div>
            </div>
        `;
        document.body.appendChild(toggle);
        
        toggle.addEventListener('click', () => this.toggleMusic());
    }

    toggleMusic() {
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        
        if (!this.isPlaying) {
            this.audio.play();
            this.isPlaying = true;
            document.querySelector('.music-toggle i').className = 'fas fa-volume-up';
            
            // Start particle system
            this.createParticles();
        } else {
            this.audio.pause();
            this.isPlaying = false;
            document.querySelector('.music-toggle i').className = 'fas fa-volume-mute';
            
            // Clear particles
            this.particles = [];
        }
        
        // Animate toggle
        gsap.to('.toggle-button', {
            scale: 1.2,
            duration: 0.2,
            yoyo: true,
            repeat: 1
        });
    }

    createParticles() {
        const particleCount = 100;
        this.particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * 2 - 1,
                hue: Math.random() * 60 + 180 // Cyan to Purple
            });
        }
    }

    drawParticles(intensity) {
        this.particles.forEach(particle => {
            const normalizedIntensity = intensity / 255;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size * normalizedIntensity, 0, Math.PI * 2);
            this.ctx.fillStyle = `hsla(${particle.hue}, 100%, 50%, ${normalizedIntensity})`;
            this.ctx.fill();
            
            // Update position
            particle.x += particle.speedX * normalizedIntensity * 2;
            particle.y += particle.speedY * normalizedIntensity * 2;
            
            // Wrap around screen
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
        });
    }

    drawVisualizer() {
        this.analyser.getByteFrequencyData(this.dataArray);
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (!this.isPlaying) return;
        
        // Calculate average frequency
        const average = this.dataArray.reduce((a, b) => a + b) / this.dataArray.length;
        
        // Draw particles
        this.drawParticles(average);
        
        // Draw frequency bars
        const barWidth = (this.canvas.width / this.dataArray.length) * 2.5;
        let barHeight;
        let x = 0;
        
        for (let i = 0; i < this.dataArray.length; i++) {
            barHeight = this.dataArray[i] * 0.5;
            
            const hue = (i / this.dataArray.length) * 60 + 180; // Cyan to Purple
            this.ctx.fillStyle = `hsla(${hue}, 100%, 50%, 0.3)`;
            
            this.ctx.fillRect(
                x,
                this.canvas.height - barHeight,
                barWidth,
                barHeight
            );
            
            // Mirror effect
            this.ctx.fillRect(
                x,
                0,
                barWidth,
                barHeight
            );
            
            x += barWidth + 1;
        }
    }

    animate() {
        this.drawVisualizer();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize audio visualizer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AudioVisualizer();
});
