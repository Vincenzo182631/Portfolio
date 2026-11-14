// Small, optional enhancements. The site works without this file.
// 1. Conversion hooks: elements with data-track send an event to whichever cookieless analytics is loaded.
// 2. The contact form's service select is preset from ?service=.
const send = (name, props) => {
  try {
    if (typeof window.plausible === 'function') window.plausible(name, { props });
    window.dispatchEvent(new CustomEvent('site:track', { detail: { name, props } }));
  } catch { /* analytics must never break the page */ }
};

document.addEventListener('click', (e) => {
  const el = e.target instanceof Element ? e.target.closest('[data-track]') : null;
  if (el) send('cta_click', { id: el.getAttribute('data-track'), path: location.pathname });
});

const form = document.querySelector('form[data-contact]');
if (form) {
  const wanted = new URLSearchParams(location.search).get('service');
  const select = form.querySelector('select[name="service"]');
  if (wanted && select) for (const o of select.options) if (o.value === wanted) select.value = wanted;
  const status = form.querySelector('[data-form-status]');
  if (status) new MutationObserver(() => {
    if (status.textContent && status.textContent.trim() === (form.dataset.sent || '').trim()) send('contact_form_sent', { path: location.pathname });
  }).observe(status, { childList: true, characterData: true, subtree: true });
}
