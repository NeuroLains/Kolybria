import React, { useState, useEffect } from 'react';
import { getMainImage, hasImages } from '../utils/imageLoader';

const ProductImage = ({ productId, fallbackImage, className = '', alt = 'Product image' }) => {
  const [imageSrc, setImageSrc] = useState(fallbackImage);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      if (!hasImages(productId)) {
        setImageSrc(fallbackImage);
        setLoading(false);
        return;
      }

      try {
        const mainImagePath = getMainImage(productId);
        if (mainImagePath) {
          // Используем путь напрямую, так как getMainImage уже возвращает правильный путь
          setImageSrc(mainImagePath);
        } else {
          setImageSrc(fallbackImage);
        }
      } catch (err) {
        console.warn(`Ошибка загрузки изображения для товара ${productId}:`, err);
        setImageSrc(fallbackImage);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadImage();
  }, [productId, fallbackImage]);

  if (loading) {
    return <div className={`${className} bg-gray-200 animate-pulse`} />;
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (imageSrc !== fallbackImage) {
          setImageSrc(fallbackImage);
          setError(true);
        }
      }}
    />
  );
};

export default ProductImage; 