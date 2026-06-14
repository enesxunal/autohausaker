import { getSettings } from "@/lib/data";

export async function generateMetadata() {
  return { title: "Impressum | Autohaus AKER" };
}

export default async function ImpressumPage() {
  const settings = await getSettings();

  return (
    <div className="section-padding">
      <div className="container-narrow max-w-3xl prose-legal">
        <h1 className="text-3xl font-bold uppercase tracking-wider text-gold">Impressum</h1>

        <h2>Angaben gemäß § 5 TMG</h2>
        <p>
          {settings.company_name}<br />
          {settings.address}<br />
          Deutschland
        </p>

        <h2>Vertreten durch</h2>
        <p>Geschäftsführer: {settings.managing_director}</p>

        <h2>Kontakt</h2>
        <p>
          Telefon: {settings.phone}<br />
          E-Mail: {settings.email}
        </p>

        <h2>Umsatzsteuer-ID</h2>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
          {settings.vat_id}
        </p>

        <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
        <p>
          {settings.managing_director}<br />
          {settings.address}
        </p>

        <h2>Haftungsausschluss</h2>
        <p>
          Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
          Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
          Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten
          nach den allgemeinen Gesetzen verantwortlich.
        </p>

        <p className="text-sm italic mt-8">
          Hinweis: Handelsregister-Nummer und Amtsgericht bitte vom Geschäftsführer ergänzen lassen.
        </p>
      </div>
    </div>
  );
}
