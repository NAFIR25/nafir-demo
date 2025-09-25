"use client";
import React from "react";

type Point = { lat: number; lng: number; label?: string; color?: string };
type Bounds = { minLat: number; maxLat: number; minLng: number; maxLng: number };

function norm(v: number, vmin: number, vmax: number) {
  return (v - vmin) / Math.max(1e-9, vmax - vmin);
}

/** خريطة SVG بسيطة (وهمية) مع افتراضات الرياض إذا لم تُمرَّر props */
export default function MockMap({
  points,
  bounds,
  connectFirstTwo = true,
  title,
}: {
  points?: Point[];
  bounds?: Bounds;
  connectFirstTwo?: boolean;
  title?: string;
}) {
  // افتراضات الرياض
  const defaultCenter: Point = { lat: 24.7136, lng: 46.6753, label: "نقطة التجمّع", color: "#16a34a" };
  const defaultBounds: Bounds = {
    minLat: 24.50, maxLat: 24.90, // نطاق تقريبي يحيط بالرياض
    minLng: 46.45, maxLng: 46.95,
  };
  const defaultPoints: Point[] = [
    defaultCenter,
    { lat: 24.745, lng: 46.690, label: "أحمد" },
    { lat: 24.700, lng: 46.640, label: "سعد" },
    { lat: 24.760, lng: 46.640, label: "محمد" },
    { lat: 24.670, lng: 46.720, label: "فيصل" },
    { lat: 24.780, lng: 46.770, label: "عبدالله" },
    { lat: 24.620, lng: 46.560, label: "مازن" },
  ];

  const P = points && points.length ? points : defaultPoints;
  const B = bounds || defaultBounds;

  const W = 640, H = 320;

  const mapped = P.map((p) => {
    const x = norm(p.lng, B.minLng, B.maxLng) * W;
    const y = (1 - norm(p.lat, B.minLat, B.maxLat)) * H;
    return { ...p, x, y };
  });

  const line =
    connectFirstTwo && mapped.length >= 2
      ? { x1: mapped[0].x, y1: mapped[0].y, x2: mapped[1].x, y2: mapped[1].y }
      : null;

  return (
    <div className="w-full overflow-hidden rounded-2xl border bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
        <div>{title ? `خريطة محاكة – ${title}` : "خريطة محاكة – الرياض"}</div>
        <div>عرض تقريبي</div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-64">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="1" />
          </pattern>
        </defs>

        {/* خلفية شبكة بسيطة */}
        <rect x="0" y="0" width={W} height={H} fill="url(#grid)" />

        {/* خط بين نقطة التجمّع وأول موظف */}
        {line && (
          <line
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#64748b"
            strokeDasharray="6 6"
            strokeWidth="2"
          />
        )}

        {/* نقاط */}
        {mapped.map((p, i) => (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r={i === 0 ? 8 : 7}
              fill={p.color || (i === 0 ? "#16a34a" : "#1d4ed8")}
              stroke={i === 0 ? "#065f46" : "#1e3a8a"}
              strokeWidth={i === 0 ? 1.5 : 0.8}
            />
            {p.label && (
              <text
                x={p.x + 10}
                y={p.y - 10}
                fontSize="12"
                fill="#111827"
                style={{ userSelect: "none" }}
              >
                {p.label}
              </text>
            )}
          </g>
        ))}

        <rect x="0" y="0" width={W} height={H} fill="none" stroke="#cbd5e1" />
      </svg>

      <div className="px-4 pb-3 text-xs text-gray-500 dark:text-gray-400">
        عرض تقريبي دون خرائط خارجية.
      </div>
    </div>
  );
}
