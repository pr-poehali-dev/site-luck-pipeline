export interface DocumentData {
  wish: string;
  powerLevel: number;
  userName?: string;
  energyInvestment: number;
  affirmationText: string;
}

export const generateLuckDocument = async (data: DocumentData): Promise<void> => {
  try {
    console.log('Generating document identical to demo preview');
    return await generateDemoIdenticalDocument(data);
    
  } catch (error) {
    console.error('Error generating document:', error);
    throw new Error('Не удалось создать документ. Попробуйте еще раз.');
  }
};

const generateDemoIdenticalDocument = async (data: DocumentData): Promise<void> => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Cannot create canvas context');
  }

  // Размеры A4 документа (масштаб x3 для четкости)
  canvas.width = 3720; // 1240 * 3
  canvas.height = 5262; // 1754 * 3
  const scale = 3;

  // ОСНОВНОЙ ФОН
  ctx.fillStyle = '#2d1b69';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // ЧЕТКИЕ ЦВЕТОВЫЕ ЗОНЫ БЕЗ ПЕРЕТЕКАНИЯ (как в демо)
  ctx.fillStyle = '#4c1d95';
  ctx.fillRect(600 * scale, 300 * scale, 2400 * scale, 900 * scale);
  
  ctx.fillStyle = '#5b21b6';
  ctx.fillRect(0, 1200 * scale, 1800 * scale, 1200 * scale);
  
  ctx.fillStyle = '#7c3aed';
  ctx.fillRect(1920 * scale, 2400 * scale, 1800 * scale, 1200 * scale);
  
  ctx.fillStyle = '#8b5cf6';
  ctx.fillRect(900 * scale, 3600 * scale, 2100 * scale, 900 * scale);

  // АСИММЕТРИЧНЫЕ РАМКИ КАК В ДЕМО
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 15 * scale;
  ctx.strokeRect(15 * scale, 15 * scale, 3690 * scale, 5232 * scale);
  
  ctx.strokeStyle = '#1a1a1a';
  ctx.lineWidth = 12 * scale;
  ctx.strokeRect(60 * scale, 45 * scale, 3600 * scale, 5172 * scale);
  
  ctx.strokeStyle = '#2a2a2a';
  ctx.lineWidth = 8 * scale;
  ctx.strokeRect(105 * scale, 75 * scale, 3510 * scale, 5112 * scale);
  
  ctx.strokeStyle = '#3c3c3c';
  ctx.lineWidth = 6 * scale;
  ctx.strokeRect(150 * scale, 120 * scale, 3420 * scale, 5022 * scale);
  
  ctx.strokeStyle = '#4b4b4b';
  ctx.lineWidth = 4 * scale;
  ctx.strokeRect(195 * scale, 165 * scale, 3330 * scale, 4932 * scale);

  // АСИММЕТРИЧНЫЕ УГЛОВЫЕ ТРЕУГОЛЬНИКИ
  // Верхний левый - большой
  ctx.fillStyle = '#a855f7';
  ctx.beginPath();
  ctx.moveTo(210 * scale, 210 * scale);
  ctx.lineTo(420 * scale, 210 * scale);
  ctx.lineTo(210 * scale, 420 * scale);
  ctx.closePath();
  ctx.fill();
  
  // Верхний правый - маленький
  ctx.fillStyle = '#c084fc';
  ctx.beginPath();
  ctx.moveTo(3510 * scale, 210 * scale);
  ctx.lineTo(3390 * scale, 210 * scale);
  ctx.lineTo(3510 * scale, 330 * scale);
  ctx.closePath();
  ctx.fill();
  
  // Нижний левый - средний
  ctx.fillStyle = '#8b5cf6';
  ctx.beginPath();
  ctx.moveTo(210 * scale, 5052 * scale);
  ctx.lineTo(360 * scale, 5052 * scale);
  ctx.lineTo(210 * scale, 4902 * scale);
  ctx.closePath();
  ctx.fill();
  
  // Нижний правый - большой
  ctx.fillStyle = '#7c3aed';
  ctx.beginPath();
  ctx.moveTo(3510 * scale, 5052 * scale);
  ctx.lineTo(3300 * scale, 5052 * scale);
  ctx.lineTo(3510 * scale, 4842 * scale);
  ctx.closePath();
  ctx.fill();

  // ЗАГОЛОВОК - АСИММЕТРИЧНЫЙ БЛОК
  // Основной блок заголовка
  ctx.fillStyle = '#1a0b3d';
  ctx.fillRect(360 * scale, 450 * scale, 2700 * scale, 360 * scale);
  
  // Дополнительный блок справа
  ctx.fillStyle = '#4c1d95';
  ctx.fillRect(3060 * scale, 450 * scale, 300 * scale, 360 * scale);
  
  // Рамка заголовка
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 6 * scale;
  ctx.strokeRect(360 * scale, 450 * scale, 3000 * scale, 360 * scale);
  
  // Главный заголовок
  ctx.fillStyle = 'white';
  ctx.font = `bold ${192 * scale}px serif`;
  ctx.textAlign = 'center';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 12 * scale;
  ctx.shadowOffsetX = 6 * scale;
  ctx.shadowOffsetY = 6 * scale;
  ctx.fillText('СКРИЖАЛЬ УДАЧИ', 1860 * scale, 660 * scale);
  
  // Подзаголовок
  ctx.font = `italic ${84 * scale}px serif`;
  ctx.fillStyle = '#a855f7';
  ctx.shadowBlur = 6 * scale;
  ctx.fillText('Персональный документ силы', 1860 * scale, 750 * scale);

  // СЕКЦИЯ УДАЧА - АСИММЕТРИЧНЫЙ БЛОК
  const wishY = 900 * scale;
  
  // Основной блок удачи
  ctx.fillStyle = '#5b21b6';
  ctx.fillRect(240 * scale, wishY, 2850 * scale, 540 * scale);
  
  // Дополнительный блок справа
  ctx.fillStyle = '#7c3aed';
  ctx.fillRect(3090 * scale, wishY + 60 * scale, 420 * scale, 420 * scale);
  
  // Рамка секции удачи
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 6 * scale;
  ctx.strokeRect(240 * scale, wishY, 3270 * scale, 540 * scale);
  
  // Заголовок УДАЧА
  ctx.fillStyle = 'white';
  ctx.font = `bold ${144 * scale}px serif`;
  ctx.textAlign = 'center';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 9 * scale;
  ctx.fillText('УДАЧА', 1860 * scale, wishY + 150 * scale);
  
  // Поле для желания - асимметричное
  ctx.fillStyle = '#1a0b3d';
  ctx.fillRect(420 * scale, wishY + 210 * scale, 2400 * scale, 240 * scale);
  
  // Дополнительное поле
  ctx.fillStyle = '#2d1b69';
  ctx.fillRect(2820 * scale, wishY + 240 * scale, 540 * scale, 180 * scale);
  
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3 * scale;
  ctx.strokeRect(420 * scale, wishY + 210 * scale, 2940 * scale, 240 * scale);
  
  // Текст желания
  ctx.fillStyle = '#a855f7';
  ctx.font = `${78 * scale}px serif`;
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 6 * scale;
  
  const wishText = `"${data.wish || 'ваше желание'}"`;
  const maxWidth = 2250 * scale;
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
  
  const wishStartY = wishY + 300 * scale;
  lines.forEach((line, index) => {
    ctx.fillText(line, 1890 * scale, wishStartY + index * 96 * scale);
  });

  // СТАТИСТИКА - АСИММЕТРИЧНЫЕ БЛОКИ
  const statsY = wishY + 600 * scale;
  
  // Блок уровня силы
  ctx.fillStyle = '#4c1d95';
  ctx.fillRect(300 * scale, statsY, 2100 * scale, 180 * scale);
  
  ctx.fillStyle = '#7c3aed';
  ctx.fillRect(2400 * scale, statsY + 30 * scale, 900 * scale, 120 * scale);
  
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 6 * scale;
  ctx.strokeRect(300 * scale, statsY, 3000 * scale, 180 * scale);
  
  ctx.fillStyle = 'white';
  ctx.font = `bold ${96 * scale}px serif`;
  ctx.textAlign = 'left';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 6 * scale;
  ctx.fillText(`Уровень силы: ${data.powerLevel}/10`, 360 * scale, statsY + 120 * scale);
  
  // Блок энергетического вклада
  const energyY = statsY + 240 * scale;
  ctx.fillStyle = '#8b5cf6';
  ctx.fillRect(450 * scale, energyY, 2400 * scale, 180 * scale);
  
  ctx.fillStyle = '#5b21b6';
  ctx.fillRect(240 * scale, energyY + 30 * scale, 210 * scale, 120 * scale);
  
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 6 * scale;
  ctx.strokeRect(240 * scale, energyY, 3060 * scale, 180 * scale);
  
  ctx.fillStyle = 'white';
  ctx.fillText(`Энергетический вклад: ${data.energyInvestment} ₽`, 360 * scale, energyY + 120 * scale);

  // СЕКЦИЯ АФФИРМАЦИЙ
  const affY = energyY + 360 * scale;
  
  // Заголовок аффирмаций
  ctx.fillStyle = 'white';
  ctx.font = `bold ${126 * scale}px serif`;
  ctx.textAlign = 'center';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 9 * scale;
  ctx.fillText('ПЕРСОНАЛЬНЫЕ АФФИРМАЦИИ', 1860 * scale, affY + 60 * scale);
  
  // Подзаголовок
  ctx.font = `bold ${96 * scale}px serif`;
  ctx.fillStyle = '#a855f7';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 6 * scale;
  ctx.fillText('ПРИНЯТИЕ ЛЮБВИ', 1860 * scale, affY + 180 * scale);
  
  // Блок для текста аффирмаций - сложная асимметричная форма
  const affTextY = affY + 240 * scale;
  ctx.fillStyle = '#1a0b3d';
  ctx.fillRect(360 * scale, affTextY, 2400 * scale, 540 * scale);
  
  ctx.fillStyle = '#2d1b69';
  ctx.fillRect(2760 * scale, affTextY + 60 * scale, 600 * scale, 420 * scale);
  
  ctx.fillStyle = '#4c1d95';
  ctx.fillRect(240 * scale, affTextY + 150 * scale, 120 * scale, 300 * scale);
  
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 6 * scale;
  ctx.strokeRect(240 * scale, affTextY, 3120 * scale, 540 * scale);
  
  // Текст аффирмаций
  ctx.fillStyle = '#a855f7';
  ctx.font = `${72 * scale}px serif`;
  ctx.textAlign = 'center';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 6 * scale;
  
  const affWords = data.affirmationText.split(' ');
  const affLines = [];
  let currentAffLine = '';
  const affMaxWidth = 2700 * scale;
  
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
  
  const affStartY = affTextY + 180 * scale;
  affLines.forEach((line, index) => {
    ctx.fillText(line, 1860 * scale, affStartY + index * 96 * scale);
  });

  // ИНФОРМАЦИЯ О ДОКУМЕНТЕ И ПЕЧАТЬ
  const infoY = affTextY + 720 * scale;
  
  // Генерация данных документа
  const timestamp = new Date().toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  const docNumber = `WD${Date.now()}${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  
  // Блок информации о документе
  ctx.fillStyle = '#1a0b3d';
  ctx.fillRect(240 * scale, infoY, 1800 * scale, 360 * scale);
  
  ctx.fillStyle = '#2d1b69';
  ctx.fillRect(2040 * scale, infoY + 60 * scale, 300 * scale, 240 * scale);
  
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 6 * scale;
  ctx.strokeRect(240 * scale, infoY, 2100 * scale, 360 * scale);
  
  ctx.fillStyle = 'white';
  ctx.font = `bold ${60 * scale}px serif`;
  ctx.textAlign = 'left';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 6 * scale;
  
  ctx.fillText(`Документ №: ${docNumber}`, 300 * scale, infoY + 90 * scale);
  ctx.fillText(`Дата активации:`, 300 * scale, infoY + 180 * scale);
  
  ctx.font = `bold ${66 * scale}px serif`;
  ctx.fillStyle = '#a855f7';
  ctx.fillText(timestamp, 300 * scale, infoY + 270 * scale);

  // АСИММЕТРИЧНАЯ ПЕЧАТЬ
  ctx.save();
  ctx.translate(2850 * scale, infoY + 180 * scale);
  
  // Основной круг печати
  ctx.fillStyle = '#4c1d95';
  ctx.beginPath();
  ctx.arc(0, 0, 210 * scale, 0, Math.PI * 2);
  ctx.fill();
  
  // Дополнительный квадратный элемент поверх
  ctx.fillStyle = '#7c3aed';
  ctx.fillRect(-60 * scale, -60 * scale, 120 * scale, 120 * scale);
  
  // Рамки печати
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 12 * scale;
  ctx.beginPath();
  ctx.arc(0, 0, 195 * scale, 0, Math.PI * 2);
  ctx.stroke();
  
  ctx.lineWidth = 6 * scale;
  ctx.beginPath();
  ctx.arc(0, 0, 174 * scale, 0, Math.PI * 2);
  ctx.stroke();
  
  // Текст печати
  ctx.fillStyle = 'white';
  ctx.font = `bold ${48 * scale}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 6 * scale;
  ctx.fillText('САЙТ ЖЕЛАНИЙ', 0, -30 * scale);
  
  ctx.font = `${36 * scale}px sans-serif`;
  ctx.fillStyle = '#c084fc';
  ctx.fillText('POEHALI.DEV', 0, 24 * scale);
  ctx.fillText('2025', 0, 72 * scale);
  
  ctx.restore();

  // ПРЕДУПРЕЖДЕНИЕ - АСИММЕТРИЧНЫЙ БЛОК
  const warnY = infoY + 480 * scale;
  
  ctx.fillStyle = '#FBC520';
  ctx.fillRect(300 * scale, warnY, 2700 * scale, 150 * scale);
  
  ctx.fillStyle = '#FAB619';
  ctx.fillRect(3000 * scale, warnY + 15 * scale, 420 * scale, 120 * scale);
  
  ctx.strokeStyle = '#F59E0B';
  ctx.lineWidth = 9 * scale;
  ctx.strokeRect(300 * scale, warnY, 3120 * scale, 150 * scale);
  
  ctx.fillStyle = 'black';
  ctx.font = `bold ${78 * scale}px serif`;
  ctx.textAlign = 'center';
  ctx.shadowColor = '#ffffff';
  ctx.shadowBlur = 3 * scale;
  ctx.fillText('⚠️ ДОКУМЕНТ ДЕЙСТВУЕТ ПОСЛЕ ОПЛАТЫ СИЛЫ! ⚠️', 1860 * scale, warnY + 105 * scale);

  // ПОЛУЧАТЕЛЬ И EMAIL - АСИММЕТРИЧНЫЙ БЛОК
  const userY = warnY + 240 * scale;
  
  ctx.fillStyle = '#2d1b69';
  ctx.fillRect(360 * scale, userY, 2400 * scale, 150 * scale);
  
  ctx.fillStyle = '#4c1d95';
  ctx.fillRect(2760 * scale, userY + 30 * scale, 600 * scale, 90 * scale);
  
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3 * scale;
  ctx.strokeRect(360 * scale, userY, 3000 * scale, 150 * scale);
  
  ctx.fillStyle = '#a855f7';
  ctx.font = `${54 * scale}px serif`;
  ctx.textAlign = 'center';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 3 * scale;
  ctx.fillText(`Получатель: ${data.userName || 'Получатель силы'} • Email: user@example.com`, 1860 * scale, userY + 105 * scale);

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