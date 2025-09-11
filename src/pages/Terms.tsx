import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800 mb-4">
            <Icon name="Shield" className="inline mr-2" size={40} />
            Правила использования
          </h1>
          <p className="text-gray-600">Психологические аспекты и правовая информация</p>
        </div>

        <div className="space-y-6">
          {/* Психологические аспекты */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-purple-700">
                <Icon name="Brain" className="mr-2" />
                Психологические аспекты удачи
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Понимание удачи</h3>
                <p className="text-gray-700">
                  Удача — это субъективное восприятие благоприятных событий. Наш сервис основан на 
                  психологических принципах позитивного мышления и самовнушения, которые могут 
                  способствовать улучшению настроения и мотивации.
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Эффект плацебо</h3>
                <p className="text-gray-700">
                  Вера в удачу может оказывать реальное психологическое воздействие через эффект плацебо, 
                  повышая уверенность в себе и мотивацию к достижению целей.
                </p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">Позитивное мышление</h3>
                <p className="text-gray-700">
                  Ритуалы и символы удачи помогают фокусироваться на позитивных аспектах жизни, 
                  что может улучшить общее психологическое состояние.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Правила использования */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-purple-700">
                <Icon name="FileText" className="mr-2" />
                Правила использования сервиса
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Icon name="Check" className="text-green-500 mt-1" size={16} />
                  <p className="text-gray-700">
                    Сервис предназначен для развлечения и психологической поддержки
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="Check" className="text-green-500 mt-1" size={16} />
                  <p className="text-gray-700">
                    Пользователь должен быть старше 18 лет для совершения покупок
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="Check" className="text-green-500 mt-1" size={16} />
                  <p className="text-gray-700">
                    Использование сервиса не гарантирует реальных изменений в жизни
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="Check" className="text-green-500 mt-1" size={16} />
                  <p className="text-gray-700">
                    Запрещено использование сервиса для принятия важных жизненных решений
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Отказ от ответственности */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-red-700">
                <Icon name="AlertTriangle" className="mr-2" />
                Отказ от ответственности
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                <h3 className="font-semibold text-red-800 mb-2">Важное предупреждение</h3>
                <p className="text-gray-700 mb-3">
                  Данный сервис носит исключительно развлекательный характер и основан на 
                  психологических принципах позитивного мышления.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Мы не гарантируем реальных изменений в вашей жизни</li>
                  <li>• Сервис не заменяет профессиональную психологическую помощь</li>
                  <li>• При серьезных проблемах обращайтесь к специалистам</li>
                  <li>• Результаты зависят от вашего настроя и действий</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Условия возврата */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-purple-700">
                <Icon name="RefreshCw" className="mr-2" />
                Условия возврата средств
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-3">
                  Поскольку сервис предоставляет цифровые услуги психологического характера:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Возврат возможен в течение 14 дней с момента покупки</li>
                  <li>• Возврат осуществляется при отсутствии использования услуги</li>
                  <li>• Для возврата обратитесь в службу поддержки</li>
                  <li>• Возврат не распространяется на уже активированную удачу</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Контактная информация */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-purple-700">
                <Icon name="Mail" className="mr-2" />
                Контактная информация
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-gray-700">
                  По всем вопросам обращайтесь к нам:
                </p>
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={16} className="text-purple-500" />
                  <span className="text-gray-700">support@site-udachi.ru</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={16} className="text-purple-500" />
                  <span className="text-gray-700">+7 (800) 123-45-67</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-purple-500" />
                  <span className="text-gray-700">Поддержка: ПН-ПТ 9:00-18:00 МСК</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
          </p>
        </div>
      </div>
    </div>
  );
}