import React from "react";

interface SectionHeaderProps {
  caption: string;
  titleLine1: string;
  titleLine2: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  caption,
  titleLine1,
  titleLine2,
  description,
  centered = false,
  className = "",
}) => {
  if (centered) {
    return (
      <div className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 ${className}`}>
        <span className="text-[11px] sm:text-[12px] md:text-[13px] uppercase tracking-[0.2em] md:tracking-[0.25em] font-bold text-[#6E7D9B] mb-2 sm:mb-3 block">
          {caption}
        </span>
        <h2 className="text-[#071633] text-[clamp(32px,3.5vw,52px)] font-bold leading-[1.05] md:leading-[0.98] tracking-[-0.03em] md:tracking-[-0.04em]">
          {titleLine1}
          <br />
          <span className="text-slate-500 font-light">{titleLine2}</span>
        </h2>
        {description && (
          <p className="mt-4 text-[14px] sm:text-[15px] md:text-[16px] leading-[1.75] text-slate-600 font-light max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-end mb-10 sm:mb-14 ${className}`}>
      <div className="md:col-span-7">
        <span className="text-[11px] sm:text-[12px] md:text-[13px] uppercase tracking-[0.2em] md:tracking-[0.25em] font-bold text-[#6E7D9B] mb-2 sm:mb-3 block">
          {caption}
        </span>
        <h2 className="text-[#071633] text-[clamp(32px,3.5vw,52px)] font-bold leading-[1.05] md:leading-[0.98] tracking-[-0.03em] md:tracking-[-0.04em]">
          {titleLine1}
          <br />
          <span className="text-slate-500 font-light">{titleLine2}</span>
        </h2>
      </div>
      {description && (
        <div className="md:col-span-5 flex md:justify-end mt-2 md:mt-0">
          <p className="text-[14px] sm:text-[15px] md:text-[16px] leading-[1.7] text-slate-600 font-light max-w-md">
            {description}
          </p>
        </div>
      )}
    </div>
  );
};
