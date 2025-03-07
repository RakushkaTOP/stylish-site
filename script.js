/**
 * Minecraft Fan Zone
 * Скрипт для отображения 3D куба Minecraft и интерактивных элементов
 */

document.addEventListener('DOMContentLoaded', function() {
    // Проверка поддержки WebGL перед инициализацией 3D сцены
    if (isWebGLAvailable()) {
        // Инициализация 3D сцены
        initMinecraftCube();
    } else {
        console.error('WebGL не поддерживается или отключен в браузере');
        // Добавляем сообщение о том, что 3D эффекты не доступны
        const container = document.getElementById('minecraft-cube');
        container.innerHTML = '<div class="webgl-error">3D эффекты не доступны в вашем браузере</div>';
        container.style.backgroundColor = '#333';
        container.style.color = 'white';
        container.style.padding = '20px';
        container.style.textAlign = 'center';
    }

    // Плавная прокрутка для навигации
    initSmoothScroll();

    // Анимация появления элементов при прокрутке
    initScrollAnimation();
});

/**
 * Проверка поддержки WebGL в браузере
 */
function isWebGLAvailable() {
    try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && 
            (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
        return false;
    }
}

/**
 * Инициализация 3D куба Minecraft на заднем фоне
 */
function initMinecraftCube() {
    // Создаем сцену Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    try {
        // Настраиваем рендерер
        const renderer = new THREE.WebGLRenderer({ 
            alpha: true,
            antialias: true 
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0); // Прозрачный фон
        
        // Добавляем рендерер в DOM
        const containerElement = document.getElementById('minecraft-cube');
        if (!containerElement) {
            console.error('Элемент с id "minecraft-cube" не найден');
            return;
        }
        
        containerElement.appendChild(renderer.domElement);
        
        // Текстуры для куба (грани блока земли из Minecraft)
        const loader = new THREE.TextureLoader();
        
        // Локальные текстуры (для надежности, вместо imgur)
        const textureURLs = [
            'https://raw.githubusercontent.com/RakushkaTOP/minecraft-fan-zone-project/fix-3d-cube/textures/grass_top.png',
            'https://raw.githubusercontent.com/RakushkaTOP/minecraft-fan-zone-project/fix-3d-cube/textures/dirt.png',
            'https://raw.githubusercontent.com/RakushkaTOP/minecraft-fan-zone-project/fix-3d-cube/textures/grass_side.png',
            'https://raw.githubusercontent.com/RakushkaTOP/minecraft-fan-zone-project/fix-3d-cube/textures/grass_side.png',
            'https://raw.githubusercontent.com/RakushkaTOP/minecraft-fan-zone-project/fix-3d-cube/textures/grass_side.png',
            'https://raw.githubusercontent.com/RakushkaTOP/minecraft-fan-zone-project/fix-3d-cube/textures/grass_side.png'
        ];
        
        // Резервные текстуры (если Raw GitHub не сработает)
        const fallbackTextureURLs = [
            'https://i.imgur.com/xrRyUa4.png', // Grass top
            'https://i.imgur.com/HcZHOCJ.png', // Dirt bottom
            'https://i.imgur.com/ODfbiFE.png', // Grass side
            'https://i.imgur.com/ODfbiFE.png', // Grass side
            'https://i.imgur.com/ODfbiFE.png', // Grass side
            'https://i.imgur.com/ODfbiFE.png'  // Grass side
        ];
        
        // Загружаем текстуры и создаем материалы
        const materials = [];
        const loadTexture = (url, index) => {
            const texture = loader.load(
                url,
                // Успешная загрузка
                function(texture) {
                    console.log('Текстура успешно загружена:', url);
                },
                // Прогресс загрузки
                undefined,
                // Ошибка загрузки
                function(err) {
                    console.error('Ошибка загрузки текстуры:', url, err);
                    // Используем резервную текстуру
                    if (url !== fallbackTextureURLs[index]) {
                        console.log('Используем резервную текстуру:', fallbackTextureURLs[index]);
                        loadTexture(fallbackTextureURLs[index], index);
                    }
                }
            );
            texture.magFilter = THREE.NearestFilter; // Пиксельная графика
            texture.minFilter = THREE.NearestFilter;
            materials[index] = new THREE.MeshBasicMaterial({ map: texture });
        };
        
        // Загружаем все текстуры
        for (let i = 0; i < textureURLs.length; i++) {
            loadTexture(textureURLs[i], i);
        }
        
        // Создаем геометрию куба
        const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
        const cube = new THREE.Mesh(cubeGeometry, materials);
        
        // Создаем несколько кубов для фона
        const cubes = [];
        const cubeCount = 5;
        
        for (let i = 0; i < cubeCount; i++) {
            const cubeCopy = cube.clone();
            // Располагаем кубы в разных местах
            cubeCopy.position.x = Math.random() * 10 - 5;
            cubeCopy.position.y = Math.random() * 10 - 5;
            cubeCopy.position.z = Math.random() * -10 - 5;
            // Случайный размер для куба
            const scale = Math.random() * 0.5 + 0.7;
            cubeCopy.scale.set(scale, scale, scale);
            // Добавляем в сцену и массив
            scene.add(cubeCopy);
            cubes.push(cubeCopy);
        }
        
        // Добавляем свет
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
        directionalLight.position.set(10, 20, 5);
        scene.add(directionalLight);
        
        // Позиционируем камеру
        camera.position.z = 8;
        
        // Функция анимации
        function animate() {
            requestAnimationFrame(animate);
            
            // Вращаем каждый куб с разной скоростью
            cubes.forEach((cube, index) => {
                cube.rotation.x += 0.002 + 0.001 * index;
                cube.rotation.y += 0.003 + 0.001 * index;
                // Добавляем плавающую анимацию
                cube.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
            });
            
            // Обновляем размер рендерера при изменении размера окна
            if (containerElement.clientWidth !== renderer.domElement.width ||
                containerElement.clientHeight !== renderer.domElement.height) {
                renderer.setSize(containerElement.clientWidth, containerElement.clientHeight);
                camera.aspect = containerElement.clientWidth / containerElement.clientHeight;
                camera.updateProjectionMatrix();
            }
            
            renderer.render(scene, camera);
        }
        
        // Запускаем анимацию
        animate();
        
        // Обработчик изменения размера окна
        window.addEventListener('resize', function() {
            // Обновляем размеры камеры и рендерера
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    } catch (e) {
        console.error('Ошибка при инициализации 3D куба:', e);
    }
}

/**
 * Плавная прокрутка при клике на ссылки навигации
 */
function initSmoothScroll() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
    
    // Кнопка присоединиться прокручивает к разделу "Сообщество"
    document.querySelector('.minecraft-button').addEventListener('click', function() {
        document.querySelector('#community').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}

/**
 * Анимация появления элементов при прокрутке
 */
function initScrollAnimation() {
    // Наблюдатель за элементами
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Наблюдаем за всеми основными секциями
    document.querySelectorAll('section').forEach(section => {
        // Добавляем класс для начального состояния анимации
        section.classList.add('fade-in');
        // Подключаем наблюдатель
        observer.observe(section);
    });
    
    // Стили для анимации добавляются в CSS динамически
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Задержка для последовательного появления элементов */
        #about.visible { transition-delay: 0.1s; }
        #updates.visible { transition-delay: 0.2s; }
        #mods.visible { transition-delay: 0.3s; }
        #gallery.visible { transition-delay: 0.4s; }
        #community.visible { transition-delay: 0.5s; }
    `;
    document.head.appendChild(style);
}

// Эффект наведения для карточек с обновлениями и модами
document.querySelectorAll('.update-card, .mod-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
    });
}); 