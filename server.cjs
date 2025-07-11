const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Multer для загрузки файла
const upload = multer({ dest: 'uploads/' });

// Тестовый маршрут для проверки работы сервера
app.get('/api/test', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Тестовый маршрут для отправки письма через Mail.ru
app.get('/api/test-email', async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.bk.ru',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER, // из .env
        pass: process.env.SMTP_PASS  // из .env
      },
      debug: true,
      logger: true
    });
    await transporter.verify();
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: 'Тестовое письмо с сайта типографии',
      text: 'Это тестовое письмо для проверки работы почтового сервера.',
      html: `
        <h1>Тестовое письмо</h1>
        <p>Это тестовое письмо для проверки работы почтового сервера.</p>
        <p>Если вы его получили, значит настройки корректны.</p>
        <p>Время отправки: ${new Date().toLocaleString()}</p>
      `
    };
    const info = await transporter.sendMail(mailOptions);
    console.log('Письмо отправлено:', info.messageId);
    res.json({ success: true, message: 'Тестовое письмо успешно отправлено', messageId: info.messageId });
  } catch (err) {
    console.error('Ошибка отправки:', err);
    res.status(500).json({ success: false, error: 'Ошибка отправки письма', details: err.message });
  }
});

// POST /api/quick-order
app.post('/api/quick-order', upload.any(), async (req, res) => {
  try {
    const { name, phone, email, message, comment, service } = req.body;
    const files = req.files || [];
    console.log('FILES:', files);
    console.log('BODY:', req.body);

    // Настройка транспорта (SMTP)
    const transporter = nodemailer.createTransport({
      host: 'smtp.bk.ru',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER, // из .env
        pass: process.env.SMTP_PASS  // из .env
      },
      debug: true,
      logger: true,
      tls: {
        rejectUnauthorized: false
      }
    });

    // Проверка подключения
    await transporter.verify();

    // Формируем письмо
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: service ? `Заказ: ${service}` : 'Новый заказ с сайта типографии',
      text: `Имя: ${name}\nТелефон: ${phone}\nEmail: ${email}\nСообщение: ${message}${comment ? '\nКомментарий: ' + comment : ''}${service ? '\nУслуга: ' + service : ''}`,
      html: `
        <h1>Новый заказ</h1>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Сообщение:</strong> ${message}</p>
        ${comment ? `<p><strong>Комментарий:</strong> ${comment}</p>` : ''}
        ${service ? `<p><strong>Услуга:</strong> ${service}</p>` : ''}
      `,
      attachments: files.map(f => ({
        filename: f.originalname,
        path: f.path
      }))
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Письмо отправлено:', info.messageId);
    res.json({ 
      success: true, 
      message: 'Письмо успешно отправлено',
      messageId: info.messageId
    });
  } catch (err) {
    console.error('Ошибка отправки:', err);
    res.status(500).json({ 
      success: false, 
      error: 'Ошибка отправки письма',
      details: err.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
}); 