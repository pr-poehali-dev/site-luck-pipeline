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
          
          // Супер плавное падение без рывков
          const smoothProgress = easeInOutSine(progress);
          const y = -20 + (window.innerHeight + 40) * smoothProgress;
          
          // Убираем качание - только прямое падение
          const swayX = 0;
          
          // Убираем вращение
          const rotation = initialRotation;
          
          // Убираем масштабирование - фиксированный размер
          const breathScale = 1;
          
          particle.style.opacity = opacity.toString();
          particle.style.top = y + 'px';
          particle.style.left = (startX + swayX) + 'px';
          
          if (shape === 'diamond') {
            particle.style.transform = `rotate(${45 + rotation}deg) scale(${breathScale})`;
          } else if (shape === 'petal' || shape === 'square') {
            particle.style.transform = `rotate(${rotation}deg) scale(${breathScale})`;
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
        const groupSize = Math.floor(Math.random() * 6) + 3; // 3-8 частиц (+50% больше)
        for (let i = 0; i < groupSize; i++) {
          setTimeout(() => createParticle(), i * Math.random() * 200);
        }
      };
      
      // Еще более частое появление
      confettiInterval.current = setInterval(() => {
        spawnGroup();
      }, Math.random() * 800 + 500); // 0.5-1.3 секунды между группами (еще чаще)
      
      // Первая группа сразу без задержки
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

  const [selectedLuckStrength, setSelectedLuckStrength] = useState(5);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('immediate');
  
  const timeSlots = [
    { id: 'immediate', label: 'Действует сразу', immediate: true },
    { id: 'morning', label: 'Утро (6:00 - 12:00)', immediate: false },
    { id: 'day', label: 'День (12:00 - 18:00)', immediate: false },
    { id: 'evening', label: 'Вечер (18:00 - 24:00)', immediate: false },
    { id: 'night', label: 'Ночь (00:00 - 6:00)', immediate: false }
  ];
  
  const calculatePrice = (strength: number) => strength * 100;
  const getDurationText = (strength: number) => {
    if (strength <= 2) return `${strength * 30} минут`;
    if (strength <= 5) return `${strength * 12} минут`;
    return `${strength * 10} минут силы`;
  };

  const handlePricingSelect = () => {
    const selectedSlot = timeSlots.find(slot => slot.id === selectedTimeSlot);
    const price = calculatePrice(selectedLuckStrength);
    const duration = getDurationText(selectedLuckStrength);
    
    if (!selectedSlot?.immediate && !selectedDate) {
      alert('Пожалуйста, укажите дату');
      return;
    }
    
    navigate('/payment', { 
      state: { 
        wish: wishText, 
        price: price,
        duration: `${duration} (${selectedSlot?.label})`,
        date: selectedSlot?.immediate ? null : selectedDate
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
            
            {/* Индикатор силы удачи */}
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Выберите силу удачи</h3>
                <p className="text-sm text-gray-600 mb-4">1 балл = 100₽</p>
              </div>
              
              <div className="flex justify-center items-center space-x-2">
                {Array.from({ length: 11 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedLuckStrength(i)}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all ${
                      i <= selectedLuckStrength 
                        ? 'bg-yellow-400 border-yellow-500 text-white' 
                        : 'bg-gray-100 border-gray-300 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-2">
                  {calculatePrice(selectedLuckStrength)} ₽
                </div>
                <div className="text-sm text-gray-600">
                  {getDurationText(selectedLuckStrength)}
                </div>
              </div>
            </div>

            {/* Выбор времени активации */}
            <div className="space-y-3">
              <h4 className="font-medium">Время активации:</h4>
              {timeSlots.map((slot) => (
                <Button
                  key={slot.id}
                  variant={selectedTimeSlot === slot.id ? "default" : "outline"}
                  onClick={() => setSelectedTimeSlot(slot.id)}
                  className="w-full justify-start"
                >
                  {slot.label}
                </Button>
              ))}
            </div>

            {/* Кнопка оплаты */}
            <Button 
              onClick={handlePricingSelect}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg"
            >
              Оплатить {calculatePrice(selectedLuckStrength)} ₽
            </Button>
            
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