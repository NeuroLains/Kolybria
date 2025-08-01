import React from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products'; // Import products from centralized data
import { getFormattedPrice } from '../utils/priceFormatter'; // Import the price formatter
// Remove unused image imports
// import badgeImg from '../assets/services/souvenirs/badge.jpg';
// import mugImg from '../assets/services/souvenirs/mug.jpg';
// import tshirtImg from '../assets/services/souvenirs/tshirt.jpg';
// import capImg from '../assets/services/souvenirs/cap.jpg';
// import magnetImg from '../assets/services/souvenirs/magnet.jpg';

// const stubImage = 'https://via.placeholder.com/300x200?text=Изображение+в+разработке'; // Also remove if not directly used here

// Remove the local souvenirs array
// const souvenirs = [
//   ...
// ];

export default function Souvenirs() {
  // Filter products relevant to Souvenirs using their IDs
  const souvenirsProductIds = [
    17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32
  ]; // These IDs correspond to souvenir products in products.js

  const filteredSouvenirsProducts = products.filter(product => 
    souvenirsProductIds.includes(product.id)
  ).map(product => {
    let queryParams = new URLSearchParams();
    
    // Добавляем базовые параметры в зависимости от типа товара
    switch (product.id) {
      case 17: // Значки
        queryParams.append('Размер и тип', 'Значки 25 мм. Металл. Булавка');
        queryParams.append('quantity_table', '100');
        break;
      case 18: // 3Д стикеры
        queryParams.append('Размер и количество', 'Прямоугольник размер 50x50 мм');
        queryParams.append('quantity_table', '30');
        break;
      case 19: // Кружки
        queryParams.append('Тип и количество', 'Белая кружка');
        queryParams.append('quantity_table', '50');
        break;
      case 20: // Футболки
        queryParams.append('Синтетика + хлопок', 'two_layer_white');
        queryParams.append('Размер футболки', 'S');
        queryParams.append('Количество', '10');
        queryParams.append('Размер принта', 'a4');
        break;
      case 21: // Бейсболки
        queryParams.append('Тип и количество', 'Бейсболка белая');
        queryParams.append('quantity_table', '50');
        break;
      case 22: // Магниты
        queryParams.append('Размер и тип', 'Магнит 70x100 мм');
        queryParams.append('quantity_table', '100');
        break;
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
      <h1 style={{ color: '#2196f3', margin: '32px 0 16px', fontWeight: 700, letterSpacing: 1, fontSize: '2.5rem' }}>Сувенирная продукция</h1>
      <div className="products-grid">
        {filteredSouvenirsProducts.map((item) => (
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