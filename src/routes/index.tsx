import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BedDouble, Bus, Coffee, Plane, Sparkles, Users } from "lucide-react";
import { GlobeHero } from "@/components/globe-hero";
import { InstagramDirectory } from "@/components/instagram-directory";
import { FlagTH, ORIGINS } from "@/components/flags";

export const Route = createFileRoute("/")({ component: Home });

const FEATURES = [
  {
    icon: Plane,
    title: "Arrive From Anywhere",
    body: "Los Angeles, Dublin, Manchester, London, Berlin, Barcelona — or wherever you fly from. The route is part of the room.",
    flags: true,
  },
  {
    icon: BedDouble,
    title: "Hotels Included",
    body: "Stays on both islands, already arranged. You land, you check in, you are in it.",
  },
  {
    icon: Bus,
    title: "Bus & Transfers",
    body: "Airports, islands, and the two coffeeshops. Movement is handled end to end.",
  },
  {
    icon: Coffee,
    title: "VIP Coffeeshops",
    body: "Two brand-new rooms. Koh Samui and Phuket. Full access, both islands.",
  },
  {
    icon: Users,
    title: "Industry Networking",
    body: "Operators, growers, buyers and brands. A fortnight together, not a lanyard and a lunch.",
  },
  {
    icon: Sparkles,
    title: "Luxury Experiences",
    body: "The islands, properly. Tables, water, late light — built into the fourteen days.",
  },
] as const;

const FORM_ENDPOINT = "https://formspree.io/f/xgaopwop";

function Home() {
  return (
    <main className="bg-bg text-fg">
      <Hero />
      <Package />
      <House />
      <Features />
      <Islands />
      <Ticket />
      <Access />
      <InstagramDirectory />
      <footer className="border-t border-fg/10 px-5 py-8 text-center">
        <p className="kicker text-muted">
          John Doe Supply Co. · Koh Samui & Phuket · 1–14 December 2026 · Limited to 150
        </p>
      </footer>
    </main>
  );
}

function Hero() {
  return (
    <header className="relative flex min-h-svh flex-col overflow-hidden">
      <div className="starfield absolute inset-0" />
      <GlobeHero />
      <div className="hero-scrim pointer-events-none absolute inset-0" />
      <div className="pointer-events-none relative z-10 flex min-h-svh flex-col">
        <div className="px-5 pt-5 sm:px-8 sm:pt-7">
          <img
            src="/logo-mark.png"
            alt="John Doe Supply Co. Koh Samui Phuket"
            className="h-20 w-auto sm:h-24 md:h-28"
          />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center px-5 pb-6 text-center">
          <h1 className="hero-title max-w-6xl">
            14 Day Networking
            <span className="block">& Luxury Retreat</span>
          </h1>
          <p className="hero-place mt-4 text-fg sm:mt-5">Koh Samui | Phuket</p>
          <div className="mt-6 space-y-1 sm:mt-8">
            <p className="hero-deck text-fg">Two brand new coffeeshops on two islands</p>
            <p className="hero-deck text-muted">On the other side of the world</p>
          </div>
        </div>
        <p className="limit-bar bg-accent px-4 py-4 text-center text-fg">Limited to 150 people only</p>
      </div>
      <p className="sr-only">
        Animated routes from Los Angeles, Dublin, Manchester, London, Berlin and Barcelona to Koh Samui and
        Phuket. Drag the globe to look around.
      </p>
    </header>
  );
}

