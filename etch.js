const container = document.getElementById("container");

// create 16*16 grid of square divs in conatiner
addGrid(16 ** 2);

function addGrid(piece) {
    for (let i = 0; i < piece; i++) {
        const div = document.createElement("div");
        div.setAttribute("class", "blank");
        container.appendChild(div);
    }
}


const grid = document.querySelectorAll(".blank");
grid.forEach(function (item) {
    item.addEventListener("mouseover", event => changeColor(event.currentTarget))
})

function changeColor(gridBox) {
    gridBox.style.backgroundColor = "black";
}