export const readingTime = (body: string) => Math.max(1, Math.round(body.trim().split(/\s+/).length / 220));
export const formatDate = (d: Date) => d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
