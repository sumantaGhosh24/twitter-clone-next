import type {Metadata} from "next";
import {Inter} from "next/font/google";

import "./globals.css";
import AuthProvider from "@/components/auth-provider";
import {Toaster} from "@/components/ui/toaster";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: {
    default: "Twitter Clone",
    template: "%s | Twitter Clone",
  },
  description: "this is a twitter clone for only tutorial purpose.",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <main>{children}</main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
