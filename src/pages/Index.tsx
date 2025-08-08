import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const [wishText, setWishText] = useState('');
  const navigate = useNavigate();
  const confettiInterval = useRef<NodeJS.Timeout | null>(null);

  // Мягкое конфетти как падение снега
  useEffect(() => {
    const startSnowConfetti = () => {
      // Яркая радужная палитра
      const colors = [
        { primary: '#FF0080', secondary: '#FF6B9D' }, // ярко-розовый
        { primary: '#00BFFF', secondary: '#87CEEB' }, // небесно-голубой
        { primary: '#32CD32', secondary: '#90EE90' }, // лайм-зеленый
        { primary: '#FFD700', secondary: '#FFF68F' }, // золотой
        { primary: '#FF4500', secondary: '#FF7F50' }, // оранжево-красный
        { primary: '#9932CC', secondary: '#DA70D6' }, // темно-фиолетовый
        { primary: '#FF1493', secondary: '#FF69B4' }, // темно-розовый
        { primary: '#00CED1', secondary: '#48D1CC' }, // темно-бирюзовый
      ];
      
      const shapes = ['circle', 'diamond', 'star', 'heart'];
      
      const createParticle = () => {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 3; // 3-7px (маленький размер)
        const colorSet = colors[Math.floor(Math.random() * colors.length)];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const startX = Math.random() * window.innerWidth;
        
        // Базовые стили для всех частиц
        particle.style.position = 'fixed';
        particle.style.left = startX + 'px';
        particle.style.top = '-20px';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9998';
        particle.style.opacity = '0';
        particle.style.transition = 'none';
        
        // Создание мягких форм
        switch(shape) {
          case 'circle':
            particle.style.background = `radial-gradient(circle, ${colorSet.primary}90, ${colorSet.secondary}60)`;
            particle.style.borderRadius = '50%';
            particle.style.boxShadow = `0 0 ${size*2}px ${colorSet.primary}30`;
            break;
            
          case 'diamond':
            particle.style.background = `linear-gradient(45deg, ${colorSet.primary}80, ${colorSet.secondary}50)`;
            particle.style.borderRadius = '20%';
            particle.style.transform = 'rotate(45deg)';
            particle.style.boxShadow = `0 0 ${size*1.5}px ${colorSet.primary}25`;
            break;
            
          case 'star':
            const starEmojis = ['⭐', '✨'];
            particle.innerHTML = starEmojis[Math.floor(Math.random() * starEmojis.length)];
            particle.style.fontSize = size + 'px';
            particle.style.filter = `hue-rotate(${Math.random() * 360}deg) brightness(1.1) saturate(1.2)`;
            particle.style.textShadow = `0 0 ${size/2}px ${colorSet.primary}40`;
            break;
            
          case 'heart':
            const heartEmojis = ['💖', '💕'];
            particle.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            particle.style.fontSize = size + 'px';
            particle.style.filter = `hue-rotate(${Math.random() * 60}deg) brightness(1.1)`;
            particle.style.textShadow = `0 0 ${size/2}px ${colorSet.primary}35`;
            break;
        }
        
        document.body.appendChild(particle);
        
        // Очень плавная анимация как падение снега
        const duration = Math.random() * 8000 + 12000; // 12-20 секунд (очень медленно)
        const startTime = performance.now();
        const swayFreq = Math.random() * 0.5 + 0.3; // 0.3-0.8 (медленные колебания)
        const rotationSpeed = Math.random() * 90 + 30; // 30-120 градусов (медленное вращение)
        const initialRotation = Math.random() * 360;
        
        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = elapsed / duration;
          
          if (progress >= 1) {
            particle.remove();
            return;
          }
          
          // Очень мягкое появление и исчезновение
          let opacity = 0;
          if (progress < 0.2) {
            // Медленное появление за первые 20%
            opacity = easeInOutSine(progress / 0.2) * 0.7;
          } else if (progress > 0.8) {
            // Медленное исчезновение за последние 20%
            opacity = easeInOutSine((1 - progress) / 0.2) * 0.7;
          } else {
            opacity = 0.7;
          }
          
          // Равномерное плавное падение
          const y = -20 + (window.innerHeight + 40) * progress;
          
          // Очень мягкое качание как у снежинок
          const swayAmount = 15; // Небольшая амплитуда
          const swayX = Math.sin(progress * Math.PI * swayFreq * 4) * swayAmount;
          
          // Медленное плавное вращение
          const rotation = initialRotation + (rotationSpeed * progress);
          
          // Очень мягкое масштабирование
          const breathScale = 1 + Math.sin(progress * Math.PI * 2) * 0.05; // Дыхание 5%
          
          particle.style.opacity = opacity.toString();
          particle.style.top = y + 'px';
          particle.style.left = (startX + swayX) + 'px';
          
          if (shape === 'diamond') {
            particle.style.transform = `rotate(${45 + rotation}deg) scale(${breathScale})`;
          } else if (shape === 'circle') {
            particle.style.transform = `scale(${breathScale})`;
          } else {
            particle.style.transform = `scale(${breathScale})`;
          }
          
          requestAnimationFrame(animate);
        };
        
        requestAnimationFrame(animate);
      };
      
      // Функция плавности для снежного эффекта
      const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;
      
      const spawnGroup = () => {
        const groupSize = Math.floor(Math.random() * 2) + 1; // 1-2 частицы (мало)
        for (let i = 0; i < groupSize; i++) {
          setTimeout(() => createParticle(), i * Math.random() * 500);
        }
      };
      
      // Редкое мягкое появление как у снега
      confettiInterval.current = setInterval(() => {
        spawnGroup();
      }, Math.random() * 2000 + 1500); // 1.5-3.5 секунды между группами (редко)
      
      // Первая группа с задержкой
      setTimeout(() => spawnGroup(), 1000);
    };
    
    startSnowConfetti();
    
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