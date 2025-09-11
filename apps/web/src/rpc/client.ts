// TODO: Implement HTTP-based RPC client for web
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { type InferRouterOutputs, type RouterClient } from "@orpc/server";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";

// Placeholder router type - will be replaced with actual web API router
type WebRouter = {
  // Add necessary routes here
};

const link = new RPCLink({
  url: "/api",
});

export const vanillaRpcClient: RouterClient<WebRouter> =
  createORPCClient(link);
export const rpcClient = createTanstackQueryUtils(vanillaRpcClient);

export type RPCOutput = InferRouterOutputs<WebRouter>;
