// Mobile menu toggle
document.getElementById("menuToggle")?.addEventListener("click", () => {
  document.querySelector("nav ul").classList.toggle("show");
});

// Add timestamp to hidden field in join form
const timestampField = document.getElementById("timestamp");
if (timestampField) {
  timestampField.value = new Date().toISOString();
}

// Modal functionality
document.querySelectorAll('[data-modal]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById(link.dataset.modal).showModal();
  });
});

document.querySelectorAll('.close-modal').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('dialog').close();
  });
});
