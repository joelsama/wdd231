document.getElementById('menuBtn').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('active');
});

// Directory population logic
async function loadMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('Network response failed');
    const data = await response.json();
    const container = document.getElementById('membersContainer');
    if (!container) return;

    data.members.forEach(member => {
      const card = document.createElement('div');
      card.innerHTML = `
        <h3>${member.name}</h3>
        <p><strong>Role:</strong> ${member.role}</p>
        <p><strong>Email:</strong> <a href="mailto:${member.email}">${member.email}</a></p>
        <p><strong>Joined:</strong> ${member.joined}</p>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error('Error fetching members:', err);
  }
}

loadMembers();
