import { createFileRoute } from "@tanstack/react-router";
import heroPortrait from "@/assets/hero-portrait.jpg";
import inline1 from "@/assets/inline-1.jpg";
import related1 from "@/assets/related-1.jpg";
import related2 from "@/assets/related-2.jpg";
import related3 from "@/assets/related-3.jpg";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "The Long View: How One Founder Learned to Invest Through Four Crypto Winters — Meridian Capital Review",
      },
      {
        name: "description",
        content:
          "An extended interview with entrepreneur Adrian Vale on discipline, risk management, and building a long-term position in digital assets.",
      },
      {
        property: "og:title",
        content: "The Long View: How One Founder Learned to Invest Through Four Crypto Winters",
      },
      {
        property: "og:description",
        content:
          "An extended interview on discipline, risk management, and building a long-term position in digital assets.",
      },
    ],
  }),
  component: Index,
});

const ENQUIRY = "/enquiry";

function ExtLink({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <a
      href={ENQUIRY}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      setProgress(height > 0 ? (scrolled / height) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent">
      <div
        className="h-full bg-[color:var(--accent)] transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", on, { passive: true });
    on();
    return () => window.removeEventListener("scroll", on);
  }, []);
  const nav = [
    "Home",
    "Markets",
    "Crypto",
    "Business",
    "Technology",
    "Insights",
    "Success Stories",
    "About",
    "Contact",
  ];
  return (
    <header
      className={`sticky top-0 z-40 bg-[color:var(--paper)]/95 backdrop-blur border-b border-[color:var(--border)] transition-shadow ${
        scrolled ? "shadow-[0_1px_0_rgba(0,0,0,0.04)]" : ""
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="hidden lg:flex items-center justify-between py-2 text-[0.7rem] uppercase tracking-[0.14em] text-[color:var(--ink-muted)] border-b border-[color:var(--border)]/60">
          <span>Tuesday, 7 July 2026 · London Edition</span>
          <span>FTSE 100 8,412.55 <span className="text-[color:var(--accent)]">▲ 0.42%</span>  ·  BTC $71,204 <span className="text-[color:var(--accent)]">▲ 1.18%</span>  ·  Gold $2,481</span>
        </div>
        <div className="flex items-center justify-between py-5">
          <a href="/" className="font-serif text-xl font-bold tracking-tight">
            Meridian<span className="text-[color:var(--accent)]">.</span>
          </a>
          <nav className="hidden lg:flex items-center gap-7 text-[0.82rem] font-medium text-[color:var(--ink-soft)]">
            {nav.map((n) => (
              <ExtLink key={n} className="hover:text-[color:var(--accent)] transition-colors">
                {n}
              </ExtLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <ExtLink className="hidden md:inline-flex text-[0.82rem] font-medium text-[color:var(--ink-soft)] hover:text-[color:var(--accent)]">
              Sign in
            </ExtLink>
            <ExtLink className="inline-flex items-center px-4 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.12em] bg-[color:var(--ink)] text-[color:var(--paper)] hover:bg-[color:var(--accent)] transition-colors">
              Subscribe
            </ExtLink>
          </div>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-10 lg:pt-16 pb-12 anim-fade">
      <div className="text-center mb-8">
        <span className="eyebrow">The Long Read · Digital Assets</span>
      </div>
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        <div className="lg:col-span-6 order-2 lg:order-1">
          <h1 className="font-serif font-bold text-[2.4rem] sm:text-[3.2rem] lg:text-[3.9rem] leading-[1.02] tracking-[-0.02em] text-[color:var(--ink)]">
            The Long View: How One Founder Learned to Invest Through Four Crypto Winters
          </h1>
          <p className="mt-6 font-serif text-[1.2rem] lg:text-[1.35rem] leading-[1.5] text-[color:var(--ink-soft)]">
            Adrian Vale built and sold two software companies before he ever bought a coin.
            In an extended conversation, he explains why patience — not prediction — became the
            defining principle of his portfolio.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.82rem] text-[color:var(--ink-muted)] border-t border-[color:var(--border)] pt-5">
            <span className="text-[color:var(--ink-soft)] font-semibold">By Eleanor Ashcroft</span>
            <span>Senior Markets Correspondent</span>
            <span className="hidden sm:inline">·</span>
            <span>7 July 2026</span>
            <span className="hidden sm:inline">·</span>
            <span>14 min read</span>
            <span className="hidden sm:inline">·</span>
            <span>Category: <span className="text-[color:var(--accent)] font-semibold">Feature</span></span>
            <span className="hidden sm:inline">·</span>
            <span>28,411 views</span>
          </div>
        </div>
        <div className="lg:col-span-6 order-1 lg:order-2">
          <figure>
            <div className="overflow-hidden">
              <img
                src={heroPortrait}
                alt="Portrait of entrepreneur Adrian Vale in his London office."
                width={1600}
                height={1200}
                className="w-full h-auto object-cover transition-transform duration-[1400ms] hover:scale-[1.02]"
              />
            </div>
            <figcaption className="mt-3 text-[0.78rem] text-[color:var(--ink-muted)] italic">
              Adrian Vale, photographed at his office in Farringdon. <span className="not-italic">— Meridian / Sam Holloway</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { k: "12+", v: "Years covering global markets" },
    { k: "38", v: "Countries in reader base" },
    { k: "240", v: "Independent research reports" },
    { k: "0", v: "Sponsored editorial pieces" },
  ];
  return (
    <section className="border-y border-[color:var(--rule)] bg-[color:var(--paper)]">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-8 grid grid-cols-2 lg:grid-cols-4 divide-x divide-[color:var(--border)]">
        {stats.map((s, i) => (
          <div key={s.v} className={`px-4 ${i === 0 ? "pl-0" : ""}`}>
            <div className="font-serif text-3xl lg:text-4xl font-bold text-[color:var(--ink)]">{s.k}</div>
            <div className="mt-1 text-[0.78rem] uppercase tracking-[0.12em] text-[color:var(--ink-muted)]">{s.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Article() {
  return (
    <article className="prose-editorial max-w-none">
      <p className="drop-cap">
        Adrian Vale is not what you expect from someone who has spent the better part of a decade
        buying and holding cryptocurrency. He is quiet, deliberate, and disarmingly sceptical about
        his own industry. When we meet at a members' club in Farringdon, he arrives ten minutes
        early, orders black coffee, and spends the first five minutes talking about a book on the
        collapse of Long-Term Capital Management.
      </p>
      <p>
        "Most people who talk about crypto want to talk about the last twelve months," he says.
        "I try to think in terms of the next twelve years. That single change of frame is worth
        more than any indicator I've ever looked at."
      </p>

      <h2>Background: An Unlikely Investor</h2>
      <p>
        Vale, 41, is a Manchester-born founder who sold his first company — a scheduling tool for
        clinics — in 2014, and his second, a data platform for logistics operators, in 2021. He
        describes both exits as "unglamorous" and speaks about them with the flat, factual tone of
        someone who has been asked about them too many times.
      </p>
      <p>
        His first serious exposure to markets came not from technology but from watching his father,
        a shift manager at a paper mill, lose the family's savings in the 2008 financial crisis.
        "It wasn't that he did anything reckless," Vale says. "He just didn't understand what he
        owned. And when the panic came, he sold at exactly the wrong moment."
      </p>

      <h3>Early Failures</h3>
      <p>
        In his twenties, Vale made every mistake a young investor can make. He bought individual
        stocks on tips. He tried to trade currency pairs on borrowed capital. He was, in his own
        words, "a walking cautionary tale for anybody who thinks intelligence is a substitute for
        discipline."
      </p>
      <p>
        The turning point came in 2016, after he lost a five-figure sum on a leveraged position he
        still declines to describe in detail. "That was the day I stopped trying to be clever and
        started trying to be consistent."
      </p>

      <div className="pullquote">
        "I don't try to predict the market. I try to survive it long enough for the market to do
        what the market has always done."
      </div>

      <h2>The First Purchase</h2>
      <p>
        Vale bought his first Bitcoin in early 2017, at a price he says was "embarrassingly high at
        the time and embarrassingly low in hindsight." He did not buy because he believed in the
        technology — that came later — but because he wanted a small, uncorrelated position in
        something he did not fully understand.
      </p>
      <p>
        "The rule I set for myself was very simple," he says. "I would allocate a fixed percentage
        of new income into the position every month, regardless of price. If the price went up, I
        was happy. If it went down, I was happier, because I was buying more of it."
      </p>

      <figure className="my-10">
        <div className="overflow-hidden">
          <img
            src={inline1}
            alt="Interior of a modern conference room with a long dark table."
            width={1600}
            height={1000}
            loading="lazy"
            className="w-full h-auto object-cover"
          />
        </div>
        <figcaption className="mt-3 text-[0.78rem] text-[color:var(--ink-muted)] italic">
          The boardroom of Vale's second company, sold to a US logistics group in 2021.
        </figcaption>
      </figure>

      <h2>Surviving the Winters</h2>
      <p>
        By 2018, Vale's position had lost more than 75 per cent of its paper value. He kept buying.
        In 2022, it lost another 65 per cent. He kept buying. Each drawdown, he says, produced the
        same three phone calls: one from a friend telling him to sell, one from an accountant asking
        him to justify the allocation, and one from himself, at three in the morning, questioning
        everything.
      </p>
      <p>
        "The first two you can prepare for. The third one is the hard one. That's the one you have
        to design your life around."
      </p>

      <h3>Risk Management</h3>
      <p>
        Vale is unusually specific about his rules. He never allocates more than a defined,
        pre-agreed percentage of his liquid net worth to any single asset class. He does not use
        leverage. He does not custody anything he cannot afford to lose in full. He treats every
        position as if the exchange holding it could vanish overnight — because, several times in
        the last decade, exchanges have.
      </p>
      <p>
        "Risk management isn't a spreadsheet," he says. "It's a set of decisions you make when
        nothing is going wrong, so that you don't have to make them when everything is."
      </p>

      <TimelineBlock />

      <h2>The Portfolio Today</h2>
      <p>
        Today, Vale describes his portfolio in unfashionably boring terms. A majority sits in a
        diversified basket of global equities and short-duration fixed income. A single-digit
        percentage sits in digital assets, weighted heavily toward the two largest by market
        capitalisation. The rest is cash and property.
      </p>
      <p>
        "If someone tells you their portfolio is exciting," he says, "they're either lying or
        losing money. Usually both."
      </p>

      <MidCTA />

      <h2>Advice for a Younger Version of Himself</h2>
      <p>
        Asked what he would tell a 25-year-old version of himself, Vale pauses for a long time. He
        eventually answers with three sentences.
      </p>
      <p>
        "Own less. Hold longer. Read more history than news."
      </p>
      <p>
        It is, in a sense, the entire interview compressed into eight words. And it is the closest
        thing Vale offers to a philosophy — an approach built not on conviction about any single
        asset, but on a hard-won respect for time.
      </p>

      <div className="mt-12 border-t border-[color:var(--border)] pt-6 text-[0.82rem] text-[color:var(--ink-muted)] font-sans leading-relaxed">
        <p className="mb-2">
          <span className="font-semibold text-[color:var(--ink-soft)]">Editor's note:</span>{" "}
          Adrian Vale is a fictional composite created for this editorial feature. Quotes and
          biographical details are illustrative and do not represent any real individual.
        </p>
        <p>
          <span className="font-semibold text-[color:var(--ink-soft)]">Risk disclosure:</span>{" "}
          The content of this article is for information only and does not constitute financial
          advice. Digital assets are highly volatile and may result in the loss of your entire
          investment. Past performance is not a guide to future returns. Consult a qualified,
          independent adviser before making investment decisions.
        </p>
      </div>
    </article>
  );
}

function TimelineBlock() {
  const items = [
    { y: "2016", t: "First rules-based investment plan" },
    { y: "2017", t: "Initial position in Bitcoin" },
    { y: "2018", t: "First 75% drawdown; continues accumulation" },
    { y: "2021", t: "Second company sold; portfolio restructured" },
    { y: "2022", t: "Second major drawdown; risk framework formalised" },
    { y: "2025", t: "Portfolio rebalanced to long-duration allocation" },
  ];
  return (
    <aside className="not-prose my-10 border border-[color:var(--rule)] bg-white/60 p-6 lg:p-8">
      <div className="eyebrow mb-4">Timeline · A Decade in the Market</div>
      <ol className="space-y-3">
        {items.map((it) => (
          <li key={it.y} className="grid grid-cols-[70px_1fr] gap-4 items-baseline">
            <span className="font-serif text-xl font-bold text-[color:var(--accent)]">{it.y}</span>
            <span className="text-[0.98rem] text-[color:var(--ink-soft)] leading-snug">{it.t}</span>
          </li>
        ))}
      </ol>
    </aside>
  );
}

function MidCTA() {
  return (
    <aside className="not-prose my-12 border-y-2 border-[color:var(--ink)] py-10 text-center">
      <div className="eyebrow mb-3">Meridian Advisory</div>
      <h3 className="font-serif text-2xl lg:text-3xl font-bold text-[color:var(--ink)] mb-3">
        Considering a long-term position in digital assets?
      </h3>
      <p className="max-w-xl mx-auto text-[color:var(--ink-soft)] font-serif text-[1.05rem] leading-relaxed mb-6">
        Speak confidentially with an advisor about portfolio construction, custody, and risk
        frameworks appropriate for your circumstances.
      </p>
      <ExtLink className="inline-flex items-center gap-3 px-7 py-3.5 text-[0.82rem] font-semibold uppercase tracking-[0.16em] bg-[color:var(--ink)] text-[color:var(--paper)] hover:bg-[color:var(--accent)] transition-colors">
        Schedule an Investment Consultation
        <span aria-hidden>→</span>
      </ExtLink>
    </aside>
  );
}

function Sidebar() {
  const trending = [
    "Central banks and the quiet return of gold as a reserve asset",
    "Inside the new generation of European sovereign wealth funds",
    "Why the AI capital cycle looks like 1998 — and where it doesn't",
    "The case for boring: a defence of index investing in 2026",
    "How family offices are quietly rebuilding their allocations",
  ];
  const editors = [
    { c: "Markets", t: "The last dollar bull? A conversation with a former Fed economist" },
    { c: "Policy", t: "MiCA at two years: what changed, what didn't" },
    { c: "Feature", t: "The founder economy after the zero-rate era" },
  ];
  return (
    <aside className="space-y-10 lg:sticky lg:top-28 self-start">
      <div>
        <div className="rule pt-4">
          <div className="eyebrow mb-4">Most Read</div>
          <ol className="space-y-4">
            {trending.map((t, i) => (
              <li key={t} className="flex gap-4">
                <span className="font-serif text-2xl font-bold text-[color:var(--ink-muted)] leading-none w-6">
                  {i + 1}
                </span>
                <ExtLink className="font-serif text-[1.02rem] leading-snug text-[color:var(--ink)] hover:text-[color:var(--accent)] transition-colors">
                  {t}
                </ExtLink>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div>
        <div className="rule pt-4">
          <div className="eyebrow mb-4">Editor's Picks</div>
          <ul className="space-y-5">
            {editors.map((e) => (
              <li key={e.t}>
                <div className="text-[0.72rem] uppercase tracking-[0.14em] text-[color:var(--accent)] font-semibold mb-1">
                  {e.c}
                </div>
                <ExtLink className="font-serif text-[1.05rem] leading-snug text-[color:var(--ink)] hover:text-[color:var(--accent)] transition-colors block">
                  {e.t}
                </ExtLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border border-[color:var(--rule)] p-6 bg-white/60">
        <div className="eyebrow mb-3">Newsletter</div>
        <div className="font-serif text-lg font-semibold mb-2 leading-snug">
          The Meridian Brief, every Sunday morning.
        </div>
        <p className="text-[0.9rem] text-[color:var(--ink-soft)] mb-4 leading-relaxed">
          One long-form essay and five stories worth your week. No advertising.
        </p>
        <ExtLink className="inline-flex w-full items-center justify-center px-4 py-2.5 text-[0.78rem] font-semibold uppercase tracking-[0.14em] bg-[color:var(--ink)] text-[color:var(--paper)] hover:bg-[color:var(--accent)] transition-colors">
          Subscribe Free
        </ExtLink>
      </div>

      <div>
        <div className="rule pt-4">
          <div className="eyebrow mb-3">Market Snapshot</div>
          <ul className="text-[0.9rem] divide-y divide-[color:var(--border)]">
            {[
              ["Bitcoin", "$71,204", "▲ 1.18%"],
              ["Ethereum", "$3,842", "▲ 0.62%"],
              ["S&P 500", "5,614.2", "▲ 0.24%"],
              ["FTSE 100", "8,412.5", "▲ 0.42%"],
              ["Gold (oz)", "$2,481", "▼ 0.11%"],
              ["10Y Gilt", "4.02%", "▲ 2 bps"],
            ].map(([n, p, c]) => (
              <li key={n} className="flex items-baseline justify-between py-2">
                <span className="text-[color:var(--ink)] font-medium">{n}</span>
                <span className="font-mono text-[0.85rem] text-[color:var(--ink-soft)]">{p}</span>
                <span className="font-mono text-[0.78rem] text-[color:var(--accent)] w-16 text-right">
                  {c}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}

function RelatedArticles() {
  const cards = [
    {
      img: related1,
      cat: "Feature",
      title: "The quiet return of the value investor",
      desc: "After a decade in the wilderness, the discipline of buying cheap is back in fashion — and back in returns.",
    },
    {
      img: related2,
      cat: "Analysis",
      title: "Why institutions rebuilt their crypto desks — carefully",
      desc: "A survey of thirty asset managers reveals a new, more sober approach to digital-asset allocation.",
    },
    {
      img: related3,
      cat: "Long Read",
      title: "Notes on discipline: what long-term investors read",
      desc: "A tour of the books, journals and market histories that shape the world's most patient portfolios.",
    },
  ];
  return (
    <section className="mx-auto max-w-[1400px] px-6 lg:px-10 py-20 border-t border-[color:var(--rule)]">
      <div className="flex items-baseline justify-between mb-10">
        <h2 className="font-serif text-3xl lg:text-4xl font-bold">Related Stories</h2>
        <ExtLink className="hidden md:inline-block text-[0.78rem] uppercase tracking-[0.14em] font-semibold text-[color:var(--accent)] hover:opacity-70 transition-opacity">
          View all features →
        </ExtLink>
      </div>
      <div className="grid md:grid-cols-3 gap-10">
        {cards.map((c) => (
          <ExtLink key={c.title} className="group block">
            <div className="overflow-hidden mb-5">
              <img
                src={c.img}
                alt={c.title}
                loading="lazy"
                className="w-full aspect-[4/3] object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
              />
            </div>
            <div className="text-[0.72rem] uppercase tracking-[0.14em] text-[color:var(--accent)] font-semibold mb-2">
              {c.cat}
            </div>
            <h3 className="font-serif text-[1.5rem] leading-[1.15] font-bold text-[color:var(--ink)] mb-2 group-hover:text-[color:var(--accent)] transition-colors">
              {c.title}
            </h3>
            <p className="text-[0.95rem] text-[color:var(--ink-soft)] leading-relaxed">{c.desc}</p>
          </ExtLink>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { h: "Company", l: ["About", "Editorial Standards", "Careers", "Press"] },
    { h: "Sections", l: ["Markets", "Crypto", "Business", "Technology"] },
    { h: "Legal", l: ["Privacy", "Terms", "Cookies", "Risk Disclosure"] },
    { h: "Contact", l: ["Editorial Enquiries", "Advisory", "Newsletter", "Complaints"] },
  ];
  return (
    <footer className="border-t border-[color:var(--rule)] bg-[color:var(--paper)] mt-8">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-10">
          <div className="lg:col-span-2">
            <div className="font-serif text-2xl font-bold">
              Meridian<span className="text-[color:var(--accent)]">.</span>
            </div>
            <p className="mt-3 text-[0.9rem] text-[color:var(--ink-soft)] leading-relaxed max-w-xs">
              Independent reporting for long-term investors. Published in London since 2014.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <div className="eyebrow mb-4">{c.h}</div>
              <ul className="space-y-2 text-[0.9rem]">
                {c.l.map((l) => (
                  <li key={l}>
                    <ExtLink className="text-[color:var(--ink-soft)] hover:text-[color:var(--accent)] transition-colors">
                      {l}
                    </ExtLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-[color:var(--border)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[0.78rem] text-[color:var(--ink-muted)]">
          <p>© 2026 Meridian Capital Review Ltd. All rights reserved.</p>
          <p className="max-w-lg">
            Meridian is an editorial publication. Content does not constitute financial advice.
            Investments can go down as well as up.
          </p>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-[color:var(--paper)] text-[color:var(--ink)]">
      <ReadingProgress />
      <Header />
      <Hero />
      <Stats />
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16">
        <div className="grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-8 lg:col-start-1 max-w-[720px]">
            <Article />
          </div>
          <div className="lg:col-span-4">
            <Sidebar />
          </div>
        </div>
      </div>
      <RelatedArticles />
      <Footer />
    </div>
  );
}
