import heroPortrait from "@/assets/hero-portrait.jpg";
import related1 from "@/assets/related-1.jpg";
import related2 from "@/assets/related-2.jpg";
import related3 from "@/assets/related-3.jpg";
import related4 from "@/assets/related-4.png";
import recommended1 from "@/assets/recommended-1.png";
import video1 from "@/assets/WhatsApp Video 2026-07-07 at 10.48.37.mp4";
import video2 from "@/assets/WhatsApp Video 2026-07-07 at 10.48.38.mp4";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Share2,
  Printer,
  ChevronRight,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

const ENQUIRY = "/enquiry";

export default function Index() {
  useEffect(() => {
    document.title = "The Report Desk | Independent Market Analysis & Financial Insights";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "In-depth reporting on global markets, digital assets, sovereign wealth, macroeconomics, and the discipline of long-term investing.");
    }
  }, []);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const trendingTags = [
    "Ukraine Drone Attack",
    "Bangladesh Bomb Blast",
    "Rick Scott",
    "Strait of Hormuz",
    "Benjamin Netanyahu",
    "BTC at $71k",
    "Ethereum ETF Inflows",
    "Cyprus Yield Desk",
    "FOMC Minutes",
    "Liquidity Crunch",
    "Yield Curves",
    "Gas Fees Reduction",
    "Zero-Knowledge Rollups",
    "L3 Scalability",
    "US Debt Ceiling",
    "Interest Rate Spikes",
    "Nasdaq Record Highs",
    "NVIDIA Valuation",
    "Tokyo Inflation",
    "ECB Rate Cuts",
    "Gold Reserve Index",
    "Crude Oil Spreads",
    "Eurozone Divergence",
    "Arbitrum Upgrade",
  ];

  const sideStories = [
    {
      title: "Why do assets consolidate? The surprising mechanics behind market resistance zones",
      desc: "Technical analysis outlines orderbook matrices that restrict short-term pricing runs.",
      img: related1,
    },
    {
      title: "SEC updates custody regulations: Institutional guidelines for digital asset signers",
      desc: "Fiduciary platforms transition to stricter MPC verification schemes in Q2.",
      img: related2,
    },
    {
      title: "Stablecoin velocity indexes scale to historic highs amidst settlement demands",
      desc: "Volume data highlights high transacting metrics across cross-border liquidity rails.",
      img: related3,
    },
  ];

  const bottomRelated = [
    { cat: "Crypto Macro Strategy", title: "The Yield Rebalancing Mandate", img: related1, desc: "An analytical breakdown of how institutional capital is migrating toward low-leverage yield pools in the crypto space." },
    { cat: "Tokenomics Research", title: "Decentralized Liquidity and Market Resilience", img: related2, desc: "Evaluating the structural mechanics supporting token pricing structures amidst high volatility events in 2026." },
    { cat: "Custodial Architectures", title: "Safeguarding Decentralized Capital Allocations", img: related3, desc: "A security framework audit examining multi-party computation (MPC) protocols and ledger storage configurations." },
    { cat: "Layer-2 Economics", title: "The Collateralization Velocity of ZK-Rollups", img: related4, desc: "Analyzing liquidity compression ratios and gas utilization spreads across major zero-knowledge rollups." },
    { cat: "Sovereign Allocations", title: "Sovereign Wealth Funds & Digital Asset Reserves", img: related2, desc: "Inside the sovereign wealth mandates quietly acquiring long-term structural positions in liquid crypto tokens." },
    { cat: "Regulatory Frameworks", title: "Cross-Border Tax Harmonization for Virtual Assets", img: related3, desc: "An outline of new OECD frameworks mapping token ownership, reporting parameters, and compliance guidelines." },
  ];

  const bottomRecommended = [
    { cat: "Global Macro", title: "Federal Reserve Adjusts Balance Sheet Compression Targets", img: recommended1, desc: "An overview of liquidity adjustments and global rates policy shifts.", time: "5 min read" },
    { cat: "Sovereign Debt", title: "Eurozone Bond Spreads Diverge Amid Inflation Realignment", img: related3, desc: "Tracking macro divergence parameters across sovereign bond portfolios.", time: "7 min read" },
    { cat: "Venture Capital", title: "AI Infrastructure Valuations Return to Value-Driven Ratios", img: related2, desc: "Inside the capital deployments funding core AI computing infrastructures.", time: "9 min read" },
    { cat: "Commodities", title: "Central Bank Gold Reserves Reach Historic Heights in Q2", img: related4, desc: "Evaluating gold velocity parameters as global reserve hedges.", time: "4 min read" },
    { cat: "Digital Forex", title: "Stablecoin Velocity Analysis and Cross-Border Settlements", img: related2, desc: "Mapping settlement speeds across global virtual payment rails.", time: "6 min read" },
    { cat: "DeFi Yields", title: "Decentralized Arbitrage Pools and Yield Curve Calibration", img: related1, desc: "Technical adjustments defining token yields in risk-free vaults.", time: "8 min read" },
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-955 selection:text-white antialiased" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Top Banner Bar */}
      <div className="hidden lg:block border-b border-zinc-200 bg-white py-2 text-xs text-zinc-500 font-medium">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 border-r border-zinc-200 pr-3.5">
              <span>Edition</span>
              <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="font-bold text-zinc-900 flex items-center gap-0.5 cursor-pointer">
                🇺🇸 US <ChevronRight className="w-3 h-3 rotate-90" />
              </a>
            </div>
            <div className="flex items-center gap-1.5 md:border-r md:border-zinc-200 md:pr-3.5">
              <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-zinc-900 flex items-center gap-0.5">
                <span>English</span>
                <ChevronRight className="w-3 h-3 rotate-90 text-zinc-400" />
              </a>
            </div>
            <div className="hidden md:block">
              Tue, Jul 07, 2026 | <span className="text-zinc-400">Updated 12.11PM IST</span>
            </div>
            <div className="hidden lg:flex items-center gap-1">
              <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-zinc-900">
                <span>📍 Weather⛅</span>
              </a>
            </div>
          </div>
          <div>
            <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="hover:underline font-semibold text-zinc-800 cursor-pointer">
              Sign In
            </a>
          </div>
        </div>
      </div>

      {/* Large Brand Header Logo */}
      <div className="relative pt-5 pb-5 md:pt-10 md:pb-6 text-center border-b border-zinc-200 px-4 sm:px-6">
        {/* Mobile Hamburger Menu Button */}
        <div className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 flex items-center lg:hidden">
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="p-1.5 -ml-1.5 rounded-md hover:bg-zinc-100 text-zinc-800 focus:outline-none cursor-pointer transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="inline-block text-xl sm:text-3xl md:text-5xl lg:text-6.5xl font-extrabold tracking-tight text-zinc-955 uppercase cursor-pointer px-12 md:px-0" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          The Report Desk
        </a>

        {/* Mobile Sign In Button */}
        <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 flex items-center lg:hidden">
          <a 
            href={ENQUIRY}
            className="text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-zinc-950 text-white px-2.5 py-1.5 rounded hover:bg-zinc-800 transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>

      {/* Main Category Bar - Centered & Horizontal Scrollable on Mobile */}
      <div className="border-b border-zinc-200 bg-white sticky top-0 z-30 shadow-sm lg:shadow-none">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-2.5 lg:py-3">
          {/* Desktop Nav */}
          <nav className="hidden lg:flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs lg:text-[13.5px] font-bold text-zinc-700 uppercase tracking-wider">
            <a href="/" className="text-zinc-900 font-black border-b-2 border-zinc-955 pb-0.5 cursor-pointer">Home</a>
            <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-955 cursor-pointer">City</a>
            <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-955 cursor-pointer">Live</a>
            <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-955 cursor-pointer">India</a>
            <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-955 cursor-pointer">World</a>
            <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-955 cursor-pointer">Business</a>
            <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-955 cursor-pointer">Sports</a>
            <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-955 cursor-pointer">Cricket</a>
            <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-955 cursor-pointer">Entertainment</a>
            <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-955 cursor-pointer">Tech</a>
            <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-955 cursor-pointer">Blogs</a>
          </nav>
          {/* Mobile Swipeable Nav */}
          <nav className="lg:hidden flex items-center gap-4 text-[11px] font-bold text-zinc-700 uppercase tracking-wider overflow-x-auto scrollbar-none whitespace-nowrap -mx-4 px-4">
            <a href="/" className="text-zinc-900 font-black border-b-2 border-zinc-955 pb-0.5 cursor-pointer shrink-0">Home</a>
            {["City", "Live", "India", "World", "Business", "Sports", "Cricket", "Entertainment", "Tech", "Blogs"].map((cat) => (
              <a key={cat} href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-955 cursor-pointer shrink-0">{cat}</a>
            ))}
          </nav>
        </div>
      </div>

      {/* Sub-nav: In the News row (Horizontal Scrollable on Mobile) */}
      <div className="border-b border-zinc-200 bg-zinc-50/50 py-2 text-xs overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center gap-x-4 overflow-x-auto scrollbar-none whitespace-nowrap -mx-4 px-4 sm:mx-0 sm:px-0">
          <span className="font-bold text-rose-600 uppercase tracking-wider shrink-0 text-[10px] md:text-xs">In The News</span>
          <div className="flex items-center gap-x-4">
            {["AI Masterclass", "Money Masterclass", "Ask Apollo", "Parentology", "BTC Backtest", "Cyprus Sourcing", "MPC Custody", "Solana ETF Decision", "Institutional Inflows", "Securitized Yields", "Tokenized Treasury", "Arbitrage Desks", "Tokenized Bonds", "Yield Compression", "SEC Updates", "Macro Indicators", "Treasury Yields", "DeFi Governance", "Gas Token Spikes", "DEX Volumes", "Venture Deployments", "AI Cloud Spending"].map((item, idx) => (
              <a key={idx} href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-zinc-600 hover:text-zinc-900 cursor-pointer shrink-0">
                <span className="text-zinc-300">|</span>
                {item}
                {idx === 2 || idx === 4 ? <span className="text-[8px] bg-red-500 text-white px-1.5 py-0.5 rounded uppercase font-bold leading-none scale-90">New</span> : null}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Trending Tags Row (Horizontal Scrollable on Mobile) */}
      <div className="border-b border-zinc-200 py-2 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center gap-2.5 overflow-x-auto scrollbar-none text-[11px] sm:text-xs -mx-4 px-4 sm:mx-0 sm:px-0">
          <span className="px-2 py-0.5 bg-zinc-800 text-white rounded font-bold uppercase shrink-0">Trending</span>
          <div className="flex items-center gap-3">
            {trendingTags.map((tag, idx) => (
              <a
                key={idx}
                href={ENQUIRY}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 hover:text-zinc-955 hover:underline shrink-0 whitespace-nowrap cursor-pointer"
              >
                {tag}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Breadcrumb path */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-4 text-[11.5px] text-zinc-400 font-medium">
        <span>News</span> <span className="mx-1.5">/</span>
        <span>World News</span> <span className="mx-1.5">/</span>
        <span>US News</span> <span className="mx-1.5">/</span>
        <span className="text-zinc-800 font-bold">"Crypto Vance Story"</span>
      </div>

      {/* Main Grid Content Layout */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-4 md:py-6">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Main Editorial Article */}
          <article className="lg:col-span-8 space-y-6">
            <header className="space-y-3.5">
              <h1 className="font-extrabold text-2xl sm:text-4xl md:text-5xl leading-[1.08] text-zinc-955 tracking-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                From Student Debt to $45M: How 25-Year-Old Ryan Vance Beat the Crypto Market
              </h1>
              <div className="text-[11.5px] text-zinc-455 font-medium flex flex-wrap items-center gap-2 border-y border-zinc-100 py-2">
                <span className="text-zinc-900 font-bold">Report Desk World Desk</span>
                <span>/</span>
                <span>THEREPORTDESK.COM</span>
                <span>/</span>
                <span>Updated: Jul 07, 2026, 11:40 IST</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-y-2 py-2 border-b border-zinc-150">
                <div className="flex items-center gap-2">
                  <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-2.5 py-1.5 border border-zinc-200 rounded-lg text-[11px] font-bold text-zinc-605 bg-white hover:bg-zinc-50 cursor-pointer transition-colors sm:px-3 sm:py-1.5 sm:text-xs">
                    <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Comments
                  </a>
                  <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-2.5 py-1.5 border border-zinc-200 rounded-lg text-[11px] font-bold text-zinc-605 bg-white hover:bg-zinc-50 cursor-pointer transition-colors sm:px-3 sm:py-1.5 sm:text-xs">
                    <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Share
                  </a>
                  <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-1 px-2 py-1.5 border border-zinc-200 rounded-lg text-xs text-zinc-605 bg-white hover:bg-zinc-50 cursor-pointer transition-colors" title="Print page">
                    <Printer className="w-4 h-4" />
                  </a>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mr-1 hidden sm:inline">Font Size</span>
                  <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="w-6 h-6 border border-zinc-200 rounded bg-white text-[10px] font-bold flex items-center justify-center hover:bg-zinc-50 cursor-pointer sm:w-7 sm:h-7 sm:text-xs">A</a>
                  <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="w-6 h-6 border border-zinc-200 rounded bg-white text-xs font-bold flex items-center justify-center hover:bg-zinc-50 cursor-pointer sm:w-7 sm:h-7 sm:text-sm">A</a>
                </div>
              </div>
            </header>

            {/* Main Hero Video */}
            <div className="overflow-hidden rounded-xl border border-zinc-200 aspect-video bg-black shadow-sm max-w-2xl mx-auto w-full max-h-[35vh] sm:max-h-[45vh] md:max-h-none flex items-center justify-center">
              <video
                src={video1}
                controls
                loop
                playsInline
                className="w-full h-full object-contain bg-black cursor-pointer"
                poster={heroPortrait}
                onClick={(e) => {
                  if (e.currentTarget.paused) {
                    e.currentTarget.play().catch(() => {});
                  } else {
                    e.currentTarget.pause();
                  }
                }}
              />
            </div>
            {/* Main Prose */}
            <div className="prose prose-md max-w-none text-zinc-700 space-y-5 text-[14px] sm:text-[15.5px] md:text-[17px] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              <p className="font-medium text-base sm:text-lg text-zinc-900 leading-relaxed">
                <span className="font-bold text-zinc-955">LONDON:</span> At just 25 years old, Ryan Vance has achieved what most traders spend lifetimes chasing. The former university dropout, who once struggled to pay his monthly rent, now sits at the helm of a digital asset portfolio valued at over $45 million. His secret? A systematic approach to cryptocurrency that completely avoids the speculative traps of the average retail investor.
              </p>
              <p>
                "I didn't get rich by guessing the next meme coin," Ryan shares during an exclusive interview. "I treated crypto like a business. While everyone else was looking at social media hype, I was looking at order books, liquidity spreads, and yield optimization models. It’s about building a machine that works for you, not gambling your savings."
              </p>
              <h3 className="font-serif text-base sm:text-lg font-bold text-zinc-900 pt-3 border-b border-zinc-100 pb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                1. Finding the Alpha in Simple Strategies
              </h3>
              <p>
                Ryan’s journey started with a simple observation: retail traders consistently lose money because they buy high out of FOMO (Fear Of Missing Out) and sell low out of panic. To beat the cycle, Ryan designed a strict execution strategy based on dollar-cost averaging (DCA). By automating his buys at set intervals regardless of daily price swings, he built a solid foundation without trying to time the market.
              </p>
              <h3 className="font-serif text-base sm:text-lg font-bold text-zinc-900 pt-3 border-b border-zinc-100 pb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                2. Generating Passive Cash Flow via DeFi Yields
              </h3>
              <p>
                Instead of letting his assets sit idle, Ryan focused on safe, delta-neutral yield strategies. By providing liquidity to decentralized spot pools, he began earning consistent, passive income. "In crypto, your money should never sleep," Ryan explains. "By capturing trading fees rather than just betting on prices going up, you create a sustainable safety net that keeps growing even during market downturns."
              </p>

              {/* Second Video */}
              <div className="rounded-xl overflow-hidden border border-zinc-200 shadow bg-black aspect-video max-w-2xl mx-auto w-full my-6 max-h-[35vh] sm:max-h-[45vh] md:max-h-none flex items-center justify-center">
                <video
                  src={video2}
                  controls
                  loop
                  playsInline
                  className="w-full h-full object-contain bg-black cursor-pointer"
                  poster={related2}
                  onClick={(e) => {
                    if (e.currentTarget.paused) {
                      e.currentTarget.play().catch(() => {});
                    } else {
                      e.currentTarget.pause();
                    }
                  }}
                />
              </div>

              <h3 className="font-serif text-base sm:text-lg font-bold text-zinc-900 pt-3 border-b border-zinc-100 pb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                3. The Retail Trap: Why Most Traders Fail
              </h3>
              <p>
                Most newcomers try to trade with high leverage on unregulated platforms, which Ryan describes as a recipe for disaster. "Exchanges make money when you trade frequently and lose," he warns. "To truly scale, you have to transition from a retail gambler to an institutional allocator. That means prioritizing security, minimizing slippage on large trades, and getting professional execution."
              </p>
              <p>
                Unlike previous market regimes that relied on unsecured lending platforms, Ryan's current yields are generated via structured market making spreads. By offsetting spot acquisitions with short positions, he secures structural gains independent of directional token volatility.
              </p>
              <h3 className="font-serif text-base sm:text-lg font-bold text-zinc-900 pt-3 border-b border-zinc-100 pb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                4. Scaling Up with Professional Desks
              </h3>
              <p>
                When his net worth crossed the seven-figure mark, Ryan knew he couldn't keep his funds on standard retail exchanges. He moved his capital into institutional-grade custody and execution desks. By partnering with elite wealth services like **Meridian Capital**, Ryan secured multi-signature security, delta-neutral yield structures, and zero-slippage OTC execution. "For anyone serious about protecting and scaling their wealth, partnering with a desk like Meridian is the ultimate game changer," Ryan says.
              </p>
            </div>
          </article>

          {/* Right Sidebar */}
          <aside className="lg:col-span-4 space-y-6 border-t lg:border-t-0 lg:border-l border-zinc-200 pt-6 lg:pt-0 lg:pl-6">
            <div className="space-y-4">
              <h4 className="font-serif text-base sm:text-lg font-bold text-zinc-955 uppercase border-b border-zinc-200 pb-2 tracking-wide">
                Top Crypto Stories
              </h4>
              <div className="space-y-4">
                {sideStories.map((story, i) => (
                  <a
                    key={i}
                    href={ENQUIRY}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex gap-3 pb-4 border-b border-zinc-150 last:border-0 last:pb-0 cursor-pointer"
                  >
                    <div className="w-24 h-20 shrink-0 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 shadow-sm">
                      <img src={story.img} alt={story.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="space-y-1">
                      <h5 className="font-bold text-sm sm:text-base leading-snug text-zinc-900 group-hover:text-indigo-600 transition-colors">
                        {story.title}
                      </h5>
                      <p className="text-[11px] sm:text-xs text-zinc-455 line-clamp-2 leading-relaxed font-light">{story.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Market Rates */}
            <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="block border border-zinc-200 rounded-lg p-5 bg-zinc-50/50 space-y-4 cursor-pointer hover:border-zinc-350 transition-all">
              <h4 className="font-serif text-sm sm:text-base font-bold text-zinc-955 uppercase border-b border-zinc-150 pb-2 tracking-wide flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-rose-600" /> Market Rates Watch
              </h4>
              <ul className="divide-y divide-zinc-100 text-xs sm:text-[13px] font-semibold">
                {[
                  ["BTC / USD", "$71,204.50", "+1.18%"],
                  ["ETH / USD", "$3,842.15", "+0.62%"],
                  ["SOL / USD", "$154.80", "+3.42%"],
                  ["Gold (oz)", "$2,481.00", "-0.11%"],
                  ["S&P 500", "5,614.20", "+0.24%"],
                ].map(([name, price, change]) => (
                  <li key={name} className="flex justify-between py-2 first:pt-0 last:pb-0">
                    <span className="text-zinc-500">{name}</span>
                    <div className="text-right">
                      <span className="font-mono text-zinc-955 font-bold block">{price}</span>
                      <span className={`font-mono text-[10px] font-bold ${change.startsWith("+") ? "text-emerald-600" : "text-rose-600"}`}>{change}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </a>

            {/* Trending Stories */}
            <div className="border border-zinc-200 rounded-lg p-5 bg-white shadow-sm space-y-4">
              <h4 className="font-serif text-sm sm:text-base font-bold text-zinc-955 uppercase border-b border-zinc-150 pb-2">
                Trending Stories
              </h4>
              <ul className="text-xs sm:text-[13.5px] space-y-3.5 font-semibold text-zinc-800 divide-y divide-zinc-150">
                {[
                  "After building a tech empire, Mark Zuckerberg is feeding his cows beer and macadamia nuts",
                  "SEC policy adjustments: How virtual asset frameworks divergence impacts local yields",
                  "Why Delta-Neutral Trading Desks Outperformed in Q2: Premium analysis",
                  "MPC Custody vs. Cold Wallets: The 2026 Security Audit",
                  "Gold reserves reach historic heights as central banks hedge currency index risk",
                ].map((title, idx) => (
                  <li key={idx} className="pt-2.5 first:pt-0 flex gap-2 items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0 animate-pulse" />
                    <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-indigo-600 leading-relaxed cursor-pointer">
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Editor's Choice */}
            <div className="border border-zinc-200 rounded-lg p-5 bg-white space-y-3.5">
              <h4 className="font-serif text-sm sm:text-base font-bold text-zinc-955 uppercase border-b border-zinc-150 pb-2 tracking-wide">
                Editorial Choice
              </h4>
              <div className="space-y-3.5 text-xs sm:text-[13px] font-semibold text-zinc-800">
                <div>
                  <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="hover:underline text-zinc-900 block leading-snug cursor-pointer">
                    The Decentralized Arbitrage Pools and Yield Curve Calibration Strategies
                  </a>
                  <span className="text-[10px] text-zinc-400 block mt-1 font-medium">By Marcus Vance</span>
                </div>
                <div className="border-t border-zinc-100 pt-3">
                  <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="hover:underline text-zinc-900 block leading-snug cursor-pointer">
                    Cross-Border Tax Harmonization for Virtual Assets under OECD Compliance
                  </a>
                  <span className="text-[10px] text-zinc-400 block mt-1 font-medium">By Eleanor Ashcroft</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Related */}
        <section className="border-t border-zinc-200 mt-12 pt-10 space-y-5">
          <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-zinc-955 tracking-tight">
            Related Crypto Analysis
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {bottomRelated.map((story, i) => (
              <a key={i} href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="group block space-y-3 cursor-pointer">
                <div className="overflow-hidden rounded-lg border border-zinc-200 aspect-[3/2] bg-zinc-50 shadow-sm">
                  <img src={story.img} alt={story.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-indigo-650 block">{story.cat}</span>
                  <h5 className="font-bold text-xs sm:text-sm leading-snug text-zinc-900 group-hover:text-indigo-650 transition-colors line-clamp-3 md:line-clamp-none">{story.title}</h5>
                  <p className="text-[10px] sm:text-[11px] text-zinc-500 line-clamp-3 leading-relaxed font-light hidden sm:block">{story.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Recommended */}
        <section className="border-t border-zinc-200 mt-12 pt-10 space-y-5">
          <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-zinc-955 tracking-tight">
            Recommended For You
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {bottomRecommended.map((story, i) => (
              <a key={i} href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="group block space-y-3 cursor-pointer">
                <div className="overflow-hidden rounded-lg border border-zinc-200 aspect-[3/2] bg-zinc-50 shadow-sm">
                  <img src={story.img} alt={story.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-zinc-400 block">{story.cat}</span>
                  <h5 className="font-bold text-xs sm:text-sm leading-snug text-zinc-900 group-hover:text-indigo-650 transition-colors line-clamp-3 md:line-clamp-none">{story.title}</h5>
                  <p className="text-[10px] sm:text-[11px] text-zinc-500 line-clamp-3 leading-relaxed font-light hidden sm:block">{story.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-zinc-50 py-12 mt-12 text-xs text-zinc-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 pb-8 border-b border-zinc-200">
          {[
            { title: "Report Desks", links: ["Global Markets", "Crypto Desk", "Macro Policy", "Decentralized Finance", "Emerging Tech", "Venture Capital"] },
            { title: "Wealth Services", links: ["Portfolio Structuring", "Execution Management", "Cyprus Desk Hub", "Consultation Scheduler", "MPC Custody Audit", "Asset Preservation"] },
            { title: "Legal & Audits", links: ["Terms of Publication", "Privacy Framework", "Cookies Configuration", "Investment Risks Disclosure", "Regulatory Audits", "Fiduciary Mandates"] },
            { title: "Institutional", links: ["API Integration", "Corporate Access", "Research Database", "Sovereign Wealth", "Advisory Board", "Contact Editorial"] },
          ].map((col) => (
            <div key={col.title}>
              <h5 className="font-serif text-sm font-bold text-zinc-900 mb-3">{col.title}</h5>
              <ul className="space-y-2">
                {col.links.map((link) => {
                  let href = ENQUIRY;
                  let target: string | undefined = "_blank";
                  let rel: string | undefined = "noopener noreferrer";

                  if (link === "Terms of Publication") {
                    href = "/terms";
                    target = undefined;
                    rel = undefined;
                  } else if (link === "Privacy Framework") {
                    href = "/privacy";
                    target = undefined;
                    rel = undefined;
                  }

                  return (
                    <li key={link}>
                      <a href={href} target={target} rel={rel} className="hover:underline cursor-pointer">{link}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 The Report Desk. All rights reserved.</p>
          <p className="max-w-md sm:text-right leading-relaxed font-light text-zinc-400">
            Digital asset allocations carry severe risk parameters and may lead to full capital loss.
          </p>
        </div>
      </footer>

      {/* Mobile Drawer Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Panel */}
          <div className="relative flex w-full max-w-xs flex-col bg-white py-4 shadow-xl animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between px-4 pb-4 border-b border-zinc-100">
              <span className="font-serif font-black text-lg text-zinc-955 tracking-tight uppercase">
                Report Desk Menu
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-md hover:bg-zinc-100 text-zinc-500 cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Scrollable links */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
              <div className="space-y-2">
                <h5 className="text-[10px] uppercase tracking-wider font-bold text-zinc-400">Categories</h5>
                <nav className="flex flex-col gap-3 font-semibold text-zinc-700 text-sm">
                  <a href="/" className="text-zinc-955 font-black border-l-2 border-zinc-955 pl-2">Home</a>
                  {["City", "Live", "India", "World", "Business", "Sports", "Cricket", "Entertainment", "Tech", "Blogs"].map((cat) => (
                    <a key={cat} href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-955 pl-2 hover:border-l-2 hover:border-zinc-300 transition-all">{cat}</a>
                  ))}
                </nav>
              </div>

              <div className="space-y-2 pt-4 border-t border-zinc-100">
                <h5 className="text-[10px] uppercase tracking-wider font-bold text-zinc-400">Trending Areas</h5>
                <div className="flex flex-col gap-2.5 text-xs font-medium text-zinc-605 font-semibold">
                  {["AI Masterclass", "Money Masterclass", "Ask Apollo", "BTC Backtest", "Cyprus Sourcing", "MPC Custody"].map((item, idx) => (
                    <a key={idx} href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900">{item}</a>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Panel Actions */}
            <div className="border-t border-zinc-100 p-4 space-y-3">
              <a 
                href={ENQUIRY} 
                className="flex items-center justify-center w-full py-2.5 bg-zinc-955 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors text-center"
              >
                Private Wealth Enquiry
              </a>
              <a 
                href={ENQUIRY} 
                className="flex items-center justify-center w-full py-2.5 border border-zinc-200 text-zinc-850 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-zinc-50 transition-colors text-center"
              >
                Sign In
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
