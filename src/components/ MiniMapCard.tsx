"use client";

import RealMapInner from "./RealMapInner";

const demoEmployees = [
  { name: "أحمد",  lat: 24.717, lng: 46.690 },
  { name: "عبدالله", lat: 24.705, lng: 46.670 },
  { name: "محمد",  lat: 24.725, lng: 46.660 },
  { name: "سعيد",  lat: 24.700, lng: 46.692 },
  { name: "وليد",  lat: 24.730, lng: 46.678 },
  { name: "خالد",  lat: 24.710, lng: 46.650 },
];

const request = {
  lat: 24.7136,
  lng: 46.6753,
  title: "نقطة التجمّع",
};

export default function MiniMapCard() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-4 border border-black/5 dark:border-white/10">
      <div className="mb-2 text-sm text-gray-600 dark:text-gray-300">
        خريطة مصغّرة — توزيع الموظفين والمسافة إلى نقطة التجمّع
      </div>
      <RealMapInner
        employees={demoEmployees}
        request={request}
        zoom={12}
        className="h-56 w-full rounded-xl overflow-hidden"
      />
    </div>
  );
}
