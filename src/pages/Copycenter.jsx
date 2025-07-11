import React, { useState } from 'react';
import PrintIcon from '../assets/icons/print.svg';
import ScanIcon from '../assets/icons/scan.svg';
import BindIcon from '../assets/icons/bind.svg';
import LaminIcon from '../assets/icons/lamin.svg';
import CutIcon from '../assets/icons/cut.svg';
import PhotoIcon from '../assets/icons/photo.svg';
import OrderModal from '../components/OrderModal';

// Импортируем изображения для копицентра
import printImage from '../assets/services/copycenter/print.jpg';
import scanImage from '../assets/services/copycenter/scan.jpg';
import bindImage from '../assets/services/copycenter/bind.jpg';
import laminImage from '../assets/services/copycenter/lamin.jpg';
import cutImage from '../assets/services/copycenter/cut.jpg';
import photoImage from '../assets/services/copycenter/photo.jpg';

const copycenterServices = [
  {
    title: 'Печать',
    price: 'от 2 ₽ за стр.',
    icon: PrintIcon,
    image: printImage,
    desc: 'Черно-белая и цветная печать документов, фотографий, плакатов. Разные форматы, бумага.',
    features: [
      'Черно-белая печать',
      'Цветная печать',
      'Разные форматы',
      'Разная бумага'
    ],
    prices: [
      { count: 'Ч/б А4', price: '2 ₽/стр' },
      { count: 'Цвет А4', price: '15 ₽/стр' },
      { count: 'А3', price: 'x2 к А4' }
    ]
  },
  {
    title: 'Сканирование',
    price: 'от 5 ₽ за стр.',
    icon: ScanIcon,
    image: scanImage,
    desc: 'Сканирование документов, фотографий, книг. Высокое качество, разные форматы.',
    features: [
      'Высокое качество',
      'Разные форматы',
      'Цветное сканирование',
      'Сканирование книг'
    ],
    prices: [
      { count: 'А4', price: '5 ₽/стр' },
      { count: 'А3', price: '10 ₽/стр' },
      { count: 'Фото', price: '15 ₽/шт' }
    ]
  },
  {
    title: 'Брошюровка',
    price: 'от 50 ₽',
    icon: BindIcon,
    image: bindImage,
    desc: 'Брошюровка документов, дипломов, курсовых. Твердая и мягкая обложка.',
    features: [
      'Твердая обложка',
      'Мягкая обложка',
      'Разные форматы',
      'Разная бумага'
    ],
    prices: [
      { count: 'Мягкая', price: '50 ₽' },
      { count: 'Твердая', price: '150 ₽' },
      { count: 'Доп. стр', price: '2 ₽/стр' }
    ]
  },
  {
    title: 'Ламинация',
    price: 'от 30 ₽',
    icon: LaminIcon,
    image: laminImage,
    desc: 'Ламинация документов, фотографий, карточек. Разные форматы, толщина пленки.',
    features: [
      'Разные форматы',
      'Разная толщина',
      'Матовое покрытие',
      'Глянцевое покрытие'
    ],
    prices: [
      { count: 'А4', price: '30 ₽' },
      { count: 'А3', price: '60 ₽' },
      { count: 'А5', price: '20 ₽' }
    ]
  },
  {
    title: 'Резка',
    price: 'от 10 ₽',
    icon: CutIcon,
    image: cutImage,
    desc: 'Резка бумаги, картона, фотографий. Точная резка, разные форматы.',
    features: [
      'Точная резка',
      'Разные форматы',
      'Разные материалы',
      'Массовая резка'
    ],
    prices: [
      { count: 'А4', price: '10 ₽' },
      { count: 'А3', price: '20 ₽' },
      { count: 'Массовая', price: '5 ₽/рез' }
    ]
  },
  {
    title: 'Фотопечать',
    price: 'от 15 ₽',
    icon: PhotoIcon,
    image: photoImage,
    desc: 'Печать фотографий, открыток, календарей. Высокое качество, разные форматы.',
    features: [
      'Высокое качество',
      'Разные форматы',
      'Разная бумага',
      'Быстрая печать'
    ],
    prices: [
      { count: '10x15', price: '15 ₽' },
      { count: '15x21', price: '30 ₽' },
      { count: '20x30', price: '60 ₽' }
    ]
  }
];

function Copycenter() {
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
      }}>Копицентр</h1>
      <div style={{ 
        maxWidth: 800, 
        margin: '0 auto 48px', 
        color: '#666', 
        fontSize: '1.1rem', 
        lineHeight: 1.6 
      }}>
        <p>Мы предлагаем широкий спектр услуг копицентра: копирование, печать, сканирование и брошюровка документов. Современное оборудование, высокое качество и быстрые сроки выполнения.</p>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '32px',
        padding: '0 24px',
        maxWidth: 1400,
        margin: '0 auto'
      }}>
        {copycenterServices.map((service, index) => (
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

export default Copycenter; 