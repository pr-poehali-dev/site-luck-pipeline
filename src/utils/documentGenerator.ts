import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export interface DocumentData {
  wish: string;
  powerLevel: number;
  userName: string;
  energyInvestment: number;
  affirmationText: string;
}

export const generateAffirmationText = (wish: string, powerLevel: number): string => {
  const baseTexts = [
    "Я наполнён(а) до фон, во мне горит сильная звезда. Я поп-няю, вырываюсь из. С помощью этой энергии преодолеваю любое бремя в весёлой.",
    "Моя внутренняя сила растет с каждым днем. Энергия удачи течет через меня, принося успех и радость в каждый момент.",
    "Я притягиваю удачу как магнит. Вселенная работает в мою пользу, создавая возможности для процветания.",
    "Каждый день я становлюсь сильнее. Моя энергия светится, привлекая все самое лучшее в мою жизнь."
  ];
  
  const powerModifiers = {
    1: "базовой силы",
    2: "средней силы", 
    3: "высокой силы",
    4: "максимальной силы"
  };

  const selectedText = baseTexts[Math.floor(Math.random() * baseTexts.length)];
  return selectedText.replace("энергии", `энергии ${powerModifiers[powerLevel as keyof typeof powerModifiers] || "базовой силы"}`);
};

export const generateLuckDocument = async (data: DocumentData): Promise<void> => {
  // Создаем временный элемент для рендеринга документа
  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'absolute';
  tempDiv.style.top = '-9999px';
  tempDiv.style.left = '-9999px';
  tempDiv.style.width = '210mm';
  tempDiv.style.height = '297mm';
  
  // Импортируем React и создаем компонент динамически
  const { default: React } = await import('react');
  const { createRoot } = await import('react-dom/client');
  const { default: LuckDocument } = await import('@/components/LuckDocument');
  
  document.body.appendChild(tempDiv);
  
  try {
    // Рендерим компонент
    const root = createRoot(tempDiv);
    
    await new Promise<void>((resolve) => {
      root.render(
        React.createElement(LuckDocument, {
          wish: data.wish,
          powerLevel: data.powerLevel,
          userName: data.userName,
          energyInvestment: data.energyInvestment,
          affirmationText: data.affirmationText
        })
      );
      
      // Ждем рендеринга
      setTimeout(resolve, 1000);
    });

    // Конвертируем в canvas
    const canvas = await html2canvas(tempDiv.firstChild as HTMLElement, {
      width: 794, // A4 width в пикселях при 96 DPI
      height: 1123, // A4 height в пикселях при 96 DPI
      scale: 2, // Увеличиваем качество
      useCORS: true,
      backgroundColor: null
    });

    // Создаем PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgWidth = 210; // A4 width в мм
    const imgHeight = 297; // A4 height в мм

    // Добавляем изображение в PDF
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    // Скачиваем файл
    const fileName = `skrizhal-udachi-${Date.now()}.pdf`;
    pdf.save(fileName);

  } catch (error) {
    console.error('Ошибка при генерации документа:', error);
    throw new Error('Не удалось сгенерировать документ');
  } finally {
    // Очищаем временный элемент
    document.body.removeChild(tempDiv);
  }
};

export const downloadDocumentAsImage = async (data: DocumentData): Promise<void> => {
  // Альтернативный метод - скачивание как изображение
  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'absolute';
  tempDiv.style.top = '-9999px';
  tempDiv.style.left = '-9999px';
  tempDiv.style.width = '210mm';
  tempDiv.style.height = '297mm';
  
  const { default: React } = await import('react');
  const { createRoot } = await import('react-dom/client');
  const { default: LuckDocument } = await import('@/components/LuckDocument');
  
  document.body.appendChild(tempDiv);
  
  try {
    const root = createRoot(tempDiv);
    
    await new Promise<void>((resolve) => {
      root.render(
        React.createElement(LuckDocument, {
          wish: data.wish,
          powerLevel: data.powerLevel,
          userName: data.userName,
          energyInvestment: data.energyInvestment,
          affirmationText: data.affirmationText
        })
      );
      
      setTimeout(resolve, 1000);
    });

    const canvas = await html2canvas(tempDiv.firstChild as HTMLElement, {
      width: 794,
      height: 1123,
      scale: 2,
      useCORS: true,
      backgroundColor: '#1a1a2e'
    });

    // Скачиваем как изображение
    const link = document.createElement('a');
    link.download = `skrizhal-udachi-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();

  } catch (error) {
    console.error('Ошибка при генерации изображения:', error);
    throw new Error('Не удалось сгенерировать изображение');
  } finally {
    document.body.removeChild(tempDiv);
  }
};