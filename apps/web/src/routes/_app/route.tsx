import { Toaster } from "@/components/ui/sonner";
import { useServerExceptionNotifications } from "@/hooks/use-server-exception-notifications";
import { useUserSessionNotifications } from "@/hooks/use-user-session-notifications";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
});

const DebugMenu = lazy(() =>
  import("@/components/debug-menu").then((module) => ({
    default: module.DebugMenu,
  })),
);

function RouteComponent() {
  useUserSessionNotifications();
  useServerExceptionNotifications();

  return (
    <div className="flex h-full flex-col relative bg-background min-h-dvh">
      <Outlet />

      {import.meta.env.DEV && (
        <Suspense fallback={null}>
          <DebugMenu />
        </Suspense>
      )}

      <Toaster position="top-center" />
    </div>
  );
}
