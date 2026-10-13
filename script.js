// Confetti Animation
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    const colors = ['#667eea', '#764ba2', '#f093fb', '#FFD700', '#FF69B4', '#00FFFF'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confettiContainer.appendChild(confetti);
    }
}

// Create confetti on page load
window.addEventListener('load', () => {
    createConfetti();
    
    // Add entrance animations
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
            section.style.transition = 'all 1s ease';
            
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
});

// Interactive cake candles - OLD STYLE
const candles = document.querySelectorAll('.flame');
let candlesBlown = 0;

candles.forEach(candle => {
    candle.addEventListener('click', function() {
        this.style.opacity = '0';
        this.style.transform = 'scale(0)';
        candlesBlown++;
        
        if (candlesBlown === candles.length) {
            setTimeout(() => {
                alert('🎉 You blew out all the candles! Make a wish for Jimin! 💜');
                // Relight candles
                candles.forEach(c => {
                    c.style.opacity = '1';
                    c.style.transform = 'scale(1)';
                });
                candlesBlown = 0;
            }, 500);
        }
    });
});

// NEW AESTHETIC CANDLES INTERACTION
const aestheticCandles = document.querySelectorAll('.aesthetic-candle');
let aestheticCandlesBlown = 0;

aestheticCandles.forEach((candle, index) => {
    candle.addEventListener('click', function() {
        const flame = this.querySelector('.aesthetic-flame');
        if (flame && flame.style.opacity !== '0') {
            // Blow out effect
            flame.style.transition = 'all 0.5s ease';
            flame.style.opacity = '0';
            flame.style.transform = 'translateX(-50%) scale(0)';
            
            // Create smoke effect
            createSmoke(this);
            
            aestheticCandlesBlown++;
            
            // Check if all candles are blown out
            if (aestheticCandlesBlown === aestheticCandles.length) {
                setTimeout(() => {
                    // Show celebration message
                    showCelebration();
                    
                    // Relight all candles after 3 seconds
                    setTimeout(() => {
                        aestheticCandles.forEach(c => {
                            const f = c.querySelector('.aesthetic-flame');
                            if (f) {
                                f.style.opacity = '1';
                                f.style.transform = 'translateX(-50%) scale(1)';
                            }
                        });
                        aestheticCandlesBlown = 0;
                    }, 3000);
                }, 500);
            }
        }
    });
});

function createSmoke(candleElement) {
    const smoke = document.createElement('div');
    smoke.innerHTML = '💨';
    smoke.style.cssText = `
        position: absolute;
        top: -30px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 1.5rem;
        z-index: 100;
        animation: smokeRise 1s ease-out forwards;
        pointer-events: none;
    `;
    candleElement.appendChild(smoke);
    setTimeout(() => smoke.remove(), 1000);
}

function showCelebration() {
    const celebration = document.createElement('div');
    celebration.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, rgba(124, 58, 237, 0.98) 0%, rgba(139, 92, 246, 0.98) 100%);
        padding: 50px 60px;
        border-radius: 30px;
        box-shadow: 0 30px 80px rgba(124, 58, 237, 0.7);
        z-index: 10001;
        text-align: center;
        border: 3px solid #ffd700;
        animation: popIn 0.5s ease-out;
    `;
    
    celebration.innerHTML = `
        <div style="color: #ffd700; font-size: 3rem; margin-bottom: 20px;">
            🎉✨🎂✨🎉
        </div>
        <h2 style="color: #ffffff; font-size: 2.5rem; margin-bottom: 15px; text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);">
            All Candles Blown! 💜
        </h2>
        <p style="color: #fde047; font-size: 1.5rem; margin-bottom: 25px; font-style: italic;">
            Make a wish for Jimin's happiness! 🌟
        </p>
        <p style="color: #a78bfa; font-size: 1.2rem;">
            May all his dreams come true! 💫
        </p>
    `;
    
    // Create backdrop
    const backdrop = document.createElement('div');
    backdrop.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 10000;
        animation: fadeIn 0.3s ease-out;
    `;
    
    document.body.appendChild(backdrop);
    document.body.appendChild(celebration);
    
    // Create extra confetti
    for (let i = 0; i < 50; i++) {
        setTimeout(() => createFloatingHeart(), i * 50);
    }
    
    // Remove after 3 seconds
    setTimeout(() => {
        celebration.style.animation = 'popOut 0.5s ease-in';
        backdrop.style.animation = 'fadeOut 0.5s ease-in';
        setTimeout(() => {
            celebration.remove();
            backdrop.remove();
        }, 500);
    }, 3000);
}

// Add CSS animations for smoke and celebration
const candleStyle = document.createElement('style');
candleStyle.textContent = `
    @keyframes smokeRise {
        0% {
            opacity: 1;
            transform: translateX(-50%) translateY(0) scale(0.5);
        }
        100% {
            opacity: 0;
            transform: translateX(-50%) translateY(-50px) scale(1.5);
        }
    }
    
    @keyframes popIn {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
        100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
    
    @keyframes popOut {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
    }
    
    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
    
    @keyframes fadeOut {
        0% { opacity: 1; }
        100% { opacity: 0; }
    }
`;
document.head.appendChild(candleStyle);

// Floating hearts effect
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💜';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.bottom = '-50px';
    heart.style.fontSize = '2rem';
    heart.style.zIndex = '1000';
    heart.style.pointerEvents = 'none';
    heart.style.transition = 'all 4s ease-out';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.style.bottom = window.innerHeight + 50 + 'px';
        heart.style.opacity = '0';
        heart.style.transform = 'rotate(360deg)';
    }, 100);
    
    setTimeout(() => {
        heart.remove();
    }, 4000);
}

// Create floating hearts periodically
setInterval(createFloatingHeart, 2000);

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.photo-card, .member-card, .wish-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Birthday message popup
setTimeout(() => {
    const message = document.createElement('div');
    message.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            z-index: 10000;
            text-align: center;
            max-width: 500px;
        ">
            <h2 style="color: #764ba2; font-size: 2rem; margin-bottom: 20px;">
                🎂 Happy Birthday Jimin! 💜
            </h2>
            <p style="font-size: 1.2rem; color: #666; margin-bottom: 20px;">
                Welcome to your special birthday celebration!
            </p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                padding: 15px 40px;
                border-radius: 30px;
                font-size: 1.1rem;
                cursor: pointer;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            ">
                Let's Celebrate! 🎉
            </button>
        </div>
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 9999;
        " onclick="this.parentElement.remove()"></div>
    `;
    document.body.appendChild(message);
}, 2000);

// Console message
console.log('%c💜 Happy Birthday Jimin! 💜', 'font-size: 30px; color: #764ba2; font-weight: bold;');
console.log('%c🎂 Made with love by ARMY 🎂', 'font-size: 20px; color: #667eea;');


// Music Player Functionality
let isPlaying = false;
const audio = document.getElementById('birthdayAudio');
const playBtn = document.getElementById('playBtn');
const playIcon = document.getElementById('playIcon');
const nowPlaying = document.getElementById('nowPlaying');

function toggleMusic() {
    if (isPlaying) {
        audio.pause();
        playIcon.textContent = '▶️ Play Birthday Music';
        nowPlaying.style.display = 'none';
        isPlaying = false;
    } else {
        audio.play();
        playIcon.textContent = '⏸️ Pause Music';
        nowPlaying.style.display = 'block';
        isPlaying = true;
    }
}

// Auto-play on page load (with user interaction)
window.addEventListener('load', () => {
    // Show play button prompt
    setTimeout(() => {
        const playMusic = confirm('🎵 Would you like to play birthday music for Jimin? 🎂💜');
        if (playMusic) {
            toggleMusic();
        }
    }, 2000);
    
    // Ensure audio is loaded
    audio.load();
});

// Gallery lightbox effect
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const overlay = this.querySelector('.gallery-overlay p');
        
        // Create fullscreen view
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 10000;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        `;
        
        const fullImg = document.createElement('img');
        fullImg.src = img.src;
        fullImg.style.cssText = `
            max-width: 90%;
            max-height: 80vh;
            border-radius: 15px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
        `;
        
        const caption = document.createElement('p');
        caption.textContent = overlay.textContent;
        caption.style.cssText = `
            color: white;
            font-size: 1.5rem;
            margin-top: 20px;
            text-align: center;
        `;
        
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✕ Close';
        closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: 2px solid white;
            padding: 10px 20px;
            border-radius: 30px;
            font-size: 1.2rem;
            cursor: pointer;
        `;
        
        lightbox.appendChild(fullImg);
        lightbox.appendChild(caption);
        lightbox.appendChild(closeBtn);
        
        lightbox.onclick = () => lightbox.remove();
        document.body.appendChild(lightbox);
    });
});

// Video autoplay on scroll
const videos = document.querySelectorAll('.video-wrapper iframe');
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Video is in view
            console.log('Video visible');
        }
    });
}, { threshold: 0.5 });

videos.forEach(video => videoObserver.observe(video.parentElement));

// Background music auto-resume
audio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
});

// Visual feedback for audio playing
setInterval(() => {
    if (isPlaying) {
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => {
            const height = Math.random() * 40 + 20;
            bar.style.height = height + 'px';
        });
    }
}, 200);

// Sparkling effect on images
galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        createSparkles(this);
    });
});

function createSparkles(element) {
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
            position: absolute;
            font-size: 1.5rem;
            pointer-events: none;
            z-index: 100;
            animation: sparkleFloat 1s ease-out forwards;
        `;
        
        const rect = element.getBoundingClientRect();
        sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
        sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    }
}

// Add sparkle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(0);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px) scale(1);
        }
    }
`;
document.head.appendChild(style);

console.log('%c🎵 Music Player Ready! 🎵', 'font-size: 20px; color: #7c3aed;');
console.log('%c📸 Gallery Interactive! 📸', 'font-size: 20px; color: #ffd700;');
