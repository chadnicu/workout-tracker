import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ReactNode, Suspense } from "react";

export function ClerkAsyncProvider({ children }: { children: ReactNode }) {
  const fallback = (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="mb-4 h-12 w-12 animate-spin">
        <svg
          className="h-full w-full text-primary"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="12" x2="12" y1="2" y2="6" />
          <line x1="12" x2="12" y1="18" y2="22" />
          <line x1="4.93" x2="7.76" y1="4.93" y2="7.76" />
          <line x1="16.24" x2="19.07" y1="16.24" y2="19.07" />
          <line x1="2" x2="6" y1="12" y2="12" />
          <line x1="18" x2="22" y1="12" y2="12" />
          <line x1="4.93" x2="7.76" y1="19.07" y2="16.24" />
          <line x1="16.24" x2="19.07" y1="7.76" y2="4.93" />
        </svg>
      </div>
      <p className="text-lg font-medium text-foreground">
        Loading, please wait...
      </p>
    </div>
  );

  return (
    <Suspense fallback={fallback}>
      <ClerkProvider
        appearance={{
          baseTheme: dark,
        }}
      >
        {children}
      </ClerkProvider>
    </Suspense>
  );
}