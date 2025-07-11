// Import images from souvenirs
import badgeImg from '../assets/services/souvenirs/badge.jpg';
import mugImg from '../assets/services/souvenirs/mug.jpg';
import tshirtImg from '../assets/services/souvenirs/tshirt.jpg';
import capImg from '../assets/services/souvenirs/cap.jpg';
import magnetImg from '../assets/services/souvenirs/magnet.jpg';
import bagImg from '../assets/services/souvenirs/bag.jpg';
import clockImg from '../assets/services/souvenirs/clock.jpg';
import penImg from '../assets/services/souvenirs/pen.jpg';
import umbrellaImg from '../assets/services/souvenirs/umbrella.jpg';

// Import images from polygraphy
import cardImg from '../assets/services/polygraphy/business-card.jpg';
import flyerImg from '../assets/services/polygraphy/flyer.jpg';
import bookImg from '../assets/services/polygraphy/book.jpg';
import calendarImg from '../assets/services/polygraphy/calendar.jpg';
import envelopeImg from '../assets/services/polygraphy/envelope.jpg';
import notebookImg from '../assets/services/polygraphy/notebook.jpg';
import bookletImg from '../assets/services/polygraphy/book.jpg';
import brochureImg from '../assets/services/polygraphy/brochure.jpg';
import posterImg from '../assets/services/polygraphy/flyer.jpg';
import drawingImg from '../assets/services/polygraphy/flyer.jpg';
import photoImg from '../assets/services/polygraphy/photo.jpg';
import stickerImgPoly from '../assets/services/polygraphy/sticker.jpg';
import labelImg from '../assets/services/polygraphy/label.jpg';
import plasticCardImg from '../assets/services/polygraphy/plastic-card.jpg';
import risographImg from '../assets/services/polygraphy/risograph.jpg';
import blankImg from '../assets/services/polygraphy/blank.jpg';
import carbonlessImg from '../assets/services/polygraphy/carbonless.jpg';

// Import utility for gallery images
import { getMainImage, getGalleryImages, hasImages } from '../utils/imageLoader';

// Placeholder image for products without specific images
export const stubImage = 'https://via.placeholder.com/300x200?text=Изображение+в+разработке';

