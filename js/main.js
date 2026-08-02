/* ==========================================================================
   main.js
   Portfolio interactions: theme, navigation, section state, reveal effects
   and utility controls.
   ========================================================================== */

(() => {
  "use strict";

  const root = document.documentElement;
  const body = document.body;
  const header = document.querySelector("body > header");
  const navigation = document.querySelector("#main-navigation");
  const menuButton = document.querySelector(".menu-button");
  const themeButton = document.querySelector(".theme-toggle");
  const themeIcon = themeButton?.querySelector("i");
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  const navigationLinks = [
    ...document.querySelectorAll('#main-navigation a[href^="#"]')
  ];

  const mobileMedia = window.matchMedia("(max-width: 68rem)");
  const reducedMotionMedia = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );
  const systemThemeMedia = window.matchMedia(
    "(prefers-color-scheme: light)"
  );

  let userSelectedTheme = false;
  let scrollFrameRequested = false;

  /* ------------------------------------------------------------------------
     Safe localStorage helpers
     ------------------------------------------------------------------------ */

  const readStoredTheme = () => {
    try {
      const value = localStorage.getItem("theme");
      return value === "light" || value === "dark" ? value : null;
    } catch {
      return null;
    }
  };

  const storeTheme = (theme) => {
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* The site still works when storage is unavailable. */
    }
  };

  /* ------------------------------------------------------------------------
     Theme
     ------------------------------------------------------------------------ */

  const getPreferredTheme = () => {
    const storedTheme = readStoredTheme();

    if (storedTheme) {
      userSelectedTheme = true;
      return storedTheme;
    }

    return systemThemeMedia.matches ? "light" : "dark";
  };

  const updateThemeControl = (theme) => {
    if (!themeButton || !themeIcon) return;

    const lightThemeActive = theme === "light";
    const label = lightThemeActive
      ? "Switch to dark theme"
      : "Switch to light theme";

    themeIcon.classList.toggle("fa-sun", lightThemeActive);
    themeIcon.classList.toggle("fa-moon", !lightThemeActive);

    themeButton.setAttribute("aria-label", label);
    themeButton.setAttribute("title", label);
    themeButton.setAttribute(
      "aria-pressed",
      String(lightThemeActive)
    );
  };

  const updateThemeColor = (theme) => {
    if (!themeColorMeta) return;

    themeColorMeta.setAttribute(
      "content",
      theme === "light" ? "#f4f6f8" : "#1f1f1f"
    );
  };

  const applyTheme = (theme, persist = false) => {
    const normalizedTheme = theme === "light" ? "light" : "dark";

    root.dataset.theme = normalizedTheme;
    body.classList.remove("light-mode");

    if (persist) {
      userSelectedTheme = true;
      storeTheme(normalizedTheme);
    }

    updateThemeControl(normalizedTheme);
    updateThemeColor(normalizedTheme);
  };

  applyTheme(root.dataset.theme || getPreferredTheme());

  themeButton?.addEventListener("click", () => {
    const nextTheme =
      root.dataset.theme === "light" ? "dark" : "light";

    applyTheme(nextTheme, true);
  });

  systemThemeMedia.addEventListener?.("change", (event) => {
    if (!userSelectedTheme) {
      applyTheme(event.matches ? "light" : "dark");
    }
  });

  /* ------------------------------------------------------------------------
     Responsive navigation
     ------------------------------------------------------------------------ */

  const isMenuOpen = () =>
    navigation?.classList.contains("active") ?? false;

  const setMenuState = (open, returnFocus = false) => {
    if (!navigation || !menuButton) return;

    navigation.classList.toggle("active", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute(
      "aria-label",
      open ? "Close menu" : "Open menu"
    );

    const icon = menuButton.querySelector("i");

    icon?.classList.toggle("fa-bars", !open);
    icon?.classList.toggle("fa-xmark", open);

    body.classList.toggle(
      "no-scroll",
      open && mobileMedia.matches
    );

    if (!open && returnFocus) {
      menuButton.focus();
    }
  };

  menuButton?.addEventListener("click", () => {
    setMenuState(!isMenuOpen());
  });

  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileMedia.matches) {
        setMenuState(false);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isMenuOpen()) {
      setMenuState(false, true);
    }
  });

  document.addEventListener("pointerdown", (event) => {
    if (
      mobileMedia.matches &&
      isMenuOpen() &&
      navigation &&
      menuButton &&
      !navigation.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      setMenuState(false);
    }
  });

  mobileMedia.addEventListener?.("change", () => {
    setMenuState(false);
  });

  /* ------------------------------------------------------------------------
     Header and active section
     ------------------------------------------------------------------------ */

  const sections = navigationLinks
    .map((link) => {
      const selector = link.getAttribute("href");
      return selector ? document.querySelector(selector) : null;
    })
    .filter(Boolean);

  const setActiveLink = (sectionId) => {
    navigationLinks.forEach((link) => {
      const active =
        link.getAttribute("href") === `#${sectionId}`;

      link.classList.toggle("active", active);

      if (active) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const updatePageState = () => {
    scrollFrameRequested = false;

    header?.classList.toggle("scrolled", window.scrollY > 12);

    if (!sections.length) return;

    const headerHeight = header?.offsetHeight ?? 0;
    const referenceLine =
      window.scrollY + headerHeight + window.innerHeight * 0.24;

    let currentSection = sections[0];

    sections.forEach((section) => {
      if (section.offsetTop <= referenceLine) {
        currentSection = section;
      }
    });

    const nearPageBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 8;

    if (nearPageBottom) {
      currentSection = sections[sections.length - 1];
    }

    if (currentSection?.id) {
      setActiveLink(currentSection.id);
    }
  };

  const requestPageStateUpdate = () => {
    if (scrollFrameRequested) return;

    scrollFrameRequested = true;
    window.requestAnimationFrame(updatePageState);
  };

  updatePageState();

  window.addEventListener(
    "scroll",
    requestPageStateUpdate,
    { passive: true }
  );

  window.addEventListener("resize", requestPageStateUpdate);

  /* ------------------------------------------------------------------------
     Progressive reveal
     ------------------------------------------------------------------------ */

  const revealTargets = document.querySelectorAll(
    [
      ".content-container",
      ".education-card",
      ".experience-card",
      ".project-card",
      ".publication-card",
      ".area-card"
    ].join(",")
  );

  if (
    "IntersectionObserver" in window &&
    !reducedMotionMedia.matches
  ) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -7% 0px",
        threshold: 0.08
      }
    );

    revealTargets.forEach((element) => {
      element.classList.add("reveal");
      revealObserver.observe(element);
    });
  } else {
    revealTargets.forEach((element) => {
      element.classList.add("visible");
    });
  }

  /* ------------------------------------------------------------------------
     Scroll-to-top button
     ------------------------------------------------------------------------ */

  const scrollButton = document.createElement("button");

  scrollButton.type = "button";
  scrollButton.className = "scroll-to-top";
  scrollButton.setAttribute("aria-label", "Back to top");
  scrollButton.setAttribute("title", "Back to top");
  scrollButton.innerHTML =
    '<i class="fas fa-arrow-up" aria-hidden="true"></i>';

  document.body.appendChild(scrollButton);

  const updateScrollButton = () => {
    scrollButton.classList.toggle(
      "visible",
      window.scrollY > 600
    );
  };

  updateScrollButton();

  window.addEventListener(
    "scroll",
    updateScrollButton,
    { passive: true }
  );

  scrollButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: reducedMotionMedia.matches
        ? "auto"
        : "smooth"
    });
  });

  /* ------------------------------------------------------------------------
     Dynamic footer year
     ------------------------------------------------------------------------ */

  const yearElement = document.querySelector("#current-year");

  if (yearElement) {
    yearElement.textContent =
      String(new Date().getFullYear());
  }
})();
