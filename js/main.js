document.addEventListener('DOMContentLoaded', () => {
  const motionOk = !matchMedia('(prefers-reduced-motion: reduce)').matches;
  const slides = [...document.querySelectorAll('.hero-slide')];
  if (slides.length) {
    const dots = [...document.querySelectorAll('.hero-dot')];
    const videoOf = (slide) => [...slide.querySelectorAll('.hero-video')].find((v) => getComputedStyle(v).display !== 'none');
    let cur = 0;
    const show = (i) => {
      const prev = videoOf(slides[cur]);
      if (prev) prev.pause();
      slides[cur].classList.remove('active');
      dots[cur].classList.remove('active');
      dots[cur].style.setProperty('--p', 0);
      cur = (i + slides.length) % slides.length;
      slides[cur].classList.add('active');
      dots[cur].classList.add('active');
      const count = document.querySelector('.hero-count b');
      if (count) count.textContent = cur + 1;
      const v = videoOf(slides[cur]);
      if (!v || !motionOk) return;
      if (!v.getAttribute('src')) {
        v.src = v.dataset.src;
        v.addEventListener('ended', () => show(cur + 1));
      } else {
        v.currentTime = 0;
      }
      v.play().catch(() => {});
    };
    dots.forEach((d, i) => d.addEventListener('click', () => show(i)));
    document.querySelectorAll('.hero-arrow').forEach((a) => a.addEventListener('click', () => show(cur + +a.dataset.dir)));
    const hero = document.querySelector('.hero');
    let touchX = null;
    hero.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener('touchend', (e) => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1));
    }, { passive: true });
    show(0);

    // Callout anchor points in source-video pixels; shown while the capsule is open.
    const first = videoOf(slides[0]);
    const mobile = first.classList.contains('hero-video-mobile');
    const src = mobile ? { w: 1261, h: 946 } : { w: 2206, h: 946 };
    const points = mobile
      ? [['.hc-oil', 475, 403, 170], ['.hc-tab', 683, 481, 150]]
      : [['.hc-oil', 1395, 403, 170], ['.hc-tab', 1603, 481, 150]];
    const callouts = points.map(([sel, x, y, len]) => ({ el: document.querySelector(sel), x, y, len }));
    const place = () => {
      const r = first.getBoundingClientRect();
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
    if (motionOk) {
      const tick = () => {
        const v = videoOf(slides[cur]);
        if (v && v.duration) dots[cur].style.setProperty('--p', v.currentTime / v.duration);
        const open = cur === 0 && first.currentTime > 3.5 && first.currentTime < 6.6;
        callouts.forEach((c) => c.el.classList.toggle('on', open));
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
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
