import React from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products'; // Import products from centralized data
import { getFormattedPrice } from '../utils/priceFormatter'; // Import the price formatter
// Remove unused image imports (cardImg, flyerImg, etc.) as they are now in products.js
// import cardImg from '../assets/services/polygraphy/business-card.jpg';
// import flyerImg from '../assets/services/polygraphy/flyer.jpg';
// import bookImg from '../assets/services/polygraphy/book.jpg';
// import notebookImg from '../assets/services/polygraphy/notebook.jpg';
// import envelopeImg from '../assets/services/polygraphy/envelope.jpg';
// import calendarImg from '../assets/services/polygraphy/calendar.jpg';

// const stubImage = 'https://via.placeholder.com/300x200?text=Изображение+в+разработке'; // Also remove if not directly used here

// Remove the local polygraphyServices array
// const polygraphyServices = [
//   ...
// ];

export default function Polygraphy() {
  // Filter products relevant to Polygraphy using their IDs
  const polygraphyProductIds = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16
  ]; // These IDs correspond to polygraphy products in products.js

  const filteredPolygraphyProducts = products.filter(product => 
    polygraphyProductIds.includes(product.id)
  ).map(product => {
    let queryParams = new URLSearchParams();
    
    // Добавляем базовые параметры в зависимости от типа товара
    switch (product.id) {
      case 1: // Визитки
        queryParams.append('Тип бумаги и тираж', 'Картон 300 гр + лак');
        queryParams.append('quantity_table', '1000');
        break;
      case 2: // Листовки
        queryParams.append('Формат и тираж', 'Листовка (А6)');
        queryParams.append('quantity_table', '1000');
        break;
      case 3: // Буклеты
        queryParams.append('Формат и тираж', 'А4, 2 фальца (в три сложения)');
        queryParams.append('quantity_table', '1000');
        break;
      case 4: // Блокноты
        queryParams.append('Формат и тираж', 'А5');
        queryParams.append('quantity_table', '100');
        break;
      // Добавьте другие случаи при необходимости
    }

    return {
      ...product,
      to: `/product/${product.id}${queryParams.toString() ? '?' + queryParams.toString() : ''}`,
      image: product.image,
      title: product.name || product.title,
      displayPrice: getFormattedPrice(product)
    };
  });

  return (
    <div style={{ padding: '32px 0', textAlign: 'center' }}>
      <h1 style={{ color: '#2196f3', margin: '32px 0 16px', fontWeight: 700, letterSpacing: 1, fontSize: '2.5rem' }}>Полиграфия</h1>
      <div className="products-grid">
        {filteredPolygraphyProducts.map((item) => (
          <ProductCard
            key={item.id}
            to={item.to}
            image={item.image}
            title={item.title}
            price={item.displayPrice}
            productId={item.id}
          />
        ))}
      </div>
    </div>
  );
}