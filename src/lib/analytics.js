// @ts-nocheck
// Env-guarded analytics helpers.
// Enable GA4 by setting VITE_GA_MEASUREMENT_ID and Meta Pixel by setting
// VITE_META_PIXEL_ID in your .env. When unset, all calls are no-ops.
// TODO: CONFIRM — add your GA4 Measurement ID and Meta Pixel ID to .env,
// then the tracking events below will start firing automatically.

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;

let gaLoaded = false;
let pixelLoaded = false;

function loadGtag() {
  if (!GA_ID || gaLoaded || typeof document === 'undefined') return;
  gaLoaded = true;
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID);
}

function loadPixel() {
  if (!PIXEL_ID || pixelLoaded || typeof document === 'undefined') return;
  pixelLoaded = true;
  const script = document.createElement('script');
  script.innerHTML = `
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${PIXEL_ID}');
    fbq('track', 'PageView');
  `;
  document.head.appendChild(script);
}

export function track(event, params = {}) {
  try {
    if (GA_ID) {
      loadGtag();
      window.gtag?.('event', event, params);
    }
    if (PIXEL_ID) {
      loadPixel();
      window.fbq?.('trackCustom', event, params);
    }
  } catch (e) {
    // Tracking must never break the user journey.
  }
}

export const trackQuoteSubmit = () => track('generate_lead', { form_name: 'free_quote' });
export const trackWhatsAppClick = (label = 'whatsapp') => track('whatsapp_click', { event_label: label });
export const trackCTA = (label) => track('cta_click', { event_label: label });
