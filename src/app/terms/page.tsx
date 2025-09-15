export const metadata = {
  title: "Terms of Service | SafeAssets",
  description: "Terms of Service for SafeAssets Group",
};

export default function TermsPage() {
  return (
    <section className="bg-white text-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold">Terms of Service</h1>
        <p className="mt-2 text-sm text-gray-500">Effective date: August 27, 2025</p>

        <div className="prose prose-slate max-w-none mt-8">
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing and using <a href="https://safeassets.group" target="_blank" rel="noopener noreferrer">https://safeassets.group</a>,
            you agree to be bound by these Terms of Service ("Terms"). If you do not agree, you must not use this website.
          </p>

          <h2>2. Use of the Website</h2>
          <p>You agree to use the website for lawful purposes only. You shall not:</p>
          <ul>
            <li>Use the site to distribute viruses or malicious software.</li>
            <li>Attempt unauthorized access to our servers or data.</li>
            <li>Reproduce or redistribute content without permission.</li>
          </ul>

          <h2>3. Services and Content</h2>
          <p>
            All content and services provided on this website are for general information purposes. We reserve the right
            to modify or discontinue any services or features without notice.
          </p>

          <h2>4. Intellectual Property</h2>
          <p>
            All content, logos, text, graphics, and software are the property of SafeAssets Group or its licensors and
            are protected by intellectual property laws.
          </p>

          <h2>5. Third-Party Links</h2>
          <p>
            This site may contain links to third-party websites. We are not responsible for the content, policies, or
            practices of those sites.
          </p>

          <h2>6. Disclaimer of Warranties</h2>
          <p>
            The website and its content are provided "as is" without any warranties, express or implied. We do not
            guarantee the accuracy or reliability of information presented.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, SafeAssets Group is not liable for any direct, indirect, incidental,
            or consequential damages resulting from your use of the website.
          </p>

          <h2>8. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of Australia. Any disputes
            arising from these Terms shall be subject to the exclusive jurisdiction of the courts in Australia.
          </p>

          <h2>9. Contact</h2>
          <p>
            For any questions about these Terms, please contact us at{" "}
            <a href="mailto:sales@safeassets.group">sales@safeassets.group</a>.
          </p>
        </div>
      </div>
    </section>
  );
}