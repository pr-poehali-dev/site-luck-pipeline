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

  // Размеры документа A4 в высоком разрешении
  canvas.width = 2480;  // 210mm * 300dpi / 25.4
  canvas.height = 3508; // 297mm * 300dpi / 25.4

  // Сложный фиолетовый градиентный фон
  const bgGradient = ctx.createLinearGradient(0, 0, 2480, 3508);
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
  ctx.fillRect(0, 0, 2480, 3508);

  // Добавляем радиальные градиенты для текстуры
  const radial1 = ctx.createRadialGradient(496, 1052, 0, 496, 1052, 800);
  radial1.addColorStop(0, 'rgba(168, 85, 247, 0.6)');
  radial1.addColorStop(1, 'transparent');
  ctx.fillStyle = radial1;
  ctx.fillRect(0, 0, 2480, 3508);

  // Сложная многослойная рамка
  // Внешняя черная рамка
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.95)';
  ctx.lineWidth = 20;
  ctx.strokeRect(30, 30, 2420, 3448);
  
  // Вторая серая рамка
  ctx.strokeStyle = 'rgba(20, 20, 20, 0.9)';
  ctx.lineWidth = 15;
  ctx.strokeRect(60, 60, 2360, 3388);
  
  // Третья рамка
  ctx.strokeStyle = 'rgba(40, 40, 40, 0.8)';
  ctx.lineWidth = 10;
  ctx.strokeRect(90, 90, 2300, 3328);
  
  // Четвертая рамка
  ctx.strokeStyle = 'rgba(60, 60, 60, 0.6)';
  ctx.lineWidth = 8;
  ctx.strokeRect(120, 120, 2240, 3268);

  // Внутренняя декоративная рамка
  ctx.strokeStyle = 'rgba(75, 75, 75, 0.4)';
  ctx.lineWidth = 5;
  ctx.strokeRect(150, 150, 2180, 3208);

  // Заголовок в красивой рамке
  ctx.save();
  
  // Фон для заголовка
  const headerGradient = ctx.createLinearGradient(620, 280, 1860, 480);
  headerGradient.addColorStop(0, 'rgba(255,255,255,0.15)');
  headerGradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.25)');
  headerGradient.addColorStop(1, 'rgba(0,0,0,0.1)');
  
  ctx.fillStyle = headerGradient;
  ctx.fillRect(620, 280, 1240, 200);
  
  // Рамка для заголовка
  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth = 6;
  ctx.strokeRect(620, 280, 1240, 200);
  
  // Заголовок
  ctx.fillStyle = 'white';
  ctx.font = 'bold 120px serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 15;
  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = 3;
  ctx.fillText('СКРИЖАЛЬ УДАЧИ', 1240, 380);
  
  ctx.font = 'italic 60px serif';
  ctx.shadowBlur = 8;
  ctx.fillText('Персональный документ силы', 1240, 440);
  
  ctx.restore();

  // Секция УДАЧА
  ctx.save();
  
  // Фон для секции удачи
  const wishBg = ctx.createLinearGradient(520, 600, 1960, 900);
  wishBg.addColorStop(0, 'rgba(255,255,255,0.1)');
  wishBg.addColorStop(0.5, 'rgba(168, 85, 247, 0.2)');
  wishBg.addColorStop(1, 'rgba(0,0,0,0.1)');
  
  ctx.fillStyle = wishBg;
  ctx.fillRect(520, 600, 1440, 300);
  
  ctx.strokeStyle = 'rgba(255,255,255,0.25)';
  ctx.lineWidth = 4;
  ctx.strokeRect(520, 600, 1440, 300);
  
  // Заголовок УДАЧА
  ctx.fillStyle = 'white';
  ctx.font = 'bold 80px serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 8;
  ctx.fillText('УДАЧА', 1240, 680);
  
  // Текст желания в рамке
  const textBg = ctx.createLinearGradient(620, 720, 1860, 860);
  textBg.addColorStop(0, 'rgba(0,0,0,0.3)');
  textBg.addColorStop(1, 'rgba(0,0,0,0.1)');
  
  ctx.fillStyle = textBg;
  ctx.fillRect(620, 720, 1240, 140);
  
  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  ctx.lineWidth = 3;
  ctx.strokeRect(620, 720, 1240, 140);
  
  ctx.fillStyle = '#e0e0e0';
  ctx.font = '48px serif';
  ctx.shadowBlur = 4;
  const wishText = data.wish || 'ваше желание';
  
  // Разбиваем длинный текст на строки
  const words = wishText.split(' ');
  const lines = [];
  let currentLine = '';
  
  for (const word of words) {
    const testLine = currentLine + (currentLine ? ' ' : '') + word;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > 1100 && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  lines.push(currentLine);
  
  const startY = 780 - (lines.length - 1) * 25;
  lines.forEach((line, index) => {
    ctx.fillText(`"${line}"`, 1240, startY + index * 50);
  });
  
  ctx.restore();

  // Статистика в блоках
  ctx.save();
  
  // Блок "Уровень силы"
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(520, 980, 600, 100);
  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  ctx.lineWidth = 3;
  ctx.strokeRect(520, 980, 600, 100);
  
  ctx.fillStyle = 'white';
  ctx.font = 'bold 50px serif';
  ctx.textAlign = 'left';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 4;
  ctx.fillText(`Уровень силы: ${data.powerLevel}/10`, 540, 1040);
  
  // Блок "Энергетический вклад"
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(1360, 980, 600, 100);
  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  ctx.lineWidth = 3;
  ctx.strokeRect(1360, 980, 600, 100);
  
  ctx.fillStyle = 'white';
  ctx.fillText(`Энергетический вклад: ${data.energyInvestment} ₽`, 1380, 1040);
  
  ctx.restore();
  
  // Секция аффирмаций
  ctx.save();
  
  // Заголовки аффирмаций
  ctx.textAlign = 'center';
  ctx.font = 'bold 70px serif';
  ctx.fillStyle = 'white';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 8;
  ctx.fillText('ПЕРСОНАЛЬНЫЕ АФФИРМАЦИИ', 1240, 1200);
  ctx.fillText('ПРИНЯТИЕ ЛЮБВИ', 1240, 1280);
  
  // Фон для аффирмаций
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(520, 1320, 1440, 400);
  ctx.strokeStyle = 'rgba(255,255,255,0.15)';
  ctx.lineWidth = 4;
  ctx.strokeRect(520, 1320, 1440, 400);
  
  ctx.fillStyle = '#e0e0e0';
  ctx.font = '40px serif';
  ctx.shadowBlur = 4;
  
  // Разбиваем аффирмации на строки
  const affWords = data.affirmationText.split(' ');
  const affLines = [];
  let currentAffLine = '';
  
  for (const word of affWords) {
    const testLine = currentAffLine + (currentAffLine ? ' ' : '') + word;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > 1300 && currentAffLine) {
      affLines.push(currentAffLine);
      currentAffLine = word;
    } else {
      currentAffLine = testLine;
    }
  }
  affLines.push(currentAffLine);
  
  const affStartY = 1420;
  affLines.forEach((line, index) => {
    ctx.fillText(line, 1240, affStartY + index * 60);
  });
  
  ctx.restore();

  // Пентаграмма-печать
  ctx.save();
  ctx.translate(2030, 2900);
  
  // Круг для печати
  ctx.fillStyle = 'rgba(0,0,0,0.9)';
  ctx.beginPath();
  ctx.arc(0, 0, 180, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.95)';
  ctx.lineWidth = 15;
  ctx.stroke();
  
  // Внутренний круг
  ctx.strokeStyle = 'rgba(168, 85, 247, 0.8)';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(0, 0, 160, 0, Math.PI * 2);
  ctx.stroke();
  
  // Пентаграмма (5-угольная звезда)
  ctx.strokeStyle = 'rgba(168, 85, 247, 0.6)';
  ctx.fillStyle = 'rgba(168, 85, 247, 0.4)';
  ctx.lineWidth = 6;
  ctx.beginPath();
  
  const points = 5;
  const outerRadius = 120;
  const innerRadius = 48;
  
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
  ctx.arc(0, 0, 36, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.strokeStyle = 'rgba(50, 50, 50, 0.9)';
  ctx.lineWidth = 6;
  ctx.stroke();
  
  // Текст на печати
  ctx.fillStyle = 'white';
  ctx.font = 'bold 24px sans-serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(0,0,0,0.9)';
  ctx.shadowBlur = 6;
  ctx.fillText('САЙТ УДАЧИ', 0, -15);
  
  ctx.font = '18px sans-serif';
  ctx.fillStyle = '#ccc';
  ctx.fillText('POEHALI.DEV', 0, 15);
  ctx.fillText('2025', 0, 40);
  
  ctx.restore();

  // Информация о документе
  ctx.save();
  
  // Блок с информацией о документе
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(520, 3100, 1000, 300);
  ctx.strokeStyle = 'rgba(255,255,255,0.15)';
  ctx.lineWidth = 4;
  ctx.strokeRect(520, 3100, 1000, 300);
  
  ctx.fillStyle = 'white';
  ctx.font = '36px serif';
  ctx.textAlign = 'left';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 4;
  
  const timestamp = new Date().toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  const docNumber = `WD${Date.now()}${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  
  ctx.fillText(`Документ №: ${docNumber}`, 540, 3160);
  ctx.fillText(`Дата активации:`, 540, 3220);
  ctx.font = 'bold 40px serif';
  ctx.fillStyle = '#e0e0e0';
  ctx.fillText(`${timestamp}`, 540, 3280);
  ctx.fillText(`Получатель: ${data.userName || 'Получатель силы'} • Email: user@example.com`, 540, 3340);
  
  ctx.restore();

  // Центральное предупреждение
  ctx.save();
  
  // Фон для предупреждения
  const warnGradient = ctx.createLinearGradient(520, 3450, 1960, 3500);
  warnGradient.addColorStop(0, 'rgba(255, 193, 7, 0.9)');
  warnGradient.addColorStop(1, 'rgba(255, 152, 0, 0.8)');
  
  ctx.fillStyle = warnGradient;
  ctx.fillRect(520, 3450, 1440, 80);
  
  ctx.strokeStyle = 'rgba(255, 193, 7, 0.6)';
  ctx.lineWidth = 6;
  ctx.strokeRect(520, 3450, 1440, 80);
  
  ctx.fillStyle = 'black';
  ctx.font = 'bold 42px serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(255,255,255,0.5)';
  ctx.shadowBlur = 3;
  ctx.fillText('⚠️ ДОКУМЕНТ ДЕЙСТВУЕТ ПОСЛЕ ОПЛАТЫ СИЛЫ! ⚠️', 1240, 3500);
  
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