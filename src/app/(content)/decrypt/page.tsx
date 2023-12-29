import { Metadata } from "next";
import { TemplateApp } from "../component/template";
export const metadata: Metadata = {
  title: "Decrypt Data",
};

export default function Page() {
  return (
    <>
      <TemplateApp title="Decrypt" type="decrypt" />
    </>
  );
}
