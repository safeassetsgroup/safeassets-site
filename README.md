This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Email (Resend) Setup

This site sends emails via Resend from server-only API routes.

1) Verify domain in Resend
- Add your domain (e.g., `safeassets.group`).
- Create required DNS records (DKIM TXT `resend._domainkey`, SPF TXT for `send`, MX for `send`).
- Optional: add DMARC TXT at `_dmarc` with `v=DMARC1; p=none;`.
- Wait until Resend shows the domain as Connected.

2) Configure environment variables (Vercel or `.env.local`)
- `RESEND_API_KEY`: your Resend key
- `EMAIL_FROM`: e.g., `SafeAssets <no-reply@safeassets.group>` (must be on verified domain)
- `EMAIL_TO` (optional): recipient override; defaults to `sales@safeassets.group`

3) Verify
- `/api/env-check`: confirm envs
- `/api/email-test`: send test email
- `/system/email-status`: simple UI to view envs and trigger test send

## reCAPTCHA (optional)
Set these to enable verification; forms will skip verification if not set:
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- `RECAPTCHA_SECRET_KEY`
