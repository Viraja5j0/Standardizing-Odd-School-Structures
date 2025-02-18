import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const events = [
  { id: 1, title: 'Math Test - Grade 10', date: '2024-03-15', time: '09:00 AM', type: 'exam' },
  { id: 2, title: 'Science Fair', date: '2024-03-18', time: '02:00 PM', type: 'event' },
  { id: 3, title: 'Parent-Teacher Meeting', date: '2024-03-20', time: '04:30 PM', type: 'meeting' },
];

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  return (
    <div className="flex-1 p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Academic Calendar</h1>
        <p className="text-gray-600">Schedule and manage academic events</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 flex items-center justify-between border-b">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">
                  {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </span>
              </div>
              <div className="flex space-x-2">
                <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-7 gap-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
                {getDaysInMonth(currentMonth).map((day, index) => (
                  <div
                    key={index}
                    className={`text-center py-2 ${
                      day ? 'hover:bg-blue-50 cursor-pointer rounded-lg' : ''
                    }`}
                  >
                    {day && <span className="text-sm">{day}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="border-l-4 border-blue-600 pl-4 py-2">
                <div className="font-medium">{event.title}</div>
                <div className="text-sm text-gray-600">
                  {event.date} at {event.time}
                </div>
                <div className="text-xs text-gray-500 capitalize">{event.type}</div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Add New Event
          </button>
        </div>
      </div>
    </div>
  );
}

export default Calendar;