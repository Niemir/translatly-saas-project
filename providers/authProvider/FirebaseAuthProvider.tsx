"use client";
import { auth } from "@/firebase";
import { signInWithCustomToken } from "firebase/auth";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";
type Props = {
  children: ReactNode;
};
export default function FirebaseAuthProvider({ children }: Props) {
  const { data: session } = useSession();
  useEffect(() => {
    if (!session) return;

    const syncFirebaseAuth = async (session: Session) => {
      if (session && session.firebaseToken) {
        try {
          await signInWithCustomToken(auth, session.firebaseToken);
        } catch (error) {
          console.log("error signing in with custom token", error);
        }
      } else {
        auth.signOut();
      }
    };

    syncFirebaseAuth(session);
  }, [session]);

  return <>{children}</>;
}
