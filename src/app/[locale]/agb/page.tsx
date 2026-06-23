import { getSettings } from "@/lib/data";

export async function generateMetadata() {
  return { title: "AGB | Autohaus AKER" };
}

export default async function AgbPage() {
  const settings = await getSettings();

  return (
    <div className="section-padding">
      <div className="container-narrow max-w-3xl prose-legal">
        <h1 className="text-3xl font-bold uppercase tracking-wider text-gold">
          Allgemeine Geschäftsbedingungen (AGB)
        </h1>

        <h2>§ 1 Geltungsbereich</h2>
        <p>
          Diese Allgemeinen Geschäftsbedingungen gelten für alle Geschäftsbeziehungen zwischen
          {settings.company_name} ({settings.address}) und dem Kunden.
        </p>

        <h2>§ 2 Vertragsschluss</h2>
        <p>
          Die Darstellung der Fahrzeuge auf unserer Website stellt kein rechtlich bindendes Angebot
          dar. Erst nach individueller Beratung und schriftlicher Bestätigung kommt ein Vertrag
          zustande.
        </p>

        <h2>§ 3 Fahrzeugimport aus Korea</h2>
        <p>
          {settings.company_name} erbringt Beratungs- und Vermittlungsleistungen beim Import von
          Fahrzeugen aus Korea. Die voraussichtliche Bearbeitungszeit beträgt 8–12 Wochen ab
          Vertragsabschluss. Transport und Verzollung werden im Rahmen unserer
          Unterstützungsleistung organisiert und begleitet; der Import erfolgt in Ihrem Namen als
          Kunde, sofern nicht anders vereinbart.
        </p>

        <h2>§ 4 Preise und Zahlung</h2>
        <p>
          Alle Preise verstehen sich in Euro und inklusive der gesetzlichen Mehrwertsteuer, sofern
          nicht anders angegeben. Die Zahlungsmodalitäten werden individuell vereinbart.
        </p>

        <h2>§ 5 Gewährleistung</h2>
        <p>
          Es gelten die gesetzlichen Gewährleistungsrechte. Bei Importfahrzeugen können
          abweichende Regelungen gelten — diese werden im Einzelfall besprochen und dokumentiert.
        </p>

        <h2>§ 6 An- und Verkaufsvermittlung</h2>
        <p>
          Anfragen über unser „Auto verkaufen"-Formular sind unverbindlich. {settings.company_name}{" "}
          vermittelt den An- und Verkauf von Fahrzeugen. Ein verbindliches Angebot erfolgt erst nach
          Begutachtung des Fahrzeugs.
        </p>

        <h2>§ 7 Schlussbestimmungen</h2>
        <p>
          Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist Köln, sofern der Kunde
          Kaufmann ist.
        </p>

        <p className="text-sm italic mt-8">
          Stand: {new Date().getFullYear()} — {settings.company_name}
        </p>
      </div>
    </div>
  );
}
