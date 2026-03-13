"use client";

import Link, { type LinkProps } from "next/link";
import { forwardRef } from "react";
import { trackPortalEvent } from "@/lib/portal";

type AnchorProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

type TrackedLinkProps = LinkProps &
  AnchorProps & {
    eventType?: string;
    tracking?: Record<string, unknown>;
  };

export const TrackedLink = forwardRef<HTMLAnchorElement, TrackedLinkProps>(function TrackedLink(
  { eventType = "cta_click", tracking, onClick, href, ...props },
  ref,
) {
  return (
    <Link
      {...props}
      href={href}
      ref={ref}
      onClick={(event) => {
        trackPortalEvent(eventType, {
          href: typeof href === "string" ? href : href.toString(),
          label: props["aria-label"] ?? props.title ?? null,
          ...tracking,
        });
        onClick?.(event);
      }}
    />
  );
});
