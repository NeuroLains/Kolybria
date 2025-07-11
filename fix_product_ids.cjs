#!/usr/bin/env node
/**
 * Скрипт для исправления неправильных ID товаров
 */

const fs = require('fs');
const path = require('path');

// Читаем файл products.js
const productsFile = path.join(__dirname, 'src', 'data', 'products.js');
let content = fs.readFileSync(productsFile, 'utf8');

// Карта правильных ID товаров
const correctIds = {
  23: 23, // Брелоки
  24: 24, // Шильды
  25: 25, // Печать на металле
  27: 27, // Рюкзаки
  28: 28, // Пазлы
  29: 29, // Коврики
  30: 30, // Ленты
  31: 31, // Флаги
  32: 32, // Баннеры
  33: 33, // Стенды
  34: 34, // Таблички
  35: 35, // Roll UP
  36: 36, // Press Wall
  37: 37, // Х-образные стойки
  38: 38, // Таблички для оплаты
  39: 39, // Адресные Таблички
  40: 40, // Плоттерная Резка
  41: 41, // Разработка макетов
  42: 42, // Ламинирование
  44: 44, // Степлирование
  46: 46, // Изготовление Печатей
  47: 47  // Брендирование
};

// Исправляем каждый товар
Object.entries(correctIds).forEach(([wrongId, correctId]) => {
  const wrongPattern = new RegExp(`hasImages\\(${wrongId}\\)`, 'g');
  const correctReplacement = `hasImages(${correctId})`;
  
  content = content.replace(wrongPattern, correctReplacement);
});

// Записываем исправленный файл
fs.writeFileSync(productsFile, content, 'utf8');

console.log('ID товаров исправлены!'); 