import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

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

  // Функция плавной прокрутки к секции
  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>, sectionName: string) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    setCurrentSection(sectionName);
  };

  const handleSubmit = () => {
    if (wishText.trim()) {
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
    return (
      <div 
        className={`fixed inset-0 z-50 bg-black cursor-pointer overflow-hidden ${isBreaking ? 'breaking-glass' : ''}`}
        onClick={handleSplashClick}
      >
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

  if (showStrengthSelector) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Выберите силу удачи
                </h2>
                <p className="text-gray-600">{selectedOption?.duration}</p>
              </div>
              
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-800">
                    {currentStrength * 100} ₽
                  </div>
                </div>
                
                <div className="w-full">
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={currentStrength}
                      onChange={(e) => setCurrentStrength(parseInt(e.target.value))}
                      className="w-full h-8 bg-gray-200 rounded-lg cursor-pointer appearance-none slider"
                      style={{
                        background: (() => {
                          const fillPercent = (currentStrength / 10) * 100;
                          const ratio = currentStrength / 10;
                          const lightGreen = [220, 252, 231];
                          const darkGreen = [21, 128, 61];
                          const r = Math.round(lightGreen[0] + (darkGreen[0] - lightGreen[0]) * ratio);
                          const g = Math.round(lightGreen[1] + (darkGreen[1] - lightGreen[1]) * ratio);
                          const b = Math.round(lightGreen[2] + (darkGreen[2] - lightGreen[2]) * ratio);
                          const currentColor = `rgb(${r}, ${g}, ${b})`;
                          return `linear-gradient(to right, 
                            ${currentColor} 0%, 
                            ${currentColor} ${fillPercent}%, 
                            #e5e7eb ${fillPercent}%, 
                            #e5e7eb 100%)`;
                        })(),
                        WebkitAppearance: 'none'
                      }}
                    />
                    <style jsx>{`
                      .slider::-webkit-slider-thumb {
                        appearance: none;
                        width: 24px;
                        height: 24px;
                        border-radius: 50%;
                        background: #22c55e;
                        border: 3px solid white;
                        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                        cursor: pointer;
                      }
                      .slider::-moz-range-thumb {
                        width: 24px;
                        height: 24px;
                        border-radius: 50%;
                        background: #22c55e;
                        border: 3px solid white;
                        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                        cursor: pointer;
                      }
                    `}</style>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400 mt-2">
                    <span>0</span>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span>7</span>
                    <span>8</span>
                    <span>9</span>
                    <span>10</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowStrengthSelector(false)}
                    className="flex-1 border-green-600 text-green-600 hover:bg-green-50"
                  >
                    ← Назад
                  </Button>
                  <Button
                    onClick={handleStrengthConfirm}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    Продолжить
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Фиксированная навигация */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-40 border-b">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-center space-x-6">
          <button
            onClick={() => scrollToSection(homeRef, 'home')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentSection === 'home' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Главная
          </button>
          <button
            onClick={() => scrollToSection(pricingRef, 'pricing')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentSection === 'pricing' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Тарифы
          </button>
          <button
            onClick={() => scrollToSection(paymentRef, 'payment')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentSection === 'payment' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Оплата
          </button>
          <button
            onClick={() => scrollToSection(rulesRef, 'rules')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentSection === 'rules' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Правила
          </button>
        </div>
      </nav>

      {/* Главная секция */}
      <section ref={homeRef} className="min-h-screen bg-white flex flex-col items-center justify-center p-4 pt-20">
        <div className="w-full max-w-2xl space-y-8 flex-1 flex flex-col justify-center">
          <div className="text-center space-y-4">
            <h1 className="font-bold text-gray-900 mb-8 text-8xl">
              САЙТ УДАЧИ
            </h1>
            <p className="text-xl text-gray-600">Напишите в чем нужна удача , после кнопки " ОК "  оплата</p>
          </div>

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
      </section>

      {/* Секция тарифов */}
      <section ref={pricingRef} className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="mb-6">
                <label className="block font-medium text-gray-700 mb-2 text-2xl">
                  Дата активации (для утро/день/вечер/ночь):
                </label>
                <Input
                  type="text"
                  placeholder="ДД.ММ.ГГГГ (например: 15.12.2024)"
                  value={selectedDate}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, '');
                    
                    if (value.length >= 2) {
                      value = value.slice(0, 2) + '.' + value.slice(2);
                    }
                    if (value.length >= 5) {
                      value = value.slice(0, 5) + '.' + value.slice(5, 9);
                    }
                    
                    setSelectedDate(value);
                  }}
                  className="text-center text-lg"
                />
              </div>
              
              <div className="grid gap-3">
                {pricingOptions.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => handlePricingSelect(option.price, option.duration, option.immediate, option.type)}
                    className="w-full flex justify-between items-center p-4 h-auto hover:bg-purple-50 border-2 hover:border-purple-300"
                  >
                    <div className="flex flex-col items-start space-y-1">
                      <span className="text-2xl font-bold">{option.duration}</span>
                      {option.immediate ? (
                        <span className="text-lg text-green-600 font-medium">Действует сразу после оплаты</span>
                      ) : (
                        <span className="text-lg text-blue-600 font-medium">Укажите дату активации</span>
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Секция оплаты */}
      <section ref={paymentRef} className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-8">
          <header className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Оплата услуги
            </h1>
            <p className="text-lg text-gray-600">
              Завершите оплату, чтобы активировать удачу
            </p>
          </header>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Sparkles" size={24} />
                Ваше пожелание удачи
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-800 italic">"{wishText}"</p>
              </div>
              <Separator className="my-4" />
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg">Тариф:</span>
                  <span className="font-semibold">{selectedOption?.duration || 'Активация удачи'}</span>
                </div>
                {selectedOption && !selectedOption.immediate && selectedDate && (
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Дата активации:</span>
                    <span className="font-semibold">{selectedDate}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-lg">Стоимость:</span>
                  <span className="text-2xl font-bold text-green-600">{currentStrength * 100} ₽</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Оплата через Т-Банк</CardTitle>
              <CardDescription>
                Безопасная оплата через Т-Банк
              </CardDescription>
            </CardHeader>
            <CardContent>
              <style>{`
                .payform-tbank {
                  display: -webkit-box;
                  display: -ms-flexbox;
                  display: flex;
                  margin: 2px auto;
                  -webkit-box-orient: vertical;
                  -webkit-box-direction: normal;
                  -ms-flex-direction: column;
                  flex-direction: column;
                  max-width: 250px;
                }
                .payform-tbank * {
                  display: block !important;
                  visibility: visible !important;
                  height: auto !important;
                  opacity: 1 !important;
                }
                .payform-tbank {
                  position: static !important;
                  z-index: 9999 !important;
                }
                .payform-tbank-row {
                  margin: 2px;
                  border-radius: 4px;
                  -webkit-box-flex: 1;
                  -ms-flex: 1;
                  flex: 1;
                  -webkit-transition: 0.3s;
                  -o-transition: 0.3s;
                  transition: 0.3s;
                  border: 1px solid #DFE3F3;
                  padding: 15px;
                  outline: none;
                  background-color: #DFE3F3;
                  font-size: 15px;
                }
                .payform-tbank-row:focus {
                  background-color: #FFFFFF;
                  border: 1px solid #616871;
                  border-radius: 4px;
                }
                .payform-tbank-btn {
                  background-color: #FBC520;
                  border: 1px solid #FBC520;
                  color: #3C2C0B;
                }
                .payform-tbank-btn:hover {
                  background-color: #FAB619;
                  border: 1px solid #FAB619;
                }
              `}</style>
              <form className="payform-tbank" name="payform-tbank" id="payform-tbank" onSubmit={handleFormSubmit} style={{ display: 'flex !important' }}>
                <input type="hidden" name="terminalkey" value="1755155028995" />
                <input type="hidden" name="frame" value="false" />
                <input type="hidden" name="language" value="ru" />
                <input type="hidden" name="receipt" value="" />
                <input type="hidden" name="password" value="JY#iJKaKe2rjfAI_" />
                <input type="hidden" name="spb" value="true" />
                <input 
                  className="payform-tbank-row" 
                  type="text" 
                  placeholder="Сумма заказа" 
                  name="amount" 
                  value={currentStrength * 100}
                  readOnly
                  required 
                />
                <input type="hidden" name="order" value={`order-${Date.now()}`} />
                <input 
                  className="payform-tbank-row" 
                  type="text" 
                  placeholder="Описание заказа" 
                  name="description"
                  value={`${selectedOption?.duration || 'Активация удачи'}${selectedOption && !selectedOption.immediate && selectedDate ? ` на ${selectedDate}` : ''}`}
                  readOnly
                />
                <input 
                  className="payform-tbank-row" 
                  type="text" 
                  placeholder="ФИО плательщика" 
                  name="name"
                  required
                />
                <input 
                  className="payform-tbank-row" 
                  type="email" 
                  placeholder="E-mail" 
                  name="email"
                />
                <input 
                  className="payform-tbank-row payform-tbank-btn" 
                  type="submit" 
                  value="Оплатить"
                />
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Секция правил */}
      <section ref={rulesRef} className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Правила использования
            </h1>
            <p className="text-lg text-gray-600">
              Сайт удачи - условия и положения
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="BookOpen" size={24} />
                Общие положения
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Добро пожаловать на "Сайт удачи" - уникальный сервис для привлечения удачи в различные сферы жизни.
              </p>
              <p className="text-gray-700">
                Используя наш сервис, вы соглашаетесь с данными правилами и условиями использования.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Shield" size={24} />
                Гарантии и ответственность
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-yellow-800 font-medium mb-3">
                  Важные условия предоставления услуги:
                </p>
                <div className="space-y-3 text-yellow-700">
                  <p>
                    <strong>Характер услуги:</strong> "Сайт удачи" предоставляет психологическую поддержку в виде ритуала загадывания желаний, направленного на повышение мотивации и позитивного настроя пользователя.
                  </p>
                  <p>
                    <strong>Гарантии качества:</strong> Мы гарантируем техническую исправность сервиса, конфиденциальность обработки данных и выполнение ритуала согласно выбранному тарифу.
                  </p>
                  <p>
                    <strong>Ограничения ответственности:</strong> Администрация не несет ответственности за материальные результаты, изменения в личной жизни или внешних обстоятельствах пользователя.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Mail" size={24} />
                Контактная информация
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">ИП Паклин Сергей Васильевич, ИНН 594200005879 ОГРН 305591619400016,  эл.почта  Unix7777@ya.ru</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default OnePage;