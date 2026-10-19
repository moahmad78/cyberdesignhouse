"use client";

import React from "react";
import { Services3DViewer } from "@/components/3d/Services3DViewer";

interface ServiceHero3DProps {
  activeIndex: number;
}

export const ServiceHero3D: React.FC<ServiceHero3DProps> = ({ activeIndex }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Services3DViewer activeIndex={activeIndex} />
    </div>
  );
};
