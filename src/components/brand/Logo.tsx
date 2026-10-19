import React from "react";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "full" | "mark" | "compact";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  linkToHome?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = "full",
  size = "md",
  className = "",
  linkToHome = true,
}) => {
  const sizeClasses = {
    sm: "h-8",
    md: "h-11",
    lg: "h-14",
    xl: "h-20",
  };

  const content = (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {variant === "mark" ? (
        <div className="relative flex items-center justify-center">
          <Image
            src="/images/cd-mark.png"
            alt="Cyber Design House Mark"
            width={48}
            height={48}
            className={`${sizeClasses[size]} w-auto object-contain drop-shadow-[0_0_15px_rgba(56,189,248,0.35)]`}
            priority
          />
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <Image
              src="/images/cd-mark.png"
              alt="Cyber Design House Mark"
              width={44}
              height={44}
              className={`${sizeClasses[size]} w-auto object-contain drop-shadow-[0_0_12px_rgba(56,189,248,0.35)]`}
              priority
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold tracking-wider text-white text-lg sm:text-xl font-mono leading-none">
                CYBER
              </span>
              <span className="font-semibold tracking-[0.2em] text-slate-300 text-xs sm:text-sm uppercase leading-none">
                DESIGN HOUSE
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="h-[1px] w-3 bg-gradient-to-r from-transparent to-sky-400" />
              <span className="text-[9px] uppercase tracking-[0.25em] text-slate-400 font-medium whitespace-nowrap">
                by <strong className="text-sky-300 font-bold">VOOMET</strong>DESIGN
              </span>
              <div className="h-[1px] w-8 bg-gradient-to-r from-sky-400 to-transparent" />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (linkToHome) {
    return (
      <Link
        href="/"
        className="inline-block transition-transform duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-sky-400/50 rounded-lg p-1"
        aria-label="Cyber Design House - Return to Homepage"
      >
        {content}
      </Link>
    );
  }

  return content;
};
