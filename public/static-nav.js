(function () {
  if (window.__enginesMarketStaticNavigationLoaded) return;
  window.__enginesMarketStaticNavigationLoaded = true;

  const services = [
    ["Replacement Engines", "/services/replacement-engines"],
    ["Used Engines", "/services/used-engines"],
    ["Reconditioned Engines", "/services/reconditioned-engines"],
    ["Rebuilt Engines", "/services/rebuilt-engines"],
    ["Engine Fitting", "/services/engine-fitting"],
    ["Engine Repair", "/services/engine-repair"],
    ["Engine Diagnostics", "/services/engine-diagnostic"],
    ["Gearbox Replacement", "/services/gearbox-replacement"],
  ];

  const prices = [
    ["Engine Replacement Cost", "/prices/engine-replacement-cost"],
    ["Used Engine Cost", "/prices/used-engine-cost"],
    ["Reconditioned Engine Cost", "/prices/reconditioned-engine-cost"],
    ["Engine Fitting Cost", "/prices/engine-fitting-cost"],
    ["Labour Cost Guide", "/prices/garage-labour-rates"],
    ["Timing Chain Cost", "/prices/timing-chain-replacement-cost"],
    ["Head Gasket Cost", "/prices/head-gasket-repair-cost"],
    ["Turbo Cost", "/prices/turbo-replacement-cost"],
  ];

  const brands = [
    ["BMW", "/bmw"],
    ["Mercedes-Benz", "/mercedes-benz"],
    ["Land Rover", "/land-rover"],
    ["Audi", "/audi"],
    ["Ford", "/ford"],
    ["Vauxhall", "/vauxhall"],
    ["All 41 Brands", "/resources#brands"],
  ];

  const knowledge = [
    ["Engine Failures", "/failures"],
    ["Car Symptoms", "/symptoms"],
    ["Compare Options", "/compare"],
    ["Case Studies", "/case-studies"],
    ["Guides & Tools", "/guides"],
    ["All Resources", "/resources"],
  ];

  const insights = [
    ["UK Engine Price Index", "/insights/uk-engine-price-index"],
    ["Engine Replacement Statistics", "/insights/uk-engine-replacement-statistics"],
    ["Most Replaced Engines", "/insights/most-replaced-engines-uk"],
    ["Most Reliable Engines", "/insights/most-reliable-diesel-engines"],
    ["UK Market Report 2026", "/insights/uk-engine-market-report-2026"],
  ];

  const columns = [
    {
      label: "Company",
      links: [
        ["About Us", "/about"],
        ["How It Works", "/about/how-engines-market-works"],
        ["Supplier Standards", "/about/supplier-standards"],
        ["Reviews", "/reviews"],
        ["Contact", "/about/contact"],
      ],
    },
    { label: "Services", links: services.slice(0, 6) },
    { label: "Knowledge", links: knowledge.slice(0, 5) },
    {
      label: "Legal",
      links: [
        ["Privacy Policy", "/legal/privacy-policy"],
        ["Terms & Conditions", "/legal/terms-and-conditions"],
        ["Cookie Policy", "/resources#legal"],
        ["Modern Slavery", "/resources#legal"],
        ["Accessibility", "/resources#legal"],
      ],
    },
    {
      label: "Tools",
      links: [
        ["Find Engine Number", "/guides"],
        ["Engine History Check", "/guides"],
        ["Locations", "/resources#locations"],
        ["View All Resources", "/resources"],
        ["Sitemap", "/sitemap.xml"],
      ],
    },
  ];

  const navGroups = [
    { label: "Services", href: "/services", links: services },
    { label: "Prices", href: "/prices", links: prices },
    { label: "Brands", href: "/resources#brands", links: brands },
    { label: "Knowledge", href: "/resources", links: knowledge },
    { label: "Insights", href: "/insights", links: insights },
    { label: "Blog", href: "/blog" },
  ];

  function link(label, href, className) {
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.textContent = label;
    if (className) anchor.className = className;
    return anchor;
  }

  function makeLogo() {
    const logo = link("", "/", "em-static-logo");
    logo.setAttribute("aria-label", "Engines Market homepage");
    logo.innerHTML = '<img class="em-static-logo__image" src="/branding/engine-market-logo-white-transparent.png" alt="Engines Market" width="520" height="150">';
    return logo;
  }

  function makeHeader() {
    const header = document.createElement("header");
    header.className = "em-static-header";

    const inner = document.createElement("div");
    inner.className = "em-static-header__inner";
    inner.appendChild(makeLogo());

    const nav = document.createElement("nav");
    nav.className = "em-static-nav";
    nav.setAttribute("aria-label", "Primary navigation");

    navGroups.forEach((group) => {
      const item = document.createElement("div");
      item.className = "em-static-nav__item";

      if (group.links) {
        const trigger = link(group.label, group.href, "em-static-nav__trigger");
        trigger.innerHTML = `${group.label}<span class="em-static-nav__chevron">⌵</span>`;
        trigger.addEventListener("click", (event) => {
          if (!window.matchMedia("(max-width: 1023px)").matches) return;
          event.preventDefault();
          const expanded = item.getAttribute("data-expanded") === "true";
          nav.querySelectorAll(".em-static-nav__item[data-expanded='true']").forEach((openItem) => {
            if (openItem !== item) openItem.removeAttribute("data-expanded");
          });
          if (expanded) {
            item.removeAttribute("data-expanded");
          } else {
            item.setAttribute("data-expanded", "true");
          }
        });
        item.appendChild(trigger);

        const dropdown = document.createElement("div");
        dropdown.className = "em-static-nav__dropdown";
        group.links.forEach(([label, href]) => dropdown.appendChild(link(label, href)));
        item.appendChild(dropdown);
      } else {
        item.appendChild(link(group.label, group.href, "em-static-nav__direct"));
      }

      nav.appendChild(item);
    });

    inner.appendChild(nav);

    const actions = document.createElement("div");
    actions.className = "em-static-actions";
    actions.appendChild(link("0333 000 0044", "tel:03330000044"));
    actions.appendChild(link("Get Quote", "/get-a-quote", "em-static-quote"));
    inner.appendChild(actions);

    const menu = document.createElement("button");
    menu.className = "em-static-menu";
    menu.type = "button";
    menu.setAttribute("aria-label", "Open navigation menu");
    menu.textContent = "☰";
    menu.addEventListener("click", () => {
      const open = header.getAttribute("data-open") === "true";
      header.setAttribute("data-open", String(!open));
      menu.textContent = open ? "☰" : "×";
    });
    inner.appendChild(menu);

    header.appendChild(inner);
    return header;
  }

  function makeFooter() {
    const footer = document.createElement("footer");
    footer.className = "em-static-footer";

    const inner = document.createElement("div");
    inner.className = "em-static-footer__inner";

    const brand = document.createElement("div");
    brand.className = "em-static-footer__brand";
    brand.appendChild(makeLogo());
    const copy = document.createElement("p");
    copy.textContent = "Compare replacement, used and reconditioned engine options from trusted UK specialists.";
    brand.appendChild(copy);
    const contact = document.createElement("div");
    contact.className = "em-static-footer__contact";
    contact.appendChild(link("0333 000 0044", "tel:03330000044"));
    contact.appendChild(link("Get a quote", "/get-a-quote"));
    brand.appendChild(contact);
    inner.appendChild(brand);

    const nav = document.createElement("nav");
    nav.className = "em-static-footer__nav";
    nav.setAttribute("aria-label", "Footer navigation");

    columns.forEach((column) => {
      const block = document.createElement("div");
      const heading = document.createElement("h2");
      heading.textContent = column.label;
      block.appendChild(heading);

      const list = document.createElement("ul");
      column.links.forEach(([label, href]) => {
        const item = document.createElement("li");
        item.appendChild(link(label, href));
        list.appendChild(item);
      });
      block.appendChild(list);
      nav.appendChild(block);
    });

    inner.appendChild(nav);
    footer.appendChild(inner);

    const bottom = document.createElement("div");
    bottom.className = "em-static-footer__bottom";
    bottom.textContent = `Copyright ${new Date().getFullYear()} Engines Market. All rights reserved.`;
    footer.appendChild(bottom);
    return footer;
  }

  function init() {
    if (document.querySelector(".em-static-header")) return;
    document.body.insertBefore(makeHeader(), document.body.firstChild);
    document.body.appendChild(makeFooter());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
