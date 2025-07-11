import React from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products'; // Import products from centralized data
import { getFormattedPrice } from '../utils/priceFormatter'; // Import the price formatter
// Remove unused image imports
// import { stubImage } from './StubPage'; // This might be used if stubImage is not directly from products.js, but I'll assume it is now.

// Remove the local services array
// const services = [
//   ...
// ];

export default function Services() {
  // Filter products relevant to Services using their IDs
  const servicesProductIds = [
    42, 43, 44, 45, 46, 47, 48
  ]; // These IDs correspond to services in products.js

  const filteredServicesProducts = products.filter(product => 
    servicesProductIds.includes(product.id)
  ).map(product => ({
    ...product,
    to: `/product/${product.id}`,
    image: product.image,
    title: product.name || product.title,
    displayPrice: getFormattedPrice(product)
  }));

  return (
    <div style={{ padding: '32px 0', textAlign: 'center' }}>
      <h1 style={{ color: '#2196f3', margin: '32px 0 16px', fontWeight: 700, letterSpacing: 1, fontSize: '2.5rem' }}>Услуги</h1>
      <div className="products-grid">
        {filteredServicesProducts.map((item) => (
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