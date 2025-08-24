import React from 'react';

interface LuckDocumentProps {
  wish: string;
  powerLevel: number;
  userName: string;
  energyInvestment: number;
  activationDate?: string;
  documentNumber?: string;
  documentDate?: string;
}

const LuckDocument: React.FC<LuckDocumentProps> = ({
  wish,
  powerLevel,
  userName,
  energyInvestment,
  activationDate,
  documentNumber,
  documentDate
}) => {
  const formatPowerLevel = (level: number) => {
    // Преобразуем число в диапазоне 1-10
    const normalizedLevel = Math.max(1, Math.min(10, level));
    return `${normalizedLevel}/10`;
  };

  const generateDocumentNumber = () => {
    return documentNumber || `LU-${Date.now().toString().slice(-8)}`;
  };

  const formatDocumentDate = () => {
    if (documentDate) return documentDate;
    const date = new Date();
    return date.toLocaleDateString('ru-RU', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  const formatEnergyLevel = (investment: number) => {
    if (investment >= 1000) return "Космический";
    if (investment >= 500) return "Высокий";
    if (investment >= 300) return "Средний";
    return "Базовый";
  };

  return (
    <div className="w-[210mm] h-[297mm] bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8 font-serif relative overflow-hidden">
      {/* Декоративные углы */}
      <div className="absolute top-0 left-0 w-20 h-20 border-l-8 border-t-8 border-purple-300 opacity-80"></div>
      <div className="absolute top-0 right-0 w-20 h-20 border-r-8 border-t-8 border-purple-300 opacity-80"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 border-l-8 border-b-8 border-purple-300 opacity-80"></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 border-r-8 border-b-8 border-purple-300 opacity-80"></div>

      {/* Основная рамка */}
      <div className="border-8 border-gray-800 h-full w-full p-6 relative bg-black bg-opacity-20">
        
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-[0.3em] mb-4">
            СКРИЖАЛЬ УДАЧИ
          </h1>
          <p className="text-lg text-gray-300 tracking-wide">
            Определитель вещемуны силы
          </p>
        </div>

        {/* Секция "УДАЧА" */}
        <div className="mb-8 text-center">
          <div className="border-4 border-gray-800 p-6 mb-6 bg-black bg-opacity-30">
            <h2 className="text-3xl font-bold tracking-[0.2em] mb-4">
              УДАЧА
            </h2>
            <div className="border-2 border-gray-700 p-4 bg-black bg-opacity-50">
              <p className="text-lg font-medium tracking-wide">
                {wish || "СИЛА НА"}
              </p>
            </div>
          </div>
        </div>



        {/* Данные активации */}
        <div className="mb-8 space-y-6">
          <div className="border-2 border-gray-800 p-4 bg-black bg-opacity-30 rounded">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold tracking-wide mb-2">
                ДАТА АКТИВАЦИИ
              </h3>
              <p className="text-lg text-purple-300 font-semibold">
                {activationDate || 'Немедленно'}
              </p>
            </div>
          </div>

          <div className="border-2 border-gray-800 p-4 bg-black bg-opacity-30 rounded">
            <div className="text-center">
              <h3 className="text-xl font-bold tracking-wide mb-2">
                СИЛА УДАЧИ
              </h3>
              <p className="text-lg text-purple-300 font-semibold">
                {formatPowerLevel(powerLevel)}
              </p>
            </div>
          </div>
        </div>

        {/* Информация о документе */}
        <div className="mb-12">
          <div className="bg-black bg-opacity-40 border-2 border-gray-800 p-6 rounded">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold tracking-wide mb-3">
                ИНФОРМАЦИЯ О ДОКУМЕНТЕ
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-300">
                  Номер документа: <span className="text-purple-300 font-semibold">{generateDocumentNumber()}</span>
                </p>
                <p className="text-sm text-gray-300">
                  Дата создания: <span className="text-purple-300 font-semibold">{formatDocumentDate()}</span>
                </p>
                <p className="text-sm text-gray-300">
                  Энергетическая инвестиция: <span className="text-green-400 font-semibold">{energyInvestment} руб.</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя секция с печатью и предупреждением */}
        <div className="absolute bottom-8 left-8 right-8">
          <div className="flex justify-between items-end">
            {/* Печать пентаграммы */}
            <div className="relative w-28 h-28">
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Внешний круг с узорами */}
                <circle cx="50" cy="50" r="48" stroke="#8B5CF6" strokeWidth="2" fill="none" strokeDasharray="4,2" opacity="0.7" />
                <circle cx="50" cy="50" r="42" stroke="#A78BFA" strokeWidth="1" fill="none" strokeDasharray="2,1" opacity="0.5" />
                
                {/* Пентаграмма */}
                <path d="M50 8 L61.8 38.2 L95.1 38.2 L69.1 58.8 L80.9 89 L50 68.4 L19.1 89 L30.9 58.8 L4.9 38.2 L38.2 38.2 Z" 
                      stroke="#7C3AED" strokeWidth="2" fill="#1F1B3A" fillOpacity="0.8" />
                
                {/* Внутренний пентагон */}
                <path d="M50 30 L58.5 42 L72 42 L62.5 51 L66.5 64 L50 56 L33.5 64 L37.5 51 L28 42 L41.5 42 Z" 
                      fill="#4C1D95" fillOpacity="0.6" />
                
                {/* Декоративные точки */}
                <circle cx="50" cy="15" r="2" fill="#8B5CF6" />
                <circle cx="85" cy="35" r="1.5" fill="#A78BFA" />
                <circle cx="75" cy="80" r="1.5" fill="#A78BFA" />
                <circle cx="25" cy="80" r="1.5" fill="#A78BFA" />
                <circle cx="15" cy="35" r="1.5" fill="#A78BFA" />
              </svg>
              
              {/* Центральная надпись */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-purple-300 text-xs font-bold tracking-wide">
                    САЙТ
                  </div>
                  <div className="text-purple-300 text-xs font-bold tracking-wide">
                    УДАЧИ
                  </div>
                </div>
              </div>
            </div>

            {/* Предупреждение */}
            <div className="text-center flex-1 mx-8">
              <div className="bg-red-900 bg-opacity-30 border border-red-600 p-3 rounded">
                <p className="text-red-300 text-sm font-semibold">
                  ⚠️ ВАЖНО: Скрижаль Удачи вступает в силу только после оплаты
                </p>
              </div>
            </div>
          </div>
        </div>



        {/* Декоративные элементы */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-purple-400 to-transparent"></div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent to-purple-400"></div>
      </div>
    </div>
  );
};

export default LuckDocument;