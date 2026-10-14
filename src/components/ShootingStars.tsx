import { useEffect, useState } from 'react';

interface Star {
  id: number;
  left: number;
  top: number;
  angle: number;
  distance: number;
  duration: number;
}

const ShootingStars = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let counter = 0;

    const spawn = () => {
      const toRight = Math.random() > 0.5;
      const star: Star = {
        id: counter++,
        left: toRight ? Math.random() * 50 - 10 : Math.random() * 50 + 60,
        top: Math.random() * 30 - 10,
        angle: toRight ? 25 + Math.random() * 30 : 125 + Math.random() * 30,
        distance: 1400 + Math.random() * 600,
        duration: 2.5 + Math.random() * 1.5,
      };
      setStars((prev) => [...prev, star]);
      timer = setTimeout(spawn, 2500 + Math.random() * 5000);
    };

    timer = setTimeout(spawn, 1500 + Math.random() * 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="shooting-star"
          style={
            {
              left: `${star.left}%`,
              top: `${star.top}%`,
              '--angle': `${star.angle}deg`,
              '--dist': `${star.distance}px`,
              animationDuration: `${star.duration}s`,
            } as React.CSSProperties
          }
          onAnimationEnd={() =>
            setStars((prev) => prev.filter((s) => s.id !== star.id))
          }
        />
      ))}
    </div>
  );
};

export default ShootingStars;