import React from 'react';

interface NavigationProps {
  currentSection: string;
  showPricing: boolean;
  onHomeClick: () => void;
  onPricingClick: () => void;
  onPaymentClick: () => void;
  onRulesClick: () => void;
}

const Navigation = ({
  currentSection,
  showPricing,
  onHomeClick,
  onPricingClick,
  onPaymentClick,
  onRulesClick
}: NavigationProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-40 border-b">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-center space-x-6">
        <button
          onClick={onHomeClick}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentSection === 'home' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Главная
        </button>
        {showPricing && (
          <button
            onClick={onPricingClick}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentSection === 'pricing' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Тарифы
          </button>
        )}
        <button
          onClick={onPaymentClick}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentSection === 'payment' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Оплата
        </button>
        <button
          onClick={onRulesClick}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentSection === 'rules' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Правила
        </button>
      </div>
    </nav>
  );
};

export default Navigation;