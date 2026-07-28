import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { useScrollReveal } from './hooks/useScrollReveal'

// ==================================================
// EDIT ONLY THIS SECTION FOR EACH NEW BUSINESS
// ==================================================

const BUSINESS_NAME = 'Kigali Modern Furniture Ltd'

const BUSINESS = {
  name: BUSINESS_NAME,
  phoneDisplay: '+250 7XX XXX XXX',
  whatsappNumber: '2507XXXXXXXX',
  location: 'Kigali, Rwanda',
  email: '',
  heroImage: '/hero.jpg',
  instagram: '',
  facebook: '',
  services: [
    'Interior Design',
    'Custom Furniture',
    'Kitchen Cabinets',
    'Space Planning',
    'Installation',
  ],
  galleryImages: [],
}

const LOCAL_GALLERY_IMAGES = [
  {
    src: '/1.webp',
    alt: `${BUSINESS_NAME} exterior construction and finishing project in Kigali`,
    category: 'Construction',
  },
  {
    src: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1400&q=82',
    alt: 'Modern fitted kitchen with refined cabinetry and stone surfaces',
    category: 'Kitchens',
  },
  {
    src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=82',
    alt: 'Elegant custom furniture in a warm contemporary dining space',
    category: 'Furniture',
  },
]

const REMOTE_HERO_IMAGE =
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=85'

const REMOTE_GALLERY_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=82',
    alt: 'Warm modern living room with bespoke furniture and layered textures',
    category: 'Interiors',
  },
  {
    src: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1400&q=82',
    alt: 'Contemporary fitted kitchen with refined cabinetry and stone surfaces',
    category: 'Kitchens',
  },
  {
    src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=82',
    alt: 'Elegant dining area with custom wood furniture and natural light',
    category: 'Furniture',
  },
  {
    src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=82',
    alt: 'Premium residential interior with built-in shelving and calm materials',
    category: 'Interiors',
  },
  {
    src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400&q=82',
    alt: 'Modern kitchen island with fitted cabinets and pendant lighting',
    category: 'Kitchens',
  },
  {
    src: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1400&q=82',
    alt: 'Tailored lounge furniture in a sophisticated residential space',
    category: 'Furniture',
  },
  {
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=82',
    alt: 'Architectural home interior with warm wood and clean detailing',
    category: 'Interiors',
  },
  {
    src: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1400&q=82',
    alt: 'Crafted cabinetry and storage detail for an organized home',
    category: 'Kitchens',
  },
]

// ==================================================
// END OF EDITABLE BUSINESS SECTION
// ==================================================

const NAV_LINKS = [
  ['Expertise', '#services'],
  ['Work', '#work'],
  ['Process', '#process'],
  ['Contact', '#contact'],
]

const SERVICE_DETAILS = [
  {
    title: 'Interior design',
    text: 'A complete room direction that balances atmosphere, daily routines, storage, lighting, and material choices.',
  },
  {
    title: 'Custom-made furniture',
    text: 'Pieces measured around your space, so rooms feel more organized, comfortable, and personal.',
  },
  {
    title: 'Kitchen cabinets',
    text: 'Fitted cabinetry planned for smoother cooking, cleaner storage, and a kitchen that feels built-in from day one.',
  },
  {
    title: 'Space planning',
    text: 'Layouts that make better use of every corner before production begins, reducing guesswork and costly changes.',
  },
  {
    title: 'Project execution and installation',
    text: 'Practical support from concept to delivery, with clear communication through production and fitting.',
  },
]

const PROCESS_STEPS = ['Consultation', 'Design', 'Production', 'Delivery and installation']

function buildWhatsAppUrl(message) {
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`
}

function SmartImage({ src, fallback, alt, className, loading = 'lazy' }) {
  const [imageSrc, setImageSrc] = useState(src || fallback)

  useEffect(() => {
    setImageSrc(src || fallback)
  }, [src, fallback])

  return (
    <img
      className={className}
      src={imageSrc}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={() => {
        if (imageSrc !== fallback) setImageSrc(fallback)
      }}
    />
  )
}

function App() {
  const [navSolid, setNavSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [form, setForm] = useState({ name: '', phone: '', service: '', description: '' })
  const [formError, setFormError] = useState('')
  useScrollReveal()

  const gallery = useMemo(() => {
    const configured = BUSINESS.galleryImages.length ? BUSINESS.galleryImages : LOCAL_GALLERY_IMAGES
    if (configured.length) {
      return configured.map((item, index) =>
        typeof item === 'string'
          ? {
              src: item,
              alt: `${BUSINESS.name} project preview ${index + 1}`,
              category: 'Projects',
            }
          : item,
      )
    }
    return REMOTE_GALLERY_IMAGES
  }, [])

  const filteredGallery =
    activeFilter === 'All' ? gallery : gallery.filter((image) => image.category === activeFilter)
  const filters = ['All', ...new Set(gallery.map((image) => image.category))]

  useEffect(() => {
    const description = `${BUSINESS.name} creates interior design, custom furniture, fitted kitchens, and kitchen cabinets for homes and businesses in ${BUSINESS.location}.`
    document.title = `${BUSINESS.name} | Interior Design & Custom Furniture in Kigali`
    setMeta('description', description)
    setMeta('og:title', `${BUSINESS.name} | Interior Design & Custom Furniture`)
    setMeta('og:description', description)
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: BUSINESS.name,
      telephone: BUSINESS.phoneDisplay,
      address: { '@type': 'PostalAddress', addressLocality: BUSINESS.location },
      areaServed: BUSINESS.location,
      url: window.location.origin,
      image: BUSINESS.heroImage,
      makesOffer: BUSINESS.services.map((service) => ({ '@type': 'Offer', itemOffered: service })),
    })
  }, [])

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (lightboxIndex === null) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setLightboxIndex(null)
      if (event.key === 'ArrowRight') setLightboxIndex((lightboxIndex + 1) % filteredGallery.length)
      if (event.key === 'ArrowLeft') {
        setLightboxIndex((lightboxIndex - 1 + filteredGallery.length) % filteredGallery.length)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [filteredGallery.length, lightboxIndex])

  const consultationUrl = buildWhatsAppUrl(
    `Hello ${BUSINESS.name}, I would like a free consultation for an interior, furniture, or kitchen project in Kigali.`,
  )

  function closeMenu() {
    setMenuOpen(false)
  }

  function submitQuote(event) {
    event.preventDefault()
    if (!form.name.trim() || !form.phone.trim() || !form.service || !form.description.trim()) {
      setFormError('Please complete all fields before sending your request.')
      return
    }
    setFormError('')
    const message = `Hello ${BUSINESS.name}, my name is ${form.name}. My phone number is ${form.phone}. I am interested in ${form.service}. Project details: ${form.description}`
    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <header className={`site-nav ${navSolid ? 'is-solid' : ''}`}>
        <a className="brand" href="#home" onClick={closeMenu}>
          {BUSINESS.name}
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span></span>
          <span></span>
        </button>
        <nav className={menuOpen ? 'is-open' : ''} aria-label="Primary navigation">
          {NAV_LINKS.map(([label, href]) => (
            <a key={href} href={href} onClick={closeMenu}>
              {label}
            </a>
          ))}
          <a className="nav-cta" href={consultationUrl} target="_blank" rel="noreferrer">
            Get a Quote
          </a>
        </nav>
      </header>

      <main id="home">
        <section className="hero-section">
          <SmartImage
            src={BUSINESS.heroImage}
            fallback={REMOTE_HERO_IMAGE}
            alt={`${BUSINESS.name} interior design and custom furniture inspiration`}
            className="hero-image"
            loading="eager"
          />
          <div className="hero-overlay"></div>
          <div className="hero-bg-name" aria-hidden="true">
            {BUSINESS_NAME}
          </div>
          <div className="hero-content">
            <p className="eyebrow">Interior Design • Construction • Custom Finishes</p>
            <h1>Transform your property into a refined space built with intention.</h1>
            <p>
              Premium interiors, construction finishing, fitted kitchens, cabinetry, and custom
              furniture for homes and businesses across Kigali.
            </p>
            <div className="hero-actions">
              <a className="button primary" href={consultationUrl} target="_blank" rel="noreferrer">
                Request a Free Consultation <span aria-hidden="true">→</span>
              </a>
              <a className="button secondary" href="#work">
                Explore Our Work <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <aside className="hero-signature" aria-label="Project strengths">
            <span>Design planning</span>
            <span>Site execution</span>
            <span>Interior finishing</span>
          </aside>
          <a className="scroll-indicator" href="#about" aria-label="Scroll to about section">
            Scroll
          </a>
        </section>

        <section className="expertise-strip" aria-label="Specialties">
          <div>
            {[...BUSINESS.services, ...BUSINESS.services].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </section>

        <section id="about" className="section about reveal">
          <div className="section-kicker">Designed for Kigali living</div>
          <div className="about-copy">
            <h2>Rooms that look refined and work beautifully in everyday life.</h2>
            <p>
              {BUSINESS.name} helps clients turn early ideas into spaces with better flow, more
              useful storage, and furniture that belongs to the room. Every project starts with how
              you live or work, then moves into materials, proportions, and details that feel
              considered.
            </p>
          </div>
          <SmartImage
            src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1500&q=82"
            fallback={REMOTE_HERO_IMAGE}
            alt="Sophisticated residential interior with warm natural materials"
            className="about-image"
          />
        </section>

        <section id="services" className="section services reveal">
          <div className="section-heading">
            <p className="section-kicker">Expertise</p>
            <h2>From first layout to final fitting.</h2>
          </div>
          <div className="service-grid">
            {SERVICE_DETAILS.map((service, index) => (
              <article className="service-card reveal" key={service.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="work" className="section work reveal">
          <div className="section-heading">
            <p className="section-kicker">Portfolio preview</p>
            <h2>Visual direction for interiors, cabinetry, and furniture projects.</h2>
            <p className="preview-note">Preview imagery — the final website will feature your actual projects.</p>
          </div>
          <div className="filters" aria-label="Gallery filters">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={activeFilter === filter ? 'active' : ''}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="gallery-grid">
            {filteredGallery.map((image, index) => (
              <button
                type="button"
                className="gallery-item reveal"
                key={`${image.src}-${index}`}
                onClick={() => setLightboxIndex(index)}
              >
                <SmartImage src={image.src} fallback={REMOTE_GALLERY_IMAGES[index % REMOTE_GALLERY_IMAGES.length].src} alt={image.alt} />
                <span>
                  <strong>{image.category}</strong>
                  View project direction
                </span>
              </button>
            ))}
          </div>
        </section>

        <section id="process" className="section process reveal">
          <div className="section-heading">
            <p className="section-kicker">Process</p>
            <h2>A clear path from idea to installed space.</h2>
          </div>
          <div className="process-line">
            {PROCESS_STEPS.map((step, index) => (
              <article className="process-step reveal" key={step}>
                <span>{index + 1}</span>
                <h3>{step}</h3>
                <p>
                  {index === 0 && 'We discuss your space, budget range, priorities, and desired result.'}
                  {index === 1 && 'Layouts, finishes, and furniture details are shaped into a practical direction.'}
                  {index === 2 && 'Approved pieces and cabinetry move into careful making and coordination.'}
                  {index === 3 && 'The finished work is delivered, fitted, and reviewed with attention to detail.'}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="section why reveal">
          <div className="why-panel">
            <p className="section-kicker">Why choose us</p>
            <h2>Premium design decisions, grounded in real use.</h2>
          </div>
          <ul>
            {[
              'Designs shaped around the client',
              'Careful material selection',
              'Practical and beautiful solutions',
              'Clear communication',
              'Attention to detail',
              'End-to-end project support',
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section id="contact" className="section quote reveal">
          <div>
            <p className="section-kicker">Start a project</p>
            <h2>Tell us what you want to improve. We will help shape the next step.</h2>
            <p>
              Share a few details about your interior, furniture, or kitchen project and continue
              the conversation directly on WhatsApp.
            </p>
          </div>
          <form onSubmit={submitQuote} noValidate>
            <label>
              Name
              <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
            </label>
            <label>
              Phone number
              <input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
            </label>
            <label>
              Type of service
              <select value={form.service} onChange={(event) => setForm({ ...form, service: event.target.value })}>
                <option value="">Select a service</option>
                {BUSINESS.services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Short project description
              <textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
            </label>
            {formError && <p className="form-error">{formError}</p>}
            <button className="button primary" type="submit">
              Send via WhatsApp <span aria-hidden="true">→</span>
            </button>
          </form>
        </section>
      </main>

      <footer>
        <div>
          <h2>{BUSINESS.name}</h2>
          <p>{BUSINESS.location}</p>
          <p>{BUSINESS.phoneDisplay}</p>
        </div>
        <div>
          <h3>Services</h3>
          {BUSINESS.services.map((service) => (
            <span key={service}>{service}</span>
          ))}
        </div>
        <div>
          <h3>Navigation</h3>
          {NAV_LINKS.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
          {BUSINESS.instagram && <a href={BUSINESS.instagram}>Instagram</a>}
          {BUSINESS.facebook && <a href={BUSINESS.facebook}>Facebook</a>}
        </div>
        <a className="button secondary" href={consultationUrl} target="_blank" rel="noreferrer">
          WhatsApp {new Date().getFullYear()}
        </a>
      </footer>

      {lightboxIndex !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Project image preview">
          <button className="lightbox-close" type="button" onClick={() => setLightboxIndex(null)} aria-label="Close preview">
            ×
          </button>
          <button
            className="lightbox-nav prev"
            type="button"
            onClick={() => setLightboxIndex((lightboxIndex - 1 + filteredGallery.length) % filteredGallery.length)}
            aria-label="Previous image"
          >
            ‹
          </button>
          <SmartImage
            src={filteredGallery[lightboxIndex].src}
            fallback={REMOTE_GALLERY_IMAGES[lightboxIndex % REMOTE_GALLERY_IMAGES.length].src}
            alt={filteredGallery[lightboxIndex].alt}
            className="lightbox-image"
            loading="eager"
          />
          <button
            className="lightbox-nav next"
            type="button"
            onClick={() => setLightboxIndex((lightboxIndex + 1) % filteredGallery.length)}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}
    </>
  )
}

function setMeta(name, content) {
  const attr = name.startsWith('og:') ? 'property' : 'name'
  let tag = document.head.querySelector(`meta[${attr}="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function setJsonLd(data) {
  let script = document.getElementById('business-json-ld')
  if (!script) {
    script = document.createElement('script')
    script.id = 'business-json-ld'
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(data)
}

export default App
