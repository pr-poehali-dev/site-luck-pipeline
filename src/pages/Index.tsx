import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Terminal from '@/components/Terminal';

const Index = () => {
  const [wishText, setWishText] = useState('');
  const [showSplash, setShowSplash] = useState(true);
  const [isBreaking, setIsBreaking] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
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
        className={`fixed inset-0 z-50 bg-black cursor-pointer overflow-hidden ${isBreaking ? 'breaking-glass' : ''}`}
        onClick={handleSplashClick}
      >
        {/* Звездное небо */}
        <div className="absolute inset-0">
          {stars.map((star) => (
            <div
              key={star.id}
              className={`absolute bg-white rounded-full ${isBreaking ? `shard-${star.id % 20}` : 'twinkle'}`}
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
        
        {/* Центральный текст */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`text-center text-white ${isBreaking ? 'fade-out' : 'fade-in'}`}>
            <h1 className="text-6xl font-bold mb-4 text-shadow-lg">
              САЙТ УДАЧИ
            </h1>
            <p className="text-xl opacity-80">
              Нажмите, чтобы войти
            </p>
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
          
          .breaking-glass {
            animation: shatter 2s ease-out;
          }
          
          @keyframes shatter {
            0% { transform: scale(1); }
            100% { transform: scale(1.2); opacity: 0; }
          }
          
          .text-shadow-lg {
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.5),
                         0 0 40px rgba(255, 255, 255, 0.3),
                         0 0 60px rgba(255, 255, 255, 0.2);
          }
          
          /* Анимации осколков */
          ${Array.from({length: 20}, (_, i) => `
            .shard-${i} {
              animation: shard${i} 2s ease-out forwards;
            }
            
            @keyframes shard${i} {
              0% { 
                transform: translate(0, 0) rotate(0deg) scale(1);
                opacity: 1;
              }
              100% { 
                transform: translate(${(Math.random() - 0.5) * 2000}px, ${(Math.random() - 0.5) * 2000}px) 
                           rotate(${Math.random() * 720}deg) 
                           scale(${Math.random() * 0.5 + 0.2});
                opacity: 0;
              }
            }
          `).join('')}
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
      <div className="w-full flex justify-center gap-4 pb-4">
        <button 
          onClick={() => navigate('/rules')}
          className="text-gray-500 hover:text-gray-700 underline text-sm"
        >
          Правила использования
        </button>
        <button 
          onClick={() => setShowTerminal(true)}
          className="text-green-500 hover:text-green-400 underline text-sm font-mono"
        >
          Terminal
        </button>
      </div>
      
      {/* Terminal Component */}
      <Terminal 
        isVisible={showTerminal} 
        onClose={() => setShowTerminal(false)} 
      />
    </div>
  );
};

export default Index;