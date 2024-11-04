'use client';

import React, { useEffect, useState } from 'react';

interface Props {
  postedDates: Date[];
}

const CalendarController = ({ postedDates }: Props) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const moveToPrevMonth = () => {
    // setCurrentMonth(subMonth)
  };
  const moveToNextMonth = () => {};
  return <div>CalendarController</div>;
};

export default CalendarController;
