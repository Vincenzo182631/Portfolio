const SKILLS = [
  { area: "Planning & Strategy", icon: "🧭", items: ["Requirements gathering", "Sitemaps & information architecture", "User personas", "Competitor research", "Project scoping & estimates", "Content strategy"] },
  { area: "UI / UX Design", icon: "🎨", items: ["Wireframing", "Prototyping", "Figma", "Responsive / mobile-first design", "Typography & color theory", "Design systems", "Usability testing"] },
  { area: "Front-End", icon: "💻", items: ["HTML5 (semantic markup)", "CSS3, Flexbox & Grid", "JavaScript (ES6+)", "TypeScript", "React", "Next.js", "Vue", "Tailwind CSS", "Sass", "Animations & micro-interactions"] },
  { area: "Back-End", icon: "⚙️", items: ["Node.js / Express", "REST APIs", "GraphQL", "PHP", "Python", "Authentication & sessions", "Serverless functions", "Webhooks & integrations"] },
  { area: "Databases", icon: "🗄️", items: ["PostgreSQL", "MySQL", "Supabase", "Firebase", "MongoDB", "Data modeling"] },
  { area: "CMS & No-Code", icon: "🧩", items: ["WordPress", "Webflow", "Shopify", "Wix / Squarespace", "Headless CMS (Sanity, Strapi)", "GoHighLevel"] },
  { area: "E-commerce & Payments", icon: "🛒", items: ["Product catalogs", "Stripe / PayPal", "Checkout flows", "Booking systems"] },
  { area: "SEO", icon: "🔍", items: ["Keyword research", "On-page SEO", "Technical SEO", "Schema / structured data", "Sitemaps & robots.txt", "Local SEO", "Google Search Console"] },
  { area: "Performance", icon: "⚡", items: ["Core Web Vitals", "Image optimization", "Lazy loading", "Caching & CDN", "Code splitting", "Lighthouse audits"] },
  { area: "Accessibility", icon: "♿", items: ["WCAG 2.1 AA", "Keyboard navigation", "ARIA", "Color contrast", "Screen-reader testing"] },
  { area: "Security", icon: "🔒", items: ["HTTPS / SSL", "Form validation & sanitization", "OWASP basics", "Secrets management", "Backups"] },
  { area: "Testing & QA", icon: "🧪", items: ["Cross-browser testing", "Unit testing", "End-to-end testing (Playwright)", "Debugging with DevTools"] },
  { area: "Deployment & DevOps", icon: "🚀", items: ["Git & GitHub", "CI/CD", "Vercel / Netlify", "Cloudflare", "Domains & DNS", "Hosting & server setup"] },
  { area: "Analytics & Marketing", icon: "📈", items: ["Google Analytics 4", "Tag Manager", "Conversion tracking", "A/B testing", "Email capture & marketing", "Landing pages"] },
  { area: "Content & Copy", icon: "✍️", items: ["Web copywriting", "UX writing", "Image editing", "Brand voice"] },
  { area: "AI & Automation", icon: "🤖", items: ["AI-assisted development", "Chatbots", "Workflow automation (Zapier, Make)", "API integrations"] },
  { area: "Soft Skills", icon: "🤝", items: ["Client communication", "Project management", "Problem solving", "Documentation"] }
];

const filtersEl = document.getElementById("filters");
const gridEl = document.getElementById("skills-grid");
let active = "All";

function renderFilters() {
  filtersEl.innerHTML = "";
  ["All", ...SKILLS.map(s => s.area)].forEach(name => {
    const b = document.createElement("button");
    b.textContent = name;
    b.className = "chip" + (name === active ? " active" : "");
    b.setAttribute("aria-pressed", name === active);
    b.onclick = () => { active = name; renderFilters(); renderGrid(); };
    filtersEl.appendChild(b);
  });
}

function renderGrid() {
  gridEl.innerHTML = "";
  SKILLS.filter(s => active === "All" || s.area === active).forEach(s => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `<h3><span aria-hidden="true">${s.icon}</span> ${s.area}</h3>
      <ul class="tags">${s.items.map(i => `<li>${i}</li>`).join("")}</ul>`;
    gridEl.appendChild(card);
  });
}

renderFilters();
renderGrid();
document.getElementById("year").textContent = new Date().getFullYear();
