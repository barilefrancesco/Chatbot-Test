"use client";
import { ArrowUp, LoaderPinwheel } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { useState } from "react";

export default function AskCard() {
  const [query, setQuery] = useState("");
  const [queries, setQueries] = useState<string[]>([]);
  const [outputs, setOutputs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setIsLoading(true);
      
      const currentQuery = query;
      setQueries((prev) => [...prev, currentQuery]);
      setOutputs((prev) => [...prev, ""]);
      setQuery("");

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: currentQuery }),
      });

      const reader = response.body?.getReader();
      if (reader) {
        const outputIndex = outputs.length;
        let accumulatedText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = new TextDecoder().decode(value);
          console.log("Received chunk:", chunk);

          accumulatedText += chunk;

          setOutputs((prev) => {
            const updated = [...prev];
            updated[outputIndex] = accumulatedText;
            return updated;
          });
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-[(100dvh - 30px)] mx-auto flex w-full max-w-[1140px] flex-1 flex-col items-center justify-between gap-2 p-4">
      <div className="w-full flex-1 overflow-auto">
        <div className="flex flex-col gap-4">
          {queries.map((queryText, i) => (
            <div
              key={`conversation-${i}`}
              className="block w-full justify-between space-y-2"
            >
              {/* Query a destra */}
              <div className="ml-auto w-fit max-w-[80%] rounded-2xl bg-zinc-700 p-4 text-right">
                {queryText}
              </div>
              {/* Risposta a sinistra */}
              {outputs[i] && (
                <div className="w-fit max-w-[80%] rounded-2xl bg-zinc-800 p-4">
                  {outputs[i]}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full max-w-xl flex-col gap-2 rounded-2xl bg-zinc-800 p-4">
        <form onSubmit={onSubmit}>
          <Input
            placeholder="Scrivi la tua domanda"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="mt-2 flex items-center justify-end">
            <Button
              className="rounded-full bg-zinc-950 p-3 text-white"
              type="submit"
              disabled={!query.trim() || isLoading}
            >
              {isLoading ? (
                <LoaderPinwheel className="h-10 w-10 animate-spin" />
              ) : (
                <ArrowUp className="h-10 w-10" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
