import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Rules = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Заголовок */}
        <div className="text-center bg-white rounded-lg p-8 shadow-sm">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Правила оказания услуг
          </h1>
          <p className="text-lg text-gray-600">
            Психологическая поддержка и мотивационная терапия
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Действует с 13 августа 2025 года
          </p>
        </div>

        {/* Общие положения */}
        <Card className="shadow-sm">
          <CardHeader className="bg-blue-50">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Icon name="BookOpen" size={24} className="text-blue-600" />
              1. Общие положения
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              1.1. Настоящие Правила регулируют отношения между Исполнителем и Заказчиком при оказании психологических услуг в области мотивационной поддержки и привлечения позитивного мышления.
            </p>
            <p className="text-gray-700 leading-relaxed">
              1.2. Исполнитель: ИП Паклин Сергей Васильевич, ИНН 594200005879, ОГРН 305591619400016, осуществляющий деятельность по психологической поддержке населения.
            </p>
            <p className="text-gray-700 leading-relaxed">
              1.3. Заказчик: физическое лицо, достигшее 18 лет, обратившееся за психологической помощью.
            </p>
            <p className="text-gray-700 leading-relaxed">
              1.4. Услуги оказываются в соответствии с Федеральным законом "О защите прав потребителей" от 07.02.1992 № 2300-1-ФЗ.
            </p>
          </CardContent>
        </Card>

        {/* Описание услуг */}
        <Card className="shadow-sm">
          <CardHeader className="bg-green-50">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Icon name="Heart" size={24} className="text-green-600" />
              2. Описание услуг
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              2.1. Исполнитель оказывает услуги по психологической поддержке, включающие:
            </p>
            <ul className="ml-6 space-y-2 text-gray-700">
              <li>• Мотивационную терапию и настрой на успех</li>
              <li>• Работу с позитивным мышлением</li>
              <li>• Психологическую поддержку в достижении целей</li>
              <li>• Консультации по преодолению психологических барьеров</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              2.2. Услуги носят консультационный характер и не заменяют медицинского лечения.
            </p>
            <p className="text-gray-700 leading-relaxed">
              2.3. Исполнитель не гарантирует конкретных материальных результатов, но обеспечивает профессиональную психологическую поддержку.
            </p>
          </CardContent>
        </Card>

        {/* Стоимость и оплата */}
        <Card className="shadow-sm">
          <CardHeader className="bg-yellow-50">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Icon name="CreditCard" size={24} className="text-yellow-600" />
              3. Стоимость услуг и порядок оплаты
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              3.1. Стоимость психологической консультации составляет от 100 до 1000 рублей в зависимости от сложности запроса.
            </p>
            <p className="text-gray-700 leading-relaxed">
              3.2. Оплата производится полностью до начала оказания услуги через защищенные платежные системы.
            </p>
            <p className="text-gray-700 leading-relaxed">
              3.3. НДС не облагается в соответствии со ст. 346.11 НК РФ (упрощенная система налогообложения).
            </p>
            <p className="text-gray-700 leading-relaxed">
              3.4. При оплате Заказчик получает электронный чек на указанную электронную почту.
            </p>
          </CardContent>
        </Card>

        {/* Права и обязанности */}
        <Card className="shadow-sm">
          <CardHeader className="bg-purple-50">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Icon name="Scale" size={24} className="text-purple-600" />
              4. Права и обязанности сторон
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">4.1. Исполнитель обязуется:</h4>
              <ul className="ml-6 space-y-1 text-gray-700">
                <li>• Оказать услуги качественно и в срок</li>
                <li>• Соблюдать конфиденциальность</li>
                <li>• Предоставить документы об оплате</li>
                <li>• Действовать в интересах Заказчика</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">4.2. Заказчик обязуется:</h4>
              <ul className="ml-6 space-y-1 text-gray-700">
                <li>• Своевременно оплатить услуги</li>
                <li>• Предоставить достоверную информацию</li>
                <li>• Соблюдать рекомендации специалиста</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Возврат средств */}
        <Card className="shadow-sm">
          <CardHeader className="bg-red-50">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Icon name="RefreshCw" size={24} className="text-red-600" />
              5. Условия возврата средств
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              5.1. Возврат денежных средств возможен в течение 7 дней с момента оплаты при условии неоказания услуги по вине Исполнителя.
            </p>
            <p className="text-gray-700 leading-relaxed">
              5.2. После начала оказания услуги возврат средств не производится, так как услуга носит консультационный характер.
            </p>
            <p className="text-gray-700 leading-relaxed">
              5.3. Возврат осуществляется на тот же платежный инструмент, с которого была произведена оплата, в течение 10 рабочих дней.
            </p>
          </CardContent>
        </Card>

        {/* Конфиденциальность */}
        <Card className="shadow-sm">
          <CardHeader className="bg-indigo-50">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Icon name="Shield" size={24} className="text-indigo-600" />
              6. Конфиденциальность и защита данных
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              6.1. Исполнитель обязуется не разглашать информацию, полученную от Заказчика в процессе оказания услуг.
            </p>
            <p className="text-gray-700 leading-relaxed">
              6.2. Персональные данные обрабатываются в соответствии с ФЗ-152 "О персональных данных".
            </p>
            <p className="text-gray-700 leading-relaxed">
              6.3. Заказчик дает согласие на обработку персональных данных, необходимых для оказания услуг.
            </p>
          </CardContent>
        </Card>

        {/* Ответственность */}
        <Card className="shadow-sm">
          <CardHeader className="bg-orange-50">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Icon name="AlertTriangle" size={24} className="text-orange-600" />
              7. Ответственность и ограничения
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              7.1. Исполнитель не несет ответственности за результаты, не зависящие от качества психологических услуг.
            </p>
            <p className="text-gray-700 leading-relaxed">
              7.2. Услуги не являются медицинскими и не заменяют лечение у врача-психиатра или психотерапевта.
            </p>
            <p className="text-gray-700 leading-relaxed">
              7.3. При наличии серьезных психических расстройств рекомендуется обращение к медицинским специалистам.
            </p>
          </CardContent>
        </Card>

        {/* Психологические аспекты */}
        <Card className="shadow-sm">
          <CardHeader className="bg-teal-50">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Icon name="Brain" size={24} className="text-teal-600" />
              8. Психологические механизмы воздействия
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-blue-800 font-medium mb-3">
                Научные основы работы сервиса:
              </p>
              <ul className="space-y-2 text-blue-700">
                <li>• <strong>Позитивное мышление:</strong> Активация механизмов целеполагания и мотивации</li>
                <li>• <strong>Ритуализация:</strong> Создание психологического "якоря" для укрепления намерений</li>
                <li>• <strong>Самовнушение:</strong> Программирование подсознания на достижение целей</li>
                <li>• <strong>Плацебо-эффект:</strong> Усиление веры в собственные возможности</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Контакты */}
        <Card className="shadow-sm">
          <CardHeader className="bg-gray-50">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Icon name="Mail" size={24} className="text-gray-600" />
              9. Контактная информация
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Реквизиты Исполнителя:</h4>
                <p className="text-gray-700">ИП Паклин Сергей Васильевич</p>
                <p className="text-gray-700">ИНН: 594200005879</p>
                <p className="text-gray-700">ОГРН: 305591619400016</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Контакты:</h4>
                <p className="text-gray-700">Email: Unix7777@ya.ru</p>
                <p className="text-gray-700 text-sm mt-2">
                  Для обращений и жалоб по качеству услуг
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        <div className="bg-gray-100 p-6 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-4">
            Настоящие Правила составлены в соответствии с законодательством Российской Федерации
            и вступают в силу с момента размещения на сайте.
          </p>
          <p className="text-xs text-gray-500">
            Последнее обновление: 13 августа 2025 года
          </p>
        </div>

        {/* Кнопка возврата */}
        <div className="text-center pb-8">
          <Button 
            onClick={() => navigate('/')}
            className="px-8 py-3 text-lg"
            variant="outline"
          >
            ← Вернуться на главную
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Rules;