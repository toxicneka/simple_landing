const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

function updateLabelsPosition() {
    const inputs = wrapper.querySelectorAll('input');
    inputs.forEach(input => {
        const label = input.nextElementSibling; // Получаем соответствующий label
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
        setTimeout(updateLabelsPosition, 10); // Обновляем позиции меток
        document.addEventListener('click', handleClickOutside);
    }
}

function handleClickOutside(event) {
    if (!wrapper.contains(event.target) && event.target !== btnPopup) {
        togglePopup();
    }
}

registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', togglePopup);

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