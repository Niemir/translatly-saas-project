import React from "react";
import { Button } from "./ui/button";
import { generatePortalLink } from "@/actions/generatePortalLink";

export default function ManageAccountButton() {
  return (
    <>
      <form action={generatePortalLink}>
        <button type="submit" className="w-full">
          Manage billing
        </button>
      </form>
    </>
  );
}
