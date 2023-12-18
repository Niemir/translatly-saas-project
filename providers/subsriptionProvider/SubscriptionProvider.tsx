"use client";

import { subscriptionRef } from "@/lib/converters/Subscription";
import { useSubscriptionStore } from "@/stores/subscription";
import { Timestamp, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
};
export default function SubscriptionProvider({ children }: Props) {
  const { data: session } = useSession();
  const setSubscription = useSubscriptionStore(
    (state) => state.setSubscription
  );
  useEffect(() => {
    if (!session) return;
    return onSnapshot(
      subscriptionRef(session?.user.id),
      (snapshot) => {
        if (snapshot.empty) {
          console.log("user has no subscription");
          setSubscription(null);
          return;
        } else {
          const sortedActiveSubs = snapshot.docs
            .filter((doc) => {
              const status = doc.get("status");
              return status === "active";
            })
            .toSorted(
              (a, b) =>
                (b.get("created") as Timestamp).seconds -
                (a.get("created") as Timestamp).seconds
            );

          setSubscription(sortedActiveSubs?.[0].data());
          console.log("user has subscription");
        }
      },
      (error) => {
        console.log("error getting document: ", error);
      }
    );
  }, [session]);

  return <>{children}</>;
}
