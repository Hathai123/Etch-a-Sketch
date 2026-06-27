const container = document.getElementById("container");

// default grid per side 16
let gridPerSide = 16;
let width = 0;
// default mode normal
let mode = "normal";

// find grid width
setGridWidth(gridPerSide);
// make grid
addGrid(gridPerSide, width);


// get width from container's width / number of grid
// it's square so width and height is the same
function setGridWidth(gridPerSide) {
    width = container.offsetWidth / gridPerSide;
}

// make grid by create blank div 
function addGrid(gridPerSide, width) {
    // if in rgb mode let start with black
    const startColor = (mode === "rgb") ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)";

    gridSize = gridPerSide ** 2;
    for (let i = 0; i < gridSize; i++) {
        const div = document.createElement("div");
        div.setAttribute("class", "blank");
        div.setAttribute("style", `background-color:${startColor}; height:${width}px; width:${width}px;`);

        container.appendChild(div);
    }
    assignColorChange(mode);
}

function assignColorChange(mode) {
    const grid = document.querySelectorAll(".blank");
    switch (mode) {
        case "normal":
            grid.forEach(function (item) {
                item.addEventListener("mouseover", event => changeBlack(event.target))
            })
            break;
        case "rgb":
            grid.forEach(function (item) {
                item.addEventListener("mouseover", event => changeRGB(event.target))
            })
            break;
        case "darken":
            grid.forEach(function (item) {
                item.addEventListener("mouseover",
                    function (event) {
                        if (event.target.style.backgroundColor !== "rgb(0, 0, 0)")
                            changeDarken(event.target)
                    })
            })
            break;
    }
}

// post color in normal mode | change to black
function changeBlack(gridBox) {
    gridBox.style.backgroundColor = "rgb(0,0,0)";
}

// post color in RGB mode | change to random rgb
function changeRGB(gridBox) {
    const color = randomRGB();
    gridBox.style.backgroundColor = color;
}
function randomRGB() {
    return `rgb(${randColorNum()},${randColorNum()},${randColorNum()})`;
}
function randColorNum() {
    return Math.floor(Math.random() * 256);
}

// post color in darken mode
function changeDarken(gridBox) {
    const color = colorDarken(gridBox.style.backgroundColor);
    gridBox.style.backgroundColor = color;
}
function colorDarken(nowColor) {
    if (nowColor === "rgb(0, 0, 0)") return nowColor;
    // split color code to get in value
    const colorCode = nowColor.slice(4, -1).split(', ');
    // shift color code by 17 and join all to from color code back
    const newColor = colorCode.map(num => num - 17).join(', ');
    return `rgb(${newColor})`;
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

//clear button
const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", () => clearContainer());

function clearContainer() {
    removeOldGrid();
    setGridWidth(gridPerSide);
    addGrid(gridPerSide, width);
}

// rgb button
const rgbBtn = document.getElementById("rgb");
rgbBtn.addEventListener("click",
    function () {
        mode = "rgb";
        clearContainer();
    });

// normal button
const normalBtn = document.getElementById("normal");
normalBtn.addEventListener("click",
    function () {
        mode = "normal";
        clearContainer();
    });

// darken button
const darkenBtn = document.getElementById("darken");
darkenBtn.addEventListener("click",
    function () {
        mode = "darken";
        clearContainer();
    });