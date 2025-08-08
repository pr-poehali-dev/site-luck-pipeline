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
          // Первый залп слева
          confetti({
            particleCount: 15,
            spread: 30,
            origin: { x: 0.1, y: 0 },
            colors: colors.slice(0, 6),
            shapes: ['square', 'circle'],
            gravity: 0.3,
            drift: 0.05,
            scalar: 0.7,
            startVelocity: 20
          });
          
          // Второй залп по центру
          setTimeout(() => {
            confetti({
              particleCount: 20,
              spread: 40,
              origin: { x: 0.5, y: 0 },
              colors: colors.slice(3, 9),
              shapes: ['circle'],
              gravity: 0.25,
              drift: 0,
              scalar: 0.8,
              startVelocity: 25
            });
          }, 100);
          
          // Третий залп справа
          setTimeout(() => {
            confetti({
              particleCount: 15,
              spread: 30,
              origin: { x: 0.9, y: 0 },
              colors: colors.slice(6),
              shapes: ['square', 'circle'],
              gravity: 0.3,
              drift: -0.05,
              scalar: 0.7,
              startVelocity: 20
            });
          }, 200);
        }, 300);
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