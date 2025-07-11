import React, { useState } from 'react';
import CardIcon from '../assets/icons/card.svg';
import LeafletIcon from '../assets/icons/booklet.svg';
import BookletIcon from '../assets/icons/booklet.svg';
import PosterIcon from '../assets/icons/poster.svg';
import FlyerIcon from '../assets/icons/booklet.svg';
import StickerIcon from '../assets/icons/sticker.svg';
import CalendarIcon from '../assets/icons/calendar.svg';
import NotebookIcon from '../assets/icons/notebook.svg';
import FolderIcon from '../assets/icons/folder.svg';
import OrderModal from '../components/OrderModal';

// Импортируем изображения для услуг
import cardImage from '../assets/gallery/photo1.jpg';
import leafletImage from '../assets/gallery/photo2.jpg';
import bookletImage from '../assets/gallery/photo3.jpg';
import posterImage from '../assets/gallery/komissia1.jpg';
import flyerImage from '../assets/gallery/photo1.jpg';
import stickerImage from '../assets/gallery/photo2.jpg';
import calendarImage from '../assets/gallery/photo3.jpg';
import notebookImage from '../assets/gallery/komissia1.jpg';
import folderImage from '../assets/gallery/photo1.jpg';

const printingServices = [
  {
    title: 'Визитки',
    price: 'от 0.95 ₽ за шт.',
    icon: CardIcon,
    image: cardImage,
    desc: 'Печать визиток любых форматов, материалов и тиражей. Офсет, цифра, дизайнерские, пластиковые, металлические.',
    features: [
      'Печать от 100 шт. за 1 день',
      'Плотная бумага 300-350 г/м²',
      'Ламинация, тиснение, фигурная вырубка',
      'Дизайн под ваш бренд'
    ],
    prices: [
      { count: '100 шт', price: '950 ₽' },
      { count: '500 шт', price: '3900 ₽' },
      { count: '1000 шт', price: '6900 ₽' }
    ]
  },
  {
    title: 'Листовки',
    price: 'от 2.2 ₽ за шт.',
    icon: LeafletIcon,
    image: leafletImage,
    desc: 'Цветные и черно-белые листовки любых форматов. Оперативная печать, разные виды бумаги.',
    features: [
      'Форматы А4, А5, А6',
      'Бумага 80-300 г/м²',
      'Цветная и черно-белая печать',
      'Срочная печать от 1 часа'
    ],
    prices: [
      { count: '100 шт', price: '220 ₽' },
      { count: '500 шт', price: '900 ₽' },
      { count: '1000 шт', price: '1600 ₽' }
    ]
  },
  {
    title: 'Буклеты',
    price: 'от 4.1 ₽ за шт.',
    icon: BookletIcon,
    image: bookletImage,
    desc: 'Буклеты, каталоги, рекламные материалы. Складывание, фальцовка, любые форматы.',
    features: [
      'Форматы А4, А5',
      'Складывание в 2-3 сгиба',
      'Бумага 80-300 г/м²',
      'Ламинация, тиснение'
    ],
    prices: [
      { count: '100 шт', price: '410 ₽' },
      { count: '500 шт', price: '1800 ₽' },
      { count: '1000 шт', price: '3200 ₽' }
    ]
  },
  {
    title: 'Афиши',
    price: 'от 7.8 ₽ за шт.',
    icon: PosterIcon,
    image: posterImage,
    desc: 'Печать афиш и плакатов для мероприятий, рекламы, объявлений.',
    features: [
      'Форматы А3, А2, А1',
      'Бумага 80-300 г/м²',
      'Цветная печать',
      'Срочная печать'
    ],
    prices: [
      { count: '10 шт', price: '78 ₽' },
      { count: '50 шт', price: '350 ₽' },
      { count: '100 шт', price: '650 ₽' }
    ]
  },
  {
    title: 'Флаеры',
    price: 'от 1.4 ₽ за шт.',
    icon: FlyerIcon,
    image: flyerImage,
    desc: 'Флаеры для акций, рекламы, событий. Ярко, быстро, недорого.',
    features: [
      'Форматы А5, А6',
      'Бумага 80-300 г/м²',
      'Цветная печать',
      'Срочная печать'
    ],
    prices: [
      { count: '100 шт', price: '140 ₽' },
      { count: '500 шт', price: '600 ₽' },
      { count: '1000 шт', price: '1100 ₽' }
    ]
  },
  {
    title: 'Наклейки',
    price: 'от 4.0 ₽ за шт.',
    icon: StickerIcon,
    image: stickerImage,
    desc: 'Печать наклеек любых форм и размеров. Самоклейка, винил, пленка.',
    features: [
      'Любые размеры',
      'Самоклейка, винил',
      'Цветная печать',
      'Фигурная вырубка'
    ],
    prices: [
      { count: '100 шт', price: '400 ₽' },
      { count: '500 шт', price: '1800 ₽' },
      { count: '1000 шт', price: '3200 ₽' }
    ]
  },
  {
    title: 'Календари',
    price: 'от 3 ₽ за шт.',
    icon: CalendarIcon,
    image: calendarImage,
    desc: 'Квартальные, настольные, карманные календари. Офсет, цифра, индивидуальный дизайн.',
    features: [
      'Квартальные, настольные',
      'Карманные календари',
      'Индивидуальный дизайн',
      'Ламинация, тиснение'
    ],
    prices: [
      { count: '100 шт', price: '300 ₽' },
      { count: '500 шт', price: '1300 ₽' },
      { count: '1000 шт', price: '2400 ₽' }
    ]
  },
  {
    title: 'Блокноты',
    price: 'от 21 ₽ за шт.',
    icon: NotebookIcon,
    image: notebookImage,
    desc: 'Блокноты, тетради, записные книжки с логотипом. Любые форматы и тиражи.',
    features: [
      'Форматы А4, А5, А6',
      'Твердый и мягкий переплет',
      'Бумага 80-120 г/м²',
      'Печать логотипа'
    ],
    prices: [
      { count: '50 шт', price: '1050 ₽' },
      { count: '100 шт', price: '1900 ₽' },
      { count: '200 шт', price: '3500 ₽' }
    ]
  },
  {
    title: 'Папки',
    price: 'от 28 ₽ за шт.',
    icon: FolderIcon,
    image: folderImage,
    desc: 'Фирменные папки для документов с логотипом вашей компании. Картон, ламинация, полноцветная печать.',
    features: [
      'Форматы А4, А5',
      'Картон 250-300 г/м²',
      'Ламинация, тиснение',
      'Печать логотипа'
    ],
    prices: [
      { count: '50 шт', price: '1400 ₽' },
      { count: '100 шт', price: '2600 ₽' },
      { count: '200 шт', price: '4800 ₽' }
    ]
  }
];

function Printing() {
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
      }}>Полиграфия</h1>
      <div style={{ 
        maxWidth: 800, 
        margin: '0 auto 48px', 
        color: '#666', 
        fontSize: '1.1rem', 
        lineHeight: 1.6 
      }}>
        <p>Мы предлагаем широкий спектр полиграфических услуг для бизнеса и частных клиентов. Качественная печать, современное оборудование, опытная команда и индивидуальный подход к каждому заказу.</p>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '32px',
        padding: '0 24px',
        maxWidth: 1400,
        margin: '0 auto'
      }}>
        {printingServices.map((service, index) => (
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

export default Printing; 