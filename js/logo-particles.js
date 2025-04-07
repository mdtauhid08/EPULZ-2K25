function createParticles() {
    const container = document.querySelector('.logo-particles');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'logo-particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 3}s`;
        container.appendChild(particle);
    }
}

document.addEventListener('DOMContentLoaded', createParticles);