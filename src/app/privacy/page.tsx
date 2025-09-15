export const metadata = {
  title: "Privacy Policy | SafeAssets",
  description: "Privacy Statement for SafeAssets Group",
};

export default function PrivacyPage() {
  return (
    <section className="bg-white text-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold">Privacy Statement</h1>
        <p className="mt-2 text-sm text-gray-500">Effective date: August 27, 2025</p>

        <div className="prose prose-slate max-w-none mt-8">
          <h2>1. Introduction</h2>
          <p>
            SafeAssets Group ("we", "our", or "us") is committed to protecting your privacy. This Privacy Statement
            outlines how we collect, use, disclose, and safeguard your information when you visit our website
            <a href="https://safeassets.group" target="_blank" rel="noopener noreferrer"> https://safeassets.group</a>.
          </p>

          <h2>2. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul>
            <li>
              <strong>Personal Information:</strong> Name, email address, phone number, company name, job title, etc.
            </li>
            <li>
              <strong>Usage Data:</strong> IP address, browser type, pages visited, time spent on the site, and other analytics.
            </li>
            <li>
              <strong>Contact Forms:</strong> Any information submitted through contact or quote request forms.
            </li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Respond to inquiries or service requests.</li>
            <li>Provide and improve our services.</li>
            <li>Communicate updates, promotions, or news (only if you&apos;ve opted in).</li>
            <li>Comply with legal obligations.</li>
          </ul>

          <h2>4. Cookies &amp; Tracking</h2>
          <p>
            Our website may use cookies to enhance user experience, analyze traffic, and support site functionality. You
            may set your browser to refuse cookies, but some parts of the site may not function properly.
          </p>

          <h2>5. Data Sharing</h2>
          <p>We do not sell or rent your personal data. We may share information with:</p>
          <ul>
            <li>Third-party service providers (e.g., analytics, hosting, CRM systems).</li>
            <li>Legal authorities if required by law or to protect our rights.</li>
          </ul>

          <h2>6. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your data. However, no method of transmission
            over the internet is 100% secure.
          </p>

          <h2>7. Your Rights</h2>
          <p>Depending on your location, you may have rights under privacy laws (e.g., GDPR, CCPA) to:</p>
          <ul>
            <li>Access the data we hold about you.</li>
            <li>Request corrections or deletions.</li>
            <li>Opt out of marketing communications.</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at{" "}
            <a href="mailto:sales@safeassets.group">sales@safeassets.group</a>.
          </p>

          <h2>8. Changes to This Policy</h2>
          <p>
            We reserve the right to update this Privacy Statement. Any changes will be posted on this page with an
            updated effective date.
          </p>
        </div>
      </div>
    </section>
  );
}