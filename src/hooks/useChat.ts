import { useState, useCallback } from 'react';
import { Message } from '../types';
import { generateBotResponse } from '../utils/chatBot';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (text: string, language: 'en' | 'ar') => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text,
      isUser: true,
      timestamp: new Date(),
      language
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Get current conversation history for context
      const currentMessages = [...messages, userMessage];
      
      // Generate intelligent bot response
      const botResponseText = await generateBotResponse(text, language, currentMessages);
      
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: botResponseText,
        isUser: false,
        timestamp: new Date(),
        language
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Error fallback message
      const errorMessage: Message = {
        id: `bot-error-${Date.now()}`,
        text: language === 'ar' 
          ? 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى. 🔧'
          : 'Sorry, an error occurred. Please try again. 🔧',
        isUser: false,
        timestamp: new Date(),
        language
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const clearChat = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearChat
  };
};
