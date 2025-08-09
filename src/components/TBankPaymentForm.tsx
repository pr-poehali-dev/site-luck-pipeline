import { useEffect } from 'react';

declare global {
  interface Window {
    pay: (form: HTMLFormElement) => void;
  }
}

const TBankPaymentForm = () => {
  useEffect(() => {
    // Загружаем скрипт Т-Банка
    const script = document.createElement('script');
    script.src = 'https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const description = formData.get('description') as string;
    const amount = formData.get('amount') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const receipt = formData.get('receipt') as string;

    if (receipt) {
      if (!email && !phone) {
        alert("Поле E-mail или Phone не должно быть пустым");
        return;
      }

      const receiptInput = form.querySelector('[name="receipt"]') as HTMLInputElement;
      receiptInput.value = JSON.stringify({
        "EmailCompany": "mail@mail.com",
        "Taxation": "patent",
        "FfdVersion": "1.2",
        "Items": [
          {
            "Name": description || "Оплата",
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
    }

    if (window.pay) {
      window.pay(form);
    }
  };

  return (
    <>
      <style>{`
        .payform-tbank {
          display: flex;
          margin: 2px auto;
          flex-direction: column;
          max-width: 250px;
        }
        .payform-tbank-row {
          margin: 2px;
          border-radius: 4px;
          flex: 1;
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
      
      <form 
        className="payform-tbank" 
        name="payform-tbank" 
        id="payform-tbank"
        onSubmit={handleSubmit}
      >
        <input className="payform-tbank-row" type="hidden" name="terminalkey" value="TBankTest" />
        <input className="payform-tbank-row" type="hidden" name="frame" value="false" />
        <input className="payform-tbank-row" type="hidden" name="language" value="ru" />
        <input className="payform-tbank-row" type="hidden" name="receipt" value="" />
        <input className="payform-tbank-row" type="text" placeholder="Сумма заказа" name="amount" required />
        <input className="payform-tbank-row" type="hidden" placeholder="Номер заказа" name="order" />

        <input className="payform-tbank-row" type="text" placeholder="ФИО плательщика" name="name" />
        <input className="payform-tbank-row" type="email" placeholder="E-mail" name="email" />
        <input className="payform-tbank-row" type="tel" placeholder="Контактный телефон" name="phone" />
        <input className="payform-tbank-row payform-tbank-btn" type="submit" value="Оплатить" />
      </form>
    </>
  );
};

export default TBankPaymentForm;