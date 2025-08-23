export interface DocumentData {
  wish: string;
  powerLevel: number;
  userName?: string;
  energyInvestment: number;
  affirmationText: string;
}

// Простая функция для скачивания изображения без внешних библиотек
export const generateLuckDocument = async (data: DocumentData): Promise<void> => {
  try {
    // Всегда используем новый красивый генератор
    console.log('Using new beautiful document generator');
    return await generateSimpleDocument(data);
    
  } catch (error) {
    console.error('Error generating document:', error);
    throw new Error('Не удалось создать документ. Попробуйте еще раз.');
  }
};

// Альтернативный генератор документа
const generateSimpleDocument = async (data: DocumentData): Promise<void> => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Cannot create canvas context');
  }

  // Размеры документа A4 в среднем разрешении
  canvas.width = 1240;  // Уменьшено в 2 раза
  canvas.height = 1754; // Уменьшено в 2 раза

  // Сложный фиолетовый градиентный фон
  const bgGradient = ctx.createLinearGradient(0, 0, 1240, 1754);
  bgGradient.addColorStop(0, '#1a0b3d');
  bgGradient.addColorStop(0.1, '#2d1b69');
  bgGradient.addColorStop(0.2, '#4c1d95');
  bgGradient.addColorStop(0.3, '#5b21b6');
  bgGradient.addColorStop(0.4, '#7c3aed');
  bgGradient.addColorStop(0.5, '#8b5cf6');
  bgGradient.addColorStop(0.6, '#a855f7');
  bgGradient.addColorStop(0.7, '#c084fc');
  bgGradient.addColorStop(0.8, '#7c3aed');
  bgGradient.addColorStop(0.9, '#5b21b6');
  bgGradient.addColorStop(1, '#2d1b69');
  
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, 1240, 1754);

  // Добавляем радиальные градиенты для текстуры
  const radial1 = ctx.createRadialGradient(248, 526, 0, 248, 526, 400);
  radial1.addColorStop(0, 'rgba(168, 85, 247, 0.6)');
  radial1.addColorStop(1, 'transparent');
  ctx.fillStyle = radial1;
  ctx.fillRect(0, 0, 1240, 1754);

  // Сложная многослойная рамка
  // Внешняя черная рамка
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.95)';
  ctx.lineWidth = 10;
  ctx.strokeRect(15, 15, 1210, 1724);
  
  // Вторая серая рамка
  ctx.strokeStyle = 'rgba(20, 20, 20, 0.9)';
  ctx.lineWidth = 8;
  ctx.strokeRect(30, 30, 1180, 1694);
  
  // Третья рамка
  ctx.strokeStyle = 'rgba(40, 40, 40, 0.8)';
  ctx.lineWidth = 5;
  ctx.strokeRect(45, 45, 1150, 1664);
  
  // Четвертая рамка
  ctx.strokeStyle = 'rgba(60, 60, 60, 0.6)';
  ctx.lineWidth = 4;
  ctx.strokeRect(60, 60, 1120, 1634);

  // Внутренняя декоративная рамка
  ctx.strokeStyle = 'rgba(75, 75, 75, 0.4)';
  ctx.lineWidth = 3;
  ctx.strokeRect(75, 75, 1090, 1604);

  // Заголовок в красивой рамке
  ctx.save();
  
  // Фон для заголовка
  const headerGradient = ctx.createLinearGradient(310, 140, 930, 240);
  headerGradient.addColorStop(0, 'rgba(255,255,255,0.15)');
  headerGradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.25)');
  headerGradient.addColorStop(1, 'rgba(0,0,0,0.1)');
  
  ctx.fillStyle = headerGradient;
  ctx.fillRect(310, 140, 620, 100);
  
  // Рамка для заголовка
  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth = 3;
  ctx.strokeRect(310, 140, 620, 100);
  
  // Заголовок
  ctx.fillStyle = 'white';
  ctx.font = 'bold 60px serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 8;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.fillText('СКРИЖАЛЬ УДАЧИ', 620, 190);
  
  ctx.font = 'italic 30px serif';
  ctx.shadowBlur = 4;
  ctx.fillText('Персональный документ силы', 620, 220);
  
  ctx.restore();

  // Секция УДАЧА
  ctx.save();
  
  // Фон для секции удачи
  const wishBg = ctx.createLinearGradient(260, 300, 980, 450);
  wishBg.addColorStop(0, 'rgba(255,255,255,0.1)');
  wishBg.addColorStop(0.5, 'rgba(168, 85, 247, 0.2)');
  wishBg.addColorStop(1, 'rgba(0,0,0,0.1)');
  
  ctx.fillStyle = wishBg;
  ctx.fillRect(260, 300, 720, 150);
  
  ctx.strokeStyle = 'rgba(255,255,255,0.25)';
  ctx.lineWidth = 2;
  ctx.strokeRect(260, 300, 720, 150);
  
  // Заголовок УДАЧА
  ctx.fillStyle = 'white';
  ctx.font = 'bold 40px serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 4;
  ctx.fillText('УДАЧА', 620, 340);
  
  // Текст желания в рамке
  const textBg = ctx.createLinearGradient(310, 360, 930, 430);
  textBg.addColorStop(0, 'rgba(0,0,0,0.3)');
  textBg.addColorStop(1, 'rgba(0,0,0,0.1)');
  
  ctx.fillStyle = textBg;
  ctx.fillRect(310, 360, 620, 70);
  
  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  ctx.lineWidth = 2;
  ctx.strokeRect(310, 360, 620, 70);
  
  ctx.fillStyle = '#e0e0e0';
  ctx.font = '24px serif';
  ctx.shadowBlur = 2;
  const wishText = data.wish || 'ваше желание';
  
  // Разбиваем длинный текст на строки
  const words = wishText.split(' ');
  const lines = [];
  let currentLine = '';
  
  for (const word of words) {
    const testLine = currentLine + (currentLine ? ' ' : '') + word;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > 550 && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  lines.push(currentLine);
  
  const startY = 390 - (lines.length - 1) * 12;
  lines.forEach((line, index) => {
    ctx.fillText(`"${line}"`, 620, startY + index * 25);
  });
  
  ctx.restore();

  // Статистика в блоках (улучшенные размеры)
  ctx.save();
  
  // Блок "Уровень силы" - увеличен и улучшен
  const powerBg = ctx.createLinearGradient(200, 490, 580, 560);
  powerBg.addColorStop(0, 'rgba(168, 85, 247, 0.3)');
  powerBg.addColorStop(1, 'rgba(0,0,0,0.4)');
  
  ctx.fillStyle = powerBg;
  ctx.fillRect(200, 490, 380, 70);
  ctx.strokeStyle = 'rgba(255,255,255,0.4)';
  ctx.lineWidth = 3;
  ctx.strokeRect(200, 490, 380, 70);
  
  ctx.fillStyle = 'white';
  ctx.font = 'bold 28px serif';
  ctx.textAlign = 'left';
  ctx.shadowColor = 'rgba(0,0,0,0.9)';
  ctx.shadowBlur = 3;
  ctx.fillText(`Уровень силы: ${data.powerLevel}/10`, 210, 530);
  
  // Блок "Энергетический вклад" - увеличен и улучшен
  const energyBg = ctx.createLinearGradient(660, 490, 1040, 560);
  energyBg.addColorStop(0, 'rgba(168, 85, 247, 0.3)');
  energyBg.addColorStop(1, 'rgba(0,0,0,0.4)');
  
  ctx.fillStyle = energyBg;
  ctx.fillRect(660, 490, 380, 70);
  ctx.strokeStyle = 'rgba(255,255,255,0.4)';
  ctx.lineWidth = 3;
  ctx.strokeRect(660, 490, 380, 70);
  
  ctx.fillStyle = 'white';
  ctx.font = 'bold 24px serif';
  ctx.fillText(`Энергетический вклад:`, 670, 520);
  ctx.font = 'bold 28px serif';
  ctx.fillStyle = '#f0f0f0';
  ctx.fillText(`${data.energyInvestment} ₽`, 670, 550);
  
  ctx.restore();

  // Секция аффирмаций
  ctx.save();
  
  // Заголовки аффирмаций
  ctx.textAlign = 'center';
  ctx.font = 'bold 35px serif';
  ctx.fillStyle = 'white';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 4;
  ctx.fillText('ПЕРСОНАЛЬНЫЕ АФФИРМАЦИИ', 620, 600);
  ctx.fillText('ПРИНЯТИЕ ЛЮБВИ', 620, 640);
  
  // Фон для аффирмаций
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(260, 660, 720, 200);
  ctx.strokeStyle = 'rgba(255,255,255,0.15)';
  ctx.lineWidth = 2;
  ctx.strokeRect(260, 660, 720, 200);
  
  ctx.fillStyle = '#e0e0e0';
  ctx.font = '20px serif';
  ctx.shadowBlur = 2;
  
  // Разбиваем аффирмации на строки
  const affWords = data.affirmationText.split(' ');
  const affLines = [];
  let currentAffLine = '';
  
  for (const word of affWords) {
    const testLine = currentAffLine + (currentAffLine ? ' ' : '') + word;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > 650 && currentAffLine) {
      affLines.push(currentAffLine);
      currentAffLine = word;
    } else {
      currentAffLine = testLine;
    }
  }
  affLines.push(currentAffLine);
  
  const affStartY = 710;
  affLines.forEach((line, index) => {
    ctx.fillText(line, 620, affStartY + index * 30);
  });
  
  ctx.restore();

  // Увеличенная печать с декоративным узором
  ctx.save();
  ctx.translate(1000, 1400);
  
  // Внешний декоративный узор
  ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
  ctx.lineWidth = 2;
  for (let i = 0; i < 16; i++) {
    const angle = (i * Math.PI * 2) / 16;
    const x1 = Math.cos(angle) * 130;
    const y1 = Math.sin(angle) * 130;
    const x2 = Math.cos(angle) * 120;
    const y2 = Math.sin(angle) * 120;
    
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    
    // Маленькие точки
    ctx.fillStyle = 'rgba(168, 85, 247, 0.6)';
    ctx.beginPath();
    ctx.arc(x1, y1, 2, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Декоративные дуги между лучами
  ctx.strokeStyle = 'rgba(168, 85, 247, 0.3)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 16; i++) {
    const angle1 = (i * Math.PI * 2) / 16;
    const angle2 = ((i + 1) * Math.PI * 2) / 16;
    
    ctx.beginPath();
    ctx.arc(0, 0, 125, angle1, angle2);
    ctx.stroke();
  }
  
  // Главный круг для печати (увеличен)
  ctx.fillStyle = 'rgba(0,0,0,0.9)';
  ctx.beginPath();
  ctx.arc(0, 0, 110, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.95)';
  ctx.lineWidth = 10;
  ctx.stroke();
  
  // Средний круг с градиентом
  const sealGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 100);
  sealGradient.addColorStop(0, 'rgba(168, 85, 247, 0.8)');
  sealGradient.addColorStop(1, 'rgba(168, 85, 247, 0.3)');
  ctx.strokeStyle = sealGradient;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(0, 0, 95, 0, Math.PI * 2);
  ctx.stroke();
  
  // Пентаграмма (5-угольная звезда) - увеличена
  ctx.strokeStyle = 'rgba(168, 85, 247, 0.7)';
  ctx.fillStyle = 'rgba(168, 85, 247, 0.5)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  
  const points = 5;
  const outerRadius = 75;
  const innerRadius = 30;
  
  for (let i = 0; i < points * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = (i * Math.PI) / points - Math.PI / 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // Центральный круг
  ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
  ctx.beginPath();
  ctx.arc(0, 0, 25, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.strokeStyle = 'rgba(168, 85, 247, 0.8)';
  ctx.lineWidth = 3;
  ctx.stroke();
  
  // Текст на печати (увеличен)
  ctx.fillStyle = 'white';
  ctx.font = 'bold 16px sans-serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(0,0,0,0.9)';
  ctx.shadowBlur = 4;
  ctx.fillText('САЙТ УДАЧИ', 0, -5);
  
  ctx.font = '11px sans-serif';
  ctx.fillStyle = '#ccc';
  ctx.fillText('POEHALI.DEV', 0, 10);
  ctx.fillText('2025', 0, 25);
  
  ctx.restore();

  // Информация о документе (перенесена внутрь)
  ctx.save();
  
  // Красивый блок с информацией о документе
  const infoBg = ctx.createLinearGradient(150, 1350, 600, 1500);
  infoBg.addColorStop(0, 'rgba(0,0,0,0.4)');
  infoBg.addColorStop(1, 'rgba(168, 85, 247, 0.2)');
  
  ctx.fillStyle = infoBg;
  ctx.fillRect(150, 1350, 600, 200);
  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth = 3;
  ctx.strokeRect(150, 1350, 600, 200);
  
  // Внутренняя рамка
  ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
  ctx.lineWidth = 2;
  ctx.strokeRect(160, 1360, 580, 180);
  
  ctx.fillStyle = 'white';
  ctx.font = '20px serif';
  ctx.textAlign = 'left';
  ctx.shadowColor = 'rgba(0,0,0,0.9)';
  ctx.shadowBlur = 3;
  
  const timestamp = new Date().toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  const docNumber = `WD${Date.now()}${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  
  ctx.fillText(`Документ №: ${docNumber}`, 170, 1390);
  ctx.fillText(`Дата активации:`, 170, 1420);
  ctx.font = 'bold 22px serif';
  ctx.fillStyle = '#e0e0e0';
  ctx.fillText(`${timestamp}`, 170, 1450);
  
  ctx.font = '20px serif';
  ctx.fillStyle = 'white';
  ctx.fillText(`Получатель:`, 170, 1480);
  ctx.font = 'bold 22px serif';
  ctx.fillStyle = '#f0f0f0';
  ctx.fillText(`${data.userName || 'Получатель силы'}`, 170, 1510);
  
  ctx.restore();

  // Центральное предупреждение (перенесено внутрь)
  ctx.save();
  
  // Фон для предупреждения
  const warnGradient = ctx.createLinearGradient(150, 1580, 750, 1620);
  warnGradient.addColorStop(0, 'rgba(255, 193, 7, 0.9)');
  warnGradient.addColorStop(1, 'rgba(255, 152, 0, 0.8)');
  
  ctx.fillStyle = warnGradient;
  ctx.fillRect(150, 1580, 600, 50);
  
  ctx.strokeStyle = 'rgba(255, 193, 7, 0.8)';
  ctx.lineWidth = 4;
  ctx.strokeRect(150, 1580, 600, 50);
  
  // Дополнительная внутренняя рамка
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.lineWidth = 2;
  ctx.strokeRect(155, 1585, 590, 40);
  
  ctx.fillStyle = 'black';
  ctx.font = 'bold 22px serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(255,255,255,0.7)';
  ctx.shadowBlur = 3;
  ctx.fillText('⚠️ ДОКУМЕНТ ДЕЙСТВУЕТ ПОСЛЕ ОПЛАТЫ СИЛЫ! ⚠️', 450, 1610);
  
  ctx.restore();

  // Скачиваем
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