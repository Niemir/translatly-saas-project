import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  name?: string | null;
  image?: string | null;
  className?: string;
};
export default function UserAvatar({ name, image, className }: Props) {
  return (
    <Avatar className={cn("bg-white text-black", className)}>
      {image && (
        <Image
          src={image}
          alt={name || ""}
          width={40}
          height={40}
          className="rounded-full"
          referrerPolicy="no-referrer"
        />
      )}
      <AvatarFallback className="dark:bg-white dark:text-black text-lg">
        {name
          ?.split(" ")
          .slice(0, 2)
          .map((n) => n[0])
          .join("")
          .toLocaleUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
