import React, { useState, useEffect } from 'react';
import { products } from '../data/products';
import CardIcon from '../assets/icons/card.svg';
import LeafletIcon from '../assets/icons/booklet.svg';
import BookletIcon from '../assets/icons/booklet.svg';
import PosterIcon from '../assets/icons/poster.svg';
import FlyerIcon from '../assets/icons/booklet.svg';
import StickerIcon from '../assets/icons/sticker.svg';
import BadgeIcon from '../assets/icons/tag.svg';
import TshirtIcon from '../assets/icons/bag.svg';
import MugIcon from '../assets/icons/bag.svg';
import DesignIcon from '../assets/icons/tag.svg';
import CalendarIcon from '../assets/icons/calendar.svg';
import NotebookIcon from '../assets/icons/notebook.svg';
import PenIcon from '../assets/icons/tag.svg';
import FolderIcon from '../assets/icons/folder.svg';
import ProductCard from '../components/ProductCard';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import Vizitka from '../assets/gallery/Cards/Vizitka.jpg';
import Listovka from '../assets/gallery/Cards/Listovka.jpg';
import Buklet from '../assets/gallery/Cards/Buklet.jpg';
import Flayer from '../assets/gallery/Cards/Flayer.jpg';
import Afisha from '../assets/gallery/Cards/Afisha.jpg';
import Stickers from '../assets/gallery/Cards/Stickers.jpg';
import Tshirt from '../assets/gallery/Cards/Tshirt.jpg';
import Desighn from '../assets/gallery/Cards/Desighn.jpg';

// Импортируем изображения для слайдера
import slider1 from '../assets/gallery/1.jpg';
import slider2 from '../assets/gallery/2.jpg';
import slider3 from '../assets/gallery/3.jpg';
import slider4 from '../assets/gallery/4.jpg';

// Импортируем изображения для галереи работ
import work1 from '../assets/gallery/1.jpg';
import work2 from '../assets/gallery/2.jpg';
import work3 from '../assets/gallery/3.jpg';
import work4 from '../assets/gallery/4.jpg';
import work5 from '../assets/gallery/5.jpg';
import work6 from '../assets/gallery/6.jpg';
import work7 from '../assets/gallery/7.jpg';
import work8 from '../assets/gallery/8.jpg';
import work9 from '../assets/gallery/9.jpg';
import work10 from '../assets/gallery/10.jpg';
import work11 from '../assets/gallery/11.jpg';
import work12 from '../assets/gallery/12.jpg';
import work13 from '../assets/gallery/13.jpg';
import work14 from '../assets/gallery/14.jpg';

import photo1 from '../assets/gallery/photo1.jpg';
import photo2 from '../assets/gallery/photo2.jpg';
import photo3 from '../assets/gallery/photo3.jpg';

