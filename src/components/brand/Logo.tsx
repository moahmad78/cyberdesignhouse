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

  const fullSizeClasses = {
    sm: "h-10 sm:h-12",
    md: "h-12 sm:h-14 lg:h-16",
    lg: "h-16 sm:h-20 lg:h-24",
    xl: "h-20 sm:h-28",
  };

  const isDark = theme === "dark";

  const content = (
    <div className={`flex items-center select-none ${className}`}>
      {variant === "mark" ? (
        <div className="relative flex items-center justify-center">
          <Image
            src="/images/cd-mark.png"
            alt="Cyber Design House Mark"
            width={64}
            height={64}
            className={`${sizeClasses[size]} w-auto object-contain drop-shadow-sm`}
            priority
          />
        </div>
      ) : (
        <div className="relative flex items-center justify-center">
          <Image
            src="/images/logo/image.png"
            alt="Cyber Design House - by VoometDesign"
            width={450}
            height={146}
            className={`${fullSizeClasses[size]} w-auto object-contain`}
            priority
          />
        </div>
      )}
    </div>
  );

  if (linkToHome) {
    return (
      <Link
        href="/"
        className="inline-block focus:outline-none"
        aria-label="Cyber Design House - Return to Homepage"
      >
        {content}
      </Link>
    );
  }

  return content;
};
