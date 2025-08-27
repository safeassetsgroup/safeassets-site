"use client";
import { useState } from "react";

/* global grecaptcha */
declare const grecaptcha: {
  execute(siteKey: string, opts: { action: string }): Promise<string>;
};

type Asset = {
  assetNumber: string;
  make: string;
  model: string;
  hours: string;
  telemetry: "yes" | "no";
};

export default function OffersPage() {
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [business, setBusiness] = useState({ name: "", abn: "" });
  const [assets, setAssets] = useState<Asset[]>([
    { assetNumber: "", make: "", model: "", hours: "", telemetry: "no" },
  ]);
  const [loading, setLoading] = useState(false);

  const addAsset = () =>
    setAssets((a) => [
      ...a,
      { assetNumber: "", make: "", model: "", hours: "", telemetry: "no" },
    ]);
  const removeAsset = (i: number) =>
    setAssets((a) => a.filter((_, idx) => idx !== i));
  const updateAsset = (i: number, field: keyof Asset, value: string) =>
    setAssets((a) =>
      a.map((row, idx) => (idx === i ? { ...row, [field]: value } : row))
    );

  const inputCls =
    "w-full rounded-md border border-gray-600 bg-gray-800/70 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500";

  // Safe helper for reCAPTCHA (skips if not configured)
  const getRecaptchaToken = async () => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    const g = (typeof window !== "undefined" ? (window as any).grecaptcha : undefined);
    if (g && siteKey) {
      try {
        return await g.execute(siteKey, { action: "submit" });
      } catch {
        return undefined;
      }
    }
    return undefined;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = await getRecaptchaToken();

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact, business, assets, token }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(data.error || "Submission failed.");
        return;
      }

      alert("Thanks! We’ll contact you shortly.");
      setContact({ name: "", email: "", phone: "" });
      setBusiness({ name: "", abn: "" });
      setAssets([{ assetNumber: "", make: "", model: "", hours: "", telemetry: "no" }]);
    } catch (err: any) {
      alert(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-white">Special Offer</h1>
        <p className="mt-2 text-gray-300">
          Enter your details and assets to claim the offer.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-8">
          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-white">Contact</h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                className={inputCls}
                placeholder="Full name"
                value={contact.name}
                onChange={(e) =>
                  setContact({ ...contact, name: e.target.value })
                }
              />
              <input
                className={inputCls}
                placeholder="Email"
                type="email"
                value={contact.email}
                onChange={(e) =>
                  setContact({ ...contact, email: e.target.value })
                }
              />
              <input
                className={inputCls}
                placeholder="Phone"
                value={contact.phone}
                onChange={(e) =>
                  setContact({ ...contact, phone: e.target.value })
                }
              />
            </div>
          </section>

          {/* Business */}
          <section>
            <h2 className="text-xl font-semibold text-white">Business</h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                className={inputCls}
                placeholder="Business name"
                value={business.name}
                onChange={(e) =>
                  setBusiness({ ...business, name: e.target.value })
                }
              />
              <input
                className={inputCls}
                placeholder="ABN (optional)"
                value={business.abn}
                onChange={(e) =>
                  setBusiness({ ...business, abn: e.target.value })
                }
              />
            </div>
          </section>

          {/* Assets */}
          <section>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Assets</h2>
              <button
                type="button"
                onClick={addAsset}
                className="px-4 py-2 rounded-md bg-orange-500 text-white font-semibold hover:bg-orange-600"
              >
                Add asset
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {assets.map((a, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-gray-700 bg-gray-800/60 p-4 grid grid-cols-1 sm:grid-cols-6 gap-3"
                >
                  <input
                    className={`${inputCls} sm:col-span-1`}
                    placeholder="Asset #"
                    value={a.assetNumber}
                    onChange={(e) =>
                      updateAsset(i, "assetNumber", e.target.value)
                    }
                  />
                  <input
                    className={`${inputCls} sm:col-span-1`}
                    placeholder="Make"
                    value={a.make}
                    onChange={(e) => updateAsset(i, "make", e.target.value)}
                  />
                  <input
                    className={`${inputCls} sm:col-span-1`}
                    placeholder="Model"
                    value={a.model}
                    onChange={(e) => updateAsset(i, "model", e.target.value)}
                  />
                  <input
                    className={`${inputCls} sm:col-span-1`}
                    placeholder="Current hours"
                    value={a.hours}
                    onChange={(e) => updateAsset(i, "hours", e.target.value)}
                  />
                  <select
                    className={`${inputCls} sm:col-span-1`}
                    value={a.telemetry}
                    onChange={(e) =>
                      updateAsset(i, "telemetry", e.target.value)
                    }
                  >
                    <option className="bg-gray-900" value="no">
                      Telemetry: No
                    </option>
                    <option className="bg-gray-900" value="yes">
                      Telemetry: Yes
                    </option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeAsset(i)}
                    className="px-3 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white sm:col-span-1"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </section>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-md bg-orange-500 text-white font-semibold hover:bg-orange-600 disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
