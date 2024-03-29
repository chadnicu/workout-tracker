import Templates from "./Templates";
import TemplateForm from "@/components/TemplateForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Templates",
};

export default function Page() {
  return (
    <>
      <h1 className="text-center text-5xl font-bold">Templates</h1>
      <div className="grid place-items-center gap-10 md:flex md:flex-row-reverse md:place-items-start md:justify-between">
        <TemplateForm />
        <Templates />
      </div>
    </>
  );
}
