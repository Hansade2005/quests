import {
  type CaptureExceptionFunction,
  type ExceptionScope,
} from "@quests/shared";
import { app } from "electron";

import { publisher } from "../rpc/publisher";
import { getAppStateStore } from "../stores/app-state";
import { getSystemProperties } from "./system-properties";
import { telemetry } from "./telemetry";

export const captureServerException: CaptureExceptionFunction = function (
  error: unknown,
  additionalProperties?: {
    scopes?: ExceptionScope[];
  },
) {
  const finalProperties = {
    ...additionalProperties,
    $process_person_profile: false, // Ensure anonymous, if at all
    scopes: ["studio", ...(additionalProperties?.scopes ?? [])],
    version: app.getVersion(),
    ...getSystemProperties(),
  };
  const appStateStore = getAppStateStore();
  const telemetryId = appStateStore.get("telemetryId");
  telemetry?.captureException(error, telemetryId, finalProperties);
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.error(error, finalProperties);

    // Publish event for dev toast notifications
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;

    publisher.publish("server-exception", {
      message: errorMessage,
      stack: errorStack,
    });
  }
};
