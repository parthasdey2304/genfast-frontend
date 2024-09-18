import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const HistorySidebar = ({ onChatSelect, onNewChat }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [chatHistory, setChatHistory] = useState([])
  const [selectedChat, setSelectedChat] = useState(null)

  useEffect(() => {
    // Fetch chat history from API
    const fetchChatHistory = async () => {
      try {
        const response = await fetch('/api/chat-history')
        const data = await response.json()
        setChatHistory(data)
      } catch (error) {
        console.error('Error fetching chat history:', error)
      }
    }

    fetchChatHistory()
  }, [])

  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId)
    onChatSelect(chatId)
  }

  const handleNewChat = () => {
    setSelectedChat(null)
    onNewChat()
  }

  return (
    <motion.div
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
      initial={false}
      animate={{ width: isOpen ? 256 : 64 }}
    >
      <button
        className="absolute top-4 right-4 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
      </button>
      <div className="p-4 mt-12">
        {isOpen && (
          <>
            <button
              className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              onClick={handleNewChat}
            >
              New Chat
            </button>
            <div className="mt-4 space-y-2">
              {chatHistory.map((chat) => (
                <button
                  key={chat.id}
                  className={`w-full py-2 px-4 text-left rounded transition-colors ${
                    selectedChat === chat.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  onClick={() => handleChatSelect(chat.id)}
                >
                  {chat.title}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}

export default HistorySidebar
