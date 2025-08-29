import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';
import SnowEffect from './components/SnowEffect';
import { useChat } from './hooks/useChat';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const { messages, isLoading, sendMessage, clearChat } = useChat();

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const handleSendMessage = (text: string) => {
    sendMessage(text, language);
  };

  return (
    <div 
      className={`fixed inset-0 w-screen h-screen overflow-hidden transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900'
          : 'bg-gradient-to-br from-blue-50 via-white to-cyan-50'
      }`}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      style={{ touchAction: 'none' }}
    >
      <SnowEffect />
      
      {/* Ambient lighting effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            background: theme === 'dark'
              ? [
                  'radial-gradient(600px circle at 0% 0%, rgba(59, 130, 246, 0.15), transparent 50%)',
                  'radial-gradient(600px circle at 100% 0%, rgba(6, 182, 212, 0.15), transparent 50%)',
                  'radial-gradient(600px circle at 100% 100%, rgba(59, 130, 246, 0.15), transparent 50%)',
                  'radial-gradient(600px circle at 0% 100%, rgba(6, 182, 212, 0.15), transparent 50%)',
                  'radial-gradient(600px circle at 0% 0%, rgba(59, 130, 246, 0.15), transparent 50%)',
                ]
              : [
                  'radial-gradient(400px circle at 0% 0%, rgba(59, 130, 246, 0.08), transparent 50%)',
                  'radial-gradient(400px circle at 100% 0%, rgba(6, 182, 212, 0.08), transparent 50%)',
                  'radial-gradient(400px circle at 100% 100%, rgba(59, 130, 246, 0.08), transparent 50%)',
                  'radial-gradient(400px circle at 0% 100%, rgba(6, 182, 212, 0.08), transparent 50%)',
                  'radial-gradient(400px circle at 0% 0%, rgba(59, 130, 246, 0.08), transparent 50%)',
                ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full h-full flex flex-col"
      >
        <Header
          theme={theme}
          language={language}
          onThemeToggle={toggleTheme}
          onLanguageToggle={toggleLanguage}
        />

        <ChatArea
          messages={messages}
          isLoading={isLoading}
          theme={theme}
          language={language}
        />

        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isLoading}
          theme={theme}
          language={language}
        />
      </motion.div>
    </div>
  );
}

export default App;
