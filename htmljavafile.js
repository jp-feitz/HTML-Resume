// ====== Experience: click a block to show or hide the details ======
document.querySelectorAll(".block--toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const desc = btn.nextElementSibling;
    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    desc.classList.toggle("is-open", !open);
  });
});

// Open the current role by default
const firstRole = document.querySelector(".block--toggle");
if (firstRole) firstRole.click();

// ====== Scroll reveal (staggered within each group) ======
const reveals = document.querySelectorAll(".reveal");

reveals.forEach((el) => {
  const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
  el.style.setProperty("--d", Math.min(siblings.indexOf(el), 5) * 100 + "ms");
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  reveals.forEach((el) => revealObserver.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-in"));
}

// ====== Underline the nav link for the section in view ======
const navLinks = document.querySelectorAll(".nav a");
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((a) =>
        a.classList.toggle("is-current", a.getAttribute("href") === "#" + entry.target.id)
      );
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });

document.querySelectorAll("main section[id]").forEach((s) => navObserver.observe(s));

// ====== Contact form: opens the visitor's email app with the message filled in ======
const form = document.getElementById("contactForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const d = new FormData(form);
  const name = `${d.get("first")} ${d.get("last")}`.trim();
  const subject = `Message from ${name}`;
  const body = `${d.get("message") || ""}\n\n${name}\n${d.get("email")}`;
  window.location.href =
    "mailto:jpfeitshans@comcast.net?subject=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(body);
});

// ====== Footer year ======
document.getElementById("year").textContent = new Date().getFullYear();
