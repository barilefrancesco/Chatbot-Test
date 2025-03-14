"use client";
import { ArrowUp } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { useState } from "react";

export default function AskCard() {
  const [query, setQuery] = useState("");
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit", query);
  };

  return (
    <div className="flex w-full max-w-xl flex-col gap-2 rounded-2xl bg-zinc-800 p-4">
      <form onSubmit={onSubmit}>
        <Input
          type="query"
          placeholder="Scrivi la tua domanda"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="flex items-center justify-end">
          <Button className="rounded-full bg-zinc-950 p-3 text-white">
            <ArrowUp className="h-10 w-10" />
          </Button>
        </div>
      </form>
    </div>
  );
}
