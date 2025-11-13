// script.js - Collapse/Expand Job Sections
document.addEventListener("DOMContentLoaded", function () {
  const openBtns = document.querySelectorAll(".openBtn");

  openBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      const job = this.closest(".job");
      const content = job.querySelector("p");
      const icon = this;

      // Toggle visibility
      if (content.style.display === "none") {
        content.style.display = "block";
        icon.classList.remove("fa-plus");
        icon.classList.add("fa-minus");
      } else {
        content.style.display = "none";
        icon.classList.remove("fa-minus");
        icon.classList.add("fa-plus");
      }
    });
  });

  // Hide all job details by default except the first one
  document.querySelectorAll(".job p").forEach((p, index) => {
    if (index !== 0) {
      p.style.display = "none";
      const icon = p.closest(".job").querySelector(".openBtn");
      icon.classList.remove("fa-minus");
      icon.classList.add("fa-plus");
    }
  });
});
