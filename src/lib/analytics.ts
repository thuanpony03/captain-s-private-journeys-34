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
    window.gtag('config', 'G-BF2K8J3Y2Z', {
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
  // Also track to Facebook Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', action, {
      category: category,
      label: label,
      value: value,
    });
  }
};

// Track form submissions
export const trackFormSubmit = (formName: string) => {
  trackEvent('form_submit', 'Form', formName);
  // Facebook Pixel Lead event
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', { content_name: formName });
  }
};

// Track button clicks
export const trackButtonClick = (buttonName: string, location?: string) => {
  trackEvent('cta_click', 'Button', `${buttonName}${location ? ` - ${location}` : ''}`);
};

// Track video plays
export const trackVideoPlay = (videoTitle: string) => {
  trackEvent('video_play', 'Video', videoTitle);
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', { content_name: videoTitle, content_type: 'video' });
  }
};

// Track phone calls
export const trackPhoneClick = (phoneOwner?: string) => {
  trackEvent('phone_click', 'Contact', phoneOwner || 'Phone Call');
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Contact', { method: 'phone', owner: phoneOwner });
  }
};

// Track Zalo clicks
export const trackZaloClick = () => {
  trackEvent('zalo_click', 'Contact', 'Zalo Message');
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Contact', { method: 'zalo' });
  }
};

// Track Facebook clicks
export const trackFacebookClick = () => {
  trackEvent('facebook_click', 'Contact', 'Facebook Message');
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Contact', { method: 'facebook' });
  }
};

// Track tour views
export const trackTourView = (tourName: string) => {
  trackEvent('tour_view', 'Tour', tourName);
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', { content_name: tourName, content_type: 'tour' });
  }
};

// Track scroll to section
export const trackScrollToSection = (sectionName: string) => {
  trackEvent('scroll_to', 'Navigation', sectionName);
};

// Track social link clicks
export const trackSocialClick = (platform: string) => {
  trackEvent('social_click', 'Social', platform);
};

// Track popup interactions
export const trackPopupInteraction = (action: 'open' | 'close' | 'submit', popupName: string) => {
  trackEvent(`popup_${action}`, 'Popup', popupName);
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
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
  trackFacebookClick,
  trackTourView,
  trackScrollToSection,
  trackSocialClick,
  trackPopupInteraction,
};
