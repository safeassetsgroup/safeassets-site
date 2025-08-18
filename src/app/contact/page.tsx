// src/app/contact/page.tsx
"use client";

import ContactForm from "@/components/ContactForm";
import ChatWidget from "@/components/ChatWidget";

export default function ContactPage() {
  return (
    // match Home/Industries background (inherit root layout/body) and use dark text for readability
    <main className="min-h-screen bg-white text-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-orange-600">Contact Us</h1>
        </header>

        <div className="grid gap-8 md:grid-cols-3 items-start">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 sm:p-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Send a message</h2>
              <p className="text-sm text-gray-600 mb-6">Use the form below or start a chat. We aim to respond within one business day.</p>
              <ContactForm />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Contact details</h3>
              <dl className="text-sm text-gray-700 space-y-2">
                <div>
                  <dt className="font-medium">Email</dt>
                  <dd>
                    <a href="mailto:hello@safeassets.example" className="text-orange-600 underline">hello@safeassets.example</a>
                  </dd>
                </div>

                <div>
                  <dt className="font-medium">Phone</dt>
                  <dd>
                    <a href="tel:+61212345678" className="text-gray-700">+61 2 1234 5678</a>
                  </dd>
                </div>

                <div>
                  <dt className="font-medium">Address</dt>
                  <dd className="text-gray-700">Level 5, 123 Industrial Ave, Sydney NSW 2000, Australia</dd>
                </div>
              </dl>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Support & resources</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li><a href="/docs" className="text-orange-600 hover:underline">Documentation</a></li>
                <li><a href="/faq" className="text-orange-600 hover:underline">FAQ</a></li>
                <li><a href="/pricing" className="text-orange-600 hover:underline">Pricing & plans</a></li>
              </ul>
            </div>

            <div className="hidden md:block">
              <ChatWidget />
            </div>
          </aside>
        </div>
      </div>

      <div className="md:hidden"><ChatWidget /></div>
    </main>
  );
}

