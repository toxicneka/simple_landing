document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.querySelector('.wrapper');
    const loginLink = document.querySelector('.login-link');
    const registerLink = document.querySelector('.register-link');
    const btnPopup = document.querySelector('.btnLogin-popup');
    const iconClose = document.querySelector('.icon-close');

    // Initialize Swiper
    const testimonialSwiper = new Swiper(".testimonial", {
        speed: 400,
        loop: true,
        spaceBetween: 30,
        slidesPerView: 1,
        centeredSlides: true,
        navigation: {
            nextEl: ".btn__next",
            prevEl: ".btn__prev"
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 40
            }
        }
    });

    function updateLabelsPosition() {
        const inputs = wrapper.querySelectorAll('input');
        inputs.forEach(input => {
            const label = input.nextElementSibling;
            if (input.value.trim() !== '') {
                label.style.top = '-5px';
                label.style.transform = 'translateY(0) scale(0.9)';
            } else {
                label.style.top = '50%';
                label.style.transform = 'translateY(-50%)';
            }
        });
    }

    function togglePopup() {
        if (wrapper.classList.contains('active-popup')) {
            // Закрытие попапа
            wrapper.classList.add('closing');
            wrapper.classList.remove('active-popup', 'active');
            setTimeout(() => {
                wrapper.classList.remove('closing');
            }, 500);
            document.removeEventListener('click', handleClickOutside);
        } else {
            // Открытие попапа
            wrapper.classList.add('active-popup');
            wrapper.classList.remove('active');
            setTimeout(updateLabelsPosition, 10);
            document.addEventListener('click', handleClickOutside);
        }
    }

    function handleClickOutside(event) {
        if (!wrapper.contains(event.target) && event.target !== btnPopup) {
            togglePopup();
        }
    }

    registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        wrapper.classList.add('active');
    });

    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        wrapper.classList.remove('active');
    });

    btnPopup.addEventListener('click', (e) => {
        e.preventDefault();
        togglePopup();
    });

    iconClose.addEventListener('click', togglePopup);

    document.querySelectorAll('.input-box input').forEach(input => {
        input.addEventListener('input', function() {
            const label = this.nextElementSibling;
            if (this.value.trim() !== '') {
                this.parentElement.classList.add('filled');
            } else {
                this.parentElement.classList.remove('filled');
            }
        });
    });

});
