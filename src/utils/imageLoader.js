// Утилита для загрузки изображений из галереи
import imageMapping from '../../image_mapping.json';

/**
 * Получает основное изображение для товара
 * @param {number} productId - ID товара
 * @returns {string} Путь к основному изображению
 */
export const getMainImage = (productId) => {
  const mapping = imageMapping[productId];
  if (mapping && mapping.main) {
    const path = mapping.main;
    // Проверяем начало пути и возвращаем правильный путь
    if (path.startsWith('/src/assets/gallery/')) {
      return path.replace('/src/assets/gallery/', '/gallery/');
    } else if (path.startsWith('/gallery/')) {
      return path;
    }
  }
  return null;
};

/**
 * Получает все изображения галереи для товара
 * @param {number} productId - ID товара
 * @returns {string[]} Массив путей к изображениям галереи
 */
export const getGalleryImages = (productId) => {
  const mapping = imageMapping[productId];
  if (mapping && mapping.gallery && mapping.gallery.length > 0) {
    return mapping.gallery.map(path => {
      if (path.startsWith('/src/assets/gallery/')) {
        return path.replace('/src/assets/gallery/', '/gallery/');
      } else if (path.startsWith('/gallery/')) {
        return path;
      }
      return path;
    }).filter(Boolean); // Убираем возможные null значения
  }
  return [];
};

/**
 * Получает все изображения для товара (основное + галерея)
 * @param {number} productId - ID товара
 * @returns {string[]} Массив всех путей к изображениям
 */
export const getAllImages = (productId) => {
  const mainImage = getMainImage(productId);
  const galleryImages = getGalleryImages(productId);
  
  const allImages = [];
  if (mainImage) {
    allImages.push(mainImage);
  }
  allImages.push(...galleryImages);
  
  return allImages;
};

/**
 * Проверяет, есть ли изображения для товара
 * @param {number} productId - ID товара
 * @returns {boolean} true если есть изображения
 */
export const hasImages = (productId) => {
  try {
    const mapping = imageMapping[productId];
    if (!mapping) {
      console.warn(`No image mapping found for product ${productId}`);
      return false;
    }
    
    const hasMain = mapping.main && typeof mapping.main === 'string';
    const hasGallery = mapping.gallery && Array.isArray(mapping.gallery) && mapping.gallery.length > 0;
    
    if (!hasMain && !hasGallery) {
      console.warn(`No valid images found for product ${productId}`);
    }
    
    return hasMain || hasGallery;
  } catch (error) {
    console.error(`Error checking images for product ${productId}:`, error);
    return false;
  }
};

/**
 * Динамически импортирует изображение
 * @param {string} imagePath - Путь к изображению
 * @returns {Promise<string>} URL изображения
 */
export const importImage = async (imagePath) => {
  if (!imagePath) return null;
  
  try {
    // Для Vite используем динамический импорт
    const module = await import(`../${imagePath}`);
    return module.default;
  } catch (error) {
    console.warn(`Не удалось загрузить изображение: ${imagePath}`, error);
    return null;
  }
}; 