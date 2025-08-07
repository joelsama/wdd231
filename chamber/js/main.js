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

document.querySelector("#year").textContent = new Date().getFullYear();

// Load feature cards from JSON
async function loadFeatures() {
  try {
    const response = await fetch("data/features.json");
    const data = await response.json();
    const container = document.querySelector("#feature-cards");

    data.forEach(item => {
      const card = document.createElement("article");
      card.innerHTML = `
        <h2>${item.name}</h2>
        <figure>
          <img src="${item.image}" alt="${item.name}" loading="lazy" width="300" height="200">
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button>Learn More</button>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading features:", error);
  }
}

// Visit tracking
function displayVisitMessage() {
  const messageElement = document.getElementById("visit-message");
  const now = Date.now();
  const lastVisit = localStorage.getItem("lastVisit");

  if (!lastVisit) {
    messageElement.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const difference = now - Number(lastVisit);
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    if (days < 1) {
      messageElement.textContent = "Back so soon! Awesome!";
    } else {
      messageElement.textContent = `You last visited ${days} day${days === 1 ? '' : 's'} ago.`;
    }
  }

  localStorage.setItem("lastVisit", now);
}

loadFeatures();
displayVisitMessage();