const services = [
  { title: 'Визитки', price: 95, oldPrice: 120, discount: 21, icon: CardIcon, image: photo1, rating: 4.9, reviews: 120 },
  { title: 'Листовки', price: 220, oldPrice: 250, discount: 12, icon: LeafletIcon, image: photo2, rating: 4.8, reviews: 80 },
  { title: 'Буклеты', price: 410, oldPrice: 500, discount: 18, icon: BookletIcon, image: photo3, rating: 4.7, reviews: 60 },
  { title: 'Афиши', price: 78, oldPrice: 100, discount: 22, icon: PosterIcon, image: photo1, rating: 4.6, reviews: 45 },
  { title: 'Флаеры', price: 140, oldPrice: 180, discount: 22, icon: FlyerIcon, image: photo2, rating: 4.8, reviews: 70 },
  { title: 'Наклейки', price: 400, oldPrice: 500, discount: 20, icon: StickerIcon, image: photo3, rating: 4.9, reviews: 90 },
  { title: 'Значки', price: 25, oldPrice: 35, discount: 29, icon: BadgeIcon, image: photo1, rating: 4.9, reviews: 110 },
  { title: 'Футболки', price: 200, oldPrice: 250, discount: 20, icon: TshirtIcon, image: photo2, rating: 4.7, reviews: 55 },
  { title: 'Кружки', price: 250, oldPrice: 300, discount: 17, icon: MugIcon, image: photo3, rating: 4.8, reviews: 75 },
  { title: 'Дизайн', price: 100, oldPrice: 120, discount: 17, icon: DesignIcon, image: photo1, rating: 4.9, reviews: 60 },
  { title: 'Календари', price: 300, oldPrice: 350, discount: 14, icon: CalendarIcon, image: photo2, rating: 4.8, reviews: 50 },
  { title: 'Блокноты', price: 1050, oldPrice: 1200, discount: 13, icon: NotebookIcon, image: photo3, rating: 4.7, reviews: 40 },
  { title: 'Ручки', price: 15, oldPrice: 20, discount: 25, icon: PenIcon, image: photo1, rating: 4.8, reviews: 100 },
  { title: 'Плакаты', price: 78, oldPrice: 100, discount: 22, icon: PosterIcon, image: photo2, rating: 4.6, reviews: 30 },
  { title: 'Папки', price: 1400, oldPrice: 1600, discount: 13, icon: FolderIcon, image: photo3, rating: 4.7, reviews: 25 }
];

const sliderContent = [
  { image: slider1, title: 'Печать визиток', price: 'от 95 ₽ за 100 шт.' },
  { image: slider2, title: 'Печать листовок', price: 'от 220 ₽ за 100 шт.' },
  { image: slider3, title: 'Печать буклетов', price: 'от 410 ₽ за 100 шт.' },
  { image: slider4, title: 'Печать плакатов', price: 'от 78 ₽ за 10 шт.' }
];

const galleryImages = [
  work1, work2, work3, work4, work5, work6, work7, work8, work9, work10, work11, work12, work13, work14
];

