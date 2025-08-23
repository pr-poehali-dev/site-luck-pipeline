export interface DocumentData {
  wish: string;
  powerLevel: number;
  userName?: string;
  energyInvestment: number;
  affirmationText: string;
}

export const generateLuckDocument = async (data: DocumentData): Promise<void> => {
  try {
    console.log('Generating asymmetric document with sharp borders');
    return await generateAsymmetricDocument(data);
    
  } catch (error) {
    console.error('Error generating document:', error);
    throw new Error('Не удалось создать документ. Попробуйте еще раз.');
  }
};

const generateAsymmetricDocument = async (data: DocumentData): Promise<void> => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Cannot create canvas context');
  }

  // Размеры A4 документа
  canvas.width = 1240;
  canvas.height = 1754;

  // ОСНОВНОЙ ФОН - БАЗОВЫЙ ФИОЛЕТОВЫЙ БЕЗ ГРАДИЕНТА
  ctx.fillStyle = '#2d1b69';
  ctx.fillRect(0, 0, 1240, 1754);

  // СВЕТЛЫЕ ЗОНЫ БЕЗ ПЕРЕТЕКАНИЯ
  ctx.fillStyle = '#4c1d95';
  ctx.fillRect(200, 100, 800, 300);
  
  ctx.fillStyle = '#5b21b6';
  ctx.fillRect(0, 400, 600, 400);
  
  ctx.fillStyle = '#7c3aed';
  ctx.fillRect(640, 800, 600, 400);
  
  ctx.fillStyle = '#8b5cf6';
  ctx.fillRect(300, 1200, 700, 300);

  // АСИММЕТРИЧНЫЕ РАМКИ С ЧЕТКИМИ ГРАНИЦАМИ
  // Внешняя рамка - неравномерная толщина
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 15;
  ctx.strokeRect(5, 5, 1230, 1744);
  
  // Вторая рамка - асимметричная
  ctx.strokeStyle = '#1a1a1a';
  ctx.lineWidth = 12;
  ctx.strokeRect(20, 15, 1200, 1724);
  
  // Третья рамка - неравномерная
  ctx.strokeStyle = '#2a2a2a';
  ctx.lineWidth = 8;
  ctx.strokeRect(35, 25, 1170, 1704);
  
  // Четвертая рамка - асимметричная
  ctx.strokeStyle = '#3c3c3c';
  ctx.lineWidth = 6;
  ctx.strokeRect(50, 40, 1140, 1674);
  
  // Внутренняя рамка - неравномерная
  ctx.strokeStyle = '#4b4b4b';
  ctx.lineWidth = 4;
  ctx.strokeRect(65, 55, 1110, 1644);

  // АСИММЕТРИЧНЫЕ УГЛОВЫЕ ЭЛЕМЕНТЫ - ЧЕТКИЕ ФОРМЫ
  // Верхний левый - большой треугольник
  ctx.fillStyle = '#a855f7';
  ctx.beginPath();
  ctx.moveTo(70, 70);
  ctx.lineTo(140, 70);
  ctx.lineTo(70, 140);
  ctx.closePath();
  ctx.fill();
  
  // Верхний правый - маленький треугольник
  ctx.fillStyle = '#c084fc';
  ctx.beginPath();
  ctx.moveTo(1170, 70);
  ctx.lineTo(1130, 70);
  ctx.lineTo(1170, 110);
  ctx.closePath();
  ctx.fill();
  
  // Нижний левый - средний треугольник
  ctx.fillStyle = '#8b5cf6';
  ctx.beginPath();
  ctx.moveTo(70, 1684);
  ctx.lineTo(120, 1684);
  ctx.lineTo(70, 1634);
  ctx.closePath();
  ctx.fill();
  
  // Нижний правый - большой треугольник
  ctx.fillStyle = '#7c3aed';
  ctx.beginPath();
  ctx.moveTo(1170, 1684);
  ctx.lineTo(1100, 1684);
  ctx.lineTo(1170, 1614);
  ctx.closePath();
  ctx.fill();

  // ЗАГОЛОВОК - АСИММЕТРИЧНЫЙ БЛОК
  ctx.save();
  
  // Фон заголовка - асимметричный прямоугольник
  ctx.fillStyle = '#1a0b3d';
  ctx.fillRect(120, 150, 900, 120);
  
  // Дополнительный блок справа
  ctx.fillStyle = '#4c1d95';
  ctx.fillRect(1020, 150, 100, 120);
  
  // Рамка заголовка - асимметричная
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3;
  ctx.strokeRect(120, 150, 1000, 120);
  
  // Главный заголовок
  ctx.fillStyle = 'white';
  ctx.font = 'bold 64px serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.fillText('СКРИЖАЛЬ УДАЧИ', 620, 220);
  
  // Подзаголовок
  ctx.font = 'italic 28px serif';
  ctx.fillStyle = '#a855f7';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 2;
  ctx.fillText('Персональный документ силы', 620, 250);
  
  ctx.restore();

  // СЕКЦИЯ УДАЧА - АСИММЕТРИЧНЫЙ БЛОК
  ctx.save();
  
  // Основной блок удачи - неправильная форма
  ctx.fillStyle = '#5b21b6';
  ctx.fillRect(80, 300, 950, 180);
  
  // Дополнительный блок справа
  ctx.fillStyle = '#7c3aed';
  ctx.fillRect(1030, 320, 140, 140);
  
  // Рамка секции удачи
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.strokeRect(80, 300, 1090, 180);
  
  // Заголовок УДАЧА
  ctx.fillStyle = 'white';
  ctx.font = 'bold 48px serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 3;
  ctx.fillText('УДАЧА', 620, 350);
  
  // Поле для желания - асимметричное
  ctx.fillStyle = '#1a0b3d';
  ctx.fillRect(140, 370, 800, 80);
  
  // Дополнительное поле
  ctx.fillStyle = '#2d1b69';
  ctx.fillRect(940, 380, 180, 60);
  
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1;
  ctx.strokeRect(140, 370, 980, 80);
  
  // Текст желания
  ctx.fillStyle = '#a855f7';
  ctx.font = '26px serif';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 2;
  
  const wishText = `"${data.wish || 'ваше желание'}"`;
  const words = wishText.split(' ');
  const lines = [];
  let currentLine = '';
  
  for (const word of words) {
    const testLine = currentLine + (currentLine ? ' ' : '') + word;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > 750 && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  lines.push(currentLine);
  
  const wishStartY = 400;
  lines.forEach((line, index) => {
    ctx.fillText(line, 630, wishStartY + index * 32);
  });
  
  ctx.restore();

  // СТАТИСТИКА - АСИММЕТРИЧНЫЕ БЛОКИ
  ctx.save();
  
  // Блок уровня силы - неправильной формы
  ctx.fillStyle = '#4c1d95';
  ctx.fillRect(100, 520, 700, 60);
  
  ctx.fillStyle = '#7c3aed';
  ctx.fillRect(800, 530, 300, 40);
  
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.strokeRect(100, 520, 1000, 60);
  
  ctx.fillStyle = 'white';
  ctx.font = 'bold 32px serif';
  ctx.textAlign = 'left';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 2;
  ctx.fillText(`Уровень силы: ${data.powerLevel}/10`, 120, 560);
  
  // Блок энергетического вклада - другая форма
  ctx.fillStyle = '#8b5cf6';
  ctx.fillRect(150, 600, 800, 60);
  
  ctx.fillStyle = '#5b21b6';
  ctx.fillRect(80, 610, 70, 40);
  
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.strokeRect(80, 600, 1020, 60);
  
  ctx.fillStyle = 'white';
  ctx.textAlign = 'left';
  ctx.fillText(`Энергетический вклад: ${data.energyInvestment} ₽`, 120, 640);
  
  ctx.restore();

  // СЕКЦИЯ АФФИРМАЦИЙ - АСИММЕТРИЧНЫЙ БЛОК
  ctx.save();
  
  // Заголовок аффирмаций
  ctx.fillStyle = 'white';
  ctx.font = 'bold 42px serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 3;
  ctx.fillText('ПЕРСОНАЛЬНЫЕ АФФИРМАЦИИ', 620, 740);
  
  // Подзаголовок
  ctx.font = 'bold 32px serif';
  ctx.fillStyle = '#a855f7';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 2;
  ctx.fillText('ПРИНЯТИЕ ЛЮБВИ', 620, 780);
  
  // Блок для текста аффирмаций - сложная асимметричная форма
  ctx.fillStyle = '#1a0b3d';
  ctx.fillRect(120, 800, 800, 180);
  
  ctx.fillStyle = '#2d1b69';
  ctx.fillRect(920, 820, 200, 140);
  
  ctx.fillStyle = '#4c1d95';
  ctx.fillRect(80, 850, 40, 100);
  
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.strokeRect(80, 800, 1040, 180);
  
  // Текст аффирмаций
  ctx.fillStyle = '#a855f7';
  ctx.font = '24px serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 2;
  
  const affWords = data.affirmationText.split(' ');
  const affLines = [];
  let currentAffLine = '';
  
  for (const word of affWords) {
    const testLine = currentAffLine + (currentAffLine ? ' ' : '') + word;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > 900 && currentAffLine) {
      affLines.push(currentAffLine);
      currentAffLine = word;
    } else {
      currentAffLine = testLine;
    }
  }
  affLines.push(currentAffLine);
  
  const affStartY = 840;
  affLines.forEach((line, index) => {
    ctx.fillText(line, 620, affStartY + index * 32);
  });
  
  ctx.restore();

  // АСИММЕТРИЧНАЯ ПЕЧАТЬ
  ctx.save();
  ctx.translate(950, 1200);
  
  // Внешние декоративные элементы - асимметричные
  for (let i = 0; i < 10; i++) {
    const angle = (i * Math.PI * 2) / 10;
    const distance = 90 + (i % 3) * 10; // разные расстояния
    const x1 = Math.cos(angle) * distance;
    const y1 = Math.sin(angle) * distance;
    const x2 = Math.cos(angle) * (distance - 15);
    const y2 = Math.sin(angle) * (distance - 15);
    
    ctx.strokeStyle = '#2a2a2a';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    
    // Точки разных размеров
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.arc(x1, y1, 2 + (i % 3), 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Основной круг печати - асимметричный
  ctx.fillStyle = '#4c1d95';
  ctx.beginPath();
  ctx.arc(0, 0, 70, 0, Math.PI * 2);
  ctx.fill();
  
  // Дополнительный элемент
  ctx.fillStyle = '#7c3aed';
  ctx.fillRect(-20, -20, 40, 40);
  
  // Рамки печати - разной толщины
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(0, 0, 65, 0, Math.PI * 2);
  ctx.stroke();
  
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, 58, 0, Math.PI * 2);
  ctx.stroke();
  
  // Многоугольник - асимметричный
  ctx.strokeStyle = '#a855f7';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(45, 0);
  ctx.lineTo(20, 40);
  ctx.lineTo(-30, 35);
  ctx.lineTo(-45, -10);
  ctx.lineTo(-20, -40);
  ctx.lineTo(25, -35);
  ctx.closePath();
  ctx.stroke();
  
  // Текст печати
  ctx.fillStyle = 'white';
  ctx.font = 'bold 16px sans-serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 2;
  ctx.fillText('САЙТ ЖЕЛАНИЙ', 0, -10);
  
  ctx.font = '12px sans-serif';
  ctx.fillStyle = '#c084fc';
  ctx.fillText('POEHALI.DEV', 0, 8);
  ctx.fillText('2025', 0, 24);
  
  ctx.restore();

  // ИНФОРМАЦИЯ О ДОКУМЕНТЕ - АСИММЕТРИЧНЫЙ БЛОК
  ctx.save();
  
  ctx.fillStyle = '#1a0b3d';
  ctx.fillRect(80, 1400, 600, 120);
  
  ctx.fillStyle = '#2d1b69';
  ctx.fillRect(680, 1420, 100, 80);
  
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.strokeRect(80, 1400, 700, 120);
  
  const timestamp = new Date().toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  const docNumber = `WD${Date.now()}${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  
  ctx.fillStyle = 'white';
  ctx.font = 'bold 20px serif';
  ctx.textAlign = 'left';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 2;
  
  ctx.fillText(`Документ №: ${docNumber}`, 100, 1430);
  ctx.fillText(`Дата: ${timestamp}`, 100, 1460);
  
  ctx.font = 'bold 22px serif';
  ctx.fillStyle = '#a855f7';
  ctx.fillText(`Получатель: ${data.userName || 'Получатель силы'}`, 100, 1490);
  
  ctx.restore();

  // ПРЕДУПРЕЖДЕНИЕ - АСИММЕТРИЧНЫЙ БЛОК
  ctx.save();
  
  ctx.fillStyle = '#FBC520';
  ctx.fillRect(100, 1560, 900, 50);
  
  ctx.fillStyle = '#FAB619';
  ctx.fillRect(1000, 1565, 140, 40);
  
  ctx.strokeStyle = '#F59E0B';
  ctx.lineWidth = 3;
  ctx.strokeRect(100, 1560, 1040, 50);
  
  ctx.fillStyle = 'black';
  ctx.font = 'bold 26px serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = '#ffffff';
  ctx.shadowBlur = 1;
  ctx.fillText('⚠️ ДОКУМЕНТ ДЕЙСТВУЕТ ПОСЛЕ ОПЛАТЫ СИЛЫ! ⚠️', 620, 1590);
  
  ctx.restore();

  // ПОЛУЧАТЕЛЬ И EMAIL - АСИММЕТРИЧНЫЙ БЛОК
  ctx.save();
  
  ctx.fillStyle = '#2d1b69';
  ctx.fillRect(120, 1640, 800, 50);
  
  ctx.fillStyle = '#4c1d95';
  ctx.fillRect(920, 1650, 200, 30);
  
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1;
  ctx.strokeRect(120, 1640, 1000, 50);
  
  ctx.fillStyle = '#a855f7';
  ctx.font = '18px serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 1;
  ctx.fillText(`Получатель: ${data.userName || 'Получатель силы'} • Email: user@example.com`, 620, 1670);
  
  ctx.restore();

  // Скачивание документа
  canvas.toBlob((blob) => {
    if (blob) {
      const link = document.createElement('a');
      const fileTimestamp = new Date().toISOString().slice(0, 10);
      link.download = `Скрижаль_Удачи_${fileTimestamp}.png`;
      link.href = URL.createObjectURL(blob);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    }
  }, 'image/png', 1.0);
};

export const generateAffirmationText = (wish: string, powerLevel: number): string => {
  const affirmations = [
    'Я принимаю любовь во всех её проявлениях и открываю своё сердце для глубоких эмоциональных связей',
    'Моё желание исполняется легко и естественно, принося радость и гармонию в мою жизнь',
    'Я достоин(а) всех благ, которые приходят в мою жизнь, и принимаю их с благодарностью',
    'Вселенная поддерживает меня в достижении моих целей и мечтаний',
    'Я излучаю позитивную энергию, которая привлекает в мою жизнь удачу и процветание'
  ];

  const baseText = affirmations[Math.floor(Math.random() * affirmations.length)];
  
  if (powerLevel >= 8) {
    return `${baseText} МАГНЕТИЗМ ОТНОШЕНИЙ активирован на максимальном уровне.`;
  } else if (powerLevel >= 5) {
    return `${baseText} Энергия МАГНЕТИЗМА ОТНОШЕНИЙ усиливается.`;
  } else {
    return `${baseText} Начинаю притягивать МАГНЕТИЗМ ОТНОШЕНИЙ.`;
  }
};