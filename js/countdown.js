class CountdownTimer {
    constructor() {
        // Set target date to April 24, 2025 09:00:00
        this.targetDate = new Date('2025-04-24T09:00:00');
        
        // Initialize elements
        this.elements = {
            days: document.querySelector('.countdown-days .countdown-number'),
            hours: document.querySelector('.countdown-hours .countdown-number'),
            minutes: document.querySelector('.countdown-minutes .countdown-number'),
            seconds: document.querySelector('.countdown-seconds .countdown-number')
        };
        
        this.init();
    }
    
    init() {
        this.updateCountdown();
        setInterval(() => this.updateCountdown(), 1000);
    }
    
    updateCountdown() {
        const now = new Date();
        const diff = Math.max(0, this.targetDate - now);
        
        if (diff === 0) {
            this.showEventStarted();
            return;
        }
        
        const times = {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((diff % (1000 * 60)) / 1000)
        };
        
        Object.entries(times).forEach(([unit, value]) => {
            const element = this.elements[unit];
            const newValue = String(value).padStart(2, '0');
            
            if (element.textContent !== newValue) {
                element.textContent = newValue;
                element.parentElement.classList.add('pulse');
                setTimeout(() => {
                    element.parentElement.classList.remove('pulse');
                }, 500);
            }
        });
    }
    
    showEventStarted() {
        Object.values(this.elements).forEach(element => {
            element.textContent = '00';
        });
        
        const container = document.querySelector('.countdown-container');
        const message = document.createElement('div');
        message.className = 'event-started-message';
        message.innerHTML = '<span class="neon-text">The Event Has Started!</span>';
        container.appendChild(message);
    }
}

// Initialize countdown when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CountdownTimer();
});
