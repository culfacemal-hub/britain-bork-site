document.addEventListener('DOMContentLoaded', () => {
  const heroVideos = document.querySelectorAll('.hero-video');
  if (heroVideos.length && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    heroVideos.forEach((v) => {
      if (getComputedStyle(v).display === 'none') return;
      v.src = v.dataset.src;
      v.play().catch(() => {});
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
