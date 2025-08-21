interface SplashScreenProps {
  isBreaking: boolean;
  onSplashClick: () => void;
}

const SplashScreen = ({ isBreaking, onSplashClick }: SplashScreenProps) => {
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

  return (
    <div 
      className={`fixed inset-0 z-50 bg-black cursor-pointer overflow-hidden ${isBreaking ? 'breaking-glass' : ''}`}
      onClick={onSplashClick}
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
};

export default SplashScreen;