"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "./themeProvider/ThemeProvider";
import ClientProvider from "./authProvider/AuthProvider";
import FirebaseAuthProvider from "./authProvider/FirebaseAuthProvider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ClientProvider>
      <FirebaseAuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </FirebaseAuthProvider>
    </ClientProvider>
  );
}
