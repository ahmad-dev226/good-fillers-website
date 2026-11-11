import type { Metadata } from "next";
import { Camera, MoveDown } from "lucide-react";
import { GalleryGrid } from "@/components/interactions";

export const metadata: Metadata = {
  title: "Gallery | GOOD FILLERS",
  description: "A look at Good Fillers food and campaign artwork in Sialkot.",
};

export default function GalleryPage() {
  return (
    <>
      <section className="gallery-hero">
        <div className="gallery-hero-label"><Camera size={17} /><span>THE GOOD STUFF, UP CLOSE</span></div>
        <h1>A FEAST<br />FOR YOUR <em>EYES.</em></h1>
        <div className="gallery-hero-bottom">
          <p>A few favourites from the Good Fillers world. Go on — take a closer look.</p>
          <a href="#gallery-grid" aria-label="Scroll to gallery"><MoveDown size={18} /> SCROLL TO EXPLORE</a>
        </div>
        <span className="gallery-hero-number">01—04</span>
      </section>
      <section id="gallery-grid" className="gallery-section section-wrap">
        <div className="gallery-section-heading">
          <span className="eyebrow">Good things in the frame</span>
          <p>Tap any image to open it. Use the arrows or keyboard to browse.</p>
        </div>
        <GalleryGrid />
      </section>
    </>
  );
}
