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
      <div className="absolute top-0 left-0 w-16 h-16 border-l-4 border-t-4 border-purple-400"></div>
      <div className="absolute top-0 right-0 w-16 h-16 border-r-4 border-t-4 border-purple-400"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 border-l-4 border-b-4 border-purple-400"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-r-4 border-b-4 border-purple-400"></div>

      {/* Основная рамка */}
      <div className="border-2 border-gray-600 h-full w-full p-6 relative">
        
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
          <div className="border-2 border-gray-600 p-6 mb-6">
            <h2 className="text-3xl font-bold tracking-[0.2em] mb-4">
              УДАЧА
            </h2>
            <div className="border border-gray-500 p-4 bg-black bg-opacity-30">
              <p className="text-lg font-medium tracking-wide">
                {wish || "СИЛА НА"}
              </p>
            </div>
          </div>
        </div>

        {/* Уровни силы */}
        <div className="mb-8 space-y-4">
          <div className="border-b border-gray-600 pb-2">
            <p className="text-center text-lg tracking-wide">
              Уровень солнечный?
            </p>
          </div>
          <div className="border-b border-gray-600 pb-2">
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
          
          <div className="bg-black bg-opacity-20 border border-gray-600 p-6 rounded">
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