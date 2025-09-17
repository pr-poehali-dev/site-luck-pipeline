import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useState, useEffect } from 'react';
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

        {/* Превью документа для тестирования */}
        <div className="mt-8 w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-2xl">
          <div style={{ transform: 'scale(0.3)', transformOrigin: 'top center' }}>
            <div className="relative">
              <div className="w-[210mm] h-[297mm] bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8 font-serif relative overflow-hidden">
                {/* Основная рамка */}
                <div className="border-8 border-black h-full w-full p-6 relative bg-black bg-opacity-20">
                  
                  {/* Заголовок */}
                  <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold tracking-[0.3em] mb-4">
                      СКРИЖАЛЬ УДАЧИ
                    </h1>
                    <p className="text-lg text-gray-300 tracking-wide">
                      Определитель вещемуны силы
                    </p>
                  </div>

                  {/* Секция "УДАЧА" */}
                  <div className="mb-8 text-center">
                    <div className="border-4 border-gray-800 p-6 mb-6 bg-black bg-opacity-30">
                      <h2 className="text-3xl font-bold tracking-[0.2em] mb-4">
                        УДАЧА
                      </h2>
                      <div className="border-2 border-gray-700 p-4 bg-black bg-opacity-50">
                        <p className="text-lg font-medium tracking-wide">
                          {wish || "СИЛА НА"}
                        </p>
                      </div>
                    </div>
                  </div>



                  {/* Данные активации */}
                  <div className="mb-8 space-y-6">
                    <div className="border-2 border-gray-800 p-4 bg-black bg-opacity-30 rounded">
                      <div className="text-center mb-4">
                        <h3 className="text-xl font-bold tracking-wide mb-2">
                          ДАТА АКТИВАЦИИ
                        </h3>
                        <p className="text-lg text-purple-300 font-semibold">
                          {date || 'Немедленно'}
                        </p>
                      </div>
                    </div>

                    <div className="border-2 border-gray-800 p-4 bg-black bg-opacity-30 rounded">
                      <div className="text-center">
                        <h3 className="text-xl font-bold tracking-wide mb-2">
                          СИЛА УДАЧИ
                        </h3>
                        <p className="text-lg text-purple-300 font-semibold">
                          {Math.max(1, Math.min(10, strength))}/10
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Информация о документе */}
                  <div className="mb-12">
                    <div className="bg-black bg-opacity-40 border-2 border-gray-800 p-6 rounded">
                      <div className="text-center mb-4">
                        <h3 className="text-xl font-bold tracking-wide mb-3">
                          ИНФОРМАЦИЯ О ДОКУМЕНТЕ
                        </h3>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-300">
                            Номер документа: <span className="text-purple-300 font-semibold">LU-{Date.now().toString().slice(-8)}</span>
                          </p>
                          <p className="text-sm text-gray-300">
                            Дата создания: <span className="text-purple-300 font-semibold">{new Date().toLocaleDateString('ru-RU')}</span>
                          </p>
                          <p className="text-sm text-gray-300">
                            Энергетическая инвестиция: <span className="text-green-400 font-semibold">{price} руб.</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Нижняя секция с предупреждением и печатью */}
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="flex justify-between items-end">
                      {/* Предупреждение */}
                      <div className="text-left flex-1 mr-8">
                        <p className="text-red-500 text-sm font-bold">
                          ⚠️ ВАЖНО: Скрижаль Удачи вступает в силу только после оплаты
                        </p>
                      </div>

                      {/* Печать пентаграммы */}
                      <div className="relative w-36 h-36">
                        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="50" cy="50" r="48" stroke="#8B5CF6" strokeWidth="2" fill="none" strokeDasharray="4,2" opacity="0.7" />
                          <circle cx="50" cy="50" r="42" stroke="#A78BFA" strokeWidth="1" fill="none" strokeDasharray="2,1" opacity="0.5" />
                          <path d="M50 8 L61.8 38.2 L95.1 38.2 L69.1 58.8 L80.9 89 L50 68.4 L19.1 89 L30.9 58.8 L4.9 38.2 L38.2 38.2 Z" 
                                stroke="#7C3AED" strokeWidth="2" fill="#1F1B3A" fillOpacity="0.8" />
                          <path d="M50 30 L58.5 42 L72 42 L62.5 51 L66.5 64 L50 56 L33.5 64 L37.5 51 L28 42 L41.5 42 Z" 
                                fill="#4C1D95" fillOpacity="0.6" />
                          <circle cx="50" cy="15" r="2" fill="#8B5CF6" />
                          <circle cx="85" cy="35" r="1.5" fill="#A78BFA" />
                          <circle cx="75" cy="80" r="1.5" fill="#A78BFA" />
                          <circle cx="25" cy="80" r="1.5" fill="#A78BFA" />
                          <circle cx="15" cy="35" r="1.5" fill="#A78BFA" />
                        </svg>
                        
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-purple-300 text-xs font-bold tracking-wide">
                              САЙТ
                            </div>
                            <div className="text-purple-300 text-xs font-bold tracking-wide">
                              УДАЧИ
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                </div>
              </div>
              
              {/* Overlay с подсказкой */}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 cursor-pointer rounded-lg">
                <div className="bg-white bg-opacity-90 text-black px-4 py-2 rounded-lg text-sm font-semibold opacity-0 hover:opacity-100 transition-opacity duration-300">
                  🔍 Превью вашего документа
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Payment;