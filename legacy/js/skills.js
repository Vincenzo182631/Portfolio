// Website-building skills. Edit this list to add or remove skills.
const SKILLS = [
  { area: "Planning & Strategy", icon: "fa-compass", items: ["Discovery & requirements", "Sitemap & page structure", "Competitor research", "Conversion strategy", "Content planning", "Project scoping & timelines"] },
  { area: "UI / UX Design", icon: "fa-pen-ruler", items: ["Wireframing", "Figma", "Canva", "Mobile-first responsive design", "Typography & color", "Brand consistency", "User flows"] },
  { area: "Front-End Development", icon: "fa-code", items: ["HTML5", "CSS3, Flexbox & Grid", "JavaScript (ES6+)", "Tailwind CSS", "Animations & carousels", "Custom code embeds"] },
  { area: "Website Builders & CMS", icon: "fa-layer-group", items: ["GoHighLevel Websites", "WordPress + Elementor", "Webflow", "Shopify", "Wix", "Squarespace", "ClickFunnels"] },
  { area: "Funnels & Landing Pages", icon: "fa-filter", items: ["High-converting landing pages", "Sales funnels", "Opt-in forms & surveys", "Order forms, upsells & downsells", "Calendars & booking pages", "A/B split testing", "Thank-you & confirmation flows"] },
  { area: "Integrations & Back-End", icon: "fa-plug", items: ["REST APIs", "Webhooks", "Custom fields & values", "Form-to-CRM connections", "Stripe & PayPal payments", "Supabase / Firebase"] },
  { area: "Automation", icon: "fa-gears", items: ["GoHighLevel Workflows", "Zapier", "Make", "n8n", "Email & SMS sequences", "Lead nurturing", "Pipeline automation"] },
  { area: "SEO", icon: "fa-magnifying-glass", items: ["Keyword research", "On-page SEO", "Meta tags & Open Graph", "Schema markup", "Sitemap & robots.txt", "Local SEO & Google Business Profile", "Google Search Console"] },
  { area: "Performance", icon: "fa-gauge-high", items: ["Image optimization", "Lazy loading", "Core Web Vitals", "Caching & CDN", "PageSpeed audits"] },
  { area: "Accessibility", icon: "fa-universal-access", items: ["Semantic HTML", "Alt text", "Color contrast", "Keyboard navigation", "WCAG basics"] },
  { area: "Security", icon: "fa-shield-halved", items: ["SSL / HTTPS", "Spam protection (reCAPTCHA)", "Form validation", "Backups", "User access management"] },
  { area: "Domains, Hosting & Launch", icon: "fa-rocket", items: ["Domain & DNS setup", "Email DNS (SPF, DKIM, DMARC)", "Hosting setup", "Git & GitHub", "Netlify / Vercel", "Cloudflare"] },
  { area: "Analytics & Tracking", icon: "fa-chart-line", items: ["Google Analytics 4", "Google Tag Manager", "Meta Pixel", "Conversion tracking", "UTM tracking", "Heatmaps (Hotjar)"] },
  { area: "Content & Copy", icon: "fa-pen-nib", items: ["Web copywriting", "CTA writing", "Image editing", "Brand voice"] },
  { area: "Testing & QA", icon: "fa-vial", items: ["Cross-browser testing", "Mobile testing", "Form & workflow testing", "Broken link checks", "Launch checklist"] },
  { area: "AI Tools", icon: "fa-robot", items: ["ChatGPT & Claude", "AI chatbots (Conversation AI)", "AI image generation", "AI-assisted coding"] }
];

// Full class names so Tailwind generates them.
const SKILL_COLORS = [
  { text: "text-neon-blue", border: "border-neon-blue/20 hover:border-neon-blue/60", tag: "bg-neon-blue/10 text-neon-blue" },
  { text: "text-neon-purple", border: "border-neon-purple/20 hover:border-neon-purple/60", tag: "bg-neon-purple/10 text-neon-purple" },
  { text: "text-neon-pink", border: "border-neon-pink/20 hover:border-neon-pink/60", tag: "bg-neon-pink/10 text-neon-pink" }
];

document.addEventListener("DOMContentLoaded", () => {
  const filtersEl = document.getElementById("skills-filters");
  const gridEl = document.getElementById("skills-grid");
  if (!filtersEl || !gridEl) return;
  let active = "All";

  function renderFilters() {
    filtersEl.innerHTML = "";
    ["All", ...SKILLS.map(s => s.area)].forEach(name => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = name;
      b.setAttribute("aria-pressed", name === active);
      b.className = "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 " +
        (name === active
          ? "bg-gradient-to-r from-neon-blue to-neon-purple text-white"
          : "bg-cyber-gray border border-neon-blue/30 text-gray-300 hover:border-neon-blue");
      b.onclick = () => { active = name; renderFilters(); renderGrid(); };
      filtersEl.appendChild(b);
    });
  }

  function renderGrid() {
    gridEl.innerHTML = "";
    SKILLS.forEach((s, i) => {
      if (active !== "All" && s.area !== active) return;
      const c = SKILL_COLORS[i % SKILL_COLORS.length];
      const card = document.createElement("div");
      card.className = `bg-cyber-gray border ${c.border} rounded-xl p-6 transition-all duration-300`;
      card.innerHTML = `
        <div class="flex items-center gap-3 mb-4">
          <i class="fas ${s.icon} text-2xl ${c.text}"></i>
          <h3 class="text-xl font-space font-bold ${c.text}">${s.area}</h3>
        </div>
        <div class="flex flex-wrap gap-2">
          ${s.items.map(item => `<span class="skill-tag px-3 py-1 ${c.tag} text-xs rounded-full">${item}</span>`).join("")}
        </div>`;
      gridEl.appendChild(card);
    });
  }

  renderFilters();
  renderGrid();
});
