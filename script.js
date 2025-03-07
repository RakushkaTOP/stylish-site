// Плавный скролл по якорным ссылкам
document.addEventListener('DOMContentLoaded', () => {
    // Получаем все якорные ссылки
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    // Добавляем обработчик события для каждой ссылки
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Получаем ID целевого элемента
            const targetId = this.getAttribute('href');
            
            // Проверяем, что ID не пустой и не равен "#"
            if (targetId && targetId !== '#') {
                // Получаем элемент по ID
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Плавно скроллим к элементу
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // Учитываем высоту шапки
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Анимация появления элементов при скролле
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .portfolio-item, .stat-item');
        
        elements.forEach(element => {
            // Проверяем, видим ли элемент
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Добавляем стили для анимации
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .portfolio-item, .stat-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .service-card.animate, .portfolio-item.animate, .stat-item.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Вызываем функцию при загрузке страницы и при скролле
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Вызываем сразу для элементов, видимых при загрузке
    
    // Обработка отправки формы
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем значения полей
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Проверяем заполнение полей
            if (!name || !email || !message) {
                alert('Пожалуйста, заполните все поля формы');
                return;
            }
            
            // Валидация email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Пожалуйста, введите корректный email');
                return;
            }
            
            // Здесь можно добавить код для отправки данных на сервер
            // В данном примере просто показываем сообщение об успехе
            
            // Создаем элемент с сообщением об успешной отправке
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.';
            successMessage.style.cssText = `
                background-color: var(--secondary-color);
                color: white;
                padding: 15px;
                border-radius: var(--border-radius);
                margin-top: 20px;
                text-align: center;
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.3s ease, transform 0.3s ease;
            `;
            
            // Вставляем сообщение после формы
            contactForm.appendChild(successMessage);
            
            // Анимируем появление сообщения
            setTimeout(() => {
                successMessage.style.opacity = '1';
                successMessage.style.transform = 'translateY(0)';
            }, 10);
            
            // Очищаем форму
            contactForm.reset();
            
            // Удаляем сообщение через 5 секунд
            setTimeout(() => {
                successMessage.style.opacity = '0';
                successMessage.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    successMessage.remove();
                }, 300);
            }, 5000);
        });
    }
});

// Анимация для фигуры в hero секции
document.addEventListener('mousemove', (e) => {
    const shape = document.querySelector('.shape');
    if (shape) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        // Добавляем небольшое смещение для создания эффекта параллакса
        shape.style.transform = `translate(${x * 20 - 10}px, ${y * 20 - 10}px)`;
    }
}); 