import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp, FaTelegram } from 'react-icons/fa';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import './Contacts.css'; // Импортируем CSS для этой страницы

const contactInfo = {
  phone: '+7 (999) 123-45-67',
  whatsapp: '+7 (999) 123-45-67',
  telegram: '@kolibriya',
  email: 'info@kolibriya.ru',
  address: 'г. Москва, ул. Примерная, д. 1',
  workHours: 'Пн-Пт: 9:00 - 18:00',
  weekend: 'Сб-Вс: выходной'
};

function Contacts() {
  return (
    <div className="contacts-page-container">
      <div className="contacts-header">
        <h1 className="contacts-title">Наши контакты</h1>
        <p className="contacts-description">Мы всегда рады вашим вопросам и предложениям. Свяжитесь с нами удобным для вас способом или приходите в наш офис!</p>
      </div>

      <div className="contacts-content-wrapper">
        <div className="contacts-info-block">
          <div className="info-item">
            <i className="fas fa-map-marker-alt"></i>
            <p><strong>Адрес:</strong> г. Нижний Новгород, ул. Бусыгина, д. 19а, офисы 118 и 120</p>
          </div>
          <div className="info-item">
            <i className="fas fa-phone"></i>
            <p><strong>Телефоны:</strong> (831) 291-291-7, 415-11-45</p>
          </div>
          {/* Дополнительные контактные данные можно добавить здесь */}
        </div>

        <div className="contacts-map-block">
          <h2 className="map-title">Как к нам добраться</h2>
          <div className="map-container">
            <YMaps>
              <Map 
                defaultState={{ center: [56.265307, 43.892188], zoom: 17 }}
                width="100%"
                height="100%"
                modules={['control.ZoomControl', 'control.FullscreenControl']}
              >
                <Placemark 
                  geometry={[56.265307, 43.892188]}
                  options={{
                    preset: 'islands#redIcon',
                    iconColor: '#2563eb'
                  }}
                  properties={{
                    balloonContent: `
                      <div style='padding: 10px;'>
                        <h3 style='margin-bottom: 10px; font-weight: bold;'>ООО "Колибрия"</h3>
                        <p>г. Нижний Новгород, ул. Бусыгина, д. 19а</p>
                      </div>
                    `
                  }}
                />
              </Map>
            </YMaps>
          </div>
          <p className="map-description">Мы находимся в центре города, рядом с остановкой общественного транспорта. Есть парковка для автомобилей. Приходите к нам в гости!</p>
        </div>
      </div>
    </div>
  );
}

export default Contacts; 