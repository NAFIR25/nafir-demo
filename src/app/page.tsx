"use client";

import Link from "next/link";
import { BellRing } from "lucide-react";
import React from "react";

// استيراد المكوّنات من المسارات النسبية
import EmployeeList from "../components/EmployeeList";
import DashboardMock from "../components/DashboardMock";

export default function Landing() {
  // واتساب: الرقم بصيغة دولية بدون +
  const WHATSAPP_NUMBER = "966533773242"; // 0533773242
  const message = encodeURIComponent("مرحبًا، أود التواصل بشأن NAFIR.");
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  // سكرول سلس إلى الأقسام
  const goTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 dark:text-gray-100"
    >
      {/* الشريط العلوي */}
      <div className="sticky top-0 z-10 bg-white/90 dark:bg-gray-900/80 backdrop-blur border-b dark:border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-red-600">
            <BellRing className="w-5 h-5" />
            <span className="font-extrabold text-gray-900 dark:text-white">NAFIR</span>
          </div>

          <div className="flex items-center gap-2">
            {/* زر الأمان والامتثال */}
            <a
              href="#security"
              onClick={goTo("security")}
              className="px-3 py-2 rounded-xl border hover:bg-gray-50 dark:hover:bg-gray-800 text-sm"
            >
              الأمان والامتثال
            </a>

            {/* تواصل معنا (واتساب) */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl border hover:bg-gray-50 dark:hover:bg-gray-800 text-sm"
            >
              تواصل معنا
            </a>
          </div>
        </div>
      </div>

      {/* الهيرو */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="flex items-center gap-2 text-red-600 mb-2">
            <BellRing />
            <span className="font-semibold">NAFIR</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-900 dark:text-white">
            نظام NAFIR للاستدعاء العاجل
            <br />
            للقطاعات العسكرية والمدنية
          </h1>

          <p className="mt-4 text-gray-600 dark:text-gray-300">
            أرسل نداءً موحّدًا عبر الاتصال والرسائل، وتابع الحالات لحظيًا: في الطريق، تم الرد،
            غير متاح، لم يرد.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/demo"
              className="px-5 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-black dark:bg-white dark:text-gray-900"
            >
              جرب النموذج
            </Link>

            {/* زر تعرّف أكثر — سكرول سلس إلى قسم الشرح */}
            <a
              href="#features"
              onClick={goTo("features")}
              className="px-5 py-3 rounded-xl border font-semibold text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              تعرّف أكثر
            </a>
          </div>
        </div>

        {/* لقطة لوحة المتابعة */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-4 border border-black/5 dark:border-white/10">
          <DashboardMock />
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            عرض تجريبي — بدون بيانات حقيقية.
          </p>
        </div>
      </section>

      {/* قسم الشرح المبسّط */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-12 scroll-mt-24">
        <h2 className="text-2xl font-extrabold mb-4">ما هي خدمة NAFIR؟</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-8">
          <span className="font-semibold">NAFIR</span> نظام استدعاء عاجل مخصّص للجهات
          العسكرية والمدنية وفرق التشغيل. يرسل النداءات عبر الاتصال والرسائل فورًا،
          ويتابع حالة كل شخص لحظيًا داخل لوحة تحكم موحّدة.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="p-4 rounded-xl border dark:border-white/10">
            <h3 className="font-bold mb-2">ماذا يقدّم؟</h3>
            <ul className="list-disc pr-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>إرسال استدعاء فوري عبر الاتصال/الرسائل لعدة أفراد بضغطة واحدة.</li>
              <li>
                متابعة الحالة: <b>تم الرد</b>، <b>في الطريق</b>، <b>غير متاح</b>، <b>لم يرد</b>.
              </li>
              <li>إعادة المحاولة تلقائيًا بعد فترة محددة (افتراضيًا 90 ثانية).</li>
              <li>عرض المسافة والوقت التقديري للوصول لكل موظف.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border dark:border-white/10">
            <h3 className="font-bold mb-2">لماذا NAFIR؟</h3>
            <ul className="list-disc pr-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>يوحّد قنوات التواصل ويقلّل التأخير في حالات الطوارئ.</li>
              <li>يُظهر المؤشرات الرئيسية لحظيًا (مستجيبين/قيد الوصول/لم يردوا).</li>
              <li>تقارير CSV وPDF للتوثيق والمشاركة.</li>
              <li>قابل للتكامل مستقبلاً مع منصات الاتصال (WhatsApp/Twilio) والخرائط.</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border dark:border-white/10">
          <h3 className="font-bold mb-2">كيف يعمل بسرعة؟</h3>
          <ol className="list-decimal pr-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>أضف الأشخاص المطلوب استدعاؤهم.</li>
            <li>أرسل النداء الجماعي (اتصال/رسائل) بضغطه واحدة.</li>
            <li>تابع الحالات لحظيًا وفعّل إعادة المحاولة التلقائية عند الحاجة.</li>
            <li>صدّر تقريرًا مختصرًا بعد انتهاء المهمة.</li>
          </ol>
        </div>
      </section>

      {/* الأمان والامتثال والهوية الرقمية */}
      <section id="security" className="max-w-6xl mx-auto px-6 py-12 scroll-mt-24">
        <h2 className="text-2xl font-extrabold mb-4">الأمان والامتثال والهوية الرقمية (نفاذ)</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-8">
          نظام <span className="font-semibold">NAFIR</span> مصمّم وفق أفضل ممارسات الأمن السيبراني ومعايير الامتثال في المملكة العربية السعودية، مع دعم التكامل مع
          <span className="font-semibold"> النفاذ الوطني الموحّد (Nafath)</span> للتحقق من الهوية الرقمية للمستخدمين عند الحاجة.
        </p>

        {/* شارات مختصرة */}
        <div className="flex flex-wrap gap-2 mt-4 text-sm">
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">يدعم نفاذ (SSO)</span>
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">متوافق مع NCA – ECC/CCC</span>
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">يلتزم PDPL – سدايا</span>
          <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200">تشفير بالنقل والسكون</span>
          <span className="px-3 py-1 rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100">RBAC + MFA للمشرفين</span>
          <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200">Audit Log وتقارير</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="p-4 rounded-xl border dark:border-white/10">
            <h3 className="font-bold mb-2">التكامل والامتثال</h3>
            <ul className="list-disc pr-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>الربط مع <b>النفاذ الوطني الموحّد (Nafath)</b> لتسجيل الدخول الأحادي (SSO) والتحقق الرسمي من الهوية.</li>
              <li>الالتزام بـ <b>نظام حماية البيانات الشخصية (PDPL)</b> الصادر عن <b>سدايا</b>.</li>
              <li>مواءمة ضوابط <b>الهيئة الوطنية للأمن السيبراني (NCA)</b> بما فيها <b>الضوابط الأساسية (ECC)</b> ومعايير السحابة (<b>CCC</b>).</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border dark:border-white/10">
            <h3 className="font-bold mb-2">ضوابط أمنية</h3>
            <ul className="list-disc pr-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>تشفير البيانات أثناء النقل (<b>TLS 1.2+</b>) وأثناء السكون (<b>At-Rest</b>).</li>
              <li>أدوار وصلاحيات دقيقة (<b>RBAC</b>) وتفعيل <b>MFA</b> للمشرفين والحسابات الحسّاسة.</li>
              <li>سجلات وتدقيق (<b>Audit Trail</b>) مع تنبيهات واستجابة للحوادث (IR) وتقارير دورية.</li>
              <li>اختبارات اختراق دورية (PenTest) وفحص ثغرات مستمر (VA) وخطة استمرارية الأعمال (BCP/DR).</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border dark:border-white/10 text-sm text-gray-600 dark:text-gray-300">
          نلتزم بتطبيق ضوابط الأمن والخصوصية المقرّرة في المملكة، ومواءمة أي متطلبات إضافية تحددها الجهة المتعاقدة، بما يشمل سياسات الاستضافة، العزل الشبكي، والتكامل الآمن مع أنظمة الجهة.
          <div className="mt-2 opacity-80">
            <em>ملاحظة: المحتوى أعلاه لأغراض معلوماتية عامة، وقد نُكيّفه وفق متطلبات العقد وسياسات الجهة واشتراطات المراجعة الأمنية.</em>
          </div>
        </div>
      </section>

      {/* قائمة الموظفين + الخريطة المصغّرة من المكوّن */}
      <section id="employees" className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-xl font-bold mb-4">الموظفون الأقرب</h2>
        <EmployeeList />
      </section>

      <footer className="max-w-6xl mx-auto px-6 py-10 text-xs text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} NAFIR – نموذج عرض.
      </footer>
    </main>
  );
}
