"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "./themeProvider/ThemeProvider";
import ClientProvider from "./authProvider/AuthProvider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ClientProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </ClientProvider>
  );
}