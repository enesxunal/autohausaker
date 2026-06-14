import Image from "next/image";

interface BrandLogoProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  variant?: "default" | "hero" | "footer";
}

export default function BrandLogo({
  src,
  alt,
  width = 80,
  height = 48,
  className = "",
  variant = "default",
}: BrandLogoProps) {
  const variantClass =
    variant === "hero"
      ? "brand-logo brand-logo-hero"
      : variant === "footer"
        ? "brand-logo brand-logo-footer"
        : "brand-logo";

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`${variantClass} ${className}`}
      unoptimized
    />
  );
}
