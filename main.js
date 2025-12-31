const START_YEAR = 2026;
const START_MONTH = 0;
const START_DAY = 1;

const container = document.getElementById('card-container');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const countdownDisplay = document.getElementById('countdown-display');
let timerInterval;

for (let i = 1; i <= 21; i++) {
    const card = document.createElement('div');
    const targetDate = new Date(START_YEAR, START_MONTH, START_DAY + (i - 1), 0, 0, 0);
    const now = new Date();
    const isLocked = now < targetDate;
    const dateLabel = targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    card.className = `card ${isLocked ? 'locked' : ''}`;
    card.innerHTML = `
        <div class="card-number">${i}</div>
        <div class="card-label">${dateLabel}</div>
    `;

    card.onclick = () => {
        if (isLocked) {
            openLockedModal(i, targetDate);
        } else {
            window.location.href = `note${i}.html`; 
        }
    };
    container.appendChild(card);
}

function openLockedModal(dayIndex, targetDate) {
    modal.style.display = 'flex';
    modalTitle.innerText = `locked.`;
    clearInterval(timerInterval);
    updateCountdown(targetDate);
    timerInterval = setInterval(() => updateCountdown(targetDate), 1000);
}

function updateCountdown(targetDate) {
    const now = new Date();
    const diff = targetDate - now;
    if (diff <= 0) {
        location.reload();
        return;
    }
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);
    countdownDisplay.innerText = `${d}d : ${h}h : ${m}m : ${s}s`;
}

function closeModal() {
    modal.style.display = 'none';
    clearInterval(timerInterval);
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const skipIntro = urlParams.get('skip');
    const overlay = document.getElementById('gift-overlay');
    const mainContent = document.getElementById('main-content');

    if (skipIntro === 'true') {
        overlay.style.display = 'none';
        mainContent.style.visibility = 'visible';
        document.body.style.overflow = 'auto';
    } else {
        document.body.style.overflow = 'hidden';
    }
});

function revealGift() {
    const box = document.getElementById('gift-box');
    const scaler = document.getElementById('gift-scaler');
    const clickText = document.querySelector('.click-text');
    
    clickText.style.opacity = '0';
    let count = 0;

    const shakeInt = setInterval(() => {
        count++;
        
        box.classList.add('shaking');

        let newScale = 1 + (count * 0.25); 
        scaler.style.transform = `scale(${newScale})`;

        setTimeout(() => {
            box.classList.remove('shaking');
        }, 500);

        if (count >= 3) {
            clearInterval(shakeInt);
            setTimeout(explode, 800); 
        }
    }, 1100);
}

function explode() {
    const scaler = document.getElementById('gift-scaler');
    const overlay = document.getElementById('gift-overlay');
    const mainContent = document.getElementById('main-content');

    scaler.style.transition = "transform 1.5s cubic-bezier(0.7, 0, 0.3, 1), opacity 1s";
    scaler.style.transform = "scale(10)";
    scaler.style.opacity = "0";

    setTimeout(() => {
        overlay.classList.add('revealed');
        mainContent.style.opacity = '1';
        spawnConfetti();
    }, 600);

    setTimeout(() => {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 2500);
}

function spawnConfetti() {
    const colors = ['#6c5ce7', '#ff7675', '#fdcb6e', '#55efc4', '#ffffff'];
    for (let i = 0; i < 300; i++) {
        const c = document.createElement('div');
        c.className = 'confetti';
        c.style.left = Math.random() * 100 + 'vw';
        c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        const duration = Math.random() * 2 + 3;
        const delay = Math.random() * 0.5;
        c.style.animation = `fall ${duration}s ${delay}s forwards ease-in`;
        
        document.body.appendChild(c);
        setTimeout(() => c.remove(), (duration + delay) * 1200);
    }
}

// Scroll-triggered animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

observer.observe(document.getElementById('grid-section'));