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
      className="w-[210mm] h-[297mm] mx-auto bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white relative p-8 font-serif"
      style={{
        background: 'linear-gradient(135deg, #4c1d95 0%, #6b21a8 25%, #7c3aed 50%, #6b21a8 75%, #4c1d95 100%)',
        boxShadow: 'inset 0 0 100px rgba(139, 69, 19, 0.3)'
      }}
    >
      {/* Outer decorative border */}
      <div className="absolute inset-4 border-4 border-purple-300/50 rounded-lg">
        <div className="absolute inset-2 border-2 border-purple-200/30 rounded-md">
          <div className="absolute inset-2 border border-purple-100/20 rounded-sm"></div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-6 left-6 w-8 h-8 border-l-4 border-t-4 border-purple-300/60"></div>
      <div className="absolute top-6 right-6 w-8 h-8 border-r-4 border-t-4 border-purple-300/60"></div>
      <div className="absolute bottom-6 left-6 w-8 h-8 border-l-4 border-b-4 border-purple-300/60"></div>
      <div className="absolute bottom-6 right-6 w-8 h-8 border-r-4 border-b-4 border-purple-300/60"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="border-2 border-purple-300/50 p-4 mb-6 bg-purple-800/30 backdrop-blur-sm">
            <h1 className="text-3xl font-bold tracking-widest mb-2">СКРИЖАЛЬ УДАЧИ</h1>
            <p className="text-lg italic opacity-80">Персональный документ силы</p>
          </div>
        </div>

        {/* Wish section */}
        <div className="text-center mb-8">
          <div className="border border-purple-300/40 p-6 bg-purple-800/20 backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-4 tracking-wider">ЖЕЛАНИЕ</h2>
            <p className="text-lg italic min-h-[3rem] flex items-center justify-center px-4">
              {wish || 'ваше желание'}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="text-center mb-8 space-y-2">
          <p className="text-lg text-purple-200">
            <span className="font-semibold">Уровень силы:</span> {powerLevel}/10
          </p>
          <p className="text-lg text-purple-200">
            <span className="font-semibold">Энергетический вклад:</span> {energyInvestment} ₽
          </p>
        </div>

        {/* Affirmation section */}
        <div className="flex-1 mb-8">
          <h3 className="text-xl font-bold text-center mb-6 tracking-wider">ПЕРСОНАЛЬНЫЕ АФФИРМАЦИИ</h3>
          
          <div className="text-center mb-6">
            <h4 className="text-lg font-semibold text-purple-200 mb-4">ПРИНЯТИЕ ЛЮБВИ</h4>
          </div>
          
          <div className="text-center px-6">
            <p className="text-base leading-relaxed">
              {affirmationText}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto">
          <div className="flex justify-between items-end">
            <div className="text-sm text-purple-200">
              <p className="mb-1">Документ №: {documentNumber}</p>
              <p className="mb-1">Дата активации:</p>
              <p>{currentDate}</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 border-2 border-purple-300/50 rounded-full bg-purple-800/30 backdrop-blur-sm flex flex-col items-center justify-center text-xs">
                <div className="font-bold">САЙТ ЖЕЛАНИЙ</div>
                <div className="text-[10px] opacity-80">POEHALI.DEV</div>
                <div className="text-[10px] opacity-80">2025</div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6 pt-4 border-t border-purple-300/30">
            <div className="bg-purple-800/40 px-4 py-2 inline-block rounded">
              <p className="text-sm font-bold text-yellow-300">⚠️ ДОКУМЕНТ ДЕЙСТВУЕТ ПОСЛЕ ОПЛАТЫ СИЛЫ! ⚠️</p>
            </div>
            <p className="text-xs mt-2 text-purple-200">
              Получатель: {userName} • Email: user@example.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuckDocument;