const container = document.getElementById("container");

// create 16*16 grid of square divs in conatiner
let gridPerSide = 16;
addGrid(gridPerSide);

function addGrid(gridPerSide) {
    gridSize = gridPerSide ** 2;
    for (let i = 0; i < gridSize; i++) {
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

// get gridPerSide from user
const resizeBtn = document.getElementById("resizeBtn");
resizeBtn.addEventListener("click", () => promptForNewGrid());

function promptForNewGrid() {
    gridPerSide = parseInt(prompt("How many squares per side (1-100) :"));
    while (gridPerSide < 1 || !Number.isInteger(gridPerSide) || gridPerSide > 100) {
        gridPerSide = parseInt(prompt("Please enter number between 1 - 100 :"));
    }
    // after get grid per side remove old grid
    removeOldGrid();
    //changeGridSize(gridPerSide);
    addGrid(gridPerSide);
}

// remove old grid by clear all element in container
function removeOldGrid() {
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }
}

function changeGridSize(gridPerSide) {
    let width = container.style.width / gridPerSide;
    grid.forEach(function (item) {
        item.style.width = container.style.width / gridPerSide;
    })

    grid.style.width = container.style.width / gridPerSide;
    grid.style.height = container.style.height / gridPerSide;

}