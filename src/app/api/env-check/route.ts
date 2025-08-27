import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({
    RESEND_API_KEY: !!process.env.RESEND_API_KEY,
    EMAIL_FROM: !!process.env.EMAIL_FROM,
    EMAIL_TO: !!process.env.EMAIL_TO,
    REC_SITE: !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    REC_SECRET: !!process.env.RECAPTCHA_SECRET_KEY,
  });
}