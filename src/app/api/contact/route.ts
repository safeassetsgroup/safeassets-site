import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

// Allow graceful degradation if environment variables are not configured
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const resendKey = process.env.RESEND_API_KEY;

const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

const resend = resendKey ? new Resend(resendKey) : null;

export async function POST(req: Request) {
  try {
    // Check if required services are configured
    if (!supabase || !resend) {
      return NextResponse.json(
        { error: "Contact service is not configured. Please check environment variables." },
        { status: 500 }
      );
    }

    const { contact, business, assets, token } = await req.json();

    // ✅ Verify reCAPTCHA
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (secret && token) {
      const verify = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: token }),
      }).then((r) => r.json());

      if (!verify.success || (verify.score ?? 0) < 0.5) {
        return NextResponse.json({ error: "reCAPTCHA failed" }, { status: 400 });
      }
    }

    // ✅ Insert into Supabase
    const { error } = await supabase.from("contact_messages").insert([
      {
        name: contact.name,
        email: contact.email,
        message: JSON.stringify({
          phone: contact.phone,
          business,
          assets,
        }),
      },
    ]);

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // ✅ Send email notification
    await resend.emails.send({
      from: "Safe Assets Group <notifications@yourdomain.com>",
      to: "youremail@example.com", // replace with your email
      subject: "New Contact Form Submission",
      html: `
        <h2>New Submission from ${contact.name}</h2>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Phone:</strong> ${contact.phone}</p>
        <p><strong>Business:</strong> ${business.name} (ABN: ${business.abn || "N/A"})</p>
        <pre>${JSON.stringify(assets, null, 2)}</pre>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
