import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Decrypt Data",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
