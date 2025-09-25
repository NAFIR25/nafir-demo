// src/app/how-it-works/page.tsx
import React from "react";
import Link from "next/link";
import { BellRing, Share2, CheckCircle2, BarChart3, Repeat, FileCheck2 } from "lucide-react";

export const metadata = {
  title: "كيف يعمل — NAFIR",
  description: "شرح مبسّط لتدفق عمل منصة نافِر للتعبئة السريعة.",
};

type Step = { title: string; desc: string; icon: React.ReactNode };

const steps: Step[] = [
  {
    title: "إطلاق النداء من القائد عبر مركز القيادة (Command Center)",
    desc:
      "يختار القائد السيناريو، الشريحة المستهدفة، القنوات ونقطة التجمّع، ثم يؤكّد الإرسال. تُسجَّل التفاصيل في سجل التدقيق.",
    icon: <BellRing className="w-5 h-5" />,
  },
  {
    title: "بث الإشعار متعدد القنوات (Multi-Channel)",
    desc: "إرسال متزامن عبر (SMS / IVR / WhatsApp / Email / Push) لضمان الوصول بسرعة.",
    icon: <Share2 className="w-5 h-5" />,
  },
  {
    title: "استقبال الردود وتحديد الحالة",
    desc: "يردّ المستهدفون بالحالات (Go / OK / Wait / No) عبر أي قناة؛ التحقق والختم الزمني يتم تلقائيًا.",
    icon: <CheckCircle2 className="w-5 h-5" />,
  },
  {
    title: "لوحة متابعة لحظية (Real-time Dashboard)",
    desc: "نِسب الوصول، الاستجابة الأولى، غير المستجيبين، ونقاط التجمّع على الخريطة بصورة فورية.",
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    title: "تصعيد تلقائي",
    desc: "تذكير تلقائي وفق مهلة محددة، أو التحويل لقناة بديلة لمن لم يستجب.",
    icon: <Repeat className="w-5 h-5" />,
  },
  {
    title: "إغلاق الحدث وتقرير ما بعده (AAR)",
    desc: "ملخص الأداء والتعلّمات مع تصدير (CSV/Excel) ومشاركة التقرير.",
    icon: <FileCheck2 className="w-5 h-5" />,
  },
];

export default function Page() {
  return (
    <main dir="rtl" className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#0b1220] dark:text-gray-100">
      {/* رأس الصفحة */}
      <header className="border-b border-black/5 dark:border-white/10 bg-gradient-to-b from-white to-gray-50 dark:from-[#0b1220] dark:to-[#0e172a]">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="text-3xl md:text-4xl font-extrabold">كيف يعمل «نافِر»</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl">
            تدفّق مختصر يوضّح خطوات النداء منذ إطلاقه من القائد وحتى الإغلاق وإصدار التقرير — بتكامل بسيط وسرعة تنفيذ عالية.
          </p>

          {/* زر واحد فقط — لا يوجد زر للمزايا */}
          <div className="mt-5">
            <Link
              href="/demo#commander-launch"
              className="inline-block rounded-xl bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 text-sm"
            >
              جرّب إطلاق النداء الآن
            </Link>
          </div>
        </div>
      </header>

      {/* الخط الزمني + البطاقات */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <ol
          className="
            relative space-y-5 md:space-y-6
            before:content-[''] before:absolute before:right-6 md:before:right-8
            before:top-0 before:h-full before:w-px
            before:bg-gradient-to-b before:from-teal-500/30 before:via-slate-300/40 before:to-transparent
            dark:before:from-teal-400/30 dark:before:via-slate-600/40
          "
        >
          {steps.map((s, i) => (
            <li key={i} className="relative pr-16 md:pr-24">
              {/* رقم الخطوة */}
              <div
                className="absolute -right-1 md:-right-2 top-4 flex items-center justify-center w-8 h-8 md:w-9 md:h-9
                           rounded-full bg-white text-teal-700 font-extrabold border border-teal-200 shadow-sm
                           dark:bg-slate-900 dark:text-teal-300 dark:border-slate-700"
                aria-hidden
              >
                {i + 1}
              </div>

              {/* البطاقة */}
              <div className="rounded-2xl border border-slate-200/70 bg-white shadow-sm hover:ring-1 hover:ring-teal-500/50 dark:bg-slate-900 dark:border-slate-700/70">
                <div className="p-5 md:p-6">
                  <div className="flex items-start gap-3">
                    <div className="text-teal-700 bg-teal-50 dark:text-teal-300 dark:bg-teal-900/20 rounded-lg p-2 border border-teal-100 dark:border-teal-900/40" aria-hidden>
                      {s.icon}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base md:text-lg font-bold">{s.title}</h3>
                      <p className="text-sm md:text-[15px] leading-7 text-gray-600 dark:text-gray-300">{s.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* دعوة للتجربة */}
      <section className="max-w-6xl mx-auto px-6 pb-14">
        <div className="rounded-2xl bg-teal-600 text-white px-6 py-6 flex flex-wrap items-center gap-4 shadow">
          <div className="text-lg font-semibold">جاهز للتجربة؟</div>
          <div className="text-sm opacity-90">انتقل إلى الديمو وجرّب إطلاق النداء من مركز القيادة (Command Center).</div>
          <Link href="/demo#commander-launch" className="ms-auto rounded-xl bg-white/15 hover:bg-white/25 px-4 py-2 text-sm">
            فتح الديمو
          </Link>
        </div>
      </section>
    </main>
  );
}
