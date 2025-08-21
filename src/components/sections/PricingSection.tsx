import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface PricingSectionProps {
  pricingRef: React.RefObject<HTMLDivElement>;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  pricingOptions: Array<{
    duration: string;
    price: number;
    immediate: boolean;
    type: string;
  }>;
  onPricingSelect: (price: number, duration: string, immediate: boolean, type: string) => void;
}

const PricingSection = ({
  pricingRef,
  selectedDate,
  setSelectedDate,
  pricingOptions,
  onPricingSelect
}: PricingSectionProps) => {
  return (
    <section ref={pricingRef} className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <Card className="shadow-lg">
          <CardContent className="pt-6">
            <div className="mb-6">
              <label className="block font-medium text-gray-700 mb-2 text-2xl">
                Дата активации (для утро/день/вечер/ночь):
              </label>
              <Input
                type="text"
                placeholder="ДД.ММ.ГГГГ (например: 15.12.2024)"
                value={selectedDate}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, '');
                  
                  if (value.length >= 2) {
                    value = value.slice(0, 2) + '.' + value.slice(2);
                  }
                  if (value.length >= 5) {
                    value = value.slice(0, 5) + '.' + value.slice(5, 9);
                  }
                  
                  setSelectedDate(value);
                }}
                className="text-center text-lg"
              />
            </div>
            
            <div className="grid gap-3">
              {pricingOptions.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => onPricingSelect(option.price, option.duration, option.immediate, option.type)}
                  className="w-full flex justify-between items-center p-4 h-auto hover:bg-purple-50 border-2 hover:border-purple-300"
                >
                  <div className="flex flex-col items-start space-y-1">
                    <span className="text-2xl font-bold">{option.duration}</span>
                    {option.immediate ? (
                      <span className="text-lg text-green-600 font-medium">Действует сразу после оплаты</span>
                    ) : (
                      <span className="text-lg text-blue-600 font-medium">Укажите дату активации</span>
                    )}
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PricingSection;