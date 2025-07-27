document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Countdown Timer
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        const targetDate = new Date('2025-10-17T00:00:00').getTime(); // Retiro starts on October 17, 2025

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').innerText = days < 10 ? '0' + days : days;
            document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
            document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
            document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;

            if (distance < 0) {
                clearInterval(countdownInterval);
                countdownElement.innerHTML = '<h3 class="text-xl mb-4"></h3>';
            }
        };

        const countdownInterval = setInterval(updateCountdown, 1000);
        updateCountdown(); // Initial call to display immediately
    }

    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const faqAnswer = button.nextElementSibling;
            const svgIcon = button.querySelector('svg');

            faqAnswer.classList.toggle('hidden');
            svgIcon.classList.toggle('rotate-180'); // Rotate arrow icon
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

   const video = document.getElementById('meuVideo');

   const options = {
       root: null, // usa a viewport como root
       rootMargin: '0px',
       threshold: 0.5 // 50% do vídeo deve estar visível
   };

   const callback = (entries, observer) => {
       entries.forEach(entry => {
           if (entry.isIntersecting) {
               video.play();
           } else {
               video.pause();
           }
       });
   };

   const observer = new IntersectionObserver(callback, options);
   observer.observe(video);
   