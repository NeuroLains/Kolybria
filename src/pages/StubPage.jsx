import React from 'react';
export const stubImage = 'https://via.placeholder.com/300x200?text=Изображение+в+разработке';

export default function StubPage({ title }) {
  return (
    <div style={{ padding: 48, textAlign: 'center' }}>
      <h1 style={{ color: '#2196f3', marginBottom: 24 }}>{title}</h1>
      <p style={{ fontSize: '1.2rem', color: '#888' }}>Страница в разработке. Скоро здесь появится подробная информация.</p>
    </div>
  );
} 