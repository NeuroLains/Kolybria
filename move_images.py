import os
import shutil

src = 'картинки для разбирания'
dst = 'Galereya'

mapping = {
    'vizitka': 'Vizitki',
    'listovka': 'Listovki',
    'buklet': 'Buklety',
    'bloknot': 'Bloknoty',
    'konvert': 'Konverty',
    'broshjura': 'Broshyury',
    'plakat': 'Plakaty',
    'chertezh': 'Chertezhi',
    'foto': 'PechatFoto',
    'kalendar': 'Kalendari',
    'naklejka': 'NakleykiStikery',
    'plastik': 'PlastikovyeKarty',
    'rizograf': 'Rizografiya',
    'blank': 'Blanki',
    'samokopirka': 'SamokopBlanki',
    'znachki': 'Znachki',
    '3d': '3DStikery',
    'kruzhka': 'Kruzhka',
    'futbolka': 'Futbolki',
    'kepka': 'Bejsbolki',
    'magnit': 'Magnity',
    'brelok': 'Breloki',
    'shil': 'Shildy',
    'metall': 'PechatNaMetalle',
    'sumka': 'Sumki',
    'ryukzak': 'Ryukzaki',
    'pazl': 'Pazly',
    'kovrik': 'Kovriki',
    'lenta': 'Lenty',
    'flag': 'Flagi',
    'banner': 'Bannery',
    'stend': 'Stendy',
    'tablichka': 'Tablichki',
    'rollap': 'RollUP',
    'pressvall': 'PressWall',
    'hstoyki': 'HStoyki',
    'tabloplata': 'TablOplata',
    'adrestablichki': 'AdresTablichki',
    'plotter': 'PlotternayaRezka',
    'razrabmakety': 'RazrabMakety',
    'laminatsija': 'Laminirovanie',
    'broshjurovka': 'Broshyurovka',
    'stepler': 'Steplirovanie',
    'tverdpereplet': 'TverdyjPereplet',
    'izgotovleniepechatej': 'IzgotovleniePechatej',
    'brendirovanie': 'Brendirovanie',
}

files = os.listdir(src)
for f in files:
    if f.startswith('.') or os.path.isdir(os.path.join(src, f)):
        continue
    fname = f.lower()
    for k, folder in mapping.items():
        if k in fname and os.path.exists(os.path.join(dst, folder)):
            shutil.move(os.path.join(src, f), os.path.join(dst, folder, f))
            print(f"Moved {f} to {folder}")
            break 