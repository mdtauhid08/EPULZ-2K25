class Grid3D {
    constructor() {
        this.canvas = document.getElementById('grid-canvas');
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
        
        this.init();
        this.createGrid();
        this.addParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.onWindowResize());
    }
    
    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        
        this.camera.position.set(0, 10, 20);
        this.camera.lookAt(0, 0, 0);
        
        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
        
        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0x00f0ff, 1);
        directionalLight.position.set(0, 1, 0);
        this.scene.add(directionalLight);
    }
    
    createGrid() {
        // Create grid material
        const gridMaterial = new THREE.LineBasicMaterial({
            color: 0x00f0ff,
            transparent: true,
            opacity: 0.3
        });
        
        const size = 100;
        const divisions = 50;
        
        // Create grid helper
        const gridHelper = new THREE.GridHelper(size, divisions, 0x00f0ff, 0x00f0ff);
        gridHelper.material.opacity = 0.1;
        gridHelper.material.transparent = true;
        this.scene.add(gridHelper);
        
        // Create vertical lines
        const verticalLines = new THREE.Group();
        for (let i = -size/2; i <= size/2; i += size/divisions) {
            const geometry = new THREE.BufferGeometry();
            const points = [
                new THREE.Vector3(i, -10, -size/2),
                new THREE.Vector3(i, -10, size/2)
            ];
            geometry.setFromPoints(points);
            const line = new THREE.Line(geometry, gridMaterial);
            verticalLines.add(line);
        }
        this.scene.add(verticalLines);
    }
    
    addParticles() {
        const particleCount = 200;
        const particles = new THREE.Group();
        
        const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
        const particleMaterial = new THREE.MeshBasicMaterial({
            color: 0xff00f7,
            transparent: true,
            opacity: 0.6
        });
        
        for (let i = 0; i < particleCount; i++) {
            const particle = new THREE.Mesh(particleGeometry, particleMaterial);
            
            // Random position
            particle.position.x = Math.random() * 40 - 20;
            particle.position.y = Math.random() * 20 - 10;
            particle.position.z = Math.random() * 40 - 20;
            
            // Store initial position for animation
            particle.userData.initialY = particle.position.y;
            particle.userData.speed = Math.random() * 0.02 + 0.01;
            
            particles.add(particle);
        }
        
        this.particles = particles;
        this.scene.add(particles);
    }
    
    animateParticles() {
        this.particles.children.forEach(particle => {
            particle.position.y = particle.userData.initialY + 
                Math.sin(Date.now() * particle.userData.speed) * 2;
            
            particle.material.opacity = 0.3 + 
                Math.sin(Date.now() * particle.userData.speed * 0.5) * 0.3;
        });
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Rotate camera around the scene
        const time = Date.now() * 0.0001;
        this.camera.position.x = Math.cos(time) * 30;
        this.camera.position.z = Math.sin(time) * 30;
        this.camera.lookAt(0, 0, 0);
        
        // Animate particles
        this.animateParticles();
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize grid when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Grid3D();
});
