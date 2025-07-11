#!/usr/bin/env node
/**
 * Скрипт для обновления изображений в products.js
 */

const fs = require('fs');
const path = require('path');

// Читаем файл products.js
const productsFile = path.join(__dirname, 'src', 'data', 'products.js');
let content = fs.readFileSync(productsFile, 'utf8');

// Функция для обновления изображений товара
function updateProductImages(productId, fallbackImage) {
  const imagePattern = new RegExp(`image:\\s*${fallbackImage.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g');
  const carouselPattern = new RegExp(`carouselImages:\\s*\\[${fallbackImage.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^\\]]*\\]`, 'g');
  
  const newImage = `hasImages(${productId}) ? getMainImage(${productId}) : ${fallbackImage}`;
  const newCarousel = `hasImages(${productId}) ? [getMainImage(${productId}), ...getGalleryImages(${productId})] : [${fallbackImage}, ${fallbackImage}]`;
  
  content = content.replace(imagePattern, `image: ${newImage}`);
  content = content.replace(carouselPattern, `carouselImages: ${newCarousel}`);
}

// Карта товаров для обновления
const productsToUpdate = [
  { id: 4, fallback: 'notebookImg' },
  { id: 5, fallback: 'envelopeImg' },
  { id: 6, fallback: 'brochureImg' },
  { id: 7, fallback: 'posterImg' },
  { id: 8, fallback: 'drawingImg' },
  { id: 9, fallback: 'photoImg' },
  { id: 10, fallback: 'calendarImg' },
  { id: 11, fallback: 'labelImg' },
  { id: 13, fallback: 'plasticCardImg' },
  { id: 14, fallback: 'risographImg' },
  { id: 15, fallback: 'blankImg' },
  { id: 16, fallback: 'carbonlessImg' },
  { id: 17, fallback: 'badgeImg' },
  { id: 19, fallback: 'mugImg' },
  { id: 20, fallback: 'tshirtImg' },
  { id: 21, fallback: 'capImg' },
  { id: 22, fallback: 'magnetImg' },
  { id: 26, fallback: 'bagImg' },
  { id: 43, fallback: 'bookImg' },
  { id: 45, fallback: 'bookImg' }
];

// Обновляем каждый товар
productsToUpdate.forEach(product => {
  updateProductImages(product.id, product.fallback);
});

// Записываем обновленный файл
fs.writeFileSync(productsFile, content, 'utf8');

console.log('Изображения товаров обновлены!'); 