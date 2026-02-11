// Interactive background blob that follows mouse movement subtly
const blob = document.getElementById('blob');
window.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  blob.style.transform = `translate(${x/10}px, ${y/10}px)`;
});

  // Simple Fade-in effect on scroll
  // const observerOptions = { threshold: 0.1 };
  // const observer = new IntersectionObserver((entries) => {
  //   entries.forEach(entry => {
  //     if (entry.isIntersecting) {
  //       entry.target.style.opacity = "1";
  //       entry.target.style.transform = "translateY(0)";
  //     }
  //   });
  // }, observerOptions);

  // document.querySelectorAll('.card').forEach(card => {
  //   card.style.opacity = "0";
  //   card.style.transform = "translateY(30px)";
  //   card.style.transition = "all 0.6s ease-out";
  //   observer.observe(card);
  // });

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