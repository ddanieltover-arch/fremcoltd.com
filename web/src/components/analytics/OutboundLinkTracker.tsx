"use client";

import { useEffect } from "react";
import { trackOutboundClick } from "@/components/analytics/GoogleAnalytics";

export function OutboundLinkTracker() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest("a[data-track-outbound]");
      if (!target || !(target instanceof HTMLAnchorElement)) return;
      const label = target.dataset.trackOutbound ?? target.textContent?.trim() ?? "link";
      trackOutboundClick(label, target.href);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
