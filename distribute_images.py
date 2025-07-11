#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Скрипт для распределения картинок из папки Galereya по товарам
"""

import os
import shutil
import json
from pathlib import Path

# Карта соответствия между товарами и папками в Galereya
PRODUCT_TO_GALLERY_MAP = {
    # Полиграфия
    1: "Vizitki",           # Визитки
    2: "Listovki",          # Листовки
    3: "Buklety",           # Буклеты
    4: "Bloknoty",          # Блокноты
    5: "Konverty",          # Конверты
    6: "Broshyury",         # Брошюры
    7: "Plakaty",           # Плакаты
    8: "Chertezhi",         # Чертежи
    9: "PechatFoto",        # Печать Фото
    10: "Kalendari",        # Календари
    11: "NakleykiStikery",  # Наклейки и Стикеры
    13: "PlastikovyeKarty", # Пластиковые Карты
    14: "Rizografiya",      # Ризография
    15: "Blanki",           # Бланки
    16: "SamokopBlanki",    # Самокопирующиеся Бланки
    
    # Сувениры
    17: "Znachki",          # Значки
    18: "3DStikery",        # 3Д Стикеры
    19: "Kruzhka",          # Кружка
    20: "Futbolki",         # Футболки
    21: "Bejsbolki",        # Бейсболки
    22: "Magnity",          # Магниты
    23: "Breloki",          # Брелоки
    24: "Shildy",           # Шильды
    25: "PechatNaMetalle",  # Печать на металле
    26: "Sumki",            # Сумки
    27: "Ryukzaki",         # Рюкзаки
    28: "Pazly",            # Пазлы
    29: "Kovriki",          # Коврики
    30: "Lenty",            # Ленты
    31: "Flagi",            # Флаги
    
    # Реклама
    32: "Bannery",          # Баннеры
    33: "Stendy",           # Стенды
    34: "Tablichki",        # Таблички
    35: "RollUP",           # Roll UP
    36: "PressWall",        # Press Wall
    37: "HStoyki",          # Х-образные стойки
    38: "TablOplata",       # Таблички для оплаты
    39: "AdresTablichki",   # Адресные Таблички
    40: "PlotternayaRezka", # Плоттерная Резка
    
    # Услуги
    41: "RazrabMakety",     # Разработка макетов
    42: "Laminirovanie",    # Ламинирование
    43: "Broshyurovka",     # Брошюровка
    44: "Steplirovanie",    # Степлирование
    45: "TverdyjPereplet",  # Твердый Переплет
    46: "IzgotovleniePechatej", # Изготовление Печатей
    47: "Brendirovanie",    # Брендирование
}

def get_product_info():
    """Получает информацию о товарах из файла products.js"""
    products_file = "src/data/products.js"
    
    if not os.path.exists(products_file):
        print(f"Ошибка: Файл {products_file} не найден")
        return {}
    
    # Простое извлечение информации о товарах (без парсинга JS)
    products = {}
    current_id = None
    current_name = None
    
    with open(products_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    for line in lines:
        line = line.strip()
        if 'id:' in line:
            # Извлекаем ID
            try:
                current_id = int(line.split('id:')[1].split(',')[0].strip())
            except:
                continue
        elif 'name:' in line and current_id:
            # Извлекаем название
            try:
                current_name = line.split("'")[1] if "'" in line else line.split('"')[1]
                products[current_id] = current_name
                current_id = None
            except:
                continue
    
    return products

def distribute_images():
    """Распределяет картинки по товарам"""
    gallery_path = Path("Galereya")
    assets_path = Path("src/assets/gallery")
    
    if not gallery_path.exists():
        print("Ошибка: Папка Galereya не найдена")
        return
    
    # Создаем папку для галереи если её нет
    assets_path.mkdir(parents=True, exist_ok=True)
    
    products = get_product_info()
    
    print("Начинаем распределение картинок...")
    print(f"Найдено товаров: {len(products)}")
    
    for product_id, gallery_folder in PRODUCT_TO_GALLERY_MAP.items():
        if product_id not in products:
            print(f"Пропускаем товар {product_id} - не найден в products.js")
            continue
            
        product_name = products[product_id]
        source_folder = gallery_path / gallery_folder
        
        if not source_folder.exists():
            print(f"Пропускаем {product_name} (ID: {product_id}) - папка {gallery_folder} не найдена")
            continue
        
        # Создаем папку для товара
        product_folder = assets_path / f"product_{product_id}"
        product_folder.mkdir(exist_ok=True)
        
        # Копируем картинки
        image_files = list(source_folder.glob("*.jpg")) + list(source_folder.glob("*.jpeg")) + list(source_folder.glob("*.png"))
        
        if not image_files:
            print(f"Пропускаем {product_name} (ID: {product_id}) - нет картинок в папке {gallery_folder}")
            continue
        
        print(f"Обрабатываем {product_name} (ID: {product_id}): {len(image_files)} картинок")
        
        # Сортируем файлы по размеру (первый будет основным изображением)
        image_files.sort(key=lambda x: x.stat().st_size, reverse=True)
        
        for i, image_file in enumerate(image_files):
            # Создаем новое имя файла
            if i == 0:
                # Основное изображение
                new_name = f"main.jpg"
            else:
                # Дополнительные изображения для галереи
                new_name = f"gallery_{i}.jpg"
            
            dest_path = product_folder / new_name
            
            try:
                shutil.copy2(image_file, dest_path)
                print(f"  Скопирован: {image_file.name} -> {new_name}")
            except Exception as e:
                print(f"  Ошибка копирования {image_file.name}: {e}")
    
    print("\nРаспределение завершено!")
    print(f"Картинки сохранены в: {assets_path}")

def create_image_mapping():
    """Создает файл с маппингом изображений для использования в коде"""
    mapping = {}
    
    for product_id, gallery_folder in PRODUCT_TO_GALLERY_MAP.items():
        product_folder = f"product_{product_id}"
        mapping[product_id] = {
            "main": f"/src/assets/gallery/{product_folder}/main.jpg",
            "gallery": []
        }
        
        # Добавляем галерею
        gallery_path = Path("src/assets/gallery") / product_folder
        if gallery_path.exists():
            gallery_files = sorted([f for f in gallery_path.glob("gallery_*.jpg")])
            mapping[product_id]["gallery"] = [
                f"/src/assets/gallery/{product_folder}/{f.name}" 
                for f in gallery_files
            ]
    
    # Сохраняем маппинг
    with open("image_mapping.json", "w", encoding="utf-8") as f:
        json.dump(mapping, f, ensure_ascii=False, indent=2)
    
    print("Создан файл image_mapping.json с маппингом изображений")

if __name__ == "__main__":
    print("=== Распределение картинок по товарам ===")
    distribute_images()
    create_image_mapping()
    print("\nГотово! Теперь вы можете использовать картинки в своих товарах.") 