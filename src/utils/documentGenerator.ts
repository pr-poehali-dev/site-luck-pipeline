import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export interface DocumentData {
  wish: string;
  powerLevel: number;
  userName: string;
  energyInvestment: number;
  activationDate?: string;
  documentNumber?: string;
  documentDate?: string;
}

export const generateDocumentNumber = (): string => {
  return `LU-${Date.now().toString().slice(-8)}`;
};

export const formatDocumentDate = (): string => {
  const date = new Date();
  return date.toLocaleDateString('ru-RU', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  });
};

export const formatActivationDate = (date: string | null, duration: string): string => {
  // Если дата не указана, значит активация немедленная
  if (!date) {
    return 'Немедленно';
  }
  
  // Если указана дата, объединяем её с временным периодом из duration
  // duration может быть: "Утро (6:00 - 12:00)", "День (12:00 - 18:00)" и т.д.
  const timeMatch = duration.match(/\(([^)]+)\)/);
  const timeRange = timeMatch ? timeMatch[1] : '';
  
  if (timeRange) {
    return `${date} в ${timeRange}`;
  }
  
  // Для "Удача на событие" или других без времени
  return `${date}`;
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
          activationDate: data.activationDate,
          documentNumber: data.documentNumber || generateDocumentNumber(),
          documentDate: data.documentDate || formatDocumentDate()
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
          activationDate: data.activationDate,
          documentNumber: data.documentNumber || generateDocumentNumber(),
          documentDate: data.documentDate || formatDocumentDate()
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