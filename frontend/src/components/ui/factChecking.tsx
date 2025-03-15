"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { type FactCheck } from "@/lib/types";
import { DialogClose } from "@radix-ui/react-dialog";
import { SearchCheck } from "lucide-react";
import { useState } from "react";

export function FactChecking() {
  const [documents, setDocuments] = useState<FactCheck | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchDocuments() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/documents");
      const data = (await res.json()) as FactCheck;
      setDocuments(data);
    } catch (error) {
      console.error("Errore nel recupero dei documenti:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={fetchDocuments} className="rounded-full text-xs">
          <SearchCheck className="h-2 w-2" /> Verifica
        </Button>
      </DialogTrigger>
      <DialogContent className="border-0 bg-zinc-800 text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ecco a te la lista dei documenti</DialogTitle>
          <DialogDescription>
            Qui puoi controllare le risorse utilizzate per la risposta.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {isLoading ? (
            <p>Caricamento in corso...</p>
          ) : documents?.documents.length ? (
            documents.documents.map((document) => (
              <div key={document.title} className="rounded-lg bg-zinc-900 p-4">
                <p>{document.title}</p>
                <p>{document.content}</p>
              </div>
            ))
          ) : (
            <p>Nessun documento disponibile.</p>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">
              Chiudi
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
