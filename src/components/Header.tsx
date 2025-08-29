import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Globe, Snowflake, Zap } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  language: 'en' | 'ar';
  onThemeToggle: () => void;
  onLanguageToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, language, onThemeToggle, onLanguageToggle }) => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`relative z-10 p-3 border-b backdrop-blur-md ${
        theme === 'dark' 
          ? 'bg-slate-900/80 border-blue-500/30 text-white' 
          : 'bg-white/80 border-blue-300/50 text-slate-900'
      }`}
    >
      <div className="max-w-full mx-auto flex items-center justify-between px-2">
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative">
            <Snowflake className="w-6 h-6 text-blue-500" />
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-6 h-6 text-cyan-400" />
            </motion.div>
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              FREZEER AI
            </h1>
            <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {language === 'ar' ? 'المساعد الذكي' : 'AI Assistant'}
            </p>
          </div>
        </motion.div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onLanguageToggle}
            className={`p-2 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'bg-slate-800 hover:bg-slate-700 text-white'
                : 'bg-blue-50 hover:bg-blue-100 text-slate-700'
            }`}
          >
            <Globe className="w-4 h-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onThemeToggle}
            className={`p-2 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400'
                : 'bg-blue-50 hover:bg-blue-100 text-slate-700'
            }`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
