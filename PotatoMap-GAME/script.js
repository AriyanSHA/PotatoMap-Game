const mainBoard = document.querySelector("#mainBoard");
const mainTable = document.querySelector("#mainTable");

const scoreCounter = document.querySelector("#scoreCounter");
const counter = document.querySelector("#counter");

const missionTable = document.querySelector("#missionTable");

const elementValue = document.querySelector("#elementValue");
const elementTable = document.querySelector("#elementTable");

const rotateButton = document.querySelector("#rotate");
const flipButton = document.querySelector("#flip");

const elapsedTime = document.querySelector("#elapsedTime");
const currentSeason = document.querySelector("#currentSeason");


const elementMargins = [
    [
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 0]
    ],

    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],

    [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
    ],
    
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
    ],

    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
];

let springPoints = 0;
let summerPoints = 0;
let autumnPoints = 0;
let winterPoints = 0;
let totalSeasonPoints = 0;

let cs = 0
let time = 0;

let randomElem;
let currentElem;
let ind;

currentSeason.innerHTML = "Current Season (Spring): Sleepy Valley | Edge Of The Forest"

const missionImageUrls = [
    '/assets/missions_eng/SleepyValley.png',
    '/assets/missions_eng/EdgeOfTheForest.png',
    '/assets/missions_eng/WateringPotatoes.png',
    '/assets/missions_eng/Borderlands.png'
];
const tilesUrls = [
    '/assets/tiles/forest_tile.png',
    '/assets/tiles/water_tile.png',
    '/assets/tiles/plains_tile.png',
    '/assets/tiles/village_tile.png'
]

const generateRandomElement = () => {
    randomElem = randN(elementMargins.length - 1);
    currentElem = elementMargins[randomElem];
    ind = randN(3);
}

const newElement = (elem, ind) => {
    elementTable.innerHTML = "";
    for (let i = 0; i < 3; i++) {
        let tableRowElement = document.createElement("tr");

        for (let j = 0; j < 3; j++) {
            let tableDataElement = document.createElement("td");
            if (elem[i][j] === 1) {
                tableDataElement.style.backgroundImage = `url('${tilesUrls[ind]}')`;
                tableDataElement.style.backgroundSize = "cover";
                tableDataElement.classList.add("elementCell");
            }
            tableRowElement.appendChild(tableDataElement);
        }
        elementTable.appendChild(tableRowElement);
    }
};

const newTable = () => {
    mainTable.innerHTML = "";
    for (let i = 1; i <= 13; i++) {
        let tableRowElement = document.createElement("tr");

        for (let j = 1; j <= 13; j++) {
            let tableDataElement = document.createElement("td");
            if (
                (i == 1) || (j == 1) || (i == 13) || (j == 13) ||
                (i === 3 && j === 3) ||
                (i === 5 && j === 10) ||
                (i === 7 && j === 5) ||
                (i === 10 && j === 11) ||
                (i === 11 && j === 7)
            ) {
                tableDataElement.style.backgroundImage = "url('/assets/tiles/mountain_tile.png')";
                tableDataElement.style.backgroundSize = "cover";  
            } else {
                tableDataElement.style.backgroundImage = "url('/assets/tiles/base_tile.png')";
                tableDataElement.style.backgroundSize = "cover";
                addClickEvent(tableDataElement, i, j);
            }
            tableRowElement.appendChild(tableDataElement);
        }
        mainTable.appendChild(tableRowElement);
    }
};

