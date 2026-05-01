// Deep Signal — Page tracking hook
// Fires a server-side page view record on mount
import { useEffect } from "react";
import { trpc } from "@/lib/trpc";

export function usePageTracking(path: string) {
  const trackView = trpc.analytics.trackView.useMutation();
  useEffect(() => {
    trackView.mutate({
      path,
      referrer: document.referrer || undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);
}
