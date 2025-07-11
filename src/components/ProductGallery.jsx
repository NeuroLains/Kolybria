import React, { useState, useEffect, useRef } from 'react';
import { getMainImage, getGalleryImages, hasImages } from '../utils/imageLoader';

const ProductGallery = ({ productId, fallbackImage, productName }) => {
  const [images, setImages] = useState([fallbackImage]);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef(null);
  const THUMBNAILS_PER_PAGE = 4;
  const [thumbnailPage, setThumbnailPage] = useState(0);

  useEffect(() => {
    const loadImages = async () => {
      if (!hasImages(productId)) {
        setImages([fallbackImage]);
        setLoading(false);
        return;
      }

      try {
        const mainImagePath = getMainImage(productId);
        const galleryImagePaths = getGalleryImages(productId);
        
        const allImages = [];
        
        // Добавляем основное изображение
        if (mainImagePath) {
          allImages.push(mainImagePath);
        }
        
        // Добавляем изображения галереи
        galleryImagePaths.forEach(path => {
          allImages.push(path);
        });
        
        // Если нет изображений, используем fallback
        if (allImages.length === 0) {
          allImages.push(fallbackImage);
        }
        
        setImages(allImages);
      } catch (err) {
        console.warn(`Ошибка загрузки изображений для товара ${productId}:`, err);
        setImages([fallbackImage]);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [productId, fallbackImage]);

  // Автоматическая смена изображения
  useEffect(() => {
    if (images.length > 1) {
      intervalRef.current = setInterval(() => {
        setMainImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); // 3 секунды
      return () => clearInterval(intervalRef.current);
    }
    return undefined;
  }, [images]);

  // Сброс страницы миниатюр при смене изображений
  useEffect(() => {
    setThumbnailPage(0);
  }, [images]);

  const handleThumbnailClick = (index) => {
    setMainImageIndex(index);
  };

  const showPrevImage = () => {
    setMainImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const showNextImage = () => {
    setMainImageIndex((prevIndex) =>
      (prevIndex + 1) % images.length
    );
  };

  const maxThumbnailPage = Math.max(0, Math.ceil(images.length / THUMBNAILS_PER_PAGE) - 1);
  const startIdx = thumbnailPage * THUMBNAILS_PER_PAGE;
  const endIdx = startIdx + THUMBNAILS_PER_PAGE;
  const visibleThumbnails = images.slice(startIdx, endIdx);

  const handlePrevThumbs = () => {
    setThumbnailPage((prev) => Math.max(0, prev - 1));
  };
  const handleNextThumbs = () => {
    setThumbnailPage((prev) => Math.min(maxThumbnailPage, prev + 1));
  };

  if (loading) {
    return (
      <div className="product-image-column">
        <div className="product-main-image bg-gray-200 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="product-image-column">
      <div className="main-image-wrapper">
        <img
          src={images[mainImageIndex]}
          alt={productName}
          className={`product-main-image fixed-gallery-image${images[mainImageIndex] === fallbackImage ? ' img-fallback' : ''}`}
          onError={(e) => {
            if (e.target.src !== fallbackImage) {
              e.target.src = fallbackImage;
            }
          }}
        />
      </div>
      
      {/* Навигационные стрелки */}
      {images.length > 1 && (
        <>
          <span
            onClick={showPrevImage}
            className="product-arrow left"
          >&lt;</span>
          <span
            onClick={showNextImage}
            className="product-arrow right"
          >&gt;</span>
        </>
      )}

      {/* Миниатюры изображений */}
      {images.length > 1 && (
        <div className="product-thumbnail-gallery-wrapper">
          {thumbnailPage > 0 && (
            <span className="thumb-arrow left" onClick={handlePrevThumbs}>&lt;</span>
          )}
          <div className="product-thumbnail-gallery">
            {visibleThumbnails.map((img, index) => {
              // Индекс относительно всех изображений
              const globalIndex = startIdx + index;
              return (
                <div className="thumbnail-wrapper" key={globalIndex}>
                  <img
                    src={img}
                    alt={`${productName} thumbnail ${globalIndex + 1}`}
                    className={`product-thumbnail ${globalIndex === mainImageIndex ? 'active' : ''}`}
                    onClick={() => handleThumbnailClick(globalIndex)}
                    onError={(e) => {
                      if (e.target.src !== fallbackImage) {
                        e.target.src = fallbackImage;
                      }
                    }}
                  />
                </div>
              );
            })}
          </div>
          {thumbnailPage < maxThumbnailPage && (
            <span className="thumb-arrow right" onClick={handleNextThumbs}>&gt;</span>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductGallery; 