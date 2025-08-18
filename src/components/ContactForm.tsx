"use client";

import { useEffect, useState } from "react";

type Errors = {
  name?: string;
  email?: string;
  message?: string;
};

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function validate(): boolean {
    const e: Errors = {};
    if (!name.trim()) e.name = "Name is required.";
    if (!email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email address.";
    if (!message.trim()) e.message = "Message is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // dynamically inject recaptcha script if site key present
  useEffect(() => {
    if (!SITE_KEY) return;
    if (document.querySelector(`script[data-recaptcha="v3"]`)) return;
    const s = document.createElement("script");
    s.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    s.async = true;
    s.defer = true;
    s.setAttribute("data-recaptcha", "v3");
    document.body.appendChild(s);
  }, []);

  async function getRecaptchaToken(): Promise<string | null> {
    if (!SITE_KEY) return null;
    // wait for grecaptcha to be available
    const grecaptcha = (window as any).grecaptcha;
    if (!grecaptcha || !grecaptcha.execute) {
      // small delay then try once more
      await new Promise((r) => setTimeout(r, 500));
    }
    if ((window as any).grecaptcha && (window as any).grecaptcha.execute) {
      try {
        const token = await (window as any).grecaptcha.execute(SITE_KEY, { action: "contact" });
        return token;
      } catch {
        return null;
      }
    }
    return null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatusMsg(null);

    if (!validate()) return;

    setSubmitting(true);

    try {
      const recaptchaToken = await getRecaptchaToken();

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          recaptchaToken,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setStatusMsg(data?.error ?? "Submission failed.");
      } else {
        setStatusMsg("Message sent. Thank you!");
        setName("");
        setEmail("");
        setMessage("");
        setErrors({});
      }
    } catch {
      setStatusMsg("Unexpected error. Try again later.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => { if (!name.trim()) setErrors((s) => ({ ...s, name: "Name is required." })); else setErrors((s) => ({ ...s, name: undefined })); }}
            className={`mt-1 block w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-orange-200 focus:outline-none ${errors.name ? "border-red-300" : "border-gray-200"}`}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && <p id="name-error" className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => { if (!email.trim()) setErrors((s) => ({ ...s, email: "Email is required." })); else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) setErrors((s) => ({ ...s, email: "Enter a valid email address." })); else setErrors((s) => ({ ...s, email: undefined })); }}
            className={`mt-1 block w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-orange-200 focus:outline-none ${errors.email ? "border-red-300" : "border-gray-200"}`}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">Message</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onBlur={() => { if (!message.trim()) setErrors((s) => ({ ...s, message: "Message is required." })); else setErrors((s) => ({ ...s, message: undefined })); }}
          rows={6}
          className={`mt-1 block w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-orange-200 focus:outline-none ${errors.message ? "border-red-300" : "border-gray-200"}`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && <p id="message-error" className="mt-1 text-sm text-red-600">{errors.message}</p>}
      </label>

      <div className="flex items-center gap-4 mt-2">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-black font-semibold px-5 py-2 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-orange-300 disabled:opacity-60"
          style={{ color: "#000" }}
        >
          {submitting ? "Sending…" : "Send message"}
        </button>

        <button
          type="button"
          onClick={() => { setName(""); setEmail(""); setMessage(""); setErrors({}); }}
          className="px-4 py-2 rounded-md border hover:bg-gray-50"
        >
          Reset
        </button>

        {statusMsg && (
          <div role="status" className="ml-2 text-sm text-green-600">
            {statusMsg}
          </div>
        )}
      </div>
    </form>
  );
}