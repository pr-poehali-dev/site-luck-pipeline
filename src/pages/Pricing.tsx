import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const Pricing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const wishText = location.state?.wish || '';
  const [selectedDate, setSelectedDate] = useState('');
  const confettiInterval = useRef<NodeJS.Timeout | null>(null);

  // Автоматический запуск конфетти при загрузке страницы
  useEffect(() => {
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
    
    return () => {
      if (confettiInterval.current) {
        clearInterval(confettiInterval.current);
      }
      // Удаляем все оставшиеся частицы
      document.querySelectorAll('div[style*="position: fixed"]').forEach(el => {
        if (el.style.zIndex === '9999') el.remove();
      });
    };
  }, []);

  const pricingOptions = [
    { duration: '30 минут', price: 250, immediate: true },
    { duration: '1 час', price: 500, immediate: true },
    { duration: 'Удача на событие', price: 1000, immediate: true },
    { duration: 'Утро (6:00 - 12:00)', price: 1000, immediate: false },
    { duration: 'День (12:00 - 18:00)', price: 1500, immediate: false },
    { duration: 'Вечер (18:00 - 24:00)', price: 1500, immediate: false },
    { duration: 'Ночь (00:00 - 6:00)', price: 1000, immediate: false }
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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        <Card className="shadow-lg">
          <CardContent className="pt-6">
            {/* Поле для ввода даты */}
            <div className="mb-6">
              <label className="block font-medium text-gray-700 mb-2 text-2xl">
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
                    {option.immediate ? (
                      <span className="text-sm text-green-600 font-medium">Действует сразу после оплаты</span>
                    ) : (
                      <span className="text-sm text-blue-600 font-medium">Укажите дату активации</span>
                    )}
                  </div>
                  <span className="text-xl font-bold text-purple-600">{option.price} ₽</span>
                </Button>
              ))}
            </div>
            
            <div className="flex justify-center mt-6">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="text-gray-500"
              >
                ← Изменить пожелание
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Pricing;