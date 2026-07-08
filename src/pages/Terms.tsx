import { useEffect } from "react";
import { ChevronRight } from "lucide-react";

export default function Terms() {
  useEffect(() => {
    document.title = "Terms of Publication | The Report Desk";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Review the intellectual property rights, governing law, and disclaimer of investment advice for The Report Desk.");
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
              <span className="text-zinc-400">Terms of Publication</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="hover:text-zinc-900 cursor-pointer">Home</a>
            <a href="/privacy" className="hover:text-zinc-900 cursor-pointer">Privacy Framework</a>
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
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-zinc-955 tracking-tight mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Terms of Publication
          </h1>
          <p className="text-sm text-zinc-500">Last updated: July 2026</p>
        </header>

        <div className="prose prose-md text-zinc-700 space-y-6 text-[15px] sm:text-[16px] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
          <p>
            Welcome to <strong>The Report Desk</strong>. By accessing our news publication, digital layouts, and reference files, you agree to comply with and be bound by the following Terms of Publication. Please review these terms carefully before utilizing our services.
          </p>

          <h2 className="font-serif text-xl font-bold text-zinc-900 pt-4 border-b border-zinc-100 pb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            1. No Investment Advice Disclaimer
          </h2>
          <p>
            The content, analysis, news stories, and materials published on <em>The Report Desk</em> are for informational and educational purposes only. Nothing contained on our platform constitutes a solicitation, recommendation, endorsement, or financial advice. Digital assets, cryptocurrency trading, and financial allocations carry high levels of risk, and you should perform independent research or consult with a certified fiduciary planner before making financial decisions.
          </p>

          <h2 className="font-serif text-xl font-bold text-zinc-900 pt-4 border-b border-zinc-100 pb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            2. Intellectual Property Rights
          </h2>
          <p>
            All original text, editorial graphics, layouts, and logos featured on this website are the intellectual property of <em>The Report Desk</em> and are protected under copyright and trademark laws. You may read, print, and share links to our articles for personal, non-commercial use. Any unauthorized replication, redistribution, or modification of our published materials without prior written consent is strictly prohibited.
          </p>

          <h2 className="font-serif text-xl font-bold text-zinc-900 pt-4 border-b border-zinc-100 pb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            3. Disclaimer of Warranties
          </h2>
          <p>
            Our publication is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. While we strive to source accurate data and provide professional reporting, we do not guarantee the completeness, accuracy, timeliness, or reliability of any information, metrics, or rates published on this platform.
          </p>

          <h2 className="font-serif text-xl font-bold text-zinc-900 pt-4 border-b border-zinc-100 pb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            4. Limitation of Liability
          </h2>
          <p>
            In no event shall <em>The Report Desk</em>, its writers, or its contributors be held liable for any direct, indirect, incidental, consequential, or punitive damages resulting from your access to, usage of, or reliance upon any content or services offered on this site.
          </p>

          <h2 className="font-serif text-xl font-bold text-zinc-900 pt-4 border-b border-zinc-100 pb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            5. Governing Law and Amendments
          </h2>
          <p>
            These terms are governed by standard publication and digital platform frameworks. We reserve the absolute right to amend, update, or discontinue any aspect of our publication or these Terms of Publication at our sole discretion and without prior notice.
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
