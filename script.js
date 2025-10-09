// Fade in sections on scroll
const sections = document.querySelectorAll('section');

function fadeInOnScroll() {
  const triggerBottom = window.innerHeight / 5 * 4;

  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;

    if(sectionTop < triggerBottom) {
      section.style.opacity = 1;
      section.style.transform = 'translateY(0)';
    }
  });
}

window.addEventListener('scroll', fadeInOnScroll);

// Initial style for sections
sections.forEach(section => {
  section.style.opacity = 0;
  section.style.transform = 'translateY(50px)';
  section.style.transition = 'all 0.6s ease-out';
});
