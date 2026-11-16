import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AGILE-PMIS | Zamfara State",
  description: "Adolescent Girls Initiative for Learning and Empowerment Programme Management Information System"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
