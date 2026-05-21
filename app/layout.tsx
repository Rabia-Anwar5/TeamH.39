import type { Metadata } from "next";
import { Quicksand, Comfortaa } from "next/font/google";
import "./globals.css";
import { StudyProvider } from "@/app/context/StudyContext";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "✨ Study Buddy 💖 - AI Learning Assistant",
  description: "Learn effectively with AI-generated flashcards, quizzes, and progress tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${quicksand.variable} ${comfortaa.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-amber-50/10">
        <StudyProvider>
          {children}
        </StudyProvider>
      </body>
    </html>
  );
}
