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
      className="w-[210mm] h-[297mm] mx-auto relative p-8 font-serif text-white overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, #1a0b3d 0%, #2d1b69 10%, #4c1d95 20%, #5b21b6 30%, #7c3aed 40%, #8b5cf6 50%, #a855f7 60%, #c084fc 70%, #7c3aed 80%, #5b21b6 90%, #2d1b69 100%),
          radial-gradient(ellipse at 20% 30%, rgba(168, 85, 247, 0.6) 0%, transparent 70%),
          radial-gradient(ellipse at 80% 70%, rgba(124, 58, 237, 0.5) 0%, transparent 70%),
          radial-gradient(ellipse at 50% 50%, rgba(91, 33, 182, 0.3) 0%, transparent 80%),
          url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpIi8+Cjwvc3ZnPg==')
        `,
        backgroundBlendMode: 'multiply, screen, overlay, soft-light, normal',
        boxShadow: `
          inset 0 0 150px rgba(26, 11, 61, 0.9),
          inset 0 0 80px rgba(124, 58, 237, 0.4),
          0 0 40px rgba(124, 58, 237, 0.3),
          0 0 80px rgba(168, 85, 247, 0.2)
        `
      }}
    >
      {/* Ornate border design */}
      <div className="absolute inset-2" style={{
        background: `
          linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%),
          linear-gradient(-45deg, transparent 30%, rgba(168, 85, 247, 0.3) 50%, transparent 70%)
        `,
        borderRadius: '12px',
        border: '3px solid rgba(255, 255, 255, 0.3)',
        boxShadow: 'inset 0 0 30px rgba(168, 85, 247, 0.3)'
      }}>
        <div className="absolute inset-3 border-2 border-white/20 rounded-lg">
          <div className="absolute inset-2 border border-white/10 rounded-md"></div>
        </div>
      </div>

      {/* Ornate corner decorations */}
      <div className="absolute top-4 left-4" style={{
        width: '40px',
        height: '40px',
        background: `
          radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(168, 85, 247, 0.6) 30%, transparent 70%),
          conic-gradient(from 0deg, rgba(255,255,255,0.6), rgba(168, 85, 247, 0.8), rgba(255,255,255,0.6))
        `,
        borderRadius: '50% 10% 50% 10%',
        border: '2px solid rgba(255,255,255,0.4)',
        clipPath: 'polygon(0 0, 100% 0, 0 100%)'
      }}></div>
      
      <div className="absolute top-4 right-4" style={{
        width: '40px',
        height: '40px',
        background: `
          radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(168, 85, 247, 0.6) 30%, transparent 70%),
          conic-gradient(from 90deg, rgba(255,255,255,0.6), rgba(168, 85, 247, 0.8), rgba(255,255,255,0.6))
        `,
        borderRadius: '10% 50% 10% 50%',
        border: '2px solid rgba(255,255,255,0.4)',
        clipPath: 'polygon(100% 0, 100% 100%, 0 0)'
      }}></div>
      
      <div className="absolute bottom-4 left-4" style={{
        width: '40px',
        height: '40px',
        background: `
          radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(168, 85, 247, 0.6) 30%, transparent 70%),
          conic-gradient(from 270deg, rgba(255,255,255,0.6), rgba(168, 85, 247, 0.8), rgba(255,255,255,0.6))
        `,
        borderRadius: '50% 10% 50% 10%',
        border: '2px solid rgba(255,255,255,0.4)',
        clipPath: 'polygon(0 0, 0 100%, 100% 100%)'
      }}></div>
      
      <div className="absolute bottom-4 right-4" style={{
        width: '40px',
        height: '40px',
        background: `
          radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(168, 85, 247, 0.6) 30%, transparent 70%),
          conic-gradient(from 180deg, rgba(255,255,255,0.6), rgba(168, 85, 247, 0.8), rgba(255,255,255,0.6))
        `,
        borderRadius: '10% 50% 10% 50%',
        border: '2px solid rgba(255,255,255,0.4)',
        clipPath: 'polygon(100% 0, 100% 100%, 0 100%)'
      }}></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="text-center mb-6">
          <div 
            className="relative p-6 mb-6 backdrop-blur-md rounded-lg"
            style={{
              background: `
                linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(168, 85, 247, 0.25) 50%, rgba(0,0,0,0.1) 100%),
                radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, transparent 70%)
              `,
              border: '2px solid rgba(255,255,255,0.3)',
              boxShadow: `
                inset 0 1px 0 rgba(255,255,255,0.4),
                inset 0 -1px 0 rgba(0,0,0,0.2),
                0 4px 20px rgba(168, 85, 247, 0.3)
              `
            }}
          >
            <div className="absolute inset-0 rounded-lg" style={{
              background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)'
            }}></div>
            <h1 className="relative text-4xl font-bold tracking-[0.3em] mb-3 text-white drop-shadow-lg" style={{
              textShadow: `
                0 0 10px rgba(255,255,255,0.8),
                0 0 20px rgba(168, 85, 247, 0.6),
                2px 2px 4px rgba(0,0,0,0.8)
              `,
              fontFamily: 'serif'
            }}>
              СКРИЖАЛЬ УДАЧИ
            </h1>
            <p className="relative text-xl italic opacity-90 tracking-wide text-purple-100" style={{
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
            }}>
              Персональный документ силы
            </p>
          </div>
        </div>

        {/* Wish section */}
        <div className="text-center mb-6">
          <div 
            className="relative p-8 backdrop-blur-sm rounded-lg"
            style={{
              background: `
                linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(168, 85, 247, 0.2) 50%, rgba(0,0,0,0.1) 100%)
              `,
              border: '1px solid rgba(255,255,255,0.25)',
              boxShadow: `
                inset 0 1px 0 rgba(255,255,255,0.3),
                0 2px 15px rgba(168, 85, 247, 0.2)
              `
            }}
          >
            <h2 className="text-2xl font-bold mb-6 tracking-[0.2em] text-white" style={{
              textShadow: '0 0 8px rgba(255,255,255,0.6), 1px 1px 3px rgba(0,0,0,0.8)'
            }}>
              ЖЕЛАНИЕ
            </h2>
            <div 
              className="min-h-[4rem] flex items-center justify-center px-6 py-4 mx-4 rounded-md"
              style={{
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              <p className="text-xl italic text-purple-100 text-center leading-relaxed" style={{
                textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
              }}>
                {wish || 'ваше желание'}
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="text-center mb-6 space-y-3">
          <div className="bg-black/20 px-6 py-3 rounded-lg mx-8 backdrop-blur-sm border border-white/20">
            <p className="text-xl text-purple-200" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              <span className="font-bold text-white">Уровень силы:</span> {powerLevel}/10
            </p>
          </div>
          <div className="bg-black/20 px-6 py-3 rounded-lg mx-8 backdrop-blur-sm border border-white/20">
            <p className="text-xl text-purple-200" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              <span className="font-bold text-white">Энергетический вклад:</span> {energyInvestment} ₽
            </p>
          </div>
        </div>

        {/* Affirmation section */}
        <div className="flex-1 mb-6">
          <h3 className="text-2xl font-bold text-center mb-8 tracking-[0.2em] text-white" style={{
            textShadow: '0 0 8px rgba(255,255,255,0.6), 1px 1px 3px rgba(0,0,0,0.8)'
          }}>
            ПЕРСОНАЛЬНЫЕ АФФИРМАЦИИ
          </h3>
          
          <div className="text-center mb-6">
            <h4 className="text-xl font-bold text-purple-200 mb-6 tracking-wide" style={{
              textShadow: '0 0 6px rgba(168, 85, 247, 0.8), 1px 1px 2px rgba(0,0,0,0.8)'
            }}>
              ПРИНЯТИЕ ЛЮБВИ
            </h4>
          </div>
          
          <div 
            className="mx-6 p-6 rounded-lg backdrop-blur-sm"
            style={{
              background: 'rgba(0,0,0,0.2)',
              border: '1px solid rgba(255,255,255,0.15)',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            <p className="text-lg leading-relaxed text-purple-100 text-center" style={{
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
            }}>
              {affirmationText}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto">
          <div className="flex justify-between items-end">
            <div 
              className="text-sm text-purple-200 bg-black/20 p-4 rounded-lg backdrop-blur-sm border border-white/15"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
            >
              <p className="mb-1 font-semibold">Документ №: {documentNumber}</p>
              <p className="mb-1 font-semibold">Дата активации:</p>
              <p className="font-bold text-purple-100">{currentDate}</p>
            </div>
            
            <div className="text-center">
              <div 
                className="w-24 h-24 flex flex-col items-center justify-center text-xs backdrop-blur-md"
                style={{
                  background: `
                    radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(168, 85, 247, 0.4) 30%, rgba(0,0,0,0.3) 100%),
                    conic-gradient(from 0deg, rgba(255,255,255,0.4), rgba(168, 85, 247, 0.6), rgba(124, 58, 237, 0.8), rgba(255,255,255,0.4))
                  `,
                  borderRadius: '50%',
                  border: '3px solid rgba(255,255,255,0.4)',
                  boxShadow: `
                    inset 0 0 15px rgba(168, 85, 247, 0.4),
                    0 0 20px rgba(168, 85, 247, 0.3),
                    inset 0 2px 0 rgba(255,255,255,0.4),
                    inset 0 -2px 0 rgba(0,0,0,0.2)
                  `,
                  clipPath: 'polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)'
                }}
              >
                <div className="font-bold text-white text-xs" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                  САЙТ ЖЕЛАНИЙ
                </div>
                <div className="text-[10px] text-purple-200 mt-1" style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.8)' }}>
                  POEHALI.DEV
                </div>
                <div className="text-[10px] text-purple-200" style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.8)' }}>
                  2025
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6 pt-6 border-t-2 border-white/20">
            <div 
              className="px-6 py-3 inline-block rounded-lg backdrop-blur-sm"
              style={{
                background: `
                  linear-gradient(135deg, rgba(255, 193, 7, 0.9) 0%, rgba(255, 152, 0, 0.8) 100%)
                `,
                border: '2px solid rgba(255, 193, 7, 0.6)',
                boxShadow: `
                  0 0 15px rgba(255, 193, 7, 0.5),
                  inset 0 1px 0 rgba(255,255,255,0.3)
                `
              }}
            >
              <p className="text-sm font-bold text-black" style={{
                textShadow: '1px 1px 1px rgba(255,255,255,0.5)'
              }}>
                ⚠️ ДОКУМЕНТ ДЕЙСТВУЕТ ПОСЛЕ ОПЛАТЫ СИЛЫ! ⚠️
              </p>
            </div>
            <p className="text-xs mt-3 text-purple-200 bg-black/20 px-4 py-2 rounded-md inline-block backdrop-blur-sm" style={{
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
            }}>
              Получатель: {userName} • Email: user@example.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuckDocument;