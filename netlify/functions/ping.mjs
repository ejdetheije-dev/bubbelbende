// Stuurt een Pushover-bericht als iemand anders Bubbelbende echt speelt.
// Zet in Netlify twee omgevingsvariabelen: PUSHOVER_TOKEN (app-token) en PUSHOVER_USER (jouw user key).
export default async (req, context) => {
  const token = (process.env.PUSHOVER_TOKEN || '').trim();
  const user = (process.env.PUSHOVER_USER || '').trim();
  if (req.method === 'GET') return Response.json({ token: (token || '').length, user: (user || '').length });
  if (req.method !== 'POST') return new Response('Alleen POST', { status: 405 });
  if (!token || !user) return new Response('Pushover niet ingesteld', { status: 500 });

  let d = {};
  try { d = await req.json(); } catch { return new Response('Ongeldig bericht', { status: 400 }); }

  const num = v => Math.max(0, Math.min(1e9, Math.floor(Number(v) || 0)));
  const wave = num(d.wave), score = num(d.score), secs = num(d.secs);
  const plek = [context?.geo?.city, context?.geo?.country?.name].filter(Boolean).join(', ') || 'onbekende plek';
  const toestel = /iphone|ipad/i.test(d.ua || '') ? 'iPhone' : /android/i.test(d.ua || '') ? 'Android' : 'computer';

  let title, message;
  if (d.event === 'klaar') {
    title = 'Bubbelbende: potje klaar';
    message = `Score ${score.toLocaleString('nl-NL')}, golf ${wave}, ${Math.round(secs / 60)} min gespeeld (${toestel}, ${plek}).`;
  } else if (d.event === 'speelt') {
    title = 'Bubbelbende wordt gespeeld';
    message = `Iemand speelt nu, al bij golf ${wave} met ${score.toLocaleString('nl-NL')} punten (${toestel}, ${plek}).`;
  } else {
    return new Response('Onbekend event', { status: 400 });
  }

  const body = new URLSearchParams({ token, user, title, message, url: 'https://bubbelbende.netlify.app', url_title: 'Open Bubbelbende' });
  const r = await fetch('https://api.pushover.net/1/messages.json', { method: 'POST', body });
  return new Response(r.ok ? 'ok' : 'pushover fout', { status: r.ok ? 200 : 502 });
};
