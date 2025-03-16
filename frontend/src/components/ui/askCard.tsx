"use client";
import { ArrowUp, LoaderPinwheel } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { useState } from "react";
import { FactChecking } from "./factChecking";

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
      const outputIndex = outputs.length;
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

      const contentType = response.headers.get("Content-Type");
      if (contentType?.includes("application/json")) {
        const data = (await response.json()) as {
          response: string;
          cached: boolean;
        };
        // console.log(data);
        setOutputs((prev) => {
          const updated = [...prev];
          updated[outputIndex] = data.response;
          return updated;
        });
      } else {
        const reader = response.body?.getReader();
        if (!reader) throw new Error("Reader non disponibile");
        let accumulatedText = "";

        const decoder = new TextDecoder();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          /*
          console.log(chunk); // Errore: Viene direttamente mostrato tutto il testo

          Test Backend andato a buon fine:            
            curl -N -X POST -H "Content-Type: application/json" -d '{"query": "test"}' http://localhost:5000/generate
          Note:
            Le parole si visualizzano una dopo l'altra.

            Molto probabilmente il problema è nella gestione dei stream lato frontend con next.js
            Source: https://sdk.vercel.ai/docs/reference/ai-sdk-core/stream-text#streamtext
          */

          accumulatedText += chunk;

          setOutputs((prev) => {
            const updated = [...prev];
            updated[outputIndex] = accumulatedText;
            return updated;
          });
        }
      }
    } catch (error) {
      console.error("Errore nel fetch:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex w-full flex-col items-center"
      style={{
        maxHeight: "calc(100svh - 50px)",
      }}
    >
      {/* chat: mostra le conversazioni */}
      <div className="w-screen flex-1 overflow-y-auto px-2 py-4 lg:px-0">
        <div className="ml-auto mr-auto flex max-w-2xl flex-col gap-4">
          {queries.map((queryText, i) => (
            <div
              key={`conversation-${i}`}
              className="block w-full justify-between space-y-2"
            >
              {/* Query a destra */}
              <div className="ml-auto w-fit max-w-[80%] rounded-2xl bg-zinc-700 p-4 text-right">
                <p>{queryText}</p>
              </div>
              {/* Risposta a sinistra */}
              {outputs[i] && (
                <div className="flex w-fit max-w-[80%] flex-col rounded-2xl bg-zinc-800 p-4 gap-2">
                  <p>{outputs[i]}</p>
                  <div className="flex justify-end">
                    <FactChecking />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* form: scrivi una domanda */}
      <div className="flex w-full justify-center md:pb-2">
        <div className="flex w-full max-w-3xl flex-col gap-2 bg-zinc-800 p-4 md:rounded-2xl">
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
    </div>
  );
}
