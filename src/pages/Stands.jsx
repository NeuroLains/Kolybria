import React from 'react';
import RollupIcon from '../assets/icons/rollup.svg';
import PopupIcon from '../assets/icons/popup.svg';
import LightboxIcon from '../assets/icons/lightbox.svg';
import BannerIcon from '../assets/icons/banner.svg';
import TableIcon from '../assets/icons/table.svg';
import CounterIcon from '../assets/icons/counter.svg';

const standServices = [
  {
    title: 'Ролл-апы',
    price: 'от 3500 ₽',
    icon: RollupIcon,
    desc: 'Ролл-апы для выставок, презентаций, мероприятий. Легкие, компактные, быстро устанавливаются.',
    features: [
      'Высота 200 см',
      'Ширина 85 см',
      'Компактная сумка',
      'Прочная конструкция'
    ],
    prices: [
      { count: '1 шт', price: '3500 ₽' },
      { count: '2 шт', price: '6500 ₽' },
      { count: '3 шт', price: '9500 ₽' }
    ]
  },
  {
    title: 'Поп-апы',
    price: 'от 4500 ₽',
    icon: PopupIcon,
    desc: 'Поп-апы для выставок, презентаций, мероприятий. Большая площадь для информации.',
    features: [
      'Высота 220 см',
      'Ширина 180 см',
      'Компактная сумка',
      'Прочная конструкция'
    ],
    prices: [
      { count: '1 шт', price: '4500 ₽' },
      { count: '2 шт', price: '8500 ₽' },
      { count: '3 шт', price: '12500 ₽' }
    ]
  },
  {
    title: 'Лайтбоксы',
    price: 'от 5500 ₽',
    icon: LightboxIcon,
    desc: 'Лайтбоксы для рекламы, информации, навигации. Подсветка, разные размеры.',
    features: [
      'Разные размеры',
      'LED подсветка',
      'Печать на пленке',
      'Прочная конструкция'
    ],
    prices: [
      { count: '1 шт', price: '5500 ₽' },
      { count: '2 шт', price: '10500 ₽' },
      { count: '3 шт', price: '15500 ₽' }
    ]
  },
  {
    title: 'Баннеры',
    price: 'от 2500 ₽',
    icon: BannerIcon,
    desc: 'Баннеры для рекламы, информации, навигации. Печать на баннерной ткани.',
    features: [
      'Разные размеры',
      'Печать на баннерной ткани',
      'Люверсы',
      'Прочная конструкция'
    ],
    prices: [
      { count: '1 шт', price: '2500 ₽' },
      { count: '2 шт', price: '4500 ₽' },
      { count: '3 шт', price: '6500 ₽' }
    ]
  },
  {
    title: 'Столы',
    price: 'от 6500 ₽',
    icon: TableIcon,
    desc: 'Столы для выставок, презентаций, мероприятий. Разные размеры, материалы.',
    features: [
      'Разные размеры',
      'Разные материалы',
      'Складная конструкция',
      'Прочная конструкция'
    ],
    prices: [
      { count: '1 шт', price: '6500 ₽' },
      { count: '2 шт', price: '12500 ₽' },
      { count: '3 шт', price: '18500 ₽' }
    ]
  },
  {
    title: 'Стойки',
    price: 'от 3500 ₽',
    icon: CounterIcon,
    desc: 'Стойки для рекламы, информации, навигации. Разные размеры, материалы.',
    features: [
      'Разные размеры',
      'Разные материалы',
      'Складная конструкция',
      'Прочная конструкция'
    ],
    prices: [
      { count: '1 шт', price: '3500 ₽' },
      { count: '2 шт', price: '6500 ₽' },
      { count: '3 шт', price: '9500 ₽' }
    ]
  }
];

function Stands() {
  return (
    <div style={{ padding: '32px 0', textAlign: 'center' }}>
      <h1 style={{ color: '#2196f3', margin: '32px 0 16px', fontWeight: 700, letterSpacing: 1 }}>Стенды и конструкции</h1>
      <div style={{ maxWidth: 800, margin: '0 auto 32px', color: '#666', fontSize: '1.1rem', lineHeight: 1.6 }}>
        <p>Мы изготавливаем стенды и конструкции для выставок, презентаций, мероприятий. Качественные материалы, современные технологии и индивидуальный подход к каждому заказу.</p>
      </div>
      <div className="catalog-grid">
        {standServices.map((service, index) => (
          <div key={index} className="catalog-card">
            <img src={service.icon} alt={service.title} className="catalog-icons" />
            <div className="catalog-title">{service.title}</div>
            <div className="catalog-price">{service.price}</div>
            <div style={{ marginTop: 12, color: '#666', fontSize: '0.9rem' }}>{service.desc}</div>
            <div style={{ marginTop: 16, textAlign: 'left', padding: '0 12px' }}>
              {service.features.map((feature, idx) => (
                <div key={idx} style={{ marginBottom: 8, color: '#1976d2', fontSize: '0.95rem' }}>• {feature}</div>
              ))}
            </div>
            <div style={{ 
              background: '#e8fbe9', 
              borderRadius: 10, 
              padding: '12px', 
              margin: '16px 12px 0', 
              color: '#388e3c', 
              fontWeight: 600, 
              fontSize: '1rem' 
            }}>
              {service.prices.map((price, idx) => (
                <div key={idx} style={{ marginBottom: 4 }}>{price.count} — <b>{price.price}</b></div>
              ))}
            </div>
            <button className="main-btn" style={{ marginTop: 16, minWidth: 160 }} onClick={() => window.location.href = '/contacts'}>
              Заказать
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stands; 