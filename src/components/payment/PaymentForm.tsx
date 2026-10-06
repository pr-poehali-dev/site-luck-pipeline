import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import DownloadDialog from '@/components/payment/DownloadDialog';

interface PaymentFormProps {
  handleDownloadDocument: () => void;
  isGeneratingDocument: boolean;
  customerName: string;
  setCustomerName: (value: string) => void;
  agreed: boolean;
  setAgreed: (value: boolean) => void;
  paymentError: string;
  handleStartPayment: () => void;
  isCreatingPayment: boolean;
  price: number;
  showPaymentModal: boolean;
  paymentUrl: string;
  handleClosePaymentModal: () => void;
  showDownloadModal: boolean;
  setShowDownloadModal: (value: boolean) => void;
  setShowActivationScreen: (value: boolean) => void;
  wish: string;
  strength: number;
  date: string | null;
  duration: string;
}

const PaymentForm = ({
  handleDownloadDocument,
  isGeneratingDocument,
  customerName,
  setCustomerName,
  agreed,
  setAgreed,
  paymentError,
  handleStartPayment,
  isCreatingPayment,
  price,
  showPaymentModal,
  paymentUrl,
  handleClosePaymentModal,
  showDownloadModal,
  setShowDownloadModal,
  setShowActivationScreen,
  wish,
  strength,
  date,
  duration
}: PaymentFormProps) => {
  return (
    <>
      {/* Кнопка скачивания документа */}
      <div className="text-center">
        <style jsx>{`
          @keyframes pulseSlow {
            0%, 100% {
              background-color: rgb(147 51 234);
              box-shadow: 0 0 15px rgba(147, 51, 234, 0.3);
            }
            50% {
              background-color: rgb(168 85 247);
              box-shadow: 0 0 25px rgba(168, 85, 247, 0.6);
            }
          }
          .pulse-button {
            animation: pulseSlow 2.5s ease-in-out infinite;
          }
          .pulse-button:hover {
            animation-play-state: paused;
          }
          .pulse-button:disabled {
            animation: none;
          }
        `}</style>
        <Button
          onClick={handleDownloadDocument}
          disabled={isGeneratingDocument}
          className="pulse-button bg-purple-600 hover:bg-purple-700 text-white py-4 px-8 text-lg disabled:opacity-50 hidden"
        >
          {isGeneratingDocument ? (
            <>
              <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
              Создание документа...
            </>
          ) : (
            <>
              <Icon name="Download" size={20} className="mr-2" />
              Скачать Скрижаль Удачи
            </>
          )}
        </Button>
      </div>



      {/* Поле ФИО */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Фамилия Имя Отчество
        </label>
        <Input
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Введите ваше ФИО"
          className="w-full"
        />
      </div>

      {/* Кнопка отправки запроса и оплаты */}
      <div className="text-center">
        <label className="flex items-start gap-2 justify-center text-sm text-gray-700 mb-4 text-left cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1"
          />
          <span>
            Я принимаю{' '}
            <a href="/rules#offer" target="_blank" rel="noreferrer" className="underline text-purple-700">публичную оферту</a>,{' '}
            <a href="/rules#terms" target="_blank" rel="noreferrer" className="underline text-purple-700">пользовательское соглашение</a>{' '}и{' '}
            <a href="/rules#privacy" target="_blank" rel="noreferrer" className="underline text-purple-700">политику конфиденциальности</a>
          </span>
        </label>
        {paymentError && (
          <p className="text-red-600 text-sm mb-3">{paymentError}</p>
        )}
        <Button
          onClick={handleStartPayment}
          disabled={isCreatingPayment || !agreed}
          className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg disabled:opacity-50"
        >
          {isCreatingPayment ? (
            <>
              <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
              Подготовка оплаты...
            </>
          ) : (
            <>
              <Icon name="Send" size={20} className="mr-2" />
              Оплатить {price} ₽
            </>
          )}
        </Button>

        {/* Полноэкранная форма оплаты CrocoPay */}
        {showPaymentModal && paymentUrl && (
          <div className="fixed inset-0 z-50 bg-white flex flex-col">
            <button
              type="button"
              onClick={handleClosePaymentModal}
              className="absolute right-4 top-4 z-10 rounded-full bg-gray-100 hover:bg-gray-200 p-2 transition-colors"
              aria-label="Закрыть"
            >
              <Icon name="X" size={20} />
            </button>
            <iframe
              src={paymentUrl}
              className="w-full h-full border-0 block flex-1"
              title="Оплата CrocoPay"
            />
          </div>
        )}

        {/* Третье модальное окно для скачивания скрижали */}
        <DownloadDialog
          open={showDownloadModal}
          onOpenChange={setShowDownloadModal}
          setShowDownloadModal={setShowDownloadModal}
          setShowActivationScreen={setShowActivationScreen}
          wish={wish}
          strength={strength}
          price={price}
          date={date}
          duration={duration}
          customerName={customerName}
          isGeneratingDocument={isGeneratingDocument}
        />
      </div>
    </>
  );
};

export default PaymentForm;
