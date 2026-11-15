import Globe from 'globe.gl';
import './style.css';
import { PLACES, STATUS_META, type Place } from './places';
import { rank, hms, clock, flag, statusFor, type Status } from './engine';

const BASE = import.meta.env.BASE_URL;
const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const isMobile = () => window.innerWidth < 760;
const byId = new Map(PLACES.map((p) => [p.id, p]));

const rgba = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};

// ---------- state ----------
let following = true; // auto-follow the nearest 4:20
let selectedId: string | null = null; // manual pick when not following
let focusedId: string | null = null; // place the camera last flew to
let renderedId: string | null = null; // place the card currently shows
let featuredId = PLACES[0].id;
let lastInteract = 0;
let ringKey = '';

// ---------- globe ----------
const world = new Globe($('globe'), { animateIn: true })
  .globeImageUrl(`${BASE}textures/earth-blue-marble.jpg`)
  .bumpImageUrl(`${BASE}textures/earth-topology.png`)
  .backgroundImageUrl(`${BASE}textures/night-sky.png`)
  .atmosphereColor('#4ade80')
  .atmosphereAltitude(0.22)
  .pointsData(PLACES)
  .pointLat('lat')
  .pointLng('lng')
  .pointColor((d) => STATUS_META[(d as Place).status].color)
  .pointLabel((d) => {
    const p = d as Place;
    return `<div class="tip"><b>${flag(p.cc)} ${p.city}</b><span>${STATUS_META[p.status].label}</span></div>`;
  })
  .onPointClick((d) => select((d as Place).id))
  .ringsData([])
  .ringLat('lat')
  .ringLng('lng')
  .ringMaxRadius(7)
  .ringPropagationSpeed(2.4)
  .ringRepeatPeriod(1100)
  .labelsData([])
  .labelLat('lat')
  .labelLng('lng')
  .labelText((d) => (d as Place).city)
  .labelSize(1.5)
  .labelDotRadius(0)
  .labelAltitude(0.14)
  .labelColor(() => '#ffffff')
  .labelResolution(3);

const controls = world.controls();
controls.autoRotate = false;
controls.enableDamping = true;
controls.minDistance = 160;
controls.maxDistance = 520;
controls.addEventListener('start', () => (lastInteract = Date.now()));

function fit() {
  // on wide screens keep the globe centred in the space left of the info card
  const w = window.innerWidth >= 1000 ? window.innerWidth - 414 : window.innerWidth;
  // on phones the info card is a bottom sheet, so centre the globe above it
  const h = isMobile() ? Math.round(window.innerHeight * 0.56) : window.innerHeight;
  world.width(w).height(h);
}
fit();
window.addEventListener('resize', fit);
world.pointOfView({ lat: 20, lng: 10, altitude: 3.2 }, 0);

function styleFeatured() {
  world
    .pointAltitude((d) => ((d as Place).id === featuredId ? 0.12 : 0.02))
    .pointRadius((d) => ((d as Place).id === featuredId ? 0.6 : 0.28));
}

function focus(place: Place) {
  world.pointOfView({ lat: place.lat, lng: place.lng, altitude: isMobile() ? 2.3 : 1.7 }, 2200);
  focusedId = place.id;
}

function select(id: string) {
  following = false;
  selectedId = id;
  update();
}

// ---------- card ----------
const card = $('card');

function statusBadge(p: Place) {
  const m = STATUS_META[p.status];
  return `<span class="badge" style="--c:${m.color}"><i></i>${m.label}</span>`;
}

function renderCard(p: Place) {
  const warn = p.status === 'strict' || p.status === 'illegal';
  card.innerHTML = `
    <div class="chip" id="chip"></div>
    <h2>${flag(p.cc)} ${p.city}</h2>
    <p class="region">${p.region}</p>
    <div class="count" id="count"></div>
    <p class="local">Local time <strong id="local"></strong></p>
    <div class="law ${warn ? 'warn' : ''}">
      ${statusBadge(p)}
      <p>${p.legal}</p>
    </div>
    <div class="culture"><h3>Culture</h3><p>${p.culture}</p></div>
    <a class="more" href="https://en.wikipedia.org/wiki/${p.wiki}" target="_blank" rel="noopener noreferrer">Read more on Wikipedia ↗</a>
    <div id="same" class="same"></div>
    <div id="follow"></div>
    <h3 class="next-h">Coming up</h3>
    <ul id="next" class="next"></ul>
  `;
  renderedId = p.id;
}

