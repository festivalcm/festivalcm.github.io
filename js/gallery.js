const gallery = document.getElementById('mygallery');
const sentinel = document.getElementById('sentinel');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const loader = document.getElementById('lightbox-loader');
const closeBtn = document.getElementById('close-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let imagePool = [];
let currentIndex = 0;
let activeIndex = -1;
const batchSize = 3;

// --- Intersection Observer Setup ---
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && imagePool.length > 0 && lightbox.style.display !== 'flex') {
        loadImages();
    }
}, { threshold: 0.1 });

// --- Initializing Archive ---
async function initializeGallery() {
    try {
        const response = await fetch('../data/gallery-data.json');
        imagePool = await response.json();
        
        observer.observe(sentinel);
        loadImages(); 
    } catch (error) {
        console.error("The archive ledger could not be found:", error);
    }
}

// --- Loading Grid Images ---
function loadImages() {
    if (currentIndex >= imagePool.length) {
        sentinel.style.display = 'none';
        return;
    }

    const limit = Math.min(currentIndex + batchSize, imagePool.length);

    for (let i = currentIndex; i < limit; i++) {
        const item = imagePool[i];
        const container = document.createElement('div');
        container.className = 'img-container';
        
        const img = document.createElement('img');
        img.src = item.path;
        img.alt = item.alt || "Gallery image";
        img.loading = "lazy"; // Native performance boost

        img.onload = () => {
            container.classList.add('loaded');
            img.classList.add('visible');
        };

        container.appendChild(img);
        
        const indexAtCapture = i;
        container.onclick = () => openLightbox(indexAtCapture);
        
        gallery.appendChild(container);
    }
    currentIndex = limit;
}

// --- Lightbox Interaction ---
function openLightbox(index) {
    activeIndex = index;
    updateLightboxContent();
    lightbox.style.display = 'flex';
}

function updateLightboxContent() {
    const item = imagePool[activeIndex];
    
    // Show cues for heavy load
    loader.style.display = 'block';
    lightboxImg.classList.remove('loaded');
    
    lightboxImg.src = item.path;
    lightboxImg.alt = item.alt || "";

    lightboxImg.onload = () => {
        loader.style.display = 'none';
        lightboxImg.classList.add('loaded');
    };

    // Navigation visibility
    prevBtn.classList.toggle('hidden', activeIndex === 0);
    nextBtn.classList.toggle('hidden', activeIndex === imagePool.length - 1);
}

function showNext() { if (activeIndex < imagePool.length - 1) { activeIndex++; updateLightboxContent(); } }
function showPrev() { if (activeIndex > 0) { activeIndex--; updateLightboxContent(); } }
function closeLightbox() { lightbox.style.display = 'none'; activeIndex = -1; }

// --- Event Listeners ---
nextBtn.onclick = (e) => { e.stopPropagation(); showNext(); };
prevBtn.onclick = (e) => { e.stopPropagation(); showPrev(); };
closeBtn.onclick = closeLightbox;
lightbox.onclick = (e) => { if (e.target === lightbox) closeLightbox(); };

document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        if (e.key === "ArrowRight") showNext();
        if (e.key === "ArrowLeft") showPrev();
        if (e.key === "Escape") closeLightbox();
    }
});

initializeGallery();