const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("forbidden-layer-theme");
if (savedTheme === "light" || savedTheme === "dark") {
    root.dataset.theme = savedTheme;
}

function updateThemeButton() {
    const dark = root.dataset.theme === "dark";
    themeToggle.setAttribute("aria-pressed", String(dark));
    themeToggle.setAttribute(
        "aria-label",
        dark ? "Switch to light mode" : "Switch to dark mode"
    );
}

themeToggle.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("forbidden-layer-theme", root.dataset.theme);
    updateThemeButton();
});

updateThemeButton();

const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main, .content-section");

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const id = entry.target.id;
            navLinks.forEach(link => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === `#${id}`
                );
            });
        });
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
);

sections.forEach(section => observer.observe(section));
