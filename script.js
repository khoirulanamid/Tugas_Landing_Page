document.addEventListener('DOMContentLoaded', () => {
  const hamburgerButton = document.getElementById('hamburger-menu');
  const closeMenuButton = document.getElementById('close-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

  function toggleMobileMenu() {
    mobileMenu.classList.toggle('open');
    if (mobileMenu.classList.contains('open')) {
      mobileMenuOverlay.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Mencegah scrolling body
    } else {
      mobileMenuOverlay.style.display = 'none';
      document.body.style.overflow = 'auto'; // Mengizinkan scrolling body kembali
    }
  }

  hamburgerButton.addEventListener('click', toggleMobileMenu);
  closeMenuButton.addEventListener('click', toggleMobileMenu);
  mobileMenuOverlay.addEventListener('click', toggleMobileMenu); // Tutup menu saat klik overlay
});