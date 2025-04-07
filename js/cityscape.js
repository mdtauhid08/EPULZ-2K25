class Cityscape {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.buildings = [];
        this.particles = [];
        
        this.init();
    }

    init() {
        // Setup renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        document.querySelector('.hero').appendChild(this.renderer.domElement);
        
        // Setup camera
        this.camera.position.z = 15;
        this.camera.position.y = 5;
        this.camera.rotation.x = -0.2;
        
        // Add lights
        this.addLights();
        
        // Create city
        this.createCity();
        
        // Add particles
        this.createParticles();
        
        // Handle resize
        window.addEventListener('resize', () => this.onWindowResize());
        
        // Start animation
        this.animate();
    }

    addLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);
        
        // Main directional light
        const mainLight = new THREE.DirectionalLight(0x00f0ff, 1);
        mainLight.position.set(0, 10, 10);
        this.scene.add(mainLight);
        
        // Accent lights
        const pinkLight = new THREE.PointLight(0xff00f7, 1, 50);
        pinkLight.position.set(-10, 5, 5);
        this.scene.add(pinkLight);
        
        const purpleLight = new THREE.PointLight(0x6f00ff, 1, 50);
        purpleLight.position.set(10, 5, 5);
        this.scene.add(purpleLight);
    }

    createCity() {
        const buildingCount = 50;
        const citySize = 100;
        
        for (let i = 0; i < buildingCount; i++) {
            const height = Math.random() * 10 + 2;
            const width = Math.random() * 2 + 0.5;
            const depth = Math.random() * 2 + 0.5;
            
            const geometry = new THREE.BoxGeometry(width, height, depth);
            const material = new THREE.MeshPhongMaterial({
                color: 0x1a1a1a,
                emissive: 0x000000,
                specular: 0x666666,
                shininess: 10
            });
            
            const building = new THREE.Mesh(geometry, material);
            
            // Random position within city bounds
            building.position.x = Math.random() * citySize - citySize/2;
            building.position.z = Math.random() * citySize - citySize/2;
            building.position.y = height/2;
            
            this.buildings.push(building);
            this.scene.add(building);
            
            // Add glowing edges
            this.addBuildingEdges(building, width, height, depth);
        }
    }

    addBuildingEdges(building, width, height, depth) {
        const edges = new THREE.EdgesGeometry(building.geometry);
        const line = new THREE.LineSegments(
            edges,
            new THREE.LineBasicMaterial({ 
                color: 0x00f0ff,
                transparent: true,
                opacity: 0.3
            })
        );
        building.add(line);
    }

    createParticles() {
        const particleCount = 1000;
        const particleGeometry = new THREE.BufferGeometry();
        const particleMaterial = new THREE.PointsMaterial({
            size: 0.05,
            map: this.createParticleTexture(),
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 50;
            positions[i3 + 1] = Math.random() * 30;
            positions[i3 + 2] = (Math.random() - 0.5) * 50;
            
            // Alternate between cyan and pink
            const color = Math.random() > 0.5 ? 
                new THREE.Color(0x00f0ff) : 
                new THREE.Color(0xff00f7);
            
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
        }
        
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        this.particles = new THREE.Points(particleGeometry, particleMaterial);
        this.scene.add(this.particles);
    }

    createParticleTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        
        const context = canvas.getContext('2d');
        const gradient = context.createRadialGradient(8, 8, 0, 8, 8, 8);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        
        context.fillStyle = gradient;
        context.fillRect(0, 0, 16, 16);
        
        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Rotate buildings slightly
        this.buildings.forEach(building => {
            building.rotation.y += 0.001;
        });
        
        // Animate particles
        if (this.particles) {
            this.particles.rotation.y += 0.0005;
            const positions = this.particles.geometry.attributes.position.array;
            
            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 1] -= 0.01; // Move particles down
                
                // Reset particles that fall below ground
                if (positions[i + 1] < 0) {
                    positions[i + 1] = 30;
                }
            }
            
            this.particles.geometry.attributes.position.needsUpdate = true;
        }
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize cityscape when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Cityscape();
});
