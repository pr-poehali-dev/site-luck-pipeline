import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface OrderSummaryProps {
  paymentStatus: string | null;
  wish: string;
  duration: string;
  date: string | null;
  customerName: string;
  price: number;
}

const OrderSummary = ({ paymentStatus, wish, duration, date, customerName, price }: OrderSummaryProps) => {
  return (
    <>
      {/* Сообщение о статусе оплаты */}
      {paymentStatus === 'success' && (
        <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 flex items-center gap-3">
          <Icon name="CheckCircle2" size={28} className="text-green-600 shrink-0" />
          <div>
            <p className="font-semibold text-green-800">Оплата прошла успешно!</p>
            <p className="text-sm text-green-700">Спасибо за оплату, ваша удача скоро будет активирована.</p>
          </div>
        </div>
      )}
      {paymentStatus === 'cancel' && (
        <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4 flex items-center gap-3">
          <Icon name="XCircle" size={28} className="text-red-600 shrink-0" />
          <div>
            <p className="font-semibold text-red-800">Оплата отменена</p>
            <p className="text-sm text-red-700">Платёж не был завершён. Вы можете попробовать снова.</p>
          </div>
        </div>
      )}

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
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-lg">Тариф:</span>
              <span className="font-semibold">{duration || 'Активация удачи'}</span>
            </div>
            {date && (
              <div className="flex justify-between items-center">
                <span className="text-lg">Дата активации:</span>
                <span className="font-semibold">{date}</span>
              </div>
            )}
            {customerName && (
              <div className="flex justify-between items-center">
                <span className="text-lg">Получатель:</span>
                <span className="font-semibold">{customerName}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-lg">Стоимость:</span>
              <span className="text-2xl font-bold text-green-600">{price} ₽</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default OrderSummary;
