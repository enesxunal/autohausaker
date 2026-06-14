interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`mb-16 max-w-3xl ${alignClass}`}>
      {label && (
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] gold-gradient-text">
          {label}
        </p>
      )}
      <div className={`flex items-center gap-4 ${align === "center" ? "justify-center" : ""}`}>
        {align === "center" && <div className="gold-line-h hidden w-16 md:block" />}
        <h2 className="font-display text-3xl font-semibold uppercase tracking-[0.12em] md:text-4xl lg:text-5xl">
          <span className="gold-gradient-text">{title}</span>
        </h2>
        {align === "center" && <div className="gold-line-h hidden w-16 md:block" />}
      </div>
      {subtitle && (
        <p className={`mt-5 text-base leading-relaxed text-muted md:text-lg ${alignClass}`}>
          {subtitle}
        </p>
      )}
      <div className={`gold-line-h mt-8 ${align === "center" ? "mx-auto w-24" : "w-24"}`} />
    </div>
  );
}
