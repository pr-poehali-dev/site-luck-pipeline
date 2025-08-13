import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [wishText, setWishText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (wishText.trim()) {
      navigate('/pricing', { state: { wish: wishText } });
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4">
      <div className="w-full max-w-2xl space-y-8 flex-1 flex flex-col justify-center">
        {/* Главный заголовок */}
        <div className="text-center space-y-4">
          <h1 className="font-bold text-gray-900 mb-8 text-8xl">
            САЙТ УДАЧИ
          </h1>
          <p className="text-xl text-gray-600">Напишите в чем нужна удача , после кнопки " ОК "  оплата</p>
        </div>

        {/* Форма */}
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
              onClick={handleSubmit}
              className="px-8 py-3 text-lg"
              disabled={!wishText.trim()}
            >
              OK
            </Button>
          </div>
        </div>
      </div>
      
      {/* Правила использования */}
      <div className="w-full max-w-4xl space-y-6 mt-16">
        <Separator />
        
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Правила использования
          </h2>
          <p className="text-lg text-gray-600">
            Сайт удачи - условия и положения
          </p>
        </div>

        {/* Основные правила */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="BookOpen" size={24} />
              Общие положения
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Добро пожаловать на "Сайт удачи" - уникальный сервис для привлечения удачи в различные сферы жизни.
            </p>
            <p className="text-gray-700">
              Используя наш сервис, вы соглашаетесь с данными правилами и условиями использования.
            </p>
          </CardContent>
        </Card>

        {/* Правила оплаты */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="CreditCard" size={24} />
              Условия оплаты
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-gray-700">
              <li>• Стоимость активации удачи составляет от 100₽ до 1000₽</li>
              <li>• Оплата производится единовременно за одно пожелание</li>
              <li>• Возврат средств не предусмотрен после активации пожелания</li>
              <li>• Все платежи обрабатываются через защищенные платежные системы</li>
            </ul>
          </CardContent>
        </Card>

        {/* Контакты */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Mail" size={24} />
              Контактная информация
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">ИП Паклин Сергей Васильевич, ИНН 594200005879 ОГРН 305591619400016, эл.почта Unix7777@ya.ru</p>
          </CardContent>
        </Card>
        
        <div className="pb-8"></div>
      </div>
    </div>
  );
};

export default Index;