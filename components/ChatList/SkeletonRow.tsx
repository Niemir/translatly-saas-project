import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function SkeletonRow() {
  return (
    <div className="flex p-5 items-center space-x-2">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
}
