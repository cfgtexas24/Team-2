import React, { useState, useEffect } from 'react';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Array of available dates for demonstration purposes
  const availableDates = [23, 24, 25, 26, 29, 30];
  const availableTimes = ['10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'];

  // Get the current year, month, and day
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const today = currentDate.getDate();

  // Handler for date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date); // Set the selected date
    setSelectedTime(null); // Reset time selection on new date select
  };

  // Handler for time selection
  const handleTimeSelect = (time) => {
    setSelectedTime(time); // Set the selected time
  };

  
  return (
    // Returns a JSX structure for a calendar reservation interface that allows users to:
    // 1. Select an available date from a grid of buttons.
    // 2. View and select available times for the selected date.
    // 3. Display a confirmation message with the selected date and time.
    // 4. Include a button to confirm the reservation.
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Appointment Reservation Page</h2>

        <div className="mb-6">
          <h3 className="text-lg font-medium">{`Select a Date & Time (${currentMonth} ${currentYear})`}</h3>
          <div className="grid grid-cols-7 gap-4 mt-4">
            {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
              <button
                key={day}
                className={`p-2 rounded-lg text-center ${
                  availableDates.includes(day)
                    ? selectedDate === day
                      ? 'bg-blue-500 text-white'
                      : day === today
                      ? 'bg-green-500 text-white' // Highlight the current day
                      : 'bg-gray-200 hover:bg-blue-200'
                    : 'bg-gray-100 text-gray-400'
                }`}
                onClick={() => availableDates.includes(day) && handleDateSelect(day)}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {selectedDate && (
          <div className="mb-6">
            <h3 className="text-lg font-medium">Available Times for {selectedDate} {currentMonth} {currentYear}</h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  className={`p-2 rounded-lg text-center ${
                    selectedTime === time
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 hover:bg-blue-200'
                  }`}
                  onClick={() => handleTimeSelect(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedDate && selectedTime && (
          <div className="mt-6">
            <p className="text-center font-medium">
              You have selected {selectedDate} {currentMonth} {currentYear} at {selectedTime}.
            </p>
            <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              Confirm Reservation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
