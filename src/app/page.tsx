import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, MoveUpRight } from "lucide-react";
import { Reveal } from "@/components/site-shell";

const campaigns = [
  {
    image: "/images/goodfillers1.jpeg",
    alt: "Creamy Donnar campaign with a creamy pizza",
    title: "Creamy Donnar",
    label: "THE CHEESY ONE",
    className: "campaign-donnar",
  },
  {
    image: "/images/goodfillers2.jpeg",
    alt: "The Saucy Situation stacked burger campaign",
    title: "The Saucy Situation",
    label: "BRING ON THE SAUCE",
    className: "campaign-saucy",
  },
  {
    image: "/images/goodfillers3.jpeg",
    alt: "Dynamite Pizza campaign",
    title: "Dynamite Pizza",
    label: "A LITTLE EXTRA HEAT",
    className: "campaign-dynamite",
  },
];

const categories = [
  "Burgers",
  "Pizzas",
  "Wraps",
  "Wings",
  "Sandwiches",
  "Fries",
  "Pasta",
  "Drinks",
];

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="hero-visual">
          <picture className="hero-picture">
            <source
              media="(max-width: 760px)"
              srcSet="/images/goodfillers-burger-mobile.jpg"
            />
            <Image
              src="/images/goodfillers-burger-hero.jpg"
              alt="Good Fillers signature burger"
              fill
              priority
              sizes="(max-width: 760px) 100vw, 72vw"
              className="hero-food-image"
            />
          </picture>
          <div className="hero-image-shade" />
          <span className="hero-orbit orbit-one" />
          <span className="hero-orbit orbit-two" />
          <div className="hero-side-note">SIALKOT · MADE FOR CRAVINGS</div>
          <div className="hero-sticker"><span>THE<br />GOOD<br />STUFF</span><i>✦</i></div>
        </div>
        <div className="hero-content">
          <span className="eyebrow hero-eyebrow"><i /> FILLED WITH GOODNESS</span>
          <h1>CRAVINGS?<br /><em>WE&apos;VE GOT</em><br />YOU.</h1>
          <p>Big flavours, no half measures. Find the bite that feels like your kind of good.</p>
          <div className="hero-actions">
            <Link href="/menu" className="button button-yellow">Explore the menu <ArrowUpRight size={17} /></Link>
            <Link href="/order" className="button button-quiet">Order your cravings <MoveUpRight size={16} /></Link>
          </div>
          <div className="hero-footnote"><span>01 — 05</span><span>GOOD FOOD. GOOD MOOD.</span></div>
        </div>
        <a className="scroll-cue" href="#the-good-stuff" aria-label="Scroll to discover">
          <span>SCROLL TO FEEL GOOD</span><ArrowDown size={16} />
        </a>
        <span className="hero-outline-type" aria-hidden="true">GOOD</span>
      </section>

      <section id="the-good-stuff" className="intro-section section-wrap">
        <Reveal className="intro-kicker">
          <span className="eyebrow">Good to meet you</span>
          <span className="section-index">01 / THE FEELING</span>
        </Reveal>
        <Reveal className="intro-copy">
          <h2>NOT JUST FOOD.<br />IT&apos;S A <em>GOOD FILLERS</em><br />MOMENT.</h2>
          <div className="intro-aside">
            <span className="yellow-star">✳</span>
            <p>Big flavours, delicious combinations and goodness in every bite. Discover the food that makes every craving worth it.</p>
            <Link href="/story" className="text-link">Get to know us <ArrowUpRight size={16} /></Link>
          </div>
        </Reveal>
        <div className="intro-marquee" aria-label="Filled with goodness">
          <div className="marquee-track"><span>FILLED WITH GOODNESS <i>✦</i> GOOD FOOD, GOOD MOOD <i>✦</i> SIALKOT, PAKISTAN <i>✦</i> </span><span aria-hidden="true">FILLED WITH GOODNESS <i>✦</i> GOOD FOOD, GOOD MOOD <i>✦</i> SIALKOT, PAKISTAN <i>✦</i> </span></div>
        </div>
      </section>

      <section className="campaign-section section-wrap">
        <div className="section-heading">
          <Reveal>
            <span className="eyebrow">Say hello to your next favourite</span>
            <h2>THE <em>LINE-UP.</em></h2>
          </Reveal>
          <Reveal>
            <Link href="/menu" className="text-link">See the full menu <ArrowUpRight size={16} /></Link>
          </Reveal>
        </div>
        <div className="campaign-grid">
          {campaigns.map((campaign, index) => (
            <Reveal className={`campaign-card ${campaign.className}`} delay={index * 0.1} key={campaign.title}>
              <Link href="/menu" aria-label={`Explore menu featuring ${campaign.title}`}>
                <div className="campaign-image">
                  <Image src={campaign.image} alt={campaign.alt} fill sizes="(max-width: 760px) 90vw, 33vw" />
                  <span className="campaign-open"><ArrowUpRight size={21} /></span>
                  <span className="campaign-index">0{index + 1}</span>
                </div>
                <div className="campaign-caption"><div><span className="eyebrow">{campaign.label}</span><h3>{campaign.title}</h3></div><MoveUpRight size={18} /></div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="category-section">
        <div className="section-wrap category-inner">
          <Reveal className="category-heading">
            <span className="eyebrow">The menu is calling</span>
            <h2>WHAT&apos;S YOUR<br /><em>GOOD THING?</em></h2>
            <p>A little something for every kind of craving.</p>
          </Reveal>
          <div className="category-grid">
            {categories.map((category, index) => (
              <Reveal key={category} delay={index * 0.035}>
                <Link href="/menu#menu-items" className="category-card">
                  <span className="category-number">{String(index + 1).padStart(2, "0")}</span>
                  <span>{category}</span>
                  <ArrowUpRight size={17} />
                </Link>
              </Reveal>
            ))}
          </div>
          <Link href="/menu" className="button button-outline category-button">Explore the full menu <ArrowUpRight size={16} /></Link>
        </div>
      </section>

      <section className="goodness-section section-wrap">
        <div className="goodness-graphic" aria-hidden="true">
          <span className="goodness-ring ring-large" />
          <span className="goodness-ring ring-small" />
          <span className="goodness-cross cross-a">✳</span>
          <span className="goodness-cross cross-b">✦</span>
          <span className="goodness-sticker">GOOD<br />MOOD<br /><i>ONLY</i></span>
        </div>
        <Reveal className="goodness-copy">
          <span className="eyebrow">A little more good</span>
          <h2>MADE FOR<br /><em>YOUR</em> MOMENTS.</h2>
          <p>Something to share. Something to keep all to yourself. Whatever your good moment looks like, there&apos;s room for it here.</p>
          <Link href="/story" className="text-link">A bit about us <ArrowUpRight size={16} /></Link>
        </Reveal>
        <div className="goodness-values">
          {["Filled with goodness", "Big flavours", "Made for cravings", "Every bite worth it"].map((item, index) => (
            <Reveal key={item} delay={index * 0.06}>
              <span>0{index + 1}</span><strong>{item}</strong><i>✦</i>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="home-gallery section-wrap">
        <div className="section-heading">
          <Reveal>
            <span className="eyebrow">A feast for your eyes, too</span>
            <h2>GOOD LOOKS.<br /><em>GREAT BITES.</em></h2>
          </Reveal>
          <Reveal>
            <Link href="/gallery" className="text-link">Take a look around <ArrowUpRight size={16} /></Link>
          </Reveal>
        </div>
        <div className="home-gallery-grid">
          {campaigns.map((campaign, index) => (
            <Reveal key={campaign.image} delay={index * 0.08} className={index === 1 ? "home-gallery-feature" : ""}>
              <Link href="/gallery" className="home-gallery-photo">
                <Image src={campaign.image} alt={campaign.alt} fill sizes="(max-width: 760px) 92vw, 38vw" />
                <span>{campaign.title} <ArrowUpRight size={17} /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <div className="final-cta-line" aria-hidden="true"><span /><i>✦</i><span /></div>
        <Reveal>
          <span className="eyebrow">There&apos;s always room for one more</span>
          <h2>YOUR NEXT FAVOURITE<br /><em>BITE IS WAITING.</em></h2>
          <div className="final-cta-actions">
            <Link href="/menu" className="button button-yellow">Explore menu <ArrowUpRight size={17} /></Link>
            <Link href="/order" className="button button-quiet">Order now <MoveUpRight size={16} /></Link>
          </div>
        </Reveal>
        <span className="final-cta-star star-a">✳</span>
        <span className="final-cta-star star-b">✦</span>
      </section>
    </>
  );
}
