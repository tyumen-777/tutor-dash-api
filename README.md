# Tutor Dashboard API

REST API для CRM системы для школы иностранных языков.

## Технологии

| Технология | Версия | Описание |
|------------|--------|----------|
| **Node.js** | ≥20.0.0 | Среда выполнения JavaScript |
| **NestJS** | 11.x | Фреймворк для создания серверных приложений |
| **TypeScript** | 5.9 | Типизированный JavaScript |
| **Prisma** | 7.2 | ORM для работы с базой данных |
| **PostgreSQL** | - | Реляционная база данных |
| **Swagger** | 11.x | Автоматическая документация API |
| **class-validator** | 0.14 | Валидация DTO |
| **class-transformer** | 0.5 | Трансформация объектов |


## Установка

```bash
# Установка зависимостей
npm install

# Настройка базы данных
npx prisma db push

# Генерация Prisma клиента
npx prisma generate
```

## Запуск

```bash
# Режим разработки
npm run start:dev

# Production
npm run start:prod
```

## Документация API

После запуска сервера документация Swagger доступна по адресу:
```
http://localhost:3000/api
```

## Скрипты

```bash
npm run build        # Сборка проекта
npm run start:dev    # Запуск в режиме разработки
npm run start:prod   # Запуск в production
npm run lint         # Проверка кода
npm run format       # Форматирование кода
npm run test         # Запуск тестов
npm run test:cov     # Тесты с покрытием
```

## Лицензия

UNLICENSED
