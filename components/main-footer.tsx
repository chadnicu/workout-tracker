import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

export default function MainFooter() {
  const className = cn(
    buttonVariants({ variant: "link", fontSize: "md" }),
    "-ml-3 -mr-4"
  );

  return (
    <footer className="p-5 sm:text-center border-t">
      <h3 className="tracking-tight">
        Made by
        <Link href="https://twitter.com/iusedebian" className={className}>
          iusedebian
        </Link>
        . <br className="sm:hidden" />
        Source code is available on
        <Link
          href="https://github.com/iusedebian/workout-tracker"
          className={className}
        >
          GitHub
        </Link>
        .
      </h3>
    </footer>
  );
}
