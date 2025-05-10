import { useState, useEffect, useRef } from 'react';
import { FiMessageSquare, FiX, FiSend } from 'react-icons/fi'; 

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hi there! How can I help you with SoftSell today?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const predefinedQuestions = [
    "How do I sell my license?",
    "What types of licenses do you buy?",
    "Is the process secure?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleInputChange = (e) => setInputValue(e.target.value);

  const prepareApiMessages = (currentMessages, newUserText) => {
    const apiMessages = currentMessages.map(msg => ({
      role: msg.sender === 'ai' ? 'assistant' : 'user',
      content: msg.text
    }));
    apiMessages.push({ role: 'user', content: newUserText });
    return apiMessages;
  };

  const handleSend = async (textToSend) => { 
    const messageText = (typeof textToSend === 'string' && textToSend.trim() !== '') ? textToSend : inputValue.trim();
    
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
      content: "You are a friendly and concise assistant for SoftSell, a company that helps businesses sell their unused software licenses. SoftSell's process is: 1. Upload License Details, 2. Get a Fair Valuation, 3. Get Paid Quickly. Benefits: fast, secure, expert valuation. We buy licenses like Microsoft, Adobe, Autodesk. If a question is outside this scope, politely state you focus on SoftSell related queries or cannot provide that specific information."
    };

    const apiMessages = [
      systemPrompt,
      ...recentMessagesForApi.map(msg => ({
        role: msg.sender === 'ai' ? 'assistant' : 'user',
        content: msg.text
      })),
      { role: 'user', content: messageText }
    ];
    
    try {
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
        const errorData = await response.json();
        console.error("Groq API Error:", errorData);
        throw new Error(`API Error: ${response.status} ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      const aiResponseText = data.choices[0]?.message?.content.trim() || "Sorry, I couldn't get a response. Please try again.";
      
      const newAiMessage = { sender: 'ai', text: aiResponseText };
      setMessages(prev => [...prev, newAiMessage]);

    } catch (error) {
      console.error("Failed to send message to Groq:", error);
      const errorAiMessage = { sender: 'ai', text: `Sorry, I encountered an error. ${error.message}` };
      setMessages(prev => [...prev, errorAiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePredefinedQuestion = (question) => {
    handleSend(question);
  };


  if (!isOpen) {
    return (
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-50 transition-transform hover:scale-110"
        aria-label="Open chat"
      >
        <FiMessageSquare size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 bg-white w-full h-full sm:w-96 sm:h-[600px] shadow-2xl rounded-t-lg sm:rounded-lg flex flex-col z-50 overflow-hidden">

      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h3 className="font-semibold text-lg">SoftSell Assistant</h3>
        <button onClick={toggleChat} aria-label="Close chat">
          <FiX size={24} />
        </button>
      </div>

      <div className="flex-grow p-4 space-y-3 overflow-y-auto bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] p-3 rounded-xl shadow ${ 
                msg.sender === 'user' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-200 text-gray-800 mr-auto' 
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 rounded-xl shadow bg-gray-200 text-gray-800 mr-auto">
              <span className="animate-pulse">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t border-gray-200 bg-gray-100"> 
        <div className="flex flex-wrap gap-2 justify-center">
          {predefinedQuestions.map(q => (
            <button
              key={q}
              onClick={() => handlePredefinedQuestion(q)}
              className="bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs px-3 py-1.5 rounded-full transition-colors" 
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 bg-white">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center space-x-2"> 
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-grow p-2.5 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
            disabled={isLoading}
          />
          <button
            type="submit" 
            disabled={isLoading || inputValue.trim() === ''} 
            className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-md disabled:opacity-50 transition-colors"
            aria-label="Send message"
          >
            <FiSend size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWidget;