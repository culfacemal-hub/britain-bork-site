document.addEventListener('DOMContentLoaded', () => {
  const motionOk = !matchMedia('(prefers-reduced-motion: reduce)').matches;
  const heroVideo = [...document.querySelectorAll('.hero-video')].find((v) => getComputedStyle(v).display !== 'none');
  if (heroVideo && motionOk) {
    heroVideo.src = heroVideo.dataset.src;
    heroVideo.play().catch(() => {});

    // Callout anchor points in source-video pixels; shown while the capsule is open.
    const mobile = heroVideo.classList.contains('hero-video-mobile');
    const src = mobile ? { w: 1261, h: 946 } : { w: 2206, h: 946 };
    const points = mobile
      ? [['.hc-oil', 546, 231, 150], ['.hc-tab', 805, 679, 80]]
      : [['.hc-oil', 1396, 231, 150], ['.hc-tab', 1655, 679, 120]];
    const callouts = points.map(([sel, x, y, len]) => ({ el: document.querySelector(sel), x, y, len }));
    const place = () => {
      const r = heroVideo.getBoundingClientRect();
      const k = Math.max(r.width / src.w, r.height / src.h);
      const offX = mobile ? (r.width - src.w * k) / 2 : r.width - src.w * k;
      const offY = (r.height - src.h * k) / 2;
      callouts.forEach((c) => {
        c.el.style.left = offX + c.x * k + 'px';
        c.el.style.top = offY + c.y * k + 'px';
        c.el.style.setProperty('--len', c.len * k + 'px');
      });
    };
    place();
    addEventListener('resize', place);
    const tick = () => {
      const t = heroVideo.currentTime;
      const open = t > 1.6 && t < 6.2;
      callouts.forEach((c) => c.el.classList.toggle('on', open));
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  if (motionOk) {
    document.querySelectorAll('[data-count]').forEach((el) => {
      const target = +el.dataset.count, prefix = el.dataset.prefix || '';
      const from = target === 0 ? 100 : 0, t0 = performance.now() + 500;
      const step = (now) => {
        const p = Math.min(Math.max((now - t0) / 1400, 0), 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + Math.round(from + (target - from) * eased);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }

  const featured = document.querySelector('[data-render="featured"]');
  if (featured && typeof borkRenderProducts === 'function') {
    const slugs = (featured.dataset.slugs || '').split(',').map((s) => s.trim());
    borkRenderProducts('[data-render="featured"]', slugs);
  }

  const full = document.querySelector('[data-render="all"]');
  if (full && typeof borkRenderProducts === 'function') {
    borkRenderProducts('[data-render="all"]');
  }

  if (motionOk && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        setTimeout(() => e.target.classList.remove('reveal', 'in'), 1300);
        io.unobserve(e.target);
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.section-head, .category-card, .step, .stat-card, .timeline-item, .check-card, .testimonial, .cert-card, .product-card, .cta-band, .split > *, .prose > *').forEach((el) => {
      const i = [...el.parentElement.children].indexOf(el);
      el.style.setProperty('--d', Math.min(i, 5) * 70 + 'ms');
      el.classList.add('reveal');
      io.observe(el);
    });
  }

  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', () => {
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Gönderiliyor…';
      btn.disabled = true;
    });
    if (new URLSearchParams(location.search).get('sent') === '1') {
      const note = document.getElementById('form-sent-note');
      if (note) note.style.display = 'block';
    }
  }

  const chips = document.querySelectorAll('.filter-chip');
  if (chips.length) {
    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        chips.forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        const filter = chip.dataset.filter;
        document.querySelectorAll('[data-category]').forEach((card) => {
          const match = filter === 'all' || card.dataset.category === filter;
          card.style.display = match ? '' : 'none';
        });
      });
    });
  }
});
