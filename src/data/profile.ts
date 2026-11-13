// Everything about Vincent that appears on more than one page lives here.
// Items marked VERIFY are listed in docs/CONTENT-VERIFICATION.md and should be confirmed before launch.
export const profile = {
  name: 'Vincent Lancin', // VERIFY: surname taken from the previous portfolio
  firstName: 'Vincent',
  role: 'Technical SEO Specialist, Web Developer and Automation Engineer',
  shortRole: 'Technical SEO, web development and automation',
  location: 'Philippines',
  market: 'US businesses and agencies',
  email: 'virtualtechvincent@gmail.com', // VERIFY: from the previous portfolio
  linkedin: 'https://linkedin.com/in/vincentlancin', // VERIFY: from the previous portfolio
  // VERIFY: the previous site linked a GoHighLevel booking calendar. Paste its URL here to show "Book a call" on /contact/.
  bookingUrl: '',
  knowsAbout: [
    'Technical SEO',
    'Answer Engine Optimization',
    'Generative Engine Optimization',
    'Structured data',
    'Website development',
    'GoHighLevel',
    'Workflow automation',
    'API integrations',
  ],
  mainAction: 'Discuss a project',
} as const;

export const indexable = process.env.ALLOW_INDEXING === 'true' && !!process.env.SITE_URL;
