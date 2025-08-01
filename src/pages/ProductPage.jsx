import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import OrderModal from '../components/OrderModal'; // Импортируем модальное окно
import ProductGallery from '../components/ProductGallery'; // Импортируем новый компонент галереи
import { products, stubImage } from '../data/products';
import './ProductPage.css'; // Импортируем CSS файл
import '../components/StickerCalculator.css'; // Импортируем CSS для калькулятора наклеек
import { getMainImage, hasImages } from '../utils/imageLoader';

// Новый компонент для калькулятора наклеек
function StickerCalculator({
  product,
  selectedOptions,
  handleOptionChange,
  generatePriceTableData,
  setTooltip,
  tooltip,
}) {
  const [stickerActiveStep, setStickerActiveStep] = useState(0); // 0: форма, 1: размер, 2: тираж, 3: материал
  const [prevStickerActiveStep, setPrevStickerActiveStep] = useState(null);
  const optionsRef = useRef(null);

  const STEPS = [
    'Выберите форму',
    'Размер',
    'Тираж',
    'Материал'
  ];

  const handleStickerOptionChange = (optionGroupName, value) => {
    let nextStep = stickerActiveStep;

    if (optionGroupName === 'Выберите форму') {
      nextStep = 1; // Всегда переходим к размеру после выбора формы
    } else if (optionGroupName === 'Размер (Прямоугольные)') {
      if (value !== 'other_size_rectangle') {
        nextStep = 2; // Переходим к тиражу, если выбран предопределенный прямоугольный размер
      }
      // Если выбрано 'other_size_rectangle', остаемся на шаге 1 для ввода пользовательских данных
    } else if (optionGroupName === 'Размер (Круглые)') {
      if (value !== 'other_size_circle') {
        nextStep = 2; // Переходим к тиражу, если выбран предопределенный круглый размер
      }
      // Если выбрано 'other_size_circle', остаемся на шаге 1 для ввода пользовательских данных
    } else if (['Ширина (см)', 'Высота (см)', 'Диаметр (см)'].includes(optionGroupName)) {
      // Логика для пользовательских полей ввода размера
      const updatedOptions = { ...selectedOptions, [optionGroupName]: parseFloat(value) };
      const selectedShape = updatedOptions['Выберите форму'];

      let canAdvance = false;
      if (selectedShape === 'custom_shape' || selectedShape === 'oval' || selectedShape === 'sticker_pack') {
        const width = parseFloat(updatedOptions['Ширина (см)']) || 0;
        const height = parseFloat(updatedOptions['Высота (см)']) || 0;
        if (width > 0 && height > 0) {
          canAdvance = true;
        }
      } else if (selectedShape === 'rectangle' && updatedOptions['Размер (Прямоугольные)'] === 'other_size_rectangle') {
        const width = parseFloat(updatedOptions['Ширина (см)']) || 0;
        const height = parseFloat(updatedOptions['Высота (см)']) || 0;
        if (width > 0 && height > 0) {
          canAdvance = true;
        }
      } else if (selectedShape === 'circle' && updatedOptions['Размер (Круглые)'] === 'other_size_circle') {
        const diameter = parseFloat(updatedOptions['Диаметр (см)']) || 0;
        if (diameter > 0) {
          canAdvance = true;
        }
      }

      if (canAdvance) {
        nextStep = 2; // Переходим к тиражу, если пользовательские поля ввода действительны
      }
      // Если не можем перейти, остаемся на текущем шаге
    } else if (optionGroupName === 'Тираж') {
      nextStep = 3; // Переходим к материалу после выбора тиража
    } else if (optionGroupName === 'Материал') {
      nextStep = 3; // Остаемся на этом шаге, так как это последний
    }

    if (nextStep !== stickerActiveStep) {
      setPrevStickerActiveStep(stickerActiveStep);
      setStickerActiveStep(nextStep);
    }

    // Вызываем оригинальный обработчик для обновления selectedOptions
    handleOptionChange(optionGroupName, value);
  };

  const goToPrevStep = () => {
    if (stickerActiveStep > 0) {
      setPrevStickerActiveStep(stickerActiveStep);
      setStickerActiveStep(stickerActiveStep - 1);
    }
  };

  const goToNextStep = () => {
    // Проверка условий для перехода на следующий шаг
    let canAdvance = true;

    if (stickerActiveStep === 1) { // Шаг "Размер"
      const selectedShape = selectedOptions['Выберите форму'];
      const currentWidth = parseFloat(selectedOptions['Ширина (см)']) || 0;
      const currentHeight = parseFloat(selectedOptions['Высота (см)']) || 0;
      const currentDiameter = parseFloat(selectedOptions['Диаметр (см)']) || 0;
      const selectedRectSize = selectedOptions['Размер (Прямоугольные)'];
      const selectedCircleSize = selectedOptions['Размер (Круглые)'];

      if (selectedShape === 'custom_shape' || selectedShape === 'oval' || selectedShape === 'sticker_pack') {
        if (currentWidth <= 0 || currentHeight <= 0) {
          canAdvance = false;
        }
      } else if (selectedShape === 'rectangle' && selectedRectSize === 'other_size_rectangle') {
        if (currentWidth <= 0 || currentHeight <= 0) {
          canAdvance = false;
        }
      } else if (selectedShape === 'circle' && selectedCircleSize === 'other_size_circle') {
        if (currentDiameter <= 0) {
          canAdvance = false;
        }
      } else if (!selectedRectSize && !selectedCircleSize) {
        // Если не выбран ни один из предопределенных размеров и не кастомный
        canAdvance = false;
      }
    }

    if (canAdvance && stickerActiveStep < STEPS.length - 1) {
      setPrevStickerActiveStep(stickerActiveStep);
      setStickerActiveStep(stickerActiveStep + 1);
    }
  };

  const currentProgress = ((stickerActiveStep + 1) / STEPS.length) * 100;

  // Дополнительная проверка для кнопки "Далее" (disabled state)
  const isNextButtonDisabled = () => {
    if (stickerActiveStep === STEPS.length - 1) { // На последнем шаге "Далее" всегда отключена
      return true;
    }

    if (stickerActiveStep === 1) { // Шаг "Размер"
      const selectedShape = selectedOptions['Выберите форму'];
      const currentWidth = parseFloat(selectedOptions['Ширина (см)']) || 0;
      const currentHeight = parseFloat(selectedOptions['Высота (см)']) || 0;
      const currentDiameter = parseFloat(selectedOptions['Диаметр (см)']) || 0;
      const selectedRectSize = selectedOptions['Размер (Прямоугольные)'];
      const selectedCircleSize = selectedOptions['Размер (Круглые)'];

      if (selectedShape === 'custom_shape' || selectedShape === 'oval' || selectedShape === 'sticker_pack') {
        return currentWidth <= 0 || currentHeight <= 0;
      } else if (selectedShape === 'rectangle' && selectedRectSize === 'other_size_rectangle') {
        return currentWidth <= 0 || currentHeight <= 0;
      } else if (selectedShape === 'circle' && selectedCircleSize === 'other_size_circle') {
        return currentDiameter <= 0;
      } else if ((selectedShape === 'rectangle' && !selectedRectSize) || (selectedShape === 'circle' && !selectedCircleSize)) {
        // Если выбрана форма, но не выбран конкретный размер (ни предопределенный, ни 'другой')
        return true;
      }
      // Если выбрана предопределенная форма и размер, или если на этом шаге нет полей ввода (что маловероятно для этого шага, но на всякий случай)
      return false;
    }

    // Для других шагов, если опция обязательна и не выбрана
    // (здесь можно добавить более сложную логику, если есть обязательные поля на других шагах)
    return false;
  };

  return (
    <div className="sticker-calculator-options-wrapper">
      {/* Прогресс-бар */}
      <div className="sticker-progress-bar">
        <div 
          className="sticker-progress-bar-fill" 
          style={{ width: `${currentProgress}%` }}
        />
      </div>

      {/* Шаг 1: Выберите форму */}
      {(() => {
        const optionGroup = product.options.find(opt => opt.name === 'Выберите форму');
        if (!optionGroup) return null;
        const selectedShape = selectedOptions['Выберите форму'];

        return (
          <div className={`sticker-calculator-option-group ${stickerActiveStep === 0 ? 'visible' : (prevStickerActiveStep === 0 && stickerActiveStep > 0) ? 'exit-left' : ''}`}>
            <h4 className="sticker-option-group-name">Выберите форму</h4>
            <div className="sticker-option-choices-grid">
              {optionGroup.choices.map(choice => (
                <button
                  key={choice.value}
                  className={`sticker-option-button ${selectedShape === choice.value ? 'active' : ''}`}
                  onClick={() => handleStickerOptionChange(optionGroup.name, choice.value)}
                >
                  <input type="radio" name={optionGroup.name} value={choice.value} checked={selectedShape === choice.value} onChange={() => {}} className="hidden-radio" />
                  <span className="sticker-radio-custom-icon"></span>
                  {choice.image && <img src={choice.image} alt={choice.label} className="sticker-option-thumbnail" />}
                  {choice.label}
                </button>
              ))}
            </div>
          </div>
        );
      })()}

      {/* Шаг 2: Размер */}
      {(() => {
        const selectedShape = selectedOptions['Выберите форму'];
        const selectedRectSize = selectedOptions['Размер (Прямоугольные)'];
        const selectedCircleSize = selectedOptions['Размер (Круглые)'];

        const isCustomShape = selectedShape === 'custom_shape';
        const isOtherRectSize = selectedShape === 'rectangle' && selectedRectSize === 'other_size_rectangle';
        const isOtherCircleSize = selectedShape === 'circle' && selectedCircleSize === 'other_size_circle';

        const widthOption = product.options.find(opt => opt.name === 'Ширина (см)');
        const heightOption = product.options.find(opt => opt.name === 'Высота (см)');
        const diameterOption = product.options.find(opt => opt.name === 'Диаметр (см)');

        const currentWidth = selectedOptions['Ширина (см)'] || '';
        const currentHeight = selectedOptions['Высота (см)'] || '';
        const currentDiameter = selectedOptions['Диаметр (см)'] || '';

        const isWidthInvalid = widthOption && (currentWidth < widthOption.min || currentWidth > widthOption.max) && currentWidth !== '';
        const isHeightInvalid = heightOption && (currentHeight < heightOption.min || currentHeight > heightOption.max) && currentHeight !== '';
        const isDiameterInvalid = diameterOption && (currentDiameter < diameterOption.min || currentDiameter > diameterOption.max) && currentDiameter !== '';

        if (!selectedShape) return null;

        return (
          <div className={`sticker-calculator-option-group ${stickerActiveStep === 1 ? 'visible' : (prevStickerActiveStep === 1 && stickerActiveStep !== 1) ? 'exit-left' : ''}`}>
            <h4 className="sticker-option-group-name">Размер <span className="question-mark">?</span></h4>
            <div className="sticker-option-choices-grid">
              {selectedShape === 'rectangle' && product.options.find(opt => opt.name === 'Размер (Прямоугольные)')?.choices.map(choice => (
                <button
                  key={choice.value}
                  className={`sticker-option-button ${selectedOptions['Размер (Прямоугольные)'] === choice.value ? 'active' : ''}`}
                  onClick={() => handleStickerOptionChange('Размер (Прямоугольные)', choice.value)}
                >
                  <input type="radio" name="Размер (Прямоугольные)" value={choice.value} checked={selectedOptions['Размер (Прямоугольные)'] === choice.value} onChange={() => {}} className="hidden-radio" />
                  <span className="sticker-radio-custom-icon"></span>
                  {choice.image && <img src={choice.image} alt={choice.label} className="sticker-option-thumbnail" />}
                  {choice.label}
                </button>
              ))}
              {selectedShape === 'circle' && product.options.find(opt => opt.name === 'Размер (Круглые)')?.choices.map(choice => (
                <button
                  key={choice.value}
                  className={`sticker-option-button ${selectedOptions['Размер (Круглые)'] === choice.value ? 'active' : ''}`}
                  onClick={() => handleStickerOptionChange('Размер (Круглые)', choice.value)}
                >
                  <input type="radio" name="Размер (Круглые)" value={choice.value} checked={selectedOptions['Размер (Круглые)'] === choice.value} onChange={() => {}} className="hidden-radio" />
                  <span className="sticker-radio-custom-icon"></span>
                  {choice.image && <img src={choice.image} alt={choice.label} className="sticker-option-thumbnail" />}
                  {choice.label}
                </button>
              ))}
            </div>
            {(isCustomShape || isOtherRectSize || selectedShape === 'oval' || selectedShape === 'sticker_pack') && (
              <div className="sticker-custom-size-input-row">
                <input
                  type="number"
                  min={widthOption?.min || 1}
                  max={widthOption?.max || 100}
                  step="0.1"
                  value={currentWidth}
                  onChange={(e) => handleStickerOptionChange('Ширина (см)', e.target.value)}
                  className={`sticker-number-input custom-size-input ${isWidthInvalid ? 'sticker-invalid-input' : ''}`}
                  placeholder="Ширина"
                  onMouseEnter={(e) => {
                      if (isWidthInvalid) {
                          setTooltip({ visible: true, content: `Мин. ширина ${widthOption?.min || 1} см, Макс. ширина ${widthOption?.max || 100} см`, x: e.clientX, y: e.clientY });
                      }
                  }}
                  onMouseLeave={() => setTooltip({ visible: false, content: '', x: 0, y: 0 })}
                />
                <span className="sticker-x-separator">x</span>
                <input
                  type="number"
                  min={heightOption?.min || 1}
                  max={heightOption?.max || 100}
                  step="0.1"
                  value={currentHeight}
                  onChange={(e) => handleStickerOptionChange('Высота (см)', e.target.value)}
                  className={`sticker-number-input custom-size-input ${isHeightInvalid ? 'sticker-invalid-input' : ''}`}
                  placeholder="Высота"
                  onMouseEnter={(e) => {
                      if (isHeightInvalid) {
                          setTooltip({ visible: true, content: `Мин. высота ${heightOption?.min || 1} см, Макс. высота ${heightOption?.max || 100} см`, x: e.clientX, y: e.clientY });
                      }
                  }}
                  onMouseLeave={() => setTooltip({ visible: false, content: '', x: 0, y: 0 })}
                />
                <span className="sticker-input-hint">* в сантиметрах</span>
              </div>
            )}
            {isOtherCircleSize && (
              <div className="sticker-custom-size-input-row">
                <input
                  type="number"
                  min={diameterOption?.min || 1}
                  max={diameterOption?.max || 100}
                  step="0.1"
                  value={currentDiameter}
                  onChange={(e) => handleStickerOptionChange('Диаметр (см)', e.target.value)}
                  className={`sticker-number-input custom-size-input full-width ${isDiameterInvalid ? 'sticker-invalid-input' : ''}`}
                  placeholder="Диаметр"
                  onMouseEnter={(e) => {
                      if (isDiameterInvalid) {
                          setTooltip({ visible: true, content: `Мин. диаметр ${diameterOption?.min || 1} см, Макс. диаметр ${diameterOption?.max || 100} см`, x: e.clientX, y: e.clientY });
                      }
                  }}
                  onMouseLeave={() => setTooltip({ visible: false, content: '', x: 0, y: 0 })}
                />
                <span className="sticker-input-hint">* в сантиметрах</span>
              </div>
            )}
          </div>
        );
      })()}

      {/* Шаг 3: Тираж */}
      {(() => {
        const optionGroup = product.options.find(opt => opt.name === 'Тираж');
        if (!optionGroup) return null;
        const priceTableData = generatePriceTableData();
        const selectedQuantity = selectedOptions['Тираж'] || optionGroup.initialValue || 10;

        return (
          <div className={`sticker-calculator-option-group ${stickerActiveStep === 2 ? 'visible' : (prevStickerActiveStep === 2 && stickerActiveStep !== 2) ? 'exit-left' : ''}`}>
            <h4 className="sticker-option-group-name">Тираж</h4>
            <div className="sticker-quantity-price-table">
              {priceTableData.map((item, index) => {
                const isSelected = selectedQuantity === item.quantity;
                return (
                  <button
                    key={index}
                    className={`sticker-quantity-button ${isSelected ? 'active' : ''}`}
                    onClick={() => handleStickerOptionChange(optionGroup.name, item.quantity)}
                  >
                    <input type="radio" name={optionGroup.name} value={item.quantity} checked={isSelected} onChange={() => {}} className="hidden-radio" />
                    <span className="sticker-radio-custom-icon"></span>
                    {item.quantity}
                    <span className="price">{Math.round(item.totalPrice)} ₽</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })()}

      {/* Шаг 4: Материал */}
      {(() => {
        const optionGroup = product.options.find(opt => opt.name === 'Материал');
        if (!optionGroup) return null;

        return (
          <div className={`sticker-calculator-option-group ${stickerActiveStep === 3 ? 'visible' : (prevStickerActiveStep === 3 && stickerActiveStep !== 3) ? 'exit-left' : ''}`}>
            <h4 className="sticker-option-group-name">Материал</h4>
            <div className="sticker-option-choices-grid">
              {optionGroup.choices.map(choice => (
                <button
                  key={choice.value}
                  className={`sticker-option-button ${selectedOptions[optionGroup.name] === choice.value ? 'active' : ''}`}
                  onClick={() => handleStickerOptionChange(optionGroup.name, choice.value)}
                >
                  <input type="radio" name={optionGroup.name} value={choice.value} checked={selectedOptions[optionGroup.name] === choice.value} onChange={() => {}} className="hidden-radio" />
                  <span className="sticker-radio-custom-icon"></span>
                  {choice.image && <img src={choice.image} alt={choice.label} className="sticker-option-thumbnail" />}
                  {choice.label}
                </button>
              ))}
            </div>
          </div>
        );
      })()}

      {/* Кнопки навигации */}
      <div className="sticker-navigation-buttons">
        <button 
          className="sticker-navigation-button prev" 
          onClick={goToPrevStep}
          disabled={stickerActiveStep === 0}
        >
          Назад
        </button>
        <button 
          className="sticker-navigation-button next" 
          onClick={goToNextStep}
          disabled={isNextButtonDisabled()}
        >
          Далее
        </button>
      </div>
    </div>
  );
}

export default function ProductPage() {
  const { id } = useParams();
  const location = useLocation();
  const productId = parseInt(id);
  
  // Проверка корректности ID
  if (isNaN(productId)) {
    return (
      <div style={{ 
        padding: '40px 20px',
        textAlign: 'center',
        fontSize: '18px',
        color: '#666'
      }}>
        Неверный идентификатор товара.
      </div>
    );
  }

  const product = products.find(p => p.id === productId);

  // Return error message if product not found
  if (!product) {
    console.error('Product not found for ID:', productId);
    return (
      <div style={{ 
        padding: '40px 20px',
        textAlign: 'center',
        fontSize: '18px',
        color: '#666'
      }}>
        Товар не найден. Пожалуйста, вернитесь в каталог.
      </div>
    );
  }

  const [selectedOptions, setSelectedOptions] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tooltip, setTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });

  useEffect(() => {
    if (product) {
      const initialOptions = {};
      const queryParams = new URLSearchParams(location.search);

      product.options.forEach(optionGroup => {
        const queryValue = queryParams.get(optionGroup.name);
        const queryQuantityTable = queryParams.get('quantity_table');

        if (optionGroup.type === 'product-table') {
          if (queryValue && queryQuantityTable) {
            let foundPrice = null;
            let foundRowName = null;
            let foundQuantity = null;

            for (const row of optionGroup.tableData.rows) {
              if (row.name === queryValue) {
                const quantityIndex = optionGroup.tableData.quantities.indexOf(parseInt(queryQuantityTable));
                if (quantityIndex !== -1 && row.prices[quantityIndex] !== null) {
                  foundPrice = row.prices[quantityIndex];
                  foundRowName = row.name;
                  foundQuantity = parseInt(queryQuantityTable);
                  break;
                }
              }
            }

            if (foundPrice !== null) {
              initialOptions[optionGroup.name] = { price: foundPrice, quantity: foundQuantity, label: `${foundRowName}, ${foundQuantity} шт.` };
            } else {
              initialOptions[optionGroup.name] = null;
            }
          } else {
            initialOptions[optionGroup.name] = null;
          }
        } else if (optionGroup.type === 'checkbox') {
          if (queryValue) {
            const matchedChoice = optionGroup.choices && optionGroup.choices.find(choice => choice.value === queryValue || choice.label === queryValue);
            if (matchedChoice) {
              initialOptions[optionGroup.name] = [matchedChoice.value];
            } else {
              initialOptions[optionGroup.name] = [];
            }
          } else {
            initialOptions[optionGroup.name] = [];
          }
        } else if (optionGroup.type === 'quantity-input') {
          if (queryValue) {
            initialOptions[optionGroup.name] = parseInt(queryValue);
          } else {
            initialOptions[optionGroup.name] = optionGroup.initialValue || 1;
          }
        } else if (optionGroup.type === 'number-input') {
          if (queryValue) {
            initialOptions[optionGroup.name] = parseFloat(queryValue);
          } else {
            initialOptions[optionGroup.name] = optionGroup.value || 0;
          }
        } else if (optionGroup.type === 'radio') {
          if (queryValue) {
            const choicesArray = Array.isArray(optionGroup.choices) ? optionGroup.choices : [];
            const matchedChoice = choicesArray.find(choice => choice.value === queryValue || choice.label === queryValue);
            if (matchedChoice) {
              initialOptions[optionGroup.name] = matchedChoice.value;
            } else {
              initialOptions[optionGroup.name] = null;
            }
          } else if (Array.isArray(optionGroup.choices) && optionGroup.choices.length > 0) {
            // Специальная инициализация для футболок
            if (product.id === 20 && optionGroup.name === 'Синтетика + хлопок') {
              initialOptions[optionGroup.name] = 'two_layer_white'; // Выбираем по умолчанию
            } else if (product.id === 20 && optionGroup.name === 'Размер принта') {
              initialOptions[optionGroup.name] = 'a4'; // А4 по умолчанию
            } else if (product.id === 20 && optionGroup.name === 'Печать на второй стороне') {
              initialOptions[optionGroup.name] = 'none'; // Нет по умолчанию
            } else {
              initialOptions[optionGroup.name] = null;
            }
          }
        } else if (optionGroup.type === 'color-picker') {
          if (queryValue) {
            const choicesArray = Array.isArray(optionGroup.choices) ? optionGroup.choices : [];
            const matchedChoice = choicesArray.find(choice => choice.value === queryValue || choice.hex === queryValue);
            if (matchedChoice) {
              initialOptions[optionGroup.name] = matchedChoice.value;
            } else {
              initialOptions[optionGroup.name] = null;
            }
          } else if (Array.isArray(optionGroup.choices) && optionGroup.choices.length > 0) {
            initialOptions[optionGroup.name] = null;
          }
        }
      });
      setSelectedOptions(initialOptions);
    }
  }, [product, location.search]);

  const handleOptionChange = (optionGroupName, value) => {
    setSelectedOptions(prevOptions => {
      const newOptions = { ...prevOptions };
      const optionGroup = product.options.find(opt => opt.name === optionGroupName);

      if (optionGroup.type === 'checkbox') {
        const currentValues = newOptions[optionGroupName] || [];
        if (currentValues.includes(value)) {
          newOptions[optionGroupName] = currentValues.filter(item => item !== value);
        } else {
          newOptions[optionGroupName] = [...currentValues, value];
        }
      } else if (optionGroup.type === 'product-table') {
        const currentSelection = prevOptions[optionGroupName];
        if (currentSelection && 
            currentSelection.rowIndex === value.rowIndex && 
            currentSelection.colIndex === value.colIndex) {
          newOptions[optionGroupName] = null; 
        } else {
          newOptions[optionGroupName] = value;

          if (product.id === 4 && optionGroupName === 'Формат и тираж') {
            const selectedFormatLabel = value.label;
            const currentAdditionalOptions = newOptions['Дополнительные опции'] || [];

            const filteredAdditionalOptions = currentAdditionalOptions.filter(optValue => {
              if (selectedFormatLabel.includes('А5') && optValue.includes('a6')) {
                return false;
              }
              if (selectedFormatLabel.includes('А6') && optValue.includes('a5')) {
                return false;
              }
              return true;
            });

            if (filteredAdditionalOptions.length !== currentAdditionalOptions.length) {
              newOptions['Дополнительные опции'] = filteredAdditionalOptions;
            }
          }
        }
      } else if (optionGroup.type === 'quantity-input') {
        newOptions[optionGroupName] = value;
      } else if (optionGroup.type === 'number-input') {
        newOptions[optionGroupName] = parseFloat(value);
      } else if (optionGroup.type === 'color-picker') {
        newOptions[optionGroupName] = value;

        if (product.id === 11) {
          if (optionGroupName === 'Выберите форму') {
            newOptions['Размер (Прямоугольные)'] = null;
            newOptions['Размер (Круглые)'] = null;
            newOptions['Ширина (см)'] = 0;
            newOptions['Высота (см)'] = 0;
            newOptions['Диаметр (см)'] = 0;
          } else if (optionGroupName === 'Размер (Прямоугольные)') {
            newOptions['Размер (Круглые)'] = null;
            newOptions['Диаметр (см)'] = 0;

            if (value === 'other_size_rectangle') {
              newOptions['Ширина (см)'] = product.options.find(opt => opt.name === 'Ширина (см)')?.value || 0;
              newOptions['Высота (см)'] = product.options.find(opt => opt.name === 'Высота (см)')?.value || 0;
            } else {
              newOptions['Ширина (см)'] = 0;
              newOptions['Высота (см)'] = 0;
            }
          } else if (optionGroupName === 'Размер (Круглые)') {
            newOptions['Размер (Прямоугольные)'] = null;
            newOptions['Ширина (см)'] = 0;
            newOptions['Высота (см)'] = 0;

            if (value === 'other_size_circle') {
              newOptions['Диаметр (см)'] = product.options.find(opt => opt.name === 'Диаметр (см)')?.value || 0;
            } else {
              newOptions['Диаметр (см)'] = 0;
            }
          }
        }
      } else {
        newOptions[optionGroupName] = value;
        
        // Специальная логика для футболок - сброс выбора из другой группы материалов
        if (product.id === 20 && ['Синтетика + хлопок', 'Цветной хлопок'].includes(optionGroupName)) {
          if (optionGroupName === 'Синтетика + хлопок') {
            newOptions['Цветной хлопок'] = null;
          } else if (optionGroupName === 'Цветной хлопок') {
            newOptions['Синтетика + хлопок'] = null;
          }
        }
      }

      return newOptions;
    });
  };

  const calculateTotalPrice = (quantityOverride = null) => {
    let currentPriceValue = 0; // Инициализируем 0
    let currentEffectiveQuantity = 1;

    if (!product) return 0;

    if (product.id === 11) {
      const quantity = quantityOverride !== null ? quantityOverride : (selectedOptions['Тираж'] || 0);
      
      // Простая таблица цен за штуку в зависимости от размера и тиража
      const priceTable = {
        '30x30': {
          '1': 150,
          '5': 75,
          '10': 50,
          '30': 45,
          '50': 45,
          '100': 45
        },
        '25x25': {
          '1': 150,
          '5': 75,
          '10': 50,
          '30': 45,
          '50': 45,
          '100': 45
        },
        '50x50': {
          '1': 200,
          '5': 100,
          '10': 70,
          '30': 60,
          '50': 60,
          '100': 60
        }
      };

      // Определяем размер
      let selectedSize = selectedOptions['Размер'] || '';
      
      // Определяем цену за штуку
      let pricePerPiece = 0;
      if (priceTable[selectedSize]) {
        // Находим подходящую цену по количеству
        const quantities = ['100', '50', '30', '10', '5', '1'];
        for (const qty of quantities) {
          if (quantity >= parseInt(qty)) {
            pricePerPiece = priceTable[selectedSize][qty];
            break;
          }
        }
      }

      // Считаем итоговую цену: цена за штуку * количество
      currentPriceValue = pricePerPiece * quantity;

      console.log('3D стикеры - расчет:', {
        размер: selectedSize,
        количество: quantity,
        ценаЗаШтуку: pricePerPiece,
        итоговаяЦена: currentPriceValue
      });
      return currentPriceValue;

    } else if (product.id === 20) {
      // Специальная логика для футболок (id: 20)
      const syntheticMaterialOption = selectedOptions['Синтетика + хлопок'];
      const cottonMaterialOption = selectedOptions['Цветной хлопок'];
      const quantityOption = selectedOptions['Количество'];
      const sizeOption = selectedOptions['Размер футболки'];
      const printSizeOption = selectedOptions['Размер принта'];
      const doubleSidedOption = selectedOptions['Печать на второй стороне'];
      
      // Определяем выбранный материал
      const materialOption = syntheticMaterialOption || cottonMaterialOption;
      
      if (!materialOption || !quantityOption) {
        return currentPriceValue;
      }

      currentEffectiveQuantity = quantityOption;
      
      let basePrice = 0;
      let baseMaterial = materialOption;
      let isColor = false;
      let isEvo = false;
      let isCotton230 = false;
      let isContract = false;

      // Двуслойная/Сэндвич (белый)
      if (baseMaterial === 'two_layer_white' || baseMaterial === 'evo_white') {
        if (quantityOption === 1) basePrice = 800;
        else if (quantityOption > 1 && quantityOption <= 5) basePrice = 700;
        else if (quantityOption > 5 && quantityOption <= 10) basePrice = 650;
        else if (quantityOption > 10 && quantityOption <= 30) basePrice = 600;
        else if (quantityOption > 30 && quantityOption <= 50) basePrice = 550;
        else if (quantityOption > 50 && quantityOption <= 100) basePrice = 500;
        else if (quantityOption > 100) basePrice = 480;
        if (baseMaterial === 'evo_white') {
          basePrice += 85;
          isEvo = true;
        }
      } else if (baseMaterial === 'cotton_165' || baseMaterial === 'cotton_230') {
        isColor = true;
        if (quantityOption === 1) basePrice = 1800;
        else if (quantityOption > 1 && quantityOption <= 5) basePrice = 1700;
        else if (quantityOption > 5 && quantityOption <= 10) basePrice = 1600;
        else if (quantityOption > 10 && quantityOption <= 20) basePrice = 1300;
        else if (quantityOption > 20) {
          isContract = true;
        }
        if (baseMaterial === 'cotton_230') {
          basePrice += 600;
          isCotton230 = true;
        }
      }

      if (isContract) {
        return 'Договорная';
      }

      console.log('Футболки - расчет базовой цены:', {
        baseMaterial,
        quantityOption,
        basePrice,
        isEvo,
        isColor,
        isCotton230
      });

      currentPriceValue = basePrice * quantityOption;

      // Доплата за А3 печать
      if (printSizeOption === 'a3') {
        if (isColor) {
          currentPriceValue += 250 * quantityOption;
        } else {
          currentPriceValue += 100 * quantityOption;
        }
      }

      // Доплата за печать на второй стороне
      if (doubleSidedOption && doubleSidedOption !== 'none') {
        if (doubleSidedOption === 'double_sided_a4') {
          if (isColor) {
            currentPriceValue += 250 * quantityOption;
          } else {
            currentPriceValue += 100 * quantityOption;
          }
        } else if (doubleSidedOption === 'double_sided_a3') {
          if (isColor) {
            currentPriceValue += 250 * quantityOption;
          } else {
            currentPriceValue += 200 * quantityOption;
          }
        }
      }

      // Доплата за размер выше 54
      if (sizeOption && sizeOption > 54) {
        currentPriceValue += 85 * quantityOption;
      }

      return currentPriceValue;

    } else {
      // Логика расчета цены для всех других продуктов
      const mainTableOption = product.options.find(opt => opt.type === 'product-table');
      const quantityInputOption = product.options.find(opt => opt.type === 'quantity-input' && opt.name === 'Количество макетов');

      if (mainTableOption && selectedOptions[mainTableOption.name]) {
        const selectedTableOption = selectedOptions[mainTableOption.name];
        if (selectedTableOption && typeof selectedTableOption === 'object') {
          currentEffectiveQuantity = selectedTableOption.quantity; 
          // Для кружек (id: 19) цена в таблице уже за весь тираж
          if (product.id === 19) {
            currentPriceValue = selectedTableOption.price;
          } else {
            // Для остальных товаров: цена за штуку * тираж
            currentPriceValue = selectedTableOption.price * selectedTableOption.quantity;
          }
        }
      } else if (quantityInputOption && selectedOptions[quantityInputOption.name] !== null && typeof selectedOptions[quantityInputOption.name] === 'number') {
        currentEffectiveQuantity = selectedOptions[quantityInputOption.name];
        if (!(product.id === 16 && quantityInputOption.name === 'Количество макетов' && currentEffectiveQuantity === 1)) {
            currentPriceValue = product.basePrice + (quantityInputOption.pricePerUnit * currentEffectiveQuantity);
        }
      } else { // Если нет ни табличных, ни quantity-input опций, используем базовую цену
        currentPriceValue = product.basePrice;
      }

      // Add additional options price modifiers
      if (product.options) {
        product.options.forEach(optionGroup => {
          // Пропускаем основную product-table (уже учтена выше)
          if (optionGroup.type === 'product-table' && optionGroup.name === mainTableOption?.name) {
            return;
          }
          // Для дополнительных product-table опций (например, нумерация, склейка)
          if (optionGroup.type === 'product-table') {
            const selectedTableOption = selectedOptions[optionGroup.name];
            if (selectedTableOption && typeof selectedTableOption === 'object') {
              // Для кружек (id: 19) не должно быть дополнительных product-table, но если появятся — аналогично
              if (product.id === 19) {
                currentPriceValue += selectedTableOption.price;
              } else {
                currentPriceValue += selectedTableOption.price * selectedTableOption.quantity;
              }
            }
          } else if (optionGroup.type === 'checkbox') {
            if (Array.isArray(selectedOptions[optionGroup.name])) {
              selectedOptions[optionGroup.name].forEach(selectedValue => {
                const selectedChoice = optionGroup.choices.find(choice => choice.value === selectedValue);
                if (selectedChoice && typeof selectedChoice.priceModifier === 'number') {
                  // Для кружек (id: 19) доп. опции умножаем на количество
                  if (product.id === 19) {
                    currentPriceValue += selectedChoice.priceModifier * currentEffectiveQuantity;
                  } else {
                  currentPriceValue += selectedChoice.priceModifier * currentEffectiveQuantity;
                  }
                }
              });
            }
          } else if (optionGroup.type === 'radio') {
            const selectedValue = selectedOptions[optionGroup.name];
            const selectedChoice = optionGroup.choices.find(choice => choice.value === selectedValue);
            if (selectedChoice) {
              let modifier = 0;
              if (typeof selectedChoice.priceModifier === 'function') {
                modifier = selectedChoice.priceModifier(currentEffectiveQuantity, selectedOptions);
              } else if (typeof selectedChoice.priceModifier === 'number') {
                modifier = selectedChoice.priceModifier;
              }
              currentPriceValue += modifier * currentEffectiveQuantity;
            }
          } else if (optionGroup.type === 'quantity-input') {
            const quantity = selectedOptions[optionGroup.name] || 0;
            if (quantity > 0) {
                currentPriceValue += (optionGroup.pricePerUnit || 0) * quantity;
            }
          } else if (optionGroup.type === 'number-input') {
             const value = selectedOptions[optionGroup.name] || 0;
             if (optionGroup.pricePerUnit && value > 0) {
                 currentPriceValue += optionGroup.pricePerUnit * value;
             }
          }
        });
      }
      return currentPriceValue;
    }
  };

  const getDiscountForQuantity = (quantity) => {
    if (quantity >= 1000) return 0.89; 
    if (quantity >= 500) return 0.63;
    if (quantity >= 300) return 0.53;
    if (quantity >= 200) return 0.46;
    if (quantity >= 100) return 0.36;
    if (quantity >= 50) return 0.27;
    if (quantity >= 10) return 0;
    return 0;
  };

  const generatePriceTableData = () => {
    const quantities = [10, 50, 100, 200, 300, 500, 1000];
    const data = [];

    quantities.forEach(qty => {
      const total = calculateTotalPrice(qty);
      const pricePerPiece = total / qty;
      const discountPercentage = getDiscountForQuantity(qty);

      data.push({
        quantity: qty,
        totalPrice: total,
        pricePerPiece: pricePerPiece,
        discount: discountPercentage * 100
      });
    });
    return data;
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!product) {
    return <div className="product-not-found"><h2>Продукт не найден</h2><p>Такой продукции нет в каталоге.</p></div>;
  }

  const currentPrice = calculateTotalPrice();

  const generatePrefilledDescription = () => {
    // Формат: Товар | Тираж | Опции | Итоговая цена
    let parts = [];
    parts.push(`${product.name || product.title}`);

    // Тираж
    let quantity = null;
    product.options.forEach(optionGroup => {
      if ((optionGroup.type === 'product-table' || optionGroup.type === 'quantity-input') && selectedOptions[optionGroup.name]) {
      const selected = selectedOptions[optionGroup.name];
        if (typeof selected === 'object' && selected.quantity) {
          quantity = selected.quantity;
        } else if (typeof selected === 'number') {
          quantity = selected;
        }
      }
    });
    if (quantity) {
      parts.push(`${quantity} шт.`);
            }

    // Опции
    let optionsArr = [];
    product.options.forEach(optionGroup => {
      const selected = selectedOptions[optionGroup.name];
      if (optionGroup.type === 'radio' && selected !== null) {
        const choice = (optionGroup.choices || []).find(c => c.value === selected);
        if (choice) optionsArr.push(`${optionGroup.name}: ${choice.label}`);
      } else if (optionGroup.type === 'color-picker' && selected !== null) {
        const choice = (optionGroup.choices || []).find(c => c.value === selected);
        if (choice) optionsArr.push(`${optionGroup.name}: ${choice.label}`);
      } else if (optionGroup.type === 'checkbox' && Array.isArray(selected) && selected.length > 0) {
          const selectedLabels = selected.map(value => {
          const choice = (optionGroup.choices || []).find(c => c.value === value);
            return choice ? choice.label : value;
          });
        optionsArr.push(`${optionGroup.name}: ${selectedLabels.join(', ')}`);
      } else if (optionGroup.type === 'product-table' && selected !== null && typeof selected === 'object') {
        optionsArr.push(`${optionGroup.name}: ${selected.label}`);
      } else if (optionGroup.type === 'quantity-input' && selected !== null && typeof selected === 'number') {
        // уже учтено выше
      } else if (optionGroup.type === 'number-input' && selected !== null && typeof selected === 'number') {
        optionsArr.push(`${optionGroup.name}: ${selected}`);
      }
    });
    if (optionsArr.length > 0) {
      parts.push(optionsArr.join(', '));
    }

    // Итоговая цена
    parts.push(`Итоговая цена: ${Math.round(currentPrice)} ₽`);
    return parts.join(' | ');
  };

  const prefilledDescription = generatePrefilledDescription();

  const mainBgImage = hasImages(product.id) ? getMainImage(product.id) : null;

  return (
    <div className="product-page-bg-wrapper">
      {mainBgImage && (
        <div
          className="product-page-bg-image"
          style={{ backgroundImage: `url(${mainBgImage})` }}
        />
      )}
      <div className={`product-page-container ${product.id === 16 ? 'self-copy-page' : ''}`}>
        {/* Левая колонка - Карусель изображений */}
        <ProductGallery 
          productId={product.id}
          fallbackImage={product.image}
          productName={product.name || product.title}
        />

        {/* Правая колонка - Информация о продукте и опции */}
        <div className="product-details-column">
          <h1 className="product-title">{product.name || product.title}</h1>

          <p className="product-description">{product.description}</p>

          {/* Блок опций */}
          <div className="product-options-section">
            {product.id === 11 ? (
              <StickerCalculator 
                product={product}
                selectedOptions={selectedOptions}
                handleOptionChange={handleOptionChange}
                generatePriceTableData={generatePriceTableData}
                setTooltip={setTooltip}
                tooltip={tooltip}
              />
            ) : (
              product.options.map((optionGroup, groupIndex) => {
              if (optionGroup.type === 'info') {
                return (
                  <div key={groupIndex} className="option-group">
                    <div className="info-message">
                      {optionGroup.text}
                    </div>
                  </div>
                );
              }
              if (optionGroup.type === 'product-table') {
                const selectedTableCell = selectedOptions[optionGroup.name];
                  const tableClassName = product.id === 16 ? 'product-table compact-quantities' : 'product-table';
                const shouldRenderTitle = !(['Нумерация', 'Склейка'].includes(optionGroup.name) && product.id === 16);
                const shouldApplyCompactMargin = product.id === 16 && (optionGroup.name === 'Нумерация' || optionGroup.name === 'Склейка');
                const priceTableContainerClassName = `price-table-container ${shouldApplyCompactMargin ? 'compact-margin-top' : ''}`;

                return (
                  <div key={groupIndex} className="option-group">
                    {shouldRenderTitle && (
                      <h4 className="option-group-name">{optionGroup.name}:</h4>
                    )}
                    <div className={priceTableContainerClassName}>
                      <table className={tableClassName}>
                        <thead>
                          <tr>
                            <th></th>
                            {optionGroup.tableData.quantities.map((quantity, index) => (
                              <th key={index}>{quantity} шт.</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {optionGroup.tableData.rows.map((row, rowIndex) => {
                            let rowClass = '';
                            if (product.id === 16) {
                              if (rowIndex >= 0 && rowIndex <= 2) {
                                rowClass = 'format-group-a4';
                              } else if (rowIndex === 3) {
                                rowClass = 'format-group-a4-third';
                              } else if (rowIndex >= 4 && rowIndex <= 6) {
                                rowClass = 'format-group-a5';
                              } else if (rowIndex >= 7 && rowIndex <= 9) {
                                rowClass = 'format-group-a6';
                              }
                            }

                            return (
                              <tr key={rowIndex} className={rowClass}>
                                <td
                                  className="table-row-name"
                                  onMouseEnter={(e) => setTooltip({ visible: true, content: row.name, x: e.clientX, y: e.clientY })}
                                  onMouseLeave={() => setTooltip({ visible: false, content: '', x: 0, y: 0 })}
                                >
                                  <span className="table-row-name-span">
                                    {row.image && <img src={row.image} alt={row.displayRowName || row.name} className="option-thumbnail" />}
                                    {row.displayRowName || row.name}
                                  </span>
                                </td>
                                {optionGroup.tableData.quantities.map((quantity, colIndex) => {
                                  // Защита: если нет значения, рендерим пустую ячейку
                                  const price = row.prices?.[colIndex] ?? null;
                                  const isUnavailable = price === null || price === undefined;
                                  const isSelected = selectedTableCell && 
                                    selectedTableCell.rowIndex === rowIndex && 
                                    selectedTableCell.colIndex === colIndex;
                                  
                                  return (
                                    <td key={colIndex} className={isSelected ? 'selected-cell' : ''}>
                                      {!isUnavailable && (
                                        <div 
                                          className={`price-cell ${isSelected ? 'selected' : ''}`}
                                          onClick={() => handleOptionChange(optionGroup.name, { price, quantity: optionGroup.tableData.quantities[colIndex], label: row.name, rowIndex, colIndex })}
                                          onMouseEnter={(e) => price !== null && setTooltip({ visible: true, content: `Цена: ${product.id === 18 || product.id === 19 ? (price / optionGroup.tableData.quantities[colIndex]).toFixed(2) : price.toFixed(2)}р`, x: e.clientX, y: e.clientY })}
                                          onMouseLeave={() => setTooltip({ visible: false, content: '', x: 0, y: 0 })}
                                        >
                                          {product.id === 17 ? 
                                                `${price.toFixed(2)}р` :
                                                product.id === 18 || product.id === 19 ?
                                                `${(price / optionGroup.tableData.quantities[colIndex]).toFixed(2)}р` :
                                                `${price.toFixed(2)}р`}
                                        </div>
                                      )}
                                    </td>
                                  );
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              } else if (optionGroup.type === 'checkbox') {
                const selectedTableOption = selectedOptions['Тип бумаги и тираж'];
                const isCardboardSelected = selectedTableOption && 
                  selectedTableOption.label && 
                  selectedTableOption.label.includes('Картон 300 гр + лак');

                return (
                  <div key={groupIndex} className="option-group">
                    <h4 className="option-group-name">{optionGroup.name}:</h4>
                      <div className="checkbox-options-grid">
                        {optionGroup.choices.map((choice, choiceIndex) => {
                          const isChecked = Array.isArray(selectedOptions[optionGroup.name]) &&
                                            selectedOptions[optionGroup.name].includes(choice.value);
                          let isDisabled = isCardboardSelected;

                          if (product.id === 4 && optionGroup.name === 'Дополнительные опции') {
                            const selectedFormatOption = selectedOptions['Формат и тираж'];
                            if (selectedFormatOption) {
                              const selectedFormatName = selectedFormatOption.label;
                              if (selectedFormatName.includes('А5') && choice.value.includes('a6')) {
                                isDisabled = true;
                              }
                              if (selectedFormatName.includes('А6') && choice.value.includes('a5')) {
                                isDisabled = true;
                              }
                            } else {
                              isDisabled = true;
                            }
                          }

                          return (
                            <label
                          key={choiceIndex}
                              className={`checkbox-label ${isDisabled ? 'disabled' : ''}`}
                              onMouseEnter={(e) => {
                                if (isDisabled) {
                                  setTooltip({ visible: true, content: 'Сначала выберите соответствующий формат А5 или А6.', x: e.clientX, y: e.clientY });
                                }
                              }}
                              onMouseLeave={() => setTooltip({ visible: false, content: '', x: 0, y: 0 })}
                            >
                              <input
                                type="checkbox"
                                value={choice.value}
                                checked={isChecked}
                                onChange={() => handleOptionChange(optionGroup.name, choice.value)}
                                disabled={isDisabled}
                              />
                          {choice.image && <img src={choice.image} alt={choice.label} className="option-thumbnail" />}
                          {choice.label}
                            </label>
                          );
                        })}
                    </div>
                  </div>
                );
              } else if (optionGroup.type === 'quantity-input') {
                const currentValue = selectedOptions[optionGroup.name] || optionGroup.initialValue || 1;
                return (
                  <div key={groupIndex} className="option-group">
                    <h4 className="option-group-name">{optionGroup.name}:</h4>
                  <input
                    type="number"
                        min={optionGroup.min || 1}
                        max={optionGroup.max}
                    value={currentValue}
                    onChange={(e) => {
                      let value = parseInt(e.target.value);
                          if (isNaN(value) || value < (optionGroup.min || 1)) {
                            value = optionGroup.min || 1;
                          } else if (value > (optionGroup.max || Infinity)) {
                            value = optionGroup.max || Infinity;
                      }
                      handleOptionChange(optionGroup.name, value);
                    }}
                    className="quantity-input"
                      />
                    </div>
                  );
              } else if (optionGroup.type === 'number-input') {
                  const currentValue = selectedOptions[optionGroup.name] || optionGroup.value || 0;
                  return (
                      <div key={groupIndex} className="option-group">
                          <h4 className="option-group-name">{optionGroup.name}:</h4>
                          <input
                              type="number"
                              min={optionGroup.min || 0}
                              max={optionGroup.max || Infinity}
                              step="0.1"
                              value={currentValue}
                              onChange={(e) => {
                                  let value = parseFloat(e.target.value);
                                  if (isNaN(value)) {
                                      value = 0;
                                  }
                                  handleOptionChange(optionGroup.name, value);
                              }}
                              className="number-input"
                  />
                </div>
              );
            } else if (optionGroup.type === 'color-picker') {
              const selectedColor = selectedOptions[optionGroup.name];
              const dependsOnOption = product.options.find(opt => opt.name === optionGroup.dependsOn.option);
              const selectedDependsOnValue = selectedOptions[dependsOnOption.name];

              if (dependsOnOption.type === 'checkbox' && selectedDependsOnValue && selectedDependsOnValue.includes(optionGroup.dependsOn.value)) {
                return (
                  <div key={optionGroup.name} className="option-group">
                    <label>{optionGroup.name}:</label>
                    <div className="color-picker-container">
                      {optionGroup.choices.map((choice) => (
                        <div
                          key={choice.value}
                          className={`color-swatch ${selectedOptions[optionGroup.name] === choice.value ? 'active' : ''}`}
                          style={{ backgroundColor: choice.color }}
                          onClick={() => handleOptionChange(optionGroup.name, choice.value)}
                          onMouseEnter={(e) => setTooltip({ visible: true, content: choice.label, x: e.clientX, y: e.clientY })}
                          onMouseLeave={() => setTooltip({ visible: false, content: '', x: 0, y: 0 })}
                        />
                      ))}
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            } else {
              // Специальная логика для футболок - убираем блокировку, оставляем только сброс выбора
              let isDisabled = false;

              return (
                <div key={groupIndex} className="option-group">
                  <h4 className="option-group-name">{optionGroup.name}:</h4>
                  <div className="option-choices">
                      {optionGroup.choices.map((choice, choiceIndex) => {
                        return (
                      <button
                        key={choiceIndex}
                        className={`option-button ${selectedOptions[optionGroup.name] === choice.value ? 'active' : ''}`}
                        onClick={() => handleOptionChange(optionGroup.name, choice.value)}
                        onMouseEnter={(e) => choice.description && setTooltip({ visible: true, content: choice.description, x: e.clientX, y: e.clientY })}
                        onMouseLeave={() => setTooltip({ visible: false, content: '', x: 0, y: 0 })}
                      >
                        {choice.image && <img src={choice.image} alt={choice.label} className="option-thumbnail" />}
                        {choice.label}
                      </button>
                        );
                      })}
                  </div>
                </div>
              );
            }
            })
          )}
        </div>

        {/* Блок "Заказать" */}
        <div className="product-actions">
          {product.id === 6 ? (
            <div className="total-price">от 240 ₽</div>
          ) : (
            <div className="total-price">{currentPrice} ₽</div>
          )}
          <button className="order-button" onClick={openModal}>Заказать</button>
        </div>
      </div>

      {/* Модальное окно для "Купить в 1 клик" */}
      <OrderModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        product={product} 
        selectedOptions={selectedOptions} 
        prefilledDescription={prefilledDescription} 
      />

      {tooltip.visible && (
        <div
          className="custom-tooltip"
          style={{ left: tooltip.x + 15, top: tooltip.y - 15 }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
    </div>
  );
}
