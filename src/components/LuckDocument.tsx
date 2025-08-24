import React from 'react';

interface LuckDocumentProps {
  wish: string;
  powerLevel: number;
  userName: string;
  energyInvestment: number;
  affirmationText: string;
}

const LuckDocument: React.FC<LuckDocumentProps> = ({
  wish,
  powerLevel,
  userName,
  energyInvestment,
  affirmationText
}) => {
  const formatPowerLevel = (level: number) => {
    switch (level) {
      case 1: return "Базовый";
      case 2: return "Средний";
      case 3: return "Высокий";
      case 4: return "Максимальный";
      default: return "Базовый";
    }
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

        {/* Печать пентаграммы */}
        <div className="absolute top-1/2 right-8 transform -translate-y-1/2">
          <div className="relative w-32 h-32">
            {/* Пентаграмма */}
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
        </div>

        {/* Уровни силы */}
        <div className="mb-8 space-y-4">
          <div className="border-b-2 border-gray-800 pb-2">
            <p className="text-center text-lg tracking-wide">
              Уровень солнечный?
            </p>
          </div>
          <div className="border-b-2 border-gray-800 pb-2">
            <p className="text-center text-lg tracking-wide">
              Энергетическая передача?
            </p>
          </div>
        </div>

        {/* Персональные аффирмации */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-center tracking-[0.15em] mb-4">
            ПЕРСОНАЛЬНЫЕ АФФИРМАЦИИ
          </h3>
          <div className="text-center mb-6">
            <p className="text-xl font-bold tracking-[0.1em]">
              ПРИНЯТЬ ЛЮБОВЬ
            </p>
          </div>
          
          <div className="bg-black bg-opacity-40 border-2 border-gray-800 p-6 rounded">
            <p className="text-center text-lg leading-relaxed">
              {affirmationText || `Я наполнён(а) до фон, во мне горит си лильная звезда. я поп-
няю, вырываюсь из. С помощью этой энергии преодолеваю
любое бремя в весёлой.`}
            </p>
          </div>
        </div>

        {/* Нижняя секция */}
        <div className="absolute bottom-20 left-8 right-8">
          <div className="mb-6">
            <p className="text-sm mb-2">
              Не хотите получить другие силлнк
            </p>
            <p className="text-sm mb-4">
              Обычные Аффармации
            </p>
            <p className="text-sm">
              напиши на их?
            </p>
          </div>

          {/* Кнопка действия */}
          <div className="text-center mb-6">
            <div className="bg-yellow-600 text-black px-8 py-3 rounded-lg inline-block font-bold text-lg">
              Я подпишу такой сигнал о деятельности
            </div>
          </div>

          <p className="text-center text-sm text-gray-400">
            немного подождите отставления на ваши
          </p>
        </div>

        {/* Круглая кнопка в правом углу */}
        <div className="absolute bottom-16 right-16">
          <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center">
            <div className="text-center text-sm font-bold leading-tight">
              СДЕЛАТЬ<br />НОВОГО<br />ЛЕЧУ
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