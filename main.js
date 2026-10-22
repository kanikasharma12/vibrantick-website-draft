const scriptUrl = document.currentScript ? document.currentScript.src : window.location.href;
const siteRoot = new URL("../../", scriptUrl);
const localUrl = (path) => new URL(path, siteRoot).href;
const header = document.querySelector("#site-header");
const footer = document.querySelector("#site-footer");

if (!document.querySelector('link[data-bootstrap-icons]')) {
  const iconStyles = document.createElement("link");
  iconStyles.rel = "stylesheet";
  iconStyles.href = localUrl("assets/css/bootstrap-icons.css");
  iconStyles.dataset.bootstrapIcons = "";
  document.head.append(iconStyles);
}

if (header) {
  const currentPath = new URL(window.location.href).pathname.toLowerCase();
  const navItems = [
    { label: "AI", path: "services/artificial-intelligence.html", style: "ai" },
    { label: "Home", path: "index.html", icon: "house" },
    {
      label: "About Us",
      path: "about.html",
      menu: "simple",
      children: [
        { label: "Company Profile", path: "about.html", icon: "building" },
        { label: "Core Team", path: "team.html", icon: "people" },
        { label: "Awards & Certificates", path: "awards-certificates.html", icon: "award" },
        { label: "Mission | Vision | Values", path: "about.html", temporary: true, icon: "compass" },
        { label: "MOUs", path: "partnerships.html", icon: "file-earmark-text" },
        { label: "Our Clients", path: "clients.html", icon: "briefcase" },
        { label: "Career with Us", path: "career.html", icon: "person-workspace" }
      ]
    },
    {
      label: "Industry",
      menu: "mega",
      children: [
        { label: "Information Technology", path: "services.html", temporary: true, icon: "laptop" },
        { label: "Education", path: "services.html", temporary: true, icon: "mortarboard" },
        { label: "Fitness", path: "services.html", temporary: true, icon: "activity" },
        { label: "Health Care", path: "services.html", temporary: true, icon: "heart-pulse" },
        { label: "Logistics", path: "services.html", temporary: true, icon: "truck" },
        { label: "Real Estate", path: "services.html", temporary: true, icon: "buildings" },
        { label: "Tour & Travel", path: "services.html", temporary: true, icon: "airplane" },
        { label: "E-commerce", path: "services.html", temporary: true, icon: "cart3" }
      ]
    },
    {
      label: "Services",
      path: "services.html",
      menu: "mega",
      children: [
        { label: "Cloud Services", path: "services/cloud-services.html", icon: "cloud" },
        { label: "Cyber Security", path: "services/cyber-security.html", icon: "shield-lock" },
        { label: "Database Management", path: "services/database-management.html", icon: "database" },
        { label: "DevSecOps", path: "services/devsecops.html", icon: "diagram-3" },
        { label: "E-commerce Management", path: "services/ecommerce-management.html", icon: "cart3" },
        { label: "Enterprise Software Development", path: "services/enterprise-software.html", icon: "window-stack" },
        { label: "Fintech Development", path: "services/fintech-development.html", icon: "currency-exchange" },
        { label: "Graphics & Web Design", path: "services/graphics-web-design.html", icon: "palette" },
        { label: "Growth and Marketing", path: "services/growth-marketing.html", icon: "graph-up-arrow" },
        { label: "Mobile App Solutions", path: "services/mobile-app-solutions.html", icon: "phone" },
        { label: "Training and Skill Development", path: "services/training-skill-development.html", icon: "mortarboard" },
        { label: "Web Development", path: "services/web-development.html", icon: "code-slash" }
      ]
    },
    {
      label: "Training & Internship",
      menu: "mega",
      children: [
        { label: "Cloud Computing", path: "training.html", temporary: true, icon: "cloud" },
        { label: "Cyber Security", path: "training.html", temporary: true, icon: "shield-lock" },
        { label: "Data Science with Python", path: "training.html", temporary: true, icon: "bar-chart" },
        { label: "DevOps", path: "training.html", temporary: true, icon: "gear" },
        { label: "Digital Marketing", path: "training.html", temporary: true, icon: "graph-up-arrow" },
        { label: "Graphics & Web Design", path: "training.html", temporary: true, icon: "palette" },
        { label: "Mobile App Development", path: "training.html", temporary: true, icon: "phone" },
        { label: "Oracle DBA & MySQL", path: "training.html", temporary: true, icon: "database" },
        { label: "Software Testing", path: "training.html", temporary: true, icon: "check2-circle" },
        { label: "Web Development", path: "training.html", temporary: true, icon: "code-slash" }
      ]
    },
    { label: "Our work", path: "work/index.html", icon: "briefcase" },
    { label: "Contact Us", path: "contact.html", icon: "envelope" }
  ];
  const resolveNavUrl = ({ path }) => localUrl(path);
  const isCurrentPage = (href) => new URL(href).pathname.toLowerCase() === currentPath;
  const links = navItems.map((item) => {
    const menuId = item.children ? `nav-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-menu` : "";
    const active = item.path && isCurrentPage(resolveNavUrl(item));
    let trigger;
    if (item.children && !item.path) {
      trigger = `<button class="nav-link nav-menu-trigger" type="button" aria-expanded="false" aria-controls="${menuId}">${item.label}<span class="nav-arrow" aria-hidden="true"></span></button>`;
    } else {
      const href = resolveNavUrl(item);
      const navClass = item.style === "ai" ? "nav-link nav-ai" : "nav-link";
      const navLabel = item.style === "ai"
        ? `<i class="bi bi-stars" aria-hidden="true"></i><span>AI</span><i class="bi bi-stars" aria-hidden="true"></i>`
        : item.label;
      trigger = `<a class="${navClass}" href="${href}"${active ? ' aria-current="page"' : ""}>${navLabel}</a>`;
      if (item.children) {
        trigger += `<button class="nav-menu-toggle" type="button" aria-label="Toggle ${item.label} menu" aria-expanded="false" aria-controls="${menuId}"><span class="nav-arrow" aria-hidden="true"></span></button>`;
      }
    }
    const submenu = item.children
      ? `<div class="nav-dropdown-menu nav-dropdown-menu--${item.menu}" id="${menuId}" aria-label="${item.label}" hidden>
          <p class="nav-dropdown-heading">${item.label}</p>
          <div class="nav-dropdown-grid">${item.children.map((child) => {
            const href = resolveNavUrl(child);
            const childActive = isCurrentPage(href);
            return `<a class="nav-dropdown-link" href="${href}"${childActive ? ' aria-current="page"' : ""}${child.temporary ? ' data-nav-fallback="true"' : ""}><i class="bi bi-${child.icon}" aria-hidden="true"></i><span>${child.label}</span></a>`;
          }).join("")}</div>
        </div>`
      : "";
    return `<li class="nav-item${item.children ? ` nav-dropdown nav-dropdown--${item.menu}` : ""}">${trigger}${submenu}</li>`;
  }).join("");

  header.innerHTML = `
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="${localUrl("index.html")}" aria-label="Vibrantick home">
          <img src="${localUrl("assets/img/vibranticklogo.png")}" alt="Vibrantick Infotech Solutions">
        </a>
        <button class="nav-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="primary-nav">
          <span></span><span></span><span></span>
        </button>
        <nav class="primary-nav" id="primary-nav" aria-label="Main navigation">
          <ul class="primary-nav-list">${links}</ul>
          <a class="nav-cta" href="${localUrl("contact.html")}">Get a Quote</a>
        </nav>
      </div>
    </header>`;

  const toggle = header.querySelector(".nav-toggle");
  const nav = header.querySelector("#primary-nav");
  const siteHeader = header.querySelector(".site-header");
  const dropdowns = [...nav.querySelectorAll(".nav-dropdown")];
  const dropdownCloseTimers = new WeakMap();
  const setDropdownOpen = (dropdown, open) => {
    const menu = dropdown.querySelector(".nav-dropdown-menu");
    const trigger = dropdown.querySelector(".nav-menu-toggle, .nav-menu-trigger");
    if (open) {
      const closeTimer = dropdownCloseTimers.get(menu);
      if (closeTimer) window.clearTimeout(closeTimer);
      dropdownCloseTimers.delete(menu);
      menu.hidden = false;
      menu.classList.remove("is-closing");
      dropdown.classList.add("is-open");
    } else {
      dropdown.classList.remove("is-open");
      if (!menu.hidden && !menu.classList.contains("is-closing")) {
        menu.classList.add("is-closing");
        const closeTimer = window.setTimeout(() => {
          menu.hidden = true;
          menu.classList.remove("is-closing");
          dropdownCloseTimers.delete(menu);
        }, 140);
        dropdownCloseTimers.set(menu, closeTimer);
      }
    }
    trigger.setAttribute("aria-expanded", String(open));
  };
  const closeDropdowns = (except = null) => {
    dropdowns.forEach((dropdown) => {
      if (dropdown !== except) setDropdownOpen(dropdown, false);
    });
  };
  const closeNav = () => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
    nav.classList.remove("is-open");
    closeDropdowns();
  };
  const desktopPointer = window.matchMedia("(min-width: 1101px) and (hover: hover) and (pointer: fine)");
  let activePointerDropdown = null;
  let activePointerMenuReached = false;
  let pendingDropdownSwitch = null;
  const cancelPendingDropdownSwitch = () => {
    if (!pendingDropdownSwitch) return;
    window.clearTimeout(pendingDropdownSwitch.timer);
    pendingDropdownSwitch = null;
  };
  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector(".nav-menu-toggle, .nav-menu-trigger");
    const menu = dropdown.querySelector(".nav-dropdown-menu");
    trigger.addEventListener("click", () => {
      const open = desktopPointer.matches || trigger.getAttribute("aria-expanded") !== "true";
      closeDropdowns(dropdown);
      setDropdownOpen(dropdown, open);
    });
    dropdown.addEventListener("pointerenter", () => {
      if (!desktopPointer.matches) return;
      const activeMenuIsInTransit = activePointerDropdown
        && activePointerDropdown !== dropdown
        && activePointerDropdown.classList.contains("is-open")
        && !activePointerMenuReached;
      if (activeMenuIsInTransit) {
        cancelPendingDropdownSwitch();
        const timer = window.setTimeout(() => {
          if (dropdown.matches(":hover")) {
            closeDropdowns(dropdown);
            setDropdownOpen(dropdown, true);
            activePointerDropdown = dropdown;
            activePointerMenuReached = false;
          }
          pendingDropdownSwitch = null;
        }, 160);
        pendingDropdownSwitch = { dropdown, timer };
        return;
      }
      closeDropdowns(dropdown);
      setDropdownOpen(dropdown, true);
      activePointerDropdown = dropdown;
      activePointerMenuReached = false;
    });
    dropdown.addEventListener("pointerleave", () => {
      if (pendingDropdownSwitch && pendingDropdownSwitch.dropdown === dropdown) cancelPendingDropdownSwitch();
    });
    menu.addEventListener("pointerenter", () => {
      if (desktopPointer.matches && activePointerDropdown === dropdown) {
        cancelPendingDropdownSwitch();
        activePointerMenuReached = true;
      }
    });
    dropdown.addEventListener("focusin", (event) => {
      const target = event.target;
      if (target instanceof Element && (target.closest(".nav-dropdown-menu") || (target.matches(".nav-link") && !target.classList.contains("nav-menu-trigger")))) {
        closeDropdowns(dropdown);
        setDropdownOpen(dropdown, true);
      }
    });
    dropdown.addEventListener("focusout", () => {
      window.setTimeout(() => {
        if (!dropdown.contains(document.activeElement)) setDropdownOpen(dropdown, false);
      });
    });
    menu.addEventListener("keydown", (event) => {
      const menuLinks = [...menu.querySelectorAll("a")];
      const index = menuLinks.indexOf(document.activeElement);
      let nextIndex = null;
      if (event.key === "ArrowDown") nextIndex = (index + 1) % menuLinks.length;
      if (event.key === "ArrowUp") nextIndex = (index - 1 + menuLinks.length) % menuLinks.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = menuLinks.length - 1;
      if (nextIndex !== null) {
        event.preventDefault();
        menuLinks[nextIndex].focus();
      }
    });
  });
  siteHeader.addEventListener("pointerleave", () => {
    cancelPendingDropdownSwitch();
    activePointerDropdown = null;
    activePointerMenuReached = false;
    if (desktopPointer.matches && !siteHeader.querySelector(":focus-visible")) closeDropdowns();
  });
  nav.querySelectorAll(".nav-item:not(.nav-dropdown)").forEach((item) => {
    item.addEventListener("pointerenter", () => {
      if (!desktopPointer.matches) return;
      if (!activePointerDropdown || !activePointerDropdown.classList.contains("is-open") || activePointerMenuReached) {
        closeDropdowns();
        activePointerDropdown = null;
        activePointerMenuReached = false;
      }
    });
  });
  nav.querySelectorAll(".nav-menu-toggle, .nav-menu-trigger").forEach((trigger) => {
    trigger.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowDown") return;
      event.preventDefault();
      const dropdown = trigger.closest(".nav-dropdown");
      closeDropdowns(dropdown);
      setDropdownOpen(dropdown, true);
      const firstLink = dropdown.querySelector(".nav-dropdown-menu a");
      if (firstLink) firstLink.focus();
    });
  });
  document.addEventListener("click", (event) => {
    if (event.target instanceof Element && !nav.contains(event.target)) closeDropdowns();
  });
  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    nav.classList.toggle("is-open", !isOpen);
  });
  nav.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) closeNav();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const openDropdown = dropdowns.find((dropdown) => dropdown.classList.contains("is-open"));
    if (openDropdown) {
      const trigger = openDropdown.querySelector(".nav-menu-toggle, .nav-menu-trigger");
      setDropdownOpen(openDropdown, false);
      trigger.focus();
    } else if (toggle.getAttribute("aria-expanded") === "true") {
      closeNav();
      toggle.focus();
    }
  });
}

document.querySelectorAll("[data-mailto-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!(form instanceof HTMLFormElement) || !form.reportValidity()) return;
    const values = new FormData(form);
    const name = String(values.get("name") || "").trim();
    const email = String(values.get("email") || "").trim();
    const subject = String(values.get("subject") || "").trim();
    const message = String(values.get("message") || "").trim();
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailto = `mailto:sales@vibrantick.org?subject=${encodeURIComponent(`Project enquiry: ${subject}`)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  });
});

if (footer) {
  const offices = [
    {
      name: "Mohali, India",
      address: "Office No. 36, Second Floor, D-185, Phase 8B, Industrial Area, Sector 74, Mohali, Punjab - 160055",
      phone: "+91 98704 43528",
      tel: "+919870443528",
      map: "https://www.google.com/maps/search/?api=1&query=D-185+Phase+8B+Sector+74+Mohali+Punjab"
    },
    {
      name: "Noida, India",
      address: "D-626, Urbtech Trade Centre, Sector 132, Noida - 201304",
      phone: "+91 86995 24005",
      tel: "+918699524005",
      map: "https://www.google.com/maps/search/?api=1&query=Urbtech+Trade+Centre+Sector+132+Noida"
    },
    {
      name: "United States",
      address: "8 Margaret Dr, Pine Brook, New Jersey 07058, United States",
      phone: "+1 (862) 803-4148",
      tel: "+18628034148",
      map: "https://www.google.com/maps/search/?api=1&query=8+Margaret+Dr+Pine+Brook+New+Jersey+07058"
    },
    {
      name: "Australia",
      address: "Level 1, 39/55 Gawler Place, Adelaide SA 5000, Australia",
      phone: "+61 466 522 307",
      tel: "+61466522307",
      map: "https://www.google.com/maps/search/?api=1&query=39+Gawler+Place+Adelaide+SA+5000"
    },
    {
      name: "Poland",
      address: "Stefana Okrzei 81, Poland",
      phone: "+48 668 970 526",
      tel: "+48668970526",
      map: "https://www.google.com/maps/search/?api=1&query=Stefana+Okrzei+81+Poland"
    }
  ];
  const officeCards = offices.map((office) => `
    <article class="trust-card footer-office-card">
      <h3 class="badge-logo-text">${office.name}</h3>
      <p>${office.address}</p>
      <p><a href="tel:${office.tel}">${office.phone}</a> · <a href="${office.map}" target="_blank" rel="noopener noreferrer">View map</a></p>
    </article>`).join("");
  const currentYear = new Date().getFullYear();

  
footer.innerHTML = `
<footer class="site-footer footer-section style-2 footer-homepage">

  <div class="container footer-container">

    <!-- Brand and contact -->
    <div class="v-footer-top">
      <a class="v-footer-brand" href="${localUrl("index.html")}" aria-label="Vibrantick home">
        <img src="${localUrl("assets/img/vibranticklogo.png")}"
             alt="Vibrantick Infotech Solutions">
      </a>

      <div class="v-footer-contact">
        <a class="v-footer-contact-item" href="mailto:sales@vibrantick.org">
          <span class="v-footer-contact-icon"><i class="bi bi-envelope"></i></span>
          <span>
            <small>Email us</small>
            <strong>sales@vibrantick.org</strong>
          </span>
        </a>

        <a class="v-footer-contact-item" href="tel:+919870443528">
          <span class="v-footer-contact-icon"><i class="bi bi-telephone"></i></span>
          <span>
            <small>Call us</small>
            <strong>+91 98704 43528</strong>
          </span>
        </a>
      </div>
    </div>

    <div class="v-footer-divider"></div>

    <!-- Footer links -->
    <div class="v-footer-main">

      <section class="v-footer-about">
        <h2 class="v-footer-heading">About Vibrantick</h2>
        <p>
          Vibrantick Infotech Solutions offers web design and development,
          software development, IT, cloud and managed services, digital marketing,
          e-commerce management, database services and training.
        </p>

        <h3 class="v-footer-subheading">Connect With Us</h3>
        <div class="v-footer-socials">
          <a href="https://www.linkedin.com/company/vibrantick-infotech-solutions/"
             target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i class="bi bi-linkedin"></i>
          </a>
          <a href="https://www.facebook.com/vibranticksolutions/"
             target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <i class="bi bi-facebook"></i>
          </a>
          <a href="https://twitter.com/vibrantick"
             target="_blank" rel="noopener noreferrer" aria-label="X">
            <i class="bi bi-twitter-x"></i>
          </a>
          <a href="https://www.instagram.com/vibrantickinfotech/"
             target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <i class="bi bi-instagram"></i>
          </a>
          <a href="https://in.pinterest.com/vibrantick/"
             target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
            <i class="bi bi-pinterest"></i>
          </a>
        </div>
      </section>

      <nav class="v-footer-links" aria-label="Our Services">
        <h2 class="v-footer-heading">Our Services</h2>
        <ul>
          <li><a href="${localUrl("services/cloud-services.html")}">Cloud Services</a></li>
          <li><a href="${localUrl("services/cyber-security.html")}">Cyber Security</a></li>
          <li><a href="${localUrl("services/devsecops.html")}">DevSecOps</a></li>
          <li><a href="${localUrl("services/database-management.html")}">Database Management</a></li>
          <li><a href="${localUrl("services/web-development.html")}">Web Development</a></li>
          <li><a href="${localUrl("services/enterprise-software.html")}">Enterprise Software</a></li>
        </ul>
      </nav>

      <nav class="v-footer-links" aria-label="Company">
        <h2 class="v-footer-heading">Company</h2>
        <ul>
          <li><a href="${localUrl("index.html")}">Home</a></li>
          <li><a href="${localUrl("about.html")}">About Us</a></li>
          <li><a href="${localUrl("work/index.html")}">Our Work</a></li>
          <li><a href="${localUrl("contact.html")}">Contact Us</a></li>
        </ul>
      </nav>

      <nav class="v-footer-links" aria-label="Support">
        <h2 class="v-footer-heading">Support</h2>
        <ul>
          <li><a href="${localUrl("contact.html")}">Contact Support</a></li>
          <li><a href="${localUrl("privacy-policy.html")}">Privacy Policy</a></li>
          <li><a href="${localUrl("cookies-policy.html")}">Cookies Policy</a></li>
          <li><a href="${localUrl("terms-and-conditions.html")}">Terms &amp; Conditions</a></li>
        </ul>
      </nav>

    </div>

    <!-- Office locations -->
    <section class="v-footer-offices" aria-labelledby="v-footer-offices-title">
      <div class="v-footer-office-heading">
        <div>
          <span class="v-footer-eyebrow">OUR LOCATIONS</span>
          <h2 id="v-footer-offices-title">Our Offices</h2>
          <p>Connecting with businesses across locations.</p>
        </div>
      </div>

      <div class="v-footer-office-grid">
        ${officeCards}
      </div>
    </section>

  </div>

  <!-- Full-width copyright strip -->
  <div class="v-footer-bottom">
    <div class="container v-footer-bottom-inner">
      <p>
        &copy; ${currentYear}
        <a href="${localUrl("index.html")}">Vibrantick Infotech Solutions</a>.
        All Rights Reserved.
      </p>

      <div class="v-footer-legal">
        <a href="${localUrl("privacy-policy.html")}">Privacy Policy</a>
        <span></span>
        <a href="${localUrl("terms-and-conditions.html")}">Terms &amp; Conditions</a>
      </div>
    </div>
  </div>

</footer>`;


}

const whoStatCounters = document.querySelectorAll(".home-page .who-stat-count[data-count]");
if (whoStatCounters.length && "IntersectionObserver" in window) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reducedMotion) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const counter = entry.target;
        const target = Number(counter.dataset.count);
        if (!Number.isFinite(target) || target < 0) {
          observer.unobserve(counter);
          return;
        }
        const duration = 800;
        const startTime = performance.now();
        const updateCounter = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const easedProgress = 1 - (1 - progress) ** 3;
          counter.textContent = String(Math.floor(target * easedProgress));
          if (progress < 1) {
            window.requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = String(target);
          }
        };
        window.requestAnimationFrame(updateCounter);
        observer.unobserve(counter);
      });
    }, { threshold: 0.55 });
    whoStatCounters.forEach((counter) => {
      if (Number.isFinite(Number(counter.dataset.count)) && Number(counter.dataset.count) >= 0) {
        counter.textContent = "0";
        counterObserver.observe(counter);
      }
    });
  }
}


/* Industries & Learning tabs */
document.querySelectorAll(".technology-section").forEach((section) => {
  const tabs = section.querySelectorAll(".technology-tab");
  const panels = section.querySelectorAll(".technology-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.dataset.panel;

      tabs.forEach((item) => {
        const isActive = item === tab;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-selected", String(isActive));
      });

      panels.forEach((panel) => {
        const isActive = panel.id === targetId;
        panel.classList.toggle("active", isActive);
        panel.hidden = !isActive;
      });
    });
  });
});



document.addEventListener("DOMContentLoaded", function () {
  const techSection = document.querySelector("#technologies");

  if (!techSection) return;

  const tabs = techSection.querySelectorAll(".tech-tab");
  const cards = techSection.querySelectorAll(".tech-card");

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      const category = tab.dataset.category;

      tabs.forEach(function (item) {
        item.classList.remove("active");
        item.setAttribute("aria-pressed", "false");
      });

      tab.classList.add("active");
      tab.setAttribute("aria-pressed", "true");

      cards.forEach(function (card) {
        const matches =
          category === "all" ||
          card.dataset.category === category;

        card.hidden = !matches;
      });
    });

    tab.setAttribute(
      "aria-pressed",
      tab.classList.contains("active") ? "true" : "false"
    );
  });
});
