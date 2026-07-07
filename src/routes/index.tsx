import { createFileRoute } from "@tanstack/react-router";
import heroPortrait from "@/assets/hero-portrait.jpg";
import related1 from "@/assets/related-1.jpg";
import related2 from "@/assets/related-2.jpg";
import related3 from "@/assets/related-3.jpg";
import related4 from "@/assets/related-4.png";
import recommended1 from "@/assets/recommended-1.png";
import video1 from "@/assets/WhatsApp Video 2026-07-07 at 10.48.37.mp4";
import video2 from "@/assets/WhatsApp Video 2026-07-07 at 10.48.38.mp4";
import {
  Menu,
  X,
  ArrowRight,
  Share2,
  Printer,
  ChevronRight,
  Search,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "The Crypto Alpha Shift: Institutional Execution & Risk Hedging in 2026 - The Investor's Chronicle",
      },
      {
        name: "description",
        content:
          "An in-depth analysis of cryptocurrency trading strategies, liquidity pools, and algorithmic risk mitigation models for modern digital assets.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300..900&display=swap",
      },
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📰</text></svg>",
      },
    ],
  }),
  component: Index,
});

const ENQUIRY = "/enquiry";

function Index() {
  const trendingTags = [
    "Ukraine Drone Attack",
    "Bangladesh Bomb Blast",
    "Rick Scott",
    "Strait of Hormuz",
    "Benjamin Netanyahu",
    "BTC at $71k",
    "Ethereum ETF Inflows",
    "Cyprus Yield Desk",
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
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-950 selection:text-white antialiased" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Top Banner Bar */}
      <div className="border-b border-zinc-200 bg-white py-2 text-xs text-zinc-500 font-medium">
        <div className="mx-auto max-w-7xl px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 border-r border-zinc-200 pr-3.5">
              <span>Edition</span>
              <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="font-bold text-zinc-900 flex items-center gap-0.5 cursor-pointer">
                🇺🇸 US <ChevronRight className="w-3 h-3 rotate-90" />
              </a>
            </div>
            <div className="flex items-center gap-1.5 border-r border-zinc-200 pr-3.5">
              <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-zinc-900 flex items-center gap-0.5">
                <span>English</span>
                <ChevronRight className="w-3 h-3 rotate-90 text-zinc-400" />
              </a>
            </div>
            <div>
              Tue, Jul 07, 2026 | <span className="text-zinc-400">Updated 12.11PM IST</span>
            </div>
            <div className="hidden md:flex items-center gap-1">
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
      <div className="pt-12 pb-6 text-center border-b border-zinc-200">
        <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="text-4xl sm:text-5xl md:text-6.5xl font-extrabold tracking-tight text-zinc-950 uppercase cursor-pointer" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          The Investor's Chronicle
        </a>
      </div>

      {/* Main Category Bar - Centered */}
      <div className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-3 flex flex-col md:flex-row items-center justify-center gap-3">
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs md:text-[13.5px] font-bold text-zinc-700 uppercase tracking-wider">
            <a href="/" className="text-zinc-900 font-black border-b-2 border-zinc-950 pb-0.5 cursor-pointer">Home</a>
            <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-950 cursor-pointer">City</a>
            <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-950 cursor-pointer">Live</a>
            <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-950 cursor-pointer">India</a>
            <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-950 cursor-pointer">World</a>
            <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-950 cursor-pointer">Business</a>
            <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-950 cursor-pointer">Sports</a>
            <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-950 cursor-pointer">Cricket</a>
            <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-950 cursor-pointer">Entertainment</a>
            <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-950 cursor-pointer">Tech</a>
            <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-950 cursor-pointer">Blogs</a>
          </nav>
        </div>
      </div>

      {/* Sub-nav: In the News row */}
      <div className="border-b border-zinc-200 bg-zinc-50/50 py-2 text-xs">
        <div className="mx-auto max-w-7xl px-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <span className="font-bold text-rose-600 uppercase tracking-wider shrink-0">In The News</span>
          {["AI Masterclass", "Money Masterclass", "Ask Apollo", "Parentology", "BTC Backtest", "Cyprus Sourcing", "MPC Custody"].map((item, idx) => (
            <a key={idx} href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-zinc-655 hover:text-zinc-900 cursor-pointer">
              <span className="text-zinc-300">|</span>
              {item}
              {idx === 2 || idx === 4 ? <span className="text-[8px] bg-red-500 text-white px-1.5 py-0.5 rounded uppercase font-bold leading-none scale-90">New</span> : null}
            </a>
          ))}
        </div>
      </div>

      {/* Trending Tags Row */}
      <div className="border-b border-zinc-200 py-2 bg-white">
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-center gap-2.5 overflow-x-auto scrollbar-none text-[11px] sm:text-xs">
          <span className="px-2 py-0.5 bg-zinc-800 text-white rounded font-bold uppercase shrink-0">Trending</span>
          <div className="flex items-center justify-center gap-3">
            {trendingTags.map((tag, idx) => (
              <a
                key={idx}
                href={ENQUIRY}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 hover:text-zinc-950 hover:underline shrink-0 whitespace-nowrap cursor-pointer"
              >
                {tag}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Breadcrumb path */}
      <div className="mx-auto max-w-7xl px-6 pt-4.5 text-[11.5px] text-zinc-400 font-medium">
        <span>News</span> <span className="mx-1.5">/</span> 
        <span>World News</span> <span className="mx-1.5">/</span> 
        <span>US News</span> <span className="mx-1.5">/</span> 
        <span className="text-zinc-800 font-bold">"The Crypto Alpha Shift"</span>
      </div>

      {/* Main Grid Content Layout */}
      <main className="mx-auto max-w-7xl px-6 py-6">
        
        {/* Two-Column Layout Row */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (Wider): The Main Editorial News Article */}
          <article className="lg:col-span-8 space-y-6">
            
            {/* Article Title */}
            <header className="space-y-3.5">
              <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl leading-[1.08] text-zinc-950 tracking-tight" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>
                'The Crypto Alpha Shift': Institutional Execution & Risk Hedging in 2026
              </h1>
              
              {/* Meta Byline info */}
              <div className="text-[11.5px] text-zinc-455 font-medium flex flex-wrap items-center gap-2 border-y border-zinc-100 py-2">
                <span className="text-zinc-900 font-bold">Chronicle World Desk</span>
                <span>/</span>
                <span>THEINVESTORSCHRONICLE.COM</span>
                <span>/</span>
                <span>Updated: Jul 07, 2026, 11:40 IST</span>
              </div>

              {/* Social / Tools toolbar bar */}
              <div className="flex items-center justify-between py-2 border-b border-zinc-150">
                <div className="flex items-center gap-2.5">
                  <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 border border-zinc-200 rounded-lg text-xs font-bold text-zinc-655 bg-white hover:bg-zinc-50 cursor-pointer transition-colors">
                    <MessageSquare className="w-4 h-4" /> Comments
                  </a>
                  <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 border border-zinc-200 rounded-lg text-xs font-bold text-zinc-655 bg-white hover:bg-zinc-50 cursor-pointer transition-colors">
                    <Share2 className="w-4 h-4" /> Share
                  </a>
                  <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-2 py-1.5 border border-zinc-200 rounded-lg text-xs text-zinc-655 bg-white hover:bg-zinc-50 cursor-pointer transition-colors" title="Print page">
                    <Printer className="w-4 h-4" />
                  </a>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mr-1">Font Size</span>
                  <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="w-7 h-7 border border-zinc-200 rounded bg-white text-xs font-bold flex items-center justify-center hover:bg-zinc-50 cursor-pointer">A</a>
                  <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="w-7 h-7 border border-zinc-200 rounded bg-white text-sm font-bold flex items-center justify-center hover:bg-zinc-50 cursor-pointer">A</a>
                </div>
              </div>
            </header>

            {/* Main Hero Video player instead of image at the top */}
            <div className="overflow-hidden rounded-xl border border-zinc-200 aspect-[9/16] md:aspect-[16/9] bg-black shadow-sm max-w-sm md:max-w-none mx-auto w-full">
              <video
                src={video1}
                controls
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-contain bg-black"
                poster={heroPortrait}
              />
            </div>

            {/* Main Prose Text */}
            <div className="prose prose-md max-w-none text-zinc-700 space-y-5 text-[14px] sm:text-[15.5px] md:text-[17px] leading-relaxed" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>
              <p className="font-medium text-base sm:text-lg text-zinc-900 leading-relaxed">
                <span className="font-bold text-zinc-950">LONDON:</span> Cryptocurrency markets in 2026 have shifted from speculative retail assets into a highly structured quantitative ecosystem. With zero-interest rate policies phased out globally, yield preservation and capital sustainability are the primary parameters guiding capital allocations. Investors are no longer asking how high an asset can spike, but rather how systematically it can be acquired and hedged.
              </p>

              <p>
                According to recent transaction data, multi-signature custodial addresses hold over 40% of the active liquid supply, pointing to a steady accumulation phase. Systemic capital is moving away from leveraged derivative trades and instead flowing into decentralized, spot-backed liquidity feeds.
              </p>

              <h3 className="font-serif text-base sm:text-lg font-bold text-zinc-900 pt-3 border-b border-zinc-100 pb-1">
                1. Real-time Spot Sourcing Desks
              </h3>
              
              <p>
                Underlying liquidity sourcing networks connect execution directly to major global spot liquidity channels. By routing allocations across deep order book matrices, institutions mitigate slippage and capture optimal pricing spreads even during high volatility market segments.
              </p>

              <h3 className="font-serif text-base sm:text-lg font-bold text-zinc-900 pt-3 border-b border-zinc-100 pb-1">
                2. Sourced Crypto Stories: How Strategic Allocations Changed Lives
              </h3>

              <p>
                The impact of structured crypto asset routing extends beyond balance sheets to individual wealth builder trajectories. By accessing low-volatility yield desks, private accumulators have managed to completely transform their security frameworks.
              </p>

              {/* Second Video player placed in the middle */}
              <div className="rounded-xl overflow-hidden border border-zinc-200 shadow bg-black aspect-[9/16] md:aspect-[16/9] max-w-sm md:max-w-none mx-auto w-full my-6">
                <video
                  src={video2}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-contain bg-black"
                  poster={related2}
                />
              </div>

              <h3 className="font-serif text-base sm:text-lg font-bold text-zinc-900 pt-3 border-b border-zinc-100 pb-1">
                3. Yield Optimization & DCA Models
              </h3>

              <p>
                DCA (Dollar-Cost Averaging) remains the most robust execution protocol for volatile token indices. By establishing fixed, time-based purchases, allocators mitigate short-term pricing fluctuations, achieving a balanced spot acquisition average.
              </p>

              <p>
                Unlike previous market regimes that relied on unsecured lending platforms, modern yields are generated via delta-neutral funding rate arbitrage. By offsetting spot acquisitions with short perpetual futures positions, desks secure structural yields independent of directional token volatility.
              </p>

              <h3 className="font-serif text-base sm:text-lg font-bold text-zinc-900 pt-3 border-b border-zinc-100 pb-1">
                4. Custodial Signers & Key Protection
              </h3>

              <p>
                The final dimension of modern crypto trading is security. Asset protection frameworks have evolved past single-point-of-failure private keys. Multi-Party Computation (MPC) protocols allow co-signers to approve transactions without exposing key shards, ensuring institutional assets remain resilient to digital vulnerabilities.
              </p>
            </div>

          </article>

          {/* Right Column: Larger News Sidebar */}
          <aside className="lg:col-span-4 space-y-6 border-t lg:border-t-0 lg:border-l border-zinc-200 pt-6 lg:pt-0 lg:pl-6">
            
            {/* Top Stories list */}
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
                    <div className="w-26 h-20 shrink-0 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 shadow-sm">
                      <img
                        src={story.img}
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      />
                    </div>
                    <div className="space-y-1">
                      <h5 className="font-bold text-sm sm:text-base leading-snug text-zinc-900 group-hover:text-indigo-650 transition-colors">
                        {story.title}
                      </h5>
                      <p className="text-[11px] sm:text-xs text-zinc-455 line-clamp-2 leading-relaxed font-light">{story.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Market Indices Desk */}
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
                      <span className={`font-mono text-[10px] font-bold ${change.startsWith("+") ? "text-emerald-600" : "text-rose-600"}`}>
                        {change}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </a>

            {/* Trending Stories Box */}
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
                    <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-indigo-650 leading-relaxed cursor-pointer">
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

        {/* RELATED ARTICLES - Placed full screen */}
        <section className="border-t border-zinc-200 mt-12 pt-10 space-y-5">
          <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-zinc-950 tracking-tight">
            Related Crypto Analysis
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {bottomRelated.map((story, i) => (
              <a
                key={i}
                href={ENQUIRY}
                target="_blank"
                rel="noopener noreferrer"
                className="group block space-y-3 cursor-pointer"
              >
                <div className="overflow-hidden rounded-lg border border-zinc-200 aspect-[1.5/1] bg-zinc-50 shadow-sm">
                  <img
                    src={story.img}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-indigo-650 block">{story.cat}</span>
                  <h5 className="font-bold text-sm sm:text-base leading-snug text-zinc-900 group-hover:text-indigo-650 transition-colors">
                    {story.title}
                  </h5>
                  <p className="text-[11px] text-zinc-455 line-clamp-3 leading-relaxed font-light">{story.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* RECOMMENDED ARTICLES - Placed full screen */}
        <section className="border-t border-zinc-200 mt-12 pt-10 space-y-5">
          <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-zinc-950 tracking-tight">
            Recommended For You
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {bottomRecommended.map((story, i) => (
              <a
                key={i}
                href={ENQUIRY}
                target="_blank"
                rel="noopener noreferrer"
                className="group block space-y-3 cursor-pointer"
              >
                <div className="overflow-hidden rounded-lg border border-zinc-200 aspect-[1.5/1] bg-zinc-50 shadow-sm">
                  <img
                    src={story.img}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-zinc-400 block">{story.cat}</span>
                  <h5 className="font-bold text-sm sm:text-base leading-snug text-zinc-900 group-hover:text-indigo-650 transition-colors">
                    {story.title}
                  </h5>
                  <p className="text-[11px] text-zinc-455 line-clamp-3 leading-relaxed font-light">{story.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

      </main>

      {/* Footer Grid */}
      <footer className="border-t border-zinc-200 bg-zinc-50 py-12 mt-12 text-xs text-zinc-500">
        <div className="mx-auto max-w-7xl px-6 grid sm:grid-cols-2 md:grid-cols-4 gap-6 pb-8 border-b border-zinc-200">
          <div>
            <h5 className="font-serif text-sm font-bold text-zinc-900 mb-3">Chronicle Desks</h5>
            <ul className="space-y-2">
              {["Global Markets", "Crypto Desk", "Macro Policy", "Decentralized Finance", "Emerging Tech", "Venture Capital"].map((link) => (
                <li key={link}>
                  <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="hover:underline cursor-pointer">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-serif text-sm font-bold text-zinc-900 mb-3">Wealth Services</h5>
            <ul className="space-y-2">
              {["Portfolio Structuring", "Execution Management", "Cyprus Desk Hub", "Consultation Scheduler", "MPC Custody Audit", "Asset Preservation"].map((link) => (
                <li key={link}>
                  <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="hover:underline cursor-pointer">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-serif text-sm font-bold text-zinc-900 mb-3">Legal & Audits</h5>
            <ul className="space-y-2">
              {["Terms of Publication", "Privacy Framework", "Cookies Configuration", "Investment Risks Disclosure", "Regulatory Audits", "Fiduciary Mandates"].map((link) => (
                <li key={link}>
                  <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="hover:underline cursor-pointer">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-serif text-sm font-bold text-zinc-900 mb-3">Institutional</h5>
            <ul className="space-y-2">
              {["API Integration", "Corporate Access", "Research Database", "Sovereign Wealth", "Advisory Board", "Contact Editorial"].map((link) => (
                <li key={link}>
                  <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="hover:underline cursor-pointer">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 The Investor's Chronicle. All rights reserved.</p>
          <p className="max-w-md sm:text-right leading-relaxed font-light text-zinc-400">
            Digital asset allocations carry severe risk parameters and may lead to full capital loss.
          </p>
        </div>
      </footer>
    </div>
  );
}
