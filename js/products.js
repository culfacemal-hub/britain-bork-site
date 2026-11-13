const BORK_PRODUCTS = [
  {
    slug: 'hya-ceramid',
    name: 'Hya-ceramid',
    img: 'britain-bork-hya-ceramid-kapsuly-n30.334b500b.webp',
    category: 'cilt',
    categoryLabel: 'Cilt & Güzellik',
    pack: '30 kapsül',
    desc: 'Hyalüronik asit ve seramid kompleksi ile cilt nemi ve elastikiyeti desteği.',
  },
  {
    slug: 'allert-g',
    name: 'Allert-g',
    img: 'britain-bork-allert-g-kapsuly-n30.2e6e2cdb.webp',
    category: 'bagisiklik',
    categoryLabel: 'Bağışıklık',
    pack: '30 kapsül',
    desc: 'Kersetin ve C vitamini içeren, mevsim geçişlerine yönelik bağışıklık desteği.',
  },
  {
    slug: 'yum-yum-iron',
    name: 'YUM YUM Plus Iron',
    img: 'britain-bork-yum-yum-iron-kapsuly-n30.dfdcee86.webp',
    category: 'demir',
    categoryLabel: 'Demir',
    pack: '30 kapsül',
    desc: 'Çocuklar için tatlı aromalı, kolay tüketilen demir desteği.',
  },
  {
    slug: 'b-focus',
    name: 'B-focus',
    img: 'britain-bork-b-focus-kapsuly-n30.b72a6b86.webp',
    category: 'stres',
    categoryLabel: 'Stres & Odak',
    pack: '30 kapsül',
    desc: 'B vitamini kompleksi ile zihinsel odak ve enerji metabolizması desteği.',
  },
  {
    slug: 'calm-down',
    name: 'Calm Down',
    img: 'britain-bork-calm-down-kapsuly-n30.ba1539ef.webp',
    category: 'stres',
    categoryLabel: 'Stres & Odak',
    pack: '30 kapsül',
    desc: 'Magnezyum ve L-teanin ile sakinlik ve stres dengesi desteği.',
  },
  {
    slug: 'sweet-mom-prenatal',
    name: 'Sweet MOM Prenatal',
    img: 'britain-bork-sweet-mom-prenatal-kapsuly-n30.8ba1762f.webp',
    category: 'anne-bebek',
    categoryLabel: 'Anne & Bebek',
    pack: '30 kapsül',
    desc: 'Folat, demir ve D vitamini ile hamilelik dönemine özel besin desteği.',
  },
  {
    slug: 'sweet-mom-postnatal',
    name: 'Sweet MOM Postnatal',
    img: 'britain-bork-sweet-mom-postnatal-kapsuly-n30.825f36b5.webp',
    category: 'anne-bebek',
    categoryLabel: 'Anne & Bebek',
    pack: '30 kapsül',
    desc: 'Doğum sonrası toparlanma dönemine özel vitamin ve mineral desteği.',
  },
  {
    slug: 'pro-dophilus',
    name: 'Pro-dophilus',
    img: 'britain-bork-pro-dophilus-kapsuly-n30.4f47730e.webp',
    category: 'sindirim',
    categoryLabel: 'Sindirim',
    pack: '30 kapsül',
    desc: 'Çoklu probiyotik suşlarla bağırsak florası ve sindirim konforu desteği.',
  },
  {
    slug: 'quattro-complex',
    name: 'Quattro Complex',
    img: 'britain-bork-quattro-complex-kapsuly-n30.084d032e.webp',
    category: 'bagisiklik',
    categoryLabel: 'Bağışıklık',
    pack: '30 kapsül',
    desc: 'Bitkisel sterol, Omega-3, Q10 ve D3-K2\'yi tek kapsülde birleştiren 4\'lü formül.',
  },
  {
    slug: 'the-missing-omega-3',
    name: 'THE Missing Omega-3',
    img: 'britain-bork-the-missing-omega-3-kapsuly-n30.453a5d47.webp',
    category: 'omega',
    categoryLabel: 'Omega-3',
    pack: '30 kapsül',
    desc: 'Yüksek EPA/DHA konsantrasyonlu, balık kokusu bırakmayan Omega-3 desteği.',
  },
  {
    slug: 'the-missing-krill-oil',
    name: 'THE Missing Pure Krill Oil',
    img: 'britain-bork-the-missing-krill-oil-kapsuly-n30.6febf0a2.webp',
    category: 'omega',
    categoryLabel: 'Omega-3',
    pack: '30 kapsül',
    desc: 'Astaksantin ve Q10 ile zenginleştirilmiş saf krill yağı desteği.',
  },
  {
    slug: 'prost-8',
    name: 'Prost-8',
    img: 'britain-bork-prost-8-kapsuly-n30.53ae4278.webp',
    category: 'prostat',
    categoryLabel: 'Erkek Sağlığı',
    pack: '30 kapsül',
    desc: 'Çinko ve bitkisel ekstrelerle erkek prostat sağlığı desteği.',
  },
  {
    slug: 'iron-plus-c',
    name: 'High Absorption Iron + Vitamin C',
    img: 'britain-bork-iron-plus-c-kapsuly-n30.e740cec1.webp',
    category: 'demir',
    categoryLabel: 'Demir',
    pack: '30 kapsül',
    desc: 'C vitamini ile desteklenmiş, mideye hafif ve yüksek emilimli demir formülü.',
  },
  {
    slug: 'curcumin-x185',
    name: 'Turmeric Curcumin X185',
    img: 'britain-bork-curcumin-x185-kapsuly-n30.d8f02d63.webp',
    category: 'sindirim',
    categoryLabel: 'Sindirim',
    pack: '30 kapsül',
    desc: 'Yüksek biyoyararlanımlı kurkumin ile eklem ve sindirim konforu desteği.',
  },
];

function borkProductCardHTML(p) {
  return `<a class="product-card" href="urun.html?u=${p.slug}" data-category="${p.category}">
    <div class="product-thumb"><img src="images/products/${p.img}" alt="${p.name}" width="700" height="700" loading="lazy"></div>
    <div class="product-body">
      <div class="product-tag">Britain Bork · ${p.categoryLabel}</div>
      <h4>${p.name} Kapsül №30</h4>
      <p class="product-desc">${p.desc}</p>
      <div class="product-meta"><span>${p.pack}</span><span class="arrow">İncele →</span></div>
    </div>
  </a>`;
}

function borkRenderProducts(containerSelector, slugs) {
  const el = document.querySelector(containerSelector);
  if (!el) return;
  const list = slugs ? BORK_PRODUCTS.filter((p) => slugs.includes(p.slug)) : BORK_PRODUCTS;
  el.innerHTML = list.map(borkProductCardHTML).join('');
}