export default function Home() {
  const bestSellersIds = [1, 2, 17, 18, 19, 20, 16, 37]; // Corrected IDs for best sellers
  const bestSellers = products.filter(product => bestSellersIds.includes(product.id)).map(product => {
    let displayTitle = product.name || product.title;
    let queryParams = new URLSearchParams();
    let displayPrice = 0; // Initialize with 0, will be set in switch or default
    let effectiveQuantityForCardDisplay = 1; // Default to 1, overridden for specific products

    switch (product.id) {
      case 1: // Визитки
        displayTitle = 'Визитка 1000шт';
        queryParams.append('Тип бумаги и тираж', 'Картон 300 гр + лак');
        queryParams.append('quantity_table', '1000');
        const bizCardOptionGroup = product.options.find(opt => opt.name === 'Тип бумаги и тираж');
        if (bizCardOptionGroup && bizCardOptionGroup.type === 'product-table') {
          const quantityToFind = 1000;
          effectiveQuantityForCardDisplay = quantityToFind; // Store this quantity
          const quantityIndex = bizCardOptionGroup.tableData.quantities.indexOf(quantityToFind);
          const row = bizCardOptionGroup.tableData.rows.find(r => r.name === 'Картон 300 гр + лак');
          if (row && quantityIndex !== -1 && row.prices[quantityIndex] !== null) {
            displayPrice = row.prices[quantityIndex]; // Уже цена за единицу
          }
        }
        break;
      case 2: // Листовки
        displayTitle = 'Листовки 1000шт';
        queryParams.append('Формат и тираж', 'Листовка (А6)');
        queryParams.append('quantity_table', '1000');
        const flyerOptionGroup = product.options.find(opt => opt.name === 'Формат и тираж');
        if (flyerOptionGroup && flyerOptionGroup.type === 'product-table') {
          const quantityToFind = 1000;
          effectiveQuantityForCardDisplay = quantityToFind; // Store this quantity
          const quantityIndex = flyerOptionGroup.tableData.quantities.indexOf(quantityToFind);
          const row = flyerOptionGroup.tableData.rows.find(r => r.name === 'Листовка (А6)');
          if (row && quantityIndex !== -1 && row.prices[quantityIndex] !== null) {
            displayPrice = row.prices[quantityIndex]; // Уже цена за единицу
          }
        }
        break;
      case 17: // Значки
        displayTitle = 'Значки 25мм 100шт';
        queryParams.append('Размер и тип', 'Значки 25 мм. Металл. Булавка');
        queryParams.append('quantity_table', '100');
        const badgeOptionGroup = product.options.find(opt => opt.name === 'Размер и тип');
        if (badgeOptionGroup && badgeOptionGroup.type === 'product-table') {
          const quantityToFind = 100;
          effectiveQuantityForCardDisplay = quantityToFind; // Store this quantity
          const quantityIndex = badgeOptionGroup.tableData.quantities.indexOf(quantityToFind);
          const row = badgeOptionGroup.tableData.rows.find(r => r.name === 'Значки 25 мм. Металл. Булавка');
          if (row && quantityIndex !== -1 && row.prices[quantityIndex] !== null) {
            displayPrice = row.prices[quantityIndex]; // Уже цена за единицу
          }
        }
        break;
      case 18: // 3Д Стикеры
        displayTitle = '3Д стикеры 50x50мм 30шт';
        queryParams.append('Размер и количество', 'Прямоугольник размер 50x50 мм');
        queryParams.append('quantity_table', '30');
        const sticker3dOptionGroup = product.options.find(opt => opt.name === 'Размер и количество');
        if (sticker3dOptionGroup && sticker3dOptionGroup.type === 'product-table') {
          const quantityToFind = 30;
          effectiveQuantityForCardDisplay = quantityToFind; // Store this quantity
          const quantityIndex = sticker3dOptionGroup.tableData.quantities.indexOf(quantityToFind);
          const row = sticker3dOptionGroup.tableData.rows.find(r => r.name === 'Прямоугольник размер 50x50 мм');
          if (row && quantityIndex !== -1 && row.prices[quantityIndex] !== null) {
            displayPrice = row.prices[quantityIndex] / quantityToFind; // Общая цена деленная на количество
          }
        }
        break;
      case 19: // Кружка
        displayTitle = 'Кружка 50шт';
        queryParams.append('Тип и количество', 'Белая кружка');
        queryParams.append('quantity_table', '50');
        const mugOptionGroup = product.options.find(opt => opt.name === 'Тип и количество');
        if (mugOptionGroup && mugOptionGroup.type === 'product-table') {
          const quantityToFind = 50;
          effectiveQuantityForCardDisplay = quantityToFind; // Store this quantity
          const quantityIndex = mugOptionGroup.tableData.quantities.indexOf(quantityToFind);
          const row = mugOptionGroup.tableData.rows.find(r => r.name === 'Белая кружка');
          if (row && quantityIndex !== -1 && row.prices[quantityIndex] !== null) {
            displayPrice = row.prices[quantityIndex] / quantityToFind; // Общая цена деленная на количество
          }
        }
        break;
      case 20: // Футболки
        displayTitle = 'Футболки 10шт';
        queryParams.append('Размер', 'S');
        effectiveQuantityForCardDisplay = 10; // Explicitly set for hardcoded quantity in title
        displayPrice = product.basePrice / effectiveQuantityForCardDisplay; // Цена за единицу
        break;
      case 16: // Самокопирующиеся Бланки
        displayTitle = 'Бланки А6 2 слоя 1000шт';
        queryParams.append('Формат бумаги и количество слоев', 'А6, 2 слоя');
        queryParams.append('quantity_table', '1000');
        queryParams.append('Количество макетов', '1');
        const blankOptionGroup = product.options.find(opt => opt.name === 'Формат бумаги и количество слоев');
        if (blankOptionGroup && blankOptionGroup.type === 'product-table') {
          const quantityToFind = 1000;
          effectiveQuantityForCardDisplay = quantityToFind; // Store this quantity
          const quantityIndex = blankOptionGroup.tableData.quantities.indexOf(quantityToFind);
          const row = blankOptionGroup.tableData.rows.find(r => r.name === 'А6, 2 слоя');
          if (row && quantityIndex !== -1 && row.prices[quantityIndex] !== null) {
            displayPrice = row.prices[quantityIndex]; // Уже цена за единицу
          }
        }
        break;
      case 37: // Х-образные стойки (Corrected ID)
        displayTitle = 'Х-образная стойка 1шт';
        queryParams.append('Размер', 'Маленький');
        effectiveQuantityForCardDisplay = 1; // Explicitly set as it's a total price for 1 unit
        const xStandOptionGroup = product.options.find(opt => opt.name === 'Размер');
        if (xStandOptionGroup && xStandOptionGroup.type === 'radio') {
            const smallSizeOption = xStandOptionGroup.choices.find(choice => choice.value === 'small');
            if (smallSizeOption) {
                const basePrice = product.basePrice || 0;
                displayPrice = basePrice + smallSizeOption.priceModifier; // Base price + modifier for total price
            }
        }
        break;
      default:
        displayPrice = product.basePrice; // Fallback to basePrice if not a specific best seller and basePrice is defined
        break;
    }

    let formattedPrice;
    formattedPrice = `${displayPrice.toFixed(2)} ₽/шт`;

    return {
      ...product,
      displayTitle,
      queryParams: queryParams.toString(),
      displayPrice: formattedPrice
    };
  });

  // --- Автослайдер ---
  const [autoIndex, setAutoIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAutoIndex((prev) => (prev + 1) % sliderContent.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // --- Примеры работ ---
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const visibleCount = 3;

  useEffect(() => {
    const timer = setInterval(() => {
      setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const showPrev = () => setGalleryIndex((i) => (i === 0 ? galleryImages.length - 1 : i - 1));
  const showNext = () => setGalleryIndex((i) => (i + 1) % galleryImages.length);
  const getVisibleImages = () => {
    return Array.from({ length: visibleCount }, (_, i) =>
      galleryImages[(galleryIndex + i) % galleryImages.length]
    );
  };

  return (
    <>
      <div className="slider-hero">
        <div className="slider-hero-bg">
          <img src={sliderContent[autoIndex].image} alt="Слайд" className="slider-hero-img" />
        </div>
        <div className="slider-hero-content">
          <h1 className="slider-hero-title">{sliderContent[autoIndex].title}</h1>
          <div className="slider-hero-sub">{sliderContent[autoIndex].price}</div>
          <button className="main-btn slider-hero-btn">Рассчитать стоимость</button>
        </div>
      </div>
      <div style={{ padding: '32px 0', textAlign: 'center' }}>
        <h2 className="section-title">Хиты продаж</h2>
        <div className="products-grid">
          {bestSellers.map(product => (
            <ProductCard
              key={product.id}
              to={`/product/${product.id}?${product.queryParams}`}
              image={product.gallery && product.gallery[0] ? product.gallery[0].main : '/path/to/default.jpg'}
              title={product.displayTitle}
              price={product.displayPrice}
              productId={product.id}
            />
          ))}
        </div>
        {/* Примеры наших работ */}
        <div className="section-yellow">
          <div className="gallery-section" style={{ padding: '32px 20px' }}>
            <div className="gallery-title" style={{ color: '#2196f3', fontWeight: 700, letterSpacing: 1, marginBottom: 16, fontSize: '2.2rem' }}>Наши работы</div>
            <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto' }}>
              <span className="gallery-arrow gallery-arrow-left" onClick={showPrev} style={{
                cursor: 'pointer',
                fontSize: '40px',
                padding: '8px',
                color: '#1976d2',
                zIndex: 2,
                background: 'rgba(255,255,255,0.9)',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                position: 'absolute',
                left: '0px',
                top: '50%',
                transform: 'translateY(-50%) translateX(-50%)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) translateX(-50%) scale(1.1)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) translateX(-50%) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
              }}
              >&lt;</span>
              <div className="gallery-slider" style={{
                display: 'flex',
                gap: '16px',
                justifyContent: 'center',
                alignItems: 'center',
                height: 'auto',
                position: 'relative',
                padding: '0 50px',
                overflow: 'hidden',
                boxSizing: 'border-box'
              }}>
                {getVisibleImages().map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Пример работы ${idx + 1}`}
                    className="gallery-img"
                    style={{
                      height: '240px',
                      width: 'calc(33.33% - 16px)',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                      flex: '0 0 auto',
                      opacity: 1,
                      transform: 'scale(1)',
                      boxSizing: 'border-box'
                    }}
                    onClick={() => setSelectedImage(img)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.03)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.25)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
                    }}
                  />
                ))}
              </div>
              <span className="gallery-arrow gallery-arrow-right" onClick={showNext} style={{
                cursor: 'pointer',
                fontSize: '40px',
                padding: '8px',
                color: '#1976d2',
                zIndex: 2,
                background: 'rgba(255,255,255,0.9)',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                position: 'absolute',
                right: '0px',
                top: '50%',
                transform: 'translateY(-50%) translateX(50%)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) translateX(50%) scale(1.1)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) translateX(50%) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
              }}
              >&gt;</span>
            </div>
            <div className="gallery-dots" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              marginTop: '24px'
            }}>
              {galleryImages.map((_, idx) => (
                <span
                  key={idx}
                  className={"gallery-dot" + (galleryIndex === idx ? " active" : "")}
                  onClick={() => setGalleryIndex(idx)}
                  style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    backgroundColor: galleryIndex === idx ? '#2196f3' : '#bdbdbd',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: galleryIndex === idx ? 'scale(1.3)' : 'scale(1)',
                    boxShadow: galleryIndex === idx ? '0 0 0 3px rgba(33,150,243,0.4)' : 'none'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно для просмотра изображения */}
      {selectedImage && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            cursor: 'pointer'
          }}
          onClick={() => setSelectedImage(null)}
        >
          <img 
            src={selectedImage} 
            alt="Увеличенное изображение" 
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain',
              borderRadius: '8px'
            }}
          />
        </div>
      )}

      {/* Блок с картой 'Как к нам добраться' */}
      <div style={{ padding: '16px 0 32px 0', textAlign: 'center', marginTop: '-96px' }}>
        <h2 style={{ color: '#2196f3', margin: '24px 0 16px', fontWeight: 700, letterSpacing: 1, fontSize: '2.2rem' }}>Как к нам добраться</h2>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 16px' }}>
          <div style={{ 
            width: '100%', 
            height: 500, 
            background: '#fff',
            borderRadius: 16,
            marginBottom: 24,
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
          }}>
            <YMaps>
              <Map 
                defaultState={{ center: [56.265307, 43.892188], zoom: 17 }}
                width="100%"
                height="100%"
              >
                <Placemark 
                  geometry={[56.265307, 43.892188]}
                  options={{
                    preset: 'islands#redIcon',
                    iconColor: '#2563eb'
                  }}
                  properties={{
                    balloonContent: `
                      <div style='padding: 10px;'>
                        <h3 style='margin-bottom: 10px; font-weight: bold;'>ООО "Колибрия"</h3>
                        <p>г. Нижний Новгород, ул. Бусыгина, д. 19а</p>
                      </div>
                    `
                  }}
                />
              </Map>
            </YMaps>
          </div>
          <div style={{ marginTop: 0, color: '#333', fontSize: '1.2rem', lineHeight: 1.9 }}>
            <p style={{ fontWeight: 700, letterSpacing: '0.5px', marginBottom: '8px' }}><strong>Адрес:</strong> г. Нижний Новгород, ул. Бусыгина, д. 19а, офисы 118 и 120</p>
            <p style={{ fontWeight: 700, letterSpacing: '0.5px' }}><strong>Телефоны:</strong> (831) 291-291-7, 415-11-45</p>
          </div>
        </div>
      </div>
    </>
  );
} 