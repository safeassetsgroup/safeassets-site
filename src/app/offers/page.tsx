"use client";
import { useState } from "react";

type Asset = { assetNumber: string; make: string; model: string; hours: string; telemetry: "yes" | "no" };

export default function OffersPage() {
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [business, setBusiness] = useState({ name: "", abn: "" });
  const [assets, setAssets] = useState<Asset[]>([{ assetNumber: "", make: "", model: "", hours: "", telemetry: "no" }]);

  const addAsset = () => setAssets(a => [...a, { assetNumber: "", make: "", model: "", hours: "", telemetry: "no" }]);
  const removeAsset = (i: number) => setAssets(a => a.filter((_, idx) => idx !== i));
  const updateAsset = (i: number, field: keyof Asset, value: string) =>
    setAssets(a => a.map((row, idx) => (idx === i ? { ...row, [field]: value } : row)));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ contact, business, assets }); // replace with API call
    alert("Thanks! We’ll contact you shortly.");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900">Special Offer</h1>
      <p className="mt-2 text-gray-700">Enter your details and assets to claim the offer.</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-8">
        {/* Contact */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">Contact</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input className="input" placeholder="Full name" value={contact.name} onChange={e => setContact({ ...contact, name: e.target.value })} />
            <input className="input" placeholder="Email" type="email" value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} />
            <input className="input" placeholder="Phone" value={contact.phone} onChange={e => setContact({ ...contact, phone: e.target.value })} />
          </div>
        </section>

        {/* Business */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">Business</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input className="input" placeholder="Business name" value={business.name} onChange={e => setBusiness({ ...business, name: e.target.value })} />
            <input className="input" placeholder="ABN (optional)" value={business.abn} onChange={e => setBusiness({ ...business, abn: e.target.value })} />
          </div>
        </section>

        {/* Assets */}
        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Assets</h2>
            <button type="button" onClick={addAsset} className="px-4 py-2 rounded-md bg-orange-500 text-white font-semibold hover:bg-orange-600">
              Add asset
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {assets.map((a, i) => (
              <div key={i} className="rounded-lg border border-gray-200 p-4 grid grid-cols-1 sm:grid-cols-6 gap-3">
                <input className="input sm:col-span-1" placeholder="Asset #" value={a.assetNumber} onChange={e => updateAsset(i, "assetNumber", e.target.value)} />
                <input className="input sm:col-span-1" placeholder="Make" value={a.make} onChange={e => updateAsset(i, "make", e.target.value)} />
                <input className="input sm:col-span-1" placeholder="Model" value={a.model} onChange={e => updateAsset(i, "model", e.target.value)} />
                <input className="input sm:col-span-1" placeholder="Current hours" value={a.hours} onChange={e => updateAsset(i, "hours", e.target.value)} />
                <select className="input sm:col-span-1" value={a.telemetry} onChange={e => updateAsset(i, "telemetry", e.target.value)}>
                  <option value="no">Telemetry: No</option>
                  <option value="yes">Telemetry: Yes</option>
                </select>
                <button type="button" onClick={() => removeAsset(i)} className="px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 sm:col-span-1">
                  Remove
                </button>
              </div>
            ))}
          </div>
        </section>

        <div>
          <button type="submit" className="px-6 py-3 rounded-md bg-orange-500 text-white font-semibold hover:bg-orange-600">
            Submit
          </button>
        </div>
      </form>

      <style jsx global>{`
        .input {
          @apply w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500;
        }
      `}</style>
    </div>
  );
}