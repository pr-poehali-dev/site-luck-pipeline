import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const [wishText, setWishText] = useState('');
  const [showSplash, setShowSplash] = useState(true);
  const [isBreaking, setIsBreaking] = useState(false);
  const navigate = useNavigate();

  const handleSplashClick = () => {
    setIsBreaking(true);
    // Убираем заставку после завершения анимации
    setTimeout(() => {
      setShowSplash(false);
    }, 2500);
  };

  // Создаем звезды
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        animationDelay: Math.random() * 3
      });
    }
    return stars;
  };

  // Создаем мелкие осколки стекла
  const generateShards = () => {
    const shards = [];
    for (let i = 0; i < 120; i++) {
      const initialVelocityX = (Math.random() - 0.5) * 800; // горизонтальный разлет
      const initialVelocityY = Math.random() * -400 - 200; // начальная скорость вверх
      
      shards.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        width: Math.random() * 25 + 10, // 10-35px
        height: Math.random() * 25 + 10,
        rotation: Math.random() * 360,
        initialVelocityX: initialVelocityX,
        initialVelocityY: initialVelocityY,
        rotationSpeed: (Math.random() - 0.5) * 720, // вращение
        delay: Math.random() * 0.1, // короткая задержка
        mass: Math.random() * 0.5 + 0.5 // масса для разной скорости падения
      });
    }
    return shards;
  };

  const stars = generateStars();
  const shards = generateShards();

  const handleSubmit = () => {
    if (wishText.trim()) {
      navigate('/pricing', { state: { wish: wishText } });
    }
  };

  if (showSplash) {
    return (
      <div 
        className="fixed inset-0 z-50 cursor-pointer overflow-hidden bg-black"
        onClick={handleSplashClick}
      >
        {/* Фоновое звездное небо */}
        {!isBreaking && (
          <div className="absolute inset-0">
            {stars.map((star) => (
              <div
                key={star.id}
                className="absolute bg-white rounded-full twinkle"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  opacity: star.opacity,
                  animationDelay: `${star.animationDelay}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Центральный текст */}
        {!isBreaking && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white fade-in">
              <h1 className="text-6xl font-bold mb-4 text-shadow-lg">
                САЙТ УДАЧИ
              </h1>
              <p className="text-xl opacity-80">
                Нажмите, чтобы войти
              </p>
            </div>
          </div>
        )}

        {/* Мелкие осколки стекла */}
        {isBreaking && (
          <div className="absolute inset-0">
            {shards.map((shard) => (
              <div
                key={shard.id}
                className="absolute bg-gradient-to-br from-gray-800 via-gray-900 to-black border border-gray-600 shard-break"
                style={{
                  left: `${shard.x}%`,
                  top: `${shard.y}%`,
                  width: `${shard.width}px`,
                  height: `${shard.height}px`,
                  transform: `rotate(${shard.rotation}deg)`,
                  clipPath: 'polygon(20% 0%, 80% 10%, 100% 50%, 85% 90%, 15% 100%, 0% 60%)',
                  boxShadow: 'inset 0 0 10px rgba(255,255,255,0.1), 0 0 5px rgba(255,255,255,0.05)',
                  animationDelay: `${shard.delay}s`,
                  '--initial-velocity-x': `${shard.initialVelocityX}px`,
                  '--initial-velocity-y': `${shard.initialVelocityY}px`,
                  '--rotation-speed': `${shard.rotationSpeed}deg`,
                  '--mass': shard.mass,
                } as any}
              />
            ))}
            
            {/* Звезды разлетаются вместе с осколками */}
            {stars.map((star) => (
              <div
                key={`star-${star.id}`}
                className="absolute bg-white rounded-full star-break"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  opacity: star.opacity,
                  animationDelay: `${star.animationDelay * 0.3}s`,
                  '--velocity-x': `${(Math.random() - 0.5) * 1000}px`,
                  '--velocity-y': `${(Math.random() - 0.5) * 1000}px`,
                } as any}
              />
            ))}
          </div>
        )}

        {/* CSS стили для анимаций */}
        <style jsx>{`
          .twinkle {
            animation: twinkle 2s infinite alternate;
          }
          
          @keyframes twinkle {
            0% { opacity: 0.2; }
            100% { opacity: 1; }
          }
          
          .fade-in {
            animation: fadeIn 2s ease-in;
          }
          
          @keyframes fadeIn {
            0% { opacity: 0; transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
          }
          
          .text-shadow-lg {
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.5),
                         0 0 40px rgba(255, 255, 255, 0.3),
                         0 0 60px rgba(255, 255, 255, 0.2);
          }
          
          .shard-break {
            animation: shardBreak 2.5s ease-out forwards;
          }
          
          .star-break {
            animation: starBreak 2s ease-out forwards;
          }
          
          @keyframes shardBreak {
            0% { 
              transform: translate(0, 0) rotate(var(--rotation)) scale(1);
              opacity: 1;
            }
            10% {
              transform: translate(calc(var(--initial-velocity-x) * 0.1), calc(var(--initial-velocity-y) * 0.1 + 0px)) 
                         rotate(calc(var(--rotation) + var(--rotation-speed) * 0.1)) 
                         scale(1.05);
              opacity: 0.95;
            }
            30% {
              transform: translate(calc(var(--initial-velocity-x) * 0.3), calc(var(--initial-velocity-y) * 0.3 + 100px * var(--mass))) 
                         rotate(calc(var(--rotation) + var(--rotation-speed) * 0.3)) 
                         scale(0.9);
              opacity: 0.8;
            }
            60% {
              transform: translate(calc(var(--initial-velocity-x) * 0.6), calc(var(--initial-velocity-y) * 0.6 + 400px * var(--mass))) 
                         rotate(calc(var(--rotation) + var(--rotation-speed) * 0.6)) 
                         scale(0.7);
              opacity: 0.6;
            }
            100% { 
              transform: translate(calc(var(--initial-velocity-x) * 1), calc(var(--initial-velocity-y) * 1 + 1000px * var(--mass))) 
                         rotate(calc(var(--rotation) + var(--rotation-speed))) 
                         scale(0.3);
              opacity: 0;
            }
          }
          
          @keyframes starBreak {
            0% { 
              transform: translate(0, 0) scale(1);
              opacity: 0.8;
            }
            100% { 
              transform: translate(var(--velocity-x), var(--velocity-y)) scale(0.2);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between p-4">
      <div className="w-full max-w-2xl space-y-8 flex-1 flex flex-col justify-center">
        {/* Главный заголовок */}
        <div className="text-center space-y-4">
          <h1 className="font-bold text-gray-900 mb-8 text-8xl">
            САЙТ УДАЧИ
          </h1>
          <p className="text-xl text-gray-600">Напишите в чем нужна удача , после кнопки " ОК "  оплата</p>
        </div>

        {/* Форма */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold">Ваше пожелание удачи</h2>
            <p className="text-gray-600">
              Опишите, в какой сфере жизни вам нужна удача
            </p>
          </div>
          <Textarea
            placeholder="Например: Нужна удача в работе, в любви, в здоровье, в поездках и перелётах..."
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
        </div>
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