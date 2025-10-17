# JavaScript Code Style

## Общие правила
- Используйте 2 пробела для отступов
- Пишите точки с запятой
- Используйте одинарные кавычки для строк
- Длина строки: 80 символов

## Именование
```javascript
// Переменные и функции - camelCase
const userName = 'John';
function getUserData() {}

// Классы - PascalCase
class UserAccount {}

// Константы - UPPER_CASE
const API_URL = 'https://api.example.com';
```

## Структура кода
```javascript
// Импорты в начале
import { module } from './module';

// Переменные
const config = {};

// Функции
function main() {
  // код
}

// Экспорт в конце
export default main;
```

## Функции
```javascript
// Стрелочные функции для колбэков
const names = users.map(user => user.name);

// Декларация функций для основных функций
function calculateTotal(price, quantity) {
  return price * quantity;
}
```

## Объекты и массивы
```javascript
// Короткая запись при совпадении имен
const user = { name, age };

// Деструктуризация
const { name, age } = user;

// Spread оператор
const newArray = [...oldArray, newItem];
```

## Условные выражения
```javascript
// Используйте строгое равенство
if (value === null) {
  // код
}

// Тернарный оператор для простых условий
const status = isActive ? 'active' : 'inactive';
```
