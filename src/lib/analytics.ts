// Google Analytics Component
export const initGA = (measurementId: string) => {
  if (typeof window !== 'undefined') {
    // Load Google Analytics script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', measurementId, {
      page_path: window.location.pathname,
    });
  }
};

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-XXXXXXXXXX', {
      page_path: url,
    });
  }
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track form submissions
export const trackFormSubmit = (formName: string) => {
  trackEvent('submit', 'Form', formName);
};

// Track button clicks
export const trackButtonClick = (buttonName: string) => {
  trackEvent('click', 'Button', buttonName);
};

// Track video plays
export const trackVideoPlay = (videoTitle: string) => {
  trackEvent('play', 'Video', videoTitle);
};

// Track phone calls
export const trackPhoneClick = () => {
  trackEvent('click', 'Contact', 'Phone Call');
};

// Track Zalo clicks
export const trackZaloClick = () => {
  trackEvent('click', 'Contact', 'Zalo Message');
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export default {
  initGA,
  trackPageView,
  trackEvent,
  trackFormSubmit,
  trackButtonClick,
  trackVideoPlay,
  trackPhoneClick,
  trackZaloClick,
};
