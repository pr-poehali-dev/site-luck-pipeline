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

  // Автоматический запуск элегантного конфетти при загрузке страницы
  useEffect(() => {
    const startElegantConfetti = () => {
      // Пастельная палитра с градиентными оттенками
      const colors = [
        { primary: '#FF9A9E', secondary: '#FECFEF' }, // розовый градиент
        { primary: '#A8E6CF', secondary: '#DCEDC1' }, // зеленый градиент
        { primary: '#FFD3A5', secondary: '#FD9853' }, // оранжевый градиент
        { primary: '#A8D8EA', secondary: '#C7E9F4' }, // голубой градиент
        { primary: '#D4A5FF', secondary: '#E8C5FF' }, // фиолетовый градиент
        { primary: '#FFB3BA', secondary: '#FFDFBA' }, // персиковый градиент
        { primary: '#B5E5CF', secondary: '#C8F0E0' }, // мятный градиент
        { primary: '#FFCCF9', secondary: '#F3E5F5' }, // лиловый градиент
      ];
      
      const shapes = ['circle', 'diamond', 'star', 'heart', 'petal'];
      
      const createParticle = () => {
        const particle = document.createElement('div');
        const size = Math.random() * 6 + 4; // 4-10px (меньше размер)
        const colorSet = colors[Math.floor(Math.random() * colors.length)];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const startX = Math.random() * window.innerWidth;
        
        // Базовые стили для всех частиц
        particle.style.position = 'fixed';
        particle.style.left = startX + 'px';
        particle.style.top = '-30px';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9998';
        particle.style.opacity = '0';
        particle.style.transition = 'none';
        
        // Создание красивых форм с градиентами
        switch(shape) {
          case 'circle':
            particle.style.background = `radial-gradient(circle, ${colorSet.primary}, ${colorSet.secondary})`;
            particle.style.borderRadius = '50%';
            particle.style.boxShadow = `0 0 ${size}px ${colorSet.primary}30, inset 0 0 ${size/2}px ${colorSet.secondary}20`;
            break;
            
          case 'diamond':
            particle.style.background = `linear-gradient(45deg, ${colorSet.primary}, ${colorSet.secondary})`;
            particle.style.borderRadius = '15%';
            particle.style.transform = 'rotate(45deg)';
            particle.style.boxShadow = `0 0 ${size*1.5}px ${colorSet.primary}25`;
            break;
            
          case 'star':
            particle.innerHTML = '✨';
            particle.style.fontSize = size + 'px';
            particle.style.filter = `hue-rotate(${Math.random() * 360}deg) brightness(1.1) saturate(1.2)`;
            particle.style.textShadow = `0 0 ${size/2}px ${colorSet.primary}60`;
            break;
            
          case 'heart':
            particle.innerHTML = '💝';
            particle.style.fontSize = size + 'px';
            particle.style.filter = `hue-rotate(${Math.random() * 60 - 30}deg) brightness(1.15)`;
            particle.style.textShadow = `0 0 ${size/2}px ${colorSet.primary}50`;
            break;
            
          case 'petal':
            particle.style.background = `linear-gradient(135deg, ${colorSet.primary}, ${colorSet.secondary})`;
            particle.style.borderRadius = '100% 0% 100% 0%';
            particle.style.boxShadow = `0 0 ${size}px ${colorSet.primary}20`;
            break;
        }
        
        document.body.appendChild(particle);
        
        // Более плавная и изящная анимация
        const duration = Math.random() * 4000 + 10000; // 10-14 секунд (дольше)
        const startTime = performance.now();
        const swayFreq = Math.random() * 2 + 1; // 1-3 колебания
        const rotationSpeed = Math.random() * 180 + 90; // 90-270 градусов за время жизни
        const initialRotation = Math.random() * 360;
        
        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = elapsed / duration;
          
          if (progress >= 1) {
            particle.remove();
            return;
          }
          
          // Очень плавное появление и исчезновение
          let opacity = 0;
          if (progress < 0.15) {
            // Медленное появление за первые 15%
            opacity = easeInOutQuart(progress / 0.15) * 0.8;
          } else if (progress > 0.85) {
            // Медленное исчезновение за последние 15%
            opacity = easeInOutQuart((1 - progress) / 0.15) * 0.8;
          } else {
            opacity = 0.8;
          }
          
          // Плавное падение с легким ускорением
          const fallProgress = easeInQuart(progress);
          const y = -30 + (window.innerHeight + 60) * fallProgress;
          
          // Более изящное качание
          const swayAmount = 25;
          const swayX = Math.sin(progress * Math.PI * swayFreq * 2) * swayAmount * (1 - progress * 0.3);
          
          // Плавное вращение
          const rotation = initialRotation + (rotationSpeed * progress);
          
          // Легкое масштабирование для глубины
          const scale = 0.8 + Math.sin(progress * Math.PI) * 0.2;
          
          particle.style.opacity = opacity.toString();
          particle.style.top = y + 'px';
          particle.style.left = (startX + swayX) + 'px';
          
          if (shape === 'diamond') {
            particle.style.transform = `rotate(${45 + rotation}deg) scale(${scale})`;
          } else if (shape === 'petal') {
            particle.style.transform = `rotate(${rotation}deg) scale(${scale})`;
          } else if (shape !== 'star' && shape !== 'heart') {
            particle.style.transform = `rotate(${rotation}deg) scale(${scale})`;
          } else {
            particle.style.transform = `scale(${scale})`;
          }
          
          requestAnimationFrame(animate);
        };
        
        requestAnimationFrame(animate);
      };
      
      // Функции плавности
      const easeInOutQuart = (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
      const easeInQuart = (t: number) => t * t * t * t;
      
      const spawnGroup = () => {
        const groupSize = Math.floor(Math.random() * 2) + 1; // 1-2 частицы (меньше)
        for (let i = 0; i < groupSize; i++) {
          setTimeout(() => createParticle(), i * Math.random() * 200);
        }
      };
      
      // Более редкое появление групп для элегантности
      confettiInterval.current = setInterval(() => {
        spawnGroup();
      }, Math.random() * 1500 + 1000); // 1-2.5 секунды между группами
      
      // Первая группа с небольшой задержкой
      setTimeout(() => spawnGroup(), 500);
    };
    
    startElegantConfetti();
    
    return () => {
      if (confettiInterval.current) {
        clearInterval(confettiInterval.current);
      }
      // Удаляем все оставшиеся частицы
      document.querySelectorAll('div[style*="position: fixed"]').forEach(el => {
        if (el.style.zIndex === '9998') el.remove();
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