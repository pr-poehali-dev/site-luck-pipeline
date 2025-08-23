export interface DocumentData {
  wish: string;
  powerLevel: number;
  userName?: string;
  energyInvestment: number;
  affirmationText: string;
}

export const generateLuckDocument = async (data: DocumentData): Promise<void> => {
  try {
    console.log('Generating beautiful document matching demo design');
    return await generateBeautifulDocument(data);
    
  } catch (error) {
    console.error('Error generating document:', error);
    throw new Error('Не удалось создать документ. Попробуйте еще раз.');
  }
};

const generateBeautifulDocument = async (data: DocumentData): Promise<void> => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Cannot create canvas context');
  }

  // Размеры A4 документа
  canvas.width = 1240;
  canvas.height = 1754;

  // СЛОЖНЫЙ МНОГОСЛОЙНЫЙ ФОН КАК В ДЕМО
  // Основной фиолетовый градиент
  const mainGradient = ctx.createLinearGradient(0, 0, 1240, 1754);
  mainGradient.addColorStop(0, '#1a0b3d');
  mainGradient.addColorStop(0.1, '#2d1b69');
  mainGradient.addColorStop(0.2, '#4c1d95');
  mainGradient.addColorStop(0.3, '#5b21b6');
  mainGradient.addColorStop(0.4, '#7c3aed');
  mainGradient.addColorStop(0.5, '#8b5cf6');
  mainGradient.addColorStop(0.6, '#a855f7');
  mainGradient.addColorStop(0.7, '#c084fc');
  mainGradient.addColorStop(0.8, '#7c3aed');
  mainGradient.addColorStop(0.9, '#5b21b6');
  mainGradient.addColorStop(1, '#2d1b69');
  
  ctx.fillStyle = mainGradient;
  ctx.fillRect(0, 0, 1240, 1754);

  // Радиальные световые эффекты
  const radial1 = ctx.createRadialGradient(248, 525, 0, 248, 525, 600);
  radial1.addColorStop(0, 'rgba(168, 85, 247, 0.6)');
  radial1.addColorStop(0.7, 'rgba(168, 85, 247, 0.2)');
  radial1.addColorStop(1, 'transparent');
  ctx.fillStyle = radial1;
  ctx.fillRect(0, 0, 1240, 1754);

  const radial2 = ctx.createRadialGradient(992, 1229, 0, 992, 1229, 500);
  radial2.addColorStop(0, 'rgba(124, 58, 237, 0.5)');
  radial2.addColorStop(0.7, 'rgba(124, 58, 237, 0.2)');
  radial2.addColorStop(1, 'transparent');
  ctx.fillStyle = radial2;
  ctx.fillRect(0, 0, 1240, 1754);

  const radial3 = ctx.createRadialGradient(620, 877, 0, 620, 877, 400);
  radial3.addColorStop(0, 'rgba(91, 33, 182, 0.3)');
  radial3.addColorStop(1, 'transparent');
  ctx.fillStyle = radial3;
  ctx.fillRect(0, 0, 1240, 1754);

  // СЛОЖНАЯ МНОГОСЛОЙНАЯ РАМКА (КАК В ДЕМО)
  ctx.save();
  
  // Первая рамка (самая внешняя)
  const border1 = ctx.createLinearGradient(0, 0, 1240, 1754);
  border1.addColorStop(0, 'rgba(0,0,0,0.9)');
  border1.addColorStop(0.1, 'rgba(30,30,30,0.8)');
  border1.addColorStop(0.2, 'rgba(60,60,60,0.6)');
  border1.addColorStop(0.3, 'rgba(30,30,30,0.8)');
  border1.addColorStop(0.4, 'rgba(0,0,0,0.9)');
  border1.addColorStop(0.6, 'rgba(30,30,30,0.8)');
  border1.addColorStop(0.7, 'rgba(60,60,60,0.6)');
  border1.addColorStop(0.8, 'rgba(30,30,30,0.8)');
  border1.addColorStop(1, 'rgba(0,0,0,0.9)');
  
  ctx.strokeStyle = border1;
  ctx.lineWidth = 12;
  ctx.strokeRect(6, 6, 1228, 1742);

  // Вторая рамка
  const border2 = ctx.createLinearGradient(0, 0, 1240, 0);
  border2.addColorStop(0, 'rgba(75,75,75,0.4)');
  border2.addColorStop(0.25, 'rgba(20,20,20,0.8)');
  border2.addColorStop(0.5, 'rgba(0,0,0,0.95)');
  border2.addColorStop(0.75, 'rgba(20,20,20,0.8)');
  border2.addColorStop(1, 'rgba(75,75,75,0.4)');
  
  ctx.strokeStyle = border2;
  ctx.lineWidth = 10;
  ctx.strokeRect(18, 18, 1204, 1718);

  // Третья рамка
  ctx.strokeStyle = 'rgba(40, 40, 40, 0.8)';
  ctx.lineWidth = 8;
  ctx.strokeRect(28, 28, 1184, 1698);

  // Четвёртая рамка
  ctx.strokeStyle = 'rgba(60, 60, 60, 0.6)';
  ctx.lineWidth = 6;
  ctx.strokeRect(36, 36, 1168, 1682);

  // Внутренняя рамка
  ctx.strokeStyle = 'rgba(75, 75, 75, 0.4)';
  ctx.lineWidth = 4;
  ctx.strokeRect(44, 44, 1152, 1666);

  ctx.restore();

  // УГЛОВЫЕ ДЕКОРАТИВНЫЕ ЭЛЕМЕНТЫ
  // Верхний левый
  ctx.save();
  const cornerGrad1 = ctx.createRadialGradient(70, 70, 0, 70, 70, 30);
  cornerGrad1.addColorStop(0, 'rgba(255,255,255,0.4)');
  cornerGrad1.addColorStop(0.3, 'rgba(168, 85, 247, 0.6)');
  cornerGrad1.addColorStop(1, 'transparent');
  ctx.fillStyle = cornerGrad1;
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(90, 50);
  ctx.lineTo(50, 90);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Верхний правый
  ctx.save();
  ctx.fillStyle = 'rgba(168, 85, 247, 0.6)';
  ctx.beginPath();
  ctx.moveTo(1190, 50);
  ctx.lineTo(1150, 50);
  ctx.lineTo(1190, 90);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Нижний левый
  ctx.save();
  ctx.fillStyle = 'rgba(168, 85, 247, 0.6)';
  ctx.beginPath();
  ctx.moveTo(50, 1704);
  ctx.lineTo(90, 1704);
  ctx.lineTo(50, 1664);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Нижний правый
  ctx.save();
  ctx.fillStyle = 'rgba(168, 85, 247, 0.6)';
  ctx.beginPath();
  ctx.moveTo(1190, 1704);
  ctx.lineTo(1150, 1704);
  ctx.lineTo(1190, 1664);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // ЗАГОЛОВОК - СКРИЖАЛЬ УДАЧИ
  ctx.save();
  
  // Фон заголовка
  const headerBg = ctx.createLinearGradient(60, 120, 1180, 280);
  headerBg.addColorStop(0, 'rgba(255,255,255,0.15)');
  headerBg.addColorStop(0.5, 'rgba(168, 85, 247, 0.25)');
  headerBg.addColorStop(1, 'rgba(0,0,0,0.1)');
  
  ctx.fillStyle = headerBg;
  ctx.fillRect(60, 120, 1120, 160);
  
  // Дополнительный световой эффект
  const headerLight = ctx.createLinearGradient(60, 150, 1180, 200);
  headerLight.addColorStop(0, 'transparent');
  headerLight.addColorStop(0.5, 'rgba(255,255,255,0.1)');
  headerLight.addColorStop(1, 'transparent');
  ctx.fillStyle = headerLight;
  ctx.fillRect(60, 150, 1120, 50);
  
  // Главный заголовок
  ctx.fillStyle = 'white';
  ctx.font = 'bold 72px serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(255,255,255,0.8)';
  ctx.shadowBlur = 15;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.fillText('СКРИЖАЛЬ УДАЧИ', 620, 215);
  
  // Подзаголовок
  ctx.font = 'italic 36px serif';
  ctx.fillStyle = 'rgba(168, 85, 247, 0.9)';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 6;
  ctx.fillText('Персональный документ силы', 620, 260);
  
  ctx.restore();

  // СЕКЦИЯ УДАЧА
  ctx.save();
  
  // Фон секции
  const wishBg = ctx.createLinearGradient(60, 320, 1180, 520);
  wishBg.addColorStop(0, 'rgba(255,255,255,0.1)');
  wishBg.addColorStop(0.5, 'rgba(168, 85, 247, 0.2)');
  wishBg.addColorStop(1, 'rgba(0,0,0,0.1)');
  
  ctx.fillStyle = wishBg;
  ctx.fillRect(60, 320, 1120, 200);
  
  // Заголовок УДАЧА
  ctx.fillStyle = 'white';
  ctx.font = 'bold 56px serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(255,255,255,0.6)';
  ctx.shadowBlur = 10;
  ctx.fillText('УДАЧА', 620, 380);
  
  // Поле для желания
  const textFieldBg = ctx.createLinearGradient(120, 410, 1120, 500);
  textFieldBg.addColorStop(0, 'rgba(0,0,0,0.3)');
  textFieldBg.addColorStop(0.5, 'rgba(0,0,0,0.4)');
  textFieldBg.addColorStop(1, 'rgba(0,0,0,0.3)');
  
  ctx.fillStyle = textFieldBg;
  ctx.fillRect(120, 410, 1000, 90);
  
  // Текст желания
  ctx.fillStyle = 'rgba(168, 85, 247, 0.9)';
  ctx.font = '32px serif';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 3;
  
  // Разбивка текста на строки
  const wishText = `"${data.wish || 'ваше желание'}"`;
  const words = wishText.split(' ');
  const lines = [];
  let currentLine = '';
  
  for (const word of words) {
    const testLine = currentLine + (currentLine ? ' ' : '') + word;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > 900 && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  lines.push(currentLine);
  
  const wishStartY = 445;
  lines.forEach((line, index) => {
    ctx.fillText(line, 620, wishStartY + index * 40);
  });
  
  ctx.restore();

  // СТАТИСТИКА
  ctx.save();
  
  // Блок уровня силы
  const powerBg = ctx.createLinearGradient(60, 560, 1180, 630);
  powerBg.addColorStop(0, 'rgba(168, 85, 247, 0.3)');
  powerBg.addColorStop(0.5, 'rgba(0,0,0,0.4)');
  powerBg.addColorStop(1, 'rgba(168, 85, 247, 0.3)');
  
  ctx.fillStyle = powerBg;
  ctx.fillRect(60, 560, 1120, 70);
  
  ctx.fillStyle = 'white';
  ctx.font = 'bold 36px serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(0,0,0,0.9)';
  ctx.shadowBlur = 4;
  ctx.fillText(`Уровень силы: ${data.powerLevel}/10`, 620, 610);
  
  // Блок энергетического вклада
  const energyBg = ctx.createLinearGradient(60, 650, 1180, 720);
  energyBg.addColorStop(0, 'rgba(168, 85, 247, 0.3)');
  energyBg.addColorStop(0.5, 'rgba(0,0,0,0.4)');
  energyBg.addColorStop(1, 'rgba(168, 85, 247, 0.3)');
  
  ctx.fillStyle = energyBg;
  ctx.fillRect(60, 650, 1120, 70);
  
  ctx.fillStyle = 'white';
  ctx.fillText(`Энергетический вклад: ${data.energyInvestment} ₽`, 620, 700);
  
  ctx.restore();

  // СЕКЦИЯ АФФИРМАЦИЙ
  ctx.save();
  
  // Заголовок аффирмаций
  ctx.fillStyle = 'white';
  ctx.font = 'bold 48px serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(255,255,255,0.6)';
  ctx.shadowBlur = 10;
  ctx.fillText('ПЕРСОНАЛЬНЫЕ АФФИРМАЦИИ', 620, 800);
  
  // Подзаголовок
  ctx.font = 'bold 38px serif';
  ctx.fillStyle = 'rgba(168, 85, 247, 0.9)';
  ctx.shadowColor = 'rgba(168, 85, 247, 0.8)';
  ctx.shadowBlur = 8;
  ctx.fillText('ПРИНЯТИЕ ЛЮБВИ', 620, 850);
  
  // Фон для текста аффирмаций
  const affBg = ctx.createLinearGradient(60, 880, 1180, 1080);
  affBg.addColorStop(0, 'rgba(0,0,0,0.2)');
  affBg.addColorStop(0.5, 'rgba(0,0,0,0.3)');
  affBg.addColorStop(1, 'rgba(0,0,0,0.2)');
  
  ctx.fillStyle = affBg;
  ctx.fillRect(60, 880, 1120, 200);
  
  // Текст аффирмаций
  ctx.fillStyle = 'rgba(168, 85, 247, 0.9)';
  ctx.font = '28px serif';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 3;
  
  const affWords = data.affirmationText.split(' ');
  const affLines = [];
  let currentAffLine = '';
  
  for (const word of affWords) {
    const testLine = currentAffLine + (currentAffLine ? ' ' : '') + word;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > 1000 && currentAffLine) {
      affLines.push(currentAffLine);
      currentAffLine = word;
    } else {
      currentAffLine = testLine;
    }
  }
  affLines.push(currentAffLine);
  
  const affStartY = 920;
  affLines.forEach((line, index) => {
    ctx.fillText(line, 620, affStartY + index * 40);
  });
  
  ctx.restore();

  // КРУГЛАЯ ПЕЧАТЬ (КАК В ДЕМО)
  ctx.save();
  ctx.translate(950, 1300);
  
  // Внешние декоративные лучи (тёмные)
  ctx.strokeStyle = 'rgba(30, 30, 30, 0.8)';
  ctx.lineWidth = 3;
  for (let i = 0; i < 12; i++) {
    const angle = (i * Math.PI * 2) / 12;
    const x1 = Math.cos(angle) * 100;
    const y1 = Math.sin(angle) * 100;
    const x2 = Math.cos(angle) * 85;
    const y2 = Math.sin(angle) * 85;
    
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    
    // Декоративные точки
    ctx.fillStyle = 'rgba(50, 50, 50, 0.9)';
    ctx.beginPath();
    ctx.arc(x1, y1, 3, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Основной круг печати
  const sealGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 80);
  sealGradient.addColorStop(0, 'rgba(255,255,255,0.3)');
  sealGradient.addColorStop(0.3, 'rgba(168, 85, 247, 0.4)');
  sealGradient.addColorStop(1, 'rgba(0,0,0,0.3)');
  
  ctx.fillStyle = sealGradient;
  ctx.beginPath();
  ctx.arc(0, 0, 80, 0, Math.PI * 2);
  ctx.fill();
  
  // Коническая окружность
  ctx.strokeStyle = 'rgba(255,255,255,0.4)';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(0, 0, 75, 0, Math.PI * 2);
  ctx.stroke();
  
  // Внутренняя рамка
  ctx.strokeStyle = 'rgba(168, 85, 247, 0.8)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(0, 0, 70, 0, Math.PI * 2);
  ctx.stroke();
  
  // Многоугольная форма (имитация clipPath)
  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI * 2) / 8;
    const x = Math.cos(angle) * 65;
    const y = Math.sin(angle) * 65;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
  
  // Текст печати
  ctx.fillStyle = 'white';
  ctx.font = 'bold 18px sans-serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(0,0,0,0.9)';
  ctx.shadowBlur = 4;
  ctx.fillText('САЙТ ЖЕЛАНИЙ', 0, -15);
  
  ctx.font = '14px sans-serif';
  ctx.fillStyle = 'rgba(168, 85, 247, 0.9)';
  ctx.fillText('POEHALI.DEV', 0, 5);
  
  ctx.font = '14px sans-serif';
  ctx.fillText('2025', 0, 25);
  
  ctx.restore();

  // ИНФОРМАЦИЯ О ДОКУМЕНТЕ
  ctx.save();
  
  // Фон для информации
  const infoBg = ctx.createLinearGradient(60, 1400, 800, 1550);
  infoBg.addColorStop(0, 'rgba(0,0,0,0.4)');
  infoBg.addColorStop(1, 'rgba(168, 85, 247, 0.2)');
  
  ctx.fillStyle = infoBg;
  ctx.fillRect(60, 1400, 740, 150);
  
  // Данные документа
  const timestamp = new Date().toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  const docNumber = `WD${Date.now()}${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  
  ctx.fillStyle = 'white';
  ctx.font = 'bold 24px serif';
  ctx.textAlign = 'left';
  ctx.shadowColor = 'rgba(0,0,0,0.9)';
  ctx.shadowBlur = 3;
  
  ctx.fillText(`Документ №: ${docNumber}`, 80, 1440);
  ctx.fillText(`Дата активации: ${timestamp}`, 80, 1480);
  
  ctx.font = 'bold 26px serif';
  ctx.fillStyle = 'rgba(168, 85, 247, 0.9)';
  ctx.fillText(`Получатель: ${data.userName || 'Получатель силы'}`, 80, 1520);
  
  ctx.restore();

  // ПРЕДУПРЕЖДЕНИЕ
  ctx.save();
  
  // Фон предупреждения
  const warnGradient = ctx.createLinearGradient(60, 1580, 1180, 1630);
  warnGradient.addColorStop(0, 'rgba(255, 193, 7, 0.9)');
  warnGradient.addColorStop(1, 'rgba(255, 152, 0, 0.8)');
  
  ctx.fillStyle = warnGradient;
  ctx.fillRect(60, 1580, 1120, 50);
  
  ctx.fillStyle = 'black';
  ctx.font = 'bold 30px serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(255,255,255,0.7)';
  ctx.shadowBlur = 3;
  ctx.fillText('⚠️ ДОКУМЕНТ ДЕЙСТВУЕТ ПОСЛЕ ОПЛАТЫ СИЛЫ! ⚠️', 620, 1610);
  
  ctx.restore();

  // ПОЛУЧАТЕЛЬ И EMAIL
  ctx.save();
  
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(60, 1650, 1120, 50);
  
  ctx.fillStyle = 'rgba(168, 85, 247, 0.9)';
  ctx.font = '20px serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 2;
  ctx.fillText(`Получатель: ${data.userName || 'Получатель силы'} • Email: user@example.com`, 620, 1680);
  
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