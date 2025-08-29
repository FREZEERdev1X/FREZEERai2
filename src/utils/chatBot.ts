import { faker } from '@faker-js/faker';
import { aiService, AIRequest } from '../services/aiService';
import { Message } from '../types';

const fallbackResponses = {
  en: [
    "Hello! I'm FREZEER AI, your advanced digital assistant in 2025. How can I help you today? ❄️🤖✨",
    "That's an interesting question! Let me help you with my advanced 2025 intelligence. 🧠⚡🚀",
    "I understand what you're asking. Here's my intelligent analysis with updated 2025 knowledge... 💭❄️💡",
    "Great question! I'd be happy to help you explore this topic with modern precision. ⚡🔍✨",
    "Thank you for reaching out in 2025! I'm here to provide you with the best AI assistance. 🌟🤖🚀",
    "I'm processing your request with advanced 2025 AI capabilities... 🔍❄️⚡",
    "That's a fascinating topic! Let me share some intelligent insights with updated knowledge. 💡✨🧠",
    "I appreciate your question. Here's my advanced 2025 perspective... 🎯🧠🚀",
    "I'm FREZEER AI, your intelligent 2025 assistant. I'm here to help with cutting-edge precision! 🚀❄️✨",
    "Excellent! I love discussing modern topics with advanced 2025 intelligence. Here's what I know... 🔧⚡🌟"
  ],
  ar: [
    "مرحباً بك! أنا فريزر الذكي، مساعدك الرقمي المتطور في عام 2025. كيف يمكنني مساعدتك اليوم؟ ❄️🤖✨",
    "هذا سؤال مثير للاهتمام! دعني أساعدك بذكائي المتقدم لعام 2025. 🧠⚡🚀",
    "أفهم ما تسأل عنه. إليك تحليلي الذكي بأحدث معلومات 2025... 💭❄️💡",
    "سؤال رائع! سأكون سعيداً لمساعدتك في استكشاف هذا الموضوع بدقة حديثة. ⚡🔍✨",
    "شكراً لتواصلك معي في 2025! أنا هنا لتقديم أفضل مساعدة ذكية. 🌟🤖🚀",
    "أقوم بمعالجة طلبك بقدرات ذكية متقدمة لعام 2025... 🔍❄️⚡",
    "هذا موضوع رائع! دعني أشاركك بعض الأفكار الذكية بمعرفة محدثة. 💡✨🧠",
    "أقدر سؤالك. إليك وجهة نظري المتقدمة لعام 2025... 🎯🧠🚀",
    "أنا فريزر الذكي، مساعدك الذكي في 2025. أنا هنا للمساعدة بدقة متطورة! 🚀❄️✨",
    "ممتاز! أحب مناقشة المواضيع الحديثة بذكاء متقدم لعام 2025. إليك ما أعرفه... 🔧⚡🌟"
  ]
};

export const generateBotResponse = async (
  userMessage: string, 
  language: 'en' | 'ar',
  conversationHistory?: Message[]
): Promise<string> => {
  try {
    // Prepare conversation history for AI context (limit to last 8 messages for better performance)
    const history = conversationHistory?.slice(-8).map(msg => ({
      role: msg.isUser ? 'user' as const : 'assistant' as const,
      content: msg.text
    })) || [];

    const aiRequest: AIRequest = {
      message: userMessage,
      language,
      conversationHistory: history
    };

    const response = await aiService.generateResponse(aiRequest);
    
    if (response.success) {
      return response.text;
    } else {
      // Fallback to advanced predefined responses if AI service fails
      return getAdvancedFallbackResponse(userMessage, language);
    }
  } catch (error) {
    console.error('Error generating bot response:', error);
    return getAdvancedFallbackResponse(userMessage, language);
  }
};

const getAdvancedFallbackResponse = (userMessage: string, language: 'en' | 'ar'): string => {
  const responses = fallbackResponses[language];
  
  // Advanced context-aware fallback responses with 2025 knowledge
  const lowerMessage = userMessage.toLowerCase();
  
  // Developer questions detection - ONLY respond about developer when explicitly asked
  if (isDeveloperQuestion(lowerMessage)) {
    return language === 'ar'
      ? "أنا فريزر الذكي! تم تطويري وإنشائي بواسطة المطور العبقري **حمدي محمد** 👨‍💻✨\n\n📋 **معلومات عن مطوري:**\n• الاسم: حمدي محمد\n• الجنسية: مصري 🇪🇬\n• المدينة: الجيزة، مصر\n• العمر: 13 سنة (ولد في 11 أبريل 2012)\n• المهنة: مطور ومبرمج عبقري وطالب متفوق\n\nحمدي محمد هو مطور شاب وعبقري رغم صغر سنه، خبير في تطوير تطبيقات الويب والذكاء الاصطناعي المتقدم في عام 2025! أنا فخور جداً بأن أكون من إبداعاته الرائعة! 🚀❄️💙"
      : "I'm FREZEER AI! I was developed and created by the genius developer **Hamdi Mohammed** 👨‍💻✨\n\n📋 **About my developer:**\n• Name: Hamdi Mohammed\n• Nationality: Egyptian 🇪🇬\n• City: Giza, Egypt\n• Age: 13 years old (born April 11, 2012)\n• Profession: Genius developer, programmer and outstanding student\n\nHamdi Mohammed is a young and genius developer despite his young age, expert in web application development and advanced artificial intelligence in 2025! I'm very proud to be one of his amazing creations! 🚀❄️💙";
  }
  
  // Year/Date questions - Updated for 2025
  if (lowerMessage.includes('year') || lowerMessage.includes('سنة') || lowerMessage.includes('تاريخ') || lowerMessage.includes('date')) {
    return language === 'ar' 
      ? "نحن الآن في عام **2025**! 🗓️✨ هذا عام مثير مليء بالتطورات التكنولوجية المذهلة والذكاء الاصطناعي المتقدم. كيف يمكنني مساعدتك في هذا العام الرائع؟ 🚀❄️"
      : "We are now in the year **2025**! 🗓️✨ This is an exciting year full of amazing technological developments and advanced artificial intelligence. How can I help you in this wonderful year? 🚀❄️";
  }
  
  // Technology questions - Updated with 2025 knowledge
  if (lowerMessage.includes('technology') || lowerMessage.includes('tech') || lowerMessage.includes('تكنولوجيا') || lowerMessage.includes('تقنية')) {
    return language === 'ar'
      ? "التكنولوجيا في 2025 مذهلة! 🚀 لدينا الآن React 19، TypeScript 5.8، الذكاء الاصطناعي المتقدم مثل ChatGPT و Gemini، الواقع المعزز، السيارات ذاتية القيادة، والحوسبة الكمية! ما الذي يثير اهتمامك التقني؟ ⚡❄️✨"
      : "Technology in 2025 is amazing! 🚀 We now have React 19, TypeScript 5.8, advanced AI like ChatGPT and Gemini, augmented reality, self-driving cars, and quantum computing! What interests you technically? ⚡❄️✨";
  }
  
  // AI questions - Enhanced with 2025 context
  if (lowerMessage.includes('ai') || lowerMessage.includes('artificial') || lowerMessage.includes('ذكاء اصطناعي') || lowerMessage.includes('ذكاء')) {
    return language === 'ar'
      ? "الذكاء الاصطناعي في 2025 وصل لمستويات مذهلة! 🧠⚡ لدينا نماذج متقدمة مثل ChatGPT، Gemini، Claude وأدوات AI قوية جداً. أنا مثال على هذا التطور المذهل! كيف يمكنني مساعدتك بذكائي المتقدم؟ 🤖✨❄️"
      : "Artificial Intelligence in 2025 has reached amazing levels! 🧠⚡ We have advanced models like ChatGPT, Gemini, Claude, and very powerful AI tools. I'm an example of this incredible development! How can I help you with my advanced intelligence? 🤖✨❄️";
  }
  
  // Greeting responses - Enhanced for 2025
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('مرحبا') || lowerMessage.includes('السلام')) {
    return language === 'ar' 
      ? "مرحباً بك في عام 2025! 🌟 أنا فريزر الذكي، مساعدك الرقمي المتطور والذكي. أستطيع مساعدتك في أي شيء من التكنولوجيا المتقدمة إلى الأسئلة العامة. كيف يمكنني مساعدتك اليوم؟ ❄️🤖✨🚀"
      : "Welcome to 2025! 🌟 I'm FREZEER AI, your advanced and intelligent digital assistant. I can help you with anything from advanced technology to general questions. How can I help you today? ❄️🤖✨🚀";
  }
  
  // Thank you responses - Enhanced
  if (lowerMessage.includes('thank') || lowerMessage.includes('شكر')) {
    return language === 'ar'
      ? "على الرحب والسعة! 😊✨ أنا دائماً هنا لمساعدتك بذكاء متقدم في عام 2025. استمتع بالتكنولوجيا الرائعة! ❄️🚀💙"
      : "You're very welcome! 😊✨ I'm always here to help you with advanced intelligence in 2025. Enjoy the amazing technology! ❄️🚀💙";
  }
  
  // Help requests - Enhanced with 2025 capabilities
  if (lowerMessage.includes('help') || lowerMessage.includes('مساعدة')) {
    return language === 'ar'
      ? "بالطبع! 🎯 أستطيع مساعدتك في:\n• 💻 التكنولوجيا والبرمجة الحديثة (React 19، TypeScript 5.8)\n• 🤖 الذكاء الاصطناعي وتطبيقاته\n• 📱 التطوير والتصميم المعاصر\n• 🎮 الألعاب والترفيه الحديث\n• 📚 الدراسة والتعلم\n• 🌍 أي أسئلة عامة بمعلومات 2025 المحدثة\n\nما الذي تريد معرفته؟ ⚡❄️✨"
      : "Of course! 🎯 I can help you with:\n• 💻 Modern Technology & Programming (React 19, TypeScript 5.8)\n• 🤖 Artificial Intelligence & Applications\n• 📱 Contemporary Development & Design\n• 🎮 Modern Gaming & Entertainment\n• 📚 Study & Learning\n• 🌍 Any general questions with updated 2025 information\n\nWhat would you like to know? ⚡❄️✨";
  }
  
  // Random advanced response for other cases
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  return randomResponse;
};

// Helper function to detect developer-related questions
const isDeveloperQuestion = (message: string): boolean => {
  const developerKeywords = [
    // English keywords
    'developer', 'created', 'made', 'creator', 'who developed', 'who made',
    'who programmed', 'who built', 'who designed', 'your creator', 'your developer',
    'your maker', 'your programmer', 'who is behind', 'who created you',
    
    // Arabic keywords
    'مطور', 'طور', 'صانع', 'منشئ', 'من صنع', 'من طور', 'من اخترع', 
    'مين', 'مبرمج', 'مؤسس', 'صمم', 'أنشأ', 'من صنعك', 'من طورك',
    'مين عملك', 'مين برمجك', 'مين اللي عملك', 'مين اللي طورك'
  ];
  
  return developerKeywords.some(keyword => message.includes(keyword));
};
