const ActivationScreen = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden">
      {/* Звездное небо как на главной */}
      <div className="absolute inset-0">
        {Array.from({ length: 200 }, (_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              opacity: Math.random() * 0.8 + 0.2,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 1}s`
            }}
          />
        ))}
      </div>

      {/* Центральный текст в стиле главной страницы */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white space-y-6 px-8">
          <div className="mb-8">
            <h2 className="text-6xl font-bold mb-6 text-shadow-2xl bg-gradient-to-r from-green-400 via-green-200 to-green-400 bg-clip-text text-transparent animate-pulse">
              АКТИВАЦИЯ УДАЧИ
            </h2>
            <div className="space-y-4">
              <p className="text-4xl font-semibold text-green-200 animate-fade-in">
                Ваша удача будет активирована после оплаты
              </p>
              <p className="text-2xl text-gray-300 animate-fade-in-delay">
                Ожидайте... Магия уже начинает действовать
              </p>
            </div>
          </div>

          {/* Магический спиннер */}
          <div className="flex justify-center items-center space-x-4">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-400 border-t-transparent"></div>
            <div className="text-green-300 text-lg font-medium animate-pulse">
              Подготовка скрижали...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivationScreen;
