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

    // Add badge to the page
    function createBadge() {
        var brand = document.createElement("a");
        brand.setAttribute("class", "w-webflow-badge");
        brand.setAttribute("href", "https://www.youtube.com/c/codeopacity?sub_confirmation=1");
        brand.setAttribute("target", "_blank");

        var logoArt = document.createElement("img");
        logoArt.setAttribute("src", "https://yt3.ggpht.com/UWcWk3P99Y1JpZuVY872VMAE5iuM3Q2fQQfeI5RixpNpQ44bMzpZgh2LEM5d5KOIePOh0sWSVAo=s48-c-k-c0x00ffffff-no-rj");
        logoArt.setAttribute("alt", "");
        logoArt.setAttribute("class", "logo");

        var logoText = document.createElement("img");
        logoText.setAttribute("src", "https://raw.githubusercontent.com/itsrehanraihan/images_cdn/main/Saved%20Pictures/Subscribe!.svg");
        logoText.setAttribute("alt", "Made by codeopacity");
        logoText.setAttribute("class", "logo-text");

        let style = document.createElement("style");
        style.innerHTML = `
            .w-webflow-badge {
                position: fixed;
                z-index: 99999;
                text-align: center;
                bottom: 48px;
                left: 46%;
                display: flex;
                align-items: center;
                border: .55px solid #ddd;
                border-radius: 4px;
                padding: 4px 8px 4px 4px;
                gap: 8px;
                background: #fff;
                animation: scale 1.2s linear;
            }
            @keyframes scale {
                from {
                    opacity: 0;
                    transform: scale(.5);
                }
                to{
                    opacity: 1;
                    transform: scale(1);
                }
            }
            .w-webflow-badge > img {
                max-height: 16px;
                width: auto;
            }
            .w-webflow-badge img.logo {
                aspect-ratio: 1/1;
                border-radius: 4px;
                overflow:hidden;
            }
            .w-webflow-badge img.logo-text {
                height: 12px;
            }
        `;
        document.head.appendChild(style);

        brand.appendChild(logoArt);
        brand.appendChild(logoText);

        return brand;
    }

    document.body.append(createBadge());
});
