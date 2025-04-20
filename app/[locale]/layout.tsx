import "@mantine/core/styles.css";
import "./globals.scss";
import "@mantine/dates/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";
import { ThemeProvider } from "@/contexts/theme";
import { Notifications } from "@mantine/notifications";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NPP",
  description: "",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <ColorSchemeScript />
      </head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />
      <body className={inter.className}>
        <MantineProvider theme={undefined}>
          <ThemeProvider>
            <NextIntlClientProvider messages={messages}>
              <Header />
              <Notifications />
              {children}
              <Footer />
            </NextIntlClientProvider>
          </ThemeProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
