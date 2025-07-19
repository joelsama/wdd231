const courses = [
  { code: 'WDD 130', name: 'Web Fundamentals', credits: 2, completed: true },
  { code: 'CSE 121b', name: 'JavaScript Language', credits: 2, completed: false },
  { code: 'WDD 231', name: 'Frontend I', credits: 2, completed: false },
  // Add more courses...
];

const container = document.getElementById("courseContainer");
const totalDisplay = document.getElementById("totalCredits");

function renderCourses(list) {
  container.innerHTML = '';
  let total = 0;
  list.forEach(course => {
    const div = document.createElement('div');
    div.className = course.completed ? 'completed' : 'not-completed';
    div.innerHTML = `<strong>${course.code}</strong>: ${course.name} - ${course.credits} credits`;
    container.appendChild(div);
    total += course.credits;
  });
  totalDisplay.textContent = total;
}

document.getElementById("all").addEventListener("click", () => renderCourses(courses));
document.getElementById("wdd").addEventListener("click", () =>
  renderCourses(courses.filter(c => c.code.startsWith("WDD")))
);
document.getElementById("cse").addEventListener("click", () =>
  renderCourses(courses.filter(c => c.code.startsWith("CSE")))
);

// Initial render
renderCourses(courses);
