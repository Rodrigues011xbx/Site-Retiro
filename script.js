document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Toggle aria-expanded for accessibility
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true' || false;
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        });

        // Close mobile menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Countdown Timer
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        // Set target date to October 17, 2025, 00:00:00
        const targetDate = new Date('2025-10-17T00:00:00').getTime(); 

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            // Calculate time units
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Update the DOM elements, adding leading zeros if necessary
            document.getElementById('days').innerText = days < 10 ? '0' + days : days;
            document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
            document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
            document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;

            // If the countdown is over, display a message
            if (distance < 0) {
                clearInterval(countdownInterval);
                countdownElement.innerHTML = '<h3 class="text-xl mb-4 text-tropical-soft-yellow">O retiro começou! Bem-vindos!</h3>';
            }
        };

        // Update the countdown every second
        const countdownInterval = setInterval(updateCountdown, 1000);
        updateCountdown(); // Initial call to display immediately and avoid delay
    }

    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const faqAnswer = button.nextElementSibling;
            const icon = button.querySelector('i'); // Select the Font Awesome icon

            // Toggle the 'hidden' class for the answer
            faqAnswer.classList.toggle('hidden');
            // Toggle a class to control max-height and opacity for smooth transition
            faqAnswer.classList.toggle('open');

            // Toggle the icon rotation
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Get the height of the fixed navbar
                const navbarHeight = document.getElementById('nav-fundo').offsetHeight;
                
                // Calculate the position to scroll to, accounting for the navbar
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Video Autoplay on Scroll (Intersection Observer)
    const video = document.getElementById('meuVideo');
    if (video) {
        const options = {
            root: null, // uses the viewport as the root
            rootMargin: '0px',
            threshold: 0.5 // 50% of the video must be visible
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
    }

    // Animate elements on scroll (using Intersection Observer for better performance)
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated'); // Add a class to trigger CSS animations
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    };

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const elementsToAnimate = document.querySelectorAll('.animate-fade-in, .animate-fade-in-up, .animate-slide-in-left, .animate-slide-in-right');
    const animationObserver = new IntersectionObserver(animateOnScroll, observerOptions);

    elementsToAnimate.forEach(element => {
        animationObserver.observe(element);
    });

    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const highlightNavLink = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - document.getElementById('nav-fundo').offsetHeight;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            link.querySelector('.nav-underline').style.width = '0%'; // Reset underline
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
                link.querySelector('.nav-underline').style.width = '100%'; // Activate underline
            }
            // Special handling for the "Inscrição" link in mobile menu
            if (link.getAttribute('target') === '_blank' && link.getAttribute('href').includes('forms.gle')) {
                // This link doesn't correspond to a section ID, so don't highlight it based on scroll position
                // unless it's the currently active one from a direct click (which is handled by the mobile menu close logic)
            }
        });
    };

    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Initial call

    // Carousel functionality
    const carousel = document.getElementById('carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;
    const totalImages = carousel ? carousel.children.length : 0;

    const updateCarousel = () => {
        if (carousel) {
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    };

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === 0) ? totalImages - 1 : currentIndex - 1;
            updateCarousel();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === totalImages - 1) ? 0 : currentIndex + 1;
            updateCarousel();
        });
    }

    // Optional: Auto-advance carousel
    // if (carousel) {
    //     setInterval(() => {
    //         currentIndex = (currentIndex === totalImages - 1) ? 0 : currentIndex + 1;
    //         updateCarousel();
    //     }, 5000); // Change image every 5 seconds
    // }
});
