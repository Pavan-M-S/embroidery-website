import { type FormEvent, type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { ArrowDown, ArrowRight, ArrowUp, Bookmark, Check, ChevronDown, CircleHelp, Eye, EyeOff, Facebook, Flower2, Heart, Instagram, Menu, Moon, Plus, Search, Send, Sun, X } from 'lucide-react';
import { designs, FAQ_DATA as faqs, PRICING_TIERS as priceExamples } from './data';
import { InteractiveBackground } from './InteractiveBackground';
import { CustomCursor } from './components/CustomCursor';
import { GeminiCraftAdvisorModal } from './components/GeminiCraftAdvisorModal';
import { FloatingAIButton } from './components/FloatingAIButton';
import { TrackOrderPage } from './pages/TrackOrderPage';

const queryClient = new QueryClient();
const routes = [
  ['/', 'Home'], ['/designs', 'Designs'], ['/pricing', 'Pricing'], ['/custom-design', 'Custom work'],
  ['/membership', 'Membership'], ['/resources', 'Resources'], ['/track-order', 'Track Order'], ['/account', 'Account'], ['/contact', 'Contact']
];
const pageMeta: Record<string, [string, string]> = {
  '/': ['Spandana Embroidery | Quality embroidery at affordable prices', 'A welcoming home-owned embroidery studio for Indian-style details on women’s and children’s clothing.'],
  '/designs': ['Designs | Spandana Embroidery', 'Explore illustrative placeholder embroidery motifs and save favourites.'],
  '/pricing': ['Pricing | Spandana Embroidery', 'Illustrative embroidery price examples and a no-obligation quote basket demo.'],
  '/custom-design': ['Custom design | Spandana Embroidery', 'Share a custom embroidery brief in a local-only inquiry demo.'],
  '/membership': ['Membership | Spandana Embroidery', 'A local-only illustrative studio membership sign-up demo.'],
  '/resources': ['Resources | Spandana Embroidery', 'Practical notes for choosing, caring for, and planning embroidery.'],
  '/account': ['Account | Spandana Embroidery', 'Try local-only demo sign-in and registration states.'],
  '/contact': ['Contact | Spandana Embroidery', 'A local-only demo message form. Contact details are intentionally not invented.']
};

function readList(key: string): string[] {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) as string[] : []; } catch { return []; }
}
function useStoredList(key: string) {
  const [value, setValue] = useState<string[]>(() => typeof window === 'undefined' ? [] : readList(key));
  useEffect(() => { localStorage.setItem(key, JSON.stringify(value)); }, [key, value]);
  return [value, setValue] as const;
}

function ImageTile({ item, className = '' }: { item: typeof designs[number]; className?: string }) {
  const [failed, setFailed] = useState(false);
  return <div className={`image-tile ${className}`}>{!failed && <img src={item.image} alt={item.alt} onError={() => setFailed(true)} />}
    {failed && <div className="image-fallback" aria-label={item.alt}><span>Thread study</span><small>Illustrative placeholder</small></div>}
    <span className="placeholder-stamp">Illustrative image</span>
  </div>;
}

function App() {
  const [path, navigate] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [panel, setPanel] = useState<'saved' | 'quote' | null>(null);
  const [focusPortfolioSearch, setFocusPortfolioSearch] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);
  const [favorites, setFavorites] = useStoredList('spandana:favourites');
  const [quotes, setQuotes] = useStoredList('spandana:quote-basket');
  const [advisorOpen, setAdvisorOpen] = useState(false);
  const [advisorTopic, setAdvisorTopic] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try { return localStorage.getItem('spandana:theme') === 'dark' ? 'dark' : 'light'; } catch { return 'light'; }
  });
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
    try { localStorage.setItem('spandana:theme', theme); } catch { /* local-only preference */ }
  }, [theme]);
  useEffect(() => {
    const [title, description] = pageMeta[path] ?? ['Page not found | Spandana Embroidery', 'The requested page was not found.'];
    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.setAttribute('name', 'description'); document.head.appendChild(meta); }
    meta.setAttribute('content', description);
    const shareTags: Record<string, string> = {
      'og:title': title,
      'og:description': description,
      'og:type': 'website',
      'og:site_name': 'Spandana Embroidery',
      'twitter:card': 'summary',
      'twitter:title': title,
      'twitter:description': description,
    };
    for (const [key, content] of Object.entries(shareTags)) {
      const attribute = key.startsWith('twitter:') ? 'name' : 'property';
      let shareMeta = document.head.querySelector(`meta[${attribute}="${key}"]`);
      if (!shareMeta) {
        shareMeta = document.createElement('meta');
        shareMeta.setAttribute(attribute, key);
        document.head.appendChild(shareMeta);
      }
      shareMeta.setAttribute('content', content);
    }
    setMenuOpen(false); setPanel(null);
    setFocusPortfolioSearch(false);
  }, [path]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); setPanel(null); }
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); };
  }, []);
  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 240);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const toggleFavorite = (id: string) => setFavorites((old) => old.includes(id) ? old.filter((item) => item !== id) : [...old, id]);
  const addQuote = (id: string) => setQuotes((old) => old.includes(id) ? old : [...old, id]);
  const savedDesigns = designs.filter((d) => favorites.includes(d.id));
  const quotedDesigns = designs.filter((d) => quotes.includes(d.id));
  const dismissPanel = () => setPanel(null);
  return <div className="site-shell">
    <InteractiveBackground theme={theme} />
    <a href="#main" className="skip-link">Skip to content</a>
    <header className="site-header">
      <Link href="/" className="brand-lockup" aria-label="Spandana Embroidery home"><span className="brand-mark">S<Flower2 size={13} aria-hidden="true" /></span><span><strong>Spandana</strong><small>EMBROIDERY STUDIO</small></span></Link>
      <p className="header-tagline">Quality embroidery at affordable prices.</p>
      <div className="header-actions">
        <button className="icon-button" onClick={() => { if (path === '/designs') document.getElementById('design-search')?.focus(); else { setFocusPortfolioSearch(true); navigate('/designs'); } }} aria-label="Search design ideas" data-testid="button-open-search"><Search size={18} /></button>
        <button className="icon-button" onClick={() => setPanel('saved')} aria-label={`Open saved favourites, ${favorites.length} saved`} data-testid="button-open-favourites"><Heart size={18} /><span className="count">{favorites.length}</span></button>
        <button className="icon-button" onClick={() => setPanel('quote')} aria-label={`Open quote basket, ${quotes.length} items`} data-testid="button-open-quote"><Bookmark size={18} /><span className="count">{quotes.length}</span></button>
        <button className="icon-button theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`} data-testid="button-toggle-theme">{theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}</button>
        <button className={`menu-trigger ${menuOpen ? 'is-open' : ''}`} aria-expanded={menuOpen} aria-controls="primary-menu" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setMenuOpen(!menuOpen)} data-testid="button-toggle-menu"><span>{menuOpen ? 'Close' : 'Menu'}</span>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
      </div>
    </header>
    {menuOpen && <><button className="scrim menu-scrim" aria-label="Close navigation menu" onClick={() => setMenuOpen(false)} /><nav id="primary-menu" className="primary-menu" aria-label="Primary navigation">
      <div className="menu-kicker">Find your way <span>01 — 08</span></div>{routes.map(([href, label], i) => <Link href={href} key={href} className={`menu-link ${path === href ? 'active' : ''}`} onClick={() => setMenuOpen(false)}><span className="menu-number">0{i + 1}</span>{label}<ArrowRight size={17} /></Link>)}
      <p className="menu-note">Made with care, one thoughtful stitch at a time.</p>
    </nav></>}
    <main id="main" tabIndex={-1}>
      <Switch>
        <Route path="/" component={() => <Home addQuote={addQuote} />} />
        <Route path="/designs" component={() => <DesignsPage favorites={favorites} toggleFavorite={toggleFavorite} addQuote={addQuote} focusSearch={focusPortfolioSearch} />} />
        <Route path="/pricing" component={() => <PricingPage addQuote={addQuote} />} />
        <Route path="/custom-design" component={() => <CustomPage quoteIds={quotes} />} />
        <Route path="/membership" component={MembershipPage} />
        <Route path="/resources" component={ResourcesPage} />
        <Route path="/track-order" component={TrackOrderPage} />
        <Route path="/account" component={AccountPage} />
        <Route path="/contact" component={ContactPage} />
        <Route component={NotFound} />
      </Switch>
    </main>
    <Footer />
    {showBackTop && <button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })} aria-label="Back to top" data-testid="button-back-to-top"><ArrowUp size={18} /></button>}
    
    <CustomCursor />
    <FloatingAIButton isOpen={advisorOpen} onOpen={() => setAdvisorOpen(true)} />
    <GeminiCraftAdvisorModal isOpen={advisorOpen} onClose={() => setAdvisorOpen(false)} topic={advisorTopic} />

    {panel && <><button className="scrim panel-scrim" onClick={dismissPanel} aria-label="Close side panel" /><aside className="side-panel" role="dialog" aria-modal="true" aria-labelledby="panel-heading">
      <div className="panel-head"><div><span className="eyebrow">{panel === 'saved' ? 'Your collection' : 'Plan a conversation'}</span><h2 id="panel-heading">{panel === 'saved' ? 'Saved details' : 'Quote basket'}</h2></div><button autoFocus className="icon-button" onClick={dismissPanel} aria-label="Close panel"><X size={20} /></button></div>
      {panel === 'saved' ? (savedDesigns.length ? <div className="panel-list">{savedDesigns.map((d) => <div className="panel-item" key={d.id}><ImageTile item={d} /><div><b>{d.title}</b><small>{d.category} · {d.garment}</small><button className="text-button" onClick={() => toggleFavorite(d.id)}>Remove from saved</button></div></div>)}</div> : <EmptyNote title="Nothing saved just yet" copy="Keep a motif close by tapping the heart on a design." link="/designs" linkText="Explore designs" />) : <>
        <p className="quiet">A planning list only. This is not checkout or a purchase.</p>
        {quotedDesigns.length ? <div className="panel-list">{quotedDesigns.map((d) => <div className="panel-item" key={d.id}><ImageTile item={d} /><div><b>{d.title}</b><small>Illustrative design reference</small><button className="text-button" onClick={() => setQuotes((old) => old.filter((id) => id !== d.id))}>Remove</button></div></div>)}</div> : <EmptyNote title="Start a quote basket" copy="Add a design idea to collect references before you write a brief." link="/designs" linkText="Browse the portfolio" />}
        {quotedDesigns.length > 0 && <><Link href="/custom-design" className="button button-primary panel-cta" onClick={dismissPanel}>Use these in a brief <ArrowRight size={16} /></Link><button className="text-button clear-basket" onClick={() => setQuotes([])}>Clear quote basket</button></>}
      </>}
    </aside></>}
  </div>;
}

function Footer() {
  return <footer className="site-footer"><div className="footer-top"><div className="footer-brand"><span className="brand-mark">S<Flower2 size={13} aria-hidden="true" /></span><div><strong>Spandana Embroidery</strong><p>Quality embroidery at affordable prices.</p></div></div><div className="footer-links" aria-label="Site pages">{routes.slice(1, 5).map(([href, label]) => <Link href={href} key={href}>{label}</Link>)}</div><div className="footer-links">{routes.slice(5).map(([href, label]) => <Link href={href} key={href}>{label}</Link>)}</div><div className="footer-contact"><strong>Contact placeholders</strong><span>Email: add verified address</span><span>Phone: add verified number</span><small>Social profiles are not linked until verified URLs are provided.</small><div className="footer-social" aria-label="Social profile placeholders"><button type="button" className="social-placeholder" disabled aria-label="Instagram profile placeholder; add an official link before publishing"><Instagram size={17} aria-hidden="true" /></button><button type="button" className="social-placeholder" disabled aria-label="Facebook profile placeholder; add an official link before publishing"><Facebook size={17} aria-hidden="true" /></button></div></div></div><div className="footer-bottom"><span>Home-owned embroidery studio · India</span><span>Portfolio artwork and sample prices are illustrative placeholders.</span></div></footer>;
}
function PageIntro({ index, eyebrow, title, children }: { index: string; eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return <div className="page-intro reveal"><span className="eyebrow">{index} / {eyebrow}</span><h1>{title}</h1>{children && <p>{children}</p>}</div>;
}
function Home({ addQuote }: { addQuote: (id: string) => void }) {
  return <div className="home-page">
    <section className="hero section-wrap"><div className="hero-copy reveal"><span className="eyebrow"><Flower2 className="tiny-sun" size={14} aria-hidden="true" /> A home-owned embroidery studio</span><h1>Little details.<br /><em>Lasting feeling.</em></h1><p>Indian-style embroidery for women’s and children’s clothing, shaped around the colours, fabrics and ideas you love.</p><div className="hero-buttons"><Link className="button button-primary" href="/designs">Explore the details <ArrowRight size={17} /></Link><Link className="button button-quiet" href="/custom-design">Tell us your idea <ArrowDown size={16} /></Link></div><div className="hero-footnote"><span className="stitch-rule" />Quality embroidery at affordable prices.</div></div>
      <div className="hero-art reveal"><div className="hero-arch"><ImageTile item={designs[0]} className="hero-image" /></div><div className="art-caption"><span>THREAD STUDY No. 01</span><b>Petals in motion</b><small>Illustrative placeholder artwork</small></div><div className="float-seal">MADE<br />WITH<br />CARE</div></div>
    </section>
    <section className="intro-band"><div className="section-wrap intro-grid"><span className="section-index">01 / OUR APPROACH</span><h2>Made slowly.<br /><em>Made for you.</em></h2><div><p>Embroidery has a way of making a familiar garment feel entirely your own. Here, every idea begins with a conversation and a small detail worth noticing.</p><Link className="under-link" href="/custom-design">Start with an idea <ArrowRight size={15} /></Link></div></div></section>
    <section className="section-wrap featured-section"><div className="section-heading"><div><span className="eyebrow">A few ideas to begin</span><h2>Stitch stories</h2></div><Link className="under-link" href="/designs">See all designs <ArrowRight size={15} /></Link></div><div className="featured-grid">{designs.slice(0, 3).map((d, i) => <article className={`feature-card feature-${i + 1}`} key={d.id}><Link href="/designs" className="feature-art"><ImageTile item={d} /></Link><div className="feature-meta"><div><span className="eyebrow">{d.category} · {d.garment}</span><h3>{d.title}</h3></div><button className="round-arrow" aria-label={`Add ${d.title} to quote basket`} onClick={() => addQuote(d.id)}><Plus size={17} /></button></div></article>)}</div><p className="image-disclaimer">Portfolio artwork shown is illustrative placeholder imagery, not a representation of completed studio work.</p></section>
    <section className="quote-strip"><Flower2 className="quote-flower" aria-hidden="true" /><p>“A small embroidered detail can make a garment feel like it was always yours.”</p><span>THE SPANDANA STUDIO</span></section>
    <section className="section-wrap how-section"><div className="how-title"><span className="eyebrow">02 / THE PROCESS</span><h2>From first thought<br />to final stitch.</h2><p>Keep it simple. We’ll shape the details together.</p></div><div className="steps">{[['01', 'Share your thought', 'Tell us about the garment, the moment, and what you’d like it to feel like.'], ['02', 'Explore the details', 'Talk through motif, placement, colour and an illustrative quote.'], ['03', 'Make it yours', 'Agree the final design and practical details directly before work begins.']].map(([n, t, c]) => <div className="step" key={n}><span>{n}</span><h3>{t}</h3><p>{c}</p><ArrowRight size={16} /></div>)}</div></section>
    <section className="closing-cta"><div className="closing-inner"><span className="eyebrow">Have a little idea?</span><h2>Let’s give it<br /><em>a thread to follow.</em></h2><Link href="/custom-design" className="button button-dark">Share a custom brief <ArrowRight size={17} /></Link><p>Local demo form · no message is sent from this preview.</p></div></section>
  </div>;
}
function EmptyNote({ title, copy, link, linkText }: { title: string; copy: string; link: string; linkText: string }) {
  return <div className="empty-note"><Flower2 className="empty-flower" aria-hidden="true" /><h3>{title}</h3><p>{copy}</p><Link href={link} className="under-link">{linkText} <ArrowRight size={15} /></Link></div>;
}
function DesignsPage({ favorites, toggleFavorite, addQuote, focusSearch }: { favorites: string[]; toggleFavorite: (id: string) => void; addQuote: (id: string) => void; focusSearch: boolean }) {
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (focusSearch) searchRef.current?.focus();
  }, [focusSearch]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All details');
  const [sort, setSort] = useState('featured');
  const [onlySaved, setOnlySaved] = useState(false);
  useEffect(() => {
    const focusSearch = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (event.key === '/' && target?.tagName !== 'INPUT' && target?.tagName !== 'TEXTAREA' && target?.tagName !== 'SELECT' && !target?.isContentEditable) {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', focusSearch);
    return () => window.removeEventListener('keydown', focusSearch);
  }, []);
  const categories = ['All details', ...Array.from(new Set(designs.map((d) => d.category)))];
  const filtered = useMemo(() => designs.filter((d) => (category === 'All details' || d.category === category) && (!onlySaved || favorites.includes(d.id)) && `${d.title} ${d.category} ${d.garment} ${d.style}`.toLowerCase().includes(query.toLowerCase())).sort((a, b) => sort === 'name' ? a.title.localeCompare(b.title) : 0), [category, onlySaved, favorites, query, sort]);
  return <div className="page-wrap"><PageIntro index="01" eyebrow="The portfolio" title={<>A collection of<br /><em>small wonders.</em></>}><>A starting point for your own idea. Search and filter these illustrative placeholder concepts.</></PageIntro>
    <section className="design-controls" aria-label="Filter designs"><label className="search-box"><Search size={18} /><span className="sr-only">Search designs</span><input id="design-search" ref={searchRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search motifs, garments, styles…" data-testid="input-search-designs" /><kbd>/</kbd></label><div className="filter-row"><div className="chips" aria-label="Filter by category">{categories.map((c) => <button key={c} className={`chip ${category === c ? 'selected' : ''}`} onClick={() => setCategory(c)} aria-pressed={category === c}>{c}</button>)}</div><label className="sort-label">Sort <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort designs"><option value="featured">Featured</option><option value="name">Name A–Z</option></select></label></div><button className={`saved-filter ${onlySaved ? 'active' : ''}`} onClick={() => setOnlySaved(!onlySaved)} aria-pressed={onlySaved}><Heart size={15} /> {onlySaved ? 'Showing saved' : 'Show saved only'} <span>{favorites.length}</span></button></section>
    <p className="results-line" role="status">{filtered.length} {filtered.length === 1 ? 'idea' : 'ideas'} to explore</p>
    {filtered.length ? <div className="design-grid">{filtered.map((d, i) => <article className="design-card reveal" style={{ animationDelay: `${i * 65}ms` }} key={d.id}><div className="design-image"><ImageTile item={d} /><button className={`heart-button ${favorites.includes(d.id) ? 'chosen' : ''}`} onClick={() => toggleFavorite(d.id)} aria-label={favorites.includes(d.id) ? `Remove ${d.title} from favourites` : `Save ${d.title} to favourites`} aria-pressed={favorites.includes(d.id)}><Heart size={18} fill={favorites.includes(d.id) ? 'currentColor' : 'none'} /></button><span className="image-index">0{i + 1}</span></div><div className="design-info"><div><span className="eyebrow">{d.category} / {d.garment}</span><h2>{d.title}</h2><p>{d.style} direction · image placeholder</p></div><button className="add-quote-button" onClick={() => addQuote(d.id)} aria-label={`Add ${d.title} to quote basket`}><Plus size={16} /> Add idea</button></div></article>)}</div> : <EmptyNote title="No matching stitches" copy="Try a broader search or clear a filter to see more placeholder ideas." link="/designs" linkText="Reset your view" />}
    <p className="note-box"><CircleHelp size={17} /> All portfolio artwork and work descriptions are illustrative placeholders. Replace them with approved studio images before publishing.</p>
  </div>;
}
function PricingPage({ addQuote }: { addQuote: (id: string) => void }) {
  const [open, setOpen] = useState<number | null>(0);
  return <div className="page-wrap"><PageIntro index="02" eyebrow="A thoughtful estimate" title={<>Clear beginnings.<br /><em>Room for detail.</em></>}><>The examples below are illustrative INR placeholders, not an offer or confirmed studio price. A final estimate depends on the fabric and design.</></PageIntro>
    <section className="pricing-layout"><div className="price-note"><span className="price-seal">₹</span><span className="eyebrow">A note on pricing</span><h2>Every stitch has its own scale.</h2><p>Motif size, stitch density, fabric, placement and finishing all shape the work. Use these sample ranges only as a conversation starter.</p><Link href="/custom-design" className="button button-primary">Request an illustrative quote <ArrowRight size={16} /></Link><small>No checkout or purchase takes place here.</small></div><div className="price-list">{priceExamples.map((item, i) => <div className={`price-row ${open === i ? 'open' : ''}`} key={item.name}><button className="price-row-toggle" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} aria-controls={`price-desc-${i}`}><span className="price-number">0{i + 1}</span><span className="price-title">{item.name}</span><span className="price-amount">{item.range}</span><ChevronDown size={17} /></button>{open === i && <div id={`price-desc-${i}`} className="price-description"><p>{item.detail}. Final cost is discussed after reviewing a specific brief.</p><button className="text-button" onClick={() => { addQuote(designs[i].id); }}>Add a related design idea to quote basket <ArrowRight size={14} /></button></div>}</div>)}</div></section>
    <section className="pricing-foot"><span>PLEASE NOTE</span><p>All numbers are illustrative sample placeholders. Owner: edit the ranges in <code>src/data.ts</code>, and add your own terms and inclusions before publication.</p></section></div>;
}
function DemoSuccess({ children }: { children: ReactNode }) { return <div className="success-message" role="status" aria-live="polite"><Check size={19} /><span>{children}</span></div>; }
function FormField({ label, name, type = 'text', required = true, placeholder, hint, ...props }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string; hint?: string; [key: string]: unknown }) {
  const id = `field-${name}`;
  return <div className="field"><label htmlFor={id}>{label}{required && <span aria-hidden="true"> *</span>}</label>{type === 'textarea' ? <textarea id={id} name={name} required={required} placeholder={placeholder} rows={4} {...props as object} /> : <input id={id} name={name} type={type} required={required} placeholder={placeholder} {...props as object} />}{hint && <small>{hint}</small>}</div>;
}
function PasswordField({ label, name, autoComplete, placeholder = 'At least 8 characters', hint }: { label: string; name: string; autoComplete: string; placeholder?: string; hint?: string }) {
  const [visible, setVisible] = useState(false);
  const id = `field-${name}`;
  return <div className="field"><label htmlFor={id}>{label}<span aria-hidden="true"> *</span></label><div className="password-input-wrap"><input id={id} name={name} type={visible ? 'text' : 'password'} autoComplete={autoComplete} minLength={8} placeholder={placeholder} required /><button className="password-visibility" type="button" onClick={() => setVisible(!visible)} aria-label={`${visible ? 'Hide' : 'Show'} ${label.toLowerCase()}`} aria-pressed={visible}>{visible ? <EyeOff size={17} aria-hidden="true" /> : <Eye size={17} aria-hidden="true" />}</button></div>{hint && <small>{hint}</small>}</div>;
}
function CustomPage({ quoteIds = [] }: { quoteIds?: string[] }) {
  const [success, setSuccess] = useState(false);
  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email');
  const briefReferences = designs.filter((item) => quoteIds.includes(item.id));
  const submit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); if (e.currentTarget.reportValidity()) setSuccess(true); };
  return <div className="page-wrap"><PageIntro index="03" eyebrow="Make it personal" title={<>Your idea, our<br /><em>next conversation.</em></>}><>A few details help you put a clear brief together. Nothing is sent from this local demo.</></PageIntro><div className="form-layout"><aside className="form-aside"><span className="eyebrow">Before you begin</span><h2>Little details help.</h2><p>Tell us what you know. A reference image, fabric description or rough sketch can help shape a useful conversation.</p><ol className="brief-hints"><li>What garment is it for?</li><li>Where would you like the detail?</li><li>What colours or feeling do you have in mind?</li></ol><p className="placeholder-callout">Contact information and submission destination are owner placeholders. Add them before launch.</p></aside><form className="form-card" onSubmit={submit} onChange={() => setSuccess(false)}><div className="form-card-head"><span className="eyebrow">CUSTOM REQUEST · DEMO</span><h2>Tell us the outline</h2><p>Fields marked * are required.</p></div>{briefReferences.length > 0 && <div className="brief-reference"><b>Ideas from your quote basket</b><p>{briefReferences.map((item) => item.title).join(' · ')}</p><small>References only; this form remains a local demo.</small></div>}<div className="field-pair"><FormField label="Your name" name="name" autoComplete="name" placeholder="Name" /><div className="field"><label htmlFor="contact-method">Preferred contact method <span aria-hidden="true">*</span></label><select id="contact-method" name="contactMethod" value={contactMethod} onChange={(e) => setContactMethod(e.currentTarget.value as 'email' | 'phone')} required><option value="email">Email</option><option value="phone">Phone</option></select></div></div><FormField label={contactMethod === 'email' ? 'Email address' : 'Phone number'} name="contact" type={contactMethod === 'email' ? 'email' : 'tel'} autoComplete={contactMethod === 'email' ? 'email' : 'tel'} placeholder={contactMethod === 'email' ? 'you@example.com' : 'Your phone number'} hint="This preview does not send or store your contact information." /><div className="field-pair"><div className="field"><label htmlFor="garment">Garment type <span aria-hidden="true">*</span></label><select id="garment" name="garment" required defaultValue=""><option value="" disabled>Choose one</option><option>Blouse</option><option>Kurta</option><option>Dupatta</option><option>Children’s clothing</option><option>Other</option></select></div><div className="field"><label htmlFor="budget">Indicative budget (INR)</label><select id="budget" name="budget" defaultValue=""><option value="">Not decided</option><option>Under ₹1,000</option><option>₹1,000–₹3,000</option><option>₹3,000+</option></select></div></div><FormField label="Preferred colours (optional)" name="colors" required={false} placeholder="e.g. rose, coral, gold" /><FormField label="Your idea" name="brief" type="textarea" placeholder="Fabric, placement, motif or anything you’re imagining…" hint="Please don’t include sensitive personal information." /><FormField label="Reference image URL (optional)" name="referenceUrl" type="url" required={false} placeholder="https://example.com/your-reference" hint="This local demo does not upload or fetch images." /><label className="checkbox-line"><input type="checkbox" name="acknowledge" required /><span>I understand this preview form is a local demo and does not send my inquiry.</span></label><button className="button button-primary submit-button" type="submit">Preview inquiry <Send size={16} /></button>{success && <DemoSuccess>Your inquiry is ready in this local demo. It has not been sent or stored.</DemoSuccess>}</form></div></div>;
}
function MembershipPage() {
  const [success, setSuccess] = useState(false);
  const [members, setMembers] = useState(0);
  const submit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); if (e.currentTarget.reportValidity()) { setSuccess(true); setMembers((n) => n + 1); e.currentTarget.reset(); } };
  return <div className="page-wrap"><PageIntro index="04" eyebrow="Studio notes" title={<>A little closer<br /><em>to the craft.</em></>}><>A small local demo sign-up for occasional making notes. There is no live list, membership benefit or message delivery connected.</></PageIntro><section className="membership-card"><div className="membership-copy"><span className="eyebrow">THE STUDIO LETTER · ILLUSTRATIVE</span><h2>For the curious<br />and the stitch-minded.</h2><p>Imagine a quiet note with embroidery care ideas, motif inspiration and glimpses of what’s on the worktable. This demo simply shows the sign-up experience.</p><div className="membership-count"><Flower2 className="count-spark" aria-hidden="true" /><span><b>{members.toString().padStart(2, '0')}</b><small>local demo sign-ups this visit</small></span></div></div><form className="membership-form" onSubmit={submit} onChange={() => setSuccess(false)}><h3>Join the demo list</h3><FormField label="Name" name="name" placeholder="Your name" /><FormField label="Email address" name="email" type="email" placeholder="you@example.com" /><label className="checkbox-line"><input type="checkbox" name="consent" required /><span>I understand this is an illustrative local-only sign-up.</span></label><button className="button button-dark" type="submit">Sign up locally <ArrowRight size={16} /></button>{success && <DemoSuccess>Demo sign-up complete for this visit only. No details have been saved or sent.</DemoSuccess>}</form></section><p className="note-box"><CircleHelp size={17} /> Before publishing: replace this with a real opt-in process, privacy notice and clear membership terms.</p></div>;
}
function ResourcesPage() {
  const resources = [
    ['01', 'Start with the fabric', 'Lightweight or loosely woven fabric may need a gentler motif and stabilising. Think about how the cloth drapes and how it will be worn before deciding on stitch density.'],
    ['02', 'Choose a useful reference', 'A clear photo, hand sketch or even a few descriptive words can help communicate scale and mood. Mention what you like about it, not only what you want copied.'],
    ['03', 'Care for embroidered pieces', 'Turn the garment inside out, hand wash gently in cool water when suitable for the fabric, and avoid wringing the embroidered area. Follow the garment’s own care label.'],
    ['04', 'Plan placement before stitching', 'Consider seams, closures and how the garment moves when worn. A paper motif placement can help you picture the result before committing.']
  ];
  return <div className="page-wrap"><PageIntro index="05" eyebrow="Helpful little notes" title={<>A few things worth<br /><em>knowing by thread.</em></>}><>Practical starting points for a thoughtful embroidery brief and caring for the detail you love.</></PageIntro><section className="resource-layout"><div className="resource-list">{resources.map(([n, title, text]) => <article className="resource-item" key={n}><span className="resource-number">{n}</span><div><h2>{title}</h2><p>{text}</p></div><Flower2 className="resource-mark" aria-hidden="true" /></article>)}</div><aside className="guide-card"><span className="guide-art"><Bookmark size={34} strokeWidth={1.2} /></span><span className="eyebrow">A pocket guide</span><h2>Care for embroidered clothes</h2><p>A short printable note with gentle care reminders. This guide is included with the project.</p><a href="/embroidery-care-guide.txt" download className="button button-primary">Download the guide <ArrowDown size={16} /></a><small>Plain text · for general guidance; follow the garment label first.</small></aside></section><section className="faq-section"><div className="faq-title"><span className="eyebrow">A few common questions</span><h2>Good to know.</h2></div><div className="faq-list">{faqs.map((item, i) => <details className="faq-item" key={item.q}><summary><span><small>0{i + 1}</small>{item.q}</span><Plus size={19} aria-hidden="true" /></summary><p>{item.a}</p></details>)}</div></section></div>;
}
function AccountPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [success, setSuccess] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const password = form.elements.namedItem('password') as HTMLInputElement;
    const confirm = form.elements.namedItem('confirm') as HTMLInputElement | null;
    if (confirm) confirm.setCustomValidity(confirm.value === password.value ? '' : 'Passwords must match.');
    if (form.reportValidity()) setSuccess(true);
  };
  return <div className="page-wrap"><PageIntro index="06" eyebrow="Your studio corner" title={<>A place to keep<br /><em>your ideas.</em></>}><>Try the account screens in a local-only demo. No account is created and passwords are never stored.</></PageIntro><div className="account-layout"><div className="account-art"><span className="account-stamp">A SMALL<br />STUDIO<br />DEMO</span><span className="account-copy">Thoughts, saved<br />for another day.</span><small>Illustrative textile artwork</small></div><section className="account-card"><div className="tab-switch" role="tablist" aria-label="Account mode"><button role="tab" aria-selected={mode === 'login'} className={mode === 'login' ? 'active' : ''} onClick={() => { setMode('login'); setSuccess(false); }}>Log in</button><button role="tab" aria-selected={mode === 'register'} className={mode === 'register' ? 'active' : ''} onClick={() => { setMode('register'); setSuccess(false); }}>Create account</button></div><span className="eyebrow">LOCAL-ONLY DEMO</span><h2>{mode === 'login' ? 'Welcome back.' : 'A fresh beginning.'}</h2><p>{mode === 'login' ? 'Enter any valid details to preview the state.' : 'Preview a registration form without creating an account.'}</p><form onSubmit={submit} onChange={() => setSuccess(false)}><FormField label="Email address" name="email" type="email" autoComplete="email" placeholder="you@example.com" /><PasswordField label="Password" name="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} hint="Demo only. Password is used only in memory for validation and never saved." />{mode === 'register' && <PasswordField label="Confirm password" name="confirm" autoComplete="new-password" placeholder="Enter it once more" />}{mode === 'register' && <label className="checkbox-line"><input type="checkbox" required /><span>I understand this is a local-only account preview.</span></label>}<button className="button button-primary full-button" type="submit">{mode === 'login' ? 'Preview log in' : 'Preview registration'} <ArrowRight size={16} /></button>{success && <DemoSuccess>Demo {mode === 'login' ? 'login' : 'registration'} validated locally. No credentials were stored and no account was created.</DemoSuccess>}</form><p className="privacy-reminder">Never use a real password in this demonstration.</p></section></div></div>;
}
function ContactPage() {
  const [success, setSuccess] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); if (e.currentTarget.reportValidity()) { setSuccess(true); e.currentTarget.reset(); } };
  return <div className="page-wrap"><PageIntro index="07" eyebrow="Say hello" title={<>A conversation<br /><em>starts here.</em></>}><>We have not added contact details because none have been provided. Use the local demo form to see the experience; it does not send a message.</></PageIntro><div className="contact-layout"><aside className="contact-aside"><span className="contact-symbol">S<Flower2 size={16} aria-hidden="true" /></span><h2>Warmly, from the studio.</h2><p>For a custom garment detail, the inquiry form is a helpful place to begin. Add real studio contact information here when it is ready.</p><div className="placeholder-list"><b>Owner edit points</b><span>Email: add verified address</span><span>Phone: add verified number</span><span>Social: add verified profile</span><span>Location / map: intentionally omitted</span></div></aside><form className="form-card contact-form" onSubmit={submit} onChange={() => setSuccess(false)}><div className="form-card-head"><span className="eyebrow">CONTACT NOTE · LOCAL DEMO</span><h2>Write a little note</h2></div><FormField label="Your name" name="name" autoComplete="name" placeholder="Name" /><FormField label="Email address" name="email" type="email" autoComplete="email" placeholder="you@example.com" /><div className="field"><label htmlFor="topic">What’s on your mind? <span aria-hidden="true">*</span></label><select id="topic" name="topic" required defaultValue=""><option value="" disabled>Choose a topic</option><option>Custom embroidery</option><option>Pricing question</option><option>Something else</option></select></div><FormField label="Message" name="message" type="textarea" placeholder="Share only what you’re comfortable including…" /><label className="checkbox-line"><input type="checkbox" required /><span>I understand this preview does not send or store my message.</span></label><button className="button button-primary submit-button" type="submit">Preview message <Send size={16} /></button>{success && <DemoSuccess>Message validated in this local demo. It has not been sent or stored.</DemoSuccess>}</form></div></div>;
}
function RootApp() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><ErrorBoundary resetKey="spandana-site"><App /></ErrorBoundary></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}
export default RootApp;
