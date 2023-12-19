import React from "react";
import ClipPath from "../ClipPath";
import Link from "next/link";
import { buttonVariants } from "../../ui/button";

export default function Hero() {
  return (
    <div>
      <ClipPath />
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className=" text-4xl font-bold tracking-tight text-gray-900 dark:text-purple-50 sm:text-6xl">
            Global Conversations <br />
            in every Language!
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            Let ai help you talk to anyone.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/chat" className={buttonVariants()}>
              Get started
            </Link>
            <Link
              href="/pricing"
              className={buttonVariants({ variant: "outline" })}
            >
              View Pricing{" "}
              <span aria-hidden="true" className="pl-2">
                {"->"}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
