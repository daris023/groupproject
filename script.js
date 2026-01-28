const pages = document.querySelectorAll(".page")
const sidebarItems = document.querySelectorAll(".sidebar li")
const navLinks = document.querySelectorAll(".navbar a")
const logoutBtn = document.querySelector(".logout-btn")
const tableBody = document.querySelector("tbody")
const cards = document.querySelectorAll(".card h2")
const form = document.getElementById("announcementForm")

let announcements = JSON.parse(localStorage.getItem("announcements")) || []

let students = [
    { name: "Deon Qirezi", class: "IX-2", avg: 4.6, status: "Active" },
    { name: "Arta Krasniqi", class: "VIII-1", avg: 4.9, status: "Active" },
    { name: "Jon Berisha", class: "IX-3", avg: 3.8, status: "Inactive" }
]

function showPage(id) {
    pages.forEach(p => p.classList.add("hidden"))
    document.getElementById(id).classList.remove("hidden")
}

function renderStudents() {
    tableBody.innerHTML = ""
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
        `
    })
}

function updateStats() {
    cards[0].textContent = students.length
    cards[3].textContent = announcements.length
}

renderStudents()
updateStats()

sidebarItems.forEach(item => {
    item.addEventListener("click", () => {
        const t = item.textContent.toLowerCase()
        if (t.includes("dashboard")) showPage("dashboard")
        if (t.includes("student")) showPage("students")
        if (t.includes("teacher")) showPage("teachers")
        if (t.includes("grade")) showPage("grades")
        if (t.includes("schedule")) showPage("schedule")
    })
})

navLinks.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault()
        const t = link.textContent.toLowerCase()
        if (t.includes("dashboard")) showPage("dashboard")
        if (t.includes("student")) showPage("students")
        if (t.includes("teacher")) showPage("teachers")
        if (t.includes("grade")) showPage("grades")
        if (t.includes("schedule")) showPage("schedule")
    })
})

logoutBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to logout?")) {
        localStorage.clear()
        location.reload()
    }
})

form.addEventListener("submit", e => {
    e.preventDefault()
    announcements.push({ date: new Date() })
    localStorage.setItem("announcements", JSON.stringify(announcements))
    updateStats()
    form.reset()
})
