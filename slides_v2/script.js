(function () {
    console.log("%cMISSION BRIEFING UNTUK AREK ITS", "color: #d56743; font-size: 18px; font-weight: bold; font-family: sans-serif;");
    console.log("%cInspect element itu menyenangkan. Tapi ingat: bug di produk medis tidak berhenti di layar. Inspect workflow, beban kognitif, dan dampaknya ke pasien.", "font-size: 13px; font-family: monospace;");

    const slides = Array.from(document.querySelectorAll(".slide"));
    const counter = document.getElementById("slideCounter");
    const progressBar = document.getElementById("progressBar");
    let current = 0;
    const total = slides.length;

    function updateSlide() {
        slides.forEach((slide, index) => {
            slide.classList.toggle("active", index === current);
        });

        counter.textContent = `${current + 1} / ${total}`;
        progressBar.style.width = `${((current + 1) / total) * 100}%`;
    }

    function changeSlide(direction) {
        const next = current + direction;
        if (next < 0 || next >= total) {
            return;
        }
        current = next;
        updateSlide();
    }

    window.changeSlide = changeSlide;

    document.addEventListener("keydown", (event) => {
        if (["ArrowRight", "ArrowDown", " ", "PageDown"].includes(event.key)) {
            event.preventDefault();
            changeSlide(1);
        }

        if (["ArrowLeft", "ArrowUp", "PageUp"].includes(event.key)) {
            event.preventDefault();
            changeSlide(-1);
        }

        if (event.key === "Home") {
            event.preventDefault();
            current = 0;
            updateSlide();
        }

        if (event.key === "End") {
            event.preventDefault();
            current = total - 1;
            updateSlide();
        }

        if (event.key.toLowerCase() === "f") {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {});
            } else {
                document.exitFullscreen();
            }
        }

        const key = event.key.toLowerCase();
        if (key === "b") {
            event.preventDefault();
            document.body.classList.toggle("blackout-mode");
        }
        if (key === "x") {
            event.preventDefault();
            document.body.classList.toggle("xray-mode");
        }
        if (key === "a") {
            event.preventDefault();
            document.body.classList.toggle("alarm-mode");
        }
        if (key === "c") {
            event.preventDefault();
            document.body.classList.toggle("colorblind-mode");
        }
        if (key === "p") {
            event.preventDefault();
            document.body.classList.toggle("projector-mode");
        }
    });

    let touchStartX = 0;
    let touchStartY = 0;

    const xrayDiv = document.createElement("div");
    xrayDiv.className = "xray-overlay";
    document.body.appendChild(xrayDiv);

    document.addEventListener("touchstart", (event) => {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
    }, { passive: true });

    document.addEventListener("touchend", (event) => {
        const dx = event.changedTouches[0].clientX - touchStartX;
        const dy = event.changedTouches[0].clientY - touchStartY;

        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
            changeSlide(dx < 0 ? 1 : -1);
        }
    }, { passive: true });

    document.addEventListener("mousemove", (event) => {
        if (!document.body.classList.contains("xray-mode")) {
            return;
        }

        xrayDiv.style.setProperty("--mouse-x", `${event.clientX}px`);
        xrayDiv.style.setProperty("--mouse-y", `${event.clientY}px`);
    });

    let wheelLock = null;

    document.addEventListener("wheel", (event) => {
        if (wheelLock) {
            return;
        }

        wheelLock = setTimeout(() => {
            wheelLock = null;
        }, 500);

        changeSlide(event.deltaY > 0 ? 1 : -1);
    }, { passive: true });

    document.querySelectorAll(".spoiler-wrap").forEach((element) => {
        const overlay = document.createElement("div");
        overlay.className = "spoiler-overlay";
        overlay.dataset.label = element.dataset.spoilerLabel || "Klik untuk reveal";
        element.appendChild(overlay);
        overlay.addEventListener("click", () => {
            element.classList.add("revealed");
        });
    });

    updateSlide();
})();
