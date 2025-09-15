import { NextResponse } from "next/server";
import { Resend } from "resend";
export async function GET() {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.EMAIL_TO || "sales@safeassets.group",
      subject: "SafeAssets test email",
      text: "This is a test from /api/email-test.",
    });
    if (error) return NextResponse.json({ ok: false, error }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Unknown" }, { status: 500 });
  }
}