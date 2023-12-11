import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Encrypt Data",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
