import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useState, useEffect, useRef } from 'react';

import { generateLuckDocument, generateDocumentNumber, formatDocumentDate, formatActivationDate, type DocumentData } from '@/utils/documentGenerator';
import func2url from '../../backend/func2url.json';
import { useSeo } from '@/hooks/useSeo';
import SellerFooter from '@/components/SellerFooter';
import OrderSummary from '@/components/payment/OrderSummary';
import PaymentForm from '@/components/payment/PaymentForm';
import ActivationScreen from '@/components/payment/ActivationScreen';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const wish = location.state?.wish || '';

  useSeo({
    title: 'Оплата активации удачи — Сайт Удачи',
    description: 'Завершите оплату, чтобы активировать удачу.',
    path: '/payment',
    noindex: true
  });
  const price = location.state?.price || 299;
  const duration = location.state?.duration || '';
  const date = location.state?.date || null;
  const strength = location.state?.strength || 1;
  const [isGeneratingDocument, setIsGeneratingDocument] = useState(false);


  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showActivationScreen, setShowActivationScreen] = useState(false);
  const [customerName, setCustomerName] = useState('');

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [currentOrderId, setCurrentOrderId] = useState('');
  const [isCreatingPayment, setIsCreatingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [agreed, setAgreed] = useState(false);
  const statusCheckInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const searchParams = new URLSearchParams(location.search);
  const paymentStatus = searchParams.get('status');
  const orderIdFromUrl = searchParams.get('order_id');

  // Сохраняем запрос в localStorage для PayMaster
  useEffect(() => {
    if (wish) {
      localStorage.setItem('currentWish', wish);
    }
  }, [wish]);

  const handleDownloadDocument = async () => {
    if (!wish) {
      alert('Ошибка: не найдено пожелание для создания документа');
      return;
    }

    setIsGeneratingDocument(true);
    try {
      const documentData: DocumentData = {
        wish: wish || 'Ваше желание',
        powerLevel: strength || 1,
        userName: 'Получатель силы',
        energyInvestment: price || 299,
        activationDate: formatActivationDate(date, duration || ''),
        documentNumber: generateDocumentNumber(),
        documentDate: formatDocumentDate()
      };
      
      await generateLuckDocument(documentData);
      
    } catch (error) {
      console.error('Ошибка при создании документа:', error);
      const errorMessage = error instanceof Error ? error.message : 'Не удалось создать документ. Попробуйте еще раз.';
      alert('Ошибка: ' + errorMessage);
    } finally {
      setIsGeneratingDocument(false);
    }
  };


  // Если вернулись с успешной оплаты - показываем окно скачивания
  useEffect(() => {
    if (paymentStatus === 'success' && orderIdFromUrl) {
      setShowDownloadModal(true);
    }
  }, [paymentStatus, orderIdFromUrl]);

  useEffect(() => {
    return () => {
      if (statusCheckInterval.current) {
        clearInterval(statusCheckInterval.current);
      }
    };
  }, []);

  const handleStartPayment = async () => {
    if (!wish) {
      alert('Ошибка: не найдено пожелание');
      return;
    }

    setPaymentError('');
    setIsCreatingPayment(true);

    try {
      const response = await fetch(func2url['crocopay-init'], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: price,
          wish,
          customerName,
          duration,
          activationDate: date,
          strength
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Не удалось создать платёж');
      }

      setCurrentOrderId(data.order_id);
      setPaymentUrl(data.redirect_url);
      setShowPaymentModal(true);

      statusCheckInterval.current = setInterval(async () => {
        try {
          const statusRes = await fetch(`${func2url['crocopay-status']}?order_id=${data.order_id}`);
          const statusData = await statusRes.json();

          if (statusData.status === 'paid') {
            if (statusCheckInterval.current) clearInterval(statusCheckInterval.current);
            setShowPaymentModal(false);
            setShowDownloadModal(true);
          }
        } catch (e) {
          console.error('Ошибка проверки статуса платежа:', e);
        }
      }, 3000);
    } catch (error) {
      console.error('Ошибка создания платежа:', error);
      const errorMessage = error instanceof Error ? error.message : 'Не удалось создать платёж. Попробуйте ещё раз.';
      setPaymentError(errorMessage);
    } finally {
      setIsCreatingPayment(false);
    }
  };

  const handleClosePaymentModal = () => {
    if (statusCheckInterval.current) {
      clearInterval(statusCheckInterval.current);
    }
    setShowPaymentModal(false);
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

        <OrderSummary
          paymentStatus={paymentStatus}
          wish={wish}
          duration={duration}
          date={date}
          customerName={customerName}
          price={price}
        />

        <PaymentForm
          handleDownloadDocument={handleDownloadDocument}
          isGeneratingDocument={isGeneratingDocument}
          customerName={customerName}
          setCustomerName={setCustomerName}
          agreed={agreed}
          setAgreed={setAgreed}
          paymentError={paymentError}
          handleStartPayment={handleStartPayment}
          isCreatingPayment={isCreatingPayment}
          price={price}
          showPaymentModal={showPaymentModal}
          paymentUrl={paymentUrl}
          handleClosePaymentModal={handleClosePaymentModal}
          showDownloadModal={showDownloadModal}
          setShowDownloadModal={setShowDownloadModal}
          setShowActivationScreen={setShowActivationScreen}
          wish={wish}
          strength={strength}
          date={date}
          duration={duration}
        />

        {/* Информация после оплаты */}
        <div className="text-center mt-4">
          <p className="text-gray-600 font-semibold text-xl">После оплаты можно будет скачать скрижаль удачи ( только после закрытия окна оплаты)</p>
        </div>

        {/* Кнопка назад */}
        <div className="text-center">
          <Button variant="outline" onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Вернуться назад
          </Button>
        </div>

        <SellerFooter />



      </div>

      {/* Заставка активации удачи */}
      {showActivationScreen && <ActivationScreen />}
    </div>
  );
};

export default Payment;