function Package() {
  return (
    <section className="relative overflow-hidden">
      <img
        src="/media/coast.jpg"
        alt="Palm coastline and night sea off a Thai island"
        width={1792}
        height={1008}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="scrim absolute inset-0" />
      <div className="relative mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        <p className="kicker text-muted">All-inclusive · 1–14 December 2026</p>
        <h2 className="display mt-4 max-w-3xl">One package. Both islands.</h2>
        <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-8">
          {[
            ["€1,999", "Euro"],
            ["£1,999", "Sterling"],
            ["$1,999", "Dollar"],
          ].map(([amount, label]) => (
            <div key={label}>
              <p className="price">{amount}</p>
              <p className="kicker mt-2 text-muted">{label}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-lg text-fg">
          Flights + Hotels + Transfers + Full Networking Access + All Experiences
        </p>
        <p className="kicker mt-4 text-accent">Limited to 150 people worldwide</p>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
          €1,999, £1,999 and $1,999 are fixed package prices. The dollar figure is a courtesy rate, not a live
          conversion. Prefer to arrange your own flights and hotels? You can still come — the Networking All
          Access VIP ticket is €199 when you organise your own accommodation and travel.
        </p>
        <a
          href="#access"
          className="btn-label press mt-10 inline-flex h-14 items-center justify-center bg-accent px-8 text-fg"
        >
          Request access
        </a>
      </div>
    </section>
  );
}

function House() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <p className="kicker text-accent">The house</p>
      <h2 className="display mt-3 max-w-3xl">A name with no face.</h2>
      <div className="mt-8 grid items-start gap-10 lg:grid-cols-12">
        <div className="space-y-5 text-base leading-relaxed text-fg lg:col-span-7">
          <p>
            John Doe Supply Co. came out of Humboldt’s living-soil rooms and stayed quiet on purpose. No face, no
            campaign. The flower still moved — Los Angeles, New York, Washington — because the cut was the only
            advertisement.
          </p>
          <p>
            Kamikaze, a Zkittlez pheno grown in California, was the one that travelled. In 2022 it carried both
            names: John Doe Supply Co. and Doja Exclusive. Doja Pak, Ryan Bartholomew’s house, put that soil-grown
            flower in a much louder room and left Doe in the dark, where the work had always been. The line kept
            going. Kookiez, Kamikaze crossed to Thin Mint Cookies, is a current staple. Head Crack Candy is the
            other pack people already asked for by name.
          </p>
          <p className="text-muted">
            The fortnight is that same house, with a door. Two islands. Two coffeeshops. One hundred and fifty
            people.
          </p>
        </div>
        <ul className="grid gap-3 lg:col-span-5">
          {[
            ["Kamikaze", "Zkittlez pheno. The 2022 collab with Doja Exclusive."],
            ["Kookiez", "Kamikaze × Thin Mint Cookies. One of the current staples."],
            ["Head Crack Candy", "The other cut that moved with the name."],
          ].map(([name, note]) => (
            <li key={name} className="card rounded-card px-5 py-4">
              <p className="font-sans text-lg font-medium tracking-tight">{name}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <p className="kicker text-muted">The fortnight</p>
      <h2 className="display mt-3 max-w-xl">Everything in the room.</h2>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          const wide = "flags" in feature && feature.flags;
          return (
            <li key={feature.title} className={wide ? "card rounded-card p-6 sm:col-span-2 lg:col-span-3" : "card rounded-card p-6"}>
              <Icon className="size-6 text-accent" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="mt-5 font-sans text-lg font-medium tracking-tight">{feature.title}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{feature.body}</p>
              {wide ? (
                <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
                  {ORIGINS.map((origin) => (
                    <li key={origin.city} className="flex items-center gap-2">
                      <origin.Flag title={`${origin.city} flag`} />
                      <span className="text-xs tracking-wide text-fg">{origin.city}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Islands() {
  return (
    <section className="px-5 pb-20 sm:px-8 sm:pb-28">
      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
        <figure className="overflow-hidden rounded-card">
          <img
            src="/media/villa.jpg"
            alt="Dusk infinity pool and palms at a Koh Samui villa"
            width={1728}
            height={1152}
            loading="lazy"
            className="aspect-3/2 w-full object-cover"
          />
          <figcaption className="bg-surface px-5 py-5">
            <p className="flex items-center gap-2">
              <FlagTH title="Thailand" />
              <span className="kicker">Koh Samui</span>
            </p>
            <p className="mt-2 text-sm text-muted">
              One of two brand-new coffeeshops. Full access comes with the package.
            </p>
          </figcaption>
        </figure>
        <figure className="overflow-hidden rounded-card">
          <img
            src="/media/cliffs.jpg"
            alt="Limestone cliffs and turquoise water at Phuket"
            width={1728}
            height={1152}
            loading="lazy"
            className="aspect-3/2 w-full object-cover"
          />
          <figcaption className="bg-surface px-5 py-5">
            <p className="flex items-center gap-2">
              <FlagTH title="Thailand" />
              <span className="kicker">Phuket</span>
            </p>
            <p className="mt-2 text-sm text-muted">
              The other room, on the other island. Both sit inside the fourteen days.
            </p>
          </figcaption>
        </figure>
      </div>
      <figure className="relative mx-auto mt-4 max-w-6xl overflow-hidden rounded-card">
        <img
          src="/media/cafe.jpg"
          alt="Dark coffeeshop interior with a stone bar and a single monstera"
          width={1728}
          height={1152}
          loading="lazy"
          className="aspect-video w-full object-cover md:aspect-21/9"
        />
        <figcaption className="absolute inset-0 flex items-end bg-linear-to-t from-bg via-bg/20 to-transparent p-6 sm:p-10">
          <div>
            <p className="kicker text-muted">The rooms</p>
            <p className="display mt-2">Two brand new coffeeshops</p>
          </div>
        </figcaption>
      </figure>
    </section>
  );
}

function Ticket() {
  return (
    <section className="border-t border-fg/10">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2">
        <div>
          <h2 className="display text-accent">Networking All Access VIP Ticket</h2>
          <p className="price mt-6">€199</p>
          <p className="mt-4 max-w-md text-lg">Included free in the package.</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
            The €199 ticket applies if you are organising your own accommodation and travel. Same rooms, same
            fortnight, same 150-person cap — without the flights, hotels and transfers.
          </p>
          <p className="kicker mt-6 text-muted">1–14 December 2026 · Koh Samui & Phuket</p>
        </div>
        <img
          src="/media/ticket.jpg"
          alt="Black VIP ticket for the John Doe Supply Co. networking retreat, priced at €199, limited to 150"
          width={1400}
          height={900}
          loading="lazy"
          className="w-full rounded-card"
        />
      </div>
    </section>
  );
}

type FormState = {
  name: string;
  email: string;
  phone: string;
  location: string;
  people: string;
  notes: string;
};

const EMPTY: FormState = {
  name: "",
  email: "",
  phone: "",
  location: "",
  people: "1",
  notes: "",
};

function Access() {
  const [values, setValues] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function update(key: keyof FormState, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!values.name.trim()) next.name = "Name is required.";
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) next.email = "A real email is required.";
    if (values.phone.trim().length < 6) next.phone = "Phone or WhatsApp is required.";
    if (!values.location.trim()) next.location = "City and country are required.";
    if (!values.people) next.people = "Tell us how many people.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("sending");
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          location: values.location.trim(),
          people: values.people,
          notes: values.notes.trim(),
          _subject: "Retreat access request — John Doe Supply Co.",
        }),
      });
      if (!response.ok) throw new Error("form");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="access" className="scroll-mt-6 border-t border-fg/10 bg-surface">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="kicker text-accent">Request access</p>
          <h2 className="display mt-3">150 seats. Then it closes.</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Tell us who is coming and from where. This is a request, not a charge. We reply personally about
            the 1–14 December 2026 retreat.
          </p>
        </div>
        <div className="lg:col-span-3">
          {status === "sent" ? (
            <div className="rounded-card border border-fg/15 px-6 py-10">
              <p className="kicker text-accent">Received</p>
              <p className="display mt-3 text-4xl">You’re on the list to be reviewed.</p>
              <p className="mt-4 text-sm text-muted">We’ll be in touch about Koh Samui and Phuket.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Name"
                name="name"
                autoComplete="name"
                value={values.name}
                error={errors.name}
                onChange={(value) => update("name", value)}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                error={errors.email}
                onChange={(value) => update("email", value)}
              />
              <Field
                label="Phone / WhatsApp"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={values.phone}
                error={errors.phone}
                onChange={(value) => update("phone", value)}
              />
              <Field
                label="City / Country"
                name="location"
                autoComplete="address-level2"
                value={values.location}
                error={errors.location}
                onChange={(value) => update("location", value)}
              />
              <label className="block sm:col-span-2 sm:max-w-xs">
                <span className="kicker text-muted">Number of people</span>
                <select
                  name="people"
                  className="field mt-2"
                  value={values.people}
                  aria-invalid={errors.people ? true : undefined}
                  onChange={(event) => update("people", event.target.value)}
                >
                  {Array.from({ length: 10 }, (_, index) => String(index + 1)).map((count) => (
                    <option key={count} value={count}>
                      {count}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className="kicker text-muted">Notes, optional</span>
                <textarea
                  name="notes"
                  className="field mt-2"
                  value={values.notes}
                  placeholder="Own travel, questions, who you’re bringing"
                  onChange={(event) => update("notes", event.target.value)}
                />
              </label>
              {status === "error" ? (
                <p className="text-sm text-fg sm:col-span-2" role="alert">
                  That didn’t send. Check the connection and try once more.
                </p>
              ) : null}
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-label press inline-flex h-14 w-full items-center justify-center bg-accent px-6 text-fg disabled:opacity-60"
                >
                  {status === "sending" ? "Sending" : "Request access – limited 150"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  value,
  error,
  onChange,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  const errorId = error ? `${name}-error` : undefined;
  return (
    <label className="block">
      <span className="kicker text-muted">{label}</span>
      <input
        className="field mt-2"
        name={name}
        type={type}
        autoComplete={autoComplete}
        value={value}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? (
        <span id={errorId} className="mt-1 block text-sm text-fg">
          {error}
        </span>
      ) : null}
    </label>
  );
}
