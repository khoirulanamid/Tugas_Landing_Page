document.addEventListener('DOMContentLoaded', () => {
  const hamburgerButton = document.getElementById('hamburger-menu');
  const closeMenuButton = document.getElementById('close-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  const preloader = document.getElementById('preloader');
  const scrollToTopButton = document.getElementById('scroll-to-top');

  // --- Fungsi Toggle Menu Mobile ---
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

  // --- Event Listeners untuk Menu Mobile ---
  hamburgerButton.addEventListener('click', toggleMobileMenu);
  closeMenuButton.addEventListener('click', toggleMobileMenu);
  mobileMenuOverlay.addEventListener('click', toggleMobileMenu); // Tutup menu saat klik overlay

  // --- JavaScript untuk Animasi Berbasis Scroll (Intersection Observer) ---
  const animatedItems = document.querySelectorAll('.animated-item');

  const observerOptions = {
    root: null, // Mengamati di dalam viewport
    rootMargin: '0px',
    threshold: 0.1 // Ketika 10% elemen terlihat, picu callback
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Jika elemen terlihat di viewport
        entry.target.classList.add('is-visible');
        // Hentikan pengamatan setelah dianimasikan (opsional, jika Anda hanya ingin sekali)
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedItems.forEach(item => {
    observer.observe(item); // Mulai mengamati setiap elemen
  });

  // --- Smooth Scroll untuk tautan internal ---
  document.querySelectorAll('a.smooth-scroll').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault(); // Mencegah perilaku default (loncat)

      const href = this.getAttribute('href');
      const targetId = href.substring(1); // Dapatkan ID target tanpa '#'
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Kurangi tinggi header jika sticky
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        const offsetTop = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });

        // Tutup menu mobile jika tautan diklik di dalam menu
        if (mobileMenu.classList.contains('open')) {
            toggleMobileMenu();
        }
      }
    });
  });

  // --- Preloader Halaman ---
  // Gunakan 'load' untuk memastikan semua aset (gambar dll) dimuat
  window.addEventListener('load', () => {
    if (preloader) {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500); // Sesuaikan dengan durasi transisi fade-out di CSS
    }
  });

  // --- Scroll-to-Top Button ---
  if (scrollToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) { // Muncul setelah scroll 300px
        scrollToTopButton.classList.remove('hidden');
        scrollToTopButton.classList.add('block');
      } else {
        scrollToTopButton.classList.remove('block');
        scrollToTopButton.classList.add('hidden');
      }
    });

    scrollToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- Set Tahun Saat Ini di Footer ---
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});