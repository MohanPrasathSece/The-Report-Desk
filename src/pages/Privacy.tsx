import { useEffect } from "react";
import { ChevronRight } from "lucide-react";

export default function Privacy() {
  useEffect(() => {
    document.title = "Privacy Framework | The Report Desk";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Learn about the data privacy standards and cookies configuration governing your usage of The Report Desk.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-955 selection:text-white antialiased">
      {/* Top Banner Bar */}
      <div className="hidden lg:block border-b border-zinc-200 bg-white py-2 text-xs text-zinc-500 font-medium">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 border-r border-zinc-200 pr-3.5">
              <span>Edition</span>
              <a href="/" className="font-bold text-zinc-900 flex items-center gap-0.5 cursor-pointer">
                🇺🇸 US <ChevronRight className="w-3 h-3 rotate-90" />
              </a>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-zinc-400">Privacy Framework</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="hover:text-zinc-900 cursor-pointer">Home</a>
            <a href="/terms" className="hover:text-zinc-900 cursor-pointer">Terms of Publication</a>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="relative pt-6 pb-6 text-center border-b border-zinc-200 px-4 sm:px-6">
        <a href="/" className="inline-block text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-955 uppercase cursor-pointer" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          The Report Desk
        </a>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-10 md:py-16">
        <header className="mb-10 text-center">
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Privacy Framework
          </h1>
          <p className="text-sm text-zinc-500">Last updated: July 2026</p>
        </header>

        <div className="prose prose-md text-zinc-700 space-y-6 text-[15px] sm:text-[16px] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
          <p>
            At <strong>The Report Desk</strong>, we are committed to maintaining robust privacy protections for our readers and visitors. This Privacy Framework details how information is collected, utilized, and safeguarded when you access our independent financial news publication and associated web services.
          </p>

          <h2 className="font-serif text-xl font-bold text-zinc-900 pt-4 border-b border-zinc-100 pb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            1. Information Collection
          </h2>
          <p>
            We do not require registration, subscriptions, or accounts to read our public editorial content. When you visit our website, our servers automatically log standard web browser information. This details basic diagnostic logs including your IP address, browser type, referring pages, platform type, and the date and time of visits. This information is processed exclusively in aggregate formats to analyze readership trends and maintain system stability.
          </p>

          <h2 className="font-serif text-xl font-bold text-zinc-900 pt-4 border-b border-zinc-100 pb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            2. Cookie Usage and Technologies
          </h2>
          <p>
            We employ basic, functional cookies to optimize site performance and preserve user choices (such as preferred edition or typography layout). These cookies contain no personally identifiable data and do not track browsing history across external websites. You can configure your browser to block or refuse cookies, though certain functional performance settings may revert to default parameters.
          </p>

          <h2 className="font-serif text-xl font-bold text-zinc-900 pt-4 border-b border-zinc-100 pb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            3. Information Protection and Security
          </h2>
          <p>
            We implement comprehensive technical and administrative security frameworks to protect your interaction with our servers. Data transmission to our domain is encrypted using industry-standard Secure Socket Layer (SSL) protocols. No transmission method over the internet or method of digital storage is completely secure, and we cannot guarantee absolute protection.
          </p>

          <h2 className="font-serif text-xl font-bold text-zinc-900 pt-4 border-b border-zinc-100 pb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            4. External Platforms and Outgoing Links
          </h2>
          <p>
            Our articles and pages may feature links to external reference sources, research databases, or associated platforms. If you click on an outgoing link, you will be directed to that third party's domain. We do not operate or control external domains, and we assume no responsibility for the content, privacy structures, or practices of third-party platforms.
          </p>

          <h2 className="font-serif text-xl font-bold text-zinc-900 pt-4 border-b border-zinc-100 pb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            5. Framework Updates
          </h2>
          <p>
            We reserve the right to modify or recalibrate this Privacy Framework at any time to reflect operational, legal, or regulatory updates. Any changes will be published directly on this page with an updated timestamp. Continued usage of our services constitutes acceptance of the published framework.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-zinc-50 py-8 text-center text-xs text-zinc-500 mt-12">
        <p>© 2026 The Report Desk. All rights reserved.</p>
      </footer>
    </div>
  );
}
