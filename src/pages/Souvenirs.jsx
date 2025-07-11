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
  ).map(product => ({
    ...product,
    to: `/product/${product.id}`,
    image: product.image,
    title: product.name || product.title,
    displayPrice: getFormattedPrice(product)
  }));

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