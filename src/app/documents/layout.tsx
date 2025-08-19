import MainLayout from "@/components/layout/main-layout";

export default function DocumentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
} 