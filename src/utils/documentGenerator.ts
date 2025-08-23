export interface DocumentData {
  wish: string;
  powerLevel: number;
  userName?: string;
  energyInvestment: number;
  affirmationText: string;
}

export const generateLuckDocument = async (data: DocumentData): Promise<void> => {
  try {
    console.log('Generating simple reliable document');
    return await generateSimpleDocument(data);
    
  } catch (error) {
    console.error('Error generating document:', error);
    throw new Error('Не удалось создать документ. Попробуйте еще раз.');
  }
};

const generateSimpleDocument = async (data: DocumentData): Promise<void> => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Cannot create canvas context');
  }

  // Размеры документа
  canvas.width = 800;
  canvas.height = 1200;

  // Основной фон
  ctx.fillStyle = '#2d1b69';
  ctx.fillRect(0, 0, 800, 1200);

  // Простые цветовые зоны
  ctx.fillStyle = '#4c1d95';
  ctx.fillRect(50, 50, 700, 200);
  
  ctx.fillStyle = '#5b21b6';
  ctx.fillRect(0, 300, 400, 300);
  
  ctx.fillStyle = '#7c3aed';
  ctx.fillRect(400, 600, 400, 300);

  // Простые рамки
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 8;
  ctx.strokeRect(10, 10, 780, 1180);
  
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3;
  ctx.strokeRect(25, 25, 750, 1150);

  // Заголовок
  ctx.fillStyle = 'white';
  ctx.font = 'bold 32px serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 3;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  
  ctx.fillText('СКРИЖАЛЬ УДАЧИ', 400, 100);
  
  ctx.font = 'italic 18px serif';
  ctx.fillStyle = '#a855f7';
  ctx.fillText('Персональный документ силы', 400, 130);

  // Секция УДАЧА
  ctx.fillStyle = 'white';
  ctx.font = 'bold 24px serif';
  ctx.fillText('УДАЧА', 400, 200);
  
  // Поле желания
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.fillRect(80, 220, 640, 80);
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 1;
  ctx.strokeRect(80, 220, 640, 80);
  
  ctx.fillStyle = '#a855f7';
  ctx.font = '16px serif';
  
  // Разбиваем текст желания на строки
  const wishText = `"${data.wish || 'ваше желание'}"`;
  const maxWidth = 600;
  const words = wishText.split(' ');
  const lines = [];
  let currentLine = '';
  
  for (const word of words) {
    const testLine = currentLine + (currentLine ? ' ' : '') + word;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  lines.push(currentLine);
  
  // Выводим строки желания
  lines.forEach((line, index) => {
    ctx.fillText(line, 400, 250 + index * 22);
  });

  // Статистика
  ctx.fillStyle = 'white';
  ctx.font = 'bold 18px serif';
  ctx.textAlign = 'left';
  ctx.fillText(`Уровень силы: ${data.powerLevel}/10`, 100, 360);
  ctx.fillText(`Энергетический вклад: ${data.energyInvestment} ₽`, 100, 390);

  // Аффирмации
  ctx.textAlign = 'center';
  ctx.font = 'bold 20px serif';
  ctx.fillText('ПЕРСОНАЛЬНЫЕ АФФИРМАЦИИ', 400, 450);
  
  ctx.font = 'bold 16px serif';
  ctx.fillStyle = '#a855f7';
  ctx.fillText('ПРИНЯТИЕ ЛЮБВИ', 400, 480);
  
  // Блок аффирмаций
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(60, 500, 680, 120);
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 1;
  ctx.strokeRect(60, 500, 680, 120);
  
  ctx.fillStyle = '#a855f7';
  ctx.font = '14px serif';
  
  // Разбиваем аффирмации на строки
  const affWords = data.affirmationText.split(' ');
  const affLines = [];
  let currentAffLine = '';
  const affMaxWidth = 640;
  
  for (const word of affWords) {
    const testLine = currentAffLine + (currentAffLine ? ' ' : '') + word;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > affMaxWidth && currentAffLine) {
      affLines.push(currentAffLine);
      currentAffLine = word;
    } else {
      currentAffLine = testLine;
    }
  }
  affLines.push(currentAffLine);
  
  // Выводим аффирмации
  const affStartY = 530;
  affLines.slice(0, 4).forEach((line, index) => { // Максимум 4 строки
    ctx.fillText(line, 400, affStartY + index * 20);
  });

  // Печать
  ctx.save();
  ctx.translate(600, 750);
  
  ctx.fillStyle = '#4c1d95';
  ctx.beginPath();
  ctx.arc(0, 0, 40, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, 38, 0, Math.PI * 2);
  ctx.stroke();
  
  ctx.fillStyle = 'white';
  ctx.font = 'bold 8px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('САЙТ ЖЕЛАНИЙ', 0, -8);
  
  ctx.font = '6px sans-serif';
  ctx.fillStyle = '#c084fc';
  ctx.fillText('POEHALI.DEV', 0, 4);
  ctx.fillText('2025', 0, 14);
  
  ctx.restore();

  // Информация о документе
  const timestamp = new Date().toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  const docNumber = `WD${Date.now()}${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  
  ctx.fillStyle = 'white';
  ctx.font = '12px serif';
  ctx.textAlign = 'left';
  ctx.fillText(`Документ №: ${docNumber}`, 100, 850);
  ctx.fillText(`Дата: ${timestamp}`, 100, 870);
  ctx.fillText(`Получатель: ${data.userName || 'Получатель силы'}`, 100, 890);

  // Предупреждение
  ctx.fillStyle = '#FBC520';
  ctx.fillRect(80, 950, 640, 40);
  ctx.strokeStyle = '#F59E0B';
  ctx.lineWidth = 2;
  ctx.strokeRect(80, 950, 640, 40);
  
  ctx.fillStyle = 'black';
  ctx.font = 'bold 14px serif';
  ctx.textAlign = 'center';
  ctx.fillText('⚠️ ДОКУМЕНТ ДЕЙСТВУЕТ ПОСЛЕ ОПЛАТЫ СИЛЫ! ⚠️', 400, 975);

  // Email
  ctx.fillStyle = '#a855f7';
  ctx.font = '10px serif';
  ctx.fillText('Получатель: user@example.com', 400, 1020);

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
    } else {
      throw new Error('Не удалось создать изображение');
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