import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import TBankPaymentForm from '@/components/TBankPaymentForm';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const wish = location.state?.wish || '';

  const handlePayment = () => {
    // Здесь будет интеграция с платежной системой
    alert('Спасибо за оплату! Ваше пожелание удачи отправлено во вселенную! 🍀');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Заголовок */}
        <header className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Оплата услуги
          </h1>
          <p className="text-lg text-gray-600">
            Завершите оплату, чтобы активировать удачу
          </p>
        </header>

        {/* Информация о заказе */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Sparkles" size={24} />
              Ваше пожелание удачи
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-800 italic">"{wish}"</p>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between items-center">
              <span className="text-lg">Стоимость активации удачи:</span>
              <span className="text-2xl font-bold text-green-600">299 ₽</span>
            </div>
          </CardContent>
        </Card>

        {/* Форма оплаты */}
        <Card>
          <CardHeader>
            <CardTitle>Оплата через Т-Банк</CardTitle>
            <CardDescription>
              Безопасная оплата через Т-Банк
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <TBankPaymentForm />
          </CardContent>
        </Card>

        {/* Кнопка назад */}
        <div className="text-center">
          <Button variant="outline" onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Вернуться назад
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;