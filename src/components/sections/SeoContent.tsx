import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const steps = [
  { title: 'Опишите запрос', text: 'Напишите своими словами, в какой сфере жизни вам нужна удача: работа, любовь, здоровье, деньги, поездки или учёба.' },
  { title: 'Выберите условия', text: 'Определите силу удачи и срок действия, затем перейдите к оплате. Стоимость видна заранее, без скрытых платежей.' },
  { title: 'Получите скрижаль', text: 'После оплаты вы сразу получаете персональную скрижаль удачи с вашим запросом и можете скачать её на устройство.' },
];

const faq = [
  { q: 'Что такое Сайт Удачи?', a: 'Это онлайн-сервис, где можно загадать удачу, сформулировать свой запрос и получить персональную скрижаль удачи в виде документа.' },
  { q: 'Как загадать удачу онлайн?', a: 'Опишите свой запрос в поле на главной странице, нажмите OK, выберите условия и оплатите. Скрижаль будет доступна сразу после оплаты.' },
  { q: 'Сколько стоит скрижаль удачи?', a: 'Стоимость зависит от выбранных условий и показывается на странице выбора до оплаты.' },
  { q: 'Как получить скрижаль после оплаты?', a: 'После подтверждения оплаты открывается страница со скрижалью, которую можно скачать и сохранить.' },
  { q: 'Можно ли загадать удачу для другого человека?', a: 'Да, в запросе можно указать, для кого вы просите удачу, например для близкого человека или для команды.' },
  { q: 'Где посмотреть правила сервиса?', a: 'Правила использования доступны по ссылке внизу главной страницы.' },
];

const SeoContent = () => (
  <div className="w-full max-w-2xl space-y-12 py-12 text-gray-800">
    <section className="space-y-3">
      <h2 className="text-2xl font-semibold">О сайте</h2>
      <p>Сайт Удачи помогает загадать удачу онлайн и закрепить своё намерение в виде персональной скрижали. Вы описываете, в чём хотите везения, а сервис оформляет ваш запрос в красивый документ.</p>
      <p>Скрижаль удачи можно сохранить, распечатать или отправить близким. Сервис подходит тем, кто хочет поддержать себя перед важным делом: экзаменом, собеседованием, поездкой, сделкой или началом нового проекта.</p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Как это работает</h2>
      <ol className="space-y-4">
        {steps.map((s, i) => (
          <li key={s.title} className="flex gap-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white font-semibold">{i + 1}</span>
            <div>
              <h3 className="font-semibold">{s.title}</h3>
              <p className="text-gray-600">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>

    <section className="space-y-3">
      <h2 className="text-2xl font-semibold">Частые вопросы</h2>
      <Accordion type="multiple" className="w-full">
        {faq.map((f, i) => (
          <AccordionItem key={f.q} value={`q${i}`}>
            <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
            <AccordionContent className="text-gray-600">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  </div>
);

export default SeoContent;
