import { fetchAdminSellRequests } from "@/lib/admin-sell-requests";
import AdminSellRequestsList from "@/components/admin/AdminSellRequestsList";

export default async function AdminSellRequestsPage() {
  const { requests, error } = await fetchAdminSellRequests();

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-gold">Verkaufsanfragen / Satış Talepleri</h1>
      <AdminSellRequestsList initialRequests={requests} loadError={error} />
    </div>
  );
}
