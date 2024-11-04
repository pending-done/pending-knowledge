import React from 'react';

import { getDateList } from '@/lib/post';

const Calendar = async () => {
  const dateList = await getDateList();

  return <div>Calendar</div>;
};

export default Calendar;
