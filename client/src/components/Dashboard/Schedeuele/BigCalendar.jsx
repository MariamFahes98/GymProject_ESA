// src/BigCalendar.jsx
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse } from 'date-fns';
import '../../../App.css'; // Import your custom styles

const localizer = momentLocalizer({ format, parse });

const events = [
  {
    title: 'Meeting with Team',
    start: new Date(),
    end: new Date(),
  },
  // Add more events as needed
];

const BigCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-semibold mb-4">Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onNavigate={(date) => setCurrentDate(date)}
      />
    </div>
  );
};

export default BigCalendar;
