import React, { useState } from 'react';
import axios from 'axios';

const Interface = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I help you today?' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    // User message
    const userMessage = { sender: 'user', text: input };

    // Temporarily add the user message to UI
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      // Send the message to the backend using Axios
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        'http://localhost:8080/api/chat',
        { message: input },
        {
          headers: {
            accessToken: accessToken,
          },
        }
      );

      
      const botMessage = {
        sender: 'bot',
        text: response.data.response, 
      };

      // Add the bot message to the chat UI
      setMessages((prevMessages) => [...prevMessages, botMessage]);

      // Clear the input field
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        sender: 'bot',
        text: "Sorry, I couldn't process your request. Please try again.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-100">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            <div
              className={`p-4 rounded-xl max-w-3xl w-fit ${
                msg.sender === 'user'
                  ? 'bg-gray-300 text-black'
                  : 'bg-blue-500 text-white'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Bar */}
      <div className="w-full border-t border-gray-300 bg-white p-4">
        <div className="flex max-w-4xl mx-auto items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-5 py-3 rounded-xl hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Interface;
