import React from 'react';
import { FaCheckCircle, FaUsers, FaTools, FaHandshake, FaClock, FaAward } from 'react-icons/fa';

const advantages = [
  {
    icon: <FaUsers size={40} color="#2196f3" />,
    title: 'Опытная команда',
    desc: 'Наши специалисты имеют многолетний опыт в полиграфии и рекламной продукции. Мы постоянно совершенствуем свои навыки и следим за новыми технологиями.'
  },
  {
    icon: <FaTools size={40} color="#2196f3" />,
    title: 'Современное оборудование',
    desc: 'Мы используем самое современное оборудование для печати и постпечатной обработки. Это позволяет нам гарантировать высокое качество продукции.'
  },
  {
    icon: <FaHandshake size={40} color="#2196f3" />,
    title: 'Индивидуальный подход',
    desc: 'Мы внимательно относимся к каждому клиенту и его потребностям. Готовы предложить оптимальные решения для ваших задач.'
  },
  {
    icon: <FaClock size={40} color="#2196f3" />,
    title: 'Оперативность',
    desc: 'Мы ценим ваше время и выполняем заказы в кратчайшие сроки. При этом качество работы остается на высшем уровне.'
  },
  {
    icon: <FaAward size={40} color="#2196f3" />,
    title: 'Гарантия качества',
    desc: 'Мы гарантируем качество нашей продукции. Если вас что-то не устроит, мы исправим это бесплатно.'
  }
];

function About() {
  return (
    <div style={{ padding: '32px 0', textAlign: 'center' }}>
      <h1 style={{ color: '#2196f3', margin: '32px 0 16px', fontWeight: 700, letterSpacing: 1 }}>О компании</h1>
      <div style={{ maxWidth: 800, margin: '0 auto 32px', color: '#666', fontSize: '1.1rem', lineHeight: 1.6 }}>
        <p>Мы - компания с многолетним опытом в сфере полиграфии и рекламной продукции. Наша миссия - помогать бизнесу развиваться, создавая качественную полиграфическую и рекламную продукцию.</p>
        <p style={{ marginTop: 16 }}>Мы предлагаем полный спектр услуг: от разработки дизайна до печати и постпечатной обработки. Наши клиенты - это компании разных масштабов, от небольших стартапов до крупных корпораций.</p>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto 48px', padding: '0 16px' }}>
        <h2 style={{ color: '#1976d2', marginBottom: 32, fontSize: '1.8rem' }}>Наши преимущества</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '32px',
          textAlign: 'left'
        }}>
          {advantages.map((advantage, index) => (
            <div key={index} style={{ 
              background: '#fff',
              borderRadius: 12,
              padding: 24,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <div style={{ marginBottom: 16 }}>{advantage.icon}</div>
              <h3 style={{ 
                color: '#1976d2', 
                marginBottom: 12, 
                fontSize: '1.3rem',
                fontWeight: 600
              }}>{advantage.title}</h3>
              <p style={{ 
                color: '#666', 
                fontSize: '1rem',
                lineHeight: 1.6
              }}>{advantage.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ 
        maxWidth: 800, 
        margin: '0 auto', 
        padding: '32px 16px',
        background: '#e3f2fd',
        borderRadius: 12
      }}>
        <h2 style={{ color: '#1976d2', marginBottom: 24, fontSize: '1.8rem' }}>Почему выбирают нас</h2>
        <div style={{ textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 16 }}>
            <FaCheckCircle size={24} color="#2196f3" style={{ marginRight: 12, marginTop: 2 }} />
            <p style={{ color: '#333', fontSize: '1.1rem', lineHeight: 1.6 }}>
              Более 10 лет опыта в полиграфии и рекламной продукции
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 16 }}>
            <FaCheckCircle size={24} color="#2196f3" style={{ marginRight: 12, marginTop: 2 }} />
            <p style={{ color: '#333', fontSize: '1.1rem', lineHeight: 1.6 }}>
              Современное оборудование и технологии печати
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 16 }}>
            <FaCheckCircle size={24} color="#2196f3" style={{ marginRight: 12, marginTop: 2 }} />
            <p style={{ color: '#333', fontSize: '1.1rem', lineHeight: 1.6 }}>
              Широкий ассортимент материалов и форматов
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 16 }}>
            <FaCheckCircle size={24} color="#2196f3" style={{ marginRight: 12, marginTop: 2 }} />
            <p style={{ color: '#333', fontSize: '1.1rem', lineHeight: 1.6 }}>
              Оперативная обработка заказов и доставка
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <FaCheckCircle size={24} color="#2196f3" style={{ marginRight: 12, marginTop: 2 }} />
            <p style={{ color: '#333', fontSize: '1.1rem', lineHeight: 1.6 }}>
              Индивидуальный подход к каждому клиенту
            </p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 48, maxWidth: 800, padding: '0 16px' }}>
        <h2 style={{ color: '#1976d2', marginBottom: 24, fontSize: '1.8rem' }}>Наши контакты</h2>
        <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: 16 }}>
          Мы всегда на связи и готовы ответить на ваши вопросы. Вы можете связаться с нами любым удобным способом:
        </p>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '24px',
          marginTop: 32
        }}>
          <div>
            <h3 style={{ color: '#1976d2', marginBottom: 12, fontSize: '1.2rem' }}>Телефон</h3>
            <p style={{ color: '#666', fontSize: '1.1rem' }}>+7 (999) 123-45-67</p>
          </div>
          <div>
            <h3 style={{ color: '#1976d2', marginBottom: 12, fontSize: '1.2rem' }}>Email</h3>
            <p style={{ color: '#666', fontSize: '1.1rem' }}>info@kolibriya.ru</p>
          </div>
          <div>
            <h3 style={{ color: '#1976d2', marginBottom: 12, fontSize: '1.2rem' }}>Адрес</h3>
            <p style={{ color: '#666', fontSize: '1.1rem' }}>г. Москва, ул. Примерная, д. 1</p>
          </div>
          <div>
            <h3 style={{ color: '#1976d2', marginBottom: 12, fontSize: '1.2rem' }}>Режим работы</h3>
            <p style={{ color: '#666', fontSize: '1.1rem' }}>Пн-Пт: 9:00 - 18:00</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About; 