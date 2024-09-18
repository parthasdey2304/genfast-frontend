import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatInterface from './components/ChatInterface';
import HistorySidebar from './components/HistorySidebar';

const App = () => {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (content) => {
    setMessages(prevMessages => [...prevMessages, { role: 'user', content }]);

    const url = "https://chatgpt-best-price.p.rapidapi.com/v1/chat/completions";
    const payload = {
      model: "gpt-3.5-turbo",
      messages: [
        ...messages,
        { role: "user", content }
      ]
    };
    const headers = {
      "content-type": "application/json",
      "X-RapidAPI-Key": "c6150aa0fbmshc0a1461851bd7ecp100c48jsnac068272b7e6",
      "X-RapidAPI-Host": "chatgpt-best-price.p.rapidapi.com"
    };

    try {
      const response = await axios.post(url, payload, { headers });
      const assistantResponse = response.data.choices[0].message.content;
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'assistant', content: assistantResponse }
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
      <HistorySidebar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">AI Code Generator</h1>
        <ChatInterface messages={messages} sendMessage={sendMessage} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
