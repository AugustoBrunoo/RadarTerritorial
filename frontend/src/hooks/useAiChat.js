import { useState, useRef, useEffect } from 'react';

export function useAiChat(initialMessages = []) {
  const [messages, setMessages] = useState(initialMessages);
  const [chatStep, setChatStep] = useState('START');
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputType, setInputType] = useState('text'); // 'text' or 'password'

  const chatViewportRef = useRef(null);

  const addMessage = (sender, content, extraData = null) => {
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, {
      id: Date.now() + Math.random(),
      sender,
      text: content,
      extraData,
      timestamp: timeString
    }]);
  };

  const scrollToBottom = () => {
    if (chatViewportRef.current) {
      chatViewportRef.current.scrollTo({
        top: chatViewportRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  // Whenever messages or typing state change, scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const togglePasswordVisibility = () => {
    setInputType(prev => prev === 'password' ? 'text' : 'password');
  };

  return {
    messages,
    setMessages,
    addMessage,
    chatStep,
    setChatStep,
    isTyping,
    setIsTyping,
    inputValue,
    setInputValue,
    inputType,
    setInputType,
    togglePasswordVisibility,
    chatViewportRef,
    scrollToBottom
  };
}
