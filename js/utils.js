// Event card image mapping
const EVENT_IMAGES = {
    'techtalktitans': {
        src: 'assets/images/icons/lightbulb-chat.svg',
        alt: 'Light bulb in chat bubble icon',
        color: 'rgba(0, 255, 255, 0.2)',
        bgColor: '#001428',
        icon: true
    },
    'prototypeparade': {
        src: 'assets/images/icons/game-console.svg',
        alt: 'Game console with circuit connections icon',
        color: 'rgba(0, 255, 255, 0.2)',
        bgColor: '#001428',
        icon: true
    },
    'bugslay': {
        src: 'assets/images/icons/bug-target.svg',
        alt: 'Bug in crosshair icon',
        color: 'rgba(0, 255, 255, 0.2)',
        bgColor: '#001428',
        icon: true
    },
    'brainbytebrawl': {
        src: 'assets/images/icons/brain-circuit.svg',
        alt: 'Brain with digital circuit icon',
        color: 'rgba(0, 255, 255, 0.2)',
        bgColor: '#001428',
        icon: true
    },
    'decode-x': {
        src: 'assets/images/icons/lock-code.svg',
        alt: 'Lock with code brackets icon',
        color: 'rgba(0, 255, 255, 0.2)',
        bgColor: '#001428',
        icon: true
    },
    'linkstorm': {
        src: 'assets/images/icons/network-nodes.svg',
        alt: 'Connected network nodes icon',
        color: 'rgba(0, 255, 255, 0.2)',
        bgColor: '#001428',
        icon: true
    },
    'beatfusion': {
        src: 'assets/images/icons/music-mixer.svg',
        alt: 'Music mixer console icon',
        color: 'rgba(0, 255, 255, 0.2)',
        bgColor: '#001428',
        icon: true
    },
    'clickastery': {
        src: 'assets/images/icons/camera-stars.svg',
        alt: 'Camera with stars icon',
        color: 'rgba(0, 255, 255, 0.2)',
        bgColor: '#001428',
        icon: true
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        const title = card.querySelector('.event-title')
            .textContent.toLowerCase()
            .replace(/[\s-]+/g, '');
        const imageContainer = card.querySelector('.event-image');
        const img = imageContainer.querySelector('img');
        
        if (EVENT_IMAGES[title]) {
            const eventImage = EVENT_IMAGES[title];
            img.src = eventImage.src;
            img.alt = eventImage.alt;
            imageContainer.style.backgroundColor = eventImage.bgColor;
            imageContainer.style.setProperty('--glow-color', eventImage.color);
            
            if (eventImage.icon) {
                img.classList.add('event-icon');
                imageContainer.classList.add('icon-container');
            }
        }
        
        img.addEventListener('load', () => {
            imageContainer.classList.remove('loading');
            imageContainer.classList.add('loaded');
            setTimeout(() => imageContainer.classList.add('glow-effect'), 100);
        });
        
        img.addEventListener('error', () => {
            console.warn(`Failed to load icon for ${title}`);
            imageContainer.classList.add('icon-error');
        });
    });
});