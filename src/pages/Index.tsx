import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const [wishText, setWishText] = useState('');
  const [showPricing, setShowPricing] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (wishText.trim()) {
      setShowPricing(true);
    }
  };

  const pricingOptions = [
    { duration: '30 минут', price: 250, immediate: true },
    { duration: '1 час', price: 500, immediate: true },
    { duration: '2 часа', price: 1000, immediate: true },
    { duration: 'Утро (6:00 - 12:00)', price: 3000, immediate: false },
    { duration: 'День (12:00 - 18:00)', price: 5000, immediate: false },
    { duration: 'Вечер (18:00 - 24:00)', price: 5000, immediate: false },
    { duration: 'Ночь (00:00 - 6:00)', price: 3000, immediate: false }
  ];

  const handlePricingSelect = (price: number, duration: string, immediate: boolean) => {
    if (!immediate && !selectedDate) {
      alert('Пожалуйста, укажите дату');
      return;
    }
    
    navigate('/payment', { 
      state: { 
        wish: wishText, 
        price: price,
        duration: duration,
        date: immediate ? null : selectedDate
      } 
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between p-4">
      <div className="w-full max-w-2xl space-y-8 flex-1 flex flex-col justify-center">
        {/* Главный заголовок */}
        <div className="text-center space-y-4">
          <h1 className="font-bold text-gray-900 mb-8 text-8xl">
            САЙТ УДАЧИ
          </h1>
          <p className="text-xl text-gray-600">
            Напишите в чем нужна удача
          </p>
        </div>

        {/* Форма */}
        {!showPricing ? (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Ваше пожелание удачи</CardTitle>
              <CardDescription className="text-center">
                Опишите, в какой сфере жизни вам нужна удача
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Textarea
                placeholder="Например: Нужна удача в работе, в любви, в здоровье..."
                value={wishText}
                onChange={(e) => setWishText(e.target.value)}
                className="min-h-32 text-lg"
              />
              <div className="flex justify-center">
                <Button 
                  onClick={handleSubmit}
                  className="px-8 py-3 text-lg"
                  disabled={!wishText.trim()}
                >
                  OK
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Выбор тарифа */
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              {/* Поле для ввода даты */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Дата активации (для утро/день/вечер/ночь):
                </label>
                <Input
                  type="text"
                  placeholder="ДД.ММ.ГГГГ (например: 15.12.2024)"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="text-center"
                />
              </div>
              
              <div className="grid gap-3">
                {pricingOptions.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => handlePricingSelect(option.price, option.duration, option.immediate)}
                    className="flex justify-between items-center p-4 h-auto hover:bg-purple-50 border-2 hover:border-purple-300"
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-lg font-medium">{option.duration}</span>
                      {option.immediate && (
                        <span className="text-sm text-green-600 font-medium">Действует сразу после оплаты</span>
                      )}
                    </div>
                    <span className="text-xl font-bold text-purple-600">{option.price} ₽</span>
                  </Button>
                ))}
              </div>
              
              <div className="flex justify-center mt-6">
                <Button 
                  variant="ghost" 
                  onClick={() => setShowPricing(false)}
                  className="text-gray-500"
                >
                  ← Изменить пожелание
                </Button>
              </div>
            </CardContent>
          </Card>
        )}


      </div>
      
      {/* Ссылки на дополнительные страницы - внизу */}
      <div className="w-full flex justify-center pb-4">
        <button 
          onClick={() => navigate('/rules')}
          className="text-gray-500 hover:text-gray-700 underline text-sm"
        >
          Правила использования
        </button>
      </div>
    </div>
  );
};

export default Index;