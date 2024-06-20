export function showTab(idTabName) {
    let tabContent = document.querySelectorAll(".tab-content");

    tabContent.forEach((taba) => {
        taba.style.display = "none";
    });

    document.getElementById(idTabName).style.display = "block";
}