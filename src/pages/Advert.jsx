import React from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products'; // Import products from centralized data
import { getFormattedPrice } from '../utils/priceFormatter'; // Import the price formatter
// Remove unused image imports
// import { stubImage } from './StubPage'; // This might be used if stubImage is not directly from products.js, but I'll assume it is now.

// Remove the local adverts array
// const adverts = [
//   ...
// ];

export default function Advert() {
  // Filter products relevant to Advert using their IDs
  const advertProductIds = [
    33, 34, 35, 36, 37, 38, 39, 40, 41
  ]; // These IDs correspond to advert products in products.js

  const filteredAdvertProducts = products.filter(product => 
    advertProductIds.includes(product.id)
  ).map(product => ({
    ...product,
    to: `/product/${product.id}`,
    image: product.image,
    title: product.name || product.title,
    displayPrice: getFormattedPrice(product)
  }));

  return (
    <div style={{ padding: '32px 0', textAlign: 'center' }}>
      <h1 style={{ color: '#2196f3', margin: '32px 0 16px', fontWeight: 700, letterSpacing: 1, fontSize: '2.5rem' }}>Рекламные конструкции</h1>
      <div className="products-grid">
        {filteredAdvertProducts.map((item) => (
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