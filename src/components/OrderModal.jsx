import React, { useState, useEffect } from 'react';

function OrderModal({ isOpen, onClose, product, prefilledDescription }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: prefilledDescription || '',
    files: [],
    comment: ''
  });

  // Use useEffect to update message when prefilledDescription changes (e.g., when new options are selected)
  useEffect(() => {
    setFormData(prev => ({ ...prev, message: prefilledDescription || '' }));
  }, [prefilledDescription]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('comment', formData.comment || '');
      formDataToSend.append('service', product ? product.name || product.title : 'Неизвестный продукт');
      
      formData.files.forEach((file) => {
        formDataToSend.append('files', file);
      });

      const response = await fetch('http://localhost:3001/api/quick-order', {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        alert('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
        onClose();
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: '',
          comment: '',
          files: []
        });
      } else {
        throw new Error('Ошибка при отправке заявки');
      }
    } catch (error) {
      alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.');
      console.error('Error:', error);
    }
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      files: Array.from(e.target.files)
    });
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '32px',
        width: '90%',
        maxWidth: '500px',
        position: 'relative',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#666',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#f5f5f5'}
          onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          ×
        </button>

        <h2 style={{
          margin: '0 0 24px',
          color: '#1976d2',
          fontSize: '1.8rem',
          fontWeight: 600
        }}>
          Заказать {product ? product.name || product.title : 'Продукт'}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#666',
              fontSize: '0.9rem'
            }}>
              Ваше имя *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                transition: 'border-color 0.3s'
              }}
              placeholder="Введите ваше имя"
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#666',
              fontSize: '0.9rem'
            }}>
              Телефон *
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                transition: 'border-color 0.3s'
              }}
              placeholder="Введите номер телефона"
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#666',
              fontSize: '0.9rem'
            }}>
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                transition: 'border-color 0.3s'
              }}
              placeholder="Введите email"
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#666',
              fontSize: '0.9rem'
            }}>
              Детали заказа
            </label>
            <textarea
              value={formData.message}
              readOnly
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                minHeight: '80px',
                resize: 'vertical',
                transition: 'border-color 0.3s',
                backgroundColor: '#f8f9fa',
                color: '#495057',
                fontFamily: 'monospace'
              }}
              placeholder="Детали заказа будут заполнены автоматически"
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#666',
              fontSize: '0.9rem'
            }}>
              Комментарий к заказу
            </label>
            <textarea
              value={formData.comment || ''}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                minHeight: '80px',
                resize: 'vertical',
                transition: 'border-color 0.3s'
              }}
              placeholder="Дополнительные пожелания или комментарии к заказу"
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#666',
              fontSize: '0.9rem'
            }}>
              Прикрепить файлы
            </label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                backgroundColor: '#f5f5f5'
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              background: '#2196f3',
              color: 'white',
              border: 'none',
              padding: '14px 20px',
              borderRadius: '8px',
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
              fontWeight: 600
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#1976d2'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#2196f3'}
          >
            Отправить заявку
          </button>
        </form>
      </div>
    </div>
  );
}

export default OrderModal; 