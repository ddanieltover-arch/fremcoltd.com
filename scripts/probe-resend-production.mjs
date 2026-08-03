/**
 * Probes production form delivery via Next.js Server Actions + /api/email-health.
 *
 * Usage: node scripts/probe-resend-production.mjs [email]
 * Do not use reserved domains (example.com) — Resend rejects them.
 */
const email = process.argv[2] || "sales@fremcoltd.com";
const origin = "https://www.fremcoltd.com";

async function resolveActionIds() {
  const html = await fetch(`${origin}/contact`).then((r) => r.text());
  const chunks = [...html.matchAll(/\/_next\/static\/chunks\/[^"]+\.js/g)].map((m) => m[0]);
  const names = ["submitContactForm", "submitQuoteForm", "subscribeNewsletter"];
  const ids = {};

  for (const chunk of chunks) {
    const js = await fetch(`${origin}${chunk}`).then((r) => r.text());
    if (!names.some((n) => js.includes(n))) continue;
    for (const name of names) {
      const re = new RegExp(
        `createServerReference\\)\\("([a-f0-9]+)"[^"]*"${name}"`,
      );
      const match = js.match(re);
      if (match) ids[name] = match[1];
    }
    if (Object.keys(ids).length === names.length) break;
  }

  if (Object.keys(ids).length !== names.length) {
    throw new Error(`Could not resolve action IDs. Found: ${JSON.stringify(ids)}`);
  }
  return ids;
}

const ids = await resolveActionIds();

const actions = [
  {
    name: "contact",
    id: ids.submitContactForm,
    url: `${origin}/contact`,
    payload: [
      {
        name: "Resend Probe",
        email,
        company: "Pulse Software Studio",
        phone: "+66808545975",
        message: "Automated Resend production probe. Safe to ignore.",
      },
    ],
  },
  {
    name: "quote",
    id: ids.submitQuoteForm,
    url: `${origin}/request-a-quote`,
    payload: [
      {
        name: "Resend Probe",
        email,
        company: "Pulse Software Studio",
        productCategory: "sugar",
        quantity: "10 MT",
        destination: "Singapore",
        message: "Automated quote probe. Safe to ignore.",
      },
    ],
  },
  {
    name: "newsletter",
    id: ids.subscribeNewsletter,
    url: `${origin}/`,
    payload: [{ email }],
  },
];

for (const action of actions) {
  const res = await fetch(action.url, {
    method: "POST",
    headers: {
      Accept: "text/x-component",
      "Content-Type": "text/plain;charset=UTF-8",
      "Next-Action": action.id,
    },
    body: JSON.stringify(action.payload),
  });
  const text = await res.text();
  const ok = text.includes('"success":true');
  console.log(`${action.name}: ${ok ? "OK" : "FAIL"} (${res.status})`);
  if (!ok) console.log(text.slice(0, 400));
}

try {
  const health = await fetch(`${origin}/api/email-health`);
  console.log("email-health:", health.status, await health.text());
} catch (error) {
  console.log(
    "email-health: not deployed yet",
    error instanceof Error ? error.message : error,
  );
}
