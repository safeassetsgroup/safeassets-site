export const metadata = {
  title: "Email Status | SafeAssets",
};

async function fetchJson(path: string) {
  try {
    const res = await fetch(path, { cache: "no-store" });
    return await res.json();
  } catch (e) {
    return { error: (e as any)?.message || "Request failed" };
  }
}

export default async function EmailStatusPage() {
  const env = await fetchJson("/api/env-check");

  return (
    <section className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-bold">Email Status</h1>
      <p className="mt-2 text-sm text-gray-600">
        Quick checks for Resend configuration and an easy test sender.
      </p>

      <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4">
        <h2 className="font-semibold">Environment</h2>
        <pre className="mt-2 overflow-auto rounded bg-gray-50 p-3 text-sm text-gray-800">
{JSON.stringify(env, null, 2)}
        </pre>
      </div>

      <form
        action="/api/email-test"
        method="get"
        className="mt-6 inline-flex items-center gap-3"
      >
        <button
          type="submit"
          className="rounded-md bg-blue-700 px-4 py-2 font-semibold text-white shadow-sm hover:bg-blue-800"
        >
          Send Test Email
        </button>
        <span className="text-xs text-gray-500">Sends to configured EMAIL_TO or sales@safeassets.group</span>
      </form>
    </section>
  );
}