const addClickEvent = (tableDataElement, i, j) => {
    tableDataElement.addEventListener("click", () => {
        if (currentElem) {
            const clickedElement = elementTable.querySelector(".elementCell");
            if (clickedElement) {
                const centerOffsetX = 1;
                const centerOffsetY = 1;
                let canPlace = true;

                for (let k = 0; k < 3; k++) {
                    for (let l = 0; l < 3; l++) {
                        const mainTableX = i + k - centerOffsetX - 1;
                        const mainTableY = j + l - centerOffsetY - 1;
                        if (currentElem[k][l] === 1) {
                            const targetRow = mainTable.rows[mainTableX];
                            if (targetRow) {
                                const targetCell = targetRow.cells[mainTableY];
                                if (targetCell) {
                                    const backgroundImage = targetCell.style.backgroundImage;
                                    if (!backgroundImage.includes("base_tile.png")) {
                                        canPlace = false;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    if (!canPlace) {
                        break;
                    }
                }
                if (canPlace) {
                    for (let k = 0; k < 3; k++) {
                        for (let l = 0; l < 3; l++) {
                            const mainTableX = i + k - centerOffsetX - 1;
                            const mainTableY = j + l - centerOffsetY - 1;
                            if (currentElem[k][l] === 1) {
                                const targetRow = mainTable.rows[mainTableX];
                                if (targetRow) {
                                    const targetCell = targetRow.cells[mainTableY];
                                    if (targetCell) {
                                        targetCell.style.backgroundImage = clickedElement.style.backgroundImage;
                                    }
                                }
                            }
                        }
                    }
                    elementTable.innerHTML = "";
                    generateRandomElement();
                    newElement(currentElem, ind);
                    setValue();
                }
            }
        }
    });
};

const newScoreCounter = () => {
scoreCounter.innerHTML = "";
let tableRowElement = document.createElement("tr");
for (let j = 1; j <= 4; j++) {
        let tableDataElement = document.createElement("td");
        if (j == 1) {
            tableDataElement.style.backgroundColor = "#4dff88";
            tableDataElement.style.borderColor = "green";
            tableDataElement.innerHTML = `Spring:<br> ${springPoints} Points.`
        } 
        if (j == 2) {
            tableDataElement.style.backgroundColor = "#ffff99";
            tableDataElement.style.borderColor = "#b3b300";
            tableDataElement.innerHTML = `Summer:<br> ${summerPoints} Points.`
        }
        if (j == 3) {
            tableDataElement.style.backgroundColor = "#ffd480";
            tableDataElement.style.borderColor = "#804000";
            tableDataElement.innerHTML = `Autumn:<br> ${autumnPoints} Points.`
        } 
        if (j == 4) {
            tableDataElement.style.backgroundColor = "#99ddff";
            tableDataElement.style.borderColor = "#0088cc";
            tableDataElement.innerHTML = `Winter:<br> ${winterPoints} Points.`
        }

        tableRowElement.appendChild(tableDataElement);
    }

scoreCounter.appendChild(tableRowElement);
}


function randN(n) {
    const randomFraction = Math.random();
    const randomNumber = Math.floor(randomFraction * (n + 1));

    return randomNumber;
}

const newMission = () => {
    missionTable.innerHTML = "";
    for (let i = 0; i < 2; i++) {
        let tableRowElement = document.createElement("tr");

        for (let j = 0; j < 2; j++) {
            let tableDataElement = document.createElement("td");
            tableDataElement.style.backgroundImage = `url('${missionImageUrls[i * 2 + j]}')`;
            tableRowElement.appendChild(tableDataElement);
        }

        missionTable.appendChild(tableRowElement);
    }
}

function rotateElements90DegreesClockwise(elements) {
    const numRows = elements.length;
    const rotatedElement = [];
  
    for (let i = 0; i < numRows; i++) {
      const newRow = [];
      for (let j = numRows - 1; j >= 0; j--) {
        newRow.push(elements[j][i]);
      }
      rotatedElement.push(newRow);
    }
  
    return rotatedElement;
  }
function handleRotateButtonClick() {
    elementTable.innerHTML = ""
    const rotatedElement = rotateElements90DegreesClockwise(currentElem);
    newElement(rotatedElement, ind);
    currentElem = rotatedElement;
}
rotateButton.addEventListener("click", handleRotateButtonClick);

function mirrorElements(elements) {
    const mirroredElement = elements.map(row => row.slice().reverse());
    return mirroredElement;
}
  
  function handleMirrorButtonClick() {
    elementTable.innerHTML = "";
    const mirroredElement = mirrorElements(currentElem);
    newElement(mirroredElement, ind);
    currentElem = mirroredElement;
}
flipButton.addEventListener("click", handleMirrorButtonClick);

document.addEventListener("keydown", function(event) {
    if (event.key === "r" || event.key === "R") {
        rotateButton.click();
    } else if (event.key === "f" || event.key === "F") {
        flipButton.click();
    }
});

/////////////////////////////////////// MISSIONS ///////////////////////////////////////
const borderLands = () => {
    const rowCount = mainTable.rows.length;
    const colCount = mainTable.rows[0].cells.length;
    // Check rows
    for (let i = 1; i < rowCount - 1; i++) {
        let row = mainTable.rows[i];
        let count = 0;

        for (let j = 1; j < colCount - 1; j++) {
            let cell = row.cells[j];

            if (!cell.style.backgroundImage.includes('base_tile.png')) {
                count++;
            }

            if (count === 11) {
                cs += 6;
            }
        }
    }
    // Check columns
    for (let j = 1; j < colCount - 1; j++) {
        let count = 0;

        for (let i = 1; i < rowCount - 1; i++) {
            let cell = mainTable.rows[i].cells[j];

            if (!cell.style.backgroundImage.includes('base_tile.png')) {
                count++;
            }
            if (count === 11) {
                cs += 6;
            }
        }
    }
};

const WateringPotatoes = () => {
    const rowCount = mainTable.rows.length;
    const colCount = mainTable.rows[0].cells.length;
    for (let i = 1; i < rowCount - 1; i++) {
        for (let j = 1; j < colCount - 1; j++) {
            let cell = mainTable.rows[i].cells[j];
            if (cell.style.backgroundImage.includes('water_tile.png')) {
                if (
                    mainTable.rows[i - 1].cells[j].style.backgroundImage.includes('plains_tile.png') ||
                    mainTable.rows[i + 1].cells[j].style.backgroundImage.includes('plains_tile.png') ||
                    mainTable.rows[i].cells[j - 1].style.backgroundImage.includes('plains_tile.png') ||
                    mainTable.rows[i].cells[j + 1].style.backgroundImage.includes('plains_tile.png')
                ) {
                    cs += 2;
                }
            }
        }
    }
};

const SleepyValley = () => {
    const rowCount = mainTable.rows.length;
    const colCount = mainTable.rows[0].cells.length;

    for (let i = 1; i < rowCount - 1; i++) {
        let count = 0;

        for (let j = 1; j < colCount - 1; j++) {
            let cell = mainTable.rows[i].cells[j];
            if (cell.style.backgroundImage.includes('forest_tile.png')) {
                count++;
                if (count >= 3) {
                    cs += 4;
                    j = colCount -1;
                }
            }
        }
    }
};

const EdgeOfTheForest = () => {
    const rowCount = mainTable.rows.length;
    const colCount = mainTable.rows[0].cells.length;
    for (let i = 1; i < rowCount - 1; i++) {
        for (let j = 1; j < colCount - 1; j++) {
            let cell = mainTable.rows[i].cells[j];

            if (cell.style.backgroundImage.includes('forest_tile.png')) {
                if ( i === 1 || i === rowCount - 2 || j === 1 || j === colCount - 2  ) {
                    cs += 1
                }
            }
        }
    }

};

const setValue = () => {
    let val = randN(2);
    if (val == 0) { val = 1 }   
    time += val;
    elapsedTime.innerHTML = `Elapsed Time in current Season: ${time}🕑`
    if (time == 7 || time == 8) {
        SleepyValley();
        EdgeOfTheForest();
        springPoints = cs;
        newScoreCounter(); //Updates scores
        currentSeason.innerHTML = "Current Season (Summer): Edge Of The Forest | WateringPotatoes"
        cs = 0;
    }
    if (time == 14 || time == 15) {
        EdgeOfTheForest();   //B
        WateringPotatoes();  //C
        summerPoints = cs;
        newScoreCounter(); //Updates scores
        currentSeason.innerHTML = "Current Season (Autumn): WateringPotatoes | Borderlands"
        cs = 0;
    }
    if (time == 21 || time == 22) {
        WateringPotatoes();  //C
        borderLands();       //D
        autumnPoints = cs;
        newScoreCounter(); //Updates scores
        currentSeason.innerHTML = "Current Season (Winter): Borderlands - Sleepy Valley"
        cs = 0;
    }
    if (time == 27 || time == 28){
        borderLands();   //D
        SleepyValley();  //A
        winterPoints = cs;
        newScoreCounter(); //Updates scores
        cs = 0;
    }
    totalSeasonPoints = springPoints+summerPoints+autumnPoints+winterPoints;
    counter.innerHTML = `Total Score Earned: ${totalSeasonPoints}`;
    elementValue.innerHTML = `Current Element Value: ${val}🕑`;
    if (time >= 27) {
        end();
    }
}

const end = () => {
    mainBoard.style.display = "none";
    var highScoreElement = document.createElement("div");
    highScoreElement.innerHTML = `Achieved score: ${totalSeasonPoints}!`;
    highScoreElement.style.position = "fixed";
    highScoreElement.style.top = "50%";
    highScoreElement.style.left = "50%";
    highScoreElement.style.transform = "translate(-50%, -50%)";
    highScoreElement.style.fontSize = "6em";

    document.body.appendChild(highScoreElement);

    var playAgainButton = document.createElement("button");
    playAgainButton.innerHTML = "Play Again!";
    playAgainButton.style.position = "fixed";
    playAgainButton.style.top = "60%";
    playAgainButton.style.left = "50%";
    playAgainButton.style.transform = "translateX(-50%)";
    playAgainButton.style.display = "block";
    playAgainButton.style.height = "60px";
    playAgainButton.style.width = "120px";
    playAgainButton.style.backgroundColor = "#ffd480";
    playAgainButton.style.borderColor = "#80400";
    playAgainButton.style.boxShadow = "3px 3px 5px 0px rgba(0,0,0,0.5)";
    playAgainButton.style.borderRadius = "15px";

    playAgainButton.addEventListener("click", function () {
        location.reload();
    });

    document.body.appendChild(playAgainButton);
}
const start = () => {
    generateRandomElement();
    newTable(ind);
    newScoreCounter();
    newMission();
    newElement(currentElem, ind);
    setValue();
}
start();
