# GOOD FILLERS

A responsive restaurant website for Good Fillers in Sialkot, built with the existing Next.js App Router, TypeScript, Tailwind CSS, Framer Motion and Lucide React setup.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

- `/` — Home and featured campaigns
- `/menu` — Category filters, menu artwork and add-to-bag controls
- `/story` — Brand story
- `/gallery` — Keyboard-accessible image lightbox
- `/contact` — Verified contact details, directions and a frontend-only form
- `/order` — Persistent cart and phone-confirmed order flow

Cart items are stored in the browser. The contact form does not transmit messages, and checkout does not claim to submit an online or WhatsApp order; customers are directed to call the restaurant.

## Checks and production

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run start
```

To deploy, push the project to a Git provider, import it into Vercel, and deploy using the detected Next.js defaults. No server secrets or external service configuration are required.

For a custom domain or non-Vercel deployment, set `NEXT_PUBLIC_SITE_URL` to the canonical site origin (for example, `https://example.com`) so social-sharing image URLs use the deployed domain.
