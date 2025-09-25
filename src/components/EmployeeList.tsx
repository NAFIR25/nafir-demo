"use client";
import React from "react";
import { employees } from "../data/employees";       // مسار نسبي آمن
import { haversineKm } from "../lib/geo";            // مسار نسبي آمن
import EmployeeMap from "./EmployeeMap";             // نفس المجلد (components)

export default function EmployeeList() {
  // موقع الطلب التجريبي (وسط جدة تقريبًا)
  const [requestPos] = React.useState({ lat: 21.54349, lng: 39.19797 });
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [filterNearest, setFilterNearest] = React.useState(true);

  const data = React.useMemo(() => {
    const enriched = employees.map((e) => ({
      ...e,
      distanceKm: haversineKm({ lat: e.lat, lng: e.lng }, requestPos),
    }));
    return filterNearest
      ? [...enriched].sort((a, b) => a.distanceKm - b.distanceKm)
      : enriched;
  }, [filterNearest, requestPos]);

  const selected = data.find((d) => d.id === selectedId) || null;

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">الموظفون</h2>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={filterNearest}
            onChange={(e) => setFilterNearest(e.target.checked)}
          />
          الأقرب أولًا
        </label>
      </div>

      <EmployeeMap
        employee={
          selected
            ? { lat: selected.lat, lng: selected.lng, name: selected.name }
            : null
        }
        request={requestPos}
        city="jeddah" // بدّل إلى "riyadh" لو تبغى
      />

      <ul className="divide-y rounded-2xl border">
        {data.map((e) => (
          <li
            key={e.id}
            className="p-3 flex items-center justify-between gap-4"
          >
            <div className="min-w-0">
              <div className="font-medium truncate">{e.name}</div>
              <div className="text-xs text-gray-500 truncate">
                التقييم: {e.rating?.toFixed(1) ?? "-"}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  e.status === "available"
                    ? "bg-green-100 text-green-800"
                    : e.status === "busy"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {e.status === "available"
                  ? "متاح"
                  : e.status === "busy"
                  ? "مشغول"
                  : "غير متصل"}
              </span>
              <span className="text-sm text-gray-600 whitespace-nowrap">
                يبعد: {e.distanceKm.toFixed(1)} كم
              </span>
              <button
                onClick={() => setSelectedId(e.id)}
                className="px-3 py-1 rounded-xl border hover:bg-gray-50"
              >
                استدعاء
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
