import React from "react";

interface SectionHeaderProps {
  caption: string;
  titleLine1: string;
  titleLine2?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  caption,
  titleLine1,
  titleLine2,
  description,
  children,
  className = "",
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-end mb-10 sm:mb-14 ${className}`}>
      {/* Left Column: Caption + Two-Tone Heading */}
      <div className="md:col-span-6 lg:col-span-7">
        <span className="text-[11px] sm:text-[12px] md:text-[13px] uppercase tracking-[0.2em] md:tracking-[0.25em] font-bold text-[#6E7D9B] mb-2 sm:mb-3 block">
          {caption}
        </span>
        <h2 className="text-[#071633] text-[clamp(32px,3.5vw,52px)] font-bold leading-[1.05] md:leading-[0.98] tracking-[-0.03em] md:tracking-[-0.04em]">
          {titleLine1}
          {titleLine2 && (
            <>
              <br />
              <span className="text-slate-500 font-light">{titleLine2}</span>
            </>
          )}
        </h2>
      </div>

      {/* Right Column: Description or Action/Pills (VoometDesign Left-Right Split) */}
      {(description || children) && (
        <div className="md:col-span-6 lg:col-span-5 flex md:justify-start lg:justify-end mt-3 md:mt-0">
          {children ? (
            children
          ) : (
            <p className="text-[14px] sm:text-[15px] md:text-[16px] leading-[1.7] text-slate-600 font-light max-w-md">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
