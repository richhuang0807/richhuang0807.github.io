// === 滾動淡入動畫 ===
const sections = document.querySelectorAll('section');

function fadeInOnScroll() {
  const triggerBottom = window.innerHeight * 0.8;
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < triggerBottom) {
      section.classList.add('show');
    }
  });
}

window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);

// === 手機導覽列開關 ===
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});
