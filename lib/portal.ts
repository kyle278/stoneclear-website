export type TrackerWindow = Window & {
  IngeniumTracker?: {
    init?: (options: { endpoint: string; siteId: string }) => void;
    track?: (eventType: string, context?: Record<string, unknown>, properties?: Record<string, unknown>) => void;
    getVisitorId?: () => string | null;
    getSessionId?: () => string | null;
  };
};

export type PortalTrackingSnapshot = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  cid: string | null;
  visitor_id: string | null;
  session_id: string | null;
  submission_url: string;
  referrer: string | null;
  site_id: string | null;
};

export function getPortalPublicConfig() {
  const appUrl = process.env.NEXT_PUBLIC_PORTAL_APP_URL?.trim();
  const trackingEndpoint = process.env.NEXT_PUBLIC_PORTAL_TRACKING_ENDPOINT?.trim();
  const siteId = process.env.NEXT_PUBLIC_PORTAL_SITE_ID?.trim();

  if (!appUrl || !trackingEndpoint || !siteId) {
    return null;
  }

  return {
    appUrl,
    trackingEndpoint,
    siteId,
    trackerScriptUrl: `${appUrl}/ingenium-tracker.js`,
  };
}

export function trackPortalEvent(eventType: string, properties: Record<string, unknown> = {}) {
  if (typeof window === "undefined") {
    return;
  }

  const trackerWindow = window as TrackerWindow;
  trackerWindow.IngeniumTracker?.track?.(eventType, {}, properties);
}

export function getTrackingSnapshot(): PortalTrackingSnapshot {
  if (typeof window === "undefined") {
    return {
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_term: null,
      utm_content: null,
      cid: null,
      visitor_id: null,
      session_id: null,
      submission_url: "",
      referrer: null,
      site_id: process.env.NEXT_PUBLIC_PORTAL_SITE_ID ?? null,
    };
  }

  const url = new URL(window.location.href);
  const trackerWindow = window as TrackerWindow;

  return {
    utm_source: url.searchParams.get("utm_source"),
    utm_medium: url.searchParams.get("utm_medium"),
    utm_campaign: url.searchParams.get("utm_campaign"),
    utm_term: url.searchParams.get("utm_term"),
    utm_content: url.searchParams.get("utm_content"),
    cid: url.searchParams.get("cid"),
    visitor_id: trackerWindow.IngeniumTracker?.getVisitorId?.() ?? null,
    session_id: trackerWindow.IngeniumTracker?.getSessionId?.() ?? null,
    submission_url: window.location.href,
    referrer: document.referrer || null,
    site_id: process.env.NEXT_PUBLIC_PORTAL_SITE_ID ?? null,
  };
}
