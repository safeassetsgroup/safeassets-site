import { NextResponse } from "next/server";
import { Resend } from "resend";

const resendKey = process.env.RESEND_API_KEY;
const resend = resendKey ? new Resend(resendKey) : null;

export async function POST(req: Request) {
  try {
    if (!resend) {
      return NextResponse.json({ error: "Email not configured (missing RESEND_API_KEY)" }, { status: 500 });
    }

    const { contact, business, assets, token } = await req.json();

    if (!contact?.email) {
      return NextResponse.json({ error: "Contact email is required" }, { status: 400 });
    }

    // Verify reCAPTCHA only when keys/token are present
    if (process.env.RECAPTCHA_SECRET_KEY && token) {
      const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET_KEY!,
          response: token,
        }),
      });
      const verify = await verifyRes.json();
      if (!verify.success || (verify.score ?? 0) < 0.5) {
        return NextResponse.json({ error: "reCAPTCHA failed" }, { status: 400 });
      }
    }

    const from = process.env.EMAIL_FROM!;
    const to = process.env.EMAIL_TO!;
    if (!from || !to) {
      return NextResponse.json({ error: "EMAIL_FROM or EMAIL_TO not set" }, { status: 500 });
    }

    const subject = `Special Offer submission from ${contact?.name || "Unknown"}`;
    const text = [
      `Contact: ${contact?.name || "-"} | ${contact?.email || "-"} | ${contact?.phone || "-"}`,
      `Business: ${business?.name || "-"} | ABN: ${business?.abn || "-"}`,
      "Assets:",
      ...(assets || []).map(
        (a: any, i: number) =>
          `  ${i + 1}. #${a.assetNumber || "-"} | ${a.make || "-"} ${a.model || "-"} | hours: ${a.hours || "-"} | telemetry: ${a.telemetry || "-"}`
      ),
    ].join("\n");

    const html = `
      <h2>Special Offer submission</h2>
      <p><strong>Contact</strong><br/>${contact?.name || "-"} | ${contact?.email || "-"} | ${contact?.phone || "-"}</p>
      <p><strong>Business</strong><br/>${business?.name || "-"} | ABN: ${business?.abn || "-"}</p>
      <h3>Assets</h3>
      <ul>
        ${(assets || [])
          .map(
            (a: any) =>
              `<li>#${a.assetNumber || "-"} | ${a.make || "-"} ${a.model || "-"} | hours: ${a.hours || "-"} | telemetry: ${a.telemetry || "-"}</li>`
          )
          .join("")}
      </ul>
    `;

    const result = await resend.emails.send({ from, to, subject, text, html });

    if ((result as any)?.error) {
      console.error("Resend error:", (result as any).error);
      return NextResponse.json({ error: "Email failed to send" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("Contact API error:", e);
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
  }
}
