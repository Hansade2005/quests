import { hasAIProviderAtom } from "@/atoms/has-ai-provider";
import { userAtom } from "@/atoms/user";
import { isFeatureEnabled } from "@/shared/features";
import { useMutation } from "@tanstack/react-query";
import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import { toast } from "sonner";

import { rpcClient } from "../rpc/client";

const shownErrorMessages = new Set<string>();
let shownEnabledForAIMessages = false;

export function useUserSessionNotifications() {
  const [userResult] = useAtom(userAtom);
  const hasAIProvider = useAtomValue(hasAIProviderAtom);
  const { mutate: tabsAdd } = useMutation(rpcClient.tabs.add.mutationOptions());

  useEffect(() => {
    if (!isFeatureEnabled("questsAccounts")) {
      return;
    }

    if (
      userResult.error?.code === "SERVER_CONNECTION_ERROR" &&
      !shownErrorMessages.has(userResult.error.code)
    ) {
      shownErrorMessages.add(userResult.error.code);
      toast.error(userResult.error.message, {
        closeButton: true,
        dismissible: true,
        duration: Infinity,
      });
    }

    if (!hasAIProvider && !shownEnabledForAIMessages) {
      if (isFeatureEnabled("questsAccounts")) {
        toast.info("Sign in or add an API key to use AI features.", {
          action: {
            label: "Setup",
            onClick: () => {
              tabsAdd({ urlPath: "/login" });
            },
          },
          closeButton: true,
          dismissible: true,
          duration: Infinity,
        });
        shownEnabledForAIMessages = true;
      } else {
        toast.info("Add an API key to use AI features.", {
          closeButton: true,
          dismissible: true,
          duration: Infinity,
        });
      }
    }

    if (
      userResult.error?.code === "UNKNOWN_IPC_ERROR" &&
      !shownErrorMessages.has(userResult.error.code)
    ) {
      shownErrorMessages.add(userResult.error.code);
      toast.error(userResult.error.message, {
        closeButton: true,
        dismissible: true,
        duration: Infinity,
      });
    }
  }, [
    userResult.data?.id,
    userResult.error?.code,
    userResult.error?.message,
    tabsAdd,
    hasAIProvider,
  ]);
}
