import React from 'react';

import CalendarController from './CalendarController';
import { getPostedDates } from '@/lib/post';

const Calendar = async () => {
  const postedDates = await getPostedDates();

  return (
    <div className='w-full'>
      <CalendarController postedDates={postedDates} />
    </div>
  );
};

export default Calendar;
