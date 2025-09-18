import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { generateLuckDocument, generateDocumentNumber, formatDocumentDate, type DocumentData } from '@/utils/documentGenerator';
import * as confetti from 'canvas-confetti';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const wish = location.state?.wish || '';
  const price = location.state?.price || 299;
  const duration = location.state?.duration || '';
  const date = location.state?.date || null;
  const strength = location.state?.strength || 1;
  const [isGeneratingDocument, setIsGeneratingDocument] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showActivationScreen, setShowActivationScreen] = useState(false);
  const [customerName, setCustomerName] = useState('');

  // Сохраняем запрос в localStorage для PayMaster
  useEffect(() => {
    if (wish) {
      localStorage.setItem('currentWish', wish);
    }
  }, [wish]);

  const handleDownloadDocument = async () => {
    if (!wish) {
      alert('Ошибка: не найдено пожелание для создания документа');
      return;
    }

    setIsGeneratingDocument(true);
    try {
      const documentData: DocumentData = {
        wish: wish || 'Ваше желание',
        powerLevel: strength || 1,
        userName: 'Получатель силы',
        energyInvestment: price || 299,
        activationDate: date || 'Немедленно',
        documentNumber: generateDocumentNumber(),
        documentDate: formatDocumentDate()
      };
      
      await generateLuckDocument(documentData);
      
    } catch (error) {
      console.error('Ошибка при создании документа:', error);
      const errorMessage = error instanceof Error ? error.message : 'Не удалось создать документ. Попробуйте еще раз.';
      alert('Ошибка: ' + errorMessage);
    } finally {
      setIsGeneratingDocument(false);
    }
  };


  // Убираем обработку формы Тинькофф

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Заголовок */}
        <header className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Оплата услуги
          </h1>
          <p className="text-lg text-gray-600">
            Завершите оплату, чтобы активировать удачу
          </p>
        </header>

        {/* Информация о заказе */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Sparkles" size={24} />
              Ваше пожелание удачи
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-800 italic">"{wish}"</p>
            </div>
            <Separator className="my-4" />
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-lg">Тариф:</span>
                <span className="font-semibold">{duration || 'Активация удачи'}</span>
              </div>
              {date && (
                <div className="flex justify-between items-center">
                  <span className="text-lg">Дата активации:</span>
                  <span className="font-semibold">{date}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-lg">Стоимость:</span>
                <span className="text-2xl font-bold text-green-600">{price} ₽</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Кнопка скачивания документа */}
        <div className="text-center">
          <style jsx>{`
            @keyframes pulseSlow {
              0%, 100% {
                background-color: rgb(147 51 234);
                box-shadow: 0 0 15px rgba(147, 51, 234, 0.3);
              }
              50% {
                background-color: rgb(168 85 247);
                box-shadow: 0 0 25px rgba(168, 85, 247, 0.6);
              }
            }
            .pulse-button {
              animation: pulseSlow 2.5s ease-in-out infinite;
            }
            .pulse-button:hover {
              animation-play-state: paused;
            }
            .pulse-button:disabled {
              animation: none;
            }
          `}</style>
          <Button 
            onClick={handleDownloadDocument}
            disabled={isGeneratingDocument}
            className="pulse-button bg-purple-600 hover:bg-purple-700 text-white py-4 px-8 text-lg disabled:opacity-50 hidden"
          >
            {isGeneratingDocument ? (
              <>
                <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                Создание документа...
              </>
            ) : (
              <>
                <Icon name="Download" size={20} className="mr-2" />
                Скачать Скрижаль Удачи
              </>
            )}
          </Button>
        </div>



        {/* Кнопка отправки запроса и оплаты */}
        <div className="text-center">
          <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
            <DialogTrigger asChild>
              <Button className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg">
                <Icon name="Send" size={20} className="mr-2" />
                Отправить запрос и оплатить
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-center text-xl text-purple-600">Подтверждение заказа</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                {/* Пожелание удачи */}
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Ваше пожелание удачи:</p>
                  <p className="text-lg font-medium text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {wish || 'Ваше пожелание'}
                  </p>
                </div>
                
                {/* Поле ФИО */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Фамилия Имя Отчество
                  </label>
                  <Input
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Введите ваше ФИО"
                    className="w-full"
                  />
                </div>
                
                {/* Кнопка оплаты */}
                <Button 
                  onClick={() => setShowQrModal(true)}
                  className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  <Icon name="CreditCard" size={20} className="mr-2" />
                  Оплатить {price} ₽
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Второе модальное окно с QR кодом */}
          <Dialog open={showQrModal} onOpenChange={setShowQrModal}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-center text-xl text-purple-600">Оплата заказа</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                {/* Информация о заказе */}
                <div className="text-center bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Ваше пожелание:</p>
                  <p className="text-lg font-medium text-gray-900 mb-3">
                    {wish || 'Ваше пожелание'}
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    К оплате: {price} ₽
                  </p>
                </div>
                
                {/* QR код для оплаты */}
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-3">Отсканируйте QR-код для оплаты:</p>
                  <div className="flex justify-center mb-4">
                    <img 
                      src="https://cdn.poehali.dev/files/4731d3fd-4019-48d3-b8df-8a7e42599aa5.jpg" 
                      alt="QR код для оплаты" 
                      className="w-48 h-48 border-2 border-gray-200 rounded-lg"
                    />
                  </div>
                  
                  {/* Инструкция по оплате */}
                  <div className="bg-white rounded-lg p-4 mb-3">
                    <div className="text-center">
                      <p className="font-semibold text-gray-800 mb-2">Т-Банк ⚡</p>
                      <div className="text-center text-sm text-gray-700 space-y-1">
                        <p>1. Отсканируйте QR-код</p>
                        <p>2. Введите сумму: <span className="font-semibold text-purple-600">{price} ₽</span></p>
                        <p>3. Подтвердите оплату</p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500">
                    Или воспользуйтесь любым удобным способом оплаты
                  </p>
                </div>
                
                {/* Кнопки */}
                <div className="flex gap-3">
                  <Button 
                    variant="outline"
                    onClick={() => setShowQrModal(false)}
                    className="flex-1"
                  >
                    Отмена
                  </Button>
                  <Button 
                    onClick={() => {
                      setShowQrModal(false);
                      setShowPaymentModal(false);
                      setShowDownloadModal(true);
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Icon name="Check" size={16} className="mr-2" />
                    Я оплатил
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Третье модальное окно для скачивания скрижали */}
          <Dialog open={showDownloadModal} onOpenChange={setShowDownloadModal}>
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
                    onClick={() => setShowDownloadModal(false)}
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
                      handleDownloadDocument();
                      
                      // Скрываем заставку через 20 секунд
                      setTimeout(() => {
                        setShowActivationScreen(false);
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
        </div>

        {/* Информация после оплаты */}
        <div className="text-center mt-4">
          <p className="text-gray-600 text-lg font-semibold">
            После оплаты можно будет скачать скрижаль удачи
          </p>
        </div>

        {/* Кнопка назад */}
        <div className="text-center">
          <Button variant="outline" onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Вернуться назад
          </Button>
        </div>



      </div>

      {/* Заставка активации удачи */}
      {showActivationScreen && (
        <div className="fixed inset-0 z-50 bg-black overflow-hidden">
          {/* Звездное небо как на главной */}
          <div className="absolute inset-0">
            {Array.from({ length: 200 }, (_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  opacity: Math.random() * 0.8 + 0.2,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${Math.random() * 2 + 1}s`
                }}
              />
            ))}
          </div>
          
          {/* Центральный текст в стиле главной страницы */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white space-y-6 px-8">
              <div className="mb-8">
                <div className="text-8xl mb-6 animate-bounce">✨</div>
                <h1 className="text-6xl font-bold mb-6 text-shadow-2xl bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent animate-pulse">
                  АКТИВАЦИЯ УДАЧИ
                </h1>
                <div className="space-y-4">
                  <p className="text-2xl font-semibold text-yellow-200 animate-fade-in">
                    Ваша удача будет активирована после оплаты
                  </p>
                  <p className="text-xl text-gray-300 animate-fade-in-delay">
                    Ожидайте... Магия уже начинает действовать
                  </p>
                </div>
              </div>
              
              {/* Магический спиннер */}
              <div className="flex justify-center items-center space-x-4">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-yellow-400 border-t-transparent"></div>
                <div className="text-yellow-300 text-lg font-medium animate-pulse">
                  Подготовка скрижали...
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;