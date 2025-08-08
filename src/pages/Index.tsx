import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import confetti from 'canvas-confetti';

const Index = () => {
  const [wishText, setWishText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (wishText.trim()) {
      // Запуск конфетти
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500'],
        shapes: ['square', 'circle'],
        gravity: 0.5,
        drift: 0.1,
        scalar: 0.8
      });
      
      // Дополнительный залп конфетти через небольшую задержку
      setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 50,
          origin: { y: 0.7 },
          colors: ['#ff69b4', '#32cd32', '#87ceeb', '#dda0dd', '#f0e68c'],
          shapes: ['circle'],
          gravity: 0.3,
          drift: -0.1,
          scalar: 0.6
        });
      }, 200);
      
      // Переход на страницу тарифов через небольшую задержку
      setTimeout(() => {
        navigate('/pricing', { state: { wish: wishText } });
      }, 500);
    }
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