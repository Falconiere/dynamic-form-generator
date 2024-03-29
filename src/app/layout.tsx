import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { LocaleProvider } from "@/providers/LocaleProvider";
import { models } from "@/backend";
import { langs } from "@prisma/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let lang: langs = "pt";
  try {
    const user = await models.userProfiles.get();
    lang = user?.lang ?? "en";
  } catch (error) {
    console.error(error);
  }

  return (
    <html lang="en">
      <LocaleProvider defaultLang={lang}>
        <body className={inter.className} suppressHydrationWarning={true}>
          {children}
          <Toaster />
        </body>
      </LocaleProvider>
    </html>
  );
}
