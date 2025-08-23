export interface DocumentData {
  wish: string;
  powerLevel: number;
  userName?: string;
  energyInvestment: number;
  affirmationText: string;
}

export const generateLuckDocument = async (data: DocumentData): Promise<void> => {
  console.log('🚀 Начинаю генерацию документа с данными:', data);
  
  try {
    // Создаем canvas
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 800;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Canvas не поддерживается браузером');
    }

    console.log('✅ Canvas создан, размер:', canvas.width, 'x', canvas.height);

    // Фон
    ctx.fillStyle = '#2d1b69';
    ctx.fillRect(0, 0, 600, 800);
    console.log('✅ Фон нарисован');

    // Рамка
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, 580, 780);
    console.log('✅ Рамка нарисована');

    // Заголовок
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('СКРИЖАЛЬ УДАЧИ', 300, 50);

    // Подзаголовок
    ctx.fillStyle = '#a855f7';
    ctx.font = '14px sans-serif';
    ctx.fillText('Персональный документ силы', 300, 80);

    // Секция УДАЧА
    ctx.fillStyle = 'white';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText('УДАЧА', 300, 120);

    // Желание
    ctx.fillStyle = '#a855f7';
    ctx.font = '12px sans-serif';
    const wish = data.wish.length > 60 ? data.wish.substring(0, 60) + '...' : data.wish;
    ctx.fillText(`"${wish}"`, 300, 150);

    // Статистика
    ctx.fillStyle = 'white';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Уровень силы: ${data.powerLevel}/10`, 30, 200);
    ctx.fillText(`Энергетический вклад: ${data.energyInvestment} ₽`, 30, 230);

    // Аффирмации
    ctx.textAlign = 'center';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('ПЕРСОНАЛЬНЫЕ АФФИРМАЦИИ', 300, 280);
    
    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#a855f7';
    ctx.fillText('ПРИНЯТИЕ ЛЮБВИ', 300, 300);

    ctx.font = '10px sans-serif';
    const affText = data.affirmationText.length > 100 ? data.affirmationText.substring(0, 100) + '...' : data.affirmationText;
    ctx.fillText(affText, 300, 330);

    // Печать
    ctx.fillStyle = '#4c1d95';
    ctx.beginPath();
    ctx.arc(480, 380, 25, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = 'white';
    ctx.font = 'bold 6px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('POEHALI.DEV', 480, 385);

    // Дата и номер
    ctx.fillStyle = 'white';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'left';
    const now = new Date();
    const dateStr = now.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    ctx.fillText(`Документ №: WD${Date.now()}`, 30, 450);
    ctx.fillText(`Дата активации:`, 30, 470);
    ctx.fillText(dateStr, 30, 490);

    // Предупреждение
    ctx.fillStyle = '#FBC520';
    ctx.fillRect(30, 550, 540, 30);
    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 2;
    ctx.strokeRect(30, 550, 540, 30);
    
    ctx.fillStyle = 'black';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('⚠️ ДОКУМЕНТ ДЕЙСТВУЕТ ПОСЛЕ ОПЛАТЫ СИЛЫ! ⚠️', 300, 570);

    // Получатель
    ctx.fillStyle = '#a855f7';
    ctx.font = '8px sans-serif';
    ctx.fillText(`Получатель: ${data.userName} • Email: user@example.com`, 300, 620);

    console.log('✅ Рисование завершено, начинаю скачивание');

    // Скачивание - используем промис для лучшего контроля
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        console.log('📦 Blob создан:', blob);
        
        if (blob) {
          try {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Скрижаль_Удачи_${new Date().toISOString().slice(0, 10)}.png`;
            link.style.display = 'none';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Небольшая задержка перед очисткой URL
            setTimeout(() => {
              URL.revokeObjectURL(url);
            }, 1000);
            
            console.log('🎉 Файл скачан успешно!');
            resolve();
          } catch (error) {
            console.error('❌ Ошибка при скачивании:', error);
            reject(new Error('Ошибка при скачивании файла'));
          }
        } else {
          console.error('❌ Не удалось создать blob');
          reject(new Error('Не удалось создать blob из canvas'));
        }
      }, 'image/png', 1.0);
    });
    
  } catch (error) {
    console.error('❌ Ошибка при создании документа:', error);
    throw error;
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