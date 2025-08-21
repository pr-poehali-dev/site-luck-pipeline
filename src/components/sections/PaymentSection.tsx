import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface PaymentSectionProps {
  paymentRef: React.RefObject<HTMLDivElement>;
  wishText: string;
  selectedOption: {
    duration: string;
    immediate: boolean;
  } | null;
  selectedDate: string;
  currentStrength: number;
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const PaymentSection = ({
  paymentRef,
  wishText,
  selectedOption,
  selectedDate,
  currentStrength,
  onFormSubmit
}: PaymentSectionProps) => {
  return (
    <section ref={paymentRef} className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Оплата услуги
          </h1>
          <p className="text-lg text-gray-600">
            Завершите оплату, чтобы активировать удачу
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Sparkles" size={24} />
              Ваше пожелание удачи
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-800 italic">"{wishText}"</p>
            </div>
            <Separator className="my-4" />
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-lg">Тариф:</span>
                <span className="font-semibold">{selectedOption?.duration || 'Активация удачи'}</span>
              </div>
              {selectedOption && !selectedOption.immediate && selectedDate && (
                <div className="flex justify-between items-center">
                  <span className="text-lg">Дата активации:</span>
                  <span className="font-semibold">{selectedDate}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-lg">Стоимость:</span>
                <span className="text-2xl font-bold text-green-600">{currentStrength * 100} ₽</span>
              </div>
            </div>
          </CardContent>
        </Card>

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
            <form className="payform-tbank" name="payform-tbank" id="payform-tbank" onSubmit={onFormSubmit} style={{ display: 'flex !important' }}>
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
                value={currentStrength * 100}
                readOnly
                required 
              />
              <input type="hidden" name="order" value={`order-${Date.now()}`} />
              <input 
                className="payform-tbank-row" 
                type="text" 
                placeholder="Описание заказа" 
                name="description"
                value={`${selectedOption?.duration || 'Активация удачи'}${selectedOption && !selectedOption.immediate && selectedDate ? ` на ${selectedDate}` : ''}`}
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
      </div>
    </section>
  );
};

export default PaymentSection;