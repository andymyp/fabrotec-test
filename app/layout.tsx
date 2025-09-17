import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";

import { ReduxProvider } from "@/components/providers/redux-provider";
import { NuqsProvider } from "@/components/providers/nuqs-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { LoadingProvider } from "@/components/providers/loading-provider";
import { ToastProvider } from "@/components/providers/toast-provider";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fabrotec Test",
  description: "Fabrotec Frontend Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoSans.variable} ${robotoMono.variable} flex w-full min-h-screen antialiased`}
      >
        <ReduxProvider>
          <NuqsProvider>
            <QueryProvider>
              <LoadingProvider>
                <ToastProvider>{children}</ToastProvider>
              </LoadingProvider>
            </QueryProvider>
          </NuqsProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
