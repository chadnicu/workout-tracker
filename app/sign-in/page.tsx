"use client";

import { buttonVariants } from "@/components/ui/button";
import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function SignInPage() {
  const { theme } = useTheme();

  return (
    <div className="flex w-full justify-center">
      <SignIn
        appearance={{
          baseTheme: theme === "light" ? undefined : dark,
          elements: authElements,
        }}
      />
    </div>
  );
}

export const authElements = {
  formButtonPrimary: buttonVariants(),
  formFieldLabel: "text-foreground",
  formField: "gap-1",
  card: "bg-background dark:border-zinc-700",
  socialButtonsIconButton__google:
    "border border-zinc-200 dark:border-zinc-700",
  socialButtonsIconButton__github:
    "border border-zinc-200 dark:border-zinc-700",
  socialButtonsIconButton__discord:
    "border border-zinc-200 dark:border-zinc-700",
  dividerLine: "bg-zinc-200 dark:bg-zinc-700",
  footerActionLink: "text-foreground hover:text-foreground",
};
