"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  Phone, Send, RotateCcw, CheckCircle2, XCircle,
  Route, Hourglass, MessageCircle, BellRing, ChevronRight,
  Download, Filter, Search, SortAsc
} from "lucide-react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
// 👇 مسارات نسبية لتفادي مشكلة alias
import CommanderLaunch from "../../components/CommanderLaunch";
import RealMap from "../../components/RealMap";

/* =====================[ أعلام التحكم من مكان واحد ]===================== */
const DEMO_FLAGS = {
  // "commander" = زر الهيرو ينزل لقسم استدعاء القائد، "sendAll" = يطلق نداء للجميع (تجريبي)
  primaryCTA: "commander" as "commander" | "sendAll",
  // إظهار زر كبير "إرسال الاستدعاء للجميع" في شريط التحكم
  showGlobalSendAll: false,
  // زر صغير تجريبي تحت مكوّن القائد
  showExperimentalAllCall: true,
};
/* ====================================================================== */

// ===== الإعدادات الأساسية =====
type StatusKey = "wait" | "ok" | "no" | "go";
type Person = { id: number; name: string; phone: string; status: StatusKey; lastUpdate: number };

const initialPeople: Person[] = [
  { id: 1, name: "أحمد", phone: "050000001", status: "wait", lastUpdate: 0 },
  { id: 2, name: "محمد", phone: "050000002", status: "wait", lastUpdate: 0 },
  { id: 3, name: "سعيد", phone: "050000003", status: "wait", lastUpdate: 0 },
  { id: 4, name: "علي", phone: "050000004", status: "wait", lastUpdate: 0 },
  { id: 5, name: "خالد", phone: "050000005", status: "wait", lastUpdate: 0 },
  { id: 6, name: "ماجد", phone: "050000006", status: "wait", lastUpdate: 0 },
  { id: 7, name: "سلمان", phone: "050000007", status: "wait", lastUpdate: 0 },
  { id: 8, name: "عمر", phone: "050000008", status: "wait", lastUpdate: 0 },
  { id: 9, name: "زياد", phone: "050000009", status: "wait", lastUpdate: 0 },
  { id:10, name: "طلال", phone: "050000010", status: "wait", lastUpdate: 0 },
  { id:11, name: "مروان", phone: "050000011", status: "wait", lastUpdate: 0 },
  { id:12, name: "بدر", phone: "050000012", status: "wait", lastUpdate: 0 },
  { id:13, name: "فهد", phone: "050000013", status: "wait", lastUpdate: 0 },
  { id:14, name: "رائد", phone: "050000014", status: "wait", lastUpdate: 0 },
  { id:15, name: "مازن", phone: "050000015", status: "wait", lastUpdate: 0 },
  { id:16, name: "صالح", phone: "050000016", status: "wait", lastUpdate: 0 },
  { id:17, name: "طلال", phone: "050000017", status: "wait", lastUpdate: 0 },
  { id:18, name: "منصور", phone: "050000018", status: "wait", lastUpdate: 0 },
  { id:19, name: "جمال", phone: "050000019", status: "wait", lastUpdate: 0 },
  { id:20, name: "حسن", phone: "050000020", status: "wait", lastUpdate: 0 },
  { id:21, name: "عادل", phone: "050000021", status: "wait", lastUpdate: 0 },
  { id:22, name: "خليفة", phone: "050000022", status: "wait", lastUpdate: 0 },
  { id:23, name: "راشد", phone: "050000023", status: "wait", lastUpdate: 0 },
  { id:24, name: "سامي", phone: "050000024", status: "wait", lastUpdate: 0 },
  { id:25, name: "ابراهيم", phone: "050000025", status: "wait", lastUpdate: 0 },
  { id:26, name: "ناصر", phone: "050000026", status: "wait", lastUpdate: 0 },
  { id:27, name: "ياسر", phone: "050000027", status: "wait", lastUpdate: 0 },
  { id:28, name: "عبدالرحمن", phone: "050000028", status: "wait", lastUpdate: 0 },
  { id:29, name: "سهيل", phone: "050000029", status: "wait", lastUpdate: 0 },
  { id:30, name: "وليد", phone: "050000030", status: "wait", lastUpdate: 0 },
];

const WHATSAPP_NUMBER = "966500000000";
const DEFAULT_RETRY = 90;

// 👇 وضع هادئ للتوست
const QUIET_MODE = true;

// ===== Toast بسيط =====
type Toast = { id: number; msg: string };
function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(1);
  const push = (msg: string) => {
    if (QUIET_MODE) return;
    const id = idRef.current++;
    setToasts((t) => [...t, { id, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2500);
  };
  return { toasts, push };
}
function ToastHost({ items }: { items: Toast[] }) {
  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {items.map(t => (
        <div key={t.id} className="px-3 py-2 rounded-lg bg-gray-900 text-white text-sm shadow">
          {t.msg}
        </div>
      ))}
    </div>
  );
}

// ===== صفحة الديمو =====
export default function DemoPage() {
  const commanderRef = useRef<HTMLDivElement>(null);
  const { toasts, push } = useToasts();

  // App state
  const [people, setPeople] = useState<Person[]>(initialPeople);
  const [retryInSec, setRetryInSec] = useState<number>(DEFAULT_RETRY);
  const [countdown, setCountdown] = useState<number>(DEFAULT_RETRY);
  const [autoRetryEnabled, setAutoRetryEnabled] = useState<boolean>(true);

  // Filters & Search & Sort
  const [statusFilter, setStatusFilter] = useState<StatusKey | "all">("all");
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<"updated" | "status">("updated");

  // Load preferences + فرض الوضع الداكن دائمًا
  useEffect(() => {
    try {
      const savedPeople = localStorage.getItem("nafir_people");
      const savedR = localStorage.getItem("nafir_retry");
      const savedAuto = localStorage.getItem("nafir_auto");
      if (savedPeople) setPeople(JSON.parse(savedPeople));
      if (savedR) { setRetryInSec(Number(savedR)); setCountdown(Number(savedR)); }
      if (savedAuto) setAutoRetryEnabled(savedAuto === "1");
      // تأكيد الوضع الداكن في كل الصفحات
      document.documentElement.classList.add("dark");
      localStorage.setItem("nafir_dark", "1");
    } catch {}
  }, []);

  // Persist
  useEffect(() => { localStorage.setItem("nafir_people", JSON.stringify(people)); }, [people]);
  useEffect(() => { localStorage.setItem("nafir_retry", String(retryInSec)); }, [retryInSec]);
  useEffect(() => { localStorage.setItem("nafir_auto", autoRetryEnabled ? "1" : "0"); }, [autoRetryEnabled]);

  // Countdown
  useEffect(() => { setCountdown(retryInSec); }, [retryInSec]);
  useEffect(() => {
    const t = setInterval(() => {
      if (!autoRetryEnabled) return;
      setCountdown((c) => (c > 0 ? c - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, [autoRetryEnabled]);
  useEffect(() => {
    if (autoRetryEnabled && countdown === 0) retryAll();
  }, [autoRetryEnabled, countdown]); // eslint-disable-line

  // KPIs
  const kpis = useMemo(() => {
    const total = people.length;
    const ok = people.filter(p => p.status === "ok").length;
    const no = people.filter(p => p.status === "no").length;
    const go = people.filter(p => p.status === "go").length;
    const wait = people.filter(p => p.status === "wait").length;
    const responded = total - wait;
    const successPct = total ? Math.round((responded / total) * 100) : 0;
    return { total, ok, no, go, wait, responded, successPct };
  }, [people]);

  const pieData = [
    { name: "✅ تم الرد", value: kpis.ok, color: "#22c55e" },
    { name: "🛣️ في الطريق", value: kpis.go, color: "#3b82f6" },
    { name: "❌ غير متاح", value: kpis.no, color: "#ef4444" },
    { name: "⏳ لم يرد", value: kpis.wait, color: "#9ca3af" },
  ];

  // Helpers
  const labelOf = (s: StatusKey) => s === "ok" ? "تم الرد" : s === "no" ? "غير متاح" : s === "go" ? "في الطريق" : "لم يرد";
  const chipOf = (s: StatusKey) => {
    if (s === "ok")   return <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-800">✅ تم الرد</span>;
    if (s === "no")   return <span className="px-2 py-1 rounded bg-red-100 text-red-800">❌ غير متاح</span>;
    if (s === "go")   return <span className="px-2 py-1 rounded bg-blue-100 text-blue-800">🛣️ في الطريق</span>;
    return <span className="px-2 py-1 rounded bg-gray-200 text-gray-700">⏳ لم يرد</span>;
  };

  // === إرسال وهمي عبر API + Webhook محاكى ===
  async function sendViaApi(personId: number, channel: "whatsapp" | "call", text?: string) {
    try {
      const person = people.find(p => p.id === personId);
      if (!person) return;

      const international = `966${person.phone.replace(/^0+/, "")}`;

      const res = await fetch("/api/mock/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: international,
          channel,
          text: text || "نداء عاجل: يرجى تأكيد الاستجابة."
        })
      });

      const data = await res.json();
      if (!data.ok) {
        push(`فشل إرسال ${channel === "whatsapp" ? "واتساب" : "اتصال"}: ${data.error || ""}`);
        return;
      }

      push(`تم قبول الإرسال (${channel}) – SID: ${data.sid}`);

      const delay = 2000 + Math.random() * 2000;
      setTimeout(() => {
        const roll = Math.random();
        let next: StatusKey = "wait";

        if (channel === "whatsapp") {
          next = roll < 0.6 ? "ok" : roll < 0.75 ? "go" : roll < 0.9 ? "wait" : "no";
        } else {
          next = roll < 0.5 ? "ok" : roll < 0.7 ? "go" : roll < 0.9 ? "wait" : "no";
        }

        setPeople(p =>
          p.map(x => x.id === personId ? ({ ...x, status: next, lastUpdate: x.lastUpdate + 1 }) : x)
        );
        push(`Webhook: تحديث حالة ${person.name} → ${labelOf(next)}`);
      }, delay);

    } catch (e: any) {
      push(`خطأ في الإرسال: ${e?.message || e}`);
    }
  }

  // Actions
  const sendAll = () => {
    setPeople((p) => p.map(x => ({ ...x, status: "wait", lastUpdate: 0 })));
    setCountdown(retryInSec);
    push("تم إرسال الاستدعاء للجميع (محاكاة API)");
    people.forEach((person, idx) => {
      setTimeout(() => { sendViaApi(person.id, "whatsapp"); }, idx * 250);
    });
  };

  const retryAll = () => {
    setPeople((p) =>
      p.map(x => {
        const roll = Math.random();
        let next: StatusKey = x.status;
        if (x.status === "wait") {
          next = roll < 0.45 ? "ok" : roll < 0.7 ? "go" : roll < 0.9 ? "wait" : "no";
        } else if (x.status === "go") {
          next = roll < 0.6 ? "ok" : roll < 0.8 ? "go" : "no";
        }
        return { ...x, status: next, lastUpdate: x.lastUpdate + 5 };
      })
    );
    setCountdown(retryInSec);
    push("تم تنفيذ إعادة المحاولة");
  };

  const setStatus = (id: number, s: StatusKey) => {
    setPeople((p) => p.map(x => (x.id === id ? { ...x, status: s, lastUpdate: x.lastUpdate + 1 } : x)));
    push(`تغيير حالة الشخص #${id} إلى ${labelOf(s)}`);
  };

  // Filters/Search/Sort
  const visiblePeople = useMemo(() => {
    const q = query.trim();
    const arr = people.filter(p => {
      const matchesStatus = statusFilter === "all" ? true : p.status === statusFilter;
      const matchesQuery = !q || p.name.includes(q) || p.phone.includes(q);
      return matchesStatus && matchesQuery;
    });
    if (sortKey === "updated") {
      arr.sort((a,b) => b.lastUpdate - a.lastUpdate);
    } else {
      const order = { ok: 0, go: 1, no: 2, wait: 3 } as Record<StatusKey, number>;
      arr.sort((a,b) => order[a.status] - order[b.status]);
    }
    return arr;
  }, [people, statusFilter, query, sortKey]);

  // ===== نقاط خريطة (توزيع حول مركز الرياض) =====
  const center = { lat: 24.7136, lng: 46.6753 }; // الرياض
  const mapEmployees = useMemo(() => {
    const pts: { lat: number; lng: number }[] = [];
    const n = initialPeople.length;
    for (let i = 0; i < n; i++) {
      const ang = (i * 137.5 * Math.PI) / 180;
      const base = 0.02 + 0.005 * (i % 6);
      const lat = center.lat + base * Math.cos(ang);
      const lng = center.lng + base * Math.sin(ang);
      pts.push({ lat, lng });
    }
    return initialPeople.map((p, i) => ({
      name: p.name,
      lat: pts[i].lat,
      lng: pts[i].lng,
    }));
  }, []);

  const request = { lat: center.lat, lng: center.lng, title: "الرياض • بوابة ٣" };

  const exportCSV = () => {
    const header = "id,name,phone,status,lastUpdate\n";
    const rows = people.map(p => `${p.id},${p.name},${p.phone},${labelOf(p.status)},${p.lastUpdate}`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "nafir-demo.csv"; a.click();
    URL.revokeObjectURL(url);
    push("تم تصدير CSV");
  };

  const message = encodeURIComponent("مرحبًا، تواصل بخصوص نافر.");
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  // CTA في الهيرو من مكان واحد
  const onHeroPrimary = () => {
    if (DEMO_FLAGS.primaryCTA === "commander") {
      commanderRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      sendAll(); // نداء تجريبي للجميع
    }
  };

  return (
    <main dir="rtl" className="min-h-screen bg-gray-50 dark:bg-gray-950 dark:text-gray-100">
      {!QUIET_MODE && <ToastHost items={toasts} />}

      {/* الهيدر */}
      <header className="sticky top-0 z-10 bg-white/90 dark:bg-gray-900/80 backdrop-blur border-b dark:border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BellRing className="text-red-600" />
            <span className="font-extrabold">NAFIR Demo</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <a href={waLink} target="_blank" className="px-3 py-2 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2">
              <MessageCircle className="w-4 h-4" /> واتساب
            </a>
            <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center gap-1">
              <ChevronRight className="w-4 h-4" /> رجوع
            </Link>
          </div>
        </div>
      </header>

      {/* هيرو صغير: خريطة مصغّرة + وصف */}
      <section className="max-w-6xl mx-auto px-4 pt-8 grid lg:grid-cols-2 gap-6 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-gray-900 dark:text-white">
            متابعة الاستدعاء — خريطة تبيّن نقطة التجمّع والمسافات
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            توضيح سريع لتوزيع أفراد الفريق حول مركز المدينة، مع خطوط مباشرة لنقطة التجمّع ومعلومات
            المسافة داخل النافذة المنبثقة لكل موظف.
          </p>
          <div className="mt-5 flex gap-3">
            <button onClick={onHeroPrimary} className="px-4 py-2 rounded-xl bg-red-600 text-white flex items-center gap-2 hover:bg-red-700">
              <Send className="w-4 h-4" />
              {DEMO_FLAGS.primaryCTA === "commander" ? "استدعاء القائد" : "نداء للجميع (تجريبي)"}
            </button>
            <button onClick={retryAll} className="px-4 py-2 rounded-xl border flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800">
              <RotateCcw className="w-4 h-4" /> إعادة المحاولة
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-4 border border-black/5 dark:border-white/10">
          <RealMap
            employees={mapEmployees}
            request={request}
            cityCenter={[center.lat, center.lng]}
            zoom={12}
          />
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            خريطة مصغّرة — لأغراض العرض فقط.
          </p>
        </div>
      </section>

      {/* ===== إطلاق النداء من القائد ===== */}
      <div className="max-w-6xl mx-auto px-4 pt-6 scroll-mt-28" id="commander-launch" ref={commanderRef}>
        <CommanderLaunch />
        {DEMO_FLAGS.showExperimentalAllCall && (
          <button
            onClick={sendAll}
            className="mt-3 text-xs px-3 py-1.5 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800"
            title="تشغيل نداء تجريبي للجميع — لأغراض العرض"
          >
            نداء للجميع (تجريبي)
          </button>
        )}
      </div>

      {/* بقية أقسام الديمو */}
      <section className="max-w-6xl mx-auto px-4 py-6 grid gap-6">
        {/* الأزرار الأساسية والتحكم */}
        <div className="flex flex-wrap items-center gap-3">
          {DEMO_FLAGS.showGlobalSendAll && (
            <button onClick={sendAll} className="px-4 py-2 rounded-xl bg-red-600 text-white flex items-center gap-2 hover:bg-red-700">
              <Send className="w-4 h-4" /> إرسال الاستدعاء للجميع
            </button>
          )}

          <button onClick={retryAll} className="px-4 py-2 rounded-xl bg-gray-900 text-white flex items-center gap-2 hover:bg-black">
            <RotateCcw className="w-4 h-4" /> إعادة المحاولة الآن
          </button>

          <div className="text-sm text-gray-600 dark:text-gray-300">
            إعادة المحاولة التلقائية خلال: <b>{countdown}</b> ثانية
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 dark:text-gray-300">الفاصل (ث):</label>
            <input
              type="number" min={10}
              className="w-20 rounded-lg border px-2 py-1 dark:bg-gray-900 dark:border-gray-700"
              value={retryInSec}
              onChange={(e) => setRetryInSec(Math.max(10, Number(e.target.value || DEFAULT_RETRY)))}
            />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={autoRetryEnabled} onChange={(e)=>setAutoRetryEnabled(e.target.checked)} />
              تشغيل تلقائي
            </label>
            <div className="w-56 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-900 dark:bg-white"
                style={{ width: `${(countdown / retryInSec) * 100}%`, transition: "width 1s linear" }}
              />
            </div>
          </div>

          <button onClick={exportCSV} className="ms-auto px-4 py-2 rounded-xl border flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800">
            <Download className="w-4 h-4" /> تصدير CSV
          </button>
        </div>

        {/* مؤشرات سريعة */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4">
          <Kpi title="الإجمالي" value={kpis.total} color="bg-blue-50 text-blue-900 dark:bg-blue-900/30 dark:text-blue-200" />
          <Kpi title="نسبة النجاح (أي رد)" value={`${kpis.successPct}%`} color="bg-emerald-50 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-200" />
          <Kpi title="تم الرد" value={kpis.ok} color="bg-emerald-50 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-200" />
          <Kpi title="في الطريق" value={kpis.go} color="bg-blue-50 text-blue-900 dark:bg-blue-900/30 dark:text-blue-200" />
          <Kpi title="غير متاح" value={kpis.no} color="bg-red-50 text-red-900 dark:bg-red-900/30 dark:text-red-200" />
          <Kpi title="لم يرد" value={kpis.wait} color="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200" />
        </div>

        {/* مخطط دائري */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-black/5 dark:border-white/10">
          <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">توزيع الحالات</h2>
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={110} label>
                  {pieData.map((s, i) => <Cell key={i} fill={s.color} />)}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* شريط فلاتر + بحث + فرز */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1"><Filter className="w-4 h-4" /> فلاتر:</span>
          {[
            {k:"all",  label:`الكل (${people.length})`},
            {k:"ok",   label:`تم الرد (${kpis.ok})`},
            {k:"go",   label:`في الطريق (${kpis.go})`},
            {k:"no",   label:`غير متاح (${kpis.no})`},
            {k:"wait", label:`لم يرد (${kpis.wait})`},
          ].map(t => (
            <button
              key={t.k}
              onClick={() => setStatusFilter(t.k as any)}
              className={`px-3 py-1.5 rounded-lg border text-sm dark:border-gray-700 ${String(statusFilter)===String(t.k) ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900" : "hover:bg-gray-50 dark:hover:bg-gray-800"}`}
            >
              {t.label}
            </button>
          ))}

          <div className="ms-auto flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              placeholder="ابحث بالاسم أو الجوال"
              className="w-56 rounded-lg border px-3 py-1.5 text-sm dark:bg-gray-900 dark:border-gray-700"
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
            />
            <span className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1"><SortAsc className="w-4 h-4" /> فرز:</span>
            <select
              className="rounded-lg border px-2 py-1 text-sm dark:bg-gray-900 dark:border-gray-700"
              value={sortKey}
              onChange={(e)=>setSortKey(e.target.value as any)}
            >
              <option value="updated">آخر تحديث (تنازلي)</option>
              <option value="status">الحالة</option>
            </select>
          </div>
        </div>

        {/* جدول الأشخاص */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-black/5 dark:border-white/10">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-gray-500 dark:text-gray-400 border-b dark:border-gray-800">
                  <th className="py-2 text-right">الاسم</th>
                  <th className="py-2 text-right">الجوال</th>
                  <th className="py-2 text-right">الحالة</th>
                  <th className="py-2 text-right">آخر تحديث</th>
                  <th className="py-2 text-right">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {visiblePeople.map((p) => (
                  <tr key={p.id} className="border-b last:border-0 dark:border-gray-800">
                    <td className="py-2">{p.name}</td>
                    <td className="py-2 ltr:text-left">{p.phone}</td>
                    <td className="py-2">{chipOf(p.status)}</td>
                    <td className="py-2">{p.lastUpdate} م</td>
                    <td className="py-2">
                      <div className="flex flex-wrap gap-2">
                        <GhostBtn onClick={() => setStatus(p.id, "ok")} icon={<CheckCircle2 className="w-4 h-4" />}>تم الرد</GhostBtn>
                        <GhostBtn onClick={() => setStatus(p.id, "go")} icon={<Route className="w-4 h-4" />}>في الطريق</GhostBtn>
                        <GhostBtn onClick={() => setStatus(p.id, "no")} icon={<XCircle className="w-4 h-4" />}>غير متاح</GhostBtn>
                        <GhostBtn onClick={() => setStatus(p.id, "wait")} icon={<Hourglass className="w-4 h-4" />}>لم يرد</GhostBtn>

                        {/* التكامل الوهمي عبر API */}
                        <GhostBtn onClick={() => sendViaApi(p.id, "call")} icon={<Phone className="w-4 h-4" />}>اتصال</GhostBtn>
                        <GhostBtn onClick={() => sendViaApi(p.id, "whatsapp")} icon={<MessageCircle className="w-4 h-4" />}>واتساب</GhostBtn>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* مؤقت تلقائي لإعادة المحاولة */}
          <AutoRetry seconds={countdown} onZero={retryAll} enabled={autoRetryEnabled} />
        </div>

        {/* خريطة فعلية (Leaflet + OpenStreetMap) */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-black/5 dark:border-white/10">
          <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">الخريطة (واقعية)</h2>
          <RealMap
            employees={mapEmployees}
            request={request}
            cityCenter={[center.lat, center.lng]}
            zoom={11}
          />
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            بيانات مواقع الموظفين موزّعة افتراضيًا حول مركز الرياض لأغراض العرض فقط.
          </p>
        </div>
      </section>
    </main>
  );
}

function Kpi({ title, value, color }: { title: string; value: number | string; color: string }) {
  return (
    <div className={`rounded-2xl p-4 shadow-sm border border-black/5 dark:border-white/10 ${color}`}>
      <div className="text-sm opacity-80">{title}</div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
    </div>
  );
}

function GhostBtn({ onClick, icon, children }: { onClick: () => void; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className="px-3 py-1.5 text-xs rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700 flex items-center gap-1">
      {icon} {children}
    </button>
  );
}

function AutoRetry({ seconds, onZero, enabled }: { seconds: number; onZero: () => void; enabled: boolean }) {
  const prev = React.useRef(seconds);
  useEffect(() => {
    if (!enabled) return;
    if (seconds === 0 && prev.current !== 0) onZero();
    prev.current = seconds;
  }, [seconds, enabled, onZero]);
  return null;
}
