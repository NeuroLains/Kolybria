#!/usr/bin/env node
/**
 * Скрипт для перемещения изображений в папку public
 */

const fs = require('fs');
const path = require('path');

// Создаем папку public/gallery если её нет
const publicGalleryPath = path.join(__dirname, 'public', 'gallery');
if (!fs.existsSync(publicGalleryPath)) {
  fs.mkdirSync(publicGalleryPath, { recursive: true });
}

// Копируем все изображения из src/assets/gallery в public/gallery
const sourceGalleryPath = path.join(__dirname, 'src', 'assets', 'gallery');

function copyDirectory(source, destination) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const items = fs.readdirSync(source);
  
  for (const item of items) {
    const sourcePath = path.join(source, item);
    const destPath = path.join(destination, item);
    
    if (fs.statSync(sourcePath).isDirectory()) {
      copyDirectory(sourcePath, destPath);
    } else {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`Скопирован: ${sourcePath} -> ${destPath}`);
    }
  }
}

if (fs.existsSync(sourceGalleryPath)) {
  copyDirectory(sourceGalleryPath, publicGalleryPath);
  console.log('Изображения успешно перемещены в public/gallery');
} else {
  console.log('Папка src/assets/gallery не найдена');
} 