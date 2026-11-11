import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { MenuBrowser } from "@/components/interactions";

export const metadata: Metadata = {
  title: "The Menu | GOOD FILLERS",
  description: "Explore the Good Fillers menu in Sialkot: burgers, pizza, wraps and more.",
};

export default function MenuPage() {
  return (
    <>
      <section className="inner-hero menu-hero">
        <div className="inner-hero-content">
          <span className="eyebrow"><i /> THE GOOD FILLERS MENU</span>
          <h1>THE GOOD<br /><em>STUFF.</em></h1>
          <p>Explore your next craving.</p>
          <a className="inner-hero-scroll" href="#menu-items"><ArrowDown size={16} /> TAKE A LOOK</a>
        </div>
        <div className="menu-hero-poster">
          <div className="poster-shadow" />
          <Image
            src="/images/goodfillers-menu-artwork.jpg"
            alt="The original Good Fillers menu artwork"
            width={590}
            height={825}
            priority
          />
          <span className="poster-stamp">FULL<br />OF<br />GOOD</span>
        </div>
        <span className="page-side-label">A LITTLE SOMETHING FOR EVERY CRAVING</span>
      </section>
      <section id="menu-items" className="menu-content section-wrap">
        <div className="menu-intro">
          <div>
            <span className="eyebrow">Take your pick</span>
            <h2>FIND YOUR<br /><em>FILL.</em></h2>
          </div>
          <p>Pick a category, add a favourite to your bag, and make it a good one. Menu names and prices shown here are taken from the supplied menu artwork.</p>
        </div>
        <MenuBrowser />
        <div className="menu-order-nudge">
          <span className="eyebrow">Found your thing?</span>
          <p>Make a little list, then call to place your order.</p>
          <Link className="button button-yellow" href="/order">Go to your bag <ArrowUpRight size={17} /></Link>
        </div>
      </section>
    </>
  );
}
