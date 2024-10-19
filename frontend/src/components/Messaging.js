import React, { useState } from 'react';
import axios from 'axios';

function Contact() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    // Add the user message to the chat history
    const userMessage = { sender: 'user', text: message };
    setChatHistory((prev) => [...prev, userMessage]);

    // Clear the input field
    setMessage('');

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo', // You can change the model if needed
        messages: [...chatHistory, { role: 'user', content: message }],
      }, {
        headers: {
          'Authorization': `Bearer YOUR_OPENAI_API_KEY`, // Replace with your OpenAI API key
          'Content-Type': 'application/json',
        },
      });

      const botMessage = { sender: 'bot', text: response.data.choices[0].message.content };
      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching the AI response:", error);
    }
  };

  return (
    <div className="chatbox max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
      <div className="chat-history h-64 overflow-y-auto mb-4 border border-gray-200 p-2 rounded-lg">
        {chatHistory.map((chat, index) => (
          <div key={index} className={`my-2 p-2 rounded ${chat.sender === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'}`}>
            <strong className={chat.sender === 'user' ? 'text-blue-600' : 'text-gray-600'}>
              {chat.sender === 'user' ? 'You' : 'Bot'}:
            </strong> {chat.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          required
          className="flex-1 border border-gray-300 rounded-l-lg p-2"
        />
        <button type="submit" className="bg-blue-500 text-white rounded-r-lg p-2 hover:bg-blue-600 transition duration-200">
          Send
        </button>
      </form>
    </div>
  );
}

export default Contact;
