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
        <main className="flex min-h-screen flex-col items-center justify-between bg-zinc-900 text-white">
          <div className="top-0 h-[50px] w-full text-center font-semibold text-white/90 shadow-md flex items-center justify-center">
            <p>🍕 Datapizza</p>
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
