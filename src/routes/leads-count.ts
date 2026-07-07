import { createFileRoute } from "@tanstack/react-router";
import { getLeadCount } from "../lib/leadStorage";

export const Route = createFileRoute("/leads-count")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const count = await getLeadCount();
          return new Response(JSON.stringify({ success: true, count }), {
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            },
          });
        } catch (error: any) {
          return new Response(
            JSON.stringify({ success: false, error: error.message || "Failed to retrieve lead count" }),
            {
              status: 500,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        }
      },
    },
  },
});
