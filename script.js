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

document.addEventListener('DOMContentLoaded', () => {
    // Инициализация
    initApp();

    // Анимация после загрузки страницы
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 300);
});

function initApp() {
    // Инициализация всех компонентов
    initCursor();
    initStickyHeader();
    initMobileMenu();
    initScrollAnimation();
    initTypewriter();
    initTabs();
    initScrollToTop();
    initPortfolioFilter();
    initHighlightJS();
    initContactForm();
}

// ========== Фиксированная шапка при скролле ==========
function initStickyHeader() {
    const header = document.querySelector('header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
}

// ========== Мобильное меню ==========
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.menu');
    
    if (!mobileMenuBtn || !menu) return;
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Закрыть меню при клике на пункт меню
    const menuItems = document.querySelectorAll('.menu a');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            menu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

// ========== Плавный скролл по якорным ссылкам ==========
function initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Получаем высоту хедера для корректного скролла
                    const headerHeight = document.querySelector('header').offsetHeight;
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Скролл вниз при клике на mouse icon
    const scrollDownBtn = document.querySelector('.hero-scroll');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                
                window.scrollTo({
                    top: aboutSection.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// ========== Табы в секции навыков ==========
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    if (!tabButtons.length || !tabPanels.length) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Удаление активного класса у всех кнопок и панелей
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Активация текущей кнопки
            button.classList.add('active');
            
            // Активация соответствующей панели
            const targetPanel = document.getElementById(button.dataset.tab);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

// ========== Фильтрация проектов ==========
function initPortfolioFilter() {
    // Функция отключена - фильтрация убрана
    return;
    
    // Оригинальный код ниже
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (!filterButtons.length || !portfolioItems.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Удаляем класс active у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Добавляем класс active только нажатой кнопке
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                // Если выбран фильтр "all" или категория элемента совпадает с фильтром
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ========== Кнопка "Наверх" ==========
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollToTop');
    
    if (!scrollTopBtn) {
        console.error('Кнопка прокрутки вверх не найдена');
        return;
    }
    
    // Проверяем положение скролла при загрузке страницы
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    }
    
    // Отслеживаем скролл страницы
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    // Обработчик клика по кнопке
    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Плавная прокрутка вверх
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== Анимация при скролле ==========
function initScrollAnimation() {
    const animatedElements = document.querySelectorAll('.skill-card, .portfolio-item, .info-card, .about-image-wrapper, .about-text, .code-block');
    
    if (!animatedElements.length) return;
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    }
    
    // Первая проверка при загрузке
    setTimeout(checkScroll, 500);
    
    // Проверка при скролле
    window.addEventListener('scroll', checkScroll);
}

// ========== Подсветка синтаксиса кода ==========
function initHighlightJS() {
    if (typeof hljs !== 'undefined') {
        document.querySelectorAll('pre code').forEach(block => {
            hljs.highlightBlock(block);
        });
    }
}

// ========== Отправка формы ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Здесь будет код отправки формы
        const formData = new FormData(this);
        
        // Имитация отправки и успешного результата
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        
        setTimeout(() => {
            submitButton.innerHTML = '<i class="fas fa-check"></i> Отправлено!';
            contactForm.reset();
            
            // Возвращаем оригинальный текст через 3 секунды
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            }, 3000);
        }, 2000);
    });
} 