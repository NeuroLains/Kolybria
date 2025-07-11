import React, { useState } from 'react';
import DocumentIcon from '../assets/icons/document.svg';
import CertificateIcon from '../assets/icons/certificate.svg';
import DiplomaIcon from '../assets/icons/diploma.svg';
import JournalIcon from '../assets/icons/journal.svg';
import BookIcon from '../assets/icons/book.svg';
import FolderIcon from '../assets/icons/folder.svg';
import OrderModal from '../components/OrderModal';
// Импорт изображений для бланков
import documentImage from '../assets/services/blanks/blank1.jpg';
import certificateImage from '../assets/services/blanks/blank1.jpg';
import diplomaImage from '../assets/services/blanks/blank1.jpg';
import journalImage from '../assets/services/blanks/blank1.jpg';
import bookImage from '../assets/services/blanks/blank1.jpg';
import folderImage from '../assets/services/blanks/blank1.jpg';

const blankServices = [
  {
    title: 'Бланки документов',
    price: 'от 2.5 ₽ за шт.',
    icon: DocumentIcon,
    image: documentImage,
    desc: 'Бланки документов с логотипом компании. Печать на бумаге с водяными знаками, нумерация.',
    features: [
      'Бумага с водяными знаками',
      'Нумерация',
      'Печать логотипа',
      'Разные форматы'
    ],
    prices: [
      { count: '100 шт', price: '250 ₽' },
      { count: '500 шт', price: '1000 ₽' },
      { count: '1000 шт', price: '1800 ₽' }
    ]
  },
  {
    title: 'Сертификаты',
    price: 'от 15 ₽ за шт.',
    icon: CertificateIcon,
    image: certificateImage,
    desc: 'Сертификаты, грамоты, благодарности. Дизайнерская бумага, тиснение, печать.',
    features: [
      'Дизайнерская бумага',
      'Тиснение золотом/серебром',
      'Печать логотипа',
      'Разные форматы'
    ],
    prices: [
      { count: '50 шт', price: '750 ₽' },
      { count: '100 шт', price: '1400 ₽' },
      { count: '200 шт', price: '2600 ₽' }
    ]
  },
  {
    title: 'Дипломы',
    price: 'от 25 ₽ за шт.',
    icon: DiplomaIcon,
    image: diplomaImage,
    desc: 'Дипломы для наград, конкурсов, соревнований. Твердая обложка, тиснение, печать.',
    features: [
      'Твердая обложка',
      'Тиснение золотом/серебром',
      'Печать логотипа',
      'Разные форматы'
    ],
    prices: [
      { count: '50 шт', price: '1250 ₽' },
      { count: '100 шт', price: '2300 ₽' },
      { count: '200 шт', price: '4400 ₽' }
    ]
  },
  {
    title: 'Журналы',
    price: 'от 35 ₽ за шт.',
    icon: JournalIcon,
    image: journalImage,
    desc: 'Журналы учета, регистрации, инструктажа. Твердая обложка, прошивка, печать.',
    features: [
      'Твердая обложка',
      'Прошивка',
      'Печать логотипа',
      'Разные форматы'
    ],
    prices: [
      { count: '50 шт', price: '1750 ₽' },
      { count: '100 шт', price: '3200 ₽' },
      { count: '200 шт', price: '6000 ₽' }
    ]
  },
  {
    title: 'Книги',
    price: 'от 45 ₽ за шт.',
    icon: BookIcon,
    image: bookImage,
    desc: 'Книги, брошюры, каталоги. Твердая обложка, полноцветная печать, тиснение.',
    features: [
      'Твердая обложка',
      'Полноцветная печать',
      'Тиснение золотом/серебром',
      'Разные форматы'
    ],
    prices: [
      { count: '50 шт', price: '2250 ₽' },
      { count: '100 шт', price: '4200 ₽' },
      { count: '200 шт', price: '8000 ₽' }
    ]
  },
  {
    title: 'Папки',
    price: 'от 28 ₽ за шт.',
    icon: FolderIcon,
    image: folderImage,
    desc: 'Папки для документов с логотипом. Картон, ламинация, полноцветная печать.',
    features: [
      'Картон 250-300 г/м²',
      'Ламинация',
      'Печать логотипа',
      'Разные форматы'
    ],
    prices: [
      { count: '50 шт', price: '1400 ₽' },
      { count: '100 шт', price: '2600 ₽' },
      { count: '200 шт', price: '4800 ₽' }
    ]
  }
];

function Blanks() {
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
      }}>Бланки и документы</h1>
      <div style={{ 
        maxWidth: 800, 
        margin: '0 auto 48px', 
        color: '#666', 
        fontSize: '1.1rem', 
        lineHeight: 1.6 
      }}>
        <p>Мы изготавливаем бланки и документы с нанесением вашего логотипа. Качественные материалы, современные технологии печати и индивидуальный подход к каждому заказу.</p>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '32px',
        padding: '0 24px',
        maxWidth: 1400,
        margin: '0 auto'
      }}>
        {blankServices.map((service, index) => (
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

export default Blanks; 