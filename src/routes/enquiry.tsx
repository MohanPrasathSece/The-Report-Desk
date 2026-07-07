import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

export const Route = createFileRoute("/enquiry")({
  head: () => ({
    meta: [
      { title: "Speak With Our Investment Team — Meridian Advisory" },
      {
        name: "description",
        content:
          "Request a confidential consultation with a Meridian advisor on portfolio construction, digital assets, and long-term investing.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Enquiry,
});

const schema = z.object({
  firstName: z.string().trim().min(1, "Required").max(60),
  lastName: z.string().trim().min(1, "Required").max(60),
  email: z.string().trim().email("Invalid email").max(120),
  phone: z.string().trim().min(5, "Required").max(40),
  country: z.string().trim().min(2, "Required").max(80),
  budget: z.string().min(1, "Please select"),
  experience: z.string().min(1, "Please select"),
  preferredTime: z.string().min(1, "Please select"),
  message: z.string().trim().max(1500).optional().or(z.literal("")),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must consent to be contacted" }),
  }),
});

type FormValues = z.infer<typeof schema>;

function getUtm() {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((k) => {
    const v = p.get(k);
    if (v) out[k] = v;
  });
  return out;
}

function Enquiry() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    const payload = {
      ...data,
      sourcePage: typeof document !== "undefined" ? document.referrer || "/enquiry" : "/enquiry",
      timestamp: new Date().toISOString(),
      utm: getUtm(),
      referrer: typeof document !== "undefined" ? document.referrer : "",
      status: "New Lead",
      pipelineStage: "New Enquiry",
    };
    // CRM handoff placeholder. Wire to HubSpot / Zoho / Salesforce / Pipedrive
    // via a server function once the corresponding connector is linked.
    console.info("[enquiry.lead]", payload);
    try {
      const store = JSON.parse(localStorage.getItem("meridian_leads") || "[]");
      store.push(payload);
      localStorage.setItem("meridian_leads", JSON.stringify(store));
    } catch {
      // ignore
    }
    await new Promise((r) => setTimeout(r, 500));
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[color:var(--paper)] text-[color:var(--ink)]">
      <header className="border-b border-[color:var(--border)]">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10 py-5 flex items-center justify-between">
          <a href="/" className="font-serif text-xl font-bold tracking-tight">
            Meridian<span className="text-[color:var(--accent)]">.</span>{" "}
            <span className="text-[0.7rem] uppercase tracking-[0.16em] font-sans font-semibold text-[color:var(--ink-muted)] ml-2">
              Advisory
            </span>
          </a>
          <a
            href="/"
            className="text-[0.82rem] text-[color:var(--ink-soft)] hover:text-[color:var(--accent)]"
          >
            ← Back to publication
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-[1200px] px-6 lg:px-10 py-16 lg:py-24 anim-fade">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="eyebrow mb-4">Confidential Consultation</div>
          <h1 className="font-serif font-bold text-[2.4rem] lg:text-[3.4rem] leading-[1.05] tracking-[-0.02em]">
            Speak With Our Investment Team
          </h1>
          <p className="mt-5 font-serif text-[1.15rem] lg:text-[1.3rem] leading-[1.5] text-[color:var(--ink-soft)]">
            A member of our advisory team will contact you within one business day to arrange a
            private, no-obligation conversation about your portfolio.
          </p>
        </div>

        {submitted ? (
          <div className="max-w-2xl mx-auto border border-[color:var(--rule)] p-10 lg:p-14 text-center bg-white/70">
            <div className="eyebrow mb-4">Enquiry Received</div>
            <h2 className="font-serif text-3xl font-bold mb-3">Thank you.</h2>
            <p className="text-[color:var(--ink-soft)] font-serif text-[1.1rem] leading-relaxed">
              Your enquiry has been logged and a member of our advisory team will be in touch
              within one business day. A confirmation has been sent to your email address.
            </p>
            <a
              href="/"
              className="inline-block mt-8 text-[0.78rem] uppercase tracking-[0.14em] font-semibold text-[color:var(--accent)]"
            >
              Return to the publication →
            </a>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-12">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="lg:col-span-8 border border-[color:var(--rule)] p-6 lg:p-10 bg-white/70 space-y-6"
              noValidate
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="First Name" error={errors.firstName?.message}>
                  <input {...register("firstName")} className={inputCls} autoComplete="given-name" />
                </Field>
                <Field label="Last Name" error={errors.lastName?.message}>
                  <input {...register("lastName")} className={inputCls} autoComplete="family-name" />
                </Field>
                <Field label="Email" error={errors.email?.message}>
                  <input
                    type="email"
                    {...register("email")}
                    className={inputCls}
                    autoComplete="email"
                  />
                </Field>
                <Field label="Phone" error={errors.phone?.message}>
                  <input
                    type="tel"
                    {...register("phone")}
                    className={inputCls}
                    autoComplete="tel"
                  />
                </Field>
                <Field label="Country" error={errors.country?.message}>
                  <input
                    {...register("country")}
                    className={inputCls}
                    autoComplete="country-name"
                  />
                </Field>
                <Field label="Investment Budget" error={errors.budget?.message}>
                  <select {...register("budget")} className={inputCls}>
                    <option value="">Select a range</option>
                    <option>Under £25,000</option>
                    <option>£25,000 – £100,000</option>
                    <option>£100,000 – £500,000</option>
                    <option>£500,000 – £2,000,000</option>
                    <option>£2,000,000+</option>
                  </select>
                </Field>
                <Field label="Investment Experience" error={errors.experience?.message}>
                  <select {...register("experience")} className={inputCls}>
                    <option value="">Select experience</option>
                    <option>New to investing</option>
                    <option>1 – 3 years</option>
                    <option>3 – 7 years</option>
                    <option>7+ years</option>
                    <option>Professional / Institutional</option>
                  </select>
                </Field>
                <Field label="Preferred Contact Time" error={errors.preferredTime?.message}>
                  <select {...register("preferredTime")} className={inputCls}>
                    <option value="">Select a time</option>
                    <option>Morning (09:00 – 12:00)</option>
                    <option>Afternoon (12:00 – 17:00)</option>
                    <option>Evening (17:00 – 20:00)</option>
                    <option>Any time</option>
                  </select>
                </Field>
              </div>

              <Field label="Message (optional)" error={errors.message?.message}>
                <textarea
                  rows={5}
                  {...register("message")}
                  className={`${inputCls} resize-y`}
                  placeholder="Anything you would like the advisory team to know before the call."
                />
              </Field>

              <label className="flex items-start gap-3 text-[0.88rem] text-[color:var(--ink-soft)] leading-relaxed">
                <input
                  type="checkbox"
                  {...register("consent")}
                  className="mt-1 h-4 w-4 accent-[color:var(--accent)]"
                />
                <span>
                  I consent to Meridian Advisory contacting me about this enquiry and understand
                  investments carry risk. I have read the{" "}
                  <a href="/" className="underline hover:text-[color:var(--accent)]">
                    privacy notice
                  </a>
                  .
                </span>
              </label>
              {errors.consent?.message ? (
                <p className="text-[0.82rem] text-[color:var(--accent)]">{errors.consent.message}</p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 text-[0.82rem] font-semibold uppercase tracking-[0.16em] bg-[color:var(--ink)] text-[color:var(--paper)] hover:bg-[color:var(--accent)] transition-colors disabled:opacity-60"
              >
                {isSubmitting ? "Submitting…" : "Request Consultation"}
                <span aria-hidden>→</span>
              </button>
            </form>

            <aside className="lg:col-span-4 space-y-8">
              <div className="border-l-2 border-[color:var(--accent)] pl-5">
                <div className="eyebrow mb-2">What to Expect</div>
                <ul className="space-y-3 text-[0.95rem] text-[color:var(--ink-soft)] font-serif leading-relaxed">
                  <li>1. A short call to understand your objectives.</li>
                  <li>2. A written summary of options, at no cost.</li>
                  <li>3. If appropriate, an introduction to an advisor.</li>
                </ul>
              </div>
              <div className="border-l-2 border-[color:var(--ink)] pl-5">
                <div className="eyebrow mb-2">Confidentiality</div>
                <p className="text-[0.92rem] text-[color:var(--ink-soft)] leading-relaxed">
                  Enquiries are handled by a small team and are never shared with third parties.
                  Your data is stored in accordance with UK GDPR.
                </p>
              </div>
              <div className="border-l-2 border-[color:var(--ink)] pl-5">
                <div className="eyebrow mb-2">Risk Disclosure</div>
                <p className="text-[0.82rem] text-[color:var(--ink-muted)] leading-relaxed">
                  Investing carries risk, including the loss of capital. Digital assets are highly
                  volatile. Nothing on this page constitutes a personal recommendation. Speak with
                  an independent adviser before committing capital.
                </p>
              </div>
            </aside>
          </div>
        )}
      </section>

      <footer className="border-t border-[color:var(--border)] mt-10">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10 py-8 text-[0.78rem] text-[color:var(--ink-muted)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p>© 2026 Meridian Capital Review Ltd.</p>
          <p>Registered in England &amp; Wales. Authorised communications only.</p>
        </div>
      </footer>
    </div>
  );
}

const inputCls =
  "w-full border border-[color:var(--border)] bg-white px-3.5 py-2.5 text-[0.95rem] text-[color:var(--ink)] focus:outline-none focus:border-[color:var(--accent)] focus:ring-1 focus:ring-[color:var(--accent)] transition-colors";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[0.72rem] uppercase tracking-[0.14em] font-semibold text-[color:var(--ink-soft)] mb-2">
        {label}
      </span>
      {children}
      {error ? (
        <span className="mt-1 block text-[0.78rem] text-[color:var(--accent)]">{error}</span>
      ) : null}
    </label>
  );
}