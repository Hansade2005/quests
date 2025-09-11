import type { FileRoutesByPath, RouterHistory } from "@tanstack/react-router";

import { DefaultErrorComponent } from "@/components/default-error-component";
import { NotFoundRouteComponent } from "@/components/not-found";
import { QueryClient } from "@tanstack/react-query";
import {
  createBrowserHistory,
  createRouter as createTanStackRouter,
} from "@tanstack/react-router";

import { telemetry } from "./lib/telemetry";
import { routeTree } from "./routeTree.gen";

const IGNORED_PATHS = new Set<keyof FileRoutesByPath>([
  // Web app doesn't have separate sidebar/toolbar views
]);

function createRouter(options?: { history?: RouterHistory }) {
  const queryClient = new QueryClient();

  const router = createTanStackRouter({
    context: { queryClient },
    defaultErrorComponent: DefaultErrorComponent,
    defaultNotFoundComponent: NotFoundRouteComponent,
    defaultPreload: "intent",
    history: options?.history,
    routeTree,
    scrollRestoration: true,
  });

  router.subscribe("onRendered", (event) => {
    if (
      IGNORED_PATHS.has(event.toLocation.pathname as keyof FileRoutesByPath)
    ) {
      return;
    }
    telemetry?.capture("$pageview");
  });

  return {
    queryClient,
    router,
  };
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>["router"];
  }
}

const history = createBrowserHistory({});

export const { queryClient, router } = createRouter({ history });
