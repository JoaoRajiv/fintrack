'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { ptBR } from 'date-fns/locale';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { forwardRef } from 'react';

export const DatePicker = forwardRef(
  ({ value, onChange, placeholder = 'Selecione uma data' }, ref) => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            ref={ref}
            className="w-full items-center justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
          >
            <CalendarIcon className="h-4 w-4" />
            {value ? (
              format(value, 'PPP', { locale: ptBR })
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            initialFocus
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    );
  }
);

DatePicker.displayName = 'DatePicker';
