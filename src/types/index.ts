export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  language: 'en' | 'ar';
}

export interface Theme {
  mode: 'light' | 'dark';
}

export interface Language {
  code: 'en' | 'ar';
  name: string;
}
