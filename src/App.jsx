import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatInterface from './components/ChatInterface';

const App = () => {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (content) => {
    setMessages(prevMessages => [...prevMessages, { role: 'user', content }]);

    const options = {
      method: 'POST',
      url: 'https://chatgpt-42.p.rapidapi.com/conversationllama3',
      headers: {
        'x-rapidapi-key': '51a9934eb8mshcadd70519921505p18ac4fjsnb3da1e3bc021',
        'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: {
        messages: [
          ...messages,
          { role: 'user', content }
        ],
        web_access: false
      }
    };

    try {
      const response = await axios.request(options);
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'assistant', content: response.data.result }
      ]);
    } catch (error) {
      console.error('Error calling API:', error);
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }
      ]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-['Poppins']">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">AI Code Generator</h1>
        <ChatInterface messages={messages} sendMessage={sendMessage} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
