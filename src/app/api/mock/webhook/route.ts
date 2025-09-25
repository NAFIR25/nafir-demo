import { NextResponse } from "next/server";

/**
 * Webhook وهمي: لا يحدّث شيئًا.
 * فقط موجود لشرح الشكل المعماري.
 */
export async function POST() {
  return NextResponse.json({ ok: true, note: "Mock webhook received" });
}
