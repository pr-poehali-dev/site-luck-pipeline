import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface StrengthSelectorProps {
  selectedOption: {
    duration: string;
    price: number;
    immediate: boolean;
    type: string;
  } | null;
  currentStrength: number;
  setCurrentStrength: (strength: number) => void;
  onBack: () => void;
  onConfirm: () => void;
}

const StrengthSelector = ({
  selectedOption,
  currentStrength,
  setCurrentStrength,
  onBack,
  onConfirm
}: StrengthSelectorProps) => {
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
                  onClick={onBack}
                  className="flex-1 border-green-600 text-green-600 hover:bg-green-50"
                >
                  ← Назад
                </Button>
                <Button
                  onClick={onConfirm}
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
};

export default StrengthSelector;