import React from "react";
import LogoImage from "@/images/logos/logo.svg";
import Link from "next/link";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href={"/"}>
      <div className="flex items-center w-72 h-14">
        <AspectRatio
          ratio={16 / 9}
          className="flex items-center justify-center"
        >
          <Image priority src={LogoImage} alt="logo" className="dark:filter" />
        </AspectRatio>
      </div>
    </Link>
  );
}
