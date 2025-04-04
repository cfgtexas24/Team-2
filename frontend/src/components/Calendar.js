import React, { useState } from 'react';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const availableDates = [23, 24, 25, 26, 29, 30];
  const availableTimes = ['10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'];

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const today = currentDate.getDate();

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setConfirmationMessage('');
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleConfirmReservation = () => {
    if (selectedDate && selectedTime) {
      const appointmentDetails = {
        target_email: 'holly.simple4092@eagereverest.com', // Replace with the user's email or capture it in the form
        subject: 'Appointment Confirmation',
        text: `Your appointment is confirmed for ${selectedDate} ${currentMonth} ${currentYear} at ${selectedTime}.`
      };

      // Send the POST request to the Flask backend
      fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointmentDetails)
      })
        .then(response => response.json())
        .then(data => {
          if (data.message) {
            setConfirmationMessage('Appointment booked and confirmation email sent!');
          } else {
            setConfirmationMessage('Failed to send confirmation email.');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          setConfirmationMessage('Error sending email.');
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-12 w-full max-w-md sm:max-w-3xl">
        <h2 className="text-2xl sm:text-4xl font-bold mb-4 text-center">Appointment Reservation Page</h2>

        <div className="mb-6">
          <h3 className="text-lg sm:text-xl font-medium">{`Select a Date & Time (${currentMonth} ${currentYear})`}</h3>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-4 sm:gap-6 mt-4">
            {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
              <button
                key={day}
                className={`p-2 sm:p-4 rounded-lg text-center text-lg sm:text-xl ${
                  availableDates.includes(day)
                    ? selectedDate === day
                      ? 'bg-[#A26B61] text-white hover:bg-[#F4E8E7]'
                      : day === today
                      ? 'bg-green-500 text-white'
                      : 'bg-[#F4E8E7] hover:bg-[#A26B61]'
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
            <h3 className="text-lg sm:text-xl font-medium">Available Times for {selectedDate} {currentMonth} {currentYear}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  className={`p-2 sm:p-4 rounded-lg text-center text-lg sm:text-xl ${
                    selectedTime === time
                      ? 'bg-[#A26B61] text-white hover:bg-[#F4E8E7]'
                      : 'bg-[#F4E8E7] hover:bg-[#A26B61]'
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
            <p className="text-center font-medium text-lg sm:text-xl">
              You have selected {selectedDate} {currentMonth} {currentYear} at {selectedTime}.
            </p>
            <button 
              className="mt-4 w-full bg-[#A26B61] text-white py-2 sm:py-3 rounded-lg hover:bg-[#F4E8E7] text-base sm:text-lg"
              onClick={handleConfirmReservation}
            >
              Confirm Reservation
            </button>
          </div>
        )}

        {confirmationMessage && (
          <div className="mt-4 text-center text-green-600 font-semibold text-lg sm:text-xl">
            {confirmationMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
