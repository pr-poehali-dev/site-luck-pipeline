export interface DocumentData {
  wish: string;
  powerLevel: number;
  userName?: string;
  energyInvestment: number;
  affirmationText: string;
}

export const generateLuckDocument = async (data: DocumentData): Promise<void> => {
  try {
    console.log('Generating document matching exact demo design');
    return await generateExactDemoDocument(data);
    
  } catch (error) {
    console.error('Error generating document:', error);
    throw new Error('Не удалось создать документ. Попробуйте еще раз.');
  }
};

const generateExactDemoDocument = async (data: DocumentData): Promise<void> => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Cannot create canvas context');
  }

  // Размеры документа высокого разрешения для четкости
  canvas.width = 1240;
  canvas.height = 1754;

  // Основной фон точно как в демо
  ctx.fillStyle = '#2d1b69';
  ctx.fillRect(0, 0, 1240, 1754);

  // Асимметричные цветовые зоны как в демо
  ctx.fillStyle = '#4c1d95';
  ctx.fillRect(200, 100, 800, 300);
  
  ctx.fillStyle = '#5b21b6';
  ctx.fillRect(0, 400, 600, 400);
  
  ctx.fillStyle = '#7c3aed';
  ctx.fillRect(640, 800, 600, 400);
  
  ctx.fillStyle = '#8b5cf6';
  ctx.fillRect(300, 1200, 700, 300);

  // Многослойные рамки как в демо
  const borderColors = ['#000000', '#1a1a1a', '#2a2a2a', '#3c3c3c', '#4b4b4b'];
  const borderWidths = [15, 12, 8, 6, 4];
  const borderOffsets = [5, 20, 35, 50, 65];
  
  borderColors.forEach((color, i) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = borderWidths[i];
    const offset = borderOffsets[i];
    ctx.strokeRect(offset, offset, 1240 - offset * 2, 1754 - offset * 2);
  });

  // Угловые треугольники точно как в демо
  const corners = [
    { x: 70, y: 70, size: 70, color: '#a855f7', type: 'top-left' },
    { x: 1170, y: 70, size: 40, color: '#c084fc', type: 'top-right' },
    { x: 70, y: 1684, size: 50, color: '#8b5cf6', type: 'bottom-left' },
    { x: 1170, y: 1684, size: 70, color: '#7c3aed', type: 'bottom-right' }
  ];
  
  corners.forEach(corner => {
    ctx.fillStyle = corner.color;
    ctx.beginPath();
    
    if (corner.type === 'top-left') {
      ctx.moveTo(corner.x, corner.y);
      ctx.lineTo(corner.x + corner.size, corner.y);
      ctx.lineTo(corner.x, corner.y + corner.size);
    } else if (corner.type === 'top-right') {
      ctx.moveTo(corner.x, corner.y);
      ctx.lineTo(corner.x - corner.size, corner.y);
      ctx.lineTo(corner.x, corner.y + corner.size);
    } else if (corner.type === 'bottom-left') {
      ctx.moveTo(corner.x, corner.y);
      ctx.lineTo(corner.x + corner.size, corner.y);
      ctx.lineTo(corner.x, corner.y - corner.size);
    } else if (corner.type === 'bottom-right') {
      ctx.moveTo(corner.x, corner.y);
      ctx.lineTo(corner.x - corner.size, corner.y);
      ctx.lineTo(corner.x, corner.y - corner.size);
    }
    
    ctx.closePath();
    ctx.fill();
  });

  // Заголовочный блок - асимметричный как в демо
  ctx.fillStyle = '#1a0b3d';
  ctx.fillRect(120, 150, 900, 120);
  
  ctx.fillStyle = '#4c1d95';
  ctx.fillRect(1020, 150, 100, 120);
  
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

  // Секция УДАЧА - асимметричная как в демо
  ctx.fillStyle = '#5b21b6';
  ctx.fillRect(80, 300, 950, 180);
  
  ctx.fillStyle = '#7c3aed';
  ctx.fillRect(1030, 320, 140, 140);
  
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
  ctx.textAlign = 'center';
  ctx.fillText(`"${data.wish || 'ваше желание'}"`, 630, 420);

  // Статистика - асимметричные блоки как в демо
  // Блок уровня силы
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
  
  // Блок энергетического вклада
  ctx.fillStyle = '#8b5cf6';
  ctx.fillRect(150, 600, 800, 60);
  
  ctx.fillStyle = '#5b21b6';
  ctx.fillRect(80, 610, 70, 40);
  
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.strokeRect(80, 600, 1020, 60);
  
  ctx.fillStyle = 'white';
  ctx.fillText(`Энергетический вклад: ${data.energyInvestment} ₽`, 120, 640);

  // Аффирмации - заголовки
  ctx.fillStyle = 'white';
  ctx.font = 'bold 42px serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 3;
  ctx.fillText('ПЕРСОНАЛЬНЫЕ АФФИРМАЦИИ', 620, 740);
  
  ctx.font = 'bold 32px serif';
  ctx.fillStyle = '#a855f7';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 2;
  ctx.fillText('ПРИНЯТИЕ ЛЮБВИ', 620, 780);

  // Блок аффирмаций - сложная асимметричная форма как в демо
  ctx.fillStyle = '#1a0b3d';
  ctx.fillRect(120, 800, 800, 180);
  
  ctx.fillStyle = '#2d1b69';
  ctx.fillRect(920, 820, 200, 140);
  
  ctx.fillStyle = '#4c1d95';
  ctx.fillRect(80, 850, 40, 100);
  
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.strokeRect(80, 800, 1040, 180);
  
  // Текст аффирмаций с переносом строк
  ctx.fillStyle = '#a855f7';
  ctx.font = '24px serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 2;
  
  const affWords = data.affirmationText.split(' ');
  const affLines = [];
  let currentLine = '';
  const maxWidth = 900;
  
  for (const word of affWords) {
    const testLine = currentLine + (currentLine ? ' ' : '') + word;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && currentLine) {
      affLines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  affLines.push(currentLine);
  
  const affStartY = 840;
  affLines.slice(0, 4).forEach((line, index) => {
    ctx.fillText(line, 620, affStartY + index * 32);
  });

  // Генерация данных документа
  const timestamp = new Date().toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  const docNumber = `WD${Date.now()}${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

  // Информация о документе - асимметричный блок как в демо
  ctx.fillStyle = '#1a0b3d';
  ctx.fillRect(80, 1050, 600, 120);
  
  ctx.fillStyle = '#2d1b69';
  ctx.fillRect(680, 1070, 100, 80);
  
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.strokeRect(80, 1050, 700, 120);
  
  ctx.fillStyle = 'white';
  ctx.font = 'bold 20px serif';
  ctx.textAlign = 'left';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 2;
  
  ctx.fillText(`Документ №: ${docNumber}`, 100, 1080);
  ctx.fillText(`Дата активации:`, 100, 1110);
  
  ctx.font = 'bold 22px serif';
  ctx.fillStyle = '#a855f7';
  ctx.fillText(timestamp, 100, 1140);

  // Печать - асимметричная как в демо
  ctx.save();
  ctx.translate(950, 1110);
  
  // Основной круг
  ctx.fillStyle = '#4c1d95';
  ctx.beginPath();
  ctx.arc(0, 0, 70, 0, Math.PI * 2);
  ctx.fill();
  
  // Квадрат поверх
  ctx.fillStyle = '#7c3aed';
  ctx.fillRect(-20, -20, 40, 40);
  
  // Рамки разной толщины
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(0, 0, 65, 0, Math.PI * 2);
  ctx.stroke();
  
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, 58, 0, Math.PI * 2);
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

  // Предупреждение - асимметричный блок как в демо
  ctx.fillStyle = '#FBC520';
  ctx.fillRect(100, 1250, 900, 50);
  
  ctx.fillStyle = '#FAB619';
  ctx.fillRect(1000, 1255, 140, 40);
  
  ctx.strokeStyle = '#F59E0B';
  ctx.lineWidth = 3;
  ctx.strokeRect(100, 1250, 1040, 50);
  
  ctx.fillStyle = 'black';
  ctx.font = 'bold 26px serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = '#ffffff';
  ctx.shadowBlur = 1;
  ctx.fillText('⚠️ ДОКУМЕНТ ДЕЙСТВУЕТ ПОСЛЕ ОПЛАТЫ СИЛЫ! ⚠️', 620, 1280);

  // Получатель - асимметричный блок как в демо
  ctx.fillStyle = '#2d1b69';
  ctx.fillRect(120, 1330, 800, 50);
  
  ctx.fillStyle = '#4c1d95';
  ctx.fillRect(920, 1340, 200, 30);
  
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1;
  ctx.strokeRect(120, 1330, 1000, 50);
  
  ctx.fillStyle = '#a855f7';
  ctx.font = '18px serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 1;
  ctx.fillText(`Получатель: ${data.userName || 'Получатель силы'} • Email: user@example.com`, 620, 1360);

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