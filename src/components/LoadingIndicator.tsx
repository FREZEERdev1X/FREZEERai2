import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles } from 'lucide-react';

interface LoadingIndicatorProps {
  theme: 'light' | 'dark';
  language: 'en' | 'ar';
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ theme, language }) => {
  const loadingText = language === 'ar' ? 'فريزر يفكر...' : 'FREZEER is thinking...';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`flex gap-3 mb-4 ${language === 'ar' ? 'text-right' : 'text-left'}`}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-slate-700 to-slate-800 text-cyan-400'
            : 'bg-gradient-to-br from-slate-100 to-slate-200 text-blue-600'
        }`}
      >
        <Bot className="w-5 h-5" />
      </motion.div>

      <div className={`flex-1 max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl mr-4`}>
        <div
          className={`relative p-4 rounded-2xl rounded-bl-sm backdrop-blur-sm ${
            theme === 'dark'
              ? 'bg-slate-800/80 text-slate-100 border border-slate-700/50'
              : 'bg-white/90 text-slate-800 border border-slate-200/50'
          }`}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1 -left-1"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </motion.div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm">{loadingText}</span>
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                  className={`w-2 h-2 rounded-full ${
                    theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingIndicator;
