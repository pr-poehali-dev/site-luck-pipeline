export interface DocumentData {
  wish: string;
  powerLevel: number;
  userName?: string;
  energyInvestment: number;
  affirmationText: string;
}

export const generateLuckDocument = async (data: DocumentData): Promise<void> => {
  try {
    console.log('Generating simple working document');
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Canvas не поддерживается');
    }

    // Простые размеры
    canvas.width = 800;
    canvas.height = 1000;

    // Фон
    ctx.fillStyle = '#2d1b69';
    ctx.fillRect(0, 0, 800, 1000);

    // Простая рамка
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.strokeRect(20, 20, 760, 960);

    // Заголовок
    ctx.fillStyle = 'white';
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('СКРИЖАЛЬ УДАЧИ', 400, 80);

    ctx.font = '16px Arial';
    ctx.fillStyle = '#a855f7';
    ctx.fillText('Персональный документ силы', 400, 110);

    // Удача
    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px Arial';
    ctx.fillText('УДАЧА', 400, 160);

    // Желание
    ctx.fillStyle = '#a855f7';
    ctx.font = '14px Arial';
    const wishText = data.wish.length > 50 ? data.wish.substring(0, 50) + '...' : data.wish;
    ctx.fillText(`"${wishText}"`, 400, 200);

    // Статистика
    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Уровень силы: ${data.powerLevel}/10`, 50, 260);
    ctx.fillText(`Энергетический вклад: ${data.energyInvestment} ₽`, 50, 290);

    // Аффирмации
    ctx.textAlign = 'center';
    ctx.font = 'bold 18px Arial';
    ctx.fillText('ПЕРСОНАЛЬНЫЕ АФФИРМАЦИИ', 400, 340);
    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = '#a855f7';
    ctx.fillText('ПРИНЯТИЕ ЛЮБВИ', 400, 365);

    // Текст аффирмаций
    ctx.font = '12px Arial';
    const affText = data.affirmationText.length > 80 ? data.affirmationText.substring(0, 80) + '...' : data.affirmationText;
    ctx.fillText(affText, 400, 400);

    // Печать
    ctx.fillStyle = '#4c1d95';
    ctx.beginPath();
    ctx.arc(650, 500, 30, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = 'white';
    ctx.font = 'bold 8px Arial';
    ctx.fillText('POEHALI.DEV', 650, 505);

    // Дата
    const now = new Date();
    const dateStr = now.toLocaleDateString('ru-RU');
    ctx.fillStyle = 'white';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Дата: ${dateStr}`, 50, 600);
    ctx.fillText(`Документ №: WD${Date.now()}`, 50, 620);

    // Предупреждение
    ctx.fillStyle = '#FBC520';
    ctx.fillRect(50, 750, 700, 40);
    ctx.fillStyle = 'black';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('⚠️ ДОКУМЕНТ ДЕЙСТВУЕТ ПОСЛЕ ОПЛАТЫ СИЛЫ! ⚠️', 400, 775);

    // Получатель
    ctx.fillStyle = '#a855f7';
    ctx.font = '10px Arial';
    ctx.fillText(`Получатель: ${data.userName || 'Получатель силы'} • Email: user@example.com`, 400, 850);

    // Скачивание
    setTimeout(() => {
      canvas.toBlob((blob) => {
        if (blob) {
          const link = document.createElement('a');
          link.download = 'Скрижаль_Удачи.png';
          link.href = URL.createObjectURL(blob);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(link.href);
          console.log('Документ успешно скачан');
        } else {
          console.error('Не удалось создать blob');
        }
      }, 'image/png');
    }, 100);
    
  } catch (error) {
    console.error('Error generating document:', error);
    alert('Ошибка создания документа: ' + (error as Error).message);
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