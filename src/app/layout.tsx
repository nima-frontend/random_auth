import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "random auth",
  description: "Dashboard test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
