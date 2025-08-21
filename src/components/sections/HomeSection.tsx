import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface HomeSectionProps {
  homeRef: React.RefObject<HTMLDivElement>;
  wishText: string;
  setWishText: (text: string) => void;
  onSubmit: () => void;
}

const HomeSection = ({ homeRef, wishText, setWishText, onSubmit }: HomeSectionProps) => {
  return (
    <section ref={homeRef} className="min-h-screen bg-white flex flex-col items-center justify-center p-4 pt-20">
      <div className="w-full max-w-2xl space-y-8 flex-1 flex flex-col justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-bold text-gray-900 mb-8 text-8xl">
            САЙТ УДАЧИ
          </h1>
          <p className="text-xl text-gray-600">Напишите в чем нужна удача , после кнопки " ОК "  оплата</p>
        </div>

        {/* Блоки с инструкциями и правилами */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-blue-200 bg-blue-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Icon name="Info" size={20} />
                Как это работает?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-blue-700">
                <p>1. Напишите ваше пожелание удачи</p>
                <p>2. Выберите подходящий тариф</p>
                <p>3. Оплатите услугу</p>
                <p>4. Удача активируется!</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Icon name="CheckCircle" size={20} />
                Преимущества
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-green-700">
                <p>✓ Психологическая поддержка</p>
                <p>✓ Повышение мотивации</p>
                <p>✓ Позитивный настрой</p>
                <p>✓ Безопасная оплата</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <Icon name="Clock" size={20} />
                Тарифы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-orange-700">
                <p>• Событие - действует сразу</p>
                <p>• Утро, день, вечер, ночь</p>
                <p>• Выберите дату активации</p>
                <p>• Цена: от 100₽ до 1000₽</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-800">
                <Icon name="Shield" size={20} />
                Гарантии
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-purple-700">
                <p>• Конфиденциальность данных</p>
                <p>• Безопасные платежи</p>
                <p>• Техническая поддержка</p>
                <p>• Качество сервиса</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold">Ваше пожелание удачи</h2>
            <p className="text-gray-600">
              Опишите, в какой сфере жизни вам нужна удача
            </p>
          </div>
          <Textarea
            placeholder="Например: Нужна удача в работе, в любви, в здоровье, в поездках и перелётах..."
            value={wishText}
            onChange={(e) => setWishText(e.target.value)}
            className="min-h-32 text-lg"
          />
          <div className="flex justify-center">
            <Button 
              onClick={onSubmit}
              className="px-8 py-3 text-lg"
              disabled={!wishText.trim()}
            >
              OK
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;