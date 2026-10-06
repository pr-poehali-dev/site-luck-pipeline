import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { downloadDocumentAsImage, generateDocumentNumber, formatDocumentDate, formatActivationDate, type DocumentData } from '@/utils/documentGenerator';
import * as confetti from 'canvas-confetti';

interface DownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setShowDownloadModal: (value: boolean) => void;
  setShowActivationScreen: (value: boolean) => void;
  wish: string;
  strength: number;
  price: number;
  date: string | null;
  duration: string;
  customerName: string;
  isGeneratingDocument: boolean;
}

const DownloadDialog = ({
  open,
  onOpenChange,
  setShowDownloadModal,
  setShowActivationScreen,
  wish,
  strength,
  price,
  date,
  duration,
  customerName,
  isGeneratingDocument
}: DownloadDialogProps) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <div className="space-y-6 py-4">
          {/* Магическая карточка */}
          <div className="text-center">
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl p-8 mx-2 shadow-2xl border-2 border-gray-600 overflow-hidden">
              {/* Магические частицы */}
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-gray-500/10 to-transparent animate-pulse"></div>

              {/* Светящиеся углы */}
              <div className="absolute top-2 left-2 w-4 h-4 bg-white rounded-full animate-ping opacity-75"></div>
              <div className="absolute top-2 right-2 w-4 h-4 bg-white rounded-full animate-ping opacity-75" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute bottom-2 left-2 w-4 h-4 bg-white rounded-full animate-ping opacity-75" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 bg-white rounded-full animate-ping opacity-75" style={{animationDelay: '1.5s'}}></div>

              {/* Контент */}
              <div className="relative z-10 flex flex-col items-center justify-center space-y-4">


                {/* Заголовок */}
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent leading-tight text-center">
                  Ваш персональный<br/>скрижаль удачи
                </h2>

                {/* Подзаголовок */}
                <p className="text-gray-300 italic text-lg">
                  Магический документ готов к скачиванию
                </p>

                {/* Дополнительные звёзды */}
                <div className="flex space-x-2 text-white">
                  <span className="animate-pulse">⭐</span>
                  <span className="animate-pulse" style={{animationDelay: '0.3s'}}>⭐</span>
                  <span className="animate-pulse" style={{animationDelay: '0.6s'}}>⭐</span>
                </div>
              </div>
            </div>
          </div>

          {/* Кнопки */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                // Запускаем конфетти
                confetti.default({
                  particleCount: 100,
                  spread: 70,
                  origin: { y: 0.6 },
                  colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']
                });

                setShowDownloadModal(false);
                setShowActivationScreen(true);

                // Скрываем заставку через 20 секунд и переходим на главную
                setTimeout(() => {
                  setShowActivationScreen(false);
                  navigate('/');
                }, 20000);
              }}
              className="flex-1"
            >
              Не сейчас
            </Button>
            <Button
              onClick={() => {
                // Запускаем конфетти при скачивании
                confetti.default({
                  particleCount: 200,
                  spread: 100,
                  origin: { y: 0.4 },
                  colors: ['#9333ea', '#a855f7', '#c084fc', '#d8b4fe', '#e9d5ff']
                });

                setTimeout(() => {
                  confetti.default({
                    particleCount: 150,
                    spread: 80,
                    origin: { x: 0.2, y: 0.5 },
                    colors: ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0']
                  });
                }, 200);

                setTimeout(() => {
                  confetti.default({
                    particleCount: 150,
                    spread: 80,
                    origin: { x: 0.8, y: 0.5 },
                    colors: ['#f59e0b', '#fbbf24', '#fcd34d', '#fde68a']
                  });
                }, 400);

                setShowDownloadModal(false);
                setShowActivationScreen(true);
                // Скачиваем как изображение вместо PDF
                const documentData: DocumentData = {
                  wish: wish || 'Ваше желание',
                  powerLevel: strength || 1,
                  userName: customerName || 'Получатель силы',
                  energyInvestment: price || 299,
                  activationDate: formatActivationDate(date, duration || ''),
                  documentNumber: generateDocumentNumber(),
                  documentDate: formatDocumentDate()
                };

                downloadDocumentAsImage(documentData);

                // Скрываем заставку через 20 секунд и переходим на главную
                setTimeout(() => {
                  setShowActivationScreen(false);
                  navigate('/');
                }, 20000);
              }}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
              disabled={isGeneratingDocument}
            >
              <Icon name="Download" size={16} className="mr-2" />
              {isGeneratingDocument ? 'Создаем скрижаль...' : 'Скачать скрижаль'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadDialog;
