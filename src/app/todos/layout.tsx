import MainLayout from "@/components/layout/main-layout";

export default function TodosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
} 