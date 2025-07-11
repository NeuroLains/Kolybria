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
    // Преобразуем путь из /src/assets/gallery/product_X/main.jpg в /gallery/product_X/main.jpg
    return mapping.main.replace('/src/assets/gallery/', '/gallery/');
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
    // Преобразуем пути из /src/assets/gallery/product_X/gallery_Y.jpg в /gallery/product_X/gallery_Y.jpg
    return mapping.gallery.map(img => img.replace('/src/assets/gallery/', '/gallery/'));
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
  const mapping = imageMapping[productId];
  return mapping && (mapping.main || (mapping.gallery && mapping.gallery.length > 0));
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