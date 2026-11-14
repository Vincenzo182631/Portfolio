// Service pages are generated from this file (src/pages/services/[slug].astro).
// Edit copy here; every string is published as written.

export type ServiceSlug = 'technical-seo' | 'website-development' | 'automation' | 'gohighlevel';

export interface Faq { q: string; a: string }
export interface Block { title: string; text: string }
export interface DeepDive { id: string; heading: string; intro: string; points: string[]; note?: string }

export interface Service {
  slug: ServiceSlug;
  name: string;
  short: string;
  metaTitle: string;
  description: string;
  h1: string;
  lead: string;
  homeLine: string;
  who: string[];
  problems: Block[];
  approach: Block[];
  capabilities: string[];
  deepDives?: DeepDive[];
  flow?: { heading: string; intro: string; steps: { label: string; detail: string }[] };
  deliverables: string[];
  faqs: Faq[];
  projects: string[];
  related: ServiceSlug[];
  inquiry: { label: string; value: string; heading: string; line: string };
}

export const services: Service[] = [
  {
    slug: 'technical-seo',
    name: 'Technical SEO, AEO and GEO',
    short: 'Technical SEO',
    metaTitle: 'Technical SEO, AEO and GEO services',
    description:
      'Technical SEO audits, structured data, and content structure for search engines and AI answer systems, implemented directly in your website code.',
    h1: 'Technical SEO, AEO and GEO, implemented in your code',
    lead:
      'I audit how search engines crawl, render and understand your website, then I make the fixes myself: templates, metadata, structured data, internal links and page speed. The same foundation is what answer engines and AI search tools read.',
    homeLine: 'Audits, structured data and content structure, with the fixes made in your code.',
    who: [
      'Businesses whose pages are slow to get indexed, or indexed under the wrong URLs',
      'Sites with hundreds of similar pages, such as hotels, locations, products or events',
      'Teams that already have an SEO audit and nobody to implement it',
      'Agencies that need a technical partner behind their content and strategy work',
    ],
    problems: [
      { title: 'Pages that search engines cannot reach or trust', text: 'Blocked resources, redirect chains, parameter URLs and missing canonicals split signals across duplicates. I trace each one to the template or rule that creates it.' },
      { title: 'Content that answers the question too late', text: 'A page can rank and still lose the click, or be skipped by an answer engine, because the answer sits under four paragraphs of introduction.' },
      { title: 'Structured data that is missing, invalid or untrue', text: 'Markup has to describe what is visibly on the page. I write JSON-LD from your real content and validate it before it ships.' },
      { title: 'An audit that never left the PDF', text: 'Recommendations only help once they are live. I prioritize by effort and effect, then implement in the codebase or hand over tickets your developer can act on.' },
    ],
    approach: [
      { title: 'Crawl and index review', text: 'I crawl the site, compare it with the XML sitemap and Search Console coverage, and list what is indexed, excluded and why.' },
      { title: 'Template-level fixes', text: 'Titles, descriptions, canonicals, headings, robots directives and hreflang are fixed in the template that generates them, so one change corrects every page of that type.' },
      { title: 'Structured data', text: 'JSON-LD for the entities you really have: organization, person, service, article, product, hotel, FAQ, breadcrumb. Validated with the Schema Markup Validator and the Rich Results Test.' },
      { title: 'Performance', text: 'Largest Contentful Paint, Interaction to Next Paint and Cumulative Layout Shift, measured on mobile. Images, fonts and scripts are the usual causes, in that order.' },
      { title: 'Content structure', text: 'Search intent per page, one clear topic per URL, answer-first sections, descriptive headings and internal links that connect related pages.' },
    ],
    capabilities: [
      'Technical site audits', 'Crawlability and indexability', 'XML sitemaps', 'Robots directives', 'Canonical URLs', 'Page architecture', 'Core Web Vitals', 'Mobile usability', 'Redirect management', 'Broken link analysis', 'Structured data and JSON-LD', 'Search Console diagnostics', 'JavaScript rendering checks', 'Keyword mapping', 'Titles and descriptions', 'Heading structure', 'Image optimization', 'Internal linking',
    ],
    deepDives: [
      {
        id: 'on-page',
        heading: 'On-page SEO',
        intro: 'On-page work decides which page answers which search, and makes that page the clearest result for it.',
        points: [
          'Search intent analysis: what the person wants to do, learn or compare',
          'Keyword mapping, one primary topic per URL, so pages do not compete with each other',
          'Page titles and descriptions written for the click as well as the query',
          'Heading structure that outlines the page for readers and crawlers',
          'Image file size, dimensions, format and alt text',
          'Internal links with descriptive anchor text',
          'Landing pages that keep the next step, an inquiry or a booking, in view',
        ],
      },
      {
        id: 'aeo',
        heading: 'AEO: answer engine optimization',
        intro: 'AEO means structuring content so a direct question gets a direct, accurate answer. Featured snippets, "People also ask" results, voice assistants and AI overviews all draw on pages that state the answer plainly and support it.',
        points: [
          'Question-driven sections built from the questions customers really ask',
          'An answer in the first one or two sentences, context after',
          'FAQ content architecture, on the page first and in FAQPage markup where it fits',
          'Clear entities: who you are, what you offer, where, for whom',
          'Semantic HTML: headings, lists, tables and definitions used for what they mean',
          'Structured data that matches the visible content',
        ],
        note: 'FAQ markup helps machines read a page. It does not guarantee a rich result, and I do not sell it as one.',
      },
      {
        id: 'geo',
        heading: 'GEO: generative engine optimization',
        intro: 'GEO is an emerging discipline. It asks how AI-powered search and answer systems, such as ChatGPT, Gemini, Claude and Perplexity, find, read and reference information, and it improves the clarity, credibility and discoverability of yours.',
        points: [
          'Entity consistency: the same name, description and details everywhere you are listed',
          'Factual, structured content that can be quoted without rewriting',
          'Credible author and business information on the page',
          'Original expertise and first-hand detail that other pages do not have',
          'Crawlable pages: content in the HTML, no blocked resources',
          'Topic coverage that answers the follow-up questions',
          'Visibility monitoring where it can be measured, such as referral traffic from AI tools',
        ],
        note: 'Nobody can promise a citation or a mention in an AI answer. What I can do is make your information easy to retrieve, hard to misread and worth referencing. I treat llms.txt as optional and experimental.',
      },
    ],
    deliverables: [
      'Technical audit with findings ranked by effect and effort',
      'Crawl and indexation report against Search Console data',
      'Metadata rewrite for priority templates and pages',
      'JSON-LD implemented and validated',
      'Site architecture and internal linking changes',
      'Content structure recommendations per page type',
      'Core Web Vitals fixes with before and after lab measurements',
      'Implementation notes your team can maintain',
    ],
    faqs: [
      { q: 'What is the difference between SEO, AEO and GEO?', a: 'SEO helps pages rank in search results. AEO structures content so it can be used as a direct answer. GEO improves how AI answer systems find and reference your information. All three rest on the same base: crawlable pages, clear content and accurate structured data.' },
      { q: 'Do you implement the fixes or only report them?', a: 'I implement them. I work in HTML, CSS, JavaScript, templates and CMS settings. Where I do not have access to a system, I write the change as a ticket your developer can apply.' },
      { q: 'Can you guarantee rankings or AI citations?', a: 'No, and nobody honestly can. I can make sure search engines and AI systems are able to crawl, understand and trust your pages, and I report what changed.' },
      { q: 'How long does a technical audit take?', a: 'It depends on the size of the site and the access I have. After a first look at your site and Search Console I give you a scope and a timeline before any work starts.' },
      { q: 'Do I need a new website to fix technical SEO?', a: 'Usually not. Most problems are fixed in templates, settings and content. If the platform itself is the limit, I will say so and explain the options.' },
    ],
    projects: ['whatahotel', 'lorraine-travel', 'live-how-you-want'],
    related: ['website-development', 'automation'],
    inquiry: { label: 'Request an SEO review', value: 'Technical SEO / AEO / GEO', heading: 'Find out what is holding your pages back', line: 'Send me your URL and what you have noticed. I reply with what I would look at first.' },
  },
  {
    slug: 'website-development',
    name: 'Website design and development',
    short: 'Website development',
    metaTitle: 'Website design and development, built SEO-ready',
    description:
      'Custom, responsive websites in HTML, CSS and JavaScript, deployed on Cloudflare Pages, with SEO architecture, performance and integrations built in.',
    h1: 'Websites built SEO-ready, fast and easy to maintain',
    lead:
      'I design and build responsive websites in HTML, CSS and JavaScript and deploy them on Cloudflare Pages. Search architecture, performance and the connection to your CRM are part of the build, not a later project.',
    homeLine: 'Responsive sites in HTML, CSS and JavaScript on Cloudflare Pages, search-ready from the first commit.',
    who: [
      'Businesses replacing a slow or dated website without losing the rankings and links it has earned',
      'Travel, hospitality and service companies that need pages for many offers, places or dates',
      'Teams that want a site they can edit without a developer for every change',
      'Agencies that need a build partner who understands SEO requirements',
    ],
    problems: [
      { title: 'A redesign that loses search traffic', text: 'New URLs without redirects, dropped content and changed titles are the usual causes. I map old URLs to new ones before launch and keep what already performs.' },
      { title: 'Pages that look right and load slowly', text: 'Oversized images, render-blocking scripts and web fonts cost seconds on mobile. I set a performance budget and build to it.' },
      { title: 'A site that cannot be changed safely', text: 'Copied and pasted pages drift apart. I build from shared layouts and content files so a change is made once.' },
      { title: 'Forms that lead nowhere', text: 'A form should create a contact, notify the right person and start the follow-up. I connect it to your CRM or email platform.' },
    ],
    approach: [
      { title: 'Structure before design', text: 'Pages, URLs, navigation and internal links are planned from what people search for and what the business sells.' },
      { title: 'Semantic, accessible HTML', text: 'One h1, ordered headings, labelled forms, keyboard navigation and readable contrast. It helps people first, and crawlers read the same structure.' },
      { title: 'Performance by default', text: 'Static rendering where possible, responsive images in modern formats, little JavaScript, and layouts that do not shift while loading.' },
      { title: 'Deployment on Cloudflare', text: 'Git-based deploys to Cloudflare Pages with preview builds, redirects, caching and security headers. Workers handle forms and small server tasks.' },
      { title: 'Launch checks', text: 'Redirects, canonicals, sitemap, robots file, structured data, analytics and forms are tested on the preview build before the domain is switched.' },
    ],
    capabilities: [
      'Custom responsive websites', 'Website redesigns', 'SEO-ready architecture', 'Performance optimization', 'Accessibility', 'Conversion-focused UX', 'Cloudflare Pages deployment', 'Landing pages and funnels', 'Bubble websites and applications', 'Embedded forms and integrations', 'Redirect mapping', 'Technical maintenance',
    ],
    deliverables: [
      'Sitemap and URL plan with redirect map',
      'Responsive page templates and components',
      'Metadata, structured data, XML sitemap and robots file',
      'Forms connected to your CRM or inbox',
      'Deployment pipeline on Cloudflare Pages',
      'Lighthouse report for key templates',
      'A short guide to editing content',
    ],
    faqs: [
      { q: 'Which platforms do you build on?', a: 'Mostly hand-written HTML, CSS and JavaScript, or a static site generator such as Astro, deployed on Cloudflare Pages. I also build and maintain Bubble sites and applications.' },
      { q: 'Will my rankings drop after a redesign?', a: 'They do not have to. I keep the URLs that perform, redirect the ones that change, carry over the content that ranks and check indexation after launch.' },
      { q: 'Can you work with my existing design?', a: 'Yes. I can build from a design file, extend your current site, or design the pages myself.' },
      { q: 'Do you maintain the site after launch?', a: 'Yes, as a project or an ongoing arrangement: content updates, new pages, performance checks and fixes.' },
    ],
    projects: ['lorraine-travel', 'live-how-you-want', 'whatahotel'],
    related: ['technical-seo', 'gohighlevel'],
    inquiry: { label: 'Send your website brief', value: 'Website development', heading: 'Planning a new site or a redesign', line: 'Tell me what the site has to do and what it runs on today.' },
  },
  {
    slug: 'automation',
    name: 'Business workflow automation',
    short: 'Workflow automation',
    metaTitle: 'Workflow automation: APIs, webhooks and n8n',
    description:
      'Workflow automation for lead routing, follow-up, notifications and data sync, built with webhooks, REST APIs, n8n and Cloudflare Workers.',
    h1: 'Workflow automation for the work between your tools',
    lead:
      'I connect the tools a business already uses, so a form submission, a booking or a webinar registration starts the next step without anyone copying data by hand. I build with webhooks, REST APIs, n8n and Cloudflare Workers.',
    homeLine: 'Webhooks, APIs and n8n workflows that route leads, send follow-ups and keep records in sync.',
    who: [
      'Teams that copy the same details between a form, a spreadsheet, a CRM and an inbox',
      'Businesses where a new lead waits because nobody was notified',
      'Companies running webinars, events or campaigns with many timed messages',
      'Owners who want fewer manual steps without buying another platform',
    ],
    problems: [
      { title: 'Manual lead assignment', text: 'A lead arrives and waits for someone to read it, decide whose it is and forward it. A rule can do that in seconds.' },
      { title: 'Disconnected apps', text: 'The form, the CRM, the calendar and the email tool each hold part of the record. An integration keeps one version.' },
      { title: 'Missed follow-ups', text: 'Follow-up that depends on memory gets skipped on busy days. A workflow sends it on time and stops when the person replies.' },
      { title: 'Repetitive admin', text: 'Confirmations, reminders, status updates and internal notifications are the same message with different names.' },
      { title: 'Webinar and event follow-up', text: 'Who registered, who attended and who left early decide what each person should hear next.' },
      { title: 'Data that drifts apart', text: 'Contact updates made in one system and not the other. A sync, with a clear owner for each field, ends the guessing.' },
    ],
    approach: [
      { title: 'Map the process first', text: 'I write down what happens today, who does it and where it breaks, before choosing a tool.' },
      { title: 'Pick the simplest trigger', text: 'A webhook when the source can send one, a scheduled check when it cannot.' },
      { title: 'Build in small, testable steps', text: 'Each step has one job: receive, validate, transform, send. Failures are logged and reported, not silent.' },
      { title: 'Document and hand over', text: 'You get a diagram of each workflow, what triggers it, what it changes and how to pause it.' },
    ],
    capabilities: [
      'Lead capture and routing', 'Webhooks', 'REST API integrations', 'n8n workflows', 'Cloudflare Workers', 'Email and messaging automation', 'Zoom integrations', 'Notifications and alerts', 'Data synchronization', 'Operational workflow design', 'Custom internal tools', 'AI integrations where they earn their place',
    ],
    flow: {
      heading: 'How an event-driven workflow runs',
      intro: 'Most automations follow the same four parts. Something happens, the data is checked, the right actions run, and the result is recorded.',
      steps: [
        { label: 'Event', detail: 'A form is submitted, a booking is made or a webinar ends.' },
        { label: 'Check', detail: 'The data is validated, cleaned and matched to an existing contact.' },
        { label: 'Act', detail: 'The contact is tagged, the owner is notified and the first message is sent.' },
        { label: 'Record', detail: 'The CRM is updated and any failure is logged for review.' },
      ],
    },
    deliverables: [
      'Process map of the current and the automated flow',
      'Working workflows in your own accounts',
      'Error handling and failure notifications',
      'Test cases run before go-live',
      'Documentation for each workflow',
    ],
    faqs: [
      { q: 'Which tools do you automate with?', a: 'GoHighLevel workflows, n8n, webhooks, REST APIs and Cloudflare Workers. I choose based on what you already pay for and who will maintain it.' },
      { q: 'Do I need to change my current software?', a: 'Usually not. Most of the work is connecting what you have. I suggest a change only when a tool cannot send or receive the data.' },
      { q: 'What happens when an automation fails?', a: 'Every workflow I build reports its failures, by email or in a channel you choose, with enough detail to retry or fix it.' },
      { q: 'Can you add AI to a workflow?', a: 'Where it helps, such as drafting a reply, classifying a request or answering questions from your own content. I have built conversational and voice prototypes with Tavus, ElevenLabs and LiveKit, and I treat them as prototypes until they are proven in use.' },
    ],
    projects: ['sunny-braids', 'live-how-you-want', 'ai-hotel-concierge'],
    related: ['gohighlevel', 'website-development'],
    inquiry: { label: 'Send a workflow to review', value: 'Workflow automation', heading: 'Have a process that eats hours every week', line: 'Describe the steps as they happen today. I reply with what can be automated and what should stay manual.' },
  },
  {
    slug: 'gohighlevel',
    name: 'GoHighLevel CRM and marketing automation',
    short: 'GoHighLevel',
    metaTitle: 'GoHighLevel specialist for CRM and workflows',
    description:
      'GoHighLevel setup and automation: pipelines, workflows, Smart Lists, email campaigns, forms and webhook integrations, built around your sales process.',
    h1: 'GoHighLevel CRM and automation, designed around your process',
    lead:
      'I set up and repair GoHighLevel accounts: pipelines, workflows, tags, Smart Lists, forms, calendars and email campaigns. I start from how your business handles a lead, then build the account to match it.',
    homeLine: 'Pipelines, workflows, Smart Lists and campaigns built around how you handle a lead.',
    who: [
      'Businesses that bought GoHighLevel and use a fraction of it',
      'Teams whose workflows have grown into a tangle nobody wants to touch',
      'Coaches, educators and event businesses running webinars and launches',
      'Agencies that need a builder for client sub-accounts',
    ],
    problems: [
      { title: 'A CRM full of contacts and no order', text: 'Without consistent tags, custom fields and Smart Lists, nobody can answer a simple question such as who attended and has not bought.' },
      { title: 'Workflows that overlap', text: 'Two workflows reacting to the same trigger send two messages. I audit triggers, conditions and exits so each contact is in the right place once.' },
      { title: 'Website and CRM that do not talk', text: 'Forms on an external site need to create contacts with the right source, tags and pipeline stage. I connect them with embeds, the API or webhooks.' },
      { title: 'Follow-up that stops after the first email', text: 'A nurture sequence needs timing, conditions and a way out when the person books or replies.' },
    ],
    approach: [
      { title: 'Start with the pipeline', text: 'The stages a lead moves through are agreed before any workflow is built.' },
      { title: 'One naming system', text: 'Tags, fields, workflows and campaigns are named so their purpose is clear to the next person.' },
      { title: 'Workflows with clear entry and exit', text: 'Each has one trigger, documented conditions and a goal event that ends it.' },
      { title: 'Test with real contacts', text: 'I run test contacts through every branch and check the messages, timing and data before go-live.' },
    ],
    capabilities: [
      'CRM organization', 'Opportunity pipelines', 'Workflow automation', 'Smart Lists', 'Contact tagging and segmentation', 'Lead nurturing', 'Email campaigns', 'Web forms and surveys', 'Appointment and follow-up flows', 'Webinar funnels with Zoom', 'API and webhook integrations', 'Funnel and landing page connection',
    ],
    flow: {
      heading: 'From website form to follow-up',
      intro: 'A typical GoHighLevel flow I build for a lead that arrives from a website.',
      steps: [
        { label: 'Form', detail: 'The visitor submits a form on your site or a GoHighLevel funnel.' },
        { label: 'Contact', detail: 'A contact is created or updated, tagged by source and added to the pipeline.' },
        { label: 'Workflow', detail: 'A confirmation is sent, the owner is notified and the nurture sequence begins.' },
        { label: 'Stage', detail: 'A reply, a booking or a purchase moves the opportunity and ends the sequence.' },
      ],
    },
    deliverables: [
      'Pipeline and stage definitions',
      'Tag, custom field and Smart List structure',
      'Built and tested workflows',
      'Email templates and campaign setup',
      'Forms connected to the website',
      'Account documentation and a handover call',
    ],
    faqs: [
      { q: 'Can you fix an existing GoHighLevel account?', a: 'Yes. I start with an audit of pipelines, tags, workflows and forms, then clean up in an order that does not interrupt live campaigns.' },
      { q: 'Can GoHighLevel work with a website built elsewhere?', a: 'Yes. Forms can be embedded, or your own forms can send data through the API or a webhook, so contacts arrive with the right source and tags.' },
      { q: 'Do you build webinar funnels?', a: 'Yes. Registration, confirmation, reminders, Zoom attendance tagging and post-webinar follow-up, including Spanish-language campaigns.' },
      { q: 'Do you write the emails too?', a: 'I can set up and adapt the copy you have, and write plain transactional messages. For campaign copywriting I work with your writer.' },
    ],
    projects: ['sunny-braids', 'live-how-you-want'],
    related: ['automation', 'website-development'],
    inquiry: { label: 'Request an account review', value: 'GoHighLevel', heading: 'Get more from the GoHighLevel account you pay for', line: 'Tell me what the account should be doing. I reply with where I would start.' },
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
