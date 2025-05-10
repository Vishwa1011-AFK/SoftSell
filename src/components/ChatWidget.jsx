import { useState, useEffect, useRef } from 'react';
import { FiMessageSquare, FiX, FiSend, FiPaperclip } from 'react-icons/fi';  

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

  const handleSend = async () => {
    if (inputValue.trim() === '') return;

    const newUserMessage = { sender: 'user', text: inputValue };
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);

    setTimeout(() => {
      let aiResponseText = "I'm processing your request...";
      if (inputValue.toLowerCase().includes("sell license")) {
        aiResponseText = "To sell your license, you first upload the details, then we provide a valuation, and finally, you get paid! It's that easy.";
      } else if (inputValue.toLowerCase().includes("types of licenses")) {
        aiResponseText = "We buy various licenses including Microsoft, Adobe, Autodesk, VMware, and more. Feel free to ask about a specific one!";
      } else if (inputValue.toLowerCase().includes("secure")) {
        aiResponseText = "Yes, our process is highly secure. We prioritize your data security and confidentiality.";
      } else {
        aiResponseText = "Thanks for your message! An agent will be with you shortly, or I can try to answer general questions about SoftSell.";
      }
      
      const newAiMessage = { sender: 'ai', text: aiResponseText };
      setMessages(prev => [...prev, newAiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handlePredefinedQuestion = (question) => {
    setInputValue(question); 
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
              className={`max-w-[70%] p-3 rounded-xl ${
                msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[70%] p-3 rounded-xl bg-gray-200 text-gray-800">
              <span className="animate-pulse">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-2 border-t border-gray-200 bg-gray-100">
        <p className="text-xs text-gray-500 mb-1 text-center">Or ask about:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {predefinedQuestions.map(q => (
            <button
              key={q}
              onClick={() => handlePredefinedQuestion(q)}
              className="bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs px-2 py-1 rounded-md"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
            placeholder="Type your message..."
            className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-md disabled:opacity-50"
            aria-label="Send message"
          >
            <FiSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;