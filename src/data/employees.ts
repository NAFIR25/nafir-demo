export type Employee = {
  id: string;
  name: string; // مثال: محمد بن فهد
  lat: number;
  lng: number;
  status: "available" | "busy" | "offline";
  rating?: number;
};

// 30 اسم لاحقًا—الآن عينة سريعة
export const employees: Employee[] = [
  { id: "E01", name: "محمد بن فهد", lat: 21.5433, lng: 39.1728, status: "available", rating: 4.6 },
  { id: "E02", name: "سعد بن عبدالله", lat: 21.5600, lng: 39.1989, status: "busy",      rating: 4.3 },
  { id: "E03", name: "ناصر بن علي",   lat: 21.5260, lng: 39.1870, status: "offline",   rating: 4.0 },
];
