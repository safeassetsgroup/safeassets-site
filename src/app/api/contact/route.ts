import { NextResponse } from "next/server";

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;

async function verifyRecaptcha(token: string | undefined) {
  if (!RECAPTCHA_SECRET || !token) return { ok: false, reason: "missing-recaptcha-config" };
  const params = new URLSearchParams();
  params.append("secret", RECAPTCHA_SECRET);
  params.append("response", token);
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      body: params,
    });
    const data = await res.json();
    // v3 returns score; require success and reasonable score
    if (!data.success) return { ok: false, reason: "recaptcha-failed", details: data };
    const score = typeof data.score === "number" ? data.score : 1;
    if (score < 0.45) return { ok: false, reason: "low-score", score, details: data };
    return { ok: true, score, details: data };
  } catch (err) {
    return { ok: false, reason: "recaptcha-error" };
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, recaptchaToken } = body ?? {};

    // verify recaptcha first
    const recRes = await verifyRecaptcha(recaptchaToken);
    if (!recRes.ok) {
      return NextResponse.json({ error: "reCAPTCHA verification failed." , details: recRes }, { status: 400 });
    }

    // basic required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
      return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    }

    // TODO: send email/store message. Currently log and return success.
    // eslint-disable-next-line no-console
    console.log("Contact message received:", { name, email, message });

    return NextResponse.json({ ok: true, message: "Accepted." }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}