import React from 'react';

import { format, isWeekend } from 'date-fns';
import { ko } from 'date-fns/locale';

interface Props {
  date: Date;
  hasPost: boolean;
}

export const CalendarCell = ({ date, hasPost }: Props) => {
  const dateNumber = format(date, 'dd', { locale: ko });

  return (
    <div
      className={`h-40 border-[1px]  border-neutral-400 p-2 ${hasPost ? 'bg-slate-200 dark:bg-slate-700' : ''}`}
    >
      <span className={`${isWeekend(date) ? 'text-gray-500' : 'text-black dark:text-white'}`}>
        {dateNumber}
      </span>
    </div>
  );
};
