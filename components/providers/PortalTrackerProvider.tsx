"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getPortalPublicConfig, trackPortalEvent, type TrackerWindow } from "@/lib/portal";

const SCROLL_THRESHOLDS = [25, 50, 75, 100];

function ensureTrackerScript() {
  const config = getPortalPublicConfig();
  if (!config || typeof window === "undefined") {
    return;
  }

  const existing = document.querySelector<HTMLScriptElement>(
    `script[data-portal-tracker="stoneclear"][src="${config.trackerScriptUrl}"]`,
  );

  if (existing) {
    (window as TrackerWindow).IngeniumTracker?.init?.({
      endpoint: config.trackingEndpoint,
      siteId: config.siteId,
    });
    return;
  }

  const script = document.createElement("script");
  script.src = config.trackerScriptUrl;
  script.async = true;
  script.defer = true;
  script.dataset.portalTracker = "stoneclear";
  script.onload = () => {
    (window as TrackerWindow).IngeniumTracker?.init?.({
      endpoint: config.trackingEndpoint,
      siteId: config.siteId,
    });
  };
  document.head.appendChild(script);
}

export function PortalTrackerProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pathKey = `${pathname}?${searchParams.toString()}`;
  const enteredAtRef = useRef<number>(0);

  useEffect(() => {
    ensureTrackerScript();
  }, []);

  useEffect(() => {
    const config = getPortalPublicConfig();
    if (!config || typeof window === "undefined") {
      return;
    }

    enteredAtRef.current = Date.now();
    const sentThresholds = new Set<number>();

    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollableHeight <= 0 ? 100 : Math.min(100, Math.round((window.scrollY / scrollableHeight) * 100));

      for (const threshold of SCROLL_THRESHOLDS) {
        if (progress >= threshold && !sentThresholds.has(threshold)) {
          sentThresholds.add(threshold);
          trackPortalEvent("scroll_depth", {
            scroll_depth: threshold,
            page_path: window.location.pathname,
          });
        }
      }
    };

    const flushTimeOnPage = () => {
      const seconds = Math.max(1, Math.round((Date.now() - enteredAtRef.current) / 1000));
      trackPortalEvent("time_on_page", {
        seconds,
        page_path: window.location.pathname,
      });
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        flushTimeOnPage();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", flushTimeOnPage);

    return () => {
      flushTimeOnPage();
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", flushTimeOnPage);
    };
  }, [pathKey]);

  return null;
}
