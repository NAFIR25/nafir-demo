import { NextResponse } from "next/server";

/**
 * محاكاة إرسال عبر مزوّد (Twilio/WhatsApp Cloud)
 * تُرجع sid و statusCallback (وهمية) بدون إرسال فعلي
 */
export async function POST(req: Request) {
  try {
    const { to, channel, text } = await req.json();
    if (!to || !channel) return NextResponse.json({ ok: false, error: "Missing to/channel" }, { status: 400 });

    // مولّد sid وهمي
    const sid = `SIM-${channel.toUpperCase()}-${Math.random().toString(36).slice(2, 10)}`;

    // في العالم الحقيقي: نرسل للمزوّد ونضبط statusCallback لعنوان webhook لدينا
    // هنا فقط نرجع قيم توضيحية
    return NextResponse.json({
      ok: true,
      provider: channel === "whatsapp" ? "whatsapp_cloud" : "twilio_voice",
      sid,
      statusCallback: "/api/mock/webhook", // وهمي
      acceptedAt: Date.now()
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Unknown error" }, { status: 500 });
  }
}
