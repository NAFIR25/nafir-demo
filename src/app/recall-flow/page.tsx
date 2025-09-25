// src/app/recall-flow/page.tsx
import Image from "next/image";

export const metadata = {
  title: "تجربة المستدعى — سير الاستدعاء | NAFIR",
  description: "إشعار iPhone ⇠ بطاقة الاستدعاء ⇠ تحديد زمن الوصول (ETA).",
};

export default function RecallFlowPage() {
  const steps = [
    {
      id: 1,
      title: "الخطوة ١ — إشعار iPhone: استدعاء عاجل",
      img: "/nafir-step-01-notification.png",
      alt: "إشعار iPhone — استدعاء عاجل من NAFIR",
      caption:
        "يصل إشعار فوري بصوت تنبيه يوضّح الجهة والموقع والمسافة. اضغط لفتح تفاصيل الاستدعاء في التطبيق.",
      bullets: [
        "العنوان: NAFIR — استدعاء عاجل",
        "التفاصيل: الحرس الوطني (الشرطة العسكرية) — الرياض • بوابة ٣، يبعد ٦٫٢ كم",
        "السطر المساعد: اضغط للفتح — يصاحبه صوت تنبيه",
      ],
    },
    {
      id: 2,
      title: "الخطوة ٢ — داخل التطبيق: بطاقة «استدعاء وارد»",
      img: "/nafir-step-02-inapp.png",
      alt: "بطاقة الاستدعاء داخل التطبيق — أحمد الدوسري",
      caption:
        "بطاقة واضحة بالاسم والموقع والمسافة والوقت؛ أزرار «استلام» و«اعتذار»، وحالات الاستجابة، مع زر الملاحة.",
      bullets: [
        "الاسم: أحمد الدوسري — الموقع: الرياض — المسافة: ٢٫٨ كم — الوقت: ٤ دقائق",
        "الإجراءات: استلام (أخضر) / اعتذار (أحمر)",
        "حالات سريعة: متاح — في الطريق — غير متاح",
        "زر الملاحة: الانتقال عبر الخرائط",
      ],
    },
    {
      id: 3,
      title: "الخطوة ٣ — تحديد زمن الوصول (ETA)",
      img: "/nafir-step-03-eta.png",
      alt: "تحديد زمن الوصول — ١٥ / ٣٠ / ٦٠+ دقيقة",
      caption:
        "يختار الموظف زمنًا متوقعًا للوصول: ١٥ أو ٣٠ أو ٦٠+ دقيقة، ويمكن تحديد وقت مخصّص ثم «تأكيد».",
      bullets: [
        "السؤال: كم من الوقت تحتاج للوصول؟",
        "خيارات سريعة: ١٥ دقيقة — ٣٠ دقيقة — ٦٠+ دقيقة",
        "وقت مخصّص (اختياري) ثم «تأكيد»",
        "بعد التأكيد: تتحول الحالة إلى «في الطريق» وتظهر للعمليات مع ETA",
      ],
    },
  ];

  return (
    // نجبر الخلفية على الأبيض والنص على الغامق حتى لو الوضع الداكن مفعّل
    <main dir="rtl" className="min-h-screen bg-white text-gray-900 dark:bg-white dark:text-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            <span className="text-red-600">تجربة المستدعى</span> — سير الاستدعاء
          </h1>
          <p className="mt-2">
            تسلسل تجربة الموظف في NAFIR: إشعار iPhone بصوت تنبيه ⟵ بطاقة الاستدعاء داخل التطبيق ⟵ اختيار زمن الوصول (ETA).
          </p>
        </header>

        <section className="space-y-12">
          {steps.map((s) => (
            <article
              key={s.id}
              className="grid lg:grid-cols-2 gap-8 items-start rounded-2xl border bg-white p-5"
            >
              {/* النص */}
              <div className="order-2 lg:order-1">
                <h2 className="text-xl font-bold mb-3 text-red-600">{s.title}</h2>
                <div className="text-sm">{s.caption}</div>
                <ul className="list-disc pr-5 mt-4 space-y-1 text-sm">
                  {s.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>

              {/* الصورة */}
              <figure className="w-full order-1 lg:order-2">
                <Image
                  src={s.img}
                  alt={s.alt}
                  width={444}
                  height={852}
                  className="w-full h-auto rounded-2xl shadow border border-gray-200"
                  priority={s.id === 1}
                />
                <figcaption className="text-xs text-gray-700 mt-2">{s.alt}</figcaption>
              </figure>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
