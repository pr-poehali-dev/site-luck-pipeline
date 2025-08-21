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
              <Icon name="Mail" size={24} />
              Контактная информация
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">ИП Паклин Сергей Васильевич, ИНН 594200005879 ОГРН 305591619400016,  эл.почта  Unix7777@ya.ru</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RulesSection;