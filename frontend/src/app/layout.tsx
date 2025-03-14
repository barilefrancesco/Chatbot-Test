import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Datapizza",
  description: "Chatbot for Datapizza",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-900 text-white">
          <div className="absolute top-0 w-full py-2 text-center font-semibold text-white/90">
            🍕 Datapizza
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
