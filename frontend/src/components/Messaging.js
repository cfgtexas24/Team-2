import React, { useState } from 'react';
import axios from 'axios';

function Contact() {
  // State to store the user message
  const [message, setMessage] = useState('');
  // State to store the chat history
  const [chatHistory, setChatHistory] = useState([]);

  // Function to handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();

    // Add the user message to the chat history
    const userMessage = { sender: 'user', text: message };
    setChatHistory((prev) => [...prev, userMessage]);

    // Clear the input field
    setMessage('');

    try {
      // Make a request to your backend to send the message to OpenAI
      const response = await axios.post('http://localhost:5000/chat', {
        message,  // Send current message
      });

      // Add the bot response to the chat history
      const botMessage = { sender: 'bot', text: response.data.reply };
      setChatHistory((prev) => [...prev, botMessage]); // Append the bot message to the chat history
    } catch (error) {
      console.error("Error fetching the AI response:", error); // Logs an error if there are any
    }
  };

  /* This React component implements a messaging interface that allows users to send and receive messages.
  Key Features:
  - Users can type their messages into an input field and send them by clicking the "Send" button.
  - Messages sent by the user and responses from a bot are displayed in a scrollable chat area, with distinct styles to differentiate between the two.
  - User messages appear on the right with a darker background and white text.
  - Bot messages appear on the left with a lighter background and darker text.
  - The component is designed to be centered on the screen and adjusts its layout based on screen size, ensuring usability on various devices.
  - When a message is sent, an asynchronous request is made to a backend service (not shown in this snippet) to process the message, enabling real-time interactions. */
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="w-3/5 h-4/5 flex flex-col bg-white border border-gray-300 rounded-lg shadow-lg">
        
        {/* Title Section */}
        <h1 className="text-center text-2xl font-bold mb-4 text-[#A26B61]">Messaging</h1>

        <div className="chatbox flex-1 overflow-y-auto p-4" style={{ backgroundColor: '#F2EBE3' }}>
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`my-2 p-3 max-w-[80%] rounded-lg ${chat.sender === 'user' ? 'self-end' : 'self-start'}`}
              style={{
                backgroundColor: chat.sender === 'user' ? '#C58973' : '#D3E2E4',
                color: chat.sender === 'user' ? '#FFFFFF' : '#000000',
                alignSelf: chat.sender === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              {chat.text}
            </div>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-300 flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            required
            className="flex-1 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="ml-3 bg-[#A26B61] text-white rounded-md p-3 hover:bg-[#8c564c] transition duration-200"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
