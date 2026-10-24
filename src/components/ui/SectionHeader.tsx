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
        <span className="font-heading text-[13px] sm:text-[14px] md:text-[15px] uppercase tracking-[0.2em] font-[900] text-[#3b4c68] mb-2 sm:mb-2.5 block">
          {caption}
        </span>
        <h2 className="font-heading text-[#071633] text-[clamp(34px,3.5vw,52px)] font-[700] leading-[1.02] md:leading-[0.95] tracking-[-0.04em]">
          {titleLine1}
          {titleLine2 && (
            <>
              <br />
              <span className="text-slate-600 font-normal">{titleLine2}</span>
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
            <p className="text-[15px] sm:text-[16px] md:text-[17px] leading-[1.75] text-[#314158] font-normal max-w-lg">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
