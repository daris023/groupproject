const pages = document.querySelectorAll(".page");
const sidebarItems = document.querySelectorAll(".sidebar li");
const navLinks = document.querySelectorAll(".navbar a");
const logoutBtn = document.querySelector(".logout-btn");
const tableBody = document.querySelector("tbody");
const cards = document.querySelectorAll(".card h2");
const form = document.getElementById("announcementForm");
const status = document.getElementById("formStatus");

let announcements = JSON.parse(localStorage.getItem("announcements")) || [];

let students = [
    { name: "Deon Qirezi", class: "IX-2", avg: 4.6, status: "Active" },
    { name: "Arta Krasniqi", class: "VIII-1", avg: 4.9, status: "Active" },
    { name: "Daris Shala", class: "X/F", avg: 4.3, status: "Active" },
    { name: "Elion Shkololli", class: "X/F", avg: 5.0, status: "Active" },
];

function showPage(id) {
    pages.forEach(p => p.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
}

function renderStudents() {
    tableBody.innerHTML = "";
    students.forEach(s => {
        tableBody.innerHTML += `
            <tr>
                <td>${s.name}</td>
                <td>${s.class}</td>
                <td>${s.avg}</td>
                <td class="${s.status === "Active" ? "active" : "inactive"}">
                    ${s.status}
                </td>
            </tr>
        `;
    });
}

function updateStats() {
    cards[0].textContent = students.length;
    cards[3].textContent = announcements.length;
}

renderStudents();
updateStats();

// Sidebar navigation
sidebarItems.forEach(item => {
    item.addEventListener("click", () => {
        const t = item.textContent.toLowerCase();
        if (t.includes("dashboard")) showPage("dashboard");
        if (t.includes("student")) showPage("students");
        if (t.includes("teacher")) showPage("teachers");
        if (t.includes("grade")) showPage("grades");
        if (t.includes("schedule")) showPage("schedule");
    });
});

// Navbar links
navLinks.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const t = link.textContent.toLowerCase();
        if (t.includes("dashboard")) showPage("dashboard");
        if (t.includes("student")) showPage("students");
        if (t.includes("teacher")) showPage("teachers");
        if (t.includes("grade")) showPage("grades");
        if (t.includes("schedule")) showPage("schedule");
    });
});

// Logout button
logoutBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to logout?")) {
        localStorage.clear();
        location.reload();
    }
});

// Announcement form submit
form.addEventListener("submit", e => {
    e.preventDefault();

    // Save locally
    announcements.push({ date: new Date() });
    localStorage.setItem("announcements", JSON.stringify(announcements));
    updateStats();

    // Send to Formspree
    fetch("https://formspree.io/f/xvzrorvz", {
        method: "POST",
        body: new FormData(form),
        headers: {
            "Accept": "application/json"
        }
    })
    .then(res => {
        if (!res.ok) throw new Error("Formspree failed");
        form.reset();
        status.style.display = "block"; // Show success message
        setTimeout(() => status.style.display = "none", 5000);
        console.log("Announcement sent + saved");
    })
    .catch(err => {
        console.error(err);
        alert("Error sending announcement!");
    });
});
