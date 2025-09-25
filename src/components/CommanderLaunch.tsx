"use client";

import React, { useMemo, useState } from "react";
import {
  BellRing, Phone, MessageCircle, Mail, Send, MapPin, Loader2, CheckCircle2
} from "lucide-react";

type Channel = "SMS" | "IVR" | "WhatsApp" | "Email" | "Push";

const allChannels: Channel[] = ["SMS", "IVR", "WhatsApp", "Email", "Push"];

export default function CommanderLaunch() {
  const [scenario, setScenario] = useState("استدعاء طوارئ (Emergency)");
  const [segment, setSegment] = useState("الفريق التشغيلي — المنطقة أ");
  const [muster, setMuster]   = useState("نقطة التجمّع: البوابة 3");
  const [channels, setChannels] = useState<Record<Channel, boolean>>({
    SMS: true, IVR: true, WhatsApp: true, Email: false, Push: false
  });
  const [sending, setSending] = useState(false);

  // احصائيات مبسطة للمحاكاة
  const [sent, setSent] = useState(0);
  const [inProgress, setInProgress] = useState(0);
  const [reached, setReached] = useState(0);
  const [firstResponse, setFirstResponse] = useState(0);

  const selectedCount = useMemo(
    () => Object.values(channels).filter(Boolean).length, [channels]
  );

  function toggle(ch: Channel) {
    setChannels((prev) => ({ ...prev, [ch]: !prev[ch] }));
  }

  async function handleLaunch() {
    setSending(true);
    // تصفير للمحاكاة
    setSent(0); setInProgress(0); setReached(0); setFirstResponse(0);

    // محاكاة تقدّم بسيط
    const total = 120; // عدد مستهدفين تجريبي
    setSent(total);
    setInProgress(total);

    // تقدم تدريجي
    let reachedNow = 0;
    let firstResp = 0;

    const tick = setInterval(() => {
      reachedNow = Math.min(total, reachedNow + Math.floor(Math.random() * 15 + 5));
      firstResp  = Math.min(reachedNow, firstResp + Math.floor(Math.random() * 6));

      setReached(reachedNow);
      setFirstResponse(firstResp);
      setInProgress(Math.max(0, total - reachedNow));

      if (reachedNow >= total) {
        clearInterval(tick);
        setSending(false);
      }
    }, 600);
  }

  return (
    <section id="commander-launch" dir="rtl"
      className="mx-auto max-w-6xl px-4 md:px-6 py-10">
      <h2 className="text-2xl md:text-3xl font-extrabold mb-6">
        إطلاق النداء من القائد <span className="text-gray-400">(Command Center)</span>
      </h2>

      <div className="rounded-2xl border bg-white/90 dark:bg-slate-900 dark:border-slate-800 shadow-sm overflow-hidden">
        {/* رأس توضيحي صغير */}
        <div className="flex items-center gap-3 px-5 py-4 border-b dark:border-slate-800">
          <BellRing className="h-5 w-5 text-teal-600" />
          <p className="text-sm text-gray-600 dark:text-gray-300">
            اختر السيناريو والشريحة والقنوات، ثم اضغط «إطلاق النداء الآن».
          </p>
        </div>

        {/* جسم البطاقة */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 p-5">
          {/* العمود الأيمن (التحكم) */}
          <div className="space-y-5">
            {/* 1) السيناريو */}
            <div className="rounded-xl border dark:border-slate-800 p-4">
              <div className="text-xs text-gray-500 mb-2">1) السيناريو</div>
              <select
                className="w-full rounded-lg border px-3 py-2 bg-white dark:bg-slate-950 dark:border-slate-800"
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
              >
                <option>استدعاء طوارئ (Emergency)</option>
                <option>تمرين تعبئة (Drill)</option>
                <option>نداء قسم محدد (Department Call)</option>
              </select>
            </div>

            {/* 2) الشريحة/الفريق */}
            <div className="rounded-xl border dark:border-slate-800 p-4">
              <div className="text-xs text-gray-500 mb-2">2) الشريحة المستهدفة</div>
              <input
                className="w-full rounded-lg border px-3 py-2 bg-white dark:bg-slate-950 dark:border-slate-800"
                value={segment}
                onChange={(e) => setSegment(e.target.value)}
                placeholder="اختَر المجموعة / القسم"
              />
              <p className="mt-1 text-[11px] text-gray-500">
                مثال: فرق (الإدارة) + (فرق الأمن) + (قِطع الزمن).
              </p>
            </div>

            {/* 3) القنوات */}
            <div className="rounded-xl border dark:border-slate-800 p-4">
              <div className="text-xs text-gray-500 mb-3">
                3) اختيار القنوات — {selectedCount} من {allChannels.length}
              </div>
              <div className="flex flex-wrap gap-2">
                <ChannelPill label="SMS"    icon={<MessageCircle className="h-4 w-4" />} active={channels.SMS}      onClick={() => toggle("SMS")} />
                <ChannelPill label="IVR"    icon={<Phone className="h-4 w-4" />}          active={channels.IVR}      onClick={() => toggle("IVR")} />
                <ChannelPill label="WhatsApp" icon={<MessageCircle className="h-4 w-4" />} active={channels.WhatsApp} onClick={() => toggle("WhatsApp")} />
                <ChannelPill label="Email"  icon={<Mail className="h-4 w-4" />}           active={channels.Email}    onClick={() => toggle("Email")} />
                <ChannelPill label="Push"   icon={<Send className="h-4 w-4" />}           active={channels.Push}     onClick={() => toggle("Push")} />
              </div>
              <p className="mt-2 text-[11px] text-gray-500">
                سيُعاد الإرسال تلقائيًا (Escalation) لغير المستجيبين حسب الإعدادات.
              </p>
            </div>

            {/* زر الإطلاق */}
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs text-gray-500">
                4) جاهز للإرسال — سيُسجَّل كل شيء في سجل التدقيق (Audit Log)
              </div>
              <button
                onClick={handleLaunch}
                disabled={sending || selectedCount === 0}
                className="inline-flex items-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 disabled:opacity-60"
              >
                {sending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> جارٍ الإرسال…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> إطلاق النداء الآن
                  </>
                )}
              </button>
            </div>
          </div>

          {/* العمود الأيسر (الخريطة/الموقع المصغّر) */}
          <div className="rounded-xl border dark:border-slate-800 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs text-gray-500">نقطة التجمّع</div>
              <CheckCircle2 className="h-4 w-4 text-teal-600" />
            </div>
            <div className="aspect-[4/3] w-full overflow-hidden rounded-lg border bg-[url('https://tile.openstreetmap.org/10/570/386.png')] bg-cover bg-center dark:border-slate-800" />
            <div className="mt-3 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-teal-600" />
              <input
                className="flex-1 rounded-lg border px-3 py-2 bg-white dark:bg-slate-950 dark:border-slate-800"
                value={muster}
                onChange={(e) => setMuster(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* شريط إحصاءات سفلي */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 px-5 pb-5">
          <Stat label="الاستجابة الأولى" value={firstResponse} />
          <Stat label="قيد الوصول" value={inProgress} />
          <Stat label="تم الوصول" value={reached} />
          <Stat label="تم الإرسال" value={sent} />
        </div>
      </div>
    </section>
  );
}

function ChannelPill({
  label, icon, active, onClick,
}: { label: string; icon: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm " +
        (active
          ? "bg-teal-600 text-white border-teal-600"
          : "bg-transparent text-gray-700 dark:text-gray-300 border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800")
      }
      aria-pressed={active}
    >
      {icon}<span>{label}</span>
    </button>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border dark:border-slate-800 p-4 text-center">
      <div className="text-2xl font-extrabold tabular-nums">{value}</div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </div>
  );
}
