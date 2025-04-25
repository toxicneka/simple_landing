document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.querySelector('.wrapper');
    const loginLink = document.querySelector('.login-link');
    const registerLink = document.querySelector('.register-link');
    const btnPopup = document.querySelector('.btnLogin-popup');
    const iconClose = document.querySelector('.icon-close');

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    });
    
  // Initialize Swiper
  const testimonialSwiper = new Swiper(".testimonial-swiper", {
    speed: 400,
    loop: true,
    spaceBetween: 30,
    navigation: {
        nextEl: ".btn-next",
        prevEl: ".btn-prev"
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
    document.querySelectorAll('.faq .item').forEach(item => {
        const question = item.querySelector('.question');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
            
            // Закрываем другие открытые элементы
            if (item.classList.contains('active')) {
                document.querySelectorAll('.faq .item').forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
            }
        });
    });

});
