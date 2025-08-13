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
    }, 2000);
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

  const stars = generateStars();

  const handleSubmit = () => {
    if (wishText.trim()) {
      navigate('/pricing', { state: { wish: wishText } });
    }
  };

  if (showSplash) {
    return (
      <div 
        className="fixed inset-0 z-50 cursor-pointer overflow-hidden"
        onClick={handleSplashClick}
      >
        {/* Крупные куски заставки */}
        <div className={`absolute inset-0 ${isBreaking ? 'breaking' : ''}`}>
          {/* Левый верхний кусок */}
          <div className={`absolute bg-black w-1/2 h-1/2 top-0 left-0 ${isBreaking ? 'chunk-1' : ''}`}>
            <div className="absolute inset-0 overflow-hidden">
              {stars.slice(0, 50).map((star) => (
                <div
                  key={star.id}
                  className="absolute bg-white rounded-full twinkle"
                  style={{
                    left: `${star.x * 2}%`,
                    top: `${star.y * 2}%`,
                    width: `${star.size}px`,
                    height: `${star.size}px`,
                    opacity: star.opacity,
                    animationDelay: `${star.animationDelay}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Правый верхний кусок */}
          <div className={`absolute bg-black w-1/2 h-1/2 top-0 right-0 ${isBreaking ? 'chunk-2' : ''}`}>
            <div className="absolute inset-0 overflow-hidden">
              {stars.slice(50, 100).map((star) => (
                <div
                  key={star.id}
                  className="absolute bg-white rounded-full twinkle"
                  style={{
                    left: `${(star.x - 50) * 2}%`,
                    top: `${star.y * 2}%`,
                    width: `${star.size}px`,
                    height: `${star.size}px`,
                    opacity: star.opacity,
                    animationDelay: `${star.animationDelay}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Левый нижний кусок */}
          <div className={`absolute bg-black w-1/2 h-1/2 bottom-0 left-0 ${isBreaking ? 'chunk-3' : ''}`}>
            <div className="absolute inset-0 overflow-hidden">
              {stars.slice(100, 150).map((star) => (
                <div
                  key={star.id}
                  className="absolute bg-white rounded-full twinkle"
                  style={{
                    left: `${star.x * 2}%`,
                    top: `${(star.y - 50) * 2}%`,
                    width: `${star.size}px`,
                    height: `${star.size}px`,
                    opacity: star.opacity,
                    animationDelay: `${star.animationDelay}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Правый нижний кусок */}
          <div className={`absolute bg-black w-1/2 h-1/2 bottom-0 right-0 ${isBreaking ? 'chunk-4' : ''}`}>
            <div className="absolute inset-0 overflow-hidden">
              {stars.slice(150, 200).map((star) => (
                <div
                  key={star.id}
                  className="absolute bg-white rounded-full twinkle"
                  style={{
                    left: `${(star.x - 50) * 2}%`,
                    top: `${(star.y - 50) * 2}%`,
                    width: `${star.size}px`,
                    height: `${star.size}px`,
                    opacity: star.opacity,
                    animationDelay: `${star.animationDelay}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Центральный кусок с текстом */}
          <div className={`absolute bg-black w-64 h-32 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isBreaking ? 'chunk-center' : ''}`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`text-center text-white ${isBreaking ? 'fade-out' : 'fade-in'}`}>
                <h1 className="text-4xl font-bold mb-2 text-shadow-lg">
                  САЙТ УДАЧИ
                </h1>
                <p className="text-sm opacity-80">
                  Нажмите, чтобы войти
                </p>
              </div>
            </div>
          </div>
        </div>

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
          
          .fade-out {
            animation: fadeOut 0.5s ease-out;
          }
          
          @keyframes fadeIn {
            0% { opacity: 0; transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
          }
          
          @keyframes fadeOut {
            0% { opacity: 1; }
            100% { opacity: 0; }
          }
          
          .text-shadow-lg {
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.5),
                         0 0 40px rgba(255, 255, 255, 0.3),
                         0 0 60px rgba(255, 255, 255, 0.2);
          }
          
          /* Анимации кусков */
          .chunk-1 {
            animation: chunk1 2s ease-in-out forwards;
            transform-origin: center center;
          }
          
          .chunk-2 {
            animation: chunk2 2s ease-in-out forwards;
            transform-origin: center center;
          }
          
          .chunk-3 {
            animation: chunk3 2s ease-in-out forwards;
            transform-origin: center center;
          }
          
          .chunk-4 {
            animation: chunk4 2s ease-in-out forwards;
            transform-origin: center center;
          }
          
          .chunk-center {
            animation: chunkCenter 2s ease-in-out forwards;
            transform-origin: center center;
          }
          
          @keyframes chunk1 {
            0% { 
              transform: translate(0, 0) rotate(0deg);
              opacity: 1;
            }
            100% { 
              transform: translate(-800px, -600px) rotate(-45deg);
              opacity: 0;
            }
          }
          
          @keyframes chunk2 {
            0% { 
              transform: translate(0, 0) rotate(0deg);
              opacity: 1;
            }
            100% { 
              transform: translate(800px, -600px) rotate(45deg);
              opacity: 0;
            }
          }
          
          @keyframes chunk3 {
            0% { 
              transform: translate(0, 0) rotate(0deg);
              opacity: 1;
            }
            100% { 
              transform: translate(-800px, 600px) rotate(45deg);
              opacity: 0;
            }
          }
          
          @keyframes chunk4 {
            0% { 
              transform: translate(0, 0) rotate(0deg);
              opacity: 1;
            }
            100% { 
              transform: translate(800px, 600px) rotate(-45deg);
              opacity: 0;
            }
          }
          
          @keyframes chunkCenter {
            0% { 
              transform: translate(-50%, -50%) rotate(0deg) scale(1);
              opacity: 1;
            }
            100% { 
              transform: translate(-50%, -50%) rotate(180deg) scale(0.3);
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