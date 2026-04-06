// ========================================
// DESIGN THINKING LECTURE — SLIDE ENGINE
// ========================================

(function() {
    const slides = document.querySelectorAll('.slide');
    const counter = document.getElementById('slideCounter');
    const progressBar = document.getElementById('progressBar');
    let current = 0;
    const total = slides.length;

    function updateSlide() {
        slides.forEach((s, i) => {
            s.classList.toggle('active', i === current);
        });
        counter.textContent = `${current + 1} / ${total}`;
        progressBar.style.width = `${((current + 1) / total) * 100}%`;

        // Update nav button colors for light backgrounds
        const bg = slides[current].dataset.bg;
        document.body.setAttribute('data-current-bg', bg);
    }

    function changeSlide(dir) {
        const next = current + dir;
        if (next >= 0 && next < total) {
            current = next;
            updateSlide();
        }
    }

    // Make changeSlide global for onclick handlers
    window.changeSlide = changeSlide;

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') {
            e.preventDefault();
            changeSlide(1);
        }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            changeSlide(-1);
        }
        if (e.key === 'Home') {
            e.preventDefault();
            current = 0;
            updateSlide();
        }
        if (e.key === 'End') {
            e.preventDefault();
            current = total - 1;
            updateSlide();
        }
        // Press 'f' for fullscreen
        if (e.key === 'f' || e.key === 'F') {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {});
            } else {
                document.exitFullscreen();
            }
        }
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchStartY = 0;
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
            changeSlide(dx < 0 ? 1 : -1);
        }
    }, { passive: true });

    // Mouse wheel
    let wheelTimeout = null;
    document.addEventListener('wheel', (e) => {
        if (wheelTimeout) return;
        wheelTimeout = setTimeout(() => { wheelTimeout = null; }, 600);
        changeSlide(e.deltaY > 0 ? 1 : -1);
    }, { passive: true });

    // Initialize
    updateSlide();
})();
