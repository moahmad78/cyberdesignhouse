"use client";

import React from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const RoamingCrystalShard = dynamic(
  () => import("@/components/3d/RoamingCrystalShard").then((mod) => mod.RoamingCrystalShard),
  { ssr: false }
);

export const GlobalFloatingShard: React.FC = () => {
  const pathname = usePathname();

  // Passing key={pathname} causes a fresh dramatic header emergence on route transition
  return <RoamingCrystalShard key={pathname} />;
};
