import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { generateLuckDocument, generateDocumentNumber, formatDocumentDate, type DocumentData } from '@/utils/documentGenerator';

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
                {/* Большой свиток */}
                <div className="text-center">
                  <div className="relative bg-white border-l-8 border-r-8 border-amber-600 rounded-3xl p-8 mx-2 shadow-2xl min-h-[200px] flex flex-col justify-center">
                    {/* Верхняя и нижняя части свитка */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-amber-600 rounded-full shadow-lg"></div>
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-amber-600 rounded-full shadow-lg"></div>
                    
                    {/* Боковые палочки свитка */}
                    <div className="absolute -left-3 top-4 bottom-4 w-6 bg-amber-700 rounded-full shadow-lg"></div>
                    <div className="absolute -right-3 top-4 bottom-4 w-6 bg-amber-700 rounded-full shadow-lg"></div>
                    
                    {/* Большой свиток с текстом внутри */}
                    <div className="relative z-10 flex flex-col items-center justify-center">
                      <div className="relative text-8xl mb-2">
                        📜
                        {/* Текст поверх свитка */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-xs font-bold text-amber-900 leading-tight pt-2">
                          <div className="text-center">
                            <div className="mb-1">Ваш персональный</div>
                            <div>скрижаль удачи</div>
                          </div>
                        </div>
                      </div>
                      <p className="text-amber-800 italic text-lg mt-2">
                        Магический документ готов к скачиванию
                      </p>
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
                      setShowDownloadModal(false);
                      handleDownloadDocument();
                    }}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <Icon name="Download" size={16} className="mr-2" />
                    Скачать скрижаль
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
    </div>
  );
};

export default Payment;