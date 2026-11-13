import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["400", "500"] });
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Scoped: know what to prepare",
  description: "A triage coach for last-minute interview prep. Know what to prepare. Skip the rest.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${instrument.variable} font-sans antialiased`}>
        <div aria-hidden className="blob" style={{ width: 340, height: 340, background: "#D8CCFF", top: -80, right: -100 }} />
        <div aria-hidden className="blob" style={{ width: 300, height: 300, background: "#CFE0FF", bottom: 60, left: -120 }} />
        <div aria-hidden className="blob" style={{ width: 200, height: 200, background: "#FDE3DC", top: 30, left: -60, opacity: 0.7 }} />
        <main className="relative z-10 mx-auto min-h-screen w-full max-w-[480px] px-5 pb-32 pt-8">{children}</main>
      </body>
    </html>
  );
}
