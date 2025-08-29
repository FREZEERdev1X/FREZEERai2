import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Paperclip, AlertCircle } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
  theme: 'light' | 'dark';
  language: 'en' | 'ar';
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled, theme, language }) => {
  const [message, setMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const isRTL = language === 'ar';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    if (!disabled) {
      onSendMessage(message.trim());
      setMessage('');
      setShowError(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    if (showError && e.target.value.trim()) {
      setShowError(false);
    }
  };

  const placeholder = language === 'ar' 
    ? 'يجب كتابة رسالة قبل الإرسال...' 
    : 'Message is required before sending...';
    
  const errorMessage = language === 'ar'
    ? 'يرجى كتابة رسالة قبل الإرسال'
    : 'Please enter a message before sending';

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`p-3 border-t backdrop-blur-md ${
        theme === 'dark'
          ? 'bg-slate-900/80 border-slate-700/50'
          : 'bg-white/80 border-slate-200/50'
      }`}
    >
      <form onSubmit={handleSubmit} className="max-w-full mx-auto">
        {/* Error Message */}
        <AnimatePresence>
          {showError && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className={`mb-2 p-2 rounded-lg flex items-center gap-2 ${
                theme === 'dark'
                  ? 'bg-red-900/50 border border-red-700/50 text-red-300'
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs font-medium">{errorMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`relative flex items-center gap-2 p-2 rounded-2xl border-2 transition-all ${
          showError
            ? theme === 'dark'
              ? 'bg-slate-800/50 border-red-500 shadow-red-500/20 shadow-lg'
              : 'bg-white/70 border-red-400 shadow-red-400/20 shadow-lg'
            : theme === 'dark'
              ? 'bg-slate-800/50 border-slate-600 focus-within:border-cyan-400'
              : 'bg-white/70 border-slate-300 focus-within:border-blue-400'
        }`}>
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-full transition-colors ${
              theme === 'dark'
                ? 'text-slate-400 hover:text-cyan-400 hover:bg-slate-700'
                : 'text-slate-500 hover:text-blue-500 hover:bg-blue-50'
            }`}
          >
            <Paperclip className="w-4 h-4" />
          </motion.button>

          <input
            type="text"
            value={message}
            onChange={handleInputChange}
            placeholder={placeholder}
            disabled={disabled}
            dir={isRTL ? 'rtl' : 'ltr'}
            required
            className={`flex-1 px-3 py-2 bg-transparent border-none outline-none text-sm ${
              theme === 'dark' ? 'text-white placeholder-slate-400' : 'text-slate-800 placeholder-slate-500'
            } ${isRTL ? 'text-right' : 'text-left'} ${
              showError ? 'placeholder-red-400' : ''
            }`}
            style={{ fontSize: '16px' }}
          />

          <motion.button
            type="submit"
            disabled={disabled || !message.trim()}
            whileHover={{ scale: message.trim() ? 1.1 : 1 }}
            whileTap={{ scale: message.trim() ? 0.9 : 1 }}
            className={`p-2 rounded-full transition-all ${
              disabled || !message.trim()
                ? theme === 'dark'
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : theme === 'dark'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-cyan-500/25'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-blue-500/25'
            }`}
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default ChatInput;
