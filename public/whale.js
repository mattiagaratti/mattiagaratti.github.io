/* A small travelling companion, shared by every page. No dependencies. */
(() => {
    'use strict';

    if (document.getElementById('site-whale')) return;

    const storageKey = 'mattiagaratti.whale.v1';
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
    let saved = {};
    try {
        saved = JSON.parse(sessionStorage.getItem(storageKey)) || {};
    } catch (_) { /* The companion also works when browser storage is unavailable. */ }

    const whale = document.createElement('div');
    whale.id = 'site-whale';
    whale.setAttribute('aria-hidden', 'true');
    whale.innerHTML = `
        <div class="whale-heading"><div class="whale-bob">
            <svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg" focusable="false">
                <defs>
                    <linearGradient id="whale-blue" x1="0" y1="0" x2="0.7" y2="1">
                        <stop stop-color="#a5e4ed"/><stop offset="1" stop-color="#55a9c8"/>
                    </linearGradient>
                </defs>
                <g class="whale-tail" fill="#63b4cf" stroke="#24637e" stroke-width="2.5" stroke-linejoin="round">
                    <path d="M151 96 Q172 90 181 70 Q169 62 174 45 Q190 46 198 61 Q203 44 216 43 Q221 68 198 78 Q188 106 157 111Z"/>
                    <path d="M183 75 Q190 75 198 65" fill="none" stroke="#3d8fae"/>
                </g>
                <path d="M25 76 C33 53 63 49 92 55 C119 60 127 89 156 92 Q166 93 173 87 C169 108 145 124 108 127 C73 131 32 123 23 103 Q18 91 25 76Z"
                    fill="url(#whale-blue)" stroke="#24637e" stroke-width="2.5"/>
                <path d="M24 101 C55 112 94 115 130 105 Q147 102 160 100 C147 116 126 125 107 126 C71 130 34 122 24 101Z" fill="#d5eef0"/>
                <path d="M55 113 Q71 121 88 120 M72 111 Q89 119 105 117 M91 110 Q108 116 122 112"
                    fill="none" stroke="#96cbd5" stroke-width="2" stroke-linecap="round"/>
                <path class="whale-flipper" d="M101 99 Q114 102 126 117 Q110 130 99 117 Q94 110 101 99Z"
                    fill="#4a9cbd" stroke="#24637e" stroke-width="2.5" stroke-linejoin="round"/>
                <ellipse cx="42" cy="99" rx="8" ry="4" fill="#e9b1b6" opacity=".65"/>
                <g class="whale-eye">
                    <circle cx="43" cy="86" r="5" fill="#173f57"/>
                    <circle cx="41.5" cy="84.5" r="1.6" fill="#fff"/>
                </g>
                <path d="M29 97 Q35 102 40 99" fill="none" stroke="#24637e" stroke-width="2.5" stroke-linecap="round"/>
                <path d="M58 60 Q63 57 68 60" fill="none" stroke="#3d8fae" stroke-width="2.5" stroke-linecap="round"/>
                <g class="whale-spout" fill="#b6edf4" stroke="#74cbdc" stroke-width="1.5" stroke-linecap="round">
                    <path d="M63 55 C61 38 48 31 46 22 C59 22 64 31 65 37 C68 24 76 17 86 19 C85 28 72 31 68 54Z"/>
                    <ellipse cx="40" cy="17" rx="3" ry="5" transform="rotate(-28 40 17)"/>
                    <ellipse cx="93" cy="14" rx="3" ry="5" transform="rotate(28 93 14)"/>
                    <ellipse cx="66" cy="8" rx="2.5" ry="4"/>
                </g>
            </svg>
        </div></div>`;

    const toggle = document.createElement('button');
    toggle.id = 'whale-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-controls', whale.id);
    toggle.innerHTML = `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M3 12c0-3 3-5 6-4 3 0 4 4 7 4 2 0 3-2 3-4-2 0-3-1-3-3 2 0 3 1 4 2 0-2 1-3 3-3 1 4-1 6-3 7-1 6-6 8-11 7-4 0-6-2-6-6Z"/>
            <circle cx="7" cy="11" r=".8" class="whale-toggle-eye"/>
        </svg>
        <span class="whale-toggle-label"></span>
        <span class="whale-toggle-state" aria-hidden="true"></span>`;
    document.body.append(whale, toggle);

    let paused = saved.paused === true;
    let bounds;
    let x = 0;
    let y = 0;
    let direction = saved.direction === 1 ? 1 : -1;
    let route = null;
    let frame = null;
    let previousTime = null;
    let menuOpen = document.body.classList.contains('is-menu-visible');
    const heading = whale.querySelector('.whale-heading');
    // Keep the tail, blink and spout in the same phase across full page loads.
    const animationEpoch = Number.isFinite(saved.epoch) ? saved.epoch : Date.now();
    whale.style.setProperty('--whale-delay', `${-(Date.now() - animationEpoch) / 1000}s`);

    function measure() {
        const width = whale.offsetWidth;
        const height = whale.offsetHeight;
        const viewportWidth = document.documentElement.clientWidth;
        const viewportHeight = window.innerHeight;
        bounds = {
            left: 8,
            right: Math.max(8, viewportWidth - width - 8),
            top: Math.min(64, Math.max(8, viewportHeight - height - 8)),
            bottom: Math.max(8, viewportHeight - height - 64)
        };
        bounds.bottom = Math.max(bounds.top, bounds.bottom);
    }

    function draw(tilt = 0) {
        whale.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${tilt.toFixed(2)}deg)`;
        // The illustration faces left; flip it when swimming right.
        heading.style.transform = `scaleX(${direction === 1 ? -1 : 1})`;
    }

    function normalise(value, min, max) {
        return max === min ? 0 : clamp((value - min) / (max - min), 0, 1);
    }

    function remember() {
        try {
            sessionStorage.setItem(storageKey, JSON.stringify({
                x: normalise(x, bounds.left, bounds.right),
                y: normalise(y, bounds.top, bounds.bottom),
                direction, paused, epoch: animationEpoch
            }));
        } catch (_) { /* Storage can be disabled by the visitor. */ }
    }

    function chooseRoute() {
        let nextX = bounds.left;
        let nextY = bounds.top;
        for (let attempt = 0; attempt < 6; attempt++) {
            nextX = bounds.left + Math.random() * (bounds.right - bounds.left);
            nextY = bounds.top + Math.random() * (bounds.bottom - bounds.top);
            if (Math.hypot(nextX - x, nextY - y) > 160) break;
        }
        if (Math.abs(nextX - x) > 12) direction = nextX > x ? 1 : -1;
        route = {
            fromX: x, fromY: y, toX: nextX, toY: nextY, elapsed: 0,
            duration: Math.max(6000, Math.hypot(nextX - x, nextY - y) / 30 * 1000)
        };
    }

    function canSwim() {
        return !paused && !reducedMotion.matches && !document.hidden && !menuOpen;
    }

    function tick(time) {
        frame = null;
        if (!canSwim()) return;
        if (!route) chooseRoute();
        route.elapsed += previousTime === null ? 0 : Math.min(time - previousTime, 64);
        previousTime = time;
        const progress = Math.min(1, route.elapsed / route.duration);
        const eased = (1 - Math.cos(Math.PI * progress)) / 2;
        x = route.fromX + (route.toX - route.fromX) * eased;
        y = route.fromY + (route.toY - route.fromY) * eased;
        const tilt = clamp((route.toY - route.fromY) / Math.max(100, Math.abs(route.toX - route.fromX)) * direction * 12, -8, 8);
        draw(tilt * Math.sin(Math.PI * progress));
        if (progress === 1) route = null;
        frame = requestAnimationFrame(tick);
    }

    function syncActivity() {
        if (frame !== null) cancelAnimationFrame(frame);
        frame = null;
        previousTime = null;
        whale.classList.toggle('is-resting', !canSwim());
        whale.classList.toggle('is-paused', paused);
        whale.classList.toggle('is-reduced-motion', reducedMotion.matches);
        // Hide a paused companion so the visitor can read without distraction.
        toggle.setAttribute('aria-pressed', String(paused));
        const label = paused ? 'Show whale' : 'Hide whale';
        toggle.setAttribute('aria-label', label);
        toggle.title = label;
        toggle.querySelector('.whale-toggle-label').textContent = label;
        toggle.querySelector('.whale-toggle-state').textContent = paused ? '\u25b6' : '\u2161';
        if (canSwim()) frame = requestAnimationFrame(tick);
    }

    function restAtEdge() {
        x = bounds.right;
        y = bounds.bottom;
        direction = -1;
        route = null;
        draw();
    }

    measure();
    x = bounds.left + (Number.isFinite(saved.x) ? clamp(saved.x, 0, 1) : 0.9) * (bounds.right - bounds.left);
    y = bounds.top + (Number.isFinite(saved.y) ? clamp(saved.y, 0, 1) : 0.72) * (bounds.bottom - bounds.top);
    if (reducedMotion.matches) restAtEdge();
    draw();
    syncActivity();

    toggle.addEventListener('click', () => {
        paused = !paused;
        syncActivity();
        remember();
    });
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) remember();
        syncActivity();
    });
    new MutationObserver(() => {
        const isOpen = document.body.classList.contains('is-menu-visible');
        if (isOpen !== menuOpen) {
            menuOpen = isOpen;
            syncActivity();
        }
    }).observe(document.body, { attributes: true, attributeFilter: ['class'] });
    window.addEventListener('resize', () => {
        const relativeX = normalise(x, bounds.left, bounds.right);
        const relativeY = normalise(y, bounds.top, bounds.bottom);
        measure();
        x = bounds.left + relativeX * (bounds.right - bounds.left);
        y = bounds.top + relativeY * (bounds.bottom - bounds.top);
        route = null;
        if (reducedMotion.matches) restAtEdge();
        draw();
    });
    reducedMotion.addEventListener('change', () => {
        if (reducedMotion.matches) restAtEdge();
        syncActivity();
    });
    window.addEventListener('pagehide', () => {
        remember();
        if (frame !== null) cancelAnimationFrame(frame);
        frame = null;
        previousTime = null;
    });
    window.addEventListener('pageshow', syncActivity);
})();
