import React from "react";

type Props = {
  params: {};
  searchParams: {
    error: string;
  };
};
export default function ChatPage({ searchParams: { error } }: Props) {
  return <div>page single</div>;
}
