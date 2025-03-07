# Инструкции по публикации сайта на GitHub

## 1. Создание репозитория на GitHub

1. Перейдите на сайт [GitHub](https://github.com) и войдите в свой аккаунт
2. Нажмите на "+" в верхнем правом углу и выберите "New repository"
3. Заполните данные репозитория:
   - Repository name: `stylish-site`
   - Description: `Современный адаптивный одностраничный сайт с анимациями и интерактивными элементами`
   - Выберите "Private" для создания приватного репозитория
   - Не инициализируйте репозиторий с README
4. Нажмите "Create repository"

## 2. Загрузка кода на GitHub

После создания репозитория выполните следующие команды в терминале:

```bash
# Добавление удаленного репозитория
git remote add origin https://github.com/YOUR_USERNAME/stylish-site.git

# Загрузка кода в репозиторий
git push -u origin stylish-site
```

Замените `YOUR_USERNAME` на ваш логин на GitHub.

## 3. Проверка загрузки

1. Перейдите в свой репозиторий на GitHub: `https://github.com/YOUR_USERNAME/stylish-site`
2. Убедитесь, что все файлы успешно загружены

## 4. Запуск сайта с GitHub Pages (опционально)

Если вы хотите опубликовать сайт через GitHub Pages:

1. Перейдите в настройки репозитория (Settings)
2. Найдите раздел "GitHub Pages"
3. В выпадающем меню "Source" выберите ветку "stylish-site"
4. Нажмите "Save"
5. Через несколько минут ваш сайт будет доступен по адресу: `https://YOUR_USERNAME.github.io/stylish-site`

## Структура проекта

- `index.html` - основной HTML файл сайта
- `styles.css` - стили сайта
- `script.js` - JavaScript для интерактивности
- `README.md` - описание проекта 