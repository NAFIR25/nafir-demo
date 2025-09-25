"use client";

import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  CircleMarker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

// إصلاح أيقونات Leaflet مع Next/Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// حساب المسافة بالكيلومتر (Haversine)
function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const la1 = (a.lat * Math.PI) / 180;
  const la2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return R * (2 * Math.asin(Math.sqrt(h)));
}

type Employee = { name: string; lat: number; lng: number };
type RequestPos = { lat: number; lng: number; title?: string };

export type RealMapProps = {
  employees: Employee[];
  request?: RequestPos;
  cityCenter?: [number, number];
  zoom?: number;
  tilesUrl?: string;
  className?: string; // للتحكم في ارتفاع/عرض الخريطة
};

export default function RealMapInner({
  employees,
  request,
  cityCenter = [24.7136, 46.6753], // الرياض
  zoom = 11,
  tilesUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  className = "h-64 w-full rounded-xl overflow-hidden",
}: RealMapProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const center: [number, number] = request
    ? [request.lat, request.lng]
    : cityCenter;

  // مفتاح يضمن إعادة تهيئة سليمة خلال HMR وتغيّر المدخلات
  const mapKey = `${center[0]}:${center[1]}:${zoom}:${employees.length}:${
    request ? 1 : 0
  }`;

  if (!mounted) return null;

  return (
    <MapContainer
      key={mapKey}
      center={center}
      zoom={zoom}
      className={className}
      scrollWheelZoom={false}
    >
      <TileLayer url={tilesUrl} />

      {request && (
        <CircleMarker
          center={[request.lat, request.lng]}
          radius={10}
          pathOptions={{
            color: "#2563eb",
            fillColor: "#2563eb",
            fillOpacity: 0.6,
          }}
        >
          <Popup>{request.title ?? "نقطة التجمّع"}</Popup>
        </CircleMarker>
      )}

      {employees.map((e, i) => {
        const d =
          request ? distanceKm(e, { lat: request.lat, lng: request.lng }) : null;

        return (
          <React.Fragment key={i}>
            <Marker position={[e.lat, e.lng]}>
              <Popup>
                {e.name}
                {d !== null ? ` — يبعد ${d.toFixed(1)} كم` : ""}
              </Popup>
            </Marker>

            {request && (
              <Polyline
                positions={[
                  [e.lat, e.lng],
                  [request.lat, request.lng],
                ]}
                pathOptions={{ color: "#22c55e", opacity: 0.5 }}
              />
            )}
          </React.Fragment>
        );
      })}
    </MapContainer>
  );
}
