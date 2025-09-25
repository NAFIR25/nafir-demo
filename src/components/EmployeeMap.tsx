"use client";
import React from "react";
import MockMap from "./MockMap";

const BOUNDS = {
  jeddah: { minLat: 21.35, maxLat: 21.75, minLng: 39.05, maxLng: 39.35 },
  riyadh: { minLat: 24.50, maxLat: 25.10, minLng: 46.40, maxLng: 47.10 },
};

export default function EmployeeMap({
  employee,
  request,
  city = "jeddah",
}: {
  employee: { lat: number; lng: number; name: string } | null;
  request: { lat: number; lng: number } | null;
  city?: "jeddah" | "riyadh";
}) {
  // لو ما فيه توكن: نعرض خريطة محاكية فقط
  const points = [
    employee
      ? { lat: employee.lat, lng: employee.lng, label: employee.name, color: "#1d4ed8" }
      : null,
    request
      ? { lat: request.lat, lng: request.lng, label: "Request", color: "#10b981" }
      : null,
  ].filter(Boolean) as any[];

  return (
    <MockMap
      points={points}
      bounds={BOUNDS[city]}
      connectFirstTwo
      title={city === "jeddah" ? "جدة" : "الرياض"}
    />
  );
}
