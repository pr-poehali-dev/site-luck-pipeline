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
    script.onload = () => {
      console.log('Tinkoff script loaded successfully');
    };
    script.onerror = () => {
      console.error('Failed to load Tinkoff script');
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const description = formData.get('description') as string;
    const amount = formData.get('amount') as string;
    const email = formData.get('email') as string;
    if (!email) {
      alert('Поле E-mail не должно быть пустым');
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
    console.log('Form data:', {
      terminalkey: form.terminalkey.value,
      amount: amount,
      description: description,
      email: email,

    });

    if ((window as any).pay) {
      console.log('Calling Tinkoff pay function');
      (window as any).pay(form);
    } else {
      console.error('Tinkoff pay function not available');
      alert('Ошибка инициализации платежной системы. Попробуйте перезагрузить страницу.');
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
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                margin: 2px auto;
                -webkit-box-orient: vertical;
                -webkit-box-direction: normal;
                -ms-flex-direction: column;
                flex-direction: column;
                max-width: 250px;
              }
              .payform-tbank-row {
                margin: 2px;
                border-radius: 4px;
                -webkit-box-flex: 1;
                -ms-flex: 1;
                flex: 1;
                -webkit-transition: 0.3s;
                -o-transition: 0.3s;
                transition: 0.3s;
                border: 1px solid #DFE3F3;
                padding: 15px;
                outline: none;
                background-color: #DFE3F3;
                font-size: 15px;
              }
              .payform-tbank-row:focus {
                background-color: #FFFFFF;
                border: 1px solid #616871;
                border-radius: 4px;
              }
              .payform-tbank-btn {
                background-color: #FBC520;
                border: 1px solid #FBC520;
                color: #3C2C0B;
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