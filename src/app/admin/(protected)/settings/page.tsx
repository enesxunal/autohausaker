import { getSettings } from "@/lib/data";
import AdminSettingsForm from "@/components/admin/AdminSettingsForm";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-gold">Einstellungen / Ayarlar</h1>
      <AdminSettingsForm settings={settings} />
    </div>
  );
}
