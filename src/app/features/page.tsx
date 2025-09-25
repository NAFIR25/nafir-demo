// src/app/features/page.tsx
import Link from "next/link";
import {
  Clock3,
  MapPin,
  BellRing,
  Download,
  CheckCircle2,
  Route,
  Smartphone,
  Users,
  Shield,
  BadgeHelp,
} from "lucide-react";
import React from "react";

export default function FeaturesPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-gray-50 dark:bg-gray-950 dark:text-gray-100">
      <section className="max-w-6xl mx-auto px-4 py-10">
        {/* عنوان وشرح مختصر */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-900 dark:text-white">
              مزايا نظام <span className="tracking-wide">NAFIR</span>
            </h1>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              نظام الاستدعاء العاجل بإدارة موحّدة، خريطة تفاعلية، وتتبع لحظي لحالات الاستجابة.
            </p>
          </div>

          {/* تم حذف زر واتساب كما طلبت — أبقينا زر تجربة الديمو فقط */}
          <div className="shrink-0">
            <Link
              href="/demo"
              className="px-5 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 inline-flex items-center gap-2"
            >
              جرب الديمو
            </Link>
          </div>
        </div>

        {/* شبكة المزايا */}
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <FeatureCard
            title="مسافة وزمن تقريبي"
            icon={<Clock3 className="w-5 h-5" />}
            badge="حساب تلقائي"
            desc="حساب مسافة كل موظف للوجهة وزمن الوصول التقريبي."
          />

          <FeatureCard
            title="خريطة تفاعلية"
            icon={<MapPin className="w-5 h-5" />}
            badge="Leaflet + OSM"
            desc="عرض مواقع الأفراد ونقطة التجمّع مع نوافذ منبثقة للمسافات."
          />

          <FeatureCard
            title="استدعاء متعدّد القنوات"
            icon={<BellRing className="w-5 h-5" />}
            badge="اتصال + رسائل"
            desc="إرسال نداء عبر الاتصال والرسائل مع تتبّع نتائج الإرسال."
          />

          <FeatureCard
            title="تتبّع الحالة لحظيًا"
            icon={<CheckCircle2 className="w-5 h-5" />}
            badge="تحديث مباشر"
            desc="تم الرد، في الطريق، غير متاح، لم يرد — تحديثات مباشرة."
          />

          <FeatureCard
            title="فرز الأقرب أولًا"
            icon={<Route className="w-5 h-5" />}
            badge="فرز ديناميكي"
            desc="ترتيب القائمة حسب القرب أو الحالة مع فلاتر مرِنة."
          />

          <FeatureCard
            title="تصدير CSV"
            icon={<Download className="w-5 h-5" />}
            badge="تقرير سريع"
            desc="حفظ النتائج والتقارير كملفات CSV للمراجعة."
          />

          <FeatureCard
            title="متوافق مع الجوال"
            icon={<Smartphone className="w-5 h-5" />}
            badge="Responsive"
            desc="تصميم متجاوب يعمل بسلاسة على الجوال والتابلت والويب."
          />

          <FeatureCard
            title="متعدّد الفرق"
            icon={<Users className="w-5 h-5" />}
            badge="قابل للتوسّع"
            desc="إدارة عدّة فرق ومجموعات استدعاء من واجهة واحدة."
          />

          <FeatureCard
            title="صلاحيات وأمان"
            icon={<Shield className="w-5 h-5" />}
            badge="Roles"
            desc="بنية قابلة للتوسّع مع صلاحيات أدوار متعدّدة."
          />
        </div>

        {/* قسم أسئلة / ملاحظات بسيطة */}
        <div className="mt-10">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-black/5 dark:border-white/10">
            <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
              <BadgeHelp className="w-5 h-5" />
              <h2 className="font-semibold">معلومة</h2>
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              هذه صفحة عرض توضيحي — البيانات المعروضة للتجربة فقط، ويمكن دمج مزايا إضافية لاحقًا
              مثل مسارات القيادة الفعلية والتنبيهات الذكية.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({
  title,
  desc,
  icon,
  badge,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
  badge?: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-black/5 dark:border-white/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
          <span className="grid place-items-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800">
            {icon}
          </span>
          <h3 className="font-semibold">{title}</h3>
        </div>
        {badge && (
          <span className="text-xs px-2 py-1 rounded-lg border dark:border-gray-700 text-gray-600 dark:text-gray-300">
            {badge}
          </span>
        )}
      </div>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{desc}</p>
    </div>
  );
}
