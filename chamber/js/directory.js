document.addEventListener("DOMContentLoaded", () => {
  const membersContainer = document.getElementById("membersContainer");
  const gridViewBtn = document.getElementById("gridView");
  const listViewBtn = document.getElementById("listView");

  let membersData = [];

  // Footer last modified
  document.getElementById("lastModified").textContent = document.lastModified;

  // Fetch members JSON
  async function fetchMembers() {
    try {
      const response = await fetch("data/members.json");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      membersData = await response.json();
      console.log("Members loaded:", membersData);
      displayMembers("grid");
    } catch (error) {
      console.error("Error loading members:", error);
      membersContainer.innerHTML = "<p style='color:red;'>Error loading members data.</p>";
    }
  }

  // Display members in chosen view
  function displayMembers(view) {
    membersContainer.innerHTML = "";

    if (view === "grid") {
      membersContainer.className = "grid-view";
      membersData.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("member-card");
        card.innerHTML = `
          <img src="images/${member.image}" alt="${member.name}">
          <h3>${member.name}</h3>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <a href="${member.website}" target="_blank">Visit Website</a>
        `;
        membersContainer.appendChild(card);
      });
    } else {
      membersContainer.className = "list-view";
      membersData.forEach(member => {
        const item = document.createElement("div");
        item.classList.add("member-list");
        item.innerHTML = `
          <h3>${member.name}</h3>
          <p>${member.address} | ${member.phone} | 
          <a href="${member.website}" target="_blank">Website</a></p>
        `;
        membersContainer.appendChild(item);
      });
    }
  }

  // View toggle events
  gridViewBtn.addEventListener("click", () => displayMembers("grid"));
  listViewBtn.addEventListener("click", () => displayMembers("list"));

  // Start
  fetchMembers();
});
