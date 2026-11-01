import Image from "next/image";
import { cn } from "@/lib/utils";

interface FounderAvatarProps {
  /** Rendered diameter hint for next/image srcset, in px (largest size used) */
  size: number;
  className?: string;
  eager?: boolean;
  /** Empty by default — decorative next to the name */
  alt?: string;
}

// founder-about.webp is 966×742 with the face near (520, 265). The image is
// over-scaled and offset inside a round mask so the face sits centred instead
// of relying on object-position (which can't zoom).
export function FounderAvatar({ size, className, eager, alt = "" }: FounderAvatarProps) {
  return (
    <span
      className={cn(
        "relative inline-block shrink-0 overflow-hidden rounded-full bg-muted",
        className,
      )}
    >
      <Image
        src="/images/founder-about.webp"
        alt={alt}
        width={966}
        height={742}
        sizes={`${Math.round(size * 2.7)}px`}
        loading={eager ? "eager" : "lazy"}
        className="absolute max-w-none"
        style={{ width: "268%", height: "auto", left: "-94%", top: "-24%" }}
      />
    </span>
  );
}
