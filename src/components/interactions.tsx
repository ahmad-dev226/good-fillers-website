"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CircleHelp,
  Download,
  Eye,
  Plus,
  X,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import { formatPrice, menuCategories, menuProducts } from "@/lib/menu-data";
import { CartLineControls, Reveal, useCart } from "@/components/site-shell";

const menuArtwork = "/images/goodfillers-menu-artwork.jpg";

export function MenuBrowser() {
  const [category, setCategory] = useState<string>("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const { add } = useCart();
  const products = useMemo(
    () =>
      category === "All"
        ? menuProducts
        : menuProducts.filter((product) => product.category === category),
    [category],
  );

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <div className="menu-browser">
      <div className="menu-toolbar">
        <div className="category-tabs" aria-label="Filter menu by category">
          {["All", ...menuCategories].map((item) => (
            <button
              key={item}
              type="button"
              className={category === item ? "selected" : ""}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <span className="menu-count">
          {category === "All"
            ? "A few good things from the menu"
            : `${products.length} listed ${products.length === 1 ? "item" : "items"}`}
        </span>
      </div>

      {products.length > 0 ? (
        <motion.div layout className="product-grid">
          <AnimatePresence mode="popLayout">
            {products.map((product) => (
              <motion.article
                layout
                key={product.id}
                className="product-card"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.22 }}
              >
                <div className="product-card-top">
                  <span className="product-category">{product.category}</span>
                  <span className="product-spark">✦</span>
                </div>
                <h3>{product.name}</h3>
                {product.note && <p className="product-note">{product.note}</p>}
                <div className="product-card-bottom">
                  <strong>{formatPrice(product.price)}</strong>
                  <button
                    type="button"
                    className="add-to-order"
                    onClick={() => add(product.id)}
                    aria-label={`Add ${product.name} to order`}
                  >
                    <Plus size={18} />
                    <span>Add</span>
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="menu-not-listed">
          <CircleHelp size={25} />
          <div>
            <h3>There&apos;s more on the full menu.</h3>
            <p>
              We&apos;re showing prices only for items that are clearly readable
              on the supplied menu. Open the complete menu artwork or call us
              to check the rest.
            </p>
          </div>
          <button type="button" className="text-link" onClick={() => setMenuOpen(true)}>
            View full menu <ArrowUpRight size={17} />
          </button>
        </div>
      )}

      <div className="menu-image-callout">
        <div className="menu-image-copy">
          <span className="eyebrow">The original menu</span>
          <h2>SEE THE<br /><em>WHOLE</em> GOOD THING.</h2>
          <p>Every category, straight from the supplied Good Fillers menu.</p>
          <button type="button" className="button button-outline" onClick={() => setMenuOpen(true)}>
            <Eye size={17} /> View full menu
          </button>
          <a className="text-link menu-download" href={menuArtwork} download="good-fillers-menu.jpg">
            Download menu image <Download size={15} />
          </a>
        </div>
        <button
          className="menu-image-preview"
          type="button"
          aria-label="Open full menu image"
          onClick={() => setMenuOpen(true)}
        >
          <Image
            src={menuArtwork}
            alt="Good Fillers full menu artwork"
            width={590}
            height={825}
            sizes="(max-width: 760px) 90vw, 430px"
          />
          <span><Eye size={16} /> Tap to zoom</span>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="image-lightbox menu-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Good Fillers menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setMenuOpen(false);
            }}
          >
            <button
              type="button"
              className="lightbox-close"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <X />
            </button>
            <Image
              src={menuArtwork}
              alt="Complete Good Fillers menu artwork"
              width={590}
              height={825}
              sizes="95vw"
              className="menu-lightbox-image"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const galleryImages = [
  {
    src: "/images/goodfillers1.jpeg",
    alt: "Creamy Donnar pizza campaign",
    title: "Creamy Donnar",
    className: "gallery-tall",
  },
  {
    src: "/images/goodfillers2.jpeg",
    alt: "The Saucy Situation burger campaign",
    title: "The Saucy Situation",
    className: "gallery-wide",
  },
  {
    src: "/images/goodfillers3.jpeg",
    alt: "Dynamite Pizza campaign",
    title: "Dynamite Pizza",
    className: "",
  },
  {
    src: menuArtwork,
    alt: "Good Fillers restaurant menu artwork",
    title: "The Good Stuff",
    className: "gallery-menu",
  },
];

export function GalleryGrid() {
  const [active, setActive] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const selected = active === null ? null : galleryImages[active];

  useEffect(() => {
    if (active === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((index) => (index === null ? 0 : (index + 1) % galleryImages.length));
      if (event.key === "ArrowLeft") setActive((index) => (index === null ? 0 : (index - 1 + galleryImages.length) % galleryImages.length));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active]);

  return (
    <>
      <div className="gallery-grid">
        {galleryImages.map((image, index) => (
          <Reveal key={image.src} delay={index * 0.05} className={`gallery-tile ${image.className}`}>
            <button
              type="button"
              className="gallery-image-button"
              aria-label={`View ${image.title}`}
              onClick={() => setActive(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 680px) 100vw, (max-width: 1050px) 50vw, 33vw"
              />
              <span className="gallery-image-caption">
                <span>{image.title}</span><Eye size={17} />
              </span>
            </button>
          </Reveal>
        ))}
      </div>
      <AnimatePresence>
        {selected && active !== null && (
          <motion.div
            className="image-lightbox gallery-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${selected.title} image`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setActive(null);
            }}
          >
            <button
              type="button"
              className="lightbox-close"
              aria-label="Close gallery"
              onClick={() => setActive(null)}
            >
              <X />
            </button>
            <button
              type="button"
              className="lightbox-arrow lightbox-prev"
              aria-label="Previous image"
              onClick={() => setActive((active - 1 + galleryImages.length) % galleryImages.length)}
            >
              <ArrowLeft />
            </button>
            <motion.div
              className="gallery-lightbox-image"
              key={selected.src}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Image
                src={selected.src}
                alt={selected.alt}
                fill
                sizes="90vw"
                className="lightbox-photo"
              />
            </motion.div>
            <button
              type="button"
              className="lightbox-arrow lightbox-next"
              aria-label="Next image"
              onClick={() => setActive((active + 1) % galleryImages.length)}
            >
              <ArrowRight />
            </button>
            <p className="lightbox-title">{selected.title}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setSubmitted(true);
  }

  return (
    <div className="contact-form-wrap">
      {submitted ? (
        <div className="form-confirmation" role="status">
          <span className="confirmation-icon"><Check size={23} /></span>
          <span className="eyebrow">Message ready</span>
          <h3>Thanks for reaching out.</h3>
          <p>
            This website doesn&apos;t send messages to the restaurant yet. Please
            call us and we&apos;ll be happy to help.
          </p>
          <a className="button button-yellow" href="tel:+92523552222">Call 052-3552222</a>
          <button className="text-link form-reset" type="button" onClick={() => setSubmitted(false)}>
            Write another message
          </button>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <span className="eyebrow">Drop us a line</span>
          <h2>A LITTLE NOTE<br />GOES A LONG WAY.</h2>
          <label>
            Your name
            <input name="name" type="text" autoComplete="name" required maxLength={80} placeholder="What should we call you?" />
          </label>
          <label>
            Phone number
            <input name="phone" type="tel" autoComplete="tel" required minLength={7} maxLength={24} placeholder="Your best number" />
          </label>
          <label>
            Your message
            <textarea name="message" rows={4} required maxLength={1000} placeholder="Tell us what’s on your mind..." />
          </label>
          <button type="submit" className="button button-yellow form-submit">
            Prepare message <ArrowUpRight size={17} />
          </button>
          <p className="form-disclaimer">This form provides on-page feedback only; it does not send your message.</p>
        </form>
      )}
    </div>
  );
}

export function OrderExperience() {
  const { lines, subtotal, clear } = useCart();
  const [orderName, setOrderName] = useState("");
  const [orderPhone, setOrderPhone] = useState("");
  const [fulfilment, setFulfilment] = useState<"pickup" | "delivery">("pickup");
  const [draftReady, setDraftReady] = useState(false);
  const cartProducts = lines
    .map((line) => ({
      ...line,
      product: menuProducts.find((product) => product.id === line.id),
    }))
    .filter((line) => line.product);

  function prepareOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity() || cartProducts.length === 0) return;
    setDraftReady(true);
  }

  return (
    <div className="order-layout">
      <div className="order-main">
        <div className="order-section-heading">
          <span className="eyebrow">Your good stuff</span>
          <span className="order-step">01 <i /> YOUR BAG</span>
        </div>
        {cartProducts.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-mark"><span>GF</span><i>✦</i></div>
            <span className="eyebrow">Nothing in your bag. Yet.</span>
            <h2>GOOD CRAVINGS<br />START SOMEWHERE.</h2>
            <p>Have a look at the menu and add a little something.</p>
            <a href="/menu" className="button button-yellow">Explore menu <ArrowUpRight size={17} /></a>
          </div>
        ) : (
          <div className="cart-list">
            {cartProducts.map(({ id, quantity, product }) => (
              <article className="cart-row" key={id}>
                <div className="cart-product-stamp">{product?.category.slice(0, 1)}</div>
                <div className="cart-product-name">
                  <span className="product-category">{product?.category}</span>
                  <h3>{product?.name}</h3>
                </div>
                <CartLineControls id={id} quantity={quantity} />
                <strong className="cart-line-price">
                  {formatPrice((product?.price ?? 0) * quantity)}
                </strong>
              </article>
            ))}
            <button type="button" className="text-link clear-cart" onClick={clear}>Clear bag</button>
          </div>
        )}
      </div>

      <aside className="order-aside">
        <div className="order-section-heading">
          <span className="eyebrow">Almost there</span>
          <span className="order-step">02 <i /> YOUR DETAILS</span>
        </div>
        {draftReady ? (
          <div className="order-confirmation" role="status">
            <span className="confirmation-icon"><Check size={22} /></span>
            <span className="eyebrow">Order details saved here</span>
            <h3>ONE LAST STEP.</h3>
            <p>
              This website doesn&apos;t have live online ordering or a verified
              WhatsApp line. Call the restaurant to place this {fulfilment}
              order for {orderName}.
            </p>
            <div className="order-confirmation-total">
              <span>Order subtotal</span><strong>{formatPrice(subtotal)}</strong>
            </div>
            <a className="button button-yellow call-order" href="tel:+92523552222">
              Call 052-3552222 <ArrowUpRight size={17} />
            </a>
            <a className="call-secondary" href="tel:+92523554444">Or call 052-3554444</a>
            <button type="button" className="text-link form-reset" onClick={() => setDraftReady(false)}>
              Edit your details
            </button>
          </div>
        ) : (
          <form className="order-form" onSubmit={prepareOrder}>
            <label>
              Your name
              <input value={orderName} onChange={(event) => setOrderName(event.target.value)} required maxLength={80} autoComplete="name" placeholder="Name for the order" />
            </label>
            <label>
              Phone number
              <input value={orderPhone} onChange={(event) => setOrderPhone(event.target.value)} required minLength={7} maxLength={24} autoComplete="tel" type="tel" placeholder="A number we can reach you on" />
            </label>
            <fieldset className="fulfilment-options">
              <legend>How would you like it?</legend>
              <label className={fulfilment === "pickup" ? "chosen" : ""}>
                <input type="radio" name="fulfilment" value="pickup" checked={fulfilment === "pickup"} onChange={() => setFulfilment("pickup")} />
                <span>Pickup</span>
              </label>
              <label className={fulfilment === "delivery" ? "chosen" : ""}>
                <input type="radio" name="fulfilment" value="delivery" checked={fulfilment === "delivery"} onChange={() => setFulfilment("delivery")} />
                <span>Delivery</span>
              </label>
            </fieldset>
            <div className="order-subtotal">
              <span>Subtotal <small>taxes included in menu prices</small></span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <button type="submit" className="button button-yellow order-submit" disabled={cartProducts.length === 0}>
              Prepare order <ArrowUpRight size={17} />
            </button>
            <p className="order-note">
              {fulfilment === "delivery"
                ? "Delivery availability and any fee must be confirmed by phone."
                : "Confirm pickup details directly with the restaurant by phone."}
            </p>
            <p className="order-disclaimer">No live ordering or WhatsApp connection is available on this website.</p>
          </form>
        )}
      </aside>
    </div>
  );
}
