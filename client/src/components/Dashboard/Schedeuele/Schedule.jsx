// src/Schedule.jsx
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import default styles
import '../../../App.css'; // Import your custom styles

const Schedule = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="bg-custom-gradient m-4 shadow-lg rounded-lg border border-gray-200 p-6 flex flex-col items-center dark:border-gray-700">
      <h2 className="text-2xl font-semibold mb-4">Calender</h2>
      <Calendar
        onChange={handleDateChange}
        value={date}
        className="w-full opacity-50 rounded-lg"
      />
      <div className="mt-4">
        <p className="text-lg">Selected Date: {date.toDateString()}</p>
      </div>
    </div>
  );
};

export default Schedule;

