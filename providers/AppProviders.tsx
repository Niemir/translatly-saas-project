"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "./themeProvider/ThemeProvider";
import ClientProvider from "./authProvider/AuthProvider";
import FirebaseAuthProvider from "./authProvider/FirebaseAuthProvider";
import SubscriptionProvider from "./subsriptionProvider/SubscriptionProvider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ClientProvider>
      <FirebaseAuthProvider>
        <SubscriptionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SubscriptionProvider>
      </FirebaseAuthProvider>
    </ClientProvider>
  );
}
