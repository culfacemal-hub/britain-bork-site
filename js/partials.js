const BORK_NAV = [
  { key: 'urunler', href: 'urunler.html', label: 'Ürünler' },
  { key: 'hakkimizda', href: 'hakkimizda.html', label: 'Hakkımızda' },
  { key: 'liborkcaps', href: 'liborkcaps.html', label: 'Li-Bork-Caps® Nedir?' },
  { key: 'sertifikalar', href: 'sertifikalar.html', label: 'Sertifikalarımız' },
  { key: 'iletisim', href: 'iletisim.html', label: 'İletişim' },
];

function borkHeaderHTML(active) {
  const links = BORK_NAV.map(
    (n) => `<a href="${n.href}"${n.key === active ? ' class="active"' : ''}>${n.label}</a>`
  ).join('\n      ');
  return `<nav class="site-nav">
  <div class="nav-inner">
    <a href="index.html" class="logo">
      <div class="logo-mark"><span class="lhs">BRITAIN</span><span class="rhs">Bork</span></div>
      <div class="logo-sub">Nature &amp; Technology, Perfectly Blended</div>
    </a>
    <nav class="main-nav">
      ${links}
    </nav>
    <button class="nav-toggle" aria-label="Menüyü aç/kapat" aria-expanded="false">☰</button>
  </div>
</nav>`;
}

function borkFooterHTML() {
  return `<footer class="site-footer">
  <div class="container-x">
    <div class="footer-top">
      <div>
        <div class="logo-mark"><span class="lhs">BRITAIN</span><span class="rhs">Bork</span></div>
        <p style="margin-top:14px;">Nature and Technology, Perfectly Blended. İstanbul merkezli premium gıda takviyesi markası.</p>
        <div class="badge-row">
          <span>GMP</span><span>ISO 9001</span><span>ISO 14001</span><span>ISO 22000</span><span>HALAL</span>
        </div>
      </div>
      <div>
        <h5>Kurumsal</h5>
        <a href="hakkimizda.html">Hakkımızda</a>
        <a href="liborkcaps.html">Li-Bork-Caps® Nedir?</a>
        <a href="sertifikalar.html">Sertifikalarımız</a>
      </div>
      <div>
        <h5>Ürünler</h5>
        <a href="urunler.html">Tüm Ürünler</a>
        <a href="urunler.html#omega">Omega-3</a>
        <a href="urunler.html#anne-bebek">Anne &amp; Bebek</a>
      </div>
      <div>
        <h5>İletişim</h5>
        <a href="tel:+902124383824">0 (212) 438 38 24</a>
        <a href="mailto:info@bork.com.tr">info@bork.com.tr</a>
        <p>Seyrantepe, Binnur Sk. No:11, Kâğıthane/İstanbul</p>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Britain Bork. Tüm hakları saklıdır.</span>
      <span>Bu ürünler hastalıkları teşhis, tedavi etmek veya önlemek amacıyla kullanılmaz.</span>
    </div>
  </div>
</footer>`;
}

(function borkInjectPartials() {
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');
  if (headerEl) headerEl.outerHTML = borkHeaderHTML(headerEl.dataset.active || '');
  if (footerEl) footerEl.outerHTML = borkFooterHTML();

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
  }
})();
