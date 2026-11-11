import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Camera, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/interactions";

export const metadata: Metadata = {
  title: "Contact | GOOD FILLERS",
  description: "Find and contact Good Fillers on Shahabpura Road in Sialkot, Pakistan.",
};

export default function ContactPage() {
  return (
    <>
      <section className="contact-hero">
        <div className="contact-hero-copy">
          <span className="eyebrow"><i /> SAY HELLO</span>
          <h1>LET&apos;S GET YOU<br /><em>SOMETHING GOOD.</em></h1>
          <p>Questions, cravings, or just passing by? We&apos;re right here in Sialkot.</p>
        </div>
        <div className="contact-hero-mark" aria-hidden="true"><span>GF</span><i>✳</i></div>
        <span className="contact-hero-footer">GOOD FILLERS · FILLED WITH GOODNESS</span>
      </section>
      <section className="contact-body section-wrap">
        <div className="contact-details">
          <div className="contact-details-heading">
            <span className="eyebrow">Find your way to us</span>
            <h2>COME ON<br /><em>OVER.</em></h2>
          </div>
          <div className="contact-info-card">
            <span className="contact-info-icon"><MapPin size={19} /></span>
            <div><span className="eyebrow">Find us</span><p>Good Fillers<br />Shahabpura Road, near Meezan Bank<br />Sialkot, Pakistan</p></div>
            <a href="https://maps.google.com/?q=Good+Fillers+Shahabpura+Road+near+Meezan+Bank+Sialkot" target="_blank" rel="noreferrer" aria-label="Get directions to Good Fillers"><ArrowUpRight size={18} /></a>
          </div>
          <div className="contact-info-card">
            <span className="contact-info-icon"><Phone size={19} /></span>
            <div><span className="eyebrow">Give us a ring</span><a href="tel:+92523552222">052-3552222</a><a href="tel:+92523554444">052-3554444</a></div>
            <ArrowUpRight size={18} />
          </div>
          <a className="contact-social-card" href="https://www.instagram.com/goodfillerspk/" target="_blank" rel="noreferrer">
            <Camera size={20} /><span><span className="eyebrow">See what&apos;s good</span><strong>Follow along on Instagram</strong></span><ArrowUpRight size={18} />
          </a>
          <div className="contact-hours-note">
            <span className="contact-note-mark">!</span>
            <p>Give us a call to check today&apos;s opening hours and delivery availability.</p>
          </div>
          <Link href="/order" className="contact-order-link">Already know what you want? <span>Start an order <ArrowUpRight size={16} /></span></Link>
        </div>
        <ContactForm />
      </section>
      <section className="contact-map-strip">
        <div><span className="eyebrow">Shahabpura Road, Sialkot</span><p>Good Fillers<br />Near Meezan Bank</p></div>
        <a href="https://maps.google.com/?q=Good+Fillers+Shahabpura+Road+near+Meezan+Bank+Sialkot" target="_blank" rel="noreferrer" className="button button-yellow">Get directions <ArrowUpRight size={17} /></a>
        <span className="map-coordinate" aria-hidden="true">32°30&apos;N — SIALKOT</span>
      </section>
    </>
  );
}
