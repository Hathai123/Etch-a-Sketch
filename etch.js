const container = document.getElementById("container");

// default grid per side 16
let gridPerSide = 16;
let width = 0;

setGridWidth(gridPerSide);
// get width from container's width / number of grid
// it's square so width and height is the same
function setGridWidth(gridPerSide) {
    width = container.offsetWidth / gridPerSide;
}

addGrid(gridPerSide,width);

// make grid by create blank div 
function addGrid(gridPerSide,width) {
    gridSize = gridPerSide ** 2;
    for (let i = 0; i < gridSize; i++) {
        const div = document.createElement("div");
        div.setAttribute("class", "blank");
        div.setAttribute("style", `background-color:white; height:${width}px; width:${width}px;`);
        container.appendChild(div);
    }
    const grid = document.querySelectorAll(".blank");
    grid.forEach(function (item) {
        item.addEventListener("mouseover", event => changeColor(event.currentTarget))
    })
}


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
    clearContainer()
}

// remove old grid by clear all element in container
function removeOldGrid() {
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }
}

const clear = document.getElementById("clear");
clear.addEventListener("click", () => clearContainer());

function clearContainer(){
    removeOldGrid();
    setGridWidth(gridPerSide);
    addGrid(gridPerSide, width);
}