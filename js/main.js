// Interactive background blob that follows mouse movement subtly
const blob = document.getElementById('blob');
window.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  blob.style.transform = `translate(${x/10}px, ${y/10}px)`;
});

window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(sec => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 400;
    if (top >= offset) {
      sec.style.opacity = "1";
      sec.style.transform = "translateY(0)";
    }
  });
});

// Set initial state for script reveal
document.querySelectorAll('section').forEach(sec => {
  if(sec.className !== 'hero') {
    sec.style.opacity = "0";
    sec.style.transform = "translateY(50px)";
    sec.style.transition = "all 1s ease-out";
  }
});

// lang select

// function navigateLanguage(selectObject) {
//     const targetUrl = selectObject.value;

//     // Only redirect if the user selected an actual path
//     if (targetUrl && targetUrl !== "") {
//         console.log(`Navigating to: ${targetUrl}`);
//         window.location.href = targetUrl;
//     }
// }

function navigateLanguage(selectElement) {
    // The language selected by the user (e.g., "/fr/")
    const newLang = `/${selectElement.value}/`;
    
    // Our defined "linguistic map"
    const langs = ['/en/', '/fr/', '/ar/'];
    
    // The current full URL string
    const currentURL = window.location.href;

    // Identify which language marker is currently present in the URL
    const currentLang = langs.find(l => currentURL.includes(l));

    // Ternary: If a marker exists AND it's not the one we just selected, swap and redirect
    (currentLang && currentLang !== newLang) 
        ? window.location.href = currentURL.replace(currentLang, newLang) 
        : null;
}