import React, { useState } from 'react';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [confirmationMessage, setConfirmationMessage] = useState('');

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
    setConfirmationMessage(''); // Clear confirmation message on new selection
  };

  // Handler for time selection
  const handleTimeSelect = (time) => {
    setSelectedTime(time); // Set the selected time
  };

  // Handler for confirming the reservation
  const handleConfirmReservation = () => {
    if (selectedDate && selectedTime) {
      setConfirmationMessage('Appointment booked!'); // Set the confirmation message
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-12 w-full max-w-3xl"> {/* Increased max width and padding */}
        <h2 className="text-4xl font-bold mb-4 text-center">Appointment Reservation Page</h2> {/* Increased font size */}

        <div className="mb-6">
          <h3 className="text-xl font-medium">{`Select a Date & Time (${currentMonth} ${currentYear})`}</h3>
          <div className="grid grid-cols-7 gap-6 mt-4"> {/* Increased gap for buttons */}
            {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
              <button
                key={day}
                className={`p-4 rounded-lg text-center text-xl ${ // Increased padding and text size
                  availableDates.includes(day)
                    ? selectedDate === day
                      ? 'bg-[#A26B61] text-white hover:bg-[#F4E8E7]' // Updated hover color for selected date
                      : day === today
                      ? 'bg-green-500 text-white' // Highlight the current day
                      : 'bg-[#F4E8E7] hover:bg-[#A26B61]' // Updated hover color for available dates
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
            <h3 className="text-xl font-medium">Available Times for {selectedDate} {currentMonth} {currentYear}</h3>
            <div className="grid grid-cols-2 gap-6 mt-4"> {/* Increased gap for buttons */}
              {availableTimes.map((time) => (
                <button
                  key={time}
                  className={`p-4 rounded-lg text-center text-xl ${ // Increased padding and text size
                    selectedTime === time
                      ? 'bg-[#A26B61] text-white hover:bg-[#F4E8E7]' // Updated hover color for selected time
                      : 'bg-[#F4E8E7] hover:bg-[#A26B61]' // Updated hover color for available times
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
            <p className="text-center font-medium text-xl">
              You have selected {selectedDate} {currentMonth} {currentYear} at {selectedTime}.
            </p>
            <button 
              className="mt-4 w-full bg-[#A26B61] text-white py-3 rounded-lg hover:bg-[#F4E8E7] text-lg" // Increased button padding and text size
              onClick={handleConfirmReservation}
            >
              Confirm Reservation
            </button>
          </div>
        )}

        {confirmationMessage && (
          <div className="mt-4 text-center text-green-600 font-semibold text-xl">
            {confirmationMessage} {/* Display the confirmation message */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
