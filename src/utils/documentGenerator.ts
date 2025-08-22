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
      throw new Error('Document element not found');
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