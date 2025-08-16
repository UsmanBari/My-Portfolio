import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StarsCanvas from "@/components/main/StarBackground";
import Navbar from "@/components/main/Navbar";
import Footer from "@/components/main/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Usman Bari | Portfolio",
  description: "Explore the portfolio of Usman Bari, a Computer Science student with a focus on modern front-end web development and C++ game programming. Discover projects, skills, and contact information.",
  keywords: ["Usman Bari", "portfolio", "web development", "front-end", "C++", "programming", "FAST NUCES", "React", "Next.js", "JavaScript", "software developer"],
  authors: [{ name: "Usman Bari" }],
  viewport: "width=device-width, initial-scale=1.0",
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💻</text></svg>',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#030014] overflow-y-scroll overflow-x-hidden`}
      >
        <StarsCanvas />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}