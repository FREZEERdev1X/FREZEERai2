import React from 'react';
import { motion } from 'framer-motion';

const SnowEffect: React.FC = () => {
  const snowflakes = Array.from({ length: 50 }, (_, i) => i);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {snowflakes.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-200/30 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: -10,
            opacity: Math.random() * 0.7 + 0.3,
          }}
          animate={{
            y: window.innerHeight + 10,
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
          style={{
            width: Math.random() * 4 + 1,
            height: Math.random() * 4 + 1,
          }}
        />
      ))}
    </div>
  );
};

export default SnowEffect;
