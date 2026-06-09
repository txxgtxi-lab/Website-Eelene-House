/**
 * Eelene House - Translation Script
 * Handles switching between Thai (TH) and English (EN) dynamically.
 */

function setLanguage(lang) {
    localStorage.setItem('language', lang);
    applyLanguage(lang);
}

function applyLanguage(lang) {
    // Update active button classes in floating switcher
    const btnTh = document.getElementById('lang-th');
    const btnEn = document.getElementById('lang-en');
    
    if (btnTh && btnEn) {
        if (lang === 'en') {
            btnTh.className = "px-3 py-1 rounded-full text-xs tracking-wider transition-all duration-300 font-sans font-medium text-textMuted hover:text-emerald";
            btnEn.className = "px-3 py-1 rounded-full text-xs tracking-wider transition-all duration-300 font-sans font-medium bg-emerald text-white shadow-sm";
        } else {
            btnTh.className = "px-3 py-1 rounded-full text-xs tracking-wider transition-all duration-300 font-sans font-medium bg-emerald text-white shadow-sm";
            btnEn.className = "px-3 py-1 rounded-full text-xs tracking-wider transition-all duration-300 font-sans font-medium text-textMuted hover:text-emerald";
        }
    }

    // Toggle html lang attribute
    document.documentElement.lang = lang;

    // Translate standard elements
    const elements = document.querySelectorAll('[data-th][data-en]');
    elements.forEach(el => {
        const text = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-th');
        if (text) {
            // Check if text has html tags, if so render as innerHTML, otherwise textContent
            if (text.includes('<') && text.includes('>')) {
                el.innerHTML = text;
            } else {
                el.textContent = text;
            }
        }
    });

    // Translate placeholder elements
    const placeholders = document.querySelectorAll('[data-placeholder-th][data-placeholder-en]');
    placeholders.forEach(el => {
        const text = lang === 'en' ? el.getAttribute('data-placeholder-en') : el.getAttribute('data-placeholder-th');
        if (text) {
            el.setAttribute('placeholder', text);
        }
    });

    // Translate document title
    const titleEl = document.querySelector('title[data-th][data-en]');
    if (titleEl) {
        const titleText = lang === 'en' ? titleEl.getAttribute('data-en') : titleEl.getAttribute('data-th');
        if (titleText) {
            document.title = titleText;
        }
    }

    // Translate meta description
    const descEl = document.querySelector('meta[name="description"][data-th][data-en]');
    if (descEl) {
        const descText = lang === 'en' ? descEl.getAttribute('data-en') : descEl.getAttribute('data-th');
        if (descText) {
            descEl.setAttribute('content', descText);
        }
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('language') || 'th';
    applyLanguage(savedLang);
});
