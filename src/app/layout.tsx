import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Intro } from "@/components/intro/Intro";
import { INTRO_GATE_SCRIPT } from "@/components/intro/intro-gate";
import { profile } from "@/content/profile";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.location}`,
  description: profile.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-intro is written by the inline gate script before hydration.
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_GATE_SCRIPT }} />
        {/* Without JS there is no intro: show the page, hide the overlay. */}
        <noscript>
          <style>{`.intro-root{display:none}.reveal,.scroll-reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col">
        <Intro />
        {children}
      </body>
    </html>
  );
}