function updateCard(now: Date, ranked: Status[], group: Status[], featured: Status) {
  const p = featured.place;
  const color = STATUS_META[p.status].color;
  const chip = $('chip');
  const count = $('count');
  if (featured.now) {
    chip.className = 'chip live';
    chip.innerHTML = `<i></i>It's ${featured.label} right now`;
    count.className = 'count live';
    count.innerHTML = `<span class="big">It's 4:20!</span><span class="sub">${featured.remaining}s left in this 4:20</span>`;
  } else {
    chip.className = 'chip';
    chip.innerHTML = `Next up · ${featured.label}`;
    count.className = 'count';
    count.innerHTML = `<span class="sub">4:20 in</span><span class="big">${hms(featured.until)}</span>`;
  }
  card.style.setProperty('--accent', color);
  $('local').textContent = clock(now, p.tz);

  const others = group.filter((s) => s.place.id !== p.id).map((s) => s.place.city);
  $('same').innerHTML = others.length
    ? `<span>${featured.now ? 'Also 4:20 right now' : 'Same moment'}:</span> ${others.join(', ')}`
    : '';

  const followEl = $('follow');
  if (following === !!followEl.firstChild) {
    followEl.innerHTML = following
      ? ''
      : `<button class="follow" id="follow-btn">↺ Follow the nearest 4:20</button>`;
  }

  // Rebuild the list only when its members change; otherwise just tick the
  // countdowns, so a click is never lost to a re-render between mousedown and mouseup.
  const upcoming = ranked.filter((s) => s.place.id !== p.id).slice(0, 6);
  const listEl = $('next');
  const listKey = upcoming.map((s) => s.place.id).join(',');
  if (listEl.dataset.key !== listKey) {
    listEl.dataset.key = listKey;
    listEl.innerHTML = upcoming
      .map(
        (s) =>
          `<li data-id="${s.place.id}"><i style="background:${STATUS_META[s.place.status].color}"></i><span class="n">${flag(s.place.cc)} ${s.place.city}</span><span class="t"></span></li>`,
      )
      .join('');
  }
  upcoming.forEach((s, i) => {
    listEl.children[i].querySelector('.t')!.textContent = s.now ? 'now' : hms(s.until);
  });
}

card.addEventListener('click', (e) => {
  const t = e.target as HTMLElement;
  const li = t.closest('li[data-id]') as HTMLElement | null;
  if (li) return select(li.dataset.id!);
  if (t.closest('#follow-btn')) {
    following = true;
    selectedId = null;
    lastInteract = 0;
    update();
  }
});

// ---------- main loop ----------
// Optional ?time=2026-04-20T16:20:00Z lets you preview any moment (handy for testing).
const timeOffset = (() => {
  const t = new URLSearchParams(location.search).get('time');
  const ms = t ? Date.parse(t) : NaN;
  return Number.isNaN(ms) ? 0 : ms - Date.now();
})();

function update() {
  const now = new Date(Date.now() + timeOffset);
  const ranked = rank(PLACES, now);
  const minUntil = ranked[0].until;
  const group = ranked.filter((s) => s.until === minUntil);

  let featured: Status;
  if (!following && selectedId) {
    featured = statusFor(byId.get(selectedId)!, now);
  } else {
    // several places can share the same 4:20 moment; take turns showing them
    featured = group[Math.floor(now.getTime() / 15000) % group.length];
  }

  const p = featured.place;
  if (p.id !== featuredId) {
    featuredId = p.id;
    styleFeatured();
  }
  if (renderedId !== p.id) renderCard(p);

  // fly the camera there, unless the user is dragging the globe around
  if (focusedId !== p.id && (!following || Date.now() - lastInteract > 10000)) focus(p);

  // pulse rings on every place that is at 4:20 right now (or just the featured one)
  const live = ranked.filter((s) => s.now).map((s) => s.place);
  const rings = live.length ? live : [p];
  const key = rings.map((r) => r.id).join(',') + (live.length ? '!' : '');
  if (key !== ringKey) {
    ringKey = key;
    world.ringsData(rings).ringColor((d: object) => {
      const c = STATUS_META[(d as Place).status].color;
      const a = live.length ? 0.95 : 0.45;
      return (t: number) => rgba(c, a * (1 - t));
    });
    world.labelsData([p]);
  } else if ((world.labelsData() as Place[])[0]?.id !== p.id) {
    world.labelsData([p]);
  }

  updateCard(now, ranked, ranked.filter((s) => s.until === featured.until), featured);

  $('your-clock').textContent = `${clock(now, Intl.DateTimeFormat().resolvedOptions().timeZone)}`;
  document.title = featured.now ? `It's 4:20 in ${p.city}! 🌿` : "It's 4:20 somewhere";
  document.body.classList.toggle('is-live', live.length > 0);
}

update();
setInterval(update, 1000);
