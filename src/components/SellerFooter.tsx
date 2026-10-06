import { Link } from 'react-router-dom';

const SellerFooter = () => {
  return (
    <footer className="w-full max-w-4xl mx-auto mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500 space-y-2">
      <p className="font-medium text-gray-700">ИП Паклин Сергей Васильевич</p>
      <p>ИНН 594200005879 · ОГРНИП 305591619400016</p>
      <p>Адрес: г. Сочи, ул. Красноармейская, 9Б, оф. 6</p>
      <p>
        Тел.: <a href="tel:+79024777752" className="hover:underline">+7 902 477-77-52</a> · E-mail:{' '}
        <a href="mailto:Unix7777@ya.ru" className="hover:underline">Unix7777@ya.ru</a>
      </p>
      <p className="space-x-3">
        <Link to="/rules#offer" className="underline hover:text-gray-700">Публичная оферта</Link>
        <Link to="/rules#terms" className="underline hover:text-gray-700">Пользовательское соглашение</Link>
        <Link to="/rules#privacy" className="underline hover:text-gray-700">Политика конфиденциальности</Link>
        <Link to="/rules#refund" className="underline hover:text-gray-700">Возврат средств</Link>
      </p>
      <p className="text-xs text-gray-400">Оплата банковскими картами Visa, Mastercard, МИР. Услуга носит информационно-развлекательный характер.</p>
    </footer>
  );
};

export default SellerFooter;
