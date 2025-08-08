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

  // Эффект для управления нежным конфетти
  useEffect(() => {
    if (showConfetti) {
      const startGentleConfetti = () => {
        const colors = [
          '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
          '#DDA0DD', '#FFB6C1', '#98FB98', '#F0E68C', '#FFE4E1',
          '#E6E6FA', '#F5DEB3', '#FFA07A', '#20B2AA', '#87CEEB',
          '#DEB887', '#F4A460', '#DA70D6', '#FF69B4', '#00CED1'
        ];
        
        const createParticle = () => {
          const particle = document.createElement('div');
          const size = Math.random() * 8 + 6; // 6-14px
          const color = colors[Math.floor(Math.random() * colors.length)];
          const shapes = ['circle', 'square', 'triangle', 'star', 'heart', 'diamond'];
          const shape = shapes[Math.floor(Math.random() * shapes.length)];
          const startX = Math.random() * window.innerWidth;
          
          // Базовые стили
          particle.style.position = 'fixed';
          particle.style.left = startX + 'px';
          particle.style.top = '-20px';
          particle.style.width = size + 'px';
          particle.style.height = size + 'px';
          particle.style.pointerEvents = 'none';
          particle.style.zIndex = '9999';
          particle.style.opacity = '0';
          
          // Стили форм
          switch(shape) {
            case 'circle':
              particle.style.backgroundColor = color;
              particle.style.borderRadius = '50%';
              particle.style.boxShadow = `0 0 ${size/2}px ${color}40`;
              break;
            case 'square':
              particle.style.backgroundColor = color;
              particle.style.borderRadius = '20%';
              particle.style.boxShadow = `0 0 ${size/3}px ${color}30`;
              break;
            case 'triangle':
              particle.style.width = '0';
              particle.style.height = '0';
              particle.style.borderLeft = `${size/2}px solid transparent`;
              particle.style.borderRight = `${size/2}px solid transparent`;
              particle.style.borderBottom = `${size}px solid ${color}`;
              particle.style.filter = `drop-shadow(0 0 ${size/3}px ${color}40)`;
              break;
            case 'star':
              particle.innerHTML = '⭐';
              particle.style.fontSize = size + 'px';
              particle.style.filter = `hue-rotate(${Math.random() * 360}deg) brightness(1.2)`;
              break;
            case 'heart':
              particle.innerHTML = '💖';
              particle.style.fontSize = size + 'px';
              particle.style.filter = `hue-rotate(${Math.random() * 360}deg) saturate(1.5)`;
              break;
            case 'diamond':
              particle.style.backgroundColor = color;
              particle.style.transform = 'rotate(45deg)';
              particle.style.borderRadius = '10%';
              particle.style.boxShadow = `0 0 ${size/2}px ${color}50`;
              break;
          }
          
          document.body.appendChild(particle);
          
          // Анимация падения
          const duration = 8000; // 8 секунд
          const startTime = performance.now();
          
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = elapsed / duration;
            
            if (progress >= 1) {
              particle.remove();
              return;
            }
            
            // Плавное появление и исчезновение
            let opacity = 0;
            if (progress < 0.1) {
              opacity = progress * 10; // 0→1 за первые 10%
            } else if (progress > 0.9) {
              opacity = (1 - progress) * 10; // 1→0 за последние 10%
            } else {
              opacity = Math.max(0.4, 1 - progress * 0.6); // 1→0.4
            }
            
            // Позиция Y
            const y = -20 + (window.innerHeight + 40) * progress;
            
            // Качание из стороны в сторону
            const swayAmount = 30;
            const swayX = Math.sin(progress * Math.PI * 4) * swayAmount;
            
            // Вращение
            const rotation = progress * 360;
            
            particle.style.opacity = opacity.toString();
            particle.style.top = y + 'px';
            particle.style.left = (startX + swayX) + 'px';
            
            if (shape !== 'diamond') {
              particle.style.transform = `rotate(${rotation}deg)`;
            } else {
              particle.style.transform = `rotate(${45 + rotation}deg)`;
            }
            
            requestAnimationFrame(animate);
          };
          
          requestAnimationFrame(animate);
        };
        
        const spawnGroup = () => {
          const groupSize = Math.floor(Math.random() * 4) + 2; // 2-5 частиц
          for (let i = 0; i < groupSize; i++) {
            setTimeout(() => createParticle(), i * 100);
          }
        };
        
        confettiInterval.current = setInterval(() => {
          spawnGroup();
        }, Math.random() * 800 + 600); // 0.6-1.4 секунды
        
        // Первая группа сразу
        spawnGroup();
      };
      
      startGentleConfetti();
    }
    
    return () => {
      if (confettiInterval.current) {
        clearInterval(confettiInterval.current);
      }
      // Удаляем все оставшиеся частицы
      document.querySelectorAll('div[style*="position: fixed"]').forEach(el => {
        if (el.style.zIndex === '9999') el.remove();
      });
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