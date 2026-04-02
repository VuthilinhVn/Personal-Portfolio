// Language Switcher Module
class LanguageManager {
    constructor() {
        // Detect language from URL first, then fall back to localStorage
        this.currentLanguage = this.detectLanguageFromUrl() || localStorage.getItem('language') || 'en';
        this.currentPage = this.detectCurrentPage();
    }

    // Detect language from current URL
    detectLanguageFromUrl() {
        const url = window.location.pathname;

        // Check for language in path (e.g., /en/, /vi/, /zh/)
        // This handles nested pages like /Personal-Portfolio/html-version/docs/portfolio/vi/portfolio.html
        const pathMatch = url.match(/\/(en|vi|zh)\//);
        if (pathMatch) {
            return pathMatch[1];
        }

        // Check for index files (e.g., index-vi.html, index-zh.html)
        // This handles root pages on both localhost and GitHub Pages
        if (url.includes('index-vi.html')) return 'vi';
        if (url.includes('index-zh.html')) return 'zh';
        if (url.includes('index.html')) return 'en';

        // Check for trailing slash (e.g., /Personal-Portfolio/) - default to English
        if (url.endsWith('/')) return 'en';

        // Fallback to English
        return 'en';
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }

    getCurrentPage() {
        return this.currentPage;
    }

    // Detect current page type
    detectCurrentPage() {
        const url = window.location.pathname;
        if (url.includes('portfolio.html')) return 'portfolio';
        if (url.includes('pf.html')) return 'pf';
        if (url.includes('movie.html')) return 'movie';
        return 'index';
    }

    // Get the appropriate URL for language change
    getLanguageUrl(lang) {
        const currentUrl = window.location.pathname;

        // Check if on index page (root portfolio)
        const isRoot = currentUrl === '/' ||
            currentUrl.endsWith('index.html') ||
            currentUrl.endsWith('index-vi.html') ||
            currentUrl.endsWith('index-zh.html') ||
            currentUrl.endsWith('/');

        if (isRoot) {
            // On root/index page - replace file name while keeping the base path
            if (lang === 'en') {
                // Going to English: replace variants with index.html
                if (currentUrl.endsWith('index-vi.html')) {
                    return currentUrl.replace(/index-vi\.html$/, 'index.html');
                } else if (currentUrl.endsWith('index-zh.html')) {
                    return currentUrl.replace(/index-zh\.html$/, 'index.html');
                } else if (currentUrl.endsWith('index.html')) {
                    return currentUrl; // Already on English
                } else if (currentUrl === '/') {
                    return '/index.html';
                } else if (currentUrl.endsWith('/')) {
                    // Path like /Personal-Portfolio/
                    return currentUrl + 'index.html';
                }
            } else {
                // Going to VI or ZH: replace any index file with the target variant
                if (currentUrl.endsWith('index.html')) {
                    return currentUrl.replace(/index\.html$/, `index-${lang}.html`);
                } else if (currentUrl.endsWith('index-vi.html')) {
                    return currentUrl.replace(/index-vi\.html$/, `index-${lang}.html`);
                } else if (currentUrl.endsWith('index-zh.html')) {
                    return currentUrl.replace(/index-zh\.html$/, `index-${lang}.html`);
                } else if (currentUrl === '/') {
                    return `/index-${lang}.html`;
                } else if (currentUrl.endsWith('/')) {
                    // Path like /Personal-Portfolio/
                    return currentUrl + `index-${lang}.html`;
                }
            }
        }

        // For nested pages in language directories
        // Replace /en/, /vi/, /zh/ with target language
        if (currentUrl.includes('/en/')) {
            return currentUrl.replace(/\/en\//, `/${lang}/`);
        } else if (currentUrl.includes('/vi/')) {
            return currentUrl.replace(/\/vi\//, `/${lang}/`);
        } else if (currentUrl.includes('/zh/')) {
            return currentUrl.replace(/\/zh\//, `/${lang}/`);
        }

        // Fallback
        return currentUrl;
    }

    // Extract language from current URL
    extractLanguage(url) {
        const match = url.match(/\/(en|vi|zh)\//);
        return match ? match[1] : 'en';
    }

    setLanguage(lang) {
        if (lang === this.currentLanguage) return;

        this.currentLanguage = lang;
        localStorage.setItem('language', lang);

        // Redirect to language-specific page
        const newUrl = this.getLanguageUrl(lang);
        console.log('Current URL:', window.location.pathname);
        console.log('Target Language:', lang);
        console.log('New URL:', newUrl);
        window.location.href = newUrl;
    }
}

// Global language manager instance
const languageManager = new LanguageManager();

// Function to initialize language switcher
function initializeLanguageSwitcher() {
    // Create and inject language switcher HTML - Dropdown style
    const switcherHTML = `
    <div class="language-switcher-container" id="languageSwitcherContainer">
      <select class="language-dropdown" id="languageDropdown">
        <option value="en">🇬🇧 English</option>
        <option value="vi">🇻🇳 Tiếng Việt</option>
        <option value="zh">🇨🇳 中文</option>
      </select>
    </div>
  `;

    // Add CSS for language switcher dropdown
    const style = document.createElement('style');
    style.textContent = `
    .language-switcher-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
    }

    .language-dropdown {
      padding: 10px 15px;
      border: 2px solid #3b82f6;
      background: white;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      font-size: 14px;
      color: #333;
      transition: all 0.3s ease;
      font-family: 'Poppins', sans-serif;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      appearance: none;
      padding-right: 30px;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%233b82f6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right 8px center;
      background-size: 20px;
      padding-right: 35px;
    }

    .language-dropdown:hover {
      background-color: #f3f4f6;
      border-color: #1e40af;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }

    .language-dropdown:focus {
      outline: none;
      border-color: #1e40af;
      background-color: white;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .language-dropdown option {
      padding: 10px;
      background: white;
      color: #333;
    }

    @media (max-width: 768px) {
      .language-switcher-container {
        top: 80px;
        right: 10px;
      }

      .language-dropdown {
        padding: 8px 12px;
        font-size: 12px;
        padding-right: 30px;
      }
    }

    @media (max-width: 480px) {
      .language-switcher-container {
        top: 70px;
        right: 5px;
      }

      .language-dropdown {
        padding: 6px 10px;
        font-size: 11px;
        padding-right: 25px;
      }
    }
  `;
    document.head.appendChild(style);

    // Insert switcher into the page body
    document.body.insertAdjacentHTML('beforeend', switcherHTML);

    // Get dropdown and update language based on current URL
    const dropdown = document.getElementById('languageDropdown');
    if (dropdown) {
        // Refresh language detection from URL
        const detectedLang = languageManager.detectLanguageFromUrl() || localStorage.getItem('language') || 'en';
        languageManager.currentLanguage = detectedLang;
        dropdown.value = detectedLang;

        // Add change listener to dropdown
        dropdown.addEventListener('change', function () {
            const lang = this.value;
            languageManager.setLanguage(lang);
        });
    }
}

// Initialize on DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLanguageSwitcher);
} else {
    // DOM is already loaded
    initializeLanguageSwitcher();
}
