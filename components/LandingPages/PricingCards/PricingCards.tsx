import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Link from "next/link";
import React from "react";
import CheckoutButton from "./CheckoutButton";

const tiers = [
  {
    name: "Starter",
    id: null,
    href: "#",
    priceMonthly: null,
    description: "Get chatting right away with anyone!",
    features: [
      "20 Message Chat limit in Chats",
      "2 Participant limit in Chat",
      "3 Chat Rooms limit",
      "Support 2 languages",
      "48-hour support response time",
    ],
  },
  {
    name: "Pro",
    id: "123123",
    href: "#",
    priceMonthly: "$3.99",
    description: "Unlock the Full Potential with Pro!",
    features: [
      "Unlimited messages in Chats",
      "Unlimited participants in Chats",
      "Unlimited Chat Rooms",
      "Support up to 10 languages",
      "1-hour support response time",
    ],
  },
];

export default function PricingCards({ redirect }: { redirect: boolean }) {
  return (
    <div className="max-w-4xl mx-auto ">
      <div className="grid sm:grid-cols-2 gap-8 ">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className="z-10 text-gray-800 bg-white rounded-2xl p-5 sm:p-10 ring-1 ring-gray-900/10 shadow-xl"
          >
            <h2 className="text-purple-600 font-semibold mb-2">{tier.name}</h2>
            <p className="font-bold text-5xl">
              {tier.priceMonthly ? (
                <>
                  <span>{tier.priceMonthly}</span>
                  <span className="font-normal text-sm">/month</span>
                </>
              ) : (
                <span>Free</span>
              )}
            </p>
            <p className="my-5">{tier.description}</p>
            <ul className="flex flex-col gap-4">
              {tier.features.map((feat) => (
                <li key={feat} className="flex gap-3">
                  {" "}
                  <Check /> {feat}
                </li>
              ))}
            </ul>

            {redirect ? (
              <Link
                href="/register"
                className={cn(
                  buttonVariants({
                    variant: "secondary",
                  }),
                  "mt-6 w-full bg-purple-800 text-white"
                )}
              >
                Get started today
              </Link>
            ) : (
              tier.id && <CheckoutButton />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
