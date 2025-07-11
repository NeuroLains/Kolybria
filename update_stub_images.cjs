#!/usr/bin/env node
/**
 * Скрипт для обновления товаров с stubImage
 */

const fs = require('fs');
const path = require('path');

// Читаем файл products.js
const productsFile = path.join(__dirname, 'src', 'data', 'products.js');
let content = fs.readFileSync(productsFile, 'utf8');

// Функция для обновления изображений товара с stubImage
function updateStubImages(productId) {
  const imagePattern = new RegExp(`image:\\s*stubImage`, 'g');
  const carouselPattern = new RegExp(`carouselImages:\\s*\\[stubImage[^\\]]*\\]`, 'g');
  
  const newImage = `hasImages(${productId}) ? getMainImage(${productId}) : stubImage`;
  const newCarousel = `hasImages(${productId}) ? [getMainImage(${productId}), ...getGalleryImages(${productId})] : [stubImage, stubImage]`;
  
  content = content.replace(imagePattern, `image: ${newImage}`);
  content = content.replace(carouselPattern, `carouselImages: ${newCarousel}`);
}

// Товары с stubImage, которые нужно обновить
const stubProducts = [18, 23, 24, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 44, 46, 47];

// Обновляем каждый товар
stubProducts.forEach(productId => {
  updateStubImages(productId);
});

// Записываем обновленный файл
fs.writeFileSync(productsFile, content, 'utf8');

console.log('Товары с stubImage обновлены!'); 