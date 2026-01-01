const audio = document.getElementById('bg-music');
const volumeSlider = document.getElementById('volume-slider');
const toggleBtn = document.getElementById('music-toggle');
const volumeWaves = document.getElementById('volume-waves');

// Initial
audio.volume = 0.35;
if (volumeWaves) volumeWaves.style.opacity = "0"; 

function openLetter() {
    const overlay = document.getElementById('envelope-overlay');

    overlay.classList.add('opened');
    
    audio.play().then(() => {
        if (volumeWaves) volumeWaves.style.opacity = "1";
    }).catch(err => {
        console.log("Audio play failed:", err);
    });

    setTimeout(() => {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 1200);
}

document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
});

// Volume Control
toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    if (audio.paused) {
        audio.play();
        volumeWaves.style.opacity = "1";
    } else {
        audio.pause();
        volumeWaves.style.opacity = "0";
    }
});

volumeSlider.addEventListener('input', (e) => {
    const val = e.target.value;
    audio.volume = val;
    volumeWaves.style.opacity = val > 0.05 ? "1" : "0.2";
});