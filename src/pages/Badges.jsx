import React, { useState } from 'react';
import BadgeIcon from '../assets/icons/badge.svg';
import BadgeRoundIcon from '../assets/icons/badge-round.svg';
import BadgeSquareIcon from '../assets/icons/badge-square.svg';
import BadgeStarIcon from '../assets/icons/badge-star.svg';
import BadgeCustomIcon from '../assets/icons/badge-custom.svg';
import OrderModal from '../components/OrderModal';
// Импорт изображения для значков
import badgeImage from '../assets/services/badges/badge1.jpg';

const badgeServices = [
  {
    title: 'Круглые значки',
    price: 'от 45 ₽ за шт.',
    icon: BadgeRoundIcon,
    image: badgeImage,
    desc: 'Классические круглые значки с логотипом или дизайном. Металлические, пластиковые, разные диаметры.',
    features: [
      'Диаметры 25-56 мм',
      'Металлические и пластиковые',
      'Печать логотипа',
      'Безопасная застежка'
    ],
    prices: [
      { count: '100 шт', price: '4500 ₽' },
      { count: '500 шт', price: '20000 ₽' },
      { count: '1000 шт', price: '38000 ₽' }
    ]
  },
  {
    title: 'Прямоугольные значки',
    price: 'от 55 ₽ за шт.',
    icon: BadgeSquareIcon,
    image: badgeImage,
    desc: 'Прямоугольные значки для сотрудников, посетителей, участников мероприятий. С булавкой или магнитом.',
    features: [
      'Размеры 25x75 мм',
      'Металлические и пластиковые',
      'Печать логотипа',
      'Булавка или магнит'
    ],
    prices: [
      { count: '100 шт', price: '5500 ₽' },
      { count: '500 шт', price: '24000 ₽' },
      { count: '1000 шт', price: '45000 ₽' }
    ]
  },
  {
    title: 'Звездные значки',
    price: 'от 65 ₽ за шт.',
    icon: BadgeStarIcon,
    image: badgeImage,
    desc: 'Значки в форме звезды для наград, поощрений, отличительных знаков. Металлические, с гравировкой.',
    features: [
      'Размер 40 мм',
      'Металлические',
      'Гравировка или печать',
      'Позолота, серебрение'
    ],
    prices: [
      { count: '50 шт', price: '3250 ₽' },
      { count: '100 шт', price: '6000 ₽' },
      { count: '200 шт', price: '11000 ₽' }
    ]
  },
  {
    title: 'Значки с подсветкой',
    price: 'от 120 ₽ за шт.',
    icon: BadgeIcon,
    image: badgeImage,
    desc: 'Значки со встроенной подсветкой для мероприятий, ночных клубов, вечеринок. Работают от батарейки.',
    features: [
      'Размер 50 мм',
      'Светодиодная подсветка',
      'Батарейка в комплекте',
      'Разные цвета свечения'
    ],
    prices: [
      { count: '50 шт', price: '6000 ₽' },
      { count: '100 шт', price: '11000 ₽' },
      { count: '200 шт', price: '20000 ₽' }
    ]
  },
  {
    title: 'Значки на заказ',
    price: 'от 80 ₽ за шт.',
    icon: BadgeCustomIcon,
    image: badgeImage,
    desc: 'Значки любой формы и размера по вашему дизайну. Индивидуальный подход, уникальные решения.',
    features: [
      'Любая форма и размер',
      'Металл, пластик, дерево',
      'Печать, гравировка',
      'Индивидуальный дизайн'
    ],
    prices: [
      { count: '50 шт', price: '4000 ₽' },
      { count: '100 шт', price: '7500 ₽' },
      { count: '200 шт', price: '14000 ₽' }
    ]
  }
];

function Badges() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleOrderClick = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <div style={{ padding: '32px 0', textAlign: 'center' }}>
      <h1 style={{ 
        color: '#2196f3', 
        margin: '32px 0 16px', 
        fontWeight: 700, 
        letterSpacing: 1,
        fontSize: '2.5rem'
      }}>Значки и бейджи</h1>
      <div style={{ 
        maxWidth: 800, 
        margin: '0 auto 48px', 
        color: '#666', 
        fontSize: '1.1rem', 
        lineHeight: 1.6 
      }}>
        <p>Мы изготавливаем значки и бейджи с нанесением вашего логотипа. Качественные материалы, современные технологии печати и индивидуальный подход к каждому заказу.</p>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '32px',
        padding: '0 24px',
        maxWidth: 1400,
        margin: '0 auto'
      }}>
        {badgeServices.map((service, index) => (
          <div key={index} style={{
            background: '#fff',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            overflow: 'hidden',
            transition: 'transform 0.3s, box-shadow 0.3s',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            ':hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
            }
          }}>
            <div style={{
              height: '200px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <img 
                src={service.image} 
                alt={service.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s'
                }}
              />
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)'
              }} />
            </div>
            
            <div style={{
              padding: '24px',
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <img 
                  src={service.icon} 
                  alt={service.title} 
                  style={{
                    width: '32px',
                    height: '32px',
                    marginRight: '12px'
                  }}
                />
                <h3 style={{
                  margin: 0,
                  fontSize: '1.5rem',
                  color: '#1976d2',
                  fontWeight: 600
                }}>{service.title}</h3>
              </div>

              <div style={{
                color: '#666',
                fontSize: '1.1rem',
                marginBottom: '16px',
                flex: 1
              }}>{service.desc}</div>

              <div style={{
                background: '#f5f5f5',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '16px'
              }}>
                {service.features.map((feature, idx) => (
                  <div key={idx} style={{
                    color: '#1976d2',
                    fontSize: '0.95rem',
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      color: '#2196f3',
                      marginRight: '8px',
                      fontSize: '1.2rem'
                    }}>•</span>
                    {feature}
                  </div>
                ))}
              </div>

              <div style={{
                background: '#e8f5e9',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '24px'
              }}>
                {service.prices.map((price, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '4px',
                    color: '#388e3c',
                    fontWeight: 500
                  }}>
                    <span>{price.count}</span>
                    <span style={{ fontWeight: 600 }}>{price.price}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleOrderClick(service)}
                style={{
                  background: '#2196f3',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.3s',
                  width: '100%',
                  ':hover': {
                    background: '#1976d2'
                  }
                }}
              >
                Заказать
              </button>
            </div>
          </div>
        ))}
      </div>

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceTitle={selectedService?.title}
      />
    </div>
  );
}

export default Badges; 