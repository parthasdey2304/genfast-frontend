import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ChatInterface = ({ messages, sendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const [loadingMessage, setLoadingMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      setLoadingMessage(true); // Start loading
      await sendMessage(input); // Wait for the message to be sent
      setInput(''); // Clear input after sending
      setLoadingMessage(false); // Stop loading after sending
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <div className="flex-grow overflow-auto mb-4 p-4 bg-gray-100 rounded-lg">
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-2 rounded-lg max-w-[90%] md:max-w-[66%] ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <div className="relative">
                        <button
                          onClick={() => copyToClipboard(String(children))}
                          className="absolute top-2 right-2 bg-gray-700 text-white px-2 py-1 rounded text-xs"
                        >
                          Copy
                        </button>
                        <SyntaxHighlighter
                          style={tomorrow}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  }
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {(isLoading || loadingMessage) && (
          <div className="text-left mb-4">
            <div className="inline-block p-3 rounded-lg bg-gray-300">
              <div className="flex items-center space-x-2">
                <div className="animate-pulse flex space-x-1">
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                </div>
                <span className="text-sm text-gray-600">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow mr-2 p-2 border rounded"
          placeholder="Type your message..."
          disabled={isLoading || loadingMessage} // Disable input during loading
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded" disabled={isLoading || loadingMessage}>
          {isLoading || loadingMessage ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;