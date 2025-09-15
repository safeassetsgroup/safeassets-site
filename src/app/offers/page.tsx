"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Dialog } from "@headlessui/react";
import {
  CheckCircle,
  X,
  Building2,
  UserRound,
  Mail,
  Phone,
  MapPin,
  FileText,
  Plus,
  Package,
} from "lucide-react";

/* -----------------------------
   Industry options (unchanged)
------------------------------ */
const INDUSTRY_OPTIONS = [
  { value: "", label: "Select industry" },
  { value: "construction", label: "Construction" },
  { value: "agriculture", label: "Agriculture" },
  { value: "transport-logistics", label: "Transport & Logistics" },
  { value: "energy-utilities", label: "Energy & Utilities" },
  { value: "defence-security", label: "Defence & Security" },
  { value: "strata-property", label: "Strata & Property" },
  { value: "other", label: "Other" },
];

/* -----------------------------
   Types (unchanged)
------------------------------ */
export type Asset = {
  unitNumber: string;
  make: string;
  model: string;
  smu: string;
  site: string;
};

type FormState = {
  name: string;
  surname: string;
  companyName: string;
  companyAddress: string;
  site: string;
  abn: string;
  contactNumber: string;
  contactEmail: string;
  comments: string;
  assets: Asset[];
  industryType: string;
  industryOther: string;
};

/* ============================================================================
   PAGE
   The page component is now a simple Suspense wrapper to satisfy Next 15.
   All your original logic lives in <OffersContent/>.
============================================================================ */
export default function OffersPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-5xl">
            <div className="h-24 animate-pulse rounded-2xl bg-gray-200" />
          </div>
        </div>
      }
    >
      <OffersContent />
    </Suspense>
  );
}

/* ============================================================================
   CONTENT (your original component logic)
============================================================================ */
function OffersContent() {
  // ✅ Safe now because it's inside <Suspense>
  const searchParams = useSearchParams();
  const planRaw = (searchParams.get("plan") || "").toLowerCase();

  const selectedPlan: "essential" | "professional" | null =
    planRaw === "essential" ? "essential" : planRaw === "professional" ? "professional" : null;

  // Banner styling derived from plan
  const banner = useMemo(() => {
    if (selectedPlan === "essential") {
      return {
        gradient: "from-emerald-600 to-emerald-500",
        ring: "ring-emerald-500/30",
        label: "Selected plan: Essential — AU$33/week",
      };
    }
    if (selectedPlan === "professional") {
      return {
        gradient: "from-blue-900 to-blue-800",
        ring: "ring-blue-700/30",
        label: "Selected plan: Professional — AU$55/week",
      };
    }
    return {
      gradient: "from-blue-700 to-blue-600",
      ring: "ring-blue-500/30",
      label: null as string | null,
    };
  }, [selectedPlan]);

  const [formData, setFormData] = useState<FormState>({
    name: "",
    surname: "",
    companyName: "",
    companyAddress: "",
    site: "",
    abn: "",
    contactNumber: "",
    contactEmail: "",
    comments: "",
    assets: [{ unitNumber: "", make: "", model: "", smu: "", site: "" }],
    industryType: "",
    industryOther: "",
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // ---------- Validation ----------
  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail || "");

    if (!formData.name.trim()) e.name = "First name is required.";
    if (!formData.surname.trim()) e.surname = "Surname is required.";
    if (!formData.companyName.trim()) e.companyName = "Company name is required.";
    if (!formData.contactNumber.trim()) e.contactNumber = "Contact number is required.";

    if (!formData.contactEmail.trim()) e.contactEmail = "Email is required.";
    else if (!emailOk) e.contactEmail = "Enter a valid email address.";

    if (!formData.industryType) e.industryType = "Please select your industry.";
    if (formData.industryType === "other" && !formData.industryOther.trim()) {
      e.industryOther = "Please specify your industry.";
    }

    if (!formData.assets.length) {
      e.assets = "Add at least one asset.";
    } else {
      formData.assets.forEach((a, i) => {
        if (!a.unitNumber.trim() || !a.make.trim() || !a.model.trim()) {
          e[`asset-${i}`] = "Unit #, Make, and Model are required.";
        }
      });
    }

    return e;
  }, [formData]);

  const hasErrors = Object.keys(errors).length > 0;

  // ---------- Handlers ----------
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    const { name } = e.target as HTMLInputElement;
    if (name) setTouched((t) => ({ ...t, [name]: true }));
  };

  const addAsset = () => {
    setFormData((prev) => ({
      ...prev,
      assets: [...prev.assets, { unitNumber: "", make: "", model: "", smu: "", site: "" }],
    }));
  };

  const removeAsset = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      assets: prev.assets.filter((_, i) => i !== index),
    }));
  };

  const updateAsset = (index: number, field: keyof Asset, value: string) => {
    const updatedAssets = formData.assets.map((a, i) => (i === index ? { ...a, [field]: value } : a));
    setFormData((prev) => ({ ...prev, assets: updatedAssets }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      name: true,
      surname: true,
      companyName: true,
      companyAddress: true,
      site: true,
      abn: true,
      contactNumber: true,
      contactEmail: true,
      comments: true,
      industryType: true,
      industryOther: formData.industryType === "other",
    });

    if (hasErrors) {
      setErrorMsg("Please fix the highlighted fields.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      const g = typeof window !== "undefined" ? (window as any).grecaptcha : undefined;
      const token = g && siteKey ? await g.execute(siteKey, { action: "submit" }) : undefined;

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          token,
          selectedPlan,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrorMsg(data.error || "Submission failed.");
        return;
      }
      setShowSuccessModal(true);

      // Reset form
      setFormData({
        name: "",
        surname: "",
        companyName: "",
        companyAddress: "",
        site: "",
        abn: "",
        contactNumber: "",
        contactEmail: "",
        comments: "",
        assets: [{ unitNumber: "", make: "", model: "", smu: "", site: "" }],
        industryType: "",
        industryOther: "",
      });
      setTouched({});
    } catch (err: any) {
      setErrorMsg(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setShowSuccessModal(false);

  // ---------- UI ----------
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        {/* Header Card (color changes by selected plan) */}
        <div
          className={`rounded-2xl bg-gradient-to-br ${banner.gradient} p-6 text-white shadow-lg ring-1 ${banner.ring}`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-widest text-white/80">Special Offer</p>
              <h1 className="mt-1 text-3xl font-extrabold">Claim your onboarding bundle</h1>
              <p className="mt-1 text-white/90">
                Fill in your details and the assets you want covered. We will get back to you quickly.
              </p>
              {banner.label && (
                <p className="mt-3 inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-sm font-medium">
                  {banner.label}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="rounded-2xl border border-gray-200 bg-white p-6 shadow">
          {/* Hidden field so backend knows which pricing the user chose */}
          <input type="hidden" name="selectedPlan" value={selectedPlan ?? ""} />

          {/* Error banner */}
          {errorMsg && (
            <div className="mb-6 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-red-800">
              {errorMsg}
            </div>
          )}

          {/* Your Details */}
          <section aria-labelledby="your-details">
            <div className="mb-4 flex items-center gap-2">
              <UserRound className="h-5 w-5 text-blue-700" />
              <h2 id="your-details" className="text-lg font-semibold text-gray-900">
                Your details
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <LabeledInput
                label="First name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                error={touched.name ? errors.name : undefined}
                autoComplete="given-name"
              />
              <LabeledInput
                label="Surname"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                error={touched.surname ? errors.surname : undefined}
                autoComplete="family-name"
              />
              <LabeledInput
                label="Company name"
                icon={<Building2 className="h-4 w-4 text-gray-400" />}
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                error={touched.companyName ? errors.companyName : undefined}
                autoComplete="organization"
              />

              <LabeledSelect
                label="Industry"
                name="industryType"
                value={formData.industryType}
                onChange={handleChange}
                onBlur={handleBlur}
                options={INDUSTRY_OPTIONS}
                required
                error={touched.industryType ? errors.industryType : undefined}
              />

              {formData.industryType === "other" && (
                <LabeledInput
                  label="Industry (please specify)"
                  name="industryOther"
                  value={formData.industryOther}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  error={touched.industryOther ? errors.industryOther : undefined}
                  placeholder="e.g. Waste management"
                />
              )}

              <LabeledInput
                label="ABN (optional)"
                name="abn"
                value={formData.abn}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
              />
              <LabeledInput
                label="Company address"
                icon={<MapPin className="h-4 w-4 text-gray-400" />}
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="street-address"
              />
              <LabeledInput
                label="Site (optional)"
                name="site"
                value={formData.site}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
              />
              <LabeledInput
                label="Contact number"
                icon={<Phone className="h-4 w-4 text-gray-400" />}
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                error={touched.contactNumber ? errors.contactNumber : undefined}
                inputMode="tel"
                autoComplete="tel"
              />
              <LabeledInput
                label="Contact email"
                icon={<Mail className="h-4 w-4 text-gray-400" />}
                name="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                error={touched.contactEmail ? errors.contactEmail : undefined}
                autoComplete="email"
              />
            </div>

            <LabeledTextarea
              className="mt-6"
              label="Comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={5}
              placeholder="Tell us anything that will help with your request."
              icon={<FileText className="h-4 w-4 text-gray-400" />}
            />
          </section>

          {/* Assets */}
          <section aria-labelledby="asset-details" className="mt-10">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-700" />
                <h2 id="asset-details" className="text-lg font-semibold text-gray-900">
                  Asset details
                </h2>
              </div>
              {errors.assets && (
                <span className="text-sm font-medium text-red-600">{errors.assets}</span>
              )}
            </div>

            <div className="space-y-4">
              {formData.assets.map((asset, index) => {
                const rowError = errors[`asset-${index}`];
                return (
                  <div
                    key={index}
                    className={`rounded-xl border p-4 shadow-sm ${
                      rowError ? "border-red-300 bg-red-50/40" : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 text-sm font-medium text-gray-700">
                        <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-2 ring-1 ring-gray-200">
                          #{index + 1}
                        </span>
                        {rowError && <span className="text-red-600">{rowError}</span>}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAsset(index)}
                        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-gray-600 hover:bg-white hover:text-gray-900"
                        aria-label={`Remove asset ${index + 1}`}
                      >
                        <X className="h-4 w-4" />
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                      <LabeledInput
                        label="Unit #"
                        value={asset.unitNumber}
                        onChange={(e) => updateAsset(index, "unitNumber", e.target.value)}
                        required
                      />
                      <LabeledInput
                        label="Make"
                        value={asset.make}
                        onChange={(e) => updateAsset(index, "make", e.target.value)}
                        required
                      />
                      <LabeledInput
                        label="Model"
                        value={asset.model}
                        onChange={(e) => updateAsset(index, "model", e.target.value)}
                        required
                      />
                      <LabeledInput
                        label="SMU (hrs)"
                        value={asset.smu}
                        onChange={(e) => updateAsset(index, "smu", e.target.value)}
                        inputMode="numeric"
                      />
                      <LabeledInput
                        label="Site"
                        value={asset.site}
                        onChange={(e) => updateAsset(index, "site", e.target.value)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={addAsset}
              className="mt-4 inline-flex items-center gap-2 rounded-md bg-blue-700 px-4 py-2 font-semibold text-white shadow-sm hover:bg-blue-800"
            >
              <Plus className="h-4 w-4" />
              Add another asset
            </button>
          </section>

          {/* Submit */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-blue-700 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit request"}
            </button>
            <p className="mt-3 text-center text-xs text-gray-500">
              By submitting, you agree to our{" "}
              <a href="/privacy" className="underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      <Dialog as="div" className="relative z-50" open={showSuccessModal} onClose={closeModal}>
        <div className="fixed inset-0 bg-gray-500/50" aria-hidden="true" />
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-200">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <CheckCircle className="h-6 w-6 text-blue-700" aria-hidden="true" />
            </div>
            <Dialog.Title as="h3" className="mt-4 text-center text-xl font-semibold text-gray-900">
              Thanks!
            </Dialog.Title>
            <p className="mt-2 text-center text-sm text-gray-600">
              We have received your submission and will contact you shortly.
            </p>
            <button
              type="button"
              onClick={closeModal}
              className="mt-6 inline-flex w-full justify-center rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}

/* -----------------------------
   Small UI primitives (unchanged)
------------------------------ */
function LabeledInput(props: {
  label: string;
  name?: string;
  type?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
  error?: string;
  icon?: React.ReactNode;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
  className?: string;
}) {
  const {
    label,
    name,
    type = "text",
    value,
    onChange,
    onBlur,
    placeholder,
    required,
    error,
    icon,
    inputMode,
    autoComplete,
    className,
  } = props;

  return (
    <div className={className}>
      <label className="mb-1 block text-sm font-medium text-gray-900">
        {label}
        {required ? " *" : ""}
      </label>
      <div className="relative">
        {icon && <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">{icon}</span>}
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          inputMode={inputMode}
          autoComplete={autoComplete}
          className={`w-full rounded-md border bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${
            error
              ? "border-red-300 focus:ring-red-600 focus:border-red-600"
              : "border-gray-300 focus:ring-blue-600 focus:border-blue-600"
          } ${icon ? "pl-9" : ""}`}
          aria-invalid={!!error}
          aria-describedby={error && name ? `${name}-error` : undefined}
          required={required}
        />
      </div>
      {error && name && (
        <p id={`${name}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function LabeledTextarea(props: {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  rows?: number;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  const { label, name, value, onChange, onBlur, rows = 4, placeholder, icon, className } = props;

  return (
    <div className={className}>
      <label className="mb-1 block text-sm font-medium text-gray-900">{label}</label>
      <div className="relative">
        {icon && <span className="pointer-events-none absolute left-3 top-3">{icon}</span>}
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          rows={rows}
          placeholder={placeholder}
          className={`w-full rounded-md border bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-600 focus:border-blue-600 ${icon ? "pl-9" : ""}`}
        />
      </div>
    </div>
  );
}

function LabeledSelect(props: {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  onBlur?: React.FocusEventHandler<HTMLSelectElement>;
  options: { label: string; value: string }[];
  required?: boolean;
  error?: string;
  className?: string;
}) {
  const { label, name, value, onChange, onBlur, options, required, error, className } = props;

  return (
    <div className={className}>
      <label className="mb-1 block text-sm font-medium text-gray-900">
        {label}
        {required ? " *" : ""}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full rounded-md border bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 ${
          error
            ? "border-red-300 focus:ring-red-600 focus:border-red-600"
            : "border-gray-300 focus:ring-blue-600 focus:border-blue-600"
        }`}
        aria-invalid={!!error}
        aria-describedby={error && name ? `${name}-error` : undefined}
        required={required}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
