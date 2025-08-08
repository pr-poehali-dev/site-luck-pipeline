import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import confetti from 'canvas-confetti';

const Index = () => {
  const [wishText, setWishText] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();
  const confettiInterval = useRef<NodeJS.Timeout | null>(null);

  // Эффект для управления конфетти
  useEffect(() => {
    if (showConfetti) {
      const startContinuousConfetti = () => {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#ff69b4', '#32cd32', '#87ceeb', '#dda0dd', '#f0e68c'];
        
        confettiInterval.current = setInterval(() => {
          // Залп конфетти по всей ширине экрана
          for (let i = 0; i < 8; i++) {
            setTimeout(() => {
              confetti({
                particleCount: 30,
                spread: 50,
                origin: { x: i * 0.125 + 0.0625, y: -0.1 },
                colors: colors,
                shapes: ['square', 'circle'],
                gravity: 0.8,
                drift: (Math.random() - 0.5) * 0.05,
                scalar: Math.random() * 0.3 + 0.7,
                startVelocity: Math.random() * 5 + 10,
                ticks: 300
              });
            }, i * 30);
          }
        }, 200);
      };
      
      startContinuousConfetti();
    }
    
    return () => {
      if (confettiInterval.current) {
        clearInterval(confettiInterval.current);
      }
    };
  }, [showConfetti]);

  const handleSubmit = () => {
    if (wishText.trim()) {
      // Запуск непрерывного конфетти
      setShowConfetti(true);
      
      // Переход на страницу тарифов через 2 секунды
      setTimeout(() => {
        setShowConfetti(false);
        navigate('/pricing', { state: { wish: wishText } });
      }, 2000);
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