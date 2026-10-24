import React from "react";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "full" | "mark" | "compact";
  size?: "sm" | "md" | "lg" | "xl";
  theme?: "dark" | "light"; // "dark": white text (for hero/footer), "light": navy text (for white header/body)
  className?: string;
  linkToHome?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = "full",
  size = "md",
  theme = "light",
  className = "",
  linkToHome = true,
}) => {
  const sizeClasses = {
    sm: "h-7",
    md: "h-10",
    lg: "h-12",
    xl: "h-16",
  };

  const isDark = theme === "dark";

  const content = (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {variant === "mark" ? (
        <div className="relative flex items-center justify-center">
          <Image
            src="/images/cd-mark.png"
            alt="Cyber Design House Mark"
            width={48}
            height={48}
            className={`${sizeClasses[size]} w-auto object-contain drop-shadow-sm`}
            priority
          />
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center p-1 rounded-lg bg-white shadow-sm border border-slate-200/60">
            <Image
              src="/images/cd-mark.png"
              alt="Cyber Design House Mark"
              width={40}
              height={40}
              className={`${sizeClasses[size]} w-auto object-contain`}
              priority
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-baseline gap-1.5">
              <span
                className={`font-extrabold tracking-wider text-base sm:text-lg font-mono leading-none ${
                  isDark ? "text-white" : "text-[#071633]"
                }`}
              >
                CYBER
              </span>
              <span
                className={`font-semibold tracking-[0.2em] text-xs uppercase leading-none ${
                  isDark ? "text-slate-300" : "text-[#314158]"
                }`}
              >
                DESIGN HOUSE
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <div
                className={`h-[1px] w-2.5 ${
                  isDark ? "bg-white/70" : "bg-[#071633]"
                }`}
              />
              <span
                className={`text-[9px] uppercase tracking-[0.2em] font-medium whitespace-nowrap ${
                  isDark ? "text-slate-400" : "text-[#62748e]"
                }`}
              >
                by{" "}
                <strong
                  className={`font-bold ${
                    isDark ? "text-white" : "text-[#071633]"
                  }`}
                >
                  VOOMET
                </strong>
                DESIGN
              </span>
              <div
                className={`h-[1px] w-6 ${
                  isDark ? "bg-white/30" : "bg-slate-300"
                }`}
              />
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
        className="inline-block focus:outline-none focus:ring-2 focus:ring-[#071633]/20 rounded-lg p-0.5"
        aria-label="Cyber Design House - Return to Homepage"
      >
        {content}
      </Link>
    );
  }

  return content;
};
