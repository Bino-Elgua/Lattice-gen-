import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lattice Gen - NFT Generator",
  description: "Generate and mint NFTs on Sui blockchain",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
