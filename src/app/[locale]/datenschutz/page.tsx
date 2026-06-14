import { getSettings } from "@/lib/data";

export async function generateMetadata() {
  return { title: "Datenschutz | Autohaus AKER" };
}

export default async function DatenschutzPage() {
  const settings = await getSettings();

  return (
    <div className="section-padding">
      <div className="container-narrow max-w-3xl prose-legal">
        <h1 className="text-3xl font-bold uppercase tracking-wider text-gold">
          Datenschutzerklärung
        </h1>

        <h2>1. Verantwortlicher</h2>
        <p>
          {settings.company_name}<br />
          {settings.address}<br />
          E-Mail: {settings.email}
        </p>

        <h2>2. Erhebung und Speicherung personenbezogener Daten</h2>
        <p>
          Beim Besuch unserer Website werden automatisch Informationen allgemeiner Natur erfasst
          (Server-Logfiles). Diese umfassen Browsertyp, verwendetes Betriebssystem, Referrer-URL,
          Hostname des zugreifenden Rechners und Uhrzeit der Serveranfrage.
        </p>

        <h2>3. Kontaktformular und Angebotsanfragen</h2>
        <p>
          Wenn Sie uns per Kontaktformular oder „Auto verkaufen"-Formular Anfragen zukommen lassen,
          werden Ihre Angaben aus dem Formular inklusive der von Ihnen dort angegebenen
          Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns
          gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
        </p>

        <h2>4. Cookies</h2>
        <p>
          Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Endgerät
          gespeichert werden. Sie können die Speicherung von Cookies in Ihren Browser-Einstellungen
          deaktivieren.
        </p>

        <h2>5. Ihre Rechte</h2>
        <p>Sie haben das Recht auf:</p>
        <ul>
          <li>Auskunft über Ihre gespeicherten personenbezogenen Daten</li>
          <li>Berichtigung unrichtiger Daten</li>
          <li>Löschung Ihrer Daten</li>
          <li>Einschränkung der Verarbeitung</li>
          <li>Datenübertragbarkeit</li>
          <li>Widerspruch gegen die Verarbeitung</li>
        </ul>

        <h2>6. Hosting</h2>
        <p>
          Diese Website wird bei Vercel Inc. gehostet. Weitere Informationen finden Sie in der
          Datenschutzerklärung von Vercel.
        </p>
      </div>
    </div>
  );
}
