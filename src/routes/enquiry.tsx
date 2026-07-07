import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { createServerFn } from "@tanstack/react-start";
import { AlertCircle, CheckCircle, ArrowRight, Shield, Lock, Activity, Landmark, Sparkles, KeyRound, Fingerprint, Radar, BadgeCheck, Info } from "lucide-react";
import { CountrySelect } from "../components/CountrySelect";
import { getCountry, validatePhoneNumber, formatFullPhoneNumber } from "../lib/phoneValidation";
import Lightfall from "../components/Lightfall";

// Validation helpers
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidName(name: string): boolean {
  return name.trim().length >= 2;
}

// Server function to process lead and submit to CRM
const submitLeadToCRM = createServerFn({ method: "POST" })
  .validator(
    (data: {
      name: string;
      email: string;
      phone: string;
      countryCode: string;
      budget?: string;
      message?: string;
    }) => data
  )
  .handler(async ({ data }) => {
    const [first_name, ...lastNameParts] = (data.name || "Unknown").trim().split(" ");
    const last_name = lastNameParts.join(" ") || "Lead";

    const formattedPhone = formatFullPhoneNumber(data.phone, data.countryCode);

    const payload = {
      country_name: "cy", // Hardcode to Cyprus
      description: data.message || "Signup Lead",
      phone: formattedPhone,
      email: data.email.toLowerCase().trim(),
      first_name,
      last_name,
      custom_fields: {
        Source_ID: "website",
        How_Much_Invested: data.budget || "0",
        Outline_Your_Case: data.message || "",
      },
    };

    const crmUrl = process.env.CRM_URL || "https://inwo.crmcore.me/api/lead_management/api/affiliates";
    const crmToken = process.env.CRM_TOKEN || "AFF_1_92cbc1bc76284e19b711bab22587d75f";

    console.info("[CRM SUBMISSION PAYLOAD]", payload);

    try {
      const response = await fetch(crmUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${crmToken}`,
          "x-token": crmToken,
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      console.info("[CRM RESPONSE]", response.status, responseText);

      const alreadyExists = responseText.toLowerCase().includes("already exist");
      if (!response.ok && !alreadyExists) {
        return { success: false, error: responseText || "CRM rejected lead" };
      }

      return { success: true };
    } catch (error: any) {
      console.error("[CRM ERROR]", error);
      return { success: false, error: error.message || "Unknown error" };
    }
  });

export const Route = createFileRoute("/enquiry")({
  head: () => ({
    meta: [
      { title: "Meridian Prime — Digital Asset Wealth Platform" },
      {
        name: "description",
        content:
          "Institutional-grade digital asset custody, multi-sig execution desks, and private wealth advisory solutions.",
      },
      { name: "robots", content: "noindex" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800&display=swap",
      },
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏛️</text></svg>",
      },
    ],
  }),
  component: Enquiry,
});

interface FormState {
  name: string;
  email: string;
  phone: string;
  country: string;
  budget: string;
  message: string;
  consent: boolean;
}

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
  consent?: string;
}

function Enquiry() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    country: "CY", // Defaulting to Cyprus (matching CRM setup)
    budget: "0",
    message: "",
    consent: false,
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const setField = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const val = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: val }));
  };

  const validate = (): boolean => {
    const errs: FieldErrors = {};
    if (!isValidName(form.name)) {
      errs.name = "Please enter your full name.";
    }
    if (!isValidEmail(form.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!form.consent) {
      errs.consent = "You must consent to be contacted";
    }

    if (form.phone.trim()) {
      const phoneErr = validatePhoneNumber(form.phone, form.country);
      if (phoneErr) {
        errs.phone = phoneErr;
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || submitted) return;
    if (!validate()) return;

    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await submitLeadToCRM({
        data: {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          countryCode: form.country,
          budget: form.budget,
          message: form.message.trim(),
        },
      });

      if (res.success) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setServerError(res.error || "Failed to submit lead. Please try again.");
      }
    } catch (err: any) {
      setServerError("An unexpected network error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0a10] text-white font-sans selection:bg-purple-600 selection:text-white antialiased overflow-x-clip relative" style={{ fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif" }}>
      <style>{`
        :root {
          --font-sans: 'Plus Jakarta Sans', 'Outfit', sans-serif !important;
        }
        h1, h2, h3, h4, h5, h6 {
          font-family: var(--font-sans) !important;
        }
      `}</style>
      
      {/* Lightfall WebGL animation background */}
      <div className="absolute top-0 left-0 w-full h-[650px] md:h-[850px] pointer-events-none overflow-hidden z-0 opacity-40">
        <Lightfall
          colors={['#A6C8FF', '#5227FF', '#FF9FFC']}
          backgroundColor="#0A29FF"
          speed={0.4}
          streakCount={2}
          streakWidth={2.5}
          streakLength={1.8}
          glow={1}
          density={0.4}
          twinkle={1}
          zoom={2}
          backgroundGlow={1}
          opacity={1}
          mouseInteraction={true}
          mouseStrength={1}
          mouseRadius={0.6}
        />
        {/* Soft bottom/all-around fade to blend with page content */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0b0a10]/50 to-[#0b0a10]" />
      </div>

      {/* Aura Finance Style Glowing Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-32 -left-1/4 w-[820px] h-[820px] rounded-full blur-[120px] opacity-25 bg-[radial-gradient(circle,rgba(168,85,247,0.8),transparent_60%)] animate-pulse" style={{ animationDuration: "12s" }} />
        <div className="absolute top-1/3 -right-1/4 w-[620px] h-[620px] rounded-full blur-[100px] opacity-20 bg-[radial-gradient(circle,rgba(59,130,246,0.6),transparent_60%)] animate-pulse" style={{ animationDuration: "15s" }} />
        <div className="absolute -bottom-64 left-1/4 w-[720px] h-[720px] rounded-full blur-[120px] opacity-20 bg-[radial-gradient(circle,rgba(236,72,153,0.5),transparent_60%)]" />
      </div>

      {/* Glass Header Navbar */}
      <header className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4">
        <div className={`w-full max-w-4xl rounded-2xl border backdrop-blur-xl px-6 py-2.5 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "bg-white/5 border-white/10 shadow-lg shadow-purple-900/20" : "bg-white/[0.02] border-white/5"
        }`}>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-purple-500/30">
              M
            </span>
            <span className="font-semibold text-sm tracking-tight text-white uppercase">
              Meridian Prime
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-400">
            <a href="#hero" className="hover:text-white transition-colors">Home</a>
            <a href="#platform" className="hover:text-white transition-colors">Platform</a>
            <a href="#security" className="hover:text-white transition-colors">Security</a>
            <a href="#contact" className="hover:text-white transition-colors">Invest Desk</a>
          </nav>

          <div className="w-10 h-10 md:hidden" />{/* Spacer to keep visual balance on mobile */}
        </div>
      </header>

      {/* Main Sections Wrapper */}
      <main className="relative z-10 mx-auto max-w-6xl px-6 pt-40 md:pt-48 pb-20 space-y-32">
        
        {/* Section 1: Hero Block */}
        <section id="hero" className="text-center max-w-3xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 backdrop-blur px-4 py-1.5 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_rgba(168,85,247,1)]" />
            <span className="text-[11px] font-bold text-purple-300 uppercase tracking-[0.15em]">
              Institutional Custody · Regulated Desk
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl leading-[1.05] font-extrabold tracking-tight text-white">
            Systematically Increase Your <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-sm">Digital Asset Investments</span>
          </h1>
          
          <p className="max-w-xl mx-auto text-sm sm:text-base text-slate-400 font-light leading-relaxed">
            Partner with our private advisory desks to expand your active allocation sizes, generate compound yields, and securely scale your invested capital.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 h-12 w-full sm:w-auto px-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold uppercase tracking-wider hover:from-purple-500 hover:to-blue-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:-translate-y-0.5 border border-white/10"
            >
              Start Investing <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#platform"
              className="inline-flex items-center justify-center gap-2 h-12 w-full sm:w-auto px-8 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 transition-all"
            >
              Learn More
            </a>
          </div>

          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-[10px] text-slate-500 font-bold uppercase tracking-wider pt-8">
            <li className="flex items-center gap-1.5">
              <BadgeCheck className="w-4 h-4 text-purple-400" /> Fully Licensed
            </li>
            <li className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-purple-400" /> Bank-level Security
            </li>
            <li className="flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-purple-400" /> 24/7 Monitoring
            </li>
          </ul>
        </section>

        {/* Section 2: Platform Performance */}
        <section id="platform" className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6 max-w-lg">
            <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-purple-400">
              <span className="w-5 h-0.5 bg-purple-500" /> Platform
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Engineered to compound and grow your capital allocations.
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed font-light">
              We focus on expanding client positions, helping wealth builders continuously increase their digital asset holdings via structured arbitrage and yield strategies.
            </p>
            
            <ul className="space-y-5 pt-4">
              {[
                { title: "Diversified Asset Portfolios", desc: "Curated allocations across blue-chip digital assets, stablecoins, and hedged strategies." },
                { title: "AI-assisted Market Sourcing", desc: "Algorithmic execution models translating market volatility into disciplined bid triggers." },
                { title: "Continuous Risk Rebalancing", desc: "Constant portfolio monitoring and active drawdown limits preserve principal value." }
              ].map((f, idx) => (
                <li key={idx} className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-purple-400 font-bold text-xs shadow-inner">
                    0{idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white uppercase tracking-wider">{f.title}</h4>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-[#131218]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-purple-600/20 rounded-full blur-[50px]" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-blue-600/20 rounded-full blur-[50px]" />
            
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-white/10 pb-3">
              Yield Compounding Model
            </h4>
            <svg viewBox="0 0 240 120" className="w-full h-auto drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
              <path d="M0,90 C40,80 60,70 90,60 S150,30 180,25 220,15 240,10" fill="none" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round" />
              <path d="M0,90 C40,80 60,70 90,60 S150,30 180,25 220,15 240,10 L240,120 L0,120 Z" fill="url(#fillGradient)" />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="fillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(139, 92, 246, 0.2)" />
                  <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                </linearGradient>
              </defs>
              <circle cx="90" cy="60" r="3.5" fill="#0b0a10" stroke="#8b5cf6" strokeWidth="2" />
              <circle cx="180" cy="25" r="3.5" fill="#0b0a10" stroke="#3b82f6" strokeWidth="2" />
            </svg>
            <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
              <span>Tier-1 Liquidity Pool</span>
              <span className="font-bold text-white bg-white/10 px-2 py-1 rounded-md">+24.8% Projected</span>
            </div>
          </div>
        </section>

        {/* Section 3: Custody & Security */}
        <section id="security" className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-purple-400">
              <span className="w-5 h-0.5 bg-purple-500" /> Security
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Institutional security at every layer.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Lock, title: "Cold Wallet Protection", desc: "95% of assets are held in geographically isolated air-gapped vaults." },
              { icon: KeyRound, title: "Multi-Signature Vaults", desc: "Every transaction requires distributed approval from multiple key holders." },
              { icon: Radar, title: "Real-Time Intrusion Checks", desc: "Continuous security monitoring with automated shutdown mechanisms." },
              { icon: Fingerprint, title: "Asset Protection Cover", desc: "Insurance policies backed by leading institutional underwriters." }
            ].map((it, idx) => (
              <div key={idx} className="bg-white/[0.03] backdrop-blur-sm border border-white/10 p-6 rounded-2xl shadow-lg hover:bg-white/[0.05] hover:border-white/20 transition-all flex flex-col justify-between min-h-[220px] group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                  <it.icon className="w-5 h-5" />
                </div>
                <div className="space-y-2 pt-6">
                  <h4 className="font-bold text-xs text-white uppercase tracking-wider">{it.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">{it.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Contact Form Capsule */}
        <section id="contact" className="relative max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-pink-600/20 to-blue-600/30 rounded-[2.5rem] blur-2xl opacity-50 -z-10" />
          
          <div className="bg-[#131218]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 sm:p-12 shadow-2xl grid lg:grid-cols-12 gap-12 items-stretch relative overflow-hidden">
            {/* Subtle inner glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
            
            {/* Form details column */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-purple-400">
                <span className="w-5 h-0.5 bg-purple-500" /> Contact
              </div>
              <h3 className="text-2xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight">
                Get in Touch
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                Fill out the form below and our team will get back to you within one business day.
              </p>
            </div>

            {/* Form inputs column */}
            <div className="lg:col-span-7 relative z-10">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-5 bg-white/5 rounded-3xl border border-white/10">
                  <div className="w-16 h-16 bg-gradient-to-tr from-purple-600 to-blue-600 text-white rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Consultation Confirmed</h4>
                  <p className="text-sm text-slate-400 max-w-sm leading-relaxed font-light">
                    Thank you! Your details have been successfully submitted. An advisor will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5" noValidate>
                  {serverError && (
                    <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs flex gap-3 items-center backdrop-blur-sm">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Full Name" error={errors.name}>
                      <input
                        type="text"
                        value={form.name}
                        onChange={setField("name")}
                        placeholder="Your Name"
                        className={inputCls}
                        autoComplete="name"
                      />
                    </Field>

                    <Field label="Email Address" error={errors.email}>
                      <input
                        type="email"
                        value={form.email}
                        onChange={setField("email")}
                        placeholder="your@email.com"
                        className={inputCls}
                        autoComplete="email"
                      />
                    </Field>
                  </div>

                  <div className="flex flex-col">
                    <label className="block text-[0.65rem] uppercase tracking-[0.1em] font-bold text-slate-400 mb-2">
                      Phone Number <span className="text-slate-500 font-normal">(optional)</span>
                    </label>
                    <div className="flex gap-2">
                      <CountrySelect
                        value={form.country}
                        onChange={(c) => setForm((prev) => ({ ...prev, country: c }))}
                        className="w-[105px] shrink-0"
                      />
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={setField("phone")}
                        placeholder={getCountry(form.country).placeholder}
                        className={inputCls}
                        autoComplete="tel"
                      />
                    </div>
                    {errors.phone ? (
                      <span className="mt-1.5 block text-xs text-rose-400">{errors.phone}</span>
                    ) : null}
                  </div>

                  <Field label="Message (Optional)" error={undefined}>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={setField("message")}
                      className={`${inputCls} resize-y h-auto py-3`}
                      placeholder="Write your message here..."
                    />
                  </Field>

                  <div className="pt-2">
                    <label className="flex items-start gap-3 text-[10.5px] text-slate-400 leading-relaxed cursor-pointer select-none group">
                      <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                        <input
                          type="checkbox"
                          checked={form.consent}
                          onChange={setField("consent")}
                          className="peer appearance-none w-5 h-5 rounded-md border border-white/20 bg-white/5 checked:bg-purple-600 checked:border-purple-500 transition-all cursor-pointer"
                        />
                        <CheckCircle className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                      </div>
                      <span className="group-hover:text-slate-300 transition-colors">
                        I consent to Meridian routing my data to the Cyprus desk and contacting me regarding this private digital asset inquiry.
                      </span>
                    </label>
                    {errors.consent ? (
                      <p className="text-[10px] text-rose-400 mt-1.5 ml-8">{errors.consent}</p>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-[11px] font-bold uppercase tracking-[0.15em] rounded-xl transition-all disabled:opacity-50 cursor-pointer shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] border border-white/10"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </section>

      </main>

      {/* Standalone footer */}
      <footer className="border-t border-white/10 bg-[#0b0a10] py-12 relative overflow-hidden mt-12">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left text-xs text-slate-500 font-light">
          <p>© 2026 Meridian Capital Review Ltd. Private Advisory Desk.</p>
          <p className="max-w-md sm:text-right leading-relaxed">
            Authorized Wealth Communications. Sourced digital trades conform to strict security models.
          </p>
        </div>
      </footer>
    </div>
  );
}

const inputCls =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all h-12 shadow-inner hover:bg-white/10";

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
    <label className="block w-full">
      <span className="block text-[0.65rem] uppercase tracking-[0.1em] font-bold text-slate-400 mb-2">
        {label}
      </span>
      {children}
      {error ? (
        <span className="mt-1.5 block text-xs text-rose-400">{error}</span>
      ) : null}
    </label>
  );
}