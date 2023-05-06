const mainSection = document.getElementById("main-section")
const sidebar = document.getElementById("sidebar")

function sidebarToggler() {
    mainSection.classList.toggle("active-sidebar")
    sidebar.classList.toggle("active-sidebar")
}
