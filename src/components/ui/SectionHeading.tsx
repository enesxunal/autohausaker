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
    <div className={`mb-10 max-w-3xl overflow-visible md:mb-16 ${alignClass}`}>
      {label && (
        <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.3em] gold-gradient-text md:mb-4 md:text-[10px] md:tracking-[0.4em]">
          {label}
        </p>
      )}
      <div
        className={`flex flex-wrap items-baseline gap-x-3 gap-y-2 md:gap-x-4 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        {align === "center" && <div className="gold-line-h hidden w-16 shrink-0 md:block" />}
        <h2 className="font-display text-2xl font-semibold uppercase leading-[1.15] tracking-[0.08em] sm:text-3xl md:text-4xl md:tracking-[0.12em] lg:text-5xl">
          <span className="gold-gradient-text">{title}</span>
        </h2>
        {align === "center" && <div className="gold-line-h hidden w-16 shrink-0 md:block" />}
      </div>
      {subtitle && (
        <p className={`mt-4 text-sm leading-relaxed text-muted md:mt-5 md:text-lg ${alignClass}`}>
          {subtitle}
        </p>
      )}
      <div className={`gold-line-h mt-6 md:mt-8 ${align === "center" ? "mx-auto w-20 md:w-24" : "w-20 md:w-24"}`} />
    </div>
  );
}
