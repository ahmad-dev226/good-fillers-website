import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { Reveal } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Our Story | GOOD FILLERS",
  description: "Get to know Good Fillers: good food, good mood, and filled with goodness in Sialkot.",
};

export default function StoryPage() {
  return (
    <>
      <section className="story-hero">
        <div className="story-hero-top">
          <span className="eyebrow"><i /> OUR KIND OF GOOD</span>
          <span className="section-index">GOOD FILLERS · SIALKOT</span>
        </div>
        <h1>GOOD FOOD.<br /><em>GOOD MOOD.</em><br />GOOD FILLERS.</h1>
        <div className="story-hero-bottom">
          <p>Good food has a way of turning an ordinary moment into a good one. That&apos;s what we&apos;re here for.</p>
          <span className="story-hero-star">✳</span>
          <span className="story-hero-side">FILLED WITH GOODNESS — ALWAYS</span>
        </div>
      </section>

      <section className="story-intro section-wrap">
        <Reveal className="story-intro-image">
          <Image
            src="/images/goodfillers2.jpeg"
            alt="Good Fillers burger campaign — The Saucy Situation"
            fill
            sizes="(max-width: 760px) 100vw, 48vw"
          />
          <span className="story-image-tag">GOODNESS, IN EVERY FRAME <i>✦</i></span>
        </Reveal>
        <Reveal className="story-intro-copy">
          <span className="eyebrow">A good thing, simply put</span>
          <h2>WE BELIEVE IN<br />THE <em>GOOD</em><br />IN EVERY BITE.</h2>
          <p>
            At Good Fillers, it&apos;s about the food you look forward to and the
            moments you make around it. Familiar favourites, bold cravings and
            plenty of reasons to bring everyone to the table.
          </p>
          <Link href="/menu" className="text-link">See what&apos;s on the menu <ArrowUpRight size={16} /></Link>
        </Reveal>
      </section>

      <section className="story-manifesto">
        <span className="manifesto-asterisk" aria-hidden="true">✳</span>
        <Reveal>
          <span className="eyebrow">The whole idea</span>
          <h2>FILLED WITH<br /><em>GOODNESS.</em></h2>
          <p>Not a complicated story. Just good food, a good mood, and a place for your next favourite bite.</p>
        </Reveal>
        <span className="manifesto-stamp">GOOD<br />THINGS<br /><i>HERE</i></span>
      </section>

      <section className="story-values section-wrap">
        <div className="story-values-heading">
          <span className="eyebrow">A few things we stand for</span>
          <h2>IT&apos;S THE<br /><em>LITTLE THINGS.</em></h2>
        </div>
        <div className="story-value-list">
          {[
            ["01", "Big flavour", "A menu full of combinations made to catch your eye and keep your cravings curious."],
            ["02", "Good company", "Bring your people, find your favourite, and make a little room for a good moment."],
            ["03", "Sialkot, with love", "We’re proud to call Shahabpura Road home. Come by and say hello."],
          ].map(([number, title, copy], index) => (
            <Reveal key={number} delay={index * 0.06} className="story-value">
              <span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div><MoveUpRight size={18} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="story-photo-strip">
        <Image src="/images/goodfillers3.jpeg" alt="Dynamite Pizza, one of the Good Fillers favourites" fill sizes="100vw" />
        <div className="story-photo-overlay"><span className="eyebrow">A little more good</span><p>MADE FOR<br /><em>YOUR MOMENT.</em></p></div>
      </section>
      <section className="story-end">
        <span className="eyebrow">Now you know us a little</span>
        <h2>LET&apos;S FIND<br /><em>YOUR FAVOURITE.</em></h2>
        <Link href="/menu" className="button button-yellow">Take a look at the menu <ArrowUpRight size={17} /></Link>
      </section>
    </>
  );
}
