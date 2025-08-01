import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
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
              <li>• Стоимость активации удачи составляет 250р, 500р, 1000р, 1500  рублей</li>
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
              <p className="text-yellow-800 font-medium">
                Важное уведомление:
              </p>
              <p className="text-yellow-700 mt-2">"Сайт удачи" является психологическим триггером вашей мотивации . Мы не можем гарантировать материальные результаты или изменения в вашей жизни. Эффект от использования сервиса может быть индивидуальным и зависит от многих факторов.</p>
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

        <Separator />

        {/* Контакты */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Mail" size={24} />
              Контактная информация
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              По всем вопросам обращайтесь к нам: <br />
              Email: unix7777@ya.ru <br />
              Время работы: круглосуточно, 7 дней в неделю
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