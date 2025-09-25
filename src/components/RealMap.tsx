"use client";

import dynamic from "next/dynamic";
import React from "react";
import ClientOnly from "./ClientOnly";

const RealMapInner = dynamic(() => import("./RealMapInner"), { ssr: false });

type Employee = { name: string; lat: number; lng: number };
type RequestPos = { lat: number; lng: number; title?: string };

export default function RealMap(props: {
  employees: Employee[];
  request?: RequestPos;
  cityCenter?: [number, number];
  zoom?: number;
  tilesUrl?: string;
}) {
  return (
    <ClientOnly>
      <RealMapInner {...props} />
    </ClientOnly>
  );
}
