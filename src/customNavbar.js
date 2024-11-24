document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.querySelector('.navbarToggle');
    const navLinks = document.querySelector('.navLinks');

    if (toggleButton && navLinks) {
        toggleButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
});
