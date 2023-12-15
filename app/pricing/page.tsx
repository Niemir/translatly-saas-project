import ClipPath from "@/components/LandingPages/ClipPath";
import PricingCards from "@/components/LandingPages/PricingCards/PricingCards";
import React from "react";

export default function Pricing() {
  return (
    <div>
      <ClipPath />
      <div className="mx-auto max-w-2xl py-10 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-2xl sm:text-center">
          <span className="text-purple-600 dark:text-purple-300 block mb-4">
            Pricing
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-purple-50 sm:text-4xl">
            Simple no-tricks pricing
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            Choose the perfect plan for your needs.
          </p>
        </div>
      </div>
      <PricingCards redirect={true} />
    </div>
  );
}
