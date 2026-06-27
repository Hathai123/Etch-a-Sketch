const container = document.getElementById("container");

addGrid(16*16);
function addGrid(piece){
for (let i = 0; i < piece; i++) {
    const div = document.createElement("div");
    div.setAttribute("class", "blank");
    container.appendChild(div);
}}
