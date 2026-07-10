import { useState, useEffect, useCallback, memo } from "react";
import {
  AlertCircle, CheckCircle, ArrowRight, Shield, Lock,
  Activity, KeyRound, Fingerprint, Radar, BadgeCheck, Menu, X
} from "lucide-react";
import { CountrySelect } from "../components/CountrySelect";
import { getCountry, validatePhoneNumber } from "../lib/phoneValidation";
import Lightfall from "../components/Lightfall";

/* ─────────────────────────────────────────────────────────
   Memoized background – never re-renders when form changes
───────────────────────────────────────────────────────── */
const PageBackground = memo(function PageBackground() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      {/* Lightfall WebGL */}
      <div className="absolute top-0 left-0 w-full h-[650px] md:h-[850px] pointer-events-none overflow-hidden z-0 opacity-40">
        <Lightfall
          colors={["#A6C8FF", "#5227FF", "#FF9FFC"]}
          backgroundColor="#0A29FF"
          speed={0.4}
          streakCount={isMobile ? 1 : 2}
          streakWidth={2.5}
          streakLength={1.8}
          glow={1}
          density={isMobile ? 0.12 : 0.3}
          twinkle={1}
          zoom={2}
          backgroundGlow={1}
          opacity={1}
          mouseInteraction={true}
          mouseStrength={1}
          mouseRadius={0.6}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0b0a10]/50 to-[#0b0a10]" />
      </div>

      {/* Glowing orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute -top-32 -left-1/4 w-[820px] h-[820px] rounded-full blur-[120px] opacity-25 bg-[radial-gradient(circle,rgba(168,85,247,0.8),transparent_60%)] animate-pulse"
          style={{ animationDuration: "12s" }}
        />
        <div
          className="absolute top-1/3 -right-1/4 w-[620px] h-[620px] rounded-full blur-[100px] opacity-20 bg-[radial-gradient(circle,rgba(59,130,246,0.6),transparent_60%)] animate-pulse"
          style={{ animationDuration: "15s" }}
        />
        <div className="absolute -bottom-64 left-1/4 w-[720px] h-[720px] rounded-full blur-[120px] opacity-20 bg-[radial-gradient(circle,rgba(236,72,153,0.5),transparent_60%)]" />
      </div>
    </>
  );
});

/* ─────────────────────────────────────────────────────────
   Validation helpers
───────────────────────────────────────────────────────── */
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
function isValidName(name: string) {
  return name.trim().length >= 2;
}

/* ─────────────────────────────────────────────────────────
   Form field wrapper
───────────────────────────────────────────────────────── */
const inputCls =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors h-12 hover:bg-white/[0.08]";

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
      {error && (
        <span className="mt-1.5 block text-xs text-rose-400 animate-in fade-in slide-in-from-top-1 duration-150">
          {error}
        </span>
      )}
    </label>
  );
}

/* ─────────────────────────────────────────────────────────
   Main page component
───────────────────────────────────────────────────────── */
export default function Enquiry() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("CY");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  /* Update meta tags once */
  useEffect(() => {
    document.title = "Meridian Capital | Digital Asset Wealth Platform";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Institutional-grade digital asset wealth platform. Contact our advisory board for portfolio structuring, execution management, and asset preservation.");
    }
  }, []);

  /* Scroll listener for navbar */
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  /* Live-validate a single field */
  const validateField = useCallback(
    (field: string, value: string | boolean) => {
      let err = "";
      if (field === "name" && !isValidName(value as string)) {
        err = "Please enter your full name.";
      } else if (field === "email" && !isValidEmail(value as string)) {
        err = "Please enter a valid email address.";
      } else if (field === "phone" && (value as string).trim()) {
        err = validatePhoneNumber(value as string, country) ?? "";
      } else if (field === "consent" && !value) {
        err = "You must consent to be contacted.";
      }
      setErrors((prev) => ({ ...prev, [field]: err }));
      return err;
    },
    [country]
  );

  /* Instant validation for phone number whenever phone or country changes */
  useEffect(() => {
    if (!phone.trim()) {
      setErrors((prev) => {
        const { phone: _, ...rest } = prev;
        return rest;
      });
      return;
    }
    const phoneErr = validatePhoneNumber(phone, country);
    setErrors((prev) => {
      if (phoneErr) {
        return { ...prev, phone: phoneErr };
      } else {
        const { phone: _, ...rest } = prev;
        return rest;
      }
    });
  }, [phone, country]);

  /* Blur handler — mark touched + validate */
  const onBlur = useCallback(
    (field: string, value: string | boolean) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      validateField(field, value);
    },
    [validateField]
  );

  /* Phone onChange — just update value (useEffect handles instant validation) */
  const onPhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPhone(e.target.value);
    },
    []
  );

  /* Submit */
  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (isSubmitting || submitted) return;

      /* Run all validations */
      const errs: Record<string, string> = {};
      if (!isValidName(name)) errs.name = "Please enter your full name.";
      if (!isValidEmail(email)) errs.email = "Please enter a valid email address.";
      if (phone.trim()) errs.phone = validatePhoneNumber(phone, country) ?? "";
      if (!consent) errs.consent = "You must consent to be contacted.";
      setErrors(errs);
      setTouched({ name: true, email: true, phone: true, consent: true });

      if (Object.values(errs).some(Boolean)) return;

      setIsSubmitting(true);
      setServerError(null);

      try {
        console.log("[FORM] Submitting lead to /api/submit-lead …");
        const res = await fetch("/api/submit-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            countryCode: country,
            message: message.trim(),
          }),
        });

        const data = await res.json();
        console.log("[FORM] API response:", res.status, data);

        if (data.success) {
          setSubmitted(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          let errMsg = data.error || "Failed to submit. Please try again.";
          if (errMsg.toLowerCase().includes("lead is not valid")) {
            errMsg = "Invalid phone number or email format. Please check the digits and selected country.";
          }
          setServerError(errMsg);
        }
      } catch (err) {
        console.error("[FORM] Network error:", err);
        setServerError("Network error — please check your connection and try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSubmitting, submitted, name, email, phone, country, message, consent]
  );

  return (
    <div
      className="min-h-screen bg-[#0b0a10] text-white font-sans selection:bg-purple-600 selection:text-white antialiased overflow-x-clip relative"
      style={{ fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif" }}
    >
      <style>{`
        :root { --font-sans: 'Plus Jakarta Sans', 'Outfit', sans-serif !important; }
        h1, h2, h3, h4, h5, h6 { font-family: var(--font-sans) !important; }
      `}</style>

      {/* Background — memoized, never re-renders */}
      <PageBackground />

      {/* Navbar */}
      <header className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4">
        <div
          className={`w-full max-w-4xl rounded-2xl border backdrop-blur-xl px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all duration-300 ${
            scrolled
              ? "bg-white/5 border-white/10 shadow-lg shadow-purple-900/20"
              : "bg-white/[0.02] border-white/5"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-purple-500/30">
              M
            </span>
            <span className="font-semibold text-sm tracking-tight text-white uppercase">Meridian Capital</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-400">
            <a href="#hero" className="hover:text-white transition-colors">Home</a>
            <a href="#platform" className="hover:text-white transition-colors">Platform</a>
            <a href="#security" className="hover:text-white transition-colors">Security</a>
            <a href="#contact" className="hover:text-white transition-colors">Invest Desk</a>
          </nav>

          {/* Mobile menu trigger */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-1.5 rounded-md hover:bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 pt-28 md:pt-48 pb-20 space-y-24 md:space-y-32">

        {/* Hero */}
        <section id="hero" className="text-center max-w-3xl mx-auto space-y-6 md:space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 backdrop-blur px-4 py-1.5 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_rgba(168,85,247,1)]" />
            <span className="text-[11px] font-bold text-purple-300 uppercase tracking-[0.15em]">
              Institutional Custody · Regulated Desk
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-7xl leading-[1.1] md:leading-[1.05] font-extrabold tracking-tight text-white">
            Systematically Increase Your{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-sm">
              Digital Asset Investments
            </span>
          </h1>

          <p className="max-w-xl mx-auto text-xs sm:text-base text-slate-400 font-light leading-relaxed">
            Partner with our private advisory desks to expand your active allocation sizes, generate compound yields, and securely scale your invested capital.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 md:pt-6">
            <a href="#contact" className="group inline-flex items-center justify-center gap-2 h-12 w-full sm:w-auto px-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold uppercase tracking-wider hover:from-purple-500 hover:to-blue-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:-translate-y-0.5 border border-white/10">
              Start Investing <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a href="#platform" className="inline-flex items-center justify-center gap-2 h-12 w-full sm:w-auto px-8 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 transition-all">
              Learn More
            </a>
          </div>

          <ul className="flex flex-wrap justify-center gap-x-6 sm:gap-x-8 gap-y-3 text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-wider pt-6 md:pt-8">
            <li className="flex items-center gap-1.5"><BadgeCheck className="w-4 h-4 text-purple-400" /> Fully Licensed</li>
            <li className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-purple-400" /> Bank-level Security</li>
            <li className="flex items-center gap-1.5"><Activity className="w-4 h-4 text-purple-400" /> 24/7 Monitoring</li>
          </ul>
        </section>

        {/* Platform */}
        <section id="platform" className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="space-y-6 max-w-lg">
            <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-purple-400">
              <span className="w-5 h-0.5 bg-purple-500" /> Platform
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Engineered to compound and grow your capital allocations.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
              We focus on expanding client positions, helping wealth builders continuously increase their digital asset holdings via structured arbitrage and yield strategies.
            </p>
            <ul className="space-y-4 sm:space-y-5 pt-2">
              {[
                { title: "Diversified Asset Portfolios", desc: "Curated allocations across blue-chip digital assets, stablecoins, and hedged strategies." },
                { title: "AI-assisted Market Sourcing", desc: "Algorithmic execution models translating market volatility into disciplined bid triggers." },
                { title: "Continuous Risk Rebalancing", desc: "Constant portfolio monitoring and active drawdown limits preserve principal value." },
              ].map((f, idx) => (
                <li key={idx} className="flex gap-4">
                  <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-purple-400 font-bold text-xs shadow-inner">
                    0{idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white uppercase tracking-wider">{f.title}</h4>
                    <p className="text-[11px] sm:text-xs text-slate-400 mt-1 leading-relaxed">{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#131218]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-purple-600/20 rounded-full blur-[50px]" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-blue-600/20 rounded-full blur-[50px]" />
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-white/10 pb-3">Yield Compounding Model</h4>
            <svg viewBox="0 0 240 120" className="w-full h-auto drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
              <path d="M0,90 C40,80 60,70 90,60 S150,30 180,25 220,15 240,10" fill="none" stroke="url(#grad)" strokeWidth="3" strokeLinecap="round" />
              <path d="M0,90 C40,80 60,70 90,60 S150,30 180,25 220,15 240,10 L240,120 L0,120 Z" fill="url(#fillGrad)" />
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" /><stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="fillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(139,92,246,0.2)" /><stop offset="100%" stopColor="rgba(59,130,246,0)" />
                </linearGradient>
              </defs>
              <circle cx="90" cy="60" r="3.5" fill="#0b0a10" stroke="#8b5cf6" strokeWidth="2" />
              <circle cx="180" cy="25" r="3.5" fill="#0b0a10" stroke="#3b82f6" strokeWidth="2" />
            </svg>
            <div className="flex justify-between items-center text-[11px] sm:text-xs text-slate-400 font-mono">
              <span>Tier-1 Liquidity Pool</span>
              <span className="font-bold text-white bg-white/10 px-2 py-1 rounded-md">+24.8% Projected</span>
            </div>
          </div>
        </section>

        {/* Security */}
        <section id="security" className="space-y-8 md:space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-purple-400">
              <span className="w-5 h-0.5 bg-purple-500" /> Security
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Institutional security at every layer.</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Lock, title: "Cold Wallet Protection", desc: "95% of assets are held in geographically isolated air-gapped vaults." },
              { icon: KeyRound, title: "Multi-Signature Vaults", desc: "Every transaction requires distributed approval from multiple key holders." },
              { icon: Radar, title: "Real-Time Intrusion Checks", desc: "Continuous security monitoring with automated shutdown mechanisms." },
              { icon: Fingerprint, title: "Asset Protection Cover", desc: "Insurance policies backed by leading institutional underwriters." },
            ].map((it, idx) => (
              <div key={idx} className="bg-white/[0.03] backdrop-blur-sm border border-white/10 p-4 sm:p-6 rounded-2xl shadow-lg hover:bg-white/[0.05] hover:border-white/20 transition-all flex flex-col justify-between min-h-[180px] sm:min-h-[220px] group">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                  <it.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="space-y-1.5 pt-4">
                  <h4 className="font-bold text-[10px] sm:text-xs text-white uppercase tracking-wider">{it.title}</h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 leading-normal font-light">{it.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact" className="relative max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-pink-600/20 to-blue-600/30 rounded-[2rem] sm:rounded-[2.5rem] blur-2xl opacity-50 -z-10" />

          <div className="bg-[#131218]/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-12 shadow-2xl grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

            {/* Info */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-purple-400">
                <span className="w-5 h-0.5 bg-purple-500" /> Contact
              </div>
              <h3 className="text-2xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight">Get in Touch</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                Fill out the form and our team will get back to you within one business day.
              </p>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 relative z-10">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-5 bg-white/5 rounded-3xl border border-white/10">
                  <div className="w-16 h-16 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Consultation Confirmed</h4>
                  <p className="text-sm text-slate-400 max-w-sm leading-relaxed font-light">
                    Thank you! Your details have been submitted. An advisor will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5" noValidate>
                  {serverError && (
                    <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs flex gap-3 items-center">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Full Name" error={touched.name ? errors.name : undefined}>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => onBlur("name", name)}
                        placeholder="Your Name"
                        className={inputCls}
                        autoComplete="name"
                      />
                    </Field>

                    <Field label="Email Address" error={touched.email ? errors.email : undefined}>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => onBlur("email", email)}
                        placeholder="your@email.com"
                        className={inputCls}
                        autoComplete="email"
                      />
                    </Field>
                  </div>

                  {/* Phone with live validation */}
                  <div className="flex flex-col">
                    <label className="block text-[0.65rem] uppercase tracking-[0.1em] font-bold text-slate-400 mb-2">
                      Phone Number <span className="text-slate-500 font-normal">(optional)</span>
                    </label>
                    <div className="flex gap-2">
                      <CountrySelect
                        value={country}
                        onChange={(c) => setCountry(c)}
                        className="w-[105px] shrink-0"
                      />
                      <input
                        type="tel"
                        value={phone}
                        onChange={onPhoneChange}
                        onBlur={() => onBlur("phone", phone)}
                        placeholder={getCountry(country).placeholder}
                        className={inputCls}
                        autoComplete="tel"
                      />
                    </div>
                    {errors.phone && (
                      <span className="mt-1.5 block text-xs text-rose-400 animate-in fade-in slide-in-from-top-1 duration-150">
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  <Field label="Message (Optional)" error={undefined}>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={`${inputCls} resize-y h-auto py-3`}
                      placeholder="Write your message here..."
                    />
                  </Field>

                  {/* Consent */}
                  <div className="pt-1">
                    <label className="flex items-start gap-3 text-[10.5px] text-slate-400 leading-relaxed cursor-pointer select-none group">
                      <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                        <input
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => {
                            setConsent(e.target.checked);
                            if (touched.consent) validateField("consent", e.target.checked);
                          }}
                          onBlur={() => onBlur("consent", consent)}
                          className="peer appearance-none w-5 h-5 rounded-md border border-white/20 bg-white/5 checked:bg-purple-600 checked:border-purple-500 transition-all cursor-pointer"
                        />
                        <CheckCircle className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                      </div>
                      <span className="group-hover:text-slate-300 transition-colors">
                        I consent to Meridian routing my data to the Cyprus desk and contacting me regarding this private digital asset inquiry.
                      </span>
                    </label>
                    {touched.consent && errors.consent && (
                      <p className="text-[10px] text-rose-400 mt-1.5 ml-8">{errors.consent}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-[11px] font-bold uppercase tracking-[0.15em] rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] border border-white/10"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>Submit Enquiry <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#0b0a10] py-12 mt-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left text-xs text-slate-500 font-light">
          <p>© 2026 Meridian Capital Review Ltd. Private Advisory Desk.</p>
          <p className="max-w-md sm:text-right leading-relaxed">
            Authorized Wealth Communications. Sourced digital trades conform to strict security models.
          </p>
        </div>
      </footer>

      {/* Mobile Glass Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Panel */}
          <div className="relative flex w-full max-w-[280px] flex-col bg-[#0f0e15]/95 border-r border-white/10 p-6 shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between pb-6 border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-purple-500/30">
                  M
                </span>
                <span className="font-semibold text-sm tracking-tight text-white uppercase">
                  Meridian Capital
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-md hover:bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-4 mt-8 text-sm font-semibold text-slate-400">
              {[
                { label: "Home", href: "#hero" },
                { label: "Platform", href: "#platform" },
                { label: "Security", href: "#security" },
                { label: "Invest Desk", href: "#contact" }
              ].map((link) => (
                <a 
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-white transition-colors py-2 border-b border-white/[0.02]"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-white/5">
              <a 
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] text-center animate-pulse"
              >
                Start Investing
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
