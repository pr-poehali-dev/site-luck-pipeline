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
    const form = e.currentTarget as HTMLFormElement;
    const { description, amount, email, receipt } = form;

    if (receipt) {
      if (!email.value) {
        return alert("Поле E-mail не должно быть пустым");
      }

      (receipt as HTMLInputElement).value = JSON.stringify({
        "EmailCompany": "mail@mail.com",
        "Taxation": "patent",
        "FfdVersion": "1.2",
        "Items": [
          {
            "Name": (description as HTMLInputElement).value || "Активация удачи",
            "Price": Math.round(Number((amount as HTMLInputElement).value) * 100),
            "Quantity": 1.00,
            "Amount": Math.round(Number((amount as HTMLInputElement).value) * 100),
            "PaymentMethod": "full_prepayment",
            "PaymentObject": "service",
            "Tax": "none",
            "MeasurementUnit": "pc"
          }
        ]
      });
    }

    if ((window as any).pay) {
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

        {/* Быстрая оплата */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Zap" size={24} className="text-yellow-500" />
              Быстрая оплата
            </CardTitle>
            <CardDescription>
              Выберите удобный способ мгновенной оплаты
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* СБП */}
            <div className="mb-4 p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Icon name="Smartphone" size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Система быстрых платежей</h3>
                  <p className="text-sm text-gray-600">Переводы по номеру телефона</p>
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Icon name="Smartphone" size={16} className="mr-2" />
                СБП - {price} ₽
              </Button>
            </div>

            {/* Мобильные платежи */}
            <div className="mb-4 p-4 border rounded-lg bg-gradient-to-r from-purple-50 to-violet-50">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Icon name="Wallet" size={20} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Мобильные платежи</h3>
                  <p className="text-sm text-gray-600">Apple Pay, Google Pay, Samsung Pay</p>
                </div>
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                <Icon name="Wallet" size={16} className="mr-2" />
                Мобильный платёж - {price} ₽
              </Button>
            </div>

            {/* QR-код */}
            <div className="mb-4 p-4 border rounded-lg bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <Icon name="QrCode" size={20} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">QR-код оплата</h3>
                  <p className="text-sm text-gray-600">Сканируйте камерой телефона</p>
                </div>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <Icon name="QrCode" size={16} className="mr-2" />
                Показать QR-код - {price} ₽
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Форма оплаты картой */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="CreditCard" size={24} />
              Оплата банковской картой
            </CardTitle>
            <CardDescription>
              Visa, MasterCard, МИР
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
              .payform-tbank * {
                display: block !important;
                visibility: visible !important;
                height: auto !important;
                opacity: 1 !important;
              }
              .payform-tbank {
                position: static !important;
                z-index: 9999 !important;
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
            <form className="payform-tbank" name="payform-tbank" id="payform-tbank" onSubmit={handleFormSubmit} style={{ display: 'flex !important' }}>
              <input type="hidden" name="terminalkey" value="1755155028995" />
              <input type="hidden" name="frame" value="false" />
              <input type="hidden" name="language" value="ru" />
              <input type="hidden" name="receipt" value="" />
              <input type="hidden" name="password" value="JY#iJKaKe2rjfAI_" />
              <input type="hidden" name="spb" value="true" />
              <input 
                className="payform-tbank-row" 
                type="text" 
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