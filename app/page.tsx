import Link from "next/link";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ImageResponse } from "next/og";

new ImageResponse(<Page />, {
  width: 1200,
  height: 630,
});

export default function Page() {
  return (
    <div className="mb-20 break-words text-center font-bold sm:mb-10">
      <h1 className="pl-2 text-6xl tracking-[-3px] sm:text-7xl md:text-8xl">
        Train
        <span className="text-primary-gradient pr-2">Sync</span>
      </h1>
      <h2 className="mt-7 text-2xl tracking-tighter sm:mt-0 sm:text-3xl md:text-4xl">
        Stop
        <span className="text-primary-gradient"> guessing</span>,{" "}
        <br className="sm:hidden" />
        start
        <span className="text-primary-gradient"> progressing</span>.
      </h2>
      <h4 className="absolute inset-x-0 bottom-4 mx-auto flex w-fit items-center justify-center text-lg sm:bottom-7 sm:text-xl md:text-2xl">
        by&nbsp;
        <Link
          href={"https://github.com/iusedebian/workout-tracker"}
          className="hover-text-primary-gradient flex items-center justify-center gap-1"
          target="/blank"
        >
          iusedebian
          <GitHubLogoIcon className="text-foreground" height={28} width={28} />
        </Link>
      </h4>
    </div>
  );
}
