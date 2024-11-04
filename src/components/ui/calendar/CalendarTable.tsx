import React, { useMemo } from 'react';

import { CalendarCell } from './CalendarCell';
import { addDays, endOfMonth, endOfWeek, isSameDay, startOfMonth, startOfWeek } from 'date-fns';

interface Props {
  currentMonth: Date;
  postedDates: Date[];
}

interface DateConfig {
  date: Date;
  hasPost: boolean;
}

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const daysKr = ['일', '월', '화', '수', '목', '금', '토'];

const CalendarTable = ({ currentMonth, postedDates }: Props) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);

  const dayStart = startOfWeek(monthStart);
  const dayEnd = endOfWeek(monthEnd);

  const dateConfigs = useMemo(() => {
    const items: DateConfig[] = [];
    for (let i = dayStart; i <= dayEnd; i = addDays(i, 1)) {
      const hasPost = postedDates.some((postedDate) => isSameDay(postedDate, i));
      items.push({ date: i, hasPost });
    }
    return items;
  }, [currentMonth]);

  return (
    <div className=''>
      <ul className='grid grid-cols-7 py-4'>
        {daysKr.map((day) => (
          <li key={day} className='flex w-full justify-center'>
            <span>{day}</span>
          </li>
        ))}
      </ul>
      <div className='grid grid-cols-7 '>
        {dateConfigs.map((dateConfig) => (
          <CalendarCell
            key={dateConfig.date.toISOString()}
            date={dateConfig.date}
            hasPost={dateConfig.hasPost}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarTable;
