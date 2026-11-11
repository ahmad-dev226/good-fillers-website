import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { OrderExperience } from "@/components/interactions";

export const metadata: Metadata = {
  title: "Your Order | GOOD FILLERS",
  description: "Build your Good Fillers order and call the restaurant to confirm it.",
};

export default function OrderPage() {
  return (
    <>
      <section className="order-hero">
        <span className="eyebrow"><i /> A GOOD THING IS CLOSE</span>
        <h1>YOUR<br /><em>GOOD STUFF.</em></h1>
        <Link href="/menu" className="text-link">Need a little inspiration? Browse the menu <ArrowUpRight size={16} /></Link>
      </section>
      <section className="order-content section-wrap">
        <OrderExperience />
      </section>
    </>
  );
}
