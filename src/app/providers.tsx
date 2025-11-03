"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  // 1. Create a new QueryClient instance
  // We use useState to ensure this instance is created only once per user session
  const [queryClient] = useState(() => new QueryClient());

  // 2. Wrap the app (children) in the QueryClientProvider
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}