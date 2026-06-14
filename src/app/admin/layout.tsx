import { AdminLocaleProvider } from "@/components/admin/AdminLocaleProvider";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminLocaleProvider>
      <div className="flex min-h-screen bg-background">{children}</div>
    </AdminLocaleProvider>
  );
}
