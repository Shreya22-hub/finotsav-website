'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const languages = [
  { label: 'Original (English)', value: 'en' },
  { label: 'ಕನ್ನಡ (Kannada)', value: 'kn' },
  { label: 'हिन्दी (Hindi)', value: 'hi' },
  { label: 'తెలుగు (Telugu)', value: 'te' },
  { label: 'தமிழ் (Tamil)', value: 'ta' },
  { label: 'മലയാളം (Malayalam)', value: 'ml' },
  { label: 'मराठी (Marathi)', value: 'mr' },
  { label: 'ગુજરાતી (Gujarati)', value: 'gu' },
  { label: 'বাংলা (Bengali)', value: 'bn' },
  { label: 'اردو (Urdu)', value: 'ur' },
];

export default function GoogleTranslate() {
  const [selectedLang, setSelectedLang] = useState('en');

  useEffect(() => {
    if (document.getElementById('google-translate-script')) {
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,kn,hi,te,ta,ml,mr,gu,bn,ur',
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    setSelectedLang(lang);

    if (lang === 'en') {
      // Clear translation cookie and reload to restore original
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname;
      window.location.reload();
      return;
    }

    // Find the hidden Google Translate combo box and update its value
    const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (selectElement) {
      selectElement.value = lang;
      selectElement.dispatchEvent(new Event('change'));
    }
  };

  return (
    <div className="flex items-center">
      {/* Hidden original Google Translate element */}
      <div 
        id="google_translate_element" 
        className="absolute -left-[9999px] -top-[9999px] opacity-0 invisible"
      ></div>
      
      {/* Custom styled select box */}
      <div className="relative group">
        <select
          value={selectedLang}
          onChange={handleLanguageChange}
          className="appearance-none bg-black/50 backdrop-blur-sm border border-yellow-500/50 text-gray-300 px-4 py-1.5 pr-8 rounded-full text-sm font-medium group-hover:border-yellow-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all cursor-pointer shadow-lg shadow-yellow-500/5"
        >
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value} className="bg-black text-gray-300">
              {lang.label}
            </option>
          ))}
        </select>
        {/* Custom Dropdown Arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-yellow-500 group-hover:text-yellow-400 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
