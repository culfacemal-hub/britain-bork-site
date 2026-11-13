(function () {
  const root = document.getElementById('product-root');
  if (!root) return;
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const slug = new URLSearchParams(location.search).get('u');
  const p = BORK_PRODUCTS.find((x) => x.slug === slug);
  if (!p) {
    root.innerHTML = `<section class="page-hero"><div class="container-x"><h1>Ürün bulunamadı</h1><p>Aradığınız ürün katalogda yok.</p><p style="margin-top:20px;"><a class="btn btn-primary" href="urunler.html">Tüm ürünlere dön</a></p></div></section>`;
    return;
  }
  const d = (typeof BORK_DETAILS !== 'undefined' && BORK_DETAILS[slug]) || {};
  const title = `${p.name} Kapsül №30`;
  document.title = `${title} | Britain Bork`;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.content = d.tagline || p.desc;

  const list = (arr) => (arr && arr.length ? `<ul class="check-list">${arr.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : '');
  const section = (eyebrow, heading, body, white) => (body ? `<section class="section"${white ? ' style="background:#fff;"' : ''}><div class="container-x"><div class="section-head"><div class="eyebrow">${eyebrow}</div><h2>${heading}</h2></div>${body}</div></section>` : '');

  const facts = [['Form', d.form || p.pack], ['Kullanım süresi', d.course], ['Kategori', p.categoryLabel], ['Teknoloji', 'Li-Bork-Caps® likit kapsül']]
    .filter((f) => f[1]).map((f) => `<div class="pd-fact"><span>${f[0]}</span><b>${esc(f[1])}</b></div>`).join('');

  const comp = d.composition && d.composition.length
    ? `<div class="pd-table-wrap"><table class="pd-table"><thead><tr><th>Bileşen</th><th>Günlük dozda</th></tr></thead><tbody>${d.composition.map((c) => `<tr><td>${esc(c.name)}</td><td>${esc(c.amount)}</td></tr>`).join('')}</tbody></table></div>`
    : '';

  const how = d.howToTake || {};
  const howRows = [['Doz', how.dose], ['Ne zaman', how.time], ['Süre', how.duration], ['Birlikte kullanım', how.compat]].filter((r) => r[1]);
  const howHTML = howRows.length ? `<div class="steps">${howRows.map((r) => `<div class="step"><div class="num">${r[0].toUpperCase()}</div><p style="margin-top:8px;">${esc(r[1])}</p></div>`).join('')}</div>` : '';

  const feats = d.features && d.features.length
    ? `<div class="steps">${d.features.map((f, i) => `<div class="step"><div class="num">0${i + 1}</div><h3>${esc(f.title)}</h3><p>${esc(f.text)}</p></div>`).join('')}</div>` : '';

  const faq = d.faq && d.faq.length
    ? `<div class="pd-faq">${d.faq.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}</div>` : '';

  const related = BORK_PRODUCTS.filter((x) => x.slug !== slug)
    .sort((a, b) => (b.category === p.category) - (a.category === p.category)).slice(0, 4);

  root.innerHTML = `
  <section class="pd-top">
    <div class="container-x">
      <nav class="pd-crumbs" aria-label="Sayfa yolu"><a href="index.html">Ana sayfa</a> / <a href="urunler.html">Ürünler</a> / <span>${esc(p.name)}</span></nav>
      <div class="pd-grid">
        <div class="pd-photo"><img src="images/products/${p.img}" alt="${esc(title)}" width="700" height="700"></div>
        <div class="pd-info">
          <div class="product-tag">Britain Bork · ${esc(p.categoryLabel)}</div>
          <h1>${esc(title)}</h1>
          <p class="pd-tagline">${esc(d.tagline || p.desc)}</p>
          <div class="pd-facts">${facts}</div>
          <div class="hero-cta">
            <a href="iletisim.html" class="btn btn-primary btn-glow">Bilgi ve sipariş için yazın <span aria-hidden="true">→</span></a>
            <a href="urunler.html" class="btn btn-outline">Tüm ürünler</a>
          </div>
        </div>
      </div>
    </div>
  </section>
  ${d.about ? `<section class="section" style="background:#fff;"><div class="container-x prose"><h3>Ürün hakkında</h3><p>${esc(d.about)}</p></div></section>` : ''}
  ${section('İçerik', 'Günlük dozdaki içerik', comp)}
  ${section('Kimler için', 'Kimlere uygun?', d.forWhom && d.forWhom.length ? `<div class="check-card" style="max-width:820px;margin:0 auto;">${list(d.forWhom)}</div>` : '', true)}
  ${section('Kullanım', 'Nasıl kullanılır?', howHTML)}
  ${section('Fark', 'Bu formülü farklı kılan', feats, true)}
  ${section('Sorular', 'Sık sorulan sorular', faq)}
  <section class="section" style="background:#fff;"><div class="container-x prose">
    ${d.ingredients ? `<h3>İçindekiler</h3><p>${esc(d.ingredients)}</p>` : ''}
    ${d.warnings && d.warnings.length ? `<h3>Uyarılar</h3>${list(d.warnings)}` : ''}
    <p class="pd-note">Takviye edici gıdadır. İlaç değildir; hastalıkların önlenmesi veya tedavi edilmesi amacıyla kullanılmaz. Hamilelik, emzirme dönemi, hastalık veya ilaç kullanımı durumunda doktorunuza danışın. Tavsiye edilen günlük dozu aşmayın. Çocukların ulaşamayacağı yerde saklayın.</p>
  </div></section>
  <section class="section"><div class="container-x">
    <div class="section-head"><div class="eyebrow">Diğer ürünler</div><h2>Bunlar da ilginizi çekebilir</h2></div>
    <div class="product-grid">${related.map(borkProductCardHTML).join('')}</div>
  </div></section>`;
})();
