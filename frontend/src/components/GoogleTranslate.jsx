import React, { useEffect } from 'react';

function GoogleTranslate() {
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.head.appendChild(script);
    };

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en', 
        includedLanguages: 'en,hi,gu,mr,pa,as,rj,bh,bn,te,ta,kn,or,ml,ur,ma',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
      }, 'google_translate_element');
    };

    addGoogleTranslateScript();
  }, []);

  return (
    <div 
      id="google_translate_element" 
      style={{ 
        position: 'absolute', 
        top: '0px', 
        right: '10px', 
        zIndex: 0, 
        backgroundColor: "gray",
        opacity: "0",
        
      }} 
    />
  );
}

export default GoogleTranslate;