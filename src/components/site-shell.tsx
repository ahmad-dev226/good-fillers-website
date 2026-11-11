"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Camera,
  Menu as MenuIcon,
  Minus,
  Plus,
  ShoppingBag,
  X,
} from "lucide-react";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { menuProducts } from "@/lib/menu-data";

type CartLine = { id: string; quantity: number };
type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const emptyCart: CartLine[] = [];
let cartSnapshot: CartLine[] | null = null;
const cartSubscribers = new Set<() => void>();
const navItems = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Our story", href: "/story" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];
const phone = "tel:+92523552222";

function subscribeToCart(callback: () => void) {
  cartSubscribers.add(callback);
  return () => cartSubscribers.delete(callback);
}

function getServerCartSnapshot() {
  return emptyCart;
}

function getCartSnapshot() {
  if (cartSnapshot) return cartSnapshot;
  if (typeof window === "undefined") return emptyCart;

  try {
    const saved = window.localStorage.getItem("good-fillers-cart");
    const parsed: unknown = saved ? JSON.parse(saved) : [];
    cartSnapshot = Array.isArray(parsed)
      ? parsed.filter(
          (line): line is CartLine =>
            typeof line?.id === "string" &&
            Number.isSafeInteger(line?.quantity) &&
            line.quantity > 0 &&
            line.quantity <= 99 &&
            menuProducts.some((product) => product.id === line.id),
        )
      : emptyCart;
  } catch (error) {
    console.error("Could not restore the saved cart.", error);
    cartSnapshot = emptyCart;
  }
  return cartSnapshot;
}

function updateCart(next: CartLine[]) {
  cartSnapshot = next;
  try {
    window.localStorage.setItem("good-fillers-cart", JSON.stringify(next));
  } catch (error) {
    console.error("Could not save the cart.", error);
  }
  cartSubscribers.forEach((callback) => callback());
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside SiteShell");
  return context;
}

function CartProvider({ children }: { children: ReactNode }) {
  const lines = useSyncExternalStore(
    subscribeToCart,
    getCartSnapshot,
    getServerCartSnapshot,
  );

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((sum, line) => sum + line.quantity, 0);
    const subtotal = lines.reduce((sum, line) => {
      const product = menuProducts.find((item) => item.id === line.id);
      return sum + (product?.price ?? 0) * line.quantity;
    }, 0);
    return {
      lines,
      count,
      subtotal,
      add(id) {
        if (!menuProducts.some((product) => product.id === id)) return;
        const current = getCartSnapshot();
        const existing = current.find((line) => line.id === id);
        updateCart(
          existing
            ? current.map((line) =>
                line.id === id
                  ? { ...line, quantity: Math.min(line.quantity + 1, 99) }
                  : line,
              )
            : [...current, { id, quantity: 1 }],
        );
      },
      setQuantity(id, quantity) {
        const current = getCartSnapshot();
        updateCart(
          quantity <= 0
            ? current.filter((line) => line.id !== id)
            : current.map((line) =>
                line.id === id
                  ? { ...line, quantity: Math.min(quantity, 99) }
                  : line,
              ),
        );
      },
      clear() {
        updateCart([]);
      },
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function BurgerIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 90"
      fill="none"
      aria-hidden="true"
    >
      <path d="M12 48C12 28 31 12 60 12s48 16 48 36H12Z" fill="#F4B64D" />
      <path d="M25 35c3-10 15-17 35-17s32 7 35 17" stroke="#FFD98B" strokeWidth="5" strokeLinecap="round" />
      <g fill="#FFF1C8">
        <ellipse cx="39" cy="28" rx="2.8" ry="1.5" transform="rotate(-25 39 28)" />
        <ellipse cx="58" cy="23" rx="2.8" ry="1.5" transform="rotate(18 58 23)" />
        <ellipse cx="76" cy="28" rx="2.8" ry="1.5" transform="rotate(-18 76 28)" />
      </g>
      <path d="M13 48h94l-8 9H21l-8-9Z" fill="#8BCB55" />
      <path d="M18 56c10-7 18 7 29 0s18 7 29 0 18 7 28 0" stroke="#F0D15A" strokeWidth="7" strokeLinecap="round" />
      <path d="M15 64h90c-3 10-13 13-27 13H42c-14 0-24-3-27-13Z" fill="#9B4A27" />
      <path d="M12 72c8 7 20 9 48 9s40-2 48-9" stroke="#6E351E" strokeWidth="4" strokeLinecap="round" />
      <path d="M9 59c3 15 13 22 23 25" stroke="#F7CA78" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function FriesIllustration({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 70 90" fill="none" aria-hidden="true">
      <path d="m18 27 6-21 8 2-2 20m5-2 1-20 8 1 1 20m4 0 7-17 7 3-6 18" fill="#FFD526" stroke="#E4A928" strokeWidth="3" strokeLinejoin="round" />
      <path d="m13 27 46 1-6 53c-1 6-33 6-34 0l-6-54Z" fill="#17499A" stroke="#4383DA" strokeWidth="3" />
      <path d="M19 38h34" stroke="#FFD526" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function PizzaIllustration({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 90" fill="none" aria-hidden="true">
      <path d="M10 15c33-15 60-10 81 5L48 78 10 15Z" fill="#FFD526" />
      <path d="m10 15 38 63" stroke="#F5B640" strokeWidth="10" strokeLinecap="round" />
      <path d="m17 18 63 3" stroke="#FFF1C8" strokeWidth="5" strokeLinecap="round" />
      <g fill="#D94E37">
        <circle cx="35" cy="27" r="4" /><circle cx="52" cy="34" r="4" /><circle cx="44" cy="49" r="4" />
      </g>
    </svg>
  );
}

export function FloatingFoodEffects() {
  const reduceMotion = useReducedMotion();
  const pieces = [
    { type: "burger", className: "float-food float-food-one", size: "food-large" },
    { type: "fries", className: "float-food float-food-two", size: "food-small" },
    { type: "burger", className: "float-food float-food-three", size: "food-small" },
    { type: "pizza", className: "float-food float-food-four", size: "food-medium" },
    { type: "burger", className: "float-food float-food-five", size: "food-medium" },
  ];
  return (
    <div className={`floating-food${reduceMotion ? " is-still" : ""}`} aria-hidden="true">
      {pieces.map((piece) => {
        const Illustration =
          piece.type === "fries"
            ? FriesIllustration
            : piece.type === "pizza"
              ? PizzaIllustration
              : BurgerIllustration;
        return (
          <Illustration
            key={piece.className}
            className={`${piece.className} ${piece.size}`}
          />
        );
      })}
      <span className="food-spark spark-one">✦</span>
      <span className="food-spark spark-two">✦</span>
    </div>
  );
}

function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="nav-inner">
        <Link className="brand-lockup" href="/" aria-label="Good Fillers home" onClick={() => setMenuOpen(false)}>
          <Image
            src="/images/goodfillers-logo.png"
            alt=""
            width={66}
            height={62}
          />
          <span className="brand-name">GOOD<br />FILLERS</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? "active" : ""}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <Link className="cart-link" href="/order" aria-label={`Order cart, ${count} items`} onClick={() => setMenuOpen(false)}>
            <ShoppingBag size={18} />
            <span className="cart-count">{count}</span>
          </Link>
          <Link className="button button-yellow nav-order" href="/order" onClick={() => setMenuOpen(false)}>
            Order now <ArrowUpRight size={16} />
          </Link>
          <button
            className="mobile-menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={25} /> : <MenuIcon size={25} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.04 }}
              >
                <Link
                  href={item.href}
                  className={pathname === item.href ? "active" : ""}
                  aria-current={pathname === item.href ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <Link className="button button-yellow mobile-order" href="/order" onClick={() => setMenuOpen(false)}>
              <ShoppingBag size={18} /> Order now
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Image
            src="/images/goodfillers-logo.png"
            alt="Good Fillers — filled with goodness"
            width={86}
            height={80}
          />
          <p>Big flavours.<br />Good moments.</p>
        </div>
        <div className="footer-links">
          <span className="eyebrow">Take a look</span>
          {navItems.slice(1).map((item) => (
            <Link href={item.href} key={item.href}>{item.label}</Link>
          ))}
        </div>
        <div className="footer-links">
          <span className="eyebrow">Come hungry</span>
          <a href={phone}>052-3552222</a>
          <a href="tel:+92523554444">052-3554444</a>
          <a
            href="https://maps.google.com/?q=Good+Fillers+Shahabpura+Road+Sialkot"
            target="_blank"
            rel="noreferrer"
          >
            Shahabpura Road, Sialkot <ArrowUpRight size={14} />
          </a>
          <a
            className="footer-social"
            href="https://www.instagram.com/goodfillerspk/"
            target="_blank"
            rel="noreferrer"
          >
            <Camera size={16} /> Instagram
          </a>
        </div>
        <div className="footer-cta">
          <span className="eyebrow">Made for your cravings</span>
          <h3>LET&apos;S GET<br />SOMETHING GOOD.</h3>
          <Link href="/order" className="text-link">Start an order <ArrowUpRight size={16} /></Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© Good Fillers. All good things reserved.</span>
        <span>FILLED WITH GOODNESS <i>✦</i> SIALKOT, PAKISTAN</span>
      </div>
    </footer>
  );
}

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <Navbar />
      <FloatingFoodEffects />
      <main className="site-main">{children}</main>
      <Footer />
    </CartProvider>
  );
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.62, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function CartLineControls({ id, quantity }: { id: string; quantity: number }) {
  const { setQuantity } = useCart();
  return (
    <div className="quantity-controls" aria-label="Change quantity">
      <button
        type="button"
        aria-label="Remove one"
        onClick={() => setQuantity(id, quantity - 1)}
      >
        <Minus size={14} />
      </button>
      <span aria-live="polite">{quantity}</span>
      <button
        type="button"
        aria-label="Add one"
        onClick={() => setQuantity(id, quantity + 1)}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
