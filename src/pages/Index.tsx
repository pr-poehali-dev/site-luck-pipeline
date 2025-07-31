import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const [wishText, setWishText] = useState('');
  const [showPricing, setShowPricing] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (wishText.trim()) {
      setShowPricing(true);
    }
  };

  const pricingOptions = [
    { duration: '30 минут', price: 250 },
    { duration: '1 час', price: 500 },
    { duration: '2 часа', price: 1000 },
    { duration: 'Утро (6:00 - 12:00)', price: 3000 },
    { duration: 'День (12:00 - 18:00)', price: 5000 },
    { duration: 'Вечер (18:00 - 24:00)', price: 5000 },
    { duration: 'Ночь (00:00 - 6:00)', price: 3000 }
  ];

  const handlePricingSelect = (price: number, duration: string) => {
    navigate('/payment', { 
      state: { 
        wish: wishText, 
        price: price,
        duration: duration
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
            <CardHeader>
              <CardTitle className="text-center text-2xl">Выберите время активации удачи</CardTitle>
              <CardDescription className="text-center">
                Чем дольше активация, тем сильнее эффект
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-gray-800 italic text-center">"{wishText}"</p>
              </div>
              
              <div className="grid gap-3">
                {pricingOptions.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => handlePricingSelect(option.price, option.duration)}
                    className="flex justify-between items-center p-4 h-auto hover:bg-purple-50 border-2 hover:border-purple-300"
                  >
                    <span className="text-lg font-medium">{option.duration}</span>
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