import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const [wishText, setWishText] = useState('');
  const navigate = useNavigate();
  const confettiInterval = useRef<NodeJS.Timeout | null>(null);

  // Автоматический запуск яркого радужного конфетти при загрузке страницы
  useEffect(() => {
    const startRainbowConfetti = () => {
      // Яркая радужная палитра с насыщенными цветами
      const colors = [
        { primary: '#FF0080', secondary: '#FF6B9D' }, // ярко-розовый
        { primary: '#00BFFF', secondary: '#87CEEB' }, // небесно-голубой
        { primary: '#32CD32', secondary: '#90EE90' }, // лайм-зеленый
        { primary: '#FFD700', secondary: '#FFF68F' }, // золотой
        { primary: '#FF4500', secondary: '#FF7F50' }, // оранжево-красный
        { primary: '#9932CC', secondary: '#DA70D6' }, // темно-фиолетовый
        { primary: '#FF1493', secondary: '#FF69B4' }, // темно-розовый
        { primary: '#00CED1', secondary: '#48D1CC' }, // темно-бирюзовый
        { primary: '#FF6347', secondary: '#FFA07A' }, // томатный
        { primary: '#7B68EE', secondary: '#9370DB' }, // средне-синий
        { primary: '#20B2AA', secondary: '#66CDAA' }, // светло-морской
        { primary: '#FF8C00', secondary: '#FFB347' }, // темно-оранжевый
        { primary: '#DC143C', secondary: '#F08080' }, // багряный
        { primary: '#4169E1', secondary: '#6495ED' }, // королевский синий
        { primary: '#228B22', secondary: '#32CD32' }, // лесной зеленый
        { primary: '#FF00FF', secondary: '#DA70D6' }, // пурпурный
        { primary: '#00FF7F', secondary: '#7FFF00' }, // весенне-зеленый
        { primary: '#FF69B4', secondary: '#FFB6C1' }, // горячий розовый
        { primary: '#4682B4', secondary: '#87CEFA' }, // стальной синий
        { primary: '#D2691E', secondary: '#F4A460' }, // шоколадный
      ];
      
      const shapes = ['circle', 'diamond', 'star', 'heart', 'petal', 'square', 'sparkle', 'flower'];
      
      const createParticle = () => {
        const particle = document.createElement('div');
        const size = Math.random() * 10 + 6; // 6-16px (больше размер)
        const colorSet = colors[Math.floor(Math.random() * colors.length)];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const startX = Math.random() * window.innerWidth;
        
        // Базовые стили для всех частиц
        particle.style.position = 'fixed';
        particle.style.left = startX + 'px';
        particle.style.top = '-40px';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9998';
        particle.style.opacity = '0';
        particle.style.transition = 'none';
        
        // Создание разноцветных ярких форм
        switch(shape) {
          case 'circle':
            particle.style.background = `radial-gradient(circle, ${colorSet.primary}, ${colorSet.secondary})`;
            particle.style.borderRadius = '50%';
            particle.style.boxShadow = `0 0 ${size*1.5}px ${colorSet.primary}60, 0 0 ${size*2.5}px ${colorSet.secondary}30`;
            break;
            
          case 'diamond':
            particle.style.background = `linear-gradient(45deg, ${colorSet.primary}, ${colorSet.secondary})`;
            particle.style.borderRadius = '15%';
            particle.style.transform = 'rotate(45deg)';
            particle.style.boxShadow = `0 0 ${size*2}px ${colorSet.primary}40, 0 0 ${size*3}px ${colorSet.secondary}20`;
            break;
            
          case 'square':
            particle.style.background = `linear-gradient(135deg, ${colorSet.primary}, ${colorSet.secondary})`;
            particle.style.borderRadius = '25%';
            particle.style.boxShadow = `0 0 ${size*1.5}px ${colorSet.primary}50`;
            break;
            
          case 'star':
            const starEmojis = ['⭐', '🌟', '✨', '💫'];
            particle.innerHTML = starEmojis[Math.floor(Math.random() * starEmojis.length)];
            particle.style.fontSize = size + 'px';
            particle.style.filter = `hue-rotate(${Math.random() * 360}deg) brightness(1.3) saturate(1.5)`;
            particle.style.textShadow = `0 0 ${size}px ${colorSet.primary}80`;
            break;
            
          case 'heart':
            const heartEmojis = ['💖', '💕', '💝', '💗', '💘'];
            particle.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            particle.style.fontSize = size + 'px';
            particle.style.filter = `hue-rotate(${Math.random() * 360}deg) brightness(1.2) saturate(1.4)`;
            particle.style.textShadow = `0 0 ${size}px ${colorSet.primary}70`;
            break;
            
          case 'petal':
            particle.style.background = `linear-gradient(135deg, ${colorSet.primary}, ${colorSet.secondary})`;
            particle.style.borderRadius = '100% 0% 100% 0%';
            particle.style.boxShadow = `0 0 ${size*1.5}px ${colorSet.primary}40`;
            break;
            
          case 'sparkle':
            particle.innerHTML = '✦';
            particle.style.fontSize = size + 'px';
            particle.style.color = colorSet.primary;
            particle.style.filter = `brightness(1.4) saturate(1.6)`;
            particle.style.textShadow = `0 0 ${size}px ${colorSet.primary}90, 0 0 ${size*2}px ${colorSet.secondary}50`;
            break;
            
          case 'flower':
            const flowerEmojis = ['🌸', '🌺', '🌻', '🌷', '🌹'];
            particle.innerHTML = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
            particle.style.fontSize = size + 'px';
            particle.style.filter = `hue-rotate(${Math.random() * 360}deg) brightness(1.2)`;
            particle.style.textShadow = `0 0 ${size/2}px ${colorSet.primary}60`;
            break;
        }
        
        document.body.appendChild(particle);
        
        // Более быстрая и энергичная анимация
        const duration = Math.random() * 3000 + 6000; // 6-9 секунд (быстрее)
        const startTime = performance.now();
        const swayFreq = Math.random() * 3 + 2; // 2-5 колебаний
        const rotationSpeed = Math.random() * 360 + 180; // 180-540 градусов
        const initialRotation = Math.random() * 360;
        
        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = elapsed / duration;
          
          if (progress >= 1) {
            particle.remove();
            return;
          }
          
          // Быстрое появление и исчезновение
          let opacity = 0;
          if (progress < 0.1) {
            opacity = easeOutQuart(progress / 0.1) * 0.9;
          } else if (progress > 0.85) {
            opacity = easeOutQuart((1 - progress) / 0.15) * 0.9;
          } else {
            opacity = 0.9;
          }
          
          // Падение с небольшим ускорением
          const fallProgress = easeInOutCubic(progress);
          const y = -40 + (window.innerHeight + 80) * fallProgress;
          
          // Энергичное качание
          const swayAmount = 40;
          const swayX = Math.sin(progress * Math.PI * swayFreq * 2) * swayAmount;
          
          // Активное вращение
          const rotation = initialRotation + (rotationSpeed * progress);
          
          // Пульсирующее масштабирование
          const pulsScale = 0.9 + Math.sin(progress * Math.PI * 8) * 0.15;
          const scale = pulsScale * (1 + Math.sin(progress * Math.PI * 2) * 0.1);
          
          particle.style.opacity = opacity.toString();
          particle.style.top = y + 'px';
          particle.style.left = (startX + swayX) + 'px';
          
          if (shape === 'diamond') {
            particle.style.transform = `rotate(${45 + rotation}deg) scale(${scale})`;
          } else if (shape === 'petal' || shape === 'square') {
            particle.style.transform = `rotate(${rotation}deg) scale(${scale})`;
          } else if (shape === 'circle') {
            particle.style.transform = `scale(${scale})`;
          } else {
            particle.style.transform = `scale(${scale})`;
          }
          
          requestAnimationFrame(animate);
        };
        
        requestAnimationFrame(animate);
      };
      
      // Функции плавности для энергичной анимации
      const easeOutQuart = (t: number) => 1 - (--t) * t * t * t;
      const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      
      const spawnGroup = () => {
        const groupSize = Math.floor(Math.random() * 4) + 3; // 3-6 частиц (больше)
        for (let i = 0; i < groupSize; i++) {
          setTimeout(() => createParticle(), i * Math.random() * 150);
        }
      };
      
      // Частое появление групп для праздничности
      confettiInterval.current = setInterval(() => {
        spawnGroup();
      }, Math.random() * 600 + 300); // 0.3-0.9 секунды между группами (чаще)
      
      // Первая группа сразу
      spawnGroup();
    };
    
    startRainbowConfetti();
    
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

  const handleSubmit = () => {
    if (wishText.trim()) {
      navigate('/pricing', { state: { wish: wishText } });
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