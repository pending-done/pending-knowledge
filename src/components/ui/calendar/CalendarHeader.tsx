import React from 'react';

import { Button } from '../button';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface Props {
  currentMonth: Date;
  moveToPrevMonth: () => void;
  moveToNextMonth: () => void;
}

const CalendarHeader = ({ currentMonth, moveToPrevMonth, moveToNextMonth }: Props) => {
  const dateString = format(currentMonth, 'yyyy년 MM월', { locale: ko });
  return (
    <div className='flex justify-between py-4'>
      <button onClick={moveToPrevMonth}>이전</button>
      <p>{dateString}</p>
      <button onClick={moveToNextMonth}>다음</button>
    </div>
  );
};

export default CalendarHeader;
