export const getFormattedPrice = (product) => {
  if (!product) {
    return 'Цену уточняйте';
  }

  let minCalculatedPrice = Infinity; // Будет хранить минимальную *цену за единицу*

  // 1. Рассматриваем basePrice в качестве отправной точки для минимума
  if (product.basePrice !== undefined && product.basePrice !== null && product.basePrice > 0) {
      minCalculatedPrice = Math.min(minCalculatedPrice, product.basePrice);
  }

  // 2. Обработка опций типа 'product-table' для поиска минимальной цены за единицу
  const tableOptionGroup = product.options?.find(opt => opt.type === 'product-table');
  if (tableOptionGroup && tableOptionGroup.tableData) {
    tableOptionGroup.tableData.rows.forEach(row => {
      tableOptionGroup.tableData.quantities.forEach((quantity, index) => {
        const price = row.prices[index];
        if (price !== null && price !== undefined && quantity > 0) {
          let unitOrTotalPrice = price;

          // Специальная обработка для товаров, где цена в таблице является общей за количество, а не за единицу.
          // Включаем Визитки (1), Листовки (2), Буклеты (3), Плакаты (7), Чертежи (8), Самокопирующиеся Бланки (16), 3D Стикеры (18), Кружки (19).
          if ([1, 2, 3, 7, 8, 16, 18, 19].includes(product.id)) {
                unitOrTotalPrice = price / quantity;
          }

          if (unitOrTotalPrice < minCalculatedPrice && unitOrTotalPrice > 0) { // Убедитесь, что цена положительная
            minCalculatedPrice = unitOrTotalPrice;
          }
        }
      });
    });
  }

  // 3. Обработка других опций (например, radio, checkbox), у которых есть priceModifier
  // Рассматриваем только, если цена еще не найдена, или basePrice равна нулю
  if (minCalculatedPrice === Infinity || product.basePrice === 0) {
    product.options?.forEach(optionGroup => {
      if (optionGroup.choices) {
        optionGroup.choices.forEach(choice => {
          if (choice.priceModifier !== undefined && choice.priceModifier !== null && choice.priceModifier > 0) {
            minCalculatedPrice = Math.min(minCalculatedPrice, choice.priceModifier);
          }
        });
      }
    });
  }

  // 4. Запасной вариант: цена из описания, если явная цена не найдена
  if (minCalculatedPrice === Infinity && product.description) {
    const unitPriceInDescriptionMatch = product.description.match(/от (\d+\.?\d*) ₽ за шт\./);
    if (unitPriceInDescriptionMatch) {
      const priceValue = parseFloat(unitPriceInDescriptionMatch[1]);
      if (!isNaN(priceValue) && priceValue > 0) {
        minCalculatedPrice = Math.min(minCalculatedPrice, priceValue); // Берем, если это самая низкая цена
      }
    }
  }

  // Окончательное форматирование
  if (minCalculatedPrice !== Infinity && minCalculatedPrice > 0) {
    return `От ${minCalculatedPrice.toFixed(2)} ₽/шт`;
  } else if (product.basePrice !== undefined && product.basePrice !== null && product.basePrice > 0) {
      // Запасной вариант для продуктов с положительной basePrice, но без других специфичных цен за единицу
      return `От ${product.basePrice.toFixed(2)} ₽/шт`;
  }

  return 'Цену уточняйте';
}; 