import { cn } from "@/lib/utils";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "../lib/providers";
import Navbar from "@/components/Navbar";
import { db } from "@/lib/turso";
import { session } from "@/lib/schema";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessions: { title: string; href: number; description: string }[] =
    await db
      .select()
      .from(session)
      .all()
      .then((data) =>
        data.map((s) => ({
          title: s.title,
          href: s.id,
          description: s.description || "",
        }))
      );

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn(inter.className, "tracking-tight")}>
          <ThemeProvider enableSystem attribute="class" defaultTheme="system">
            <Providers>
              <div className="min-h-screen p-3">
                <Navbar sessions={sessions} />
                {children}
              </div>
            </Providers>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
