import { AdminAuthLayout } from "@/lib/admin-auth-layout";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminAuthLayout>{children}</AdminAuthLayout>;
}
