import { NextResponse } from "next/server";
import { Resend } from "resend";

const resendKey = process.env.RESEND_API_KEY;
const resend = resendKey ? new Resend(resendKey) : null;

export async function POST(req: Request) {
  try {
    if (!resend) {
      return NextResponse.json({ error: "Email not configured (missing RESEND_API_KEY)" }, { status: 500 });
    }

    const body = await req.json();
    const token = body?.token;

    // Support both contact page and offers page payloads
    // Contact page: { name, email, phone, topic, message }
    // Offers page: full structured form, we map to contact/business/assets
    const isOffers = !!(body?.assets || body?.contactEmail);
    const contact = isOffers
      ? {
          name: `${body?.name || ""} ${body?.surname || ""}`.trim() || body?.contactName,
          email: body?.contactEmail,
          phone: body?.contactNumber,
        }
      : {
          name: body?.name,
          email: body?.email,
          phone: body?.phone,
        };
    const business = isOffers
      ? { name: body?.companyName, abn: body?.abn, address: body?.companyAddress, site: body?.site }
      : undefined;
    const assets = isOffers ? body?.assets : undefined;

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

    const from = process.env.EMAIL_FROM;
    const to = process.env.EMAIL_TO || "sales@safeassets.group";
    if (!from) {
      return NextResponse.json({ error: "EMAIL_FROM not set" }, { status: 500 });
    }

    const isSimpleContact = !isOffers;
    const plan = isOffers ? (body?.selectedPlan === "professional" ? "Professional" : body?.selectedPlan === "essential" ? "Essential" : undefined) : undefined;
    const subject = isSimpleContact
      ? `Website enquiry from ${contact?.name || "Unknown"}`
      : `Special Offer submission from ${contact?.name || "Unknown"}${plan ? ` [Plan: ${plan}]` : ""}`;
    const text = isSimpleContact
      ? [
          `Name: ${contact?.name || "-"}`,
          `Email: ${contact?.email || "-"}`,
          `Phone: ${contact?.phone || "-"}`,
          `Topic: ${body?.topic || "-"}`,
          `Message: ${body?.message || "-"}`,
        ].join("\n")
      : [
          `Contact: ${contact?.name || "-"} | ${contact?.email || "-"} | ${contact?.phone || "-"}`,
          `Business: ${business?.name || "-"} | ABN: ${business?.abn || "-"}${plan ? ` | Plan: ${plan}` : ""}`,
          "Assets:",
          ...(assets || []).map(
            (a: any, i: number) =>
              `  ${i + 1}. #${a.unitNumber || a.assetNumber || "-"} | ${a.make || "-"} ${a.model || "-"} | SMU/hours: ${a.smu || a.hours || "-"} | site: ${a.site || "-"}`
          ),
        ].join("\n");

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { width: 100%; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
          h1 { color: #2a3a4a; font-size: 24px; }
          h2 { color: #2a3a4a; font-size: 20px; border-bottom: 2px solid #eee; padding-bottom: 5px; margin-top: 20px; }
          .field-label { font-weight: bold; color: #555; }
          .field-value { margin-bottom: 15px; padding-left: 10px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th, td { text-align: left; padding: 8px; border-bottom: 1px solid #ddd; }
          th { background-color: #f9f9f9; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>${isSimpleContact ? "New Website Enquiry" : "New Pricing Request"}</h1>
          <p>A new pricing request has been submitted through the website.</p>
          
          <h2>Contact Details</h2>
          <p><span class="field-label">Name:</span><br><span class="field-value">${contact?.name || "-"}</span></p>
          <p><span class="field-label">Email:</span><br><span class="field-value">${contact?.email || "-"}</span></p>
          <p><span class="field-label">Phone:</span><br><span class="field-value">${contact?.phone || "-"}</span></p>
          
          ${isSimpleContact ? "" : "<h2>Business Details</h2>"}
          ${
            isSimpleContact
              ? ""
              : `<p><span class="field-label">Company:</span><br><span class="field-value">${business?.name || "-"}</span></p>
          <p><span class="field-label">ABN:</span><br><span class="field-value">${business?.abn || "-"}</span></p>`
          }

          ${
            isSimpleContact
              ? `<h2>Message</h2>
          <p class="field-value">${(body?.message || "-")
            .toString()
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")}</p>`
              : `<h2>Assets</h2>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Asset Number</th>
                <th>Make</th>
                <th>Model</th>
                <th>SMU (hrs)</th>
                <th>Site</th>
              </tr>
            </thead>
            <tbody>
              ${(assets || [])
                .map(
                  (a: any, i: number) => `
                <tr>
                  <td>${i + 1}</td>
                  <td>${a.unitNumber || a.assetNumber || "-"}</td>
                  <td>${a.make || "-"}</td>
                  <td>${a.model || "-"}</td>
                  <td>${a.smu || a.hours || "-"}</td>
                  <td>${a.site || "-"}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>`
          }
        </div>
      </body>
      </html>
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
