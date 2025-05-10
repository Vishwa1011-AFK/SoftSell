"use client"

import { useState, useEffect, useRef } from "react"
import { FiMessageSquare, FiX, FiSend } from "react-icons/fi"
import { motion, AnimatePresence } from "framer-motion"

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi there! How can I help you with SoftSell today?" },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const predefinedQuestions = [
    "How do I sell my license?",
    "What types of licenses do you buy?",
    "Is the process secure?",
    "How long does payment take?",
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const toggleChat = () => setIsOpen(!isOpen)

  const handleInputChange = (e) => setInputValue(e.target.value)

  const prepareApiMessages = (currentMessages, newUserText) => {
    const apiMessages = currentMessages.map((msg) => ({
      role: msg.sender === "ai" ? "assistant" : "user",
      content: msg.text,
    }))
    apiMessages.push({ role: "user", content: newUserText })
    return apiMessages
  }

  const handleSend = async (textToSend) => {
    const messageText = typeof textToSend === 'string' && textToSend.trim() !== "" ? textToSend : inputValue.trim();
    
    if (messageText === '') return;

    const newUserMessage = { sender: 'user', text: messageText };
    const recentMessagesForApi = messages.slice(-6); 
    
    setMessages(prev => [...prev, newUserMessage]);
    if (typeof textToSend !== 'string') {
        setInputValue('');
    }
    setIsLoading(true);

    const systemPrompt = {
      role: "system",
      content:
        "You are a friendly and concise assistant for SoftSell, a company that helps businesses sell their unused software licenses. SoftSell's process is: 1. Upload License Details, 2. Get a Fair Valuation, 3. Get Paid Quickly. Benefits: fast, secure, expert valuation. We buy licenses like Microsoft, Adobe, Autodesk. If a question is outside this scope, politely state you focus on SoftSell related queries or cannot provide that specific information.",
    };

    const apiMessages = [
      systemPrompt,
      ...recentMessagesForApi.map((msg) => ({
        role: msg.sender === "ai" ? "assistant" : "user",
        content: msg.text,
      })),
      { role: "user", content: messageText },
    ];

    try {
      console.log("Attempting to call Groq API..."); 
      console.log("API Key available:", !!import.meta.env.VITE_GROQ_API_KEY); 

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: apiMessages,
          model: "llama3-8b-8192", 
          temperature: 0.7,
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: { message: response.statusText } })); 
        console.error("Groq API Error Response:", errorData);
        throw new Error(`API Error: ${response.status} ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      console.log("Groq API Success Response:", data); 

      const aiResponseText = data.choices[0]?.message?.content.trim() || "Sorry, I couldn't get a valid response. Please try again.";
      
      const newAiMessage = { sender: 'ai', text: aiResponseText };
      setMessages(prev => [...prev, newAiMessage]);

    } catch (error) {
      console.error("Failed to send message to Groq or process response:", error);
      const errorAiMessage = { sender: 'ai', text: `Sorry, I encountered an error. ${error.message ? error.message : 'Please try again later.'}` };
      setMessages(prev => [...prev, errorAiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePredefinedQuestion = (question) => {
    handleSend(question)
  }

  const chatVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: { duration: 0.2 },
    },
  }

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen ? (
          <motion.button
            key="chat-button"
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            onClick={toggleChat}
            className="fixed bottom-6 right-6 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-lg z-50 transition-colors"
            aria-label="Open chat"
          >
            <FiMessageSquare size={24} />
          </motion.button>
        ) : (
          <motion.div
            key="chat-window"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={chatVariants}
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 bg-white dark:bg-gray-800 w-full h-[80vh] sm:w-96 sm:h-[600px] shadow-2xl rounded-t-lg sm:rounded-lg flex flex-col z-50 overflow-hidden"
          >
            <div className="bg-emerald-600 dark:bg-emerald-700 text-white p-4 flex justify-between items-center">
              <h3 className="font-semibold text-lg">SoftSell Assistant</h3>
              <button
                onClick={toggleChat}
                className="hover:bg-emerald-700 dark:hover:bg-emerald-800 p-1 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-xl shadow ${
                      msg.sender === "user"
                        ? "bg-emerald-500 text-white ml-auto"
                        : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 mr-auto"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[80%] p-3 rounded-xl shadow bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 mr-auto">
                    <div className="flex space-x-2">
                      <div
                        className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
              <div className="flex flex-wrap gap-2 justify-center">
                {predefinedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handlePredefinedQuestion(q)}
                    className="bg-emerald-100 dark:bg-emerald-900 hover:bg-emerald-200 dark:hover:bg-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs px-3 py-1.5 rounded-full transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend()
                }}
                className="flex items-center space-x-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Type your message..."
                  className="flex-grow p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  disabled={isLoading}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isLoading || inputValue.trim() === ""}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-md disabled:opacity-50 transition-colors"
                  aria-label="Send message"
                >
                  <FiSend size={20} />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatWidget
