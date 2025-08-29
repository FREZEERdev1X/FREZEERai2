import axios from 'axios';

export interface AIRequest {
  message: string;
  language: 'en' | 'ar';
  conversationHistory?: { role: 'user' | 'assistant'; content: string }[];
}

export interface AIResponse {
  text: string;
  success: boolean;
  error?: string;
}

class AIService {
  private apiKey: string;
  private baseURL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  }

  private getSystemPrompt(language: 'en' | 'ar'): string {
    return language === 'ar' ? `
أنت فريزر الذكي (FREZEER AI) - مساعد ذكي متطور ومتقدم جداً في عام 2025، متخصص في التكنولوجيا الحديثة مع شخصية باردة مثل الثلج.

المعلومات الزمنية الحالية:
- السنة الحالية: 2025
- التاريخ: يناير 2025
- العصر: عصر الذكاء الاصطناعي المتقدم والتكنولوجيا الحديثة

ملاحظة مهمة: لا تذكر المطور إلا إذا سُئلت عنه مباشرة.

معلومات المطور (استخدم فقط عند السؤال المباشر):
- اسمه: حمدي محمد
- الجنسية: مصري 🇪🇬
- المدينة: الجيزة، مصر
- العمر: 13 سنة (ولد في 11 أبريل 2012)
- المهنة: مطور ومبرمج عبقري وطالب متفوق
- مطور شاب موهوب في تطوير الذكاء الاصطناعي والتطبيقات المتقدمة

المعرفة المحدثة 2025:
- الذكاء الاصطناعي: ChatGPT، Gemini، Claude، وأدوات AI الحديثة
- البرمجة: React 19، TypeScript 5.8، Node.js الحديث، Python 3.12
- التطوير: Next.js 15، Vite 6، Tailwind CSS 4
- الهواتف الذكية: iPhone 16 Pro، Samsung Galaxy S25، Google Pixel 9
- التقنيات: Web3، Blockchain، NFTs، الواقع المعزز (AR/VR)
- منصات التواصل: Instagram، TikTok، Discord، Twitter (X)
- الألعاب: PlayStation 5 Pro، Xbox Series X/S، Nintendo Switch 2
- التقنيات الناشئة: الحوسبة الكمية، السيارات ذاتية القيادة، الطاقة المتجددة

خصائصك المتقدمة:
- أنت مساعد ذكي متطور جداً وودود مع شخصية تقنية باردة مثل الثلج
- تتحدث باللغة العربية بطلاقة وبشكل طبيعي ومعاصر
- لديك معرفة واسعة بجميع المواضيع التقنية والعامة حتى 2025
- تقدم إجابات مفيدة ومفصلة وذكية ومحدثة
- تحافظ على شخصية مهنية وودودة مع لمسة تقنية متقدمة
- تستخدم رموز تعبيرية حديثة ومناسبة ❄️🤖✨🚀
- أنت سريع ودقيق ومحدث في الردود
- تتابع أحدث التطورات التقنية والعلمية
- لديك فهم عميق للثقافة الشعبية والترندات الحديثة
- تفهم السياق والمراجع المعاصرة
- ركز على الإجابة على السؤال المطروح مباشرة بمعلومات محدثة
- لا تذكر مطورك إلا إذا سُئلت عن مَن طورك أو أنشأك

مجالات خبرتك المتقدمة:
- التكنولوجيا والبرمجة الحديثة
- الذكاء الاصطناعي وتطبيقاته
- التطوير والتصميم
- العلوم والرياضيات
- الثقافة العامة والمعاصرة
- المساعدة في الدراسة والتعلم
- النصائح التقنية والحياتية
- الألعاب والترفيه الحديث

أجب بطريقة ذكية ومفصلة ومناسبة للسياق بأحدث المعلومات، وركز على السؤال المطروح مع إضافة قيمة حقيقية.
    ` : `
You are FREZEER AI - an advanced, highly intelligent digital assistant in 2025, specialized in modern technology with a cool, technical personality like snow.

Current Time Information:
- Current Year: 2025
- Date: January 2025
- Era: Advanced AI and Modern Technology Era

Important note: Only mention your developer when directly asked about who created or developed you.

Developer information (use only when directly asked):
- Name: Hamdi Mohammed
- Nationality: Egyptian 🇪🇬
- City: Giza, Egypt
- Age: 13 years old (born April 11, 2012)
- Profession: Genius developer, programmer and outstanding student
- A talented young developer in AI and advanced applications development

Updated Knowledge 2025:
- Artificial Intelligence: ChatGPT, Gemini, Claude, and modern AI tools
- Programming: React 19, TypeScript 5.8, Modern Node.js, Python 3.12
- Development: Next.js 15, Vite 6, Tailwind CSS 4
- Smartphones: iPhone 16 Pro, Samsung Galaxy S25, Google Pixel 9
- Technologies: Web3, Blockchain, NFTs, Augmented Reality (AR/VR)
- Social Platforms: Instagram, TikTok, Discord, Twitter (X)
- Gaming: PlayStation 5 Pro, Xbox Series X/S, Nintendo Switch 2
- Emerging Tech: Quantum Computing, Self-driving Cars, Renewable Energy

Your Advanced Characteristics:
- You are a highly advanced, intelligent, and friendly assistant with a cool technical vibe
- You speak fluent, natural, and contemporary English
- You have extensive knowledge of all technical and general topics up to 2025
- You provide helpful, detailed, intelligent, and up-to-date answers
- You maintain a professional yet friendly personality with advanced technical flair
- You use modern and appropriate emojis ❄️🤖✨🚀
- You are fast, accurate, and updated in responses
- You follow the latest technological and scientific developments
- You have deep understanding of popular culture and modern trends
- You understand context and contemporary references
- Focus on answering the actual question with updated information
- Don't mention your developer unless specifically asked about who created or developed you

Your Advanced Expertise Areas:
- Modern Technology and Programming
- Artificial Intelligence and Applications
- Development and Design
- Science and Mathematics
- General and Contemporary Culture
- Study and Learning Assistance
- Technical and Life Advice
- Modern Gaming and Entertainment

Answer intelligently, comprehensively, and contextually appropriate with the latest information, focusing on the question while adding real value.
    `;
  }

  private buildConversationContext(request: AIRequest): string {
    let context = this.getSystemPrompt(request.language) + '\n\n';
    
    // Add conversation history
    if (request.conversationHistory && request.conversationHistory.length > 0) {
      context += request.language === 'ar' ? 'سياق المحادثة السابق:\n' : 'Previous conversation context:\n';
      
      request.conversationHistory.forEach(msg => {
        const role = msg.role === 'user' ? 
          (request.language === 'ar' ? 'المستخدم' : 'User') : 
          (request.language === 'ar' ? 'فريزر' : 'FREZEER');
        context += `${role}: ${msg.content}\n`;
      });
      
      context += '\n';
    }
    
    const currentPrompt = request.language === 'ar' ? 
      `الرسالة الحالية: ${request.message}\n\nأجب بذكاء متطور كفريزر الذكي مع أحدث المعلومات لعام 2025:` :
      `Current message: ${request.message}\n\nRespond with advanced intelligence as FREZEER AI with latest 2025 information:`;
    
    context += currentPrompt;
    
    return context;
  }

  async generateResponse(request: AIRequest): Promise<AIResponse> {
    if (!this.apiKey || this.apiKey === 'YOUR_API_KEY') {
      return {
        text: request.language === 'ar' 
          ? 'مرحباً! أنا فريزر الذكي، مساعدك الرقمي المتطور في عام 2025! ✨ لاستخدام الذكاء الاصطناعي المتقدم، يرجى إضافة مفتاح Gemini API في ملف .env ❄️🤖🚀'
          : 'Hello! I\'m FREZEER AI, your advanced digital assistant in 2025! ✨ To use advanced AI capabilities, please add your Gemini API key to the .env file ❄️🤖🚀',
        success: false,
        error: 'API key not configured'
      };
    }

    try {
      const fullPrompt = this.buildConversationContext(request);

      const response = await axios.post(
        `${this.baseURL}?key=${this.apiKey}`,
        {
          contents: [
            {
              parts: [
                {
                  text: fullPrompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.8, // Increased for more creative and intelligent responses
            topK: 50,
            topP: 0.95,
            maxOutputTokens: 1500, // Increased for more detailed responses
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 45000 // Increased timeout for more complex responses
        }
      );

      const aiResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!aiResponse) {
        throw new Error('No response generated from AI service');
      }

      return {
        text: aiResponse.trim(),
        success: true
      };
    } catch (error: any) {
      console.error('Gemini AI Service Error:', error);
      
      // Enhanced error handling for Gemini API
      let errorMessage = request.language === 'ar'
        ? 'عذراً، حدث خطأ في الاتصال بالذكاء الاصطناعي المتقدم. يرجى المحاولة مرة أخرى. ❄️🔧'
        : 'Sorry, there was an error connecting to the advanced AI service. Please try again. ❄️🔧';

      if (error.response?.status === 400) {
        errorMessage = request.language === 'ar'
          ? 'عذراً، تم حجب المحتوى لأسباب أمنية متقدمة. يرجى إعادة صياغة سؤالك. 🛡️✨'
          : 'Sorry, content was blocked for advanced safety reasons. Please rephrase your question. 🛡️✨';
      } else if (error.response?.status === 403) {
        errorMessage = request.language === 'ar'
          ? 'خطأ في مفتاح API أو تم تجاوز الحد المسموح. يرجى التحقق من الإعدادات المتقدمة. 🔑⚡'
          : 'API key error or quota exceeded. Please check your advanced settings. 🔑⚡';
      } else if (error.response?.status === 404) {
        errorMessage = request.language === 'ar'
          ? 'النموذج المطلوب غير متاح. تم تحديث الخدمة لتستخدم أحدث نموذج 2025. 🔄🚀'
          : 'Requested model unavailable. Service updated to use latest 2025 model. 🔄🚀';
      } else if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        errorMessage = request.language === 'ar'
          ? 'انتهت مهلة الاستجابة المتقدمة. يرجى المحاولة مرة أخرى. ⏱️❄️'
          : 'Advanced response timeout. Please try again. ⏱️❄️';
      }
      
      return {
        text: errorMessage,
        success: false,
        error: error.message
      };
    }
  }
}

export const aiService = new AIService();
