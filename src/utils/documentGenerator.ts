export interface DocumentData {
  wish: string;
  powerLevel: number;
  userName?: string;
  energyInvestment: number;
  affirmationText: string;
}

// Функция для скачивания документа в точном соответствии с демо
export const generateLuckDocument = async (data: DocumentData): Promise<void> => {
  try {
    console.log('Generating document to match demo design exactly');
    return await generateDemoStyleDocument(data);
    
  } catch (error) {
    console.error('Error generating document:', error);
    throw new Error('Не удалось создать документ. Попробуйте еще раз.');
  }
};

// Генератор документа в точном соответствии с демо-стилем
const generateDemoStyleDocument = async (data: DocumentData): Promise<void> => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Cannot create canvas context');
  }

  // Размеры документа A4 (соответствуют 210mm x 297mm)
  canvas.width = 1240;
  canvas.height = 1754;

  // Сложный фиолетовый градиентный фон (как в демо)
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

  // Радиальные градиенты для текстуры (как в демо)
  const radial1 = ctx.createRadialGradient(248, 526, 0, 248, 526, 500);
  radial1.addColorStop(0, 'rgba(168, 85, 247, 0.6)');
  radial1.addColorStop(1, 'transparent');
  ctx.fillStyle = radial1;
  ctx.fillRect(0, 0, 1240, 1754);

  const radial2 = ctx.createRadialGradient(992, 1228, 0, 992, 1228, 400);
  radial2.addColorStop(0, 'rgba(124, 58, 237, 0.5)');
  radial2.addColorStop(1, 'transparent');
  ctx.fillStyle = radial2;
  ctx.fillRect(0, 0, 1240, 1754);

  // Сложная многослойная рамка (точно как в демо - 5 слоев)
  // Первый слой (самый внешний)
  const border1Gradient = ctx.createLinearGradient(0, 0, 1240, 1754);
  border1Gradient.addColorStop(0, 'rgba(0,0,0,0.9)');
  border1Gradient.addColorStop(0.1, 'rgba(30,30,30,0.8)');
  border1Gradient.addColorStop(0.2, 'rgba(60,60,60,0.6)');
  border1Gradient.addColorStop(0.5, 'rgba(0,0,0,0.95)');
  border1Gradient.addColorStop(1, 'rgba(30,30,30,0.8)');
  
  ctx.strokeStyle = border1Gradient;
  ctx.lineWidth = 12;
  ctx.strokeRect(6, 6, 1228, 1742);

  // Второй слой
  ctx.strokeStyle = 'rgba(20, 20, 20, 0.9)';
  ctx.lineWidth = 8;
  ctx.strokeRect(18, 18, 1204, 1718);

  // Третий слой
  ctx.strokeStyle = 'rgba(40, 40, 40, 0.8)';
  ctx.lineWidth = 6;
  ctx.strokeRect(26, 26, 1188, 1702);

  // Четвертый слой
  ctx.strokeStyle = 'rgba(60, 60, 60, 0.6)';
  ctx.lineWidth = 4;
  ctx.strokeRect(32, 32, 1176, 1690);

  // Пятый слой (внутренний)
  ctx.strokeStyle = 'rgba(75, 75, 75, 0.4)';
  ctx.lineWidth = 2;
  ctx.strokeRect(36, 36, 1168, 1682);

  // Угловые декоративные элементы (как в демо)
  // Верхний левый угол
  ctx.save();
  ctx.fillStyle = ctx.createRadialGradient(60, 60, 0, 60, 60, 20);
  ctx.fillStyle.addColorStop(0, 'rgba(255,255,255,0.4)');
  ctx.fillStyle.addColorStop(1, 'rgba(168, 85, 247, 0.6)');
  ctx.beginPath();
  ctx.moveTo(40, 40);
  ctx.lineTo(80, 40);
  ctx.lineTo(40, 80);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Верхний правый угол
  ctx.save();
  ctx.fillStyle = 'rgba(168, 85, 247, 0.6)';
  ctx.beginPath();
  ctx.moveTo(1200, 40);
  ctx.lineTo(1160, 40);
  ctx.lineTo(1200, 80);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Нижний левый угол
  ctx.save();
  ctx.fillStyle = 'rgba(168, 85, 247, 0.6)';
  ctx.beginPath();
  ctx.moveTo(40, 1714);
  ctx.lineTo(80, 1714);
  ctx.lineTo(40, 1674);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Нижний правый угол
  ctx.save();
  ctx.fillStyle = 'rgba(168, 85, 247, 0.6)';
  ctx.beginPath();
  ctx.moveTo(1200, 1714);
  ctx.lineTo(1160, 1714);
  ctx.lineTo(1200, 1674);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Заголовок в рамке (точно как в демо)
  ctx.save();
  
  // Фон для заголовка
  const headerBg = ctx.createLinearGradient(240, 120, 1000, 280);
  headerBg.addColorStop(0, 'rgba(255,255,255,0.15)');
  headerBg.addColorStop(0.5, 'rgba(168, 85, 247, 0.25)');
  headerBg.addColorStop(1, 'rgba(0,0,0,0.1)');
  
  ctx.fillStyle = headerBg;
  ctx.fillRect(240, 120, 760, 160);
  
  // Рамка для заголовка
  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth = 4;
  ctx.strokeRect(240, 120, 760, 160);
  
  // Внутренняя подсветка
  ctx.strokeStyle = 'rgba(255,255,255,0.1)';
  ctx.lineWidth = 1;
  ctx.strokeRect(244, 124, 752, 152);
  
  // Главный заголовок
  ctx.fillStyle = 'white';
  ctx.font = 'bold 64px serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(255,255,255,0.8)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.fillText('СКРИЖАЛЬ УДАЧИ', 620, 210);
  
  // Подзаголовок
  ctx.font = 'italic 32px serif';
  ctx.fillStyle = 'rgba(168, 85, 247, 0.9)';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 4;
  ctx.fillText('Персональный документ силы', 620, 250);
  
  ctx.restore();

  // Секция УДАЧА (как в демо)
  ctx.save();
  
  // Фон для секции удачи
  const wishBg = ctx.createLinearGradient(240, 320, 1000, 520);
  wishBg.addColorStop(0, 'rgba(255,255,255,0.1)');
  wishBg.addColorStop(0.5, 'rgba(168, 85, 247, 0.2)');
  wishBg.addColorStop(1, 'rgba(0,0,0,0.1)');
  
  ctx.fillStyle = wishBg;
  ctx.fillRect(240, 320, 760, 200);
  
  ctx.strokeStyle = 'rgba(255,255,255,0.25)';
  ctx.lineWidth = 2;
  ctx.strokeRect(240, 320, 760, 200);
  
  // Заголовок УДАЧА
  ctx.fillStyle = 'white';
  ctx.font = 'bold 48px serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(255,255,255,0.6)';
  ctx.shadowBlur = 8;
  ctx.fillText('УДАЧА', 620, 370);
  
  // Поле для текста желания
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.fillRect(290, 390, 660, 100);
  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  ctx.lineWidth = 2;
  ctx.strokeRect(290, 390, 660, 100);
  
  // Текст желания
  ctx.fillStyle = 'rgba(168, 85, 247, 0.9)';
  ctx.font = '28px serif';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 2;
  
  const wishText = data.wish || 'ваше желание';
  const words = wishText.split(' ');
  const lines = [];
  let currentLine = '';
  
  for (const word of words) {
    const testLine = currentLine + (currentLine ? ' ' : '') + word;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > 600 && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  lines.push(currentLine);
  
  const startY = 435 - (lines.length - 1) * 15;
  lines.forEach((line, index) => {
    ctx.fillText(`"${line}"`, 620, startY + index * 35);
  });
  
  ctx.restore();

  // Статистические блоки (как в демо - отдельные блоки)
  ctx.save();
  
  // Блок "Уровень силы"
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(240, 560, 760, 60);
  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  ctx.lineWidth = 2;
  ctx.strokeRect(240, 560, 760, 60);
  
  ctx.fillStyle = 'white';
  ctx.font = 'bold 30px serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 2;
  ctx.fillText(`Уровень силы: ${data.powerLevel}/10`, 620, 600);
  
  // Блок "Энергетический вклад"
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(240, 640, 760, 60);
  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  ctx.lineWidth = 2;
  ctx.strokeRect(240, 640, 760, 60);
  
  ctx.fillStyle = 'white';
  ctx.fillText(`Энергетический вклад: ${data.energyInvestment} ₽`, 620, 680);
  
  ctx.restore();

  // Секция аффирмаций (как в демо)
  ctx.save();
  
  // Заголовок аффирмаций
  ctx.fillStyle = 'white';
  ctx.font = 'bold 42px serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(255,255,255,0.6)';
  ctx.shadowBlur = 8;
  ctx.fillText('ПЕРСОНАЛЬНЫЕ АФФИРМАЦИИ', 620, 780);
  
  // Подзаголовок
  ctx.font = 'bold 32px serif';
  ctx.fillStyle = 'rgba(168, 85, 247, 0.9)';
  ctx.shadowColor = 'rgba(168, 85, 247, 0.8)';
  ctx.shadowBlur = 6;
  ctx.fillText('ПРИНЯТИЕ ЛЮБВИ', 620, 830);
  
  // Фон для аффирмаций
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(290, 860, 660, 200);
  ctx.strokeStyle = 'rgba(255,255,255,0.15)';
  ctx.lineWidth = 2;
  ctx.strokeRect(290, 860, 660, 200);
  
  // Текст аффирмаций
  ctx.fillStyle = 'rgba(168, 85, 247, 0.9)';
  ctx.font = '24px serif';
  ctx.shadowBlur = 2;
  
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
  
  const affStartY = 920;
  affLines.forEach((line, index) => {
    ctx.fillText(line, 620, affStartY + index * 35);
  });
  
  ctx.restore();

  // Круглая печать (как в демо - БЕЗ пентаграммы, только круг)
  ctx.save();
  ctx.translate(920, 1300);
  
  // Внешний круг с градиентом
  const sealGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 60);
  sealGradient.addColorStop(0, 'rgba(255,255,255,0.3)');
  sealGradient.addColorStop(0.3, 'rgba(168, 85, 247, 0.4)');
  sealGradient.addColorStop(1, 'rgba(0,0,0,0.3)');
  
  ctx.fillStyle = sealGradient;
  ctx.beginPath();
  ctx.arc(0, 0, 60, 0, Math.PI * 2);
  ctx.fill();
  
  // Коническая окружность (как в демо)
  const conicGradient = ctx.createConicGradient(0, 0, 0);
  conicGradient.addColorStop(0, 'rgba(255,255,255,0.4)');
  conicGradient.addColorStop(0.25, 'rgba(168, 85, 247, 0.6)');
  conicGradient.addColorStop(0.5, 'rgba(124, 58, 237, 0.8)');
  conicGradient.addColorStop(0.75, 'rgba(168, 85, 247, 0.6)');
  conicGradient.addColorStop(1, 'rgba(255,255,255,0.4)');
  
  ctx.strokeStyle = conicGradient;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(0, 0, 57, 0, Math.PI * 2);
  ctx.stroke();
  
  // Внутренняя рамка
  ctx.strokeStyle = 'rgba(255,255,255,0.4)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, 54, 0, Math.PI * 2);
  ctx.stroke();
  
  // Многоугольная обрезка (clipPath polygon эффект)
  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  ctx.lineWidth = 1;
  const sides = 8;
  ctx.beginPath();
  for (let i = 0; i < sides; i++) {
    const angle = (i * Math.PI * 2) / sides;
    const x = Math.cos(angle) * 52;
    const y = Math.sin(angle) * 52;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
  
  // Текст на печати (ВАЖНО: "САЙТ ЖЕЛАНИЙ" как в демо!)
  ctx.fillStyle = 'white';
  ctx.font = 'bold 14px sans-serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 3;
  ctx.fillText('САЙТ ЖЕЛАНИЙ', 0, -10);
  
  ctx.font = '12px sans-serif';
  ctx.fillStyle = 'rgba(168, 85, 247, 0.9)';
  ctx.fillText('POEHALI.DEV', 0, 10);
  
  ctx.font = '12px sans-serif';
  ctx.fillStyle = 'rgba(168, 85, 247, 0.9)';
  ctx.fillText('2025', 0, 30);
  
  ctx.restore();

  // Блок с информацией о документе (левый нижний)
  ctx.save();
  
  // Фон для информации
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(240, 1380, 500, 150);
  ctx.strokeStyle = 'rgba(255,255,255,0.15)';
  ctx.lineWidth = 2;
  ctx.strokeRect(240, 1380, 500, 150);
  
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
  ctx.font = '20px serif';
  ctx.textAlign = 'left';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 2;
  
  ctx.fillText(`Документ №: ${docNumber}`, 250, 1410);
  ctx.fillText(`Дата активации:`, 250, 1440);
  ctx.font = 'bold 22px serif';
  ctx.fillStyle = 'rgba(168, 85, 247, 0.9)';
  ctx.fillText(`${timestamp}`, 250, 1470);
  
  ctx.restore();

  // Центральное предупреждение (как в демо)
  ctx.save();
  
  // Фон для предупреждения
  const warnGradient = ctx.createLinearGradient(240, 1560, 1000, 1610);
  warnGradient.addColorStop(0, 'rgba(255, 193, 7, 0.9)');
  warnGradient.addColorStop(1, 'rgba(255, 152, 0, 0.8)');
  
  ctx.fillStyle = warnGradient;
  ctx.fillRect(240, 1560, 760, 50);
  
  ctx.strokeStyle = 'rgba(255, 193, 7, 0.6)';
  ctx.lineWidth = 4;
  ctx.strokeRect(240, 1560, 760, 50);
  
  // Внутренняя подсветка
  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth = 1;
  ctx.strokeRect(244, 1564, 752, 42);
  
  ctx.fillStyle = 'black';
  ctx.font = 'bold 26px serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(255,255,255,0.5)';
  ctx.shadowBlur = 2;
  ctx.fillText('⚠️ ДОКУМЕНТ ДЕЙСТВУЕТ ПОСЛЕ ОПЛАТЫ СИЛЫ! ⚠️', 620, 1590);
  
  ctx.restore();

  // Информация о получателе (как в демо - внизу по центру)
  ctx.save();
  
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(240, 1640, 760, 50);
  ctx.strokeStyle = 'rgba(255,255,255,0.15)';
  ctx.lineWidth = 1;
  ctx.strokeRect(240, 1640, 760, 50);
  
  ctx.fillStyle = 'rgba(168, 85, 247, 0.9)';
  ctx.font = '18px serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 2;
  ctx.fillText(`Получатель: ${data.userName || 'Получатель силы'} • Email: user@example.com`, 620, 1670);
  
  ctx.restore();

  // Скачиваем изображение
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