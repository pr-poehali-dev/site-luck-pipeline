import { useState, useEffect, useRef } from 'react';
import SplashScreen from '@/components/sections/SplashScreen';
import StrengthSelector from '@/components/sections/StrengthSelector';
import HomeSection from '@/components/sections/HomeSection';
import PricingSection from '@/components/sections/PricingSection';
import PaymentSection from '@/components/sections/PaymentSection';
import RulesSection from '@/components/sections/RulesSection';
import Navigation from '@/components/Navigation';
import confetti from 'canvas-confetti';

const OnePage = () => {
  const [wishText, setWishText] = useState('');
  const [showSplash, setShowSplash] = useState(true);
  const [isBreaking, setIsBreaking] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [strengthEvent, setStrengthEvent] = useState(1);
  const [strengthMorning, setStrengthMorning] = useState(1);
  const [strengthDay, setStrengthDay] = useState(1);
  const [strengthEvening, setStrengthEvening] = useState(1);
  const [nightStrength, setNightStrength] = useState(1);
  const [showStrengthSelector, setShowStrengthSelector] = useState(false);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [currentStrength, setCurrentStrength] = useState(0);
  const [currentSection, setCurrentSection] = useState('home');
  const [showPricing, setShowPricing] = useState(false);
  const confettiInterval = useRef<NodeJS.Timeout | null>(null);

  // Refs для секций
  const homeRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const paymentRef = useRef<HTMLDivElement>(null);
  const rulesRef = useRef<HTMLDivElement>(null);

  const handleSplashClick = () => {
    setIsBreaking(true);
    setTimeout(() => {
      setShowSplash(false);
    }, 2000);
  };

  // Конфетти при загрузке страницы
  useEffect(() => {
    const startConfetti = () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.2 }
      });
    };

    // Запускаем сразу
    startConfetti();
    
    // Продолжаем запускать каждые 4 секунды
    const interval = setInterval(startConfetti, 4000);
    
    // Останавливаем через 20 секунд
    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 20000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  // Функция плавной прокрутки к секции
  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>, sectionName: string) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    setCurrentSection(sectionName);
  };

  const handleSubmit = () => {
    if (wishText.trim()) {
      setShowPricing(true);
      setCurrentSection('pricing');
      setTimeout(() => {
        scrollToSection(pricingRef, 'pricing');
      }, 100);
    }
  };

  // Конфетти эффект для секции pricing
  useEffect(() => {
    if (currentSection === 'pricing') {
      const startRainbowConfetti = () => {
        const colors = [
          { primary: '#FF0080', secondary: '#FF6B9D' },
          { primary: '#00BFFF', secondary: '#87CEEB' },
          { primary: '#32CD32', secondary: '#90EE90' },
          { primary: '#FFD700', secondary: '#FFF68F' },
          { primary: '#FF4500', secondary: '#FF7F50' },
          { primary: '#9932CC', secondary: '#DA70D6' },
          { primary: '#FF1493', secondary: '#FF69B4' },
          { primary: '#00CED1', secondary: '#48D1CC' },
          { primary: '#FF6347', secondary: '#FFA07A' },
          { primary: '#7B68EE', secondary: '#9370DB' },
        ];
        
        const shapes = ['circle', 'diamond', 'star', 'heart', 'petal', 'square', 'sparkle', 'flower'];
        
        const createParticle = () => {
          const particle = document.createElement('div');
          const size = Math.random() * 4 + 3;
          const colorSet = colors[Math.floor(Math.random() * colors.length)];
          const shape = shapes[Math.floor(Math.random() * shapes.length)];
          const startX = Math.random() * window.innerWidth;
          
          particle.style.position = 'fixed';
          particle.style.left = startX + 'px';
          particle.style.top = '-20px';
          particle.style.width = size + 'px';
          particle.style.height = size + 'px';
          particle.style.pointerEvents = 'none';
          particle.style.zIndex = '9998';
          particle.style.opacity = '0';
          particle.style.transition = 'none';
          
          switch(shape) {
            case 'circle':
              particle.style.background = `radial-gradient(circle, ${colorSet.primary}, ${colorSet.secondary})`;
              particle.style.borderRadius = '50%';
              particle.style.boxShadow = `0 0 ${size*1.5}px ${colorSet.primary}60`;
              break;
            case 'star':
              const starEmojis = ['⭐', '🌟', '✨', '💫'];
              particle.innerHTML = starEmojis[Math.floor(Math.random() * starEmojis.length)];
              particle.style.fontSize = size + 'px';
              particle.style.filter = `hue-rotate(${Math.random() * 360}deg) brightness(1.3) saturate(1.5)`;
              break;
            default:
              particle.style.background = `linear-gradient(45deg, ${colorSet.primary}, ${colorSet.secondary})`;
              particle.style.borderRadius = '50%';
              break;
          }
          
          document.body.appendChild(particle);
          
          const duration = Math.random() * 8000 + 12000;
          const startTime = performance.now();
          
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = elapsed / duration;
            
            if (progress >= 1) {
              particle.remove();
              return;
            }
            
            let opacity = 0;
            if (progress < 0.2) {
              opacity = (progress / 0.2) * 0.7;
            } else if (progress > 0.8) {
              opacity = ((1 - progress) / 0.2) * 0.7;
            } else {
              opacity = 0.7;
            }
            
            const y = -20 + (window.innerHeight + 40) * progress;
            
            particle.style.opacity = opacity.toString();
            particle.style.top = y + 'px';
            
            requestAnimationFrame(animate);
          };
          
          requestAnimationFrame(animate);
        };
        
        const spawnGroup = () => {
          const groupSize = Math.floor(Math.random() * 6) + 3;
          for (let i = 0; i < groupSize; i++) {
            setTimeout(() => createParticle(), i * Math.random() * 200);
          }
        };
        
        confettiInterval.current = setInterval(() => {
          spawnGroup();
        }, Math.random() * 800 + 500);
        
        spawnGroup();
      };
      
      startRainbowConfetti();
      
      return () => {
        if (confettiInterval.current) {
          clearInterval(confettiInterval.current);
        }
        document.querySelectorAll('div[style*="position: fixed"]').forEach(el => {
          if (el.style.zIndex === '9998') el.remove();
        });
      };
    }
  }, [currentSection]);

  const pricingOptions = [
    { duration: 'Удача на событие', price: strengthEvent * 100, immediate: true, type: 'event' },
    { duration: 'Утро (6:00 - 12:00)', price: strengthMorning * 100, immediate: false, type: 'morning' },
    { duration: 'День (12:00 - 18:00)', price: strengthDay * 100, immediate: false, type: 'day' },
    { duration: 'Вечер (18:00 - 24:00)', price: strengthEvening * 100, immediate: false, type: 'evening' },
    { duration: 'Ночь (00:00 - 6:00)', price: nightStrength * 100, immediate: false, type: 'night' }
  ];

  const handlePricingSelect = (price: number, duration: string, immediate: boolean, type: string) => {
    if (!immediate && !selectedDate) {
      alert('Пожалуйста, укажите дату');
      return;
    }
    
    setSelectedOption({ price, duration, immediate, type });
    setShowStrengthSelector(true);
  };

  const handleStrengthConfirm = () => {
    setShowStrengthSelector(false);
    setCurrentSection('payment');
    setTimeout(() => {
      scrollToSection(paymentRef, 'payment');
    }, 100);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const { description, amount, email, receipt } = form;

    if (receipt) {
      if (!email.value) {
        return alert("Поле E-mail не должно быть пустым");
      }

      (receipt as HTMLInputElement).value = JSON.stringify({
        "EmailCompany": "mail@mail.com",
        "Taxation": "patent",
        "FfdVersion": "1.2",
        "Items": [
          {
            "Name": (description as HTMLInputElement).value || "Активация удачи",
            "Price": Math.round(Number((amount as HTMLInputElement).value) * 100),
            "Quantity": 1.00,
            "Amount": Math.round(Number((amount as HTMLInputElement).value) * 100),
            "PaymentMethod": "full_prepayment",
            "PaymentObject": "service",
            "Tax": "none",
            "MeasurementUnit": "pc"
          }
        ]
      });
    }

    if ((window as any).pay) {
      (window as any).pay(form);
    } else {
      console.error('Tinkoff pay function not available');
      alert('Ошибка инициализации платежной системы. Попробуйте перезагрузить страницу.');
    }
  };

  // Загрузка скрипта Тинькофф
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js';
    script.async = true;
    script.onload = () => {
      console.log('Tinkoff script loaded successfully');
    };
    script.onerror = () => {
      console.error('Failed to load Tinkoff script');
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  if (showSplash) {
    return <SplashScreen isBreaking={isBreaking} onSplashClick={handleSplashClick} />;
  }

  if (showStrengthSelector) {
    return (
      <StrengthSelector
        selectedOption={selectedOption}
        currentStrength={currentStrength}
        setCurrentStrength={setCurrentStrength}
        onBack={() => setShowStrengthSelector(false)}
        onConfirm={handleStrengthConfirm}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation
        currentSection={currentSection}
        showPricing={showPricing}
        onHomeClick={() => scrollToSection(homeRef, 'home')}
        onPricingClick={() => scrollToSection(pricingRef, 'pricing')}
        onPaymentClick={() => scrollToSection(paymentRef, 'payment')}
        onRulesClick={() => scrollToSection(rulesRef, 'rules')}
      />

      <HomeSection
        homeRef={homeRef}
        wishText={wishText}
        setWishText={setWishText}
        onSubmit={handleSubmit}
      />

      <PricingSection
        pricingRef={pricingRef}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        pricingOptions={pricingOptions}
        onPricingSelect={handlePricingSelect}
      />

      <PaymentSection
        paymentRef={paymentRef}
        wishText={wishText}
        selectedOption={selectedOption}
        selectedDate={selectedDate}
        currentStrength={currentStrength}
        onFormSubmit={handleFormSubmit}
      />

      <RulesSection rulesRef={rulesRef} />
    </div>
  );
};

export default OnePage;