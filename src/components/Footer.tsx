export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#1E2328]">
      <div className="mx-auto max-w-6xl px-6 py-10 grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <div className="text-white font-semibold">Safe Assets Group</div>
          <p className="text-sm text-[#B8BDC4]">
            Advanced asset reliability for mining, construction, agriculture, transport, energy, defence & strata.
          </p>
        </div>
        <div className="sm:text-right space-y-2">
          <a
            href="mailto:info@safeassets.com.au?subject=Enquiry%20from%20website"
            className="inline-block rounded-md bg-[#F59E0B] px-4 py-2 font-medium text-black hover:opacity-90 transition"
          >
            Talk to us
          </a>
          <div className="text-xs text-[#8A9097]">
             {new Date().getFullYear()} Safe Assets Group  All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
