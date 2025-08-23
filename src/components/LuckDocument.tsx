import React from 'react';

interface LuckDocumentProps {
  wish: string;
  powerLevel: number;
  userName?: string;
  energyInvestment: number;
  affirmationText: string;
}

const LuckDocument: React.FC<LuckDocumentProps> = ({
  wish,
  powerLevel,
  userName = 'Получатель',
  energyInvestment,
  affirmationText
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const generateDocumentNumber = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `WD${timestamp}${random}`;
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const documentNumber = generateDocumentNumber();
  const currentDate = getCurrentDate();

  return (
    <div 
      id="luck-document"
      className="w-[210mm] h-[297mm] mx-auto relative font-serif text-white overflow-hidden cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
      style={{
        background: '#2d1b69'
      }}
    >
      {/* Четкие цветовые зоны без перетекания */}
      <div 
        className="absolute" 
        style={{
          background: '#4c1d95',
          left: '200px',
          top: '100px',
          width: '800px',
          height: '300px'
        }}
      ></div>
      
      <div 
        className="absolute" 
        style={{
          background: '#5b21b6',
          left: '0px',
          top: '400px',
          width: '600px',
          height: '400px'
        }}
      ></div>
      
      <div 
        className="absolute" 
        style={{
          background: '#7c3aed',
          left: '640px',
          top: '800px',
          width: '600px',
          height: '400px'
        }}
      ></div>
      
      <div 
        className="absolute" 
        style={{
          background: '#8b5cf6',
          left: '300px',
          top: '1200px',
          width: '700px',
          height: '300px'
        }}
      ></div>

      {/* Асимметричные рамки */}
      <div className="absolute" style={{
        border: '15px solid #000000',
        left: '5px',
        top: '5px',
        width: '1230px',
        height: '1744px'
      }}></div>
      
      <div className="absolute" style={{
        border: '12px solid #1a1a1a',
        left: '20px',
        top: '15px',
        width: '1200px',
        height: '1724px'
      }}></div>
      
      <div className="absolute" style={{
        border: '8px solid #2a2a2a',
        left: '35px',
        top: '25px',
        width: '1170px',
        height: '1704px'
      }}></div>
      
      <div className="absolute" style={{
        border: '6px solid #3c3c3c',
        left: '50px',
        top: '40px',
        width: '1140px',
        height: '1674px'
      }}></div>
      
      <div className="absolute" style={{
        border: '4px solid #4b4b4b',
        left: '65px',
        top: '55px',
        width: '1110px',
        height: '1644px'
      }}></div>

      {/* Асимметричные угловые треугольники */}
      <div className="absolute" style={{
        left: '70px',
        top: '70px',
        width: '0',
        height: '0',
        borderLeft: '70px solid #a855f7',
        borderTop: '70px solid transparent'
      }}></div>
      
      <div className="absolute" style={{
        right: '70px',
        top: '70px',
        width: '0',
        height: '0',
        borderRight: '40px solid #c084fc',
        borderTop: '40px solid transparent'
      }}></div>
      
      <div className="absolute" style={{
        left: '70px',
        bottom: '70px',
        width: '0',
        height: '0',
        borderLeft: '50px solid #8b5cf6',
        borderBottom: '50px solid transparent'
      }}></div>
      
      <div className="absolute" style={{
        right: '70px',
        bottom: '70px',
        width: '0',
        height: '0',
        borderRight: '70px solid #7c3aed',
        borderBottom: '70px solid transparent'
      }}></div>

      {/* Контент */}
      <div className="relative z-10 h-full p-8">
        {/* Заголовок - асимметричный блок */}
        <div className="relative mb-8" style={{ marginTop: '40px' }}>
          <div className="absolute" style={{
            background: '#1a0b3d',
            left: '40px',
            top: '0px',
            width: '900px',
            height: '120px'
          }}></div>
          
          <div className="absolute" style={{
            background: '#4c1d95',
            right: '20px',
            top: '0px',
            width: '100px',
            height: '120px'
          }}></div>
          
          <div className="absolute border-2 border-white" style={{
            left: '40px',
            top: '0px',
            width: '1000px',
            height: '120px'
          }}></div>
          
          <div className="relative z-10 text-center py-6">
            <h1 className="text-5xl font-bold tracking-[0.3em] mb-2 text-white" style={{
              textShadow: '2px 2px 4px rgba(0,0,0,1)'
            }}>
              СКРИЖАЛЬ УДАЧИ
            </h1>
            <p className="text-xl italic text-purple-300" style={{
              textShadow: '1px 1px 2px rgba(0,0,0,1)'
            }}>
              Персональный документ силы
            </p>
          </div>
        </div>

        {/* Секция удача - асимметричный блок */}
        <div className="relative mb-8" style={{ marginTop: '60px' }}>
          <div className="absolute" style={{
            background: '#5b21b6',
            left: '0px',
            top: '0px',
            width: '950px',
            height: '180px'
          }}></div>
          
          <div className="absolute" style={{
            background: '#7c3aed',
            right: '50px',
            top: '20px',
            width: '140px',
            height: '140px'
          }}></div>
          
          <div className="absolute border-2 border-white" style={{
            left: '0px',
            top: '0px',
            width: '1090px',
            height: '180px'
          }}></div>
          
          <div className="relative z-10 text-center py-4">
            <h2 className="text-4xl font-bold mb-4 tracking-[0.2em] text-white" style={{
              textShadow: '2px 2px 4px rgba(0,0,0,1)'
            }}>
              УДАЧА
            </h2>
            
            {/* Поле желания - асимметричное */}
            <div className="relative mx-8">
              <div className="absolute" style={{
                background: '#1a0b3d',
                left: '60px',
                top: '0px',
                width: '800px',
                height: '80px'
              }}></div>
              
              <div className="absolute" style={{
                background: '#2d1b69',
                right: '20px',
                top: '10px',
                width: '180px',
                height: '60px'
              }}></div>
              
              <div className="absolute border border-white" style={{
                left: '60px',
                top: '0px',
                width: '980px',
                height: '80px'
              }}></div>
              
              <div className="relative z-10 py-6 px-8">
                <p className="text-xl italic text-purple-300 leading-relaxed" style={{
                  textShadow: '1px 1px 2px rgba(0,0,0,1)'
                }}>
                  "{wish || 'ваше желание'}"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Статистика - асимметричные блоки */}
        <div className="space-y-4 mb-8" style={{ marginTop: '80px' }}>
          <div className="relative">
            <div className="absolute" style={{
              background: '#4c1d95',
              left: '20px',
              top: '0px',
              width: '700px',
              height: '60px'
            }}></div>
            
            <div className="absolute" style={{
              background: '#7c3aed',
              right: '140px',
              top: '10px',
              width: '300px',
              height: '40px'
            }}></div>
            
            <div className="absolute border-2 border-white" style={{
              left: '20px',
              top: '0px',
              width: '1000px',
              height: '60px'
            }}></div>
            
            <div className="relative z-10 px-8 py-4">
              <p className="text-2xl text-white font-bold" style={{
                textShadow: '2px 2px 4px rgba(0,0,0,1)'
              }}>
                Уровень силы: {powerLevel}/10
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute" style={{
              background: '#8b5cf6',
              left: '70px',
              top: '0px',
              width: '800px',
              height: '60px'
            }}></div>
            
            <div className="absolute" style={{
              background: '#5b21b6',
              left: '0px',
              top: '10px',
              width: '70px',
              height: '40px'
            }}></div>
            
            <div className="absolute border-2 border-white" style={{
              left: '0px',
              top: '0px',
              width: '1020px',
              height: '60px'
            }}></div>
            
            <div className="relative z-10 px-8 py-4">
              <p className="text-2xl text-white font-bold" style={{
                textShadow: '2px 2px 4px rgba(0,0,0,1)'
              }}>
                Энергетический вклад: {energyInvestment} ₽
              </p>
            </div>
          </div>
        </div>

        {/* Секция аффирмаций */}
        <div className="mb-8" style={{ marginTop: '100px' }}>
          <h3 className="text-3xl font-bold text-center mb-6 tracking-[0.2em] text-white" style={{
            textShadow: '2px 2px 4px rgba(0,0,0,1)'
          }}>
            ПЕРСОНАЛЬНЫЕ АФФИРМАЦИИ
          </h3>
          
          <h4 className="text-2xl font-bold text-center mb-6 text-purple-300" style={{
            textShadow: '2px 2px 4px rgba(0,0,0,1)'
          }}>
            ПРИНЯТИЕ ЛЮБВИ
          </h4>
          
          {/* Блок аффирмаций - сложная асимметричная форма */}
          <div className="relative">
            <div className="absolute" style={{
              background: '#1a0b3d',
              left: '40px',
              top: '0px',
              width: '800px',
              height: '180px'
            }}></div>
            
            <div className="absolute" style={{
              background: '#2d1b69',
              right: '80px',
              top: '20px',
              width: '200px',
              height: '140px'
            }}></div>
            
            <div className="absolute" style={{
              background: '#4c1d95',
              left: '0px',
              top: '50px',
              width: '40px',
              height: '100px'
            }}></div>
            
            <div className="absolute border-2 border-white" style={{
              left: '0px',
              top: '0px',
              width: '1040px',
              height: '180px'
            }}></div>
            
            <div className="relative z-10 px-8 py-8 text-center">
              <p className="text-lg leading-relaxed text-purple-300" style={{
                textShadow: '1px 1px 2px rgba(0,0,0,1)'
              }}>
                {affirmationText}
              </p>
            </div>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="mt-auto flex justify-between items-end" style={{ marginTop: '120px' }}>
          {/* Информация о документе - асимметричный блок */}
          <div className="relative">
            <div className="absolute" style={{
              background: '#1a0b3d',
              left: '0px',
              top: '0px',
              width: '600px',
              height: '120px'
            }}></div>
            
            <div className="absolute" style={{
              background: '#2d1b69',
              right: '-100px',
              top: '20px',
              width: '100px',
              height: '80px'
            }}></div>
            
            <div className="absolute border-2 border-white" style={{
              left: '0px',
              top: '0px',
              width: '700px',
              height: '120px'
            }}></div>
            
            <div className="relative z-10 p-4">
              <p className="text-sm text-white font-bold mb-2" style={{
                textShadow: '1px 1px 2px rgba(0,0,0,1)'
              }}>
                Документ №: {documentNumber}
              </p>
              <p className="text-sm text-white font-bold mb-2" style={{
                textShadow: '1px 1px 2px rgba(0,0,0,1)'
              }}>
                Дата активации:
              </p>
              <p className="text-sm text-purple-300 font-bold" style={{
                textShadow: '1px 1px 2px rgba(0,0,0,1)'
              }}>
                {currentDate}
              </p>
            </div>
          </div>

          {/* Асимметричная печать */}
          <div className="relative" style={{ marginRight: '100px' }}>
            <div 
              className="w-24 h-24 rounded-full flex flex-col items-center justify-center text-xs"
              style={{
                background: '#4c1d95',
                border: '4px solid #ffffff',
                position: 'relative'
              }}
            >
              {/* Дополнительный квадратный элемент */}
              <div className="absolute w-8 h-8" style={{
                background: '#7c3aed',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}></div>
              
              <div className="relative z-10 text-center">
                <div className="font-bold text-white text-xs mb-1" style={{
                  textShadow: '1px 1px 2px rgba(0,0,0,1)'
                }}>
                  САЙТ ЖЕЛАНИЙ
                </div>
                <div className="text-[10px] text-purple-200" style={{
                  textShadow: '1px 1px 1px rgba(0,0,0,1)'
                }}>
                  POEHALI.DEV
                </div>
                <div className="text-[10px] text-purple-200" style={{
                  textShadow: '1px 1px 1px rgba(0,0,0,1)'
                }}>
                  2025
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Предупреждение - асимметричный блок */}
        <div className="relative mt-8">
          <div className="absolute" style={{
            background: '#FBC520',
            left: '20px',
            top: '0px',
            width: '900px',
            height: '50px'
          }}></div>
          
          <div className="absolute" style={{
            background: '#FAB619',
            right: '100px',
            top: '5px',
            width: '140px',
            height: '40px'
          }}></div>
          
          <div className="absolute" style={{
            border: '3px solid #F59E0B',
            left: '20px',
            top: '0px',
            width: '1040px',
            height: '50px'
          }}></div>
          
          <div className="relative z-10 text-center py-3">
            <p className="text-lg font-bold text-black" style={{
              textShadow: '1px 1px 1px rgba(255,255,255,0.5)'
            }}>
              ⚠️ ДОКУМЕНТ ДЕЙСТВУЕТ ПОСЛЕ ОПЛАТЫ СИЛЫ! ⚠️
            </p>
          </div>
        </div>

        {/* Получатель - асимметричный блок */}
        <div className="relative mt-4">
          <div className="absolute" style={{
            background: '#2d1b69',
            left: '40px',
            top: '0px',
            width: '800px',
            height: '50px'
          }}></div>
          
          <div className="absolute" style={{
            background: '#4c1d95',
            right: '80px',
            top: '10px',
            width: '200px',
            height: '30px'
          }}></div>
          
          <div className="absolute border border-white" style={{
            left: '40px',
            top: '0px',
            width: '1000px',
            height: '50px'
          }}></div>
          
          <div className="relative z-10 text-center py-4">
            <p className="text-sm text-purple-300" style={{
              textShadow: '1px 1px 2px rgba(0,0,0,1)'
            }}>
              Получатель: {userName} • Email: user@example.com
            </p>
          </div>
        </div>
      </div>

      {/* Модальное окно для увеличенного просмотра */}
      {isExpanded && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
          onClick={() => setIsExpanded(false)}
        >
          <div 
            className="relative max-w-6xl max-h-screen overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
            >
              ✕
            </button>
            <div className="bg-white p-8 rounded-lg">
              <p className="text-gray-800 text-center text-xl font-bold mb-4">
                🔍 Нажмите для увеличения
              </p>
              <p className="text-gray-600 text-center">
                Полный размер документа будет доступен после скачивания
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LuckDocument;