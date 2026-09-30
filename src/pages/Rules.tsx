import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Rules = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8">
        {/* Заголовок */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Правила использования
          </h1>
          <p className="text-lg text-gray-600">
            Сайт удачи - условия и положения
          </p>
        </div>

        {/* Основные правила */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="BookOpen" size={24} />
              Общие положения
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Добро пожаловать на "Сайт удачи" - уникальный сервис для привлечения удачи в различные сферы жизни.
            </p>
            <p className="text-gray-700">
              Используя наш сервис, вы соглашаетесь с данными правилами и условиями использования.
            </p>
          </CardContent>
        </Card>

        {/* О скрижали удачи */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Scroll" size={24} />
              О Скрижали Удачи
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              <strong>Скрижаль Удачи</strong> — это персональный магический документ, создаваемый специально для вашего пожелания. Каждая скрижаль содержит:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Ваше персональное пожелание, зашифрованное в древних символах</li>
              <li>Уникальную печать пентаграммы для активации магической силы</li>
              <li>Дату активации и индивидуальный номер скрижали</li>
              <li>Специальные руны и символы для усиления энергетического воздействия</li>
            </ul>
            <p className="text-gray-700">
              Скрижаль изготавливается в момент оплаты и активируется древними ритуалами для максимального воздействия на вашу удачу.
            </p>
          </CardContent>
        </Card>

        {/* Инструкция по использованию */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="ListChecks" size={24} />
              Инструкция по использованию
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Как заказать Скрижаль Удачи:</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>На главной странице введите ваше желание в поле "Загадайте желание"</li>
                <li>Выберите подходящий тарифный план (Базовый, Премиум или VIP)</li>
                <li>Нажмите кнопку "Активировать удачу" для перехода к оплате</li>
                <li>Заполните форму оплаты и совершите платеж</li>
                <li>Получите вашу персональную Скрижаль Удачи</li>
              </ol>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Что делать со скрижалью:</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Сохраните документ:</strong> Скачайте скрижаль в формате PDF или сохраните ссылку</li>
                <li><strong>Медитируйте:</strong> Регулярно просматривайте скрижаль, концентрируясь на своем желании</li>
                <li><strong>Носите с собой:</strong> Держите изображение скрижали на телефоне или распечатайте</li>
                <li><strong>Визуализируйте:</strong> Представляйте исполнение желания при взгляде на печать</li>
                <li><strong>Верьте в силу:</strong> Позитивный настрой усиливает магическое воздействие</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-purple-800 text-sm">
                <strong>💫 Совет мага:</strong> Наибольшая сила скрижали проявляется в первые 30 дней после активации. 
                Регулярно обращайтесь к документу и действуйте в направлении своей цели!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Правила оплаты */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="CreditCard" size={24} />
              Условия оплаты
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-gray-700">
              <li>• Стоимость активации удачи составляет от 100₽ до 1000₽</li>
              <li>• Оплата производится единовременно за одно пожелание</li>
              <li>• Возврат средств не предусмотрен после активации пожелания</li>
              <li>• Все платежи обрабатываются через защищенные платежные системы</li>
            </ul>
          </CardContent>
        </Card>

        {/* Гарантии */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Shield" size={24} />
              Гарантии и ответственность
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <p className="text-yellow-800 font-medium mb-3">
                Важные условия предоставления услуги:
              </p>
              <div className="space-y-3 text-yellow-700">
                <p>
                  <strong>Характер услуги:</strong> "Сайт удачи" предоставляет психологическую поддержку в виде ритуала загадывания желаний, направленного на повышение мотивации и позитивного настроя пользователя.
                </p>
                <p>
                  <strong>Гарантии качества:</strong> Мы гарантируем техническую исправность сервиса, конфиденциальность обработки данных и выполнение ритуала согласно выбранному тарифу.
                </p>
                <p>
                  <strong>Ограничения ответственности:</strong> Администрация не несет ответственности за материальные результаты, изменения в личной жизни или внешних обстоятельствах пользователя. Сервис не гарантирует исполнение желаний в буквальном смысле.
                </p>
                <p>
                  <strong>Индивидуальность эффекта:</strong> Психологическое воздействие сервиса является сугубо индивидуальным и зависит от личных особенностей, установок и последующих действий пользователя.
                </p>
                <p>
                  <strong>Возврат средств:</strong> Поскольку услуга носит информационно-психологический характер и оказывается сразу после оплаты, возврат денежных средств не предусмотрен, за исключением технических сбоев по вине сервиса.
                </p>
              </div>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="text-red-800 font-medium mb-2">
                ⚠️ Отказ от ответственности:
              </p>
              <p className="text-red-700 text-sm">
                Использование сервиса не может заменить профессиональную медицинскую, психологическую или финансовую консультацию. При наличии серьезных проблем обращайтесь к соответствующим специалистам.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Правила использования */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="AlertTriangle" size={24} />
              Правила поведения
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-gray-700">
              <li>• Пожелания должны быть корректными и не содержать оскорбительной лексики</li>
              <li>• Запрещается использование сервиса для нанесения вреда другим людям</li>
              <li>• Один пользователь может оформить неограниченное количество пожеланий</li>
              <li>• Администрация оставляет за собой право отклонить неподходящие пожелания</li>
            </ul>
          </CardContent>
        </Card>

        {/* Конфиденциальность */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Lock" size={24} />
              Конфиденциальность
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Мы уважаем вашу конфиденциальность и не передаем ваши пожелания третьим лицам. 
              Все данные хранятся в зашифрованном виде и используются исключительно для 
              предоставления услуги.
            </p>
          </CardContent>
        </Card>

        {/* Пользовательское соглашение */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="FileText" size={24} />
              Пользовательское соглашение
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-blue-800 font-medium mb-3">
                Психологические аспекты использования сервиса:
              </p>
              <ul className="space-y-2 text-blue-700">
                <li>• <strong>Позитивное мышление:</strong> Сервис работает как инструмент для фокусировки на позитивных целях и мотивации к их достижению</li>
                <li>• <strong>Самовнушение:</strong> Процесс загадывания желания активирует механизмы подсознательной установки на успех</li>
                <li>• <strong>Ритуализация:</strong> Оплата создает психологический "якорь" серьезности намерений и готовности к действиям</li>
                <li>• <strong>Эффект плацебо:</strong> Вера в действенность сервиса может усилить вашу мотивацию и уверенность в себе</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-gray-800 font-medium mb-3">
                Используя данный сервис, вы понимаете и соглашаетесь с тем, что:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Сервис является психологическим инструментом мотивации и самоподдержки</li>
                <li>• Результаты зависят от ваших собственных действий и усилий после использования сервиса</li>
                <li>• Мы не даем гарантий изменения внешних обстоятельств, но помогаем изменить ваш внутренний настрой</li>
                <li>• Эффективность зависит от вашей открытости к позитивным изменениям и готовности действовать</li>
                <li>• Сервис не заменяет профессиональную психологическую помощь при серьезных проблемах</li>
              </ul>
            </div>

            <p className="text-sm text-gray-600 italic">
              Нажимая кнопку оплаты, вы подтверждаете ознакомление с данными условиями и готовность использовать сервис как инструмент психологической поддержки и мотивации.
            </p>
          </CardContent>
        </Card>

        {/* Кнопки навигации */}
        <div className="flex justify-center space-x-4">
          <Button variant="outline" onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            На главную
          </Button>
          <Button onClick={() => navigate('/')}>
            Начать загадывать удачу
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Rules;