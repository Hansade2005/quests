// Web-compatible API handlers
// TODO: Implement web-specific handlers for notifications, etc.

export const handlers = {
  testNotification: {
    send: () => {
      // Web implementation could use browser notifications
      console.log("Test notification triggered");
    },
  },
  // Add other handlers as needed
};
