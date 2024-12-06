// export function showTab(idTabName) {
//     let tabContent = document.querySelectorAll(".tab-content");

//     tabContent.forEach((taba) => {
//         taba.style.display = "none";
//     });

//     document.getElementById(idTabName).style.display = "block";
// };

export function showTab(idTabName) {
    let tabContent = document.querySelectorAll(".tab-content");
    let tabButtons = document.querySelectorAll(".tab-button");

    tabContent.forEach((taba) => {
        taba.style.display = "none";
        taba.classList.remove("active");
    });

    tabButtons.forEach((button) => {
        button.classList.remove("active");
    });

    document.getElementById(idTabName).style.display = "block";
    document.getElementById(idTabName).classList.add("active");

    const defaultButtonId = `tab-button-${idTabName.split('-')[1]}`;
    const defaultButton = document.getElementById(defaultButtonId);
    defaultButton.classList.add("active");
}
