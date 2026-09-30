import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface RulesSectionProps {
  rulesRef: React.RefObject<HTMLDivElement>;
}

const RulesSection = ({ rulesRef }: RulesSectionProps) => {
  return (
    <section ref={rulesRef} className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Правила использования
          </h1>
          <p className="text-lg text-gray-600">
            Сайт удачи - условия и положения
          </p>
        </div>

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
                  <strong>Ограничения ответственности:</strong> Администрация не несет ответственности за материальные результаты, изменения в личной жизни или внешних обстоятельствах пользователя.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="FileText" size={24} />
              Пользовательское соглашение
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">1. Общие положения</h4>
              <p className="text-gray-700">
                Настоящее Пользовательское соглашение (далее — «Соглашение») регулирует отношения между владельцем сайта «Сайт удачи» (далее — «Администрация») и пользователем сайта (далее — «Пользователь»). Начиная использовать сайт, Пользователь подтверждает, что ознакомился с условиями Соглашения и принимает их в полном объеме.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">2. Предмет соглашения</h4>
              <p className="text-gray-700">
                Администрация предоставляет Пользователю доступ к сервису психологической поддержки в форме ритуала загадывания желаний. Сервис носит информационно-развлекательный характер и не является предоставлением услуг гадания, экстрасенсорики или иных мистических практик в юридическом смысле.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">3. Права и обязанности сторон</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Администрация обязуется предоставить доступ к сервису после успешной оплаты</li>
                <li>Пользователь обязуется предоставлять достоверную информацию при заполнении форм</li>
                <li>Администрация вправе изменять условия работы сервиса, уведомив об этом на сайте</li>
                <li>Пользователь вправе отказаться от использования сервиса в любой момент</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">4. Стоимость и порядок оплаты</h4>
              <p className="text-gray-700">
                Стоимость услуги определяется выбранным тарифом и указывается на сайте перед оплатой. Оплата производится через подключенные платежные системы. Услуга считается оказанной в момент предоставления доступа к результату (скрижали удачи).
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">5. Ответственность сторон</h4>
              <p className="text-gray-700">
                Администрация не несет ответственности за субъективные ожидания Пользователя относительно результатов использования сервиса. Сервис не заменяет профессиональную медицинскую, психологическую, юридическую или финансовую консультацию.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">6. Разрешение споров</h4>
              <p className="text-gray-700">
                Все споры и разногласия решаются путем переговоров. При невозможности достижения согласия спор передается на рассмотрение в порядке, установленном действующим законодательством Российской Федерации.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">7. Заключительные положения</h4>
              <p className="text-gray-700">
                Администрация вправе вносить изменения в Соглашение в одностороннем порядке. Актуальная редакция всегда доступна на данной странице. Продолжение использования сайта после внесения изменений означает согласие Пользователя с новой редакцией.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Политика конфиденциальности */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Lock" size={24} />
              Политика конфиденциальности
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Настоящая Политика конфиденциальности разработана в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных Пользователей сайта «Сайт удачи».
            </p>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">1. Какие данные собираются</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Текст пожелания, введенный Пользователем</li>
                <li>Имя (при добровольном указании в форме оплаты)</li>
                <li>Технические данные: IP-адрес, файлы cookie, данные о браузере (для аналитики через Яндекс.Метрику)</li>
                <li>Платежные данные обрабатываются исключительно платежной системой и Администрации не передаются</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">2. Цели обработки данных</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Предоставление доступа к сервису и выполнение заказа</li>
                <li>Связь с Пользователем по вопросам оказания услуги</li>
                <li>Улучшение качества работы сайта и анализ посещаемости</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">3. Правовые основания обработки</h4>
              <p className="text-gray-700">
                Обработка персональных данных осуществляется на основании согласия Пользователя, которое выражается путем совершения им действий по использованию сайта (акцепт оферты).
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">4. Порядок хранения и защиты данных</h4>
              <p className="text-gray-700">
                Персональные данные хранятся в защищенном виде и используются исключительно для целей, указанных в настоящей Политике. Администрация принимает необходимые организационные и технические меры для защиты данных от несанкционированного доступа, изменения, раскрытия или уничтожения.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">5. Передача данных третьим лицам</h4>
              <p className="text-gray-700">
                Администрация не передает персональные данные Пользователей третьим лицам, за исключением случаев, предусмотренных законодательством РФ, а также передачи платежных данных операторам платежных систем для проведения расчетов.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">6. Права Пользователя</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Получать информацию, касающуюся обработки его персональных данных</li>
                <li>Требовать уточнения, блокирования или уничтожения своих данных</li>
                <li>Отозвать согласие на обработку персональных данных</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">7. Файлы cookie</h4>
              <p className="text-gray-700">
                Сайт использует файлы cookie и сервисы аналитики (Яндекс.Метрика) для улучшения работы сервиса. Продолжая использовать сайт, Пользователь соглашается с использованием файлов cookie. При желании файлы cookie можно отключить в настройках браузера.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">8. Изменение политики конфиденциальности</h4>
              <p className="text-gray-700">
                Администрация вправе вносить изменения в настоящую Политику. Новая редакция вступает в силу с момента публикации на сайте.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Mail" size={24} />
              Контакты поддержки
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              По всем вопросам, связанным с работой сервиса, оплатой или обработкой персональных данных, обращайтесь по адресу электронной почты:{' '}
              <a href="mailto:Unix7777@ya.ru" className="text-purple-600 font-medium hover:underline">
                Unix7777@ya.ru
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RulesSection;