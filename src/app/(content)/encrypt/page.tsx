import { Metadata } from "next";
import { TemplateApp } from "../component/template";

export const metadata: Metadata = {
  title: "Encrypt Data",
};
export default function Page() {
  return (
    <>
      <TemplateApp title="Encrypt" type="encrypt" />
    </>
  );
}
