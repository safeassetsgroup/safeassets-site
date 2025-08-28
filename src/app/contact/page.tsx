"use client";

import { useMemo, useState } from "react";
import { Dialog } from "@headlessui/react";
import {
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  ShieldCheck,
  Loader2,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
    consent: false,
  });
  const [touched, setTouched] = useState<{ [k: string]: boolean }>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = "Please tell us your name.";
    if (!formData.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Please enter a valid email.";
    if (!formData.topic) e.topic = "Choose a topic.";
    if (!formData.message.trim()) e.message = "A short message helps us help you.";
    if (!formData.consent) e.consent = "Please accept our privacy note.";
    return e;
  }, [formData]);

  const isValid = Object.keys(errors).length === 0;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as any;
    setFormData((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    const name = (e.target as HTMLInputElement).name;
    if (name) setTouched((t) => ({ ...t, [name]: true }));
  };

  const getRecaptchaToken = async () => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    const g = typeof window !== "undefined" ? (window as any).grecaptcha : undefined;
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
    setTouched({ name: true, email: true, phone: true, topic: true, message: true, consent: true });
    if (!isValid) return;

    setLoading(true);
    setError(null);
    try {
      const token = await getRecaptchaToken();
      if (!token) {
        setError("ReCAPTCHA verification failed. Please try again.");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, token }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Submission failed.");
        setLoading(false);
        return;
      }

      setShowSuccessModal(true);
      setFormData({ name: "", email: "", phone: "", topic: "", message: "", consent: false });
      setTouched({});
    } catch (err: any) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    setError(null);
  };

  const messageCount = formData.message.length;
  const messageMax = 1200;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER / HERO */}
      <section className="relative isolate bg-gradient-to-b from-blue-700 to-blue-600 text-white pt-28 pb-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl py-10">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm leading-6 ring-1 ring-inset ring-white/20">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              We typically reply within 1 business day
            </p>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Let's talk about your project
            </h1>
            <p className="mt-4 text-lg text-blue-100">
              Send us a message and our team will get back to you with the next steps.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="mx-auto mt-10 max-w-7xl px-6 pb-24 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* LEFT: Contact options */}
          <aside className="lg:col-span-5">
            <div className="rounded-2xl bg-white p-6 shadow border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Contact options</h2>
              <p className="mt-2 text-sm text-gray-600">
                Prefer not to use the form? Reach us using any option below.
              </p>

              <ul className="mt-6 space-y-4">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 rounded-lg bg-blue-50 p-2 ring-1 ring-blue-100">
                    <Mail className="h-5 w-5 text-blue-700" />
                  </span>
                  <div>
                    <div className="font-medium text-gray-900">Email</div>
                    <a className="text-blue-700 hover:underline" href="mailto:admin@safeassets.group">
                      info@example.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 rounded-lg bg-blue-50 p-2 ring-1 ring-blue-100">
                    <Phone className="h-5 w-5 text-blue-700" />
                  </span>
                  <div>
                    <div className="font-medium text-gray-900">Phone</div>
                    <a className="text-blue-700 hover:underline" href="tel:0419 283 977">
                      +61 1300 000 000
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 rounded-lg bg-blue-50 p-2 ring-1 ring-blue-100">
                    <MapPin className="h-5 w-5 text-blue-700" />
                  </span>
                  <div>
                    <div className="font-medium text-gray-900">Office</div>
                    <p className="text-gray-700">Toowoomba, QLD</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 rounded-lg bg-blue-50 p-2 ring-1 ring-blue-100">
                    <Clock className="h-5 w-5 text-blue-700" />
                  </span>
                  <div>
                    <div className="font-medium text-gray-900">Hours</div>
                    <p className="text-gray-700">Mon–Fri, 9:00am–5:00pm AEST</p>
                  </div>
                </li>
              </ul>

              <div className="mt-8 rounded-lg bg-gray-50 p-4 ring-1 ring-gray-200">
                <div className="flex items-start gap-3">
                  <MessageCircle className="mt-0.5 h-5 w-5 text-blue-700" />
                  <p className="text-sm text-gray-700">
                    For support queries, include your reference or asset ID so we can locate your record quickly.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT: Form */}
          <section className="lg:col-span-7">
            {/* form code same as previous version */}
          </section>
        </div>

        {/* MAP / LOCATION */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-gray-200 shadow">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="bg-white p-6">
              <h3 className="text-lg font-semibold text-gray-900">Visit us</h3>
              <p className="mt-2 text-sm text-gray-600">
                You're welcome to drop in by appointment. Parking available nearby.
              </p>
              <dl className="mt-6 space-y-2 text-sm text-gray-700">
                <div className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 text-blue-700"/><span>Toowoomba, QLD</span></div>
                <div className="flex gap-2"><Clock className="mt-0.5 h-4 w-4 text-blue-700"/><span>Mon–Fri, 9:00am–5:00pm AEST</span></div>
              </dl>
            </div>
            <div className="md:col-span-2">
              <div className="h-72 w-full bg-gray-100 md:h-80">
                <iframe
                  title="Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3753.958508019655!2d151.9125080753296!3d-27.55980811144411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b946a75254207a5%3A0x502a35af3de1c820!2sToowoomba%20QLD%2C%20Australia!5e0!3m2!1sen!2sus!4v1693300000000z=8"
                  className="h-full w-full block"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Success Modal */}
      <Dialog as="div" className="relative z-50" open={showSuccessModal} onClose={closeModal}>
        <div className="fixed inset-0 bg-gray-500/50" aria-hidden="true" />
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-200">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <CheckCircle className="h-6 w-6 text-blue-700" aria-hidden="true" />
            </div>
            <Dialog.Title as="h3" className="mt-4 text-center text-xl font-semibold text-gray-900">
              Message sent
            </Dialog.Title>
            <p className="mt-2 text-center text-sm text-gray-600">
              Thanks for reaching out. We'll get back to you shortly.
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

function cnInput(hasError?: boolean) {
  const base = "w-full rounded-md border bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-600 focus:border-blue-600";
  const err = "border-red-300 focus:ring-red-600 focus:border-red-600";
  return hasError ? `${base} ${err}` : base;
}
