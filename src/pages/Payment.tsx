import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useEffect } from 'react';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const wish = location.state?.wish || '';
  const price = location.state?.price || 299;
  const duration = location.state?.duration || '';
  const date = location.state?.date || null;

  useEffect(() => {
    // Подгружаем скрипт Тинькофф
    const script = document.createElement('script');
    script.src = 'https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const description = formData.get('description') as string;
    const amount = formData.get('amount') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;

    if (!email && !phone) {
      alert('Поле E-mail или Phone не должно быть пустым');
      return;
    }

    // Устанавливаем receipt
    const receiptInput = form.querySelector('input[name="receipt"]') as HTMLInputElement;
    receiptInput.value = JSON.stringify({
      "EmailCompany": "mail@mail.com",
      "Taxation": "patent",
      "FfdVersion": "1.2",
      "Items": [
        {
          "Name": description || "Активация удачи",
          "Price": Math.round(Number(amount) * 100),
          "Quantity": 1.00,
          "Amount": Math.round(Number(amount) * 100),
          "PaymentMethod": "full_prepayment",
          "PaymentObject": "service",
          "Tax": "none",
          "MeasurementUnit": "pc"
        }
      ]
    });

    // Вызываем функцию pay из скрипта Тинькофф
    if ((window as any).pay) {
      (window as any).pay(form);
    }
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
              <div className="flex justify-between items-center">
                <span className="text-lg">Стоимость:</span>
                <span className="text-2xl font-bold text-green-600">{price} ₽</span>
              </div>
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
          <CardContent>
            <style>{`
              .payform-tbank {
                display: flex;
                margin: 2px auto;
                flex-direction: column;
                max-width: 400px;
              }
              .payform-tbank-row {
                margin: 8px 0;
                border-radius: 8px;
                flex: 1;
                transition: 0.3s;
                border: 1px solid #DFE3F3;
                padding: 12px 16px;
                outline: none;
                background-color: #F8F9FA;
                font-size: 16px;
              }
              .payform-tbank-row:focus {
                background-color: #FFFFFF;
                border: 1px solid #616871;
                border-radius: 8px;
              }
              .payform-tbank-btn {
                background-color: #FBC520;
                border: 1px solid #FBC520;
                color: #3C2C0B;
                font-weight: 600;
                cursor: pointer;
                margin-top: 16px;
                padding: 16px;
              }
              .payform-tbank-btn:hover {
                background-color: #FAB619;
                border: 1px solid #FAB619;
              }
            `}</style>
            <form className="payform-tbank" onSubmit={handleFormSubmit}>
              <input type="hidden" name="terminalkey" value="TBankTest" />
              <input type="hidden" name="frame" value="false" />
              <input type="hidden" name="language" value="ru" />
              <input type="hidden" name="receipt" value="" />
              <input 
                className="payform-tbank-row" 
                type="number" 
                placeholder="Сумма заказа" 
                name="amount" 
                value={price}
                readOnly
                required 
              />
              <input type="hidden" name="order" value={`order-${Date.now()}`} />
              <input 
                className="payform-tbank-row" 
                type="text" 
                placeholder="Описание заказа" 
                name="description"
                value={`${duration || 'Активация удачи'}${date ? ` на ${date}` : ''}`}
                readOnly
              />
              <input 
                className="payform-tbank-row" 
                type="text" 
                placeholder="ФИО плательщика" 
                name="name"
                required
              />
              <input 
                className="payform-tbank-row" 
                type="email" 
                placeholder="E-mail" 
                name="email"
              />
              <input 
                className="payform-tbank-row" 
                type="tel" 
                placeholder="Контактный телефон" 
                name="phone"
              />
              <input 
                className="payform-tbank-row payform-tbank-btn" 
                type="submit" 
                value="Оплатить"
              />
            </form>
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