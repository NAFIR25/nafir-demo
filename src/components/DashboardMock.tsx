"use client";

import React from "react";
import MockMap from "./MockMap";

export default function DashboardMock() {
  const Row = ({
    name,
    status,
    eta,
    distance,
    color,
  }: { name: string; status: string; eta?: string; distance?: string; color: string }) => (
    <div className="flex items-center justify-between rounded-xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-3">
      <div className="flex items-center gap-3">
        <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
        <div className="font-medium">{name}</div>
      </div>
      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
        {distance && <span>📍 {distance}</span>}
        {eta && <span>⏱ {eta}</span>}
        <span className="px-2 py-0.5 rounded-lg bg-gray-100 dark:bg-white/10">{status}</span>
      </div>
    </div>
  );

  // نقاط وباوندز الرياض للخريطة المصغّرة
  const riyadhBounds = { minLat: 24.50, maxLat: 24.90, minLng: 46.45, maxLng: 46.95 };
  const riyadhPoints = [
    { lat: 24.7136, lng: 46.6753, label: "نقطة التجمّع", color: "#16a34a" },
    { lat: 24.745, lng: 46.690, label: "أحمد" },
    { lat: 24.700, lng: 46.640, label: "سعد" },
    { lat: 24.760, lng: 46.640, label: "محمد" },
    { lat: 24.670, lng: 46.720, label: "فيصل" },
  ];

  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-bold">لوحة المتابعة (عينة)</h3>
        <div className="flex gap-2 text-xs">
          <span className="px-2 py-1 rounded-lg bg-green-100 text-green-700">متصل</span>
          <span className="px-2 py-1 rounded-lg bg-yellow-100 text-yellow-700">في الطريق</span>
          <span className="px-2 py-1 rounded-lg bg-red-100 text-red-700">غير متاح</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* قائمة الموظفين */}
        <div className="lg:col-span-2 space-y-3">
          <Row name="أحمد الدوسري" status="في الطريق" eta="10 د" distance="2.8 كم" color="bg-yellow-500" />
          <Row name="سعد بن عبدالله" status="متاح" distance="1.3 كم" color="bg-green-500" />
          <Row name="محمد بن فهد" status="غير متاح" color="bg-red-500" />
          <Row name="فيصل العتيبي" status="تم الاستلام" eta="15 د" color="bg-blue-500" />
        </div>

        {/* خريطة مصغّرة — مثبّتة على الرياض */}
        <div className="h-52">
          <MockMap
            title="الرياض"
            points={riyadhPoints}
            bounds={riyadhBounds}
            connectFirstTwo
          />
        </div>
      </div>

      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        عرض تجريبي – بدون بيانات حقيقية.
      </p>
    </div>
  );
}
