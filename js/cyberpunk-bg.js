document.addEventListener('DOMContentLoaded', function() {
    // Create floating holograms
    const hologramsContainer = document.querySelector('.floating-holograms');
    for (let i = 0; i < 8; i++) {
        const hologram = document.createElement('div');
        hologram.className = 'hologram';
        hologram.style.top = `${Math.random() * 80}%`;
        hologram.style.left = `${Math.random() * 90}%`;
        hologram.style.width = `${40 + Math.random() * 80}px`;
        hologram.style.height = `${40 + Math.random() * 80}px`;
        hologram.style.animationDelay = `${Math.random() * 10}s`;
        hologramsContainer.appendChild(hologram);
    }
    
    // Create data streams
    for (let i = 0; i < 15; i++) {
        const dataStream = document.createElement('div');
        dataStream.className = 'data-stream';
        dataStream.style.top = `${Math.random() * 100}%`;
        dataStream.style.left = `${Math.random() * 100}%`;
        dataStream.style.height = `${50 + Math.random() * 150}px`;
        dataStream.style.animationDelay = `${Math.random() * 5}s`;
        hologramsContainer.appendChild(dataStream);
    }
    
    // Create particles
    const particlesContainer = document.querySelector('.particles-container');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${10 + Math.random() * 20}s`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particlesContainer.appendChild(particle);
    }
    
    // Optional: Initialize Vanta.js if available
    if (typeof VANTA !== 'undefined') {
        VANTA.NET({
            el: '.vanta-bg',
            mouseControls: false,
            touchControls: false,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x00ffff,
            backgroundColor: 0x000428,
            points: 10.00,
            maxDistance: 20.00,
            spacing: 16.00
        });
    }
});