import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface BankTerminalProps {
  isVisible: boolean;
  onClose: () => void;
}

const BankTerminal: React.FC<BankTerminalProps> = ({ isVisible, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentStep, setCurrentStep] = useState<'login' | 'password' | 'main'>('login');
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [currentScreen, setCurrentScreen] = useState<'main' | 'balance' | 'transfer' | 'history'>('main');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferCard, setTransferCard] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);

  const CORRECT_LOGIN = '1754297590205DEMO';
  const CORRECT_PASSWORD = 'T!asb9Hg7$MBmWXF';

  useEffect(() => {
    if (isVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isVisible, currentStep]);

  const handleAuth = () => {
    if (currentStep === 'login') {
      if (loginInput === CORRECT_LOGIN) {
        setCurrentStep('password');
        setPasswordInput('');
      } else {
        alert('Неверный ID пользователя');
        setLoginInput('');
      }
    } else if (currentStep === 'password') {
      if (passwordInput === CORRECT_PASSWORD) {
        setIsAuthenticated(true);
        setCurrentStep('main');
      } else {
        alert('Неверный пароль');
        setPasswordInput('');
      }
    }
  };

  const handleTransfer = () => {
    if (transferAmount && transferCard && parseFloat(transferAmount) > 0) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setCurrentScreen('main');
        setTransferAmount('');
        setTransferCard('');
      }, 3000);
    } else {
      alert('Заполните все поля корректно');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (!isAuthenticated) {
        handleAuth();
      }
    }
  };

  const formatBalance = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB'
    }).format(amount);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 p-8 rounded-2xl shadow-2xl w-96 h-[600px] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black hover:text-gray-700 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <div className="text-2xl font-bold text-black mb-2">Тинькофф</div>
          <div className="text-sm text-black/80">Банковский терминал</div>
        </div>

        <div className="bg-black text-yellow-400 p-4 rounded-lg h-96 overflow-y-auto font-mono text-sm">
          {!isAuthenticated ? (
            <div>
              <div className="mb-4">
                <div className="text-center text-yellow-400 mb-4">
                  ═══════════════════════════════════
                  <br />
                  🏦 ВХОД В СИСТЕМУ
                  <br />
                  ═══════════════════════════════════
                </div>
                
                {currentStep === 'login' ? (
                  <div>
                    <div className="mb-2">Введите ID пользователя:</div>
                    <input
                      ref={inputRef}
                      type="text"
                      value={loginInput}
                      onChange={(e) => setLoginInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="bg-transparent border-b border-yellow-400 outline-none text-yellow-400 w-full"
                      placeholder="1754297590205DEMO"
                      maxLength={20}
                    />
                  </div>
                ) : (
                  <div>
                    <div className="mb-2">ID: {CORRECT_LOGIN}</div>
                    <div className="mb-2">Введите пароль:</div>
                    <input
                      ref={inputRef}
                      type="password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="bg-transparent border-b border-yellow-400 outline-none text-yellow-400 w-full"
                      placeholder="••••••••••••••••"
                    />
                  </div>
                )}
                
                <div className="mt-4 text-xs text-yellow-400/70">
                  Нажмите Enter для продолжения
                </div>
              </div>
            </div>
          ) : (
            <div>
              {currentScreen === 'main' && (
                <div>
                  <div className="text-center mb-4">
                    <div className="text-yellow-400">Добро пожаловать!</div>
                    <div className="text-xs text-yellow-400/70 mt-1">Клиент: DEMO USER</div>
                  </div>
                  
                  <div className="space-y-2">
                    <button
                      onClick={() => setCurrentScreen('balance')}
                      className="w-full text-left hover:bg-yellow-400/20 p-2 rounded transition-colors"
                    >
                      [1] 💰 Баланс счета
                    </button>
                    <button
                      onClick={() => setCurrentScreen('transfer')}
                      className="w-full text-left hover:bg-yellow-400/20 p-2 rounded transition-colors"
                    >
                      [2] 💳 Перевод средств
                    </button>
                    <button
                      onClick={() => setCurrentScreen('history')}
                      className="w-full text-left hover:bg-yellow-400/20 p-2 rounded transition-colors"
                    >
                      [3] 📋 История операций
                    </button>
                    <button
                      onClick={onClose}
                      className="w-full text-left hover:bg-yellow-400/20 p-2 rounded transition-colors text-red-400"
                    >
                      [0] ❌ Выход
                    </button>
                  </div>
                </div>
              )}

              {currentScreen === 'balance' && (
                <div>
                  <div className="text-center mb-4">
                    <div className="text-yellow-400 mb-2">💰 БАЛАНС СЧЕТА</div>
                    <div className="border border-yellow-400 p-4 rounded">
                      <div className="text-lg font-bold">{formatBalance(247856.32)}</div>
                      <div className="text-xs text-yellow-400/70 mt-1">
                        Доступно для операций
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-xs space-y-1 mb-4">
                    <div>Номер счета: •••• •••• •••• 5421</div>
                    <div>Последнее обновление: {new Date().toLocaleString('ru-RU')}</div>
                  </div>

                  <button
                    onClick={() => setCurrentScreen('main')}
                    className="w-full bg-yellow-400/20 hover:bg-yellow-400/30 p-2 rounded transition-colors"
                  >
                    ← Назад
                  </button>
                </div>
              )}

              {currentScreen === 'transfer' && !showSuccess && (
                <div>
                  <div className="text-center mb-4">
                    <div className="text-yellow-400 mb-2">💳 ПЕРЕВОД СРЕДСТВ</div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs mb-1">Номер карты получателя:</label>
                      <input
                        type="text"
                        value={transferCard}
                        onChange={(e) => setTransferCard(e.target.value)}
                        className="w-full bg-transparent border border-yellow-400 p-2 rounded outline-none text-yellow-400"
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                      />
                    </div>

                    <div>
                      <label className="block text-xs mb-1">Сумма перевода (₽):</label>
                      <input
                        type="number"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                        className="w-full bg-transparent border border-yellow-400 p-2 rounded outline-none text-yellow-400"
                        placeholder="0.00"
                        min="1"
                        max="200000"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={handleTransfer}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white p-2 rounded transition-colors"
                      >
                        Перевести
                      </button>
                      <button
                        onClick={() => setCurrentScreen('main')}
                        className="flex-1 bg-yellow-400/20 hover:bg-yellow-400/30 p-2 rounded transition-colors"
                      >
                        Отмена
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {showSuccess && (
                <div className="text-center">
                  <div className="text-green-400 text-lg mb-4">✅ УСПЕШНО!</div>
                  <div className="border border-green-400 p-4 rounded mb-4">
                    <div className="text-sm">Перевод выполнен</div>
                    <div className="font-bold mt-2">{formatBalance(parseFloat(transferAmount))}</div>
                    <div className="text-xs text-yellow-400/70 mt-1">
                      На карту •••• {transferCard.slice(-4)}
                    </div>
                  </div>
                  <div className="text-xs text-yellow-400/70">
                    Возврат в главное меню...
                  </div>
                </div>
              )}

              {currentScreen === 'history' && (
                <div>
                  <div className="text-center mb-4">
                    <div className="text-yellow-400 mb-2">📋 ИСТОРИЯ ОПЕРАЦИЙ</div>
                  </div>

                  <div className="space-y-2 text-xs">
                    {[
                      { date: '14.08.2025', type: 'Поступление', amount: '+15000.00', desc: 'Зарплата' },
                      { date: '13.08.2025', type: 'Списание', amount: '-1250.00', desc: 'Покупка в магазине' },
                      { date: '12.08.2025', type: 'Перевод', amount: '-5000.00', desc: 'Перевод другу' },
                      { date: '11.08.2025', type: 'Поступление', amount: '+500.00', desc: 'Кэшбэк' },
                      { date: '10.08.2025', type: 'Списание', amount: '-2100.00', desc: 'Коммунальные услуги' }
                    ].map((transaction, index) => (
                      <div key={index} className="border-b border-yellow-400/30 pb-1">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-semibold">{transaction.desc}</div>
                            <div className="text-yellow-400/70">{transaction.date}</div>
                          </div>
                          <div className={`font-bold ${transaction.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                            {transaction.amount} ₽
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentScreen('main')}
                    className="w-full bg-yellow-400/20 hover:bg-yellow-400/30 p-2 rounded transition-colors mt-4"
                  >
                    ← Назад
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={!isAuthenticated ? handleAuth : () => setCurrentScreen('main')}
            className="bg-black text-yellow-400 px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors font-semibold"
          >
            {!isAuthenticated ? 'ВОЙТИ' : 'ГЛАВНАЯ'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankTerminal;