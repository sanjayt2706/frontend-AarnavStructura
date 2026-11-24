// AUTO-COPIED from backend config/contentDefaults.js — the backend file is the source of truth.
// This copy is only used if the API cannot be reached.
/**
 * Default website content.
 *
 * Every editable section of the public website lives here under a key.
 * The website shows these values until an admin saves that section from the
 * dashboard ("Website Content"). Once saved, the admin's version replaces the
 * default. "Reset to default" in the dashboard deletes the saved version and
 * brings these values back.
 *
 * Image values can be:
 *   - a GridFS file id (24 hex chars) — what the dashboard stores after an upload
 *   - an absolute URL (https://...)
 *   - a path on the public website (/images/work/villa-dusk.jpg)
 */

const U = (id, w = 2000) => `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

export const CONTENT_DEFAULTS = {
  brand: {
    companyName: "Aarnav Structura",
    logoLight: "/brand/logo-white.png",
    logoDark: "/brand/logo-color.png",
    favicon: "/brand/favicon.png"
  },

  hero: {
    intervalSeconds: 7,
    slides: [
      {
        tab: "Aarnav Structura",
        isBrandTab: true,
        title: "Built to Last",
        subtitle: "From first drawing to final handover.",
        image: "/images/work/hero-apartment.jpg",
        video: "",
        buttonLabel: "Explore",
        buttonLink: "/what-we-do"
      },
      {
        tab: "Residential",
        title: "Homes Done Properly",
        subtitle: "Villas, duplexes and family homes engineered for decades.",
        image: "/images/work/villa-dusk.jpg",
        video: "",
        buttonLabel: "See homes",
        buttonLink: "/projects"
      },
      {
        tab: "Commercial",
        title: "Spaces That Work",
        subtitle: "Showrooms, offices and mixed-use blocks built to budget.",
        image: U("photo-1486406146926-c627a92ad1ab"),
        video: "",
        buttonLabel: "Commercial work",
        buttonLink: "/projects"
      },
      {
        tab: "Structural",
        title: "Engineered to Code",
        subtitle: "IS 456 and IS 1893 design, detailing and stability audits.",
        image: U("photo-1531834685032-c34bf0d84c77"),
        video: "",
        buttonLabel: "Our engineering",
        buttonLink: "/what-we-do"
      },
      {
        tab: "Turnkey",
        title: "One Team, Start to Keys",
        subtitle: "Design, approvals, construction and handover under one contract.",
        image: U("photo-1541888946425-d81bb19240f5"),
        video: "",
        buttonLabel: "How we work",
        buttonLink: "/about"
      },
      {
        tab: "Interiors",
        title: "Finished in Detail",
        subtitle: "Joinery, kitchens and fit-outs delivered by the same crew.",
        image: "/images/work/kitchen-joinery.jpg",
        video: "",
        buttonLabel: "View interiors",
        buttonLink: "/projects"
      }
    ]
  },

  intro: {
    eyebrow: "Who we are",
    statement:
      "We plan, engineer and build homes and commercial buildings across Karnataka — with one accountable team from the first site visit to the day you get the keys.",
    body:
      "Aarnav Structura is a civil, structural and architectural practice based in Shivamogga. Our engineers draw the plans, check every slab and beam, and stay on site while it gets built.",
    linkLabel: "About the company",
    linkHref: "/about",
    image: "/images/work/site-masonry.jpg"
  },

  stats: {
    items: [
      { value: "14", suffix: "+", label: "Years of engineering" },
      { value: "120", suffix: "+", label: "Structures delivered" },
      { value: "6", suffix: "L+", label: "Sq.ft designed" },
      { value: "100", suffix: "%", label: "Code-compliant designs" }
    ]
  },

  whatWeDo: {
    eyebrow: "What we do",
    heading: "Design, engineering and construction under one roof",
    intro:
      "Most building problems start where one consultant hands over to the next. We remove the handover.",
    // The services themselves are managed under "Services" in the dashboard.
    // A service without its own image uses one of these, in order.
    fallbackImages: [
      U("photo-1503387762-592deb58ef4e", 1400),
      U("photo-1504307651254-35680f356dfd", 1400),
      "/images/work/white-residence.jpg",
      "/images/work/rebar-stair.jpg",
      "/images/work/kitchen-joinery.jpg",
      U("photo-1621905251189-08b45d6a269e", 1400)
    ]
  },

  sectors: {
    eyebrow: "Sectors",
    heading: "Where we build",
    items: [
      { name: "Residential", text: "Independent houses, villas, duplexes and apartments.", image: U("photo-1558036117-15d82a90b9b1", 1400) },
      { name: "Commercial", text: "Showrooms, offices, clinics and mixed-use buildings.", image: U("photo-1486406146926-c627a92ad1ab", 1400) },
      { name: "Institutional", text: "Schools, community halls and religious buildings.", image: U("photo-1487958449943-2429e8be8625", 1400) },
      { name: "Industrial", text: "Warehouses, sheds and pre-engineered structures.", image: U("photo-1541888946425-d81bb19240f5", 1400) },
      { name: "Renovation", text: "Extensions, retrofits and structural strengthening.", image: "/images/work/interior-shell.jpg" }
    ]
  },

  projectsSection: {
    eyebrow: "Featured work",
    heading: "Recent projects",
    linkLabel: "All projects",
    linkHref: "/projects"
  },

  gallerySection: {
    eyebrow: "Gallery",
    heading: "Designed and built by our team",
    intro: "Exteriors, interiors and 3D walkthroughs from recent work.",
    linkLabel: "Open the gallery",
    videosEyebrow: "Videos",
    videosHeading: "Walkthroughs",
    videosIntro: "Short walkthroughs of interiors we have designed."
  },

  about: {
    eyebrow: "About us",
    heading: "Engineers first. Builders by commitment.",
    body:
      "Aarnav Structura started as a structural design office. Clients kept asking us to build what we designed, so we did — and we kept the same engineering discipline on site.\n\nToday we take on a limited number of projects each year so that a senior engineer is responsible for every one of them.",
    image: "/images/work/villa-dusk.jpg",
    values: [
      { title: "Safety", text: "Every structure is designed to Indian Standard codes and checked twice." },
      { title: "Transparency", text: "Itemised BOQs, milestone billing and photos from site every week." },
      { title: "Ownership", text: "One engineer answers for your project from design to handover." },
      { title: "Craft", text: "We care about the finish as much as the foundation." }
    ]
  },

  process: {
    eyebrow: "How we work",
    heading: "From first call to final delivery",
    steps: [
      { title: "Consult", text: "Site visit, requirements and a realistic budget." },
      { title: "Design", text: "Architecture, structure and services drawn together." },
      { title: "Approve", text: "Sanction drawings and an itemised BOQ you sign off." },
      { title: "Build", text: "Supervised construction with quality checks at every stage." },
      { title: "Handover", text: "Snag list closed, documents handed over, keys delivered." }
    ]
  },

  cta: {
    heading: "Have a site? Let's talk about what it can hold.",
    text: "Book a free consultation with one of our engineers.",
    buttonLabel: "Start a project",
    buttonLink: "/contact",
    image: U("photo-1541888946425-d81bb19240f5")
  },

  contact: {
    heading: "Start a conversation",
    text: "Tell us about your site and what you want to build. We usually reply within one working day.",
    phone: "+91 77603 76348",
    whatsapp: "+91 87623 98728",
    email: "aarnav.structura@gmail.com",
    address: "Shivamogga, Karnataka, India",
    hours: "Mon – Sat, 9:30 am – 6:30 pm",
    mapEmbedUrl: "https://www.google.com/maps?q=Shivamogga,Karnataka&output=embed"
  },

  footer: {
    tagline: "Civil, structural and architectural engineering — planned properly and built to last.",
    copyright: "© {year} Aarnav Structura. All rights reserved.",
    instagram: "",
    facebook: "",
    linkedin: "",
    youtube: ""
  },

  pageHeaders: {
    aboutTitle: "About Us",
    aboutImage: "/images/gallery/villa-at-dusk.jpg",
    whatWeDoTitle: "What We Do",
    whatWeDoImage: "/images/gallery/apartment-facade.jpg",
    projectsTitle: "Projects",
    projectsImage: "/images/work/white-residence.jpg",
    galleryTitle: "Gallery",
    galleryImage: "/images/gallery/board-room.jpg",
    teamTitle: "Our Team",
    teamImage: "/images/work/site-masonry.jpg",
    contactTitle: "Contact",
    contactImage: "/images/gallery/entrance-driveway.jpg"
  },

  seo: {
    title: "Aarnav Structura — Civil, Structural & Architectural Engineering, Shivamogga",
    description:
      "Architectural planning, structural engineering and turnkey construction for homes and commercial buildings across Karnataka."
  }
};

export const CONTENT_KEYS = Object.keys(CONTENT_DEFAULTS);

const isPlainObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);

/**
 * Saved values win over defaults. Objects merge key by key (so a field added to
 * the defaults later still shows up); arrays and plain values are replaced
 * entirely by what the admin saved.
 */
export function mergeWithDefaults(defaults, saved) {
  if (saved === undefined || saved === null) return defaults;
  if (!isPlainObject(defaults) || !isPlainObject(saved)) return saved;
  const out = { ...defaults };
  for (const [k, v] of Object.entries(saved)) {
    out[k] = k in defaults ? mergeWithDefaults(defaults[k], v) : v;
  }
  return out;
}

/**
 * Default gallery items. Inserted into the Gallery collection the first time the
 * server starts with an empty gallery; after that they are managed under
 * "Gallery" in the dashboard like any other item.
 */
export const GALLERY_DEFAULTS = [
  {
    "title": "Residential apartment",
    "category": "Exteriors",
    "image": "/images/gallery/residential-apartment.jpg",
    "mediaType": "image",
    "featured": true,
    "display_order": 1
  },
  {
    "title": "Apartment façade",
    "category": "Exteriors",
    "image": "/images/gallery/apartment-facade.jpg",
    "mediaType": "image",
    "featured": false,
    "display_order": 2
  },
  {
    "title": "Contemporary villa",
    "category": "Exteriors",
    "image": "/images/gallery/contemporary-villa.jpg",
    "mediaType": "image",
    "featured": true,
    "display_order": 3
  },
  {
    "title": "Villa at dusk",
    "category": "Exteriors",
    "image": "/images/gallery/villa-at-dusk.jpg",
    "mediaType": "image",
    "featured": false,
    "display_order": 4
  },
  {
    "title": "Curved-roof residence",
    "category": "Exteriors",
    "image": "/images/gallery/curved-roof-residence.jpg",
    "mediaType": "image",
    "featured": true,
    "display_order": 5
  },
  {
    "title": "Entrance & driveway",
    "category": "Exteriors",
    "image": "/images/gallery/entrance-driveway.jpg",
    "mediaType": "image",
    "featured": false,
    "display_order": 6
  },
  {
    "title": "Completed residence",
    "category": "Exteriors",
    "image": "/images/gallery/completed-residence.jpg",
    "mediaType": "image",
    "featured": false,
    "display_order": 7
  },
  {
    "title": "Director's cabin",
    "category": "Interiors",
    "image": "/images/gallery/directors-cabin.jpg",
    "mediaType": "image",
    "featured": true,
    "display_order": 8
  },
  {
    "title": "Executive cabin",
    "category": "Interiors",
    "image": "/images/gallery/executive-cabin-marble.jpg",
    "mediaType": "image",
    "featured": false,
    "display_order": 9
  },
  {
    "title": "Executive desk",
    "category": "Interiors",
    "image": "/images/gallery/executive-desk.jpg",
    "mediaType": "image",
    "featured": false,
    "display_order": 10
  },
  {
    "title": "Board room",
    "category": "Interiors",
    "image": "/images/gallery/board-room.jpg",
    "mediaType": "image",
    "featured": true,
    "display_order": 11
  },
  {
    "title": "Lounge",
    "category": "Interiors",
    "image": "/images/gallery/lounge.jpg",
    "mediaType": "image",
    "featured": false,
    "display_order": 12
  },
  {
    "title": "Client lounge",
    "category": "Interiors",
    "image": "/images/gallery/client-lounge.jpg",
    "mediaType": "image",
    "featured": true,
    "display_order": 13
  },
  {
    "title": "Conference room",
    "category": "Interiors",
    "image": "/images/gallery/conference-room-glass.jpg",
    "mediaType": "image",
    "featured": false,
    "display_order": 14
  },
  {
    "title": "Lounge & display",
    "category": "Interiors",
    "image": "/images/gallery/lounge-display.jpg",
    "mediaType": "image",
    "featured": false,
    "display_order": 15
  },
  {
    "title": "Waiting area",
    "category": "Interiors",
    "image": "/images/gallery/waiting-area.jpg",
    "mediaType": "image",
    "featured": false,
    "display_order": 16
  },
  {
    "title": "Reception",
    "category": "Interiors",
    "image": "/images/gallery/reception.jpg",
    "mediaType": "image",
    "featured": false,
    "display_order": 17
  },
  {
    "title": "Reception desk",
    "category": "Interiors",
    "image": "/images/gallery/reception-desk.jpg",
    "mediaType": "image",
    "featured": false,
    "display_order": 18
  },
  {
    "title": "Cabin with shelving",
    "category": "Interiors",
    "image": "/images/gallery/cabin-shelving.jpg",
    "mediaType": "image",
    "featured": false,
    "display_order": 19
  },
  {
    "title": "Lounge seating",
    "category": "Interiors",
    "image": "/images/gallery/lounge-seating.jpg",
    "mediaType": "image",
    "featured": false,
    "display_order": 20
  },
  {
    "title": "Manager's cabin",
    "category": "Interiors",
    "image": "/images/gallery/managers-cabin.jpg",
    "mediaType": "image",
    "featured": false,
    "display_order": 21
  },
  {
    "title": "Cabin",
    "category": "Interiors",
    "image": "/images/gallery/cabin-artwork.jpg",
    "mediaType": "image",
    "featured": false,
    "display_order": 22
  },
  {
    "title": "Director's cabin",
    "category": "Interiors",
    "image": "/images/gallery/directors-cabin-2.jpg",
    "mediaType": "image",
    "featured": false,
    "display_order": 23
  },
  {
    "title": "Cabin",
    "category": "Interiors",
    "image": "/images/gallery/cabin-2.jpg",
    "mediaType": "image",
    "featured": false,
    "display_order": 24
  },
  {
    "title": "Cabin",
    "category": "Interiors",
    "image": "/images/gallery/cabin-3.jpg",
    "mediaType": "image",
    "featured": false,
    "display_order": 25
  },
  {
    "title": "Conference room",
    "category": "Interiors",
    "image": "/images/gallery/conference-room.jpg",
    "mediaType": "image",
    "featured": false,
    "display_order": 26
  },
  {
    "title": "Conference room",
    "category": "Interiors",
    "image": "/images/gallery/conference-room-2.jpg",
    "mediaType": "image",
    "featured": false,
    "display_order": 27
  },
  {
    "title": "Open workspace",
    "category": "Interiors",
    "image": "/images/gallery/open-workspace.jpg",
    "mediaType": "image",
    "featured": false,
    "display_order": 28
  },
  {
    "title": "Workstations",
    "category": "Interiors",
    "image": "/images/gallery/workstations.jpg",
    "mediaType": "image",
    "featured": false,
    "display_order": 29
  },
  {
    "title": "Open office",
    "category": "Interiors",
    "image": "/images/gallery/open-office.jpg",
    "mediaType": "image",
    "featured": false,
    "display_order": 30
  },
  {
    "title": "Open office",
    "category": "Interiors",
    "image": "/images/gallery/open-office-2.jpg",
    "mediaType": "image",
    "featured": false,
    "display_order": 31
  },
  {
    "title": "Bedroom & wardrobe",
    "category": "Videos",
    "image": "/videos/bedroom-wardrobe-walkthrough.mp4",
    "poster": "/videos/bedroom-wardrobe-walkthrough.jpg",
    "mediaType": "video",
    "featured": true,
    "display_order": 101
  },
  {
    "title": "Master bedroom",
    "category": "Videos",
    "image": "/videos/master-bedroom-walkthrough.mp4",
    "poster": "/videos/master-bedroom-walkthrough.jpg",
    "mediaType": "video",
    "featured": true,
    "display_order": 102
  },
  {
    "title": "Living room",
    "category": "Videos",
    "image": "/videos/living-room-walkthrough.mp4",
    "poster": "/videos/living-room-walkthrough.jpg",
    "mediaType": "video",
    "featured": true,
    "display_order": 103
  },
  {
    "title": "Bedroom ceiling detail",
    "category": "Videos",
    "image": "/videos/bedroom-ceiling-walkthrough.mp4",
    "poster": "/videos/bedroom-ceiling-walkthrough.jpg",
    "mediaType": "video",
    "featured": true,
    "display_order": 104
  }
];
