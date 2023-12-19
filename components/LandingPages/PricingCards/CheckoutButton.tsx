"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import ManageAccountButton from "@/components/ManageAccountButton";
import { Button } from "@/components/ui/button";
import { db } from "@/firebase";
import { isProUser } from "@/lib/utils";
import { useSubscriptionStore } from "@/stores/subscription";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function CheckoutButton() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const subscription = useSubscriptionStore((state) => state.subscription);
  const isLoadingSubscription = subscription === undefined;
  const isSubscribed = isProUser(subscription);
  const createCheckoutSession = async () => {
    if (!session?.user.id) {
      return;
    }
    setLoading(true);
    const docRef = await addDoc(
      collection(db, "customers", session.user.id, "checkout_sessions"),
      {
        price: "price_1ONc4ZKYEovfkpQJ8Sbld3Qk",
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );
    return onSnapshot(docRef, (snap) => {
      const data = snap.data();
      const url = data?.url;
      const error = data?.error;
      if (error) {
        alert("An error occured: ", error?.message);
      }
      if (url) {
        // We have a stripe checkout url
        window.location.assign(url);
        setLoading(false);
      }
    });
    // if(session.)
  };
  return (
    <div>
      <Button
        onClick={() => createCheckoutSession()}
        variant={"secondary"}
        disabled={isLoadingSubscription || loading}
        className="mt-6 w-full bg-purple-600 text-white hover:bg-purple-800"
      >
        {isSubscribed ? (
          <ManageAccountButton />
        ) : isLoadingSubscription || loading ? (
          <LoadingSpinner />
        ) : (
          "Sing up"
        )}
      </Button>

      {subscription?.canceled_at && (
        <p className="text-xs text-gray-500 mt-2">
          Your subscription will be cancelled at{" "}
          {subscription?.cancel_at?.toDate().toDateString()}
        </p>
      )}
    </div>
  );
}