export const products = [
  // From Home.jsx (with updated quantity names for better readability)
  {
    id: 1,
    name: 'Визитки',
    image: hasImages(1) ? getMainImage(1) : cardImg,
    carouselImages: hasImages(1) ? [getMainImage(1), ...getGalleryImages(1)] : [cardImg, cardImg],
    description: 'Печать визиток любых форматов, материалов и тиражей. Офсет, цифра, дизайнерские, пластиковые, металлические.',
    basePrice: 0, // Базовая цена теперь будет 0, вся цена из таблицы
    options: [
      {
        name: 'Тип бумаги и тираж',
        type: 'product-table', // Новый тип для рендеринга таблицы
        tableData: {
          quantities: [100, 200, 300, 400, 500, 1000, 2000, 3000, 5000],
          rows: [
            { name: 'Глянец 330 гр', displayRowName: 'Глянец', prices: [4.0000, 4.0000, 3.7000, 3.5000, 3.4000, null, null, null, null] },
            { name: 'Мелованная 300 гр', displayRowName: 'Мелованная', prices: [5.0000, 4.5000, 4.0000, 3.7500, 3.6000, null, null, null, null] },
            { name: 'Дизайнерская бумага (золото, серебро, бронза, лён)', displayRowName: 'Дизайнерская', prices: [8.0000, 8.0000, 7.5000, 7.0000, 6.5000, null, null, null, null] },
            { name: 'Картон 300 гр + лак', displayRowName: 'Картон + лак', prices: [null, null, null, null, null, 2.3000, 1.8000, 1.8000, 1.7000] }
          ]
        }
      },
      {
        name: 'Дополнительные опции',
        type: 'checkbox',
        choices: [
          { label: '+2 сторона (+1.0 руб/штука)', value: 'double-sided', priceModifier: 1.0 },
          { label: '+ламинация (+3.0 руб/шт)', value: 'lamination', priceModifier: 3.0 }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Листовки',
    image: hasImages(2) ? getMainImage(2) : flyerImg,
    carouselImages: hasImages(2) ? [getMainImage(2), ...getGalleryImages(2)] : [flyerImg, flyerImg],
    description: 'Цветные и черно-белые листовки любых форматов. Оперативная печать, разные виды бумаги.',
    basePrice: 0, // Базовая цена теперь будет 0, вся цена из таблицы
    options: [
      {
        name: 'Формат и тираж',
        type: 'product-table', // Новый тип для рендеринга таблицы
        tableData: {
          quantities: [100, 500, 1000, 2000, 3000, 5000, 6000, 7000, 10000],
          rows: [
            { name: 'Листовка (А6)', displayRowName: '(А6)', prices: [9.3200, 6.7040, 3.9520, 2.3240, 1.7733, 1.2920, 1.1667, 1.0686, 0.8920] },
            { name: 'Листовка (А5)', displayRowName: '(А5)', prices: [17.8100, 7.1840, 4.1680, 2.6480, 2.1453, 1.7480, 1.6427, 1.5709, 1.4440] },
            { name: 'Листовка (А4)', displayRowName: '(А4)', prices: [27.5900, 10.4000, 6.3160, 4.2680, 3.5853, 3.0440, 2.9147, 2.8069, 2.7496] },
            { name: 'Евро, 99х210', displayRowName: 'Евро, 99х210', prices: [12.1000, 5.5280, 3.3600, 1.9760, 1.5813, 1.2680, 1.1867, 1.1269, 1.0240] }
          ]
        }
      },
      {
        name: 'Материал и цветность печати',
        type: 'radio',
        choices: [
          { label: '105 г/м² бумага мел.', value: '105_gsm_coated', priceModifier: 0 },
          { label: 'Мелованный картон 130гр', value: 'karton_130', priceModifier: (quantity, selectedOptions) => {
            // Определяем формат
            let format = null;
            if (selectedOptions && selectedOptions['Формат и тираж'] && selectedOptions['Формат и тираж'].label) {
              if (selectedOptions['Формат и тираж'].label.includes('А4')) format = 'A4';
              else if (selectedOptions['Формат и тираж'].label.includes('А5')) format = 'A5';
              else if (selectedOptions['Формат и тираж'].label.includes('А6')) format = 'A6';
            }
            let base = 0;
            if (quantity < 500) base = 2;
            else if (quantity >= 500 && quantity < 1000) base = 1;
            else if (quantity >= 1000 && quantity < 3000) base = 0.5;
            else if (quantity >= 3000) base = 0.25;
            if (format === 'A4') return base;
            if (format === 'A5') return base * 0.5;
            if (format === 'A6') return base * 0.25;
            return 0;
          } }
        ]
      }
    ]
  },
  {
    id: 3,
    name: 'Буклеты',
    image: hasImages(3) ? getMainImage(3) : bookImg,
    carouselImages: hasImages(3) ? [getMainImage(3), ...getGalleryImages(3)] : [bookImg, bookImg],
    description: 'Буклеты, каталоги, рекламные материалы. Складывание, фальцовка, любые форматы.',
    basePrice: 0,
    options: [
      {
        name: 'Формат, плотность и тираж',
        type: 'product-table',
        tableData: {
          quantities: [100, 200, 500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000],
          rows: [
            { name: 'A4, 105 г/м² бумага мел.', prices: [38.49, 20.67, 8.71, 4.75, 3.14, 2.65, 2.46, 2.24, 2.17, 2.38, 2.17, 2.15, 2.35] },
            { name: 'A4, 130 г/м² бумага мел.', prices: [42.07, 22.59, 9.52, 5.20, 3.43, 2.89, 2.69, 2.45, 2.37, 2.31, 2.37, 2.35, 2.51] }
          ]
        }
      }
    ]
  },
  {
    id: 4,
    name: 'Блокноты',
    image: hasImages(4) ? getMainImage(4) : notebookImg,
    carouselImages: hasImages(4) ? [getMainImage(4), ...getGalleryImages(4)] : [notebookImg, notebookImg],
    description: 'Блокноты: Обложка 330 гр глянец, Блок 80гр, металлическая пружина. Печать блокнотов с фирменной символикой. Разные форматы и типы бумаги.',
    basePrice: 0,
    options: [
      {
        name: 'Формат и тираж',
        type: 'product-table',
        tableData: {
          quantities: [50, 100, 300],
          rows: [
            { name: 'А5 формат, 50 листов', prices: [90, 80, 75] },
            { name: 'А6 формат, 36 листов', prices: [50, 40, 35] }
          ]
        }
      },
      {
        name: 'Дополнительные опции',
        type: 'checkbox',
        choices: [
          { label: 'Брендированная задняя обложка (А5) (+15 руб)', value: 'branded_back_a5', priceModifier: 15 },
          { label: 'Брендированная задняя обложка (А6) (+10 руб)', value: 'branded_back_a6', priceModifier: 10 },
          { label: 'Ламинированная обложка (А5) (+15 руб)', value: 'laminated_cover_a5', priceModifier: 15 },
          { label: 'Ламинированная обложка (А6) (+10 руб)', value: 'laminated_cover_a6', priceModifier: 10 },
          { label: 'Блок с печатью 1+0 (А5) (+60 руб)', value: 'printed_block_a5', priceModifier: 60 },
          { label: 'Блок с печатью 1+0 (А6) (+40 руб)', value: 'printed_block_a6', priceModifier: 40 },
          { label: 'Индивидуальная упаковка в пакетик (+17 руб)', value: 'individual_packaging', priceModifier: 17 }
        ]
      }
    ]
  },
  {
    id: 5,
    name: 'Конверты',
    image: hasImages(5) ? getMainImage(5) : envelopeImg,
    carouselImages: hasImages(5) ? [getMainImage(5), ...getGalleryImages(5)] : [envelopeImg, envelopeImg],
    description: 'Печать на конвертах разных форматов. От простых до дизайнерских.',
    basePrice: 0,
    options: [
      {
        name: 'Тираж/стоимость, руб.',
        type: 'product-table',
        tableData: {
          quantities: [1, 100, 300],
          rows: [
            { name: 'Конверт EWRO (200x110 мм)', prices: [20, 14, 11] },
            { name: 'C5 (162x229 мм)', prices: [21, 15, 12] },
            { name: 'C4 (229x324)', prices: [25, 17, 14] }
          ]
        }
      }
    ]
  },
  {
    id: 6,
    name: 'Брошюры',
    image: hasImages(6) ? getMainImage(6) : brochureImg,
    carouselImages: hasImages(6) ? [getMainImage(6), ...getGalleryImages(6)] : [brochureImg, brochureImg],
    description: 'Брошюры для акций, рекламы, событий. Ярко, быстро, недорого. от 1.4 ₽ за шт.',
    basePrice: 140,
    options: [
      { name: 'Плотность бумаги', type: 'radio', choices: [{ label: '130г', value: '130', priceModifier: 0 }, { label: '170г', value: '170', priceModifier: 50 }] }
    ]
  },
  {
    id: 7,
    name: 'Плакаты',
    image: hasImages(7) ? getMainImage(7) : posterImg,
    carouselImages: hasImages(7) ? [getMainImage(7), ...getGalleryImages(7)] : [posterImg, posterImg],
    description: 'Печать плакатов и афиш для мероприятий, рекламы, объявлений.',
    basePrice: 0,
    options: [
      {
        name: 'Формат и тираж',
        type: 'product-table',
        tableData: {
          quantities: [1, 50, 100],
          rows: [
            { name: 'A3', prices: [130, 80, 70] },
            { name: 'A2', prices: [350, 140, 95] },
            { name: 'A1', prices: [480, 190, 125] }
          ]
        }
      }
    ]
  },
  {
    id: 8,
    name: 'Чертежи',
    image: hasImages(8) ? getMainImage(8) : drawingImg,
    carouselImages: hasImages(8) ? [getMainImage(8), ...getGalleryImages(8)] : [drawingImg, drawingImg],
    description: 'Печать чертежей любых форматов. Оперативная печать, разные виды бумаги.',
    basePrice: 0,
    options: [
      {
        name: 'Формат и цветность',
        type: 'product-table',
        tableData: {
          quantities: [1, 50, 100],
          rows: [
            { name: 'A3 ч/б', prices: [30, 25, 20] },
            { name: 'A3 цвет', prices: [40, 35, 25] },
            { name: 'A2 ч/б', prices: [130, 115, 100] },
            { name: 'A2 цвет', prices: [160, 140, 130] },
            { name: 'A1 ч/б', prices: [170, 155, 140] },
            { name: 'A1 цвет', prices: [220, 200, 190] }
          ]
        }
      }
    ]
  },
  {
    id: 9,
    name: 'Печать Фото',
    image: hasImages(9) ? getMainImage(9) : photoImg,
    carouselImages: hasImages(9) ? [getMainImage(9), ...getGalleryImages(9)] : [photoImg, photoImg],
    description: 'Печать фотографий любых размеров. Высокое качество, яркие цвета.',
    basePrice: 0,
    options: [
      {
        name: 'Тираж/Формат',
        type: 'product-table',
        tableData: {
          quantities: [1, 10, 50, 100, 200],
          rows: [
            { name: '10*15', prices: [15, 12, 10, 9, 9] },
            { name: '15*21', prices: [30, 25, 21, 19, 19] },
            { name: '20*30', prices: [60, 50, 45, 40, 35] },
            { name: '30*42', prices: [130, 100, 85, 80, 70] },
            { name: 'A2', prices: [350, 140, 140, 95, 95] },
            { name: 'A1', prices: [480, 190, 190, 125, 125] }
          ]
        }
      }
    ]
  },
  {
    id: 10,
    name: 'Календари',
    image: hasImages(10) ? getMainImage(10) : calendarImg,
    carouselImages: hasImages(10) ? [getMainImage(10), ...getGalleryImages(10)] : [calendarImg, calendarImg],
    description: 'Печать календарей разных типов. Настенные, настольные, карманные. от 3.0 ₽ за шт.',
    basePrice: 300,
    options: [
      { name: 'Тип', type: 'radio', choices: [{ label: 'Настенный', value: 'wall', priceModifier: 0 }, { label: 'Настольный', value: 'desk', priceModifier: 100 }] }
    ]
  },
  {
    id: 11,
    name: 'Наклейки и Стикеры',
    image: hasImages(11) ? getMainImage(11) : labelImg,
    carouselImages: hasImages(11) ? [getMainImage(11), ...getGalleryImages(11)] : [labelImg, labelImg],
    description: 'Изготовление наклеек и стикеров любых форм и размеров. Цена от 2400 ₽ за м².',
    basePrice: 0,
    pricePerSquareMeter: 2400,
    options: [
      {
        name: 'Выберите форму',
        type: 'radio',
        choices: [
          { label: 'Вашей формы', value: 'custom_shape' },
          { label: 'Прямоугольные', value: 'rectangle' },
          { label: 'Круглые', value: 'circle' },
          { label: 'Овальные', value: 'oval' },
          { label: 'Стикерпак', value: 'sticker_pack' }
        ]
      },
      {
        name: 'Размер (Прямоугольные)',
        type: 'radio',
        dependsOn: { option: 'Выберите форму', value: 'rectangle' },
        choices: [
          { label: '9 x 5 см', value: '9x5', width: 9, height: 5 },
          { label: '10 x 7 см', value: '10x7', width: 10, height: 7 },
          { label: '15 x 4.5 см', value: '15x4.5', width: 15, height: 4.5 },
          { label: '25 x 7.5 см', value: '25x7.5', width: 25, height: 7.5 },
          { label: 'Другой размер', value: 'other_size_rectangle' }
        ]
      },
      {
        name: 'Размер (Круглые)',
        type: 'radio',
        dependsOn: { option: 'Выберите форму', value: 'circle' },
        choices: [
          { label: '5 см', value: '5cm', diameter: 5 },
          { label: '9.5 см', value: '9.5cm', diameter: 9.5 },
          { label: '15 см', value: '15cm', diameter: 15 },
          { label: 'Другой размер', value: 'other_size_circle' }
        ]
      },
      {
        name: 'Ширина (см)',
        type: 'number-input',
        value: 5,
        min: 1,
        max: 100,
        dependsOnAny: [
          { option: 'Выберите форму', value: 'custom_shape' },
          { option: 'Размер (Прямоугольные)', value: 'other_size_rectangle' },
          { option: 'Размер (Овальные)', value: 'other_size_oval' }
        ]
      },
      {
        name: 'Высота (см)',
        type: 'number-input',
        value: 5,
        min: 1,
        max: 100,
        dependsOnAny: [
          { option: 'Выберите форму', value: 'custom_shape' },
          { option: 'Размер (Прямоугольные)', value: 'other_size_rectangle' },
          { option: 'Размер (Овальные)', value: 'other_size_oval' }
        ]
      },
      {
        name: 'Диаметр (см)',
        type: 'number-input',
        value: 5,
        min: 1,
        max: 100,
        dependsOn: { option: 'Размер (Круглые)', value: 'other_size_circle' }
      },
      {
        name: 'Тираж',
        type: 'quantity-input',
        pricePerUnit: 0,
        initialValue: 10,
        min: 1,
        max: 1000
      },
      {
        name: 'Материал',
        type: 'radio',
        choices: [
          { label: 'Бумага', value: 'paper', priceModifier: 0 },
          { label: 'Пленка', value: 'film', priceModifier: 0 },
          { label: 'Голографическая пленка', value: 'holographic_film', priceModifier: 0 }
        ]
      },
      {
        name: 'Ламинация',
        type: 'radio',
        choices: [
          { label: 'да', value: 'yes', priceModifier: 0 },
          { label: 'нет', value: 'no', priceModifier: 0 }
        ]
      }
    ]
  },
  {
    id: 13,
    name: 'Пластиковые Карты',
    image: hasImages(13) ? getMainImage(13) : plasticCardImg,
    carouselImages: hasImages(13) ? [getMainImage(13), ...getGalleryImages(13)] : [plasticCardImg, plasticCardImg],
    description: 'Изготовление пластиковых карт. Дисконтные, бонусные, членские. от 42.0 ₽ за шт.',
    basePrice: 0,
    options: [
      {
        name: 'Количество и Стороны',
        type: 'product-table',
        tableData: {
          quantities: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
          rows: [
            { name: '1 сторона', prices: [216.0, 126.0, 96.0, 81.0, 66.0, 60.0, 55.71, 52.50, 50.0, 42.0] },
            { name: '2 стороны', prices: [216.0, 126.0, 96.0, 81.0, 66.0, 60.0, 55.71, 52.50, 50.0, 42.0] }
          ]
        }
      },
      {
        name: 'Дополнительные опции',
        type: 'checkbox',
        choices: [
          { label: 'Нумерация (+2.0 руб/штука)', value: 'numeration', priceModifier: 2.0 },
          { label: 'Магнитная полоса (+0 руб/штука)', value: 'magnetic', priceModifier: 0 },
          { label: 'Штрих-код (+20 руб/штука)', value: 'barcode', priceModifier: 20 }
        ]
      }
    ]
  },
  {
    id: 14,
    name: 'Ризография',
    image: hasImages(14) ? getMainImage(14) : risographImg,
    carouselImages: hasImages(14) ? [getMainImage(14), ...getGalleryImages(14)] : [risographImg, risographImg],
    description: 'Оперативная печать на ризографе. Черно-белая печать больших тиражей. от 0.7 ₽ за шт.',
    basePrice: 70,
    options: [
      { name: 'Количество страниц', type: 'radio', choices: [{ label: '1', value: '1page', priceModifier: 0 }, { label: '2', value: '2pages', priceModifier: 30 }] }
    ]
  },
  {
    id: 15,
    name: 'Бланки',
    image: hasImages(15) ? getMainImage(15) : blankImg,
    carouselImages: hasImages(15) ? [getMainImage(15), ...getGalleryImages(15)] : [blankImg, blankImg],
    description: 'Печать фирменных бланков. Различные форматы и типы бумаги. от 0.5 ₽ за шт.',
    basePrice: 50,
    options: [
      { name: 'Тираж', type: 'radio', choices: [{ label: '100 шт.', value: '100', priceModifier: 0 }, { label: '500 шт.', value: '500', priceModifier: 100 }] }
    ]
  },
  {
    id: 16,
    name: 'Самокопирующиеся Бланки',
    image: hasImages(16) ? getMainImage(16) : carbonlessImg,
    carouselImages: hasImages(16) ? [getMainImage(16), ...getGalleryImages(16)] : [carbonlessImg, carbonlessImg],
    description: 'Профессиональные самокопирующиеся бланки. Разные форматы и количество слоев.',
    basePrice: 0,
    options: [
      {
        name: 'Формат бумаги и количество слоев',
        type: 'product-table',
        tableData: {
          quantities: [100, 250, 500, 1000],
          rows: [
            { name: 'А4, 2 слоя', prices: [24.4500, 16.0000, 14.7380, 13.6800] },
            { name: 'А4, 3 слоя', prices: [36.6700, 24.0000, 22.1060, 20.5200] },
            { name: 'А4, 4 слоя', prices: [48.8900, 32.0000, 29.4740, 27.3600] },
            { name: 'А5, 2 слоя', prices: [13.2200, 8.6000, 7.6680, 6.9400] },
            { name: 'А5, 3 слоя', prices: [19.3300, 12.6000, 11.3520, 10.4100] },
            { name: 'А5, 4 слоя', prices: [25.4500, 16.6000, 15.0380, 13.8300] },
            { name: 'А6, 2 слоя', prices: [7.1100, 4.8000, 4.0840, 3.6200] },
            { name: 'А6, 3 слоя', prices: [10.1700, 6.8000, 5.9260, 5.3300] },
            { name: 'А6, 4 слоя', prices: [13.2200, 8.8000, 7.7680, 7.0400] },
            { name: '1/3 А4, 2 слоя', prices: [9.1500, 5.9320, 5.2120, 4.7100] },
            { name: '1/3 А4, 3 слоя', prices: [13.2200, 8.6000, 7.6680, 6.9900] },
            { name: '1/3 А4, 4 слоя', prices: [17.3000, 11.2680, 10.1240, 9.2700] }
          ]
        }
      },
      {
        name: 'Нумерация',
        type: 'product-table',
        tableData: {
          quantities: [100, 250, 500, 1000],
          rows: [
            { name: 'Добавить нумерацию', prices: [3.0000, 1.5000, 1.0000, 1.0000] }
          ]
        }
      },
      {
        name: 'Склейка',
        type: 'product-table',
        tableData: {
          quantities: [100, 250, 500, 1000],
          rows: [
            { name: 'Склейка', prices: [1.0000, 1.0000, 1.0000, 1.0000] }
          ]
        }
      },
      {
        name: 'Количество макетов',
        type: 'quantity-input',
        pricePerUnit: 100,
        initialValue: 1
      }
    ]
  },
  // From Souvenirs.jsx
  {
    id: 17,
    name: 'Значки',
    image: hasImages(17) ? getMainImage(17) : badgeImg,
    carouselImages: hasImages(17) ? [getMainImage(17), ...getGalleryImages(17)] : [badgeImg, badgeImg],
    description: 'Изготовление значков на заказ. Различные размеры и крепления. от 10.0 ₽ за шт.',
    basePrice: 0,
    options: [
      {
        name: 'Размер и тип',
        type: 'product-table',
        tableData: {
          quantities: [1, 10, 35, 100, 500, 1000], // Adjusted quantities to match image
          rows: [
            { name: 'Значки 25 мм. Металл. Булавка', displayRowName: '25 мм. Булавка', prices: [75, 35, 30, 28, 25, 22] },
            { name: 'Значки 38 мм. Металл. Булавка', displayRowName: '38 мм. Булавка', prices: [75, 50, 34, 31, 28, 23] },
            { name: 'Значки квадратные 37x37 мм Металл. Булавка. (новинка!!!)', displayRowName: 'Кв. 37x37 мм. Булавка', prices: [100, 60, 45, 41, 35, 30] },
            { name: 'Значки 56мм. Металл. Булавка', displayRowName: '56мм. Булавка', prices: [100, 70, 45, 36, 30, 25] },
            { name: 'Значки 78 мм. Металл. Булавка.', displayRowName: '78 мм. Булавка', prices: [150, 100, 58, 45, 37, 33] },
            { name: 'Брелок закатной 37мм (новинка!!!)', displayRowName: 'Брелок 37мм', prices: [100, 70, 50, 45, 37, 33] },
            { name: 'Магнит закатной 37 мм (новинка!!!)', displayRowName: 'Магнит 37мм', prices: [100, 70, 50, 45, 37, 33] }
          ]
        }
      }
    ]
  },
  {
    id: 18,
    name: '3Д Стикеры',
    image: hasImages(18) ? getMainImage(18) : stubImage,
    carouselImages: hasImages(18) ? [getMainImage(18), ...getGalleryImages(18)] : [stubImage, stubImage],
    description: 'Объемные стикеры для вашего бренда. Яркие цвета и четкие детали.',
    basePrice: 0,
    options: [
      {
        name: 'Размер и количество',
        type: 'product-table',
        tableData: {
          quantities: [1, 5, 10, 30, 50, 100],
          rows: [
            { name: 'Прямоугольник размер 30x30 мм', displayRowName: 'Размер 30x30 мм', prices: [150, 375, 500, 1350, 2250, 4500] },
            { name: 'Прямоугольник размер 25x25 мм', displayRowName: 'Размер 25x25 мм', prices: [150, 375, 500, 1350, 2250, 4500] },
            { name: 'Прямоугольник размер 50x50 мм', displayRowName: 'Размер 50x50 мм', prices: [200, 500, 700, 1800, 3000, 6000] },
            { name: 'Круг размер 25 мм', prices: [150, 375, 500, 1350, 2250, 4500] },
            { name: 'Круг размер 30 мм', prices: [150, 375, 500, 1350, 2250, 4500] }
          ]
        }
      }
    ]
  },
  {
    id: 19,
    name: 'Кружка',
    image: hasImages(19) ? getMainImage(19) : mugImg,
    carouselImages: hasImages(19) ? [getMainImage(19), ...getGalleryImages(19)] : [mugImg, mugImg],
    description: 'Кружки с вашим логотипом. Разные цвета и материалы.',
    basePrice: 0,
    options: [
      {
        name: 'Тип и количество',
        type: 'product-table',
        tableData: {
          quantities: [1, 5, 10, 25, 50, 100, 200],
          rows: [
            { name: 'Белая кружка', prices: [480, 2300, 3600, 7250, 7500, 14000, 26000] }
          ]
        }
      },
      {
        name: 'Цветность',
        type: 'checkbox',
        choices: [
          { label: 'Цветная (+50 ₽/шт)', value: 'colored', priceModifier: 50 }
        ]
      },
      {
        name: 'Цвет',
        type: 'color-picker',
        dependsOn: {
          option: 'Цветность',
          value: 'colored'
        },
        choices: [
          { value: 'black', label: 'Черная', color: '#000000' },
          { value: 'pink', label: 'Розовая', color: '#FFC0CB' },
          { value: 'orange', label: 'Оранжевая', color: '#FFA500' },
          { value: 'light-green', label: 'Светло-зеленая', color: '#90EE90' },
          { value: 'dark-green', label: 'Темно-зеленая', color: '#006400' },
          { value: 'light-blue', label: 'Светло-синяя', color: '#ADD8E6' },
          { value: 'dark-blue', label: 'Темно-синяя', color: '#00008B' },
          { value: 'red', label: 'Красная', color: '#FF0000' },
          { value: 'yellow', label: 'Желтая', color: '#FFFF00' }
        ]
      }
    ]
  },
  {
    id: 20,
    name: 'Футболки',
    image: hasImages(20) ? getMainImage(20) : tshirtImg,
    carouselImages: hasImages(20) ? [getMainImage(20), ...getGalleryImages(20)] : [tshirtImg, tshirtImg],
    description: 'Печать на футболках с вашим дизайном. Разные размеры и цвета. от 60.0 ₽ за шт.',
    basePrice: 600,
    options: [
      { name: 'Размер', type: 'radio', choices: [{ label: 'S', value: 'S', priceModifier: 0 }, { label: 'M', value: 'M', priceModifier: 0 }] }
    ]
  },
  {
    id: 21,
    name: 'Бейсболки',
    image: hasImages(21) ? getMainImage(21) : capImg,
    carouselImages: hasImages(21) ? [getMainImage(21), ...getGalleryImages(21)] : [capImg, capImg],
    description: 'Бейсболки с вашим логотипом. Разные цвета. от 35.0 ₽ за шт.',
    basePrice: 350,
    options: [
      { name: 'Цвет', type: 'radio', choices: [{ label: 'Белая', value: 'white', priceModifier: 0 }, { label: 'Черная', value: 'black', priceModifier: 50 }] }
    ]
  },
  {
    id: 22,
    name: 'Магниты',
    image: hasImages(22) ? getMainImage(22) : magnetImg,
    carouselImages: hasImages(22) ? [getMainImage(22), ...getGalleryImages(22)] : [magnetImg, magnetImg],
    description: 'Магниты с вашим дизайном. Отличный сувенир. от 9.0 ₽ за шт.',
    basePrice: 90,
    options: [
      { name: 'Материал', type: 'radio', choices: [{ label: 'Винил', value: 'vinyl', priceModifier: 0 }, { label: 'Акрил', value: 'acrylic', priceModifier: 30 }] }
    ]
  },
  {
    id: 23,
    name: 'Брелоки',
    image: hasImages(18) ? getMainImage(18) : stubImage,
    carouselImages: hasImages(18) ? [getMainImage(18), ...getGalleryImages(18)] : [stubImage, stubImage],
    description: 'Брелоки с вашим логотипом. Различные формы и материалы. от 7.0 ₽ за шт.',
    basePrice: 70,
    options: [
      { name: 'Форма', type: 'radio', choices: [{ label: 'Прямоугольник', value: 'rect', priceModifier: 0 }, { label: 'Круг', value: 'circle', priceModifier: 0 }] }
    ]
  },
  {
    id: 24,
    name: 'Шильды',
    image: hasImages(18) ? getMainImage(18) : stubImage,
    carouselImages: hasImages(18) ? [getMainImage(18), ...getGalleryImages(18)] : [stubImage, stubImage],
    description: 'Шильды с вашим дизайном. Металлические, пластиковые. от 15.0 ₽ за шт.',
    basePrice: 150,
    options: [
      { name: 'Размер', type: 'radio', choices: [{ label: '20x30мм', value: '20x30', priceModifier: 0 }, { label: '30x50мм', value: '30x50', priceModifier: 50 }] }
    ]
  },
  {
    id: 25,
    name: 'Печать на металле',
    image: hasImages(18) ? getMainImage(18) : stubImage,
    carouselImages: hasImages(18) ? [getMainImage(18), ...getGalleryImages(18)] : [stubImage, stubImage],
    description: 'Печать на металле. Высокое качество изображения. от 30.0 ₽ за шт.',
    basePrice: 300,
    options: [
      { name: 'Толщина', type: 'radio', choices: [{ label: '0.5мм', value: '0.5', priceModifier: 0 }, { label: '1мм', value: '1', priceModifier: 100 }] }
    ]
  },
  {
    id: 26,
    name: 'Сумки',
    image: hasImages(26) ? getMainImage(26) : bagImg,
    carouselImages: hasImages(26) ? [getMainImage(26), ...getGalleryImages(26)] : [bagImg, bagImg],
    description: 'Сумки с вашим логотипом. Эко-сумки, шопперы. от 25.0 ₽ за шт.',
    basePrice: 250,
    options: [
      { name: 'Тип', type: 'radio', choices: [{ label: 'Эко-сумка', value: 'eco', priceModifier: 0 }, { label: 'Шоппер', value: 'shopper', priceModifier: 80 }] }
    ]
  },
  {
    id: 27,
    name: 'Рюкзаки',
    image: hasImages(26) ? getMainImage(26) : bagImg,
    carouselImages: hasImages(26) ? [getMainImage(26), ...getGalleryImages(26)] : [bagImg, bagImg],
    description: 'Рюкзаки с вашим логотипом. Различные объемы. от 50.0 ₽ за шт.',
    basePrice: 500,
    options: [
      { name: 'Объем', type: 'radio', choices: [{ label: '10л', value: '10l', priceModifier: 0 }, { label: '20л', value: '20l', priceModifier: 150 }] }
    ]
  },
  {
    id: 28,
    name: 'Пазлы',
    image: hasImages(18) ? getMainImage(18) : stubImage,
    carouselImages: hasImages(18) ? [getMainImage(18), ...getGalleryImages(18)] : [stubImage, stubImage],
    description: 'Пазлы с вашим изображением. Разные размеры. от 20.0 ₽ за шт.',
    basePrice: 200,
    options: [
      { name: 'Размер', type: 'radio', choices: [{ label: 'A4', value: 'A4', priceModifier: 0 }, { label: 'A3', value: 'A3', priceModifier: 100 }] }
    ]
  },
  {
    id: 29,
    name: 'Коврики',
    image: hasImages(18) ? getMainImage(18) : stubImage,
    carouselImages: hasImages(18) ? [getMainImage(18), ...getGalleryImages(18)] : [stubImage, stubImage],
    description: 'Коврики для мыши с вашим дизайном. Игровые, офисные. от 15.0 ₽ за шт.',
    basePrice: 150,
    options: [
      { name: 'Тип', type: 'radio', choices: [{ label: 'Для мыши', value: 'mouse', priceModifier: 0 }, { label: 'Игровой', value: 'gaming', priceModifier: 100 }] }
    ]
  },
  {
    id: 30,
    name: 'Ленты',
    image: hasImages(18) ? getMainImage(18) : stubImage,
    carouselImages: hasImages(18) ? [getMainImage(18), ...getGalleryImages(18)] : [stubImage, stubImage],
    description: 'Ленты с печатью. Различная ширина. от 10.0 ₽ за шт.',
    basePrice: 100,
    options: [
      { name: 'Ширина', type: 'radio', choices: [{ label: '10мм', value: '10mm', priceModifier: 0 }, { label: '20мм', value: '20mm', priceModifier: 20 }] }
    ]
  },
  {
    id: 31,
    name: 'Флаги',
    image: hasImages(18) ? getMainImage(18) : stubImage,
    carouselImages: hasImages(18) ? [getMainImage(18), ...getGalleryImages(18)] : [stubImage, stubImage],
    description: 'Флаги с вашим дизайном. Разные размеры. от 40.0 ₽ за шт.',
    basePrice: 400,
    options: [
      { name: 'Размер', type: 'radio', choices: [{ label: 'Маленький', value: 'small', priceModifier: 0 }, { label: 'Большой', value: 'large', priceModifier: 200 }] }
    ]
  },
  // From Advert.jsx
  {
    id: 32,
    name: 'Баннеры',
    image: hasImages(18) ? getMainImage(18) : stubImage,
    carouselImages: hasImages(18) ? [getMainImage(18), ...getGalleryImages(18)] : [stubImage, stubImage],
    basePrice: 800,
    options: [
      { name: 'Размер', type: 'radio', choices: [{ label: '1x1м', value: '1x1', priceModifier: 0 }, { label: '2x3м', value: '2x3', priceModifier: 500 }] },
      { name: 'Материал', type: 'radio', choices: [{ label: 'Винил', value: 'vinyl', priceModifier: 0 }, { label: 'Ткань', value: 'fabric', priceModifier: 200 }] }
    ]
  },
  {
    id: 33,
    name: 'Стенды',
    image: hasImages(18) ? getMainImage(18) : stubImage,
    carouselImages: hasImages(18) ? [getMainImage(18), ...getGalleryImages(18)] : [stubImage, stubImage],
    basePrice: 1200,
    options: [
      { name: 'Тип', type: 'radio', choices: [{ label: 'Мобильный', value: 'mobile', priceModifier: 0 }, { label: 'Roll-up', value: 'rollup', priceModifier: 800 }] }
    ]
  },
  {
    id: 34,
    name: 'Таблички',
    image: hasImages(18) ? getMainImage(18) : stubImage,
    carouselImages: hasImages(18) ? [getMainImage(18), ...getGalleryImages(18)] : [stubImage, stubImage],
    basePrice: 400,
    options: [
      { name: 'Материал', type: 'radio', choices: [{ label: 'Пластик', value: 'plastic', priceModifier: 0 }, { label: 'Металл', value: 'metal', priceModifier: 300 }] }
    ]
  },
  {
    id: 35,
    name: 'Roll UP',
    image: hasImages(18) ? getMainImage(18) : stubImage,
    carouselImages: hasImages(18) ? [getMainImage(18), ...getGalleryImages(18)] : [stubImage, stubImage],
    basePrice: 2500,
    options: [
      { name: 'Ширина', type: 'radio', choices: [{ label: '80см', value: '80cm', priceModifier: 0 }, { label: '100см', value: '100cm', priceModifier: 500 }] }
    ]
  },
  {
    id: 36,
    name: 'Press Wall',
    image: hasImages(18) ? getMainImage(18) : stubImage,
    carouselImages: hasImages(18) ? [getMainImage(18), ...getGalleryImages(18)] : [stubImage, stubImage],
    basePrice: 3500,
    options: [
      { name: 'Размер', type: 'radio', choices: [{ label: '2x2м', value: '2x2', priceModifier: 0 }, { label: '3x2м', value: '3x2', priceModifier: 1000 }] }
    ]
  },
  {
    id: 37,
    name: 'Х-образные стойки',
    image: hasImages(18) ? getMainImage(18) : stubImage,
    carouselImages: hasImages(18) ? [getMainImage(18), ...getGalleryImages(18)] : [stubImage, stubImage],
    description: 'Профессиональные Х-образные стойки для рекламы. Разные размеры и материалы. от 180.0 ₽ за шт.',
    basePrice: 1800,
    options: [
      { name: 'Размер', type: 'radio', choices: [{ label: 'Маленький', value: 'small', priceModifier: 0 }, { label: 'Большой', value: 'large', priceModifier: 400 }] }
    ]
  },
  {
    id: 38,
    name: 'Таблички для оплаты',
    image: hasImages(18) ? getMainImage(18) : stubImage,
    carouselImages: hasImages(18) ? [getMainImage(18), ...getGalleryImages(18)] : [stubImage, stubImage],
    basePrice: 350,
    options: [
      { name: 'Размер', type: 'radio', choices: [{ label: 'A5', value: 'A5', priceModifier: 0 }, { label: 'A4', value: 'A4', priceModifier: 150 }] }
    ]
  },
  {
    id: 39,
    name: 'Адресные Таблички',
    image: hasImages(18) ? getMainImage(18) : stubImage,
    carouselImages: hasImages(18) ? [getMainImage(18), ...getGalleryImages(18)] : [stubImage, stubImage],
    basePrice: 500,
    options: [
      { name: 'Материал', type: 'radio', choices: [{ label: 'Пластик', value: 'plastic', priceModifier: 0 }, { label: 'Металл', value: 'metal', priceModifier: 400 }] }
    ]
  },
  {
    id: 40,
    name: 'Плоттерная Резка',
    image: hasImages(18) ? getMainImage(18) : stubImage,
    carouselImages: hasImages(18) ? [getMainImage(18), ...getGalleryImages(18)] : [stubImage, stubImage],
    basePrice: 600,
    options: [
      { name: 'Материал', type: 'radio', choices: [{ label: 'Пленка', value: 'film', priceModifier: 0 }, { label: 'Винил', value: 'vinyl', priceModifier: 100 }] }
    ]
  },
  // From Services.jsx
  {
    id: 41,
    name: 'Разработка макетов',
    image: hasImages(18) ? getMainImage(18) : stubImage,
    carouselImages: hasImages(18) ? [getMainImage(18), ...getGalleryImages(18)] : [stubImage, stubImage],
    basePrice: 500,
    options: [
      { name: 'Сложность', type: 'radio', choices: [{ label: 'Простой', value: 'simple', priceModifier: 0 }, { label: 'Средний', value: 'medium', priceModifier: 200 }] }
    ]
  },
  {
    id: 42,
    name: 'Ламинирование',
    image: hasImages(18) ? getMainImage(18) : stubImage,
    carouselImages: hasImages(18) ? [getMainImage(18), ...getGalleryImages(18)] : [stubImage, stubImage],
    basePrice: 100,
    options: [
      { name: 'Тип', type: 'radio', choices: [{ label: 'Глянцевое', value: 'glossy', priceModifier: 0 }, { label: 'Матовое', value: 'matte', priceModifier: 20 }] }
    ]
  },
  {
    id: 43,
    name: 'Брошюровка',
    image: hasImages(43) ? getMainImage(43) : bookImg,
    carouselImages: hasImages(43) ? [getMainImage(43), ...getGalleryImages(43)] : [bookImg, bookImg],
    basePrice: 200,
    options: [
      { name: 'Переплет', type: 'radio', choices: [{ label: 'Пластиковая пружина', value: 'plastic', priceModifier: 0 }, { label: 'Металлическая пружина', value: 'metal', priceModifier: 50 }] }
    ]
  },
  {
    id: 44,
    name: 'Степлирование',
    image: hasImages(18) ? getMainImage(18) : stubImage,
    carouselImages: hasImages(18) ? [getMainImage(18), ...getGalleryImages(18)] : [stubImage, stubImage],
    basePrice: 80,
    options: [
      { name: 'Количество листов', type: 'radio', choices: [{ label: 'До 50', value: '50', priceModifier: 0 }, { label: 'Более 50', value: '100', priceModifier: 20 }] }
    ]
  },
  {
    id: 45,
    name: 'Твердый Переплет',
    image: hasImages(43) ? getMainImage(43) : bookImg,
    carouselImages: hasImages(43) ? [getMainImage(43), ...getGalleryImages(43)] : [bookImg, bookImg],
    basePrice: 600,
    options: [
      { name: 'Цвет', type: 'radio', choices: [{ label: 'Синий', value: 'blue', priceModifier: 0 }, { label: 'Красный', value: 'red', priceModifier: 0 }] }
    ]
  },
  {
    id: 46,
    name: 'Изготовление Печатей',
    image: hasImages(18) ? getMainImage(18) : stubImage,
    carouselImages: hasImages(18) ? [getMainImage(18), ...getGalleryImages(18)] : [stubImage, stubImage],
    basePrice: 400,
    options: [
      { name: 'Тип', type: 'radio', choices: [{ label: 'Автоматическая', value: 'auto', priceModifier: 0 }, { label: 'Ручная', value: 'manual', priceModifier: -100 }] }
    ]
  },
  {
    id: 47,
    name: 'Брендирование',
    image: hasImages(18) ? getMainImage(18) : stubImage,
    carouselImages: hasImages(18) ? [getMainImage(18), ...getGalleryImages(18)] : [stubImage, stubImage],
    basePrice: 900,
    options: [
      { name: 'Масштаб', type: 'radio', choices: [{ label: 'Малый бизнес', value: 'small', priceModifier: 0 }, { label: 'Средний бизнес', value: 'medium', priceModifier: 500 }] }
    ]
  }
];