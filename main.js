const START_YEAR = 2026;
const START_MONTH = 0;
const START_DAY = 1;

const container = document.getElementById('card-container');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalText = document.getElementById('modal-text');
const countdownDisplay = document.getElementById('countdown-display');

let timerInterval;

// Initialize Cards
for (let i = 1; i <= 21; i++) {
    const card = document.createElement('div');
    
    // Logic to calculate the specific unlock date for each card
    // Card 1 = Dec 30, Card 2 = Dec 31, Card 3 = Jan 1...
    const targetDate = new Date(START_YEAR, START_MONTH, START_DAY + (i - 1), 0, 0, 0);
    
    const now = new Date();
    const isLocked = now < targetDate;

    // Formatting date label for the card (e.g., "Dec 30" or "Jan 01")
    const dateLabel = targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    card.className = `card ${isLocked ? 'locked' : ''}`;
    card.innerHTML = `
        <div class="card-number">${i}</div>
        <div class="card-label">${dateLabel}</div>
    `;

    card.onclick = () => openModal(i, targetDate, isLocked);
    container.appendChild(card);
}

// Modal and Timer Logic
function openModal(dayIndex, targetDate, isLocked) {
    modal.style.display = 'flex';
    clearInterval(timerInterval);

    if (isLocked) {
        modalTitle.innerText = `Locked`;
        modalText.innerText = "This note will unlock on " + targetDate.toLocaleDateString() + " at midnight:";
        
        // Start the countdown immediately
        updateCountdown(targetDate);
        timerInterval = setInterval(() => updateCountdown(targetDate), 1000);
    } else {
        modalTitle.innerText = targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        modalText.innerText = getMessageForDay(dayIndex);
        countdownDisplay.innerText = ""; // Clear timer if unlocked
    }
}

function updateCountdown(targetDate) {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
        clearInterval(timerInterval);
        location.reload(); // Refresh to unlock the card once time is up
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);

    // Displaying DD:HH:MM:SS
    countdownDisplay.innerText = 
        `${String(d).padStart(2, '0')}d : ${String(h).padStart(2, '0')}h : ${String(m).padStart(2, '0')}m : ${String(s).padStart(2, '0')}s`;
}

function closeModal() {
    modal.style.display = 'none';
    clearInterval(timerInterval);
}

// Messages
function getMessageForDay(day) {
    const messages = {
        1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        2: "Last day of 2025! I'm so glad I spent it with you.",
        3: "Happy New Year! Here is to a 2026 filled with...",
        // ... Add messages for days 4 through 21 here
        21: "The final card! Happy Birthday! (Jan 19th)"
    };
    return messages[day] || "The message for this day is coming soon!";
}

// Readme
function openReadme() {
    modal.style.display = 'flex';
    clearInterval(timerInterval);
    modalTitle.innerText = "The Rules of the Journey";
    countdownDisplay.innerText = "";
    modalText.innerHTML = `
        <div style="text-align: left; line-height: 1.8;">
            <p>1. Each day from now until January 19th, a new card will unlock.</p>
            <p>2. If you try to peek early, you'll see a countdown timer!</p>
            <p>3. Every note is a little piece of why you're special to me.</p>
            <p><strong>Enjoy the countdown!</strong></p>
        </div>
    `;
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