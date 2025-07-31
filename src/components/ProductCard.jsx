import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductImage from './ProductImage';
import { getMainImage, hasImages } from '../utils/imageLoader';
import './ProductCard.css';

export default function ProductCard({ to, image, title, price, productId }) {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [backgroundError, setBackgroundError] = useState(false);

  useEffect(() => {
    // Загружаем main изображение для фона
    if (hasImages(productId) && !backgroundError) {
      const mainImage = getMainImage(productId);
      if (mainImage) {
        // Проверяем загрузку изображения
        const img = new Image();
        img.onload = () => {
          setBackgroundImage(mainImage);
        };
        img.onerror = () => {
          setBackgroundError(true);
        };
        img.src = mainImage;
      }
    }
  }, [productId, backgroundError]);

  const formatPrice = (priceStr) => {
    if (!priceStr) return { value: '0', unit: '' };
    // Remove any spaces and replace commas with dots
    const cleanPrice = String(priceStr).replace(/\s+/g, '').replace(',', '.');
    // Extract numeric value and unit, ignoring currency symbols
    const match = cleanPrice.match(/^([\d.]+)[^а-яА-Яa-zA-Z]*(.*)$/);
    
    if (!match) return { value: priceStr, unit: '' };
    
    let [_, value, unit] = match;
    
    // Clean up unit, remove currency symbols
    unit = unit.replace(/[Рр]ub?\.?/g, '').replace('руб', '').trim();
    
    return {
      value: parseFloat(value).toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 2 }),
      unit: unit
    };
  };

  const { value, unit } = formatPrice(price);
  
  // Truncate title manually for better control
  const displayTitle = title.length > 50 ? title.substring(0, 47) + '...' : title;

  return (
    <Link to={to} className="product-card">
      {/* Размытое фоновое изображение */}
      {backgroundImage && (
        <div 
          className="product-card-bg-image"
          style={{
            backgroundImage: `url(${backgroundImage})`
          }}
        />
      )}
      
      <div className="product-card-img-wrap">
        <ProductImage 
          productId={productId}
          fallbackImage={image}
          className="product-card-img"
          alt={title}
        />
      </div>
      <div className="product-card-content">
        <div className="product-card-title">{displayTitle}</div>
        <div className="product-card-prices">
          <span className="product-card-price">
            <span className="price-value">{value}</span>
            <span className="price-currency">&nbsp;₽</span>
            {unit && <span className="price-unit">/{unit}</span>}
          </span>
        </div>
      </div>
    </Link>
  );
} 