/**
 * Google Analytics 4 Event Tracking for Hollow Press
 */

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

/**
 * Track a form submission event
 */
export const trackFormSubmission = (formName: string, metadata?: Record<string, string | number>) => {
    if (window.gtag) {
        window.gtag('event', 'form_submit', {
            form_name: formName,
            ...metadata,
        });
    }
};

/**
 * Track a button click event
 */
export const trackButtonClick = (buttonName: string, category?: string) => {
    if (window.gtag) {
        window.gtag('event', 'button_click', {
            button_name: buttonName,
            button_category: category || 'general',
        });
    }
};

/**
 * Track a link click or navigation event
 */
export const trackLinkClick = (linkName: string, destination?: string) => {
    if (window.gtag) {
        window.gtag('event', 'link_click', {
            link_name: linkName,
            link_destination: destination || 'unknown',
        });
    }
};

/**
 * Track engagement events
 */
export const trackEngagement = (eventName: string, category: string, label?: string) => {
    if (window.gtag) {
        window.gtag('event', eventName, {
            event_category: category,
            event_label: label,
        });
    }
};
