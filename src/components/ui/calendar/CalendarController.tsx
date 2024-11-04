'use client';

import React, { useState } from 'react';

import CalendarHeader from './CalendarHeader';
import CalendarTable from './CalendarTable';
import { addMonths, isSameMonth, subMonths } from 'date-fns';

interface Props {
  postedDates: Date[];
}

const CalendarController = ({ postedDates }: Props) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const moveToPrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const moveToNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const currentMonthPostedDates = postedDates.filter((date) => {
    return isSameMonth(date, currentMonth);
  });

  const headerProps = {
    currentMonth,
    moveToPrevMonth,
    moveToNextMonth,
  };

  const tableProps = {
    currentMonth,
    postedDates: currentMonthPostedDates,
  };

  return (
    <div>
      <CalendarHeader {...headerProps} />
      <CalendarTable {...tableProps} />
    </div>
  );
};

export default CalendarController;
