import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage from './ChatMessage';
import LoadingIndicator from './LoadingIndicator';
import { Message } from '../types';

interface ChatAreaProps {
  messages: Message[];
  isLoading: boolean;
  theme: 'light' | 'dark';
  language: 'en' | 'ar';
}

const ChatArea: React.FC<ChatAreaProps> = ({ messages, isLoading, theme, language }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-hidden">
      <div className="chat-scrollable h-full px-3 py-2 space-y-3" style={{ touchAction: 'pan-y' }}>
        <div className="max-w-full mx-auto">
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 px-4"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-slate-700 to-slate-800 text-cyan-400'
                    : 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600'
                }`}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-2xl"
                >
                  ❄️
                </motion.div>
              </motion.div>
              
              <h2 className={`text-lg font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-slate-800'
              }`}>
                {language === 'ar' ? 'مرحباً بك في فريزر الذكي' : 'Welcome to FREZEER AI'}
              </h2>
              
              <p className={`text-sm mb-3 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
                {language === 'ar' 
                  ? 'مساعدك الذكي المتقدم جاهز لمساعدتك!' 
                  : 'Your advanced AI assistant is ready to help!'}
              </p>

              <div className={`text-xs ${
                theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
              }`}>
                {language === 'ar' 
                  ? '💡 نصيحة: يجب كتابة رسالة قبل الإرسال' 
                  : '💡 Tip: Message is required before sending'}
              </div>
            </motion.div>
          )}

          <AnimatePresence>
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                theme={theme}
              />
            ))}
          </AnimatePresence>

          {isLoading && (
            <LoadingIndicator theme={theme} language={language} />
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
