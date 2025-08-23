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
    // Найти элемент документа
    const element = document.getElementById('luck-document');
    if (!element) {
      console.error('Document element not found, trying alternative approach');
      // Альтернативный подход - создаем простое изображение
      return await generateSimpleDocument(data);
    }

    // Создаем временный canvas для рендеринга
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Cannot create canvas context');
    }

    // Получаем размеры элемента
    const rect = element.getBoundingClientRect();
    canvas.width = rect.width * 2; // Увеличиваем разрешение
    canvas.height = rect.height * 2;
    
    // Масштабируем контекст для лучшего качества
    ctx.scale(2, 2);
    
    // Заливаем фон
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#2d1b69');
    gradient.addColorStop(0.5, '#7c3aed');
    gradient.addColorStop(1, '#5b21b6');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);
    
    // Добавляем текст документа
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px serif';
    ctx.textAlign = 'center';
    ctx.fillText('СКРИЖАЛЬ УДАЧИ', rect.width / 2, 60);
    
    ctx.font = 'italic 16px serif';
    ctx.fillText('Персональный документ силы', rect.width / 2, 90);
    
    // Желание
    ctx.font = 'bold 18px serif';
    ctx.fillText('ЖЕЛАНИЕ', rect.width / 2, 150);
    
    ctx.font = '16px serif';
    ctx.fillStyle = '#e0e0e0';
    const wishText = data.wish || 'ваше желание';
    ctx.fillText(`"${wishText}"`, rect.width / 2, 180);
    
    // Статистика
    ctx.fillStyle = 'white';
    ctx.font = '14px serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Уровень силы: ${data.powerLevel}/10`, 50, 220);
    ctx.fillText(`Энергетический вклад: ${data.energyInvestment} ₽`, 50, 245);
    
    // Аффирмации
    ctx.textAlign = 'center';
    ctx.font = 'bold 16px serif';
    ctx.fillText('ПЕРСОНАЛЬНЫЕ АФФИРМАЦИИ', rect.width / 2, 290);
    
    ctx.font = '12px serif';
    ctx.fillStyle = '#e0e0e0';
    const affirmationLines = data.affirmationText.match(/.{1,60}/g) || [data.affirmationText];
    affirmationLines.forEach((line, index) => {
      ctx.fillText(line, rect.width / 2, 320 + index * 20);
    });
    
    // Номер документа
    ctx.fillStyle = 'white';
    ctx.font = '10px serif';
    ctx.textAlign = 'left';
    const timestamp = new Date().toLocaleDateString('ru-RU');
    ctx.fillText(`Документ активирован: ${timestamp}`, 50, rect.height - 40);
    ctx.fillText(`Получатель: ${data.userName || 'Получатель силы'}`, 50, rect.height - 25);
    
    // Конвертируем canvas в blob и скачиваем
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

  // Размеры документа
  canvas.width = 800;
  canvas.height = 1200;

  // Фон - сложный градиент
  const bgGradient = ctx.createLinearGradient(0, 0, 800, 1200);
  bgGradient.addColorStop(0, '#1a0b3d');
  bgGradient.addColorStop(0.3, '#2d1b69');
  bgGradient.addColorStop(0.5, '#5b21b6');
  bgGradient.addColorStop(0.7, '#7c3aed');
  bgGradient.addColorStop(1, '#2d1b69');
  
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, 800, 1200);

  // Рамка
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 8;
  ctx.strokeRect(20, 20, 760, 1160);
  
  ctx.strokeStyle = '#333333';
  ctx.lineWidth = 4;
  ctx.strokeRect(30, 30, 740, 1140);

  // Заголовок
  ctx.fillStyle = 'white';
  ctx.font = 'bold 36px serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 4;
  ctx.fillText('СКРИЖАЛЬ УДАЧИ', 400, 120);
  
  ctx.font = 'italic 20px serif';
  ctx.fillText('Персональный документ силы', 400, 160);
  ctx.shadowBlur = 0;

  // Желание
  ctx.font = 'bold 24px serif';
  ctx.fillText('УДАЧА', 400, 250);
  
  ctx.fillStyle = '#e0e0e0';
  ctx.font = '18px serif';
  const wishText = data.wish || 'ваше желание';
  
  // Разбиваем длинный текст на строки
  const words = wishText.split(' ');
  const lines = [];
  let currentLine = '';
  
  for (const word of words) {
    const testLine = currentLine + (currentLine ? ' ' : '') + word;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > 500 && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  lines.push(currentLine);
  
  lines.forEach((line, index) => {
    ctx.fillText(`"${line}"`, 400, 300 + index * 30);
  });

  // Статистика
  ctx.fillStyle = 'white';
  ctx.font = 'bold 16px serif';
  ctx.textAlign = 'left';
  ctx.fillText(`Уровень силы: ${data.powerLevel}/10`, 80, 450);
  ctx.fillText(`Энергетический вклад: ${data.energyInvestment} ₽`, 80, 480);
  
  // Аффирмации
  ctx.textAlign = 'center';
  ctx.font = 'bold 20px serif';
  ctx.fillText('ПЕРСОНАЛЬНЫЕ АФФИРМАЦИИ', 400, 580);
  ctx.fillText('ПРИНЯТИЕ ЛЮБВИ', 400, 620);
  
  ctx.fillStyle = '#e0e0e0';
  ctx.font = '14px serif';
  
  // Разбиваем аффирмации на строки
  const affWords = data.affirmationText.split(' ');
  const affLines = [];
  let currentAffLine = '';
  
  for (const word of affWords) {
    const testLine = currentAffLine + (currentAffLine ? ' ' : '') + word;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > 600 && currentAffLine) {
      affLines.push(currentAffLine);
      currentAffLine = word;
    } else {
      currentAffLine = testLine;
    }
  }
  affLines.push(currentAffLine);
  
  affLines.forEach((line, index) => {
    ctx.fillText(line, 400, 680 + index * 25);
  });

  // Печать - пентаграмма
  ctx.save();
  ctx.translate(650, 1000);
  
  // Круг для печати
  ctx.fillStyle = 'rgba(0,0,0,0.8)';
  ctx.beginPath();
  ctx.arc(0, 0, 60, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.strokeStyle = 'rgba(168, 85, 247, 0.8)';
  ctx.lineWidth = 3;
  ctx.stroke();
  
  // Пентаграмма
  ctx.strokeStyle = 'rgba(168, 85, 247, 0.6)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  const points = 5;
  const outerRadius = 40;
  const innerRadius = 16;
  
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
  ctx.stroke();
  
  // Текст на печати
  ctx.fillStyle = 'white';
  ctx.font = 'bold 8px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('САЙТ УДАЧИ', 0, -5);
  ctx.font = '6px sans-serif';
  ctx.fillStyle = '#ccc';
  ctx.fillText('POEHALI.DEV', 0, 5);
  ctx.fillText('2025', 0, 15);
  
  ctx.restore();

  // Номер документа
  ctx.fillStyle = 'white';
  ctx.font = '12px serif';
  ctx.textAlign = 'left';
  const timestamp = new Date().toLocaleDateString('ru-RU');
  const docNumber = `WD${Date.now()}${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  ctx.fillText(`Документ №: ${docNumber}`, 80, 1050);
  ctx.fillText(`Дата активации: ${timestamp}`, 80, 1070);
  ctx.fillText(`Получатель: ${data.userName || 'Получатель силы'}`, 80, 1090);

  // Предупреждение
  ctx.fillStyle = '#ffd700';
  ctx.font = 'bold 14px serif';
  ctx.textAlign = 'center';
  ctx.fillText('⚠️ ДОКУМЕНТ ДЕЙСТВУЕТ ПОСЛЕ ОПЛАТЫ СИЛЫ! ⚠️', 400, 1140);

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