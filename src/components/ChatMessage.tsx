import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User, Sparkles } from 'lucide-react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
  theme: 'light' | 'dark';
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, theme }) => {
  const isUser = message.isUser;
  const isRTL = message.language === 'ar';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex gap-2 mb-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} ${isRTL ? 'text-right' : 'text-left'}`}
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser
            ? theme === 'dark'
              ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white'
              : 'bg-gradient-to-br from-blue-400 to-blue-600 text-white'
            : theme === 'dark'
              ? 'bg-gradient-to-br from-slate-700 to-slate-800 text-cyan-400'
              : 'bg-gradient-to-br from-slate-100 to-slate-200 text-blue-600'
        }`}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`flex-1 max-w-[75%] ${
          isUser ? 'ml-2' : 'mr-2'
        }`}
      >
        <div
          className={`relative p-3 rounded-2xl backdrop-blur-sm ${
            isUser
              ? theme === 'dark'
                ? 'bg-gradient-to-br from-blue-600/80 to-cyan-600/80 text-white'
                : 'bg-gradient-to-br from-blue-500/90 to-blue-600/90 text-white'
              : theme === 'dark'
                ? 'bg-slate-800/80 text-slate-100 border border-slate-700/50'
                : 'bg-white/90 text-slate-800 border border-slate-200/50'
          } ${isUser ? 'rounded-br-sm' : 'rounded-bl-sm'}`}
        >
          {!isUser && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1 -left-1"
            >
              <Sparkles className="w-3 h-3 text-cyan-400" />
            </motion.div>
          )}
          
          <p className="text-sm leading-relaxed message-content">{message.text}</p>
          
          <div className={`mt-1 text-xs opacity-60 ${isRTL ? 'text-left' : 'text-right'}`}>
            {message.timestamp.toLocaleTimeString(message.language === 'ar' ? 'ar-SA' : 'en-US', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChatMessage;
