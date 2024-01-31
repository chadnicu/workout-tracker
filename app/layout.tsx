import "@/styles/globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { GeistSans } from "geist/font/sans";
import MainNavbar from "@/components/main-nav";
import MainFooter from "@/components/main-footer";
import ClerkProvider from "@/components/clerk-provider";
import { TanstackQueryProvider } from "@/components/query-provider";
import { ScrollArea } from "@/components/ui/scroll-area";

// remove if no need for inter
// import { Inter as FontSans } from "next/font/google";
// export const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

export const metadata: Metadata = {
  title: "Change this later",
  description: "This too",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <ScrollArea className="h-screen w-screen no-padding">
          <ClerkProvider className="min-h-screen flex flex-col justify-between bg-background antialiased leading-tight lg:leading-[1.1] gap-10">
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <TanstackQueryProvider>
                <MainNavbar />
                <main className="sm:container px-[0.9rem]">{children}</main>
                <MainFooter />
              </TanstackQueryProvider>
            </ThemeProvider>
          </ClerkProvider>
        </ScrollArea>
      </body>
    </html>
  );
}
