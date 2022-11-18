const settings = document.querySelector('.settingsBar');
const save = document.querySelector('.saveButton');
const firstPlayerNameInput = document.querySelector('.firstPlayerName') ;
const secondPlayerNameInput = document.querySelector('.secondPlayerName');
const header = document.querySelector('.header');
const cells = document.querySelectorAll('.cell');
const button = document.querySelector('.restartButton button')
let flag = true;
let cellsLeft = [0,1,2,3,4,5,6,7,8];
let checkTieCells = 9;
const winCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8],
]

class Player {
    constructor(name, queryClass, figure){
        this.name = name
        this.scoreWindow = document.querySelector(`.${queryClass}`);
        this.figure = figure;
        this.score = 0;
        this.combination = [];
        if (queryClass === 'firstScore') {
            this.maxCombo = 5
        } else {
            this.maxCombo = 4
        }
    }

    check(cell){
        cell.innerHTML = this.figure;
    }

    winCheker(cellNumber){
        this.combination.push(cellNumber);
        //console.log(this.combination)
        for (let i = 0; i < winCombinations.length; i++){
            if(winCombinations[i].every(elem => this.combination.includes(elem))){
                return true
            }
        } 
        if (checkTieCells == 0) tie()
    }

    writeScore(){
        this.scoreWindow.innerHTML = this.score;
        header.innerHTML = `${this.name} WINS!`
    }
}

let firstPlayer = new Player('First Player', 'firstScore', 'X');
let secondPlayer = new Player('Second Player', 'secondScore', 'O');

function openSettings() {
    settings.style.left = 0;
}

function closeSettings() {
    settings.style.left = '-15rem'
}

function setInput() {
    firstPlayer.name = firstPlayerNameInput.value == '' ? 'First Player' : firstPlayerNameInput.value;
    firstPlayerNameInput.value = '';
    secondPlayer.name = secondPlayerNameInput.value == '' ? 'Second Player' : secondPlayerNameInput.value;
    secondPlayerNameInput.value = '';

    closeSettings();
}

let clickHandler = function(i) {
    return function (event){
        cellsLeft.splice(cellsLeft.indexOf(i),1);
        checkTieCells--;
       // console.log(cellsLeft);
        if (flag === true) {
            flag = false;
            firstPlayer.check(cells[i]);
            let isWin = firstPlayer.winCheker(i)
            if (isWin) win(firstPlayer);
        } else {
            flag = true;
            secondPlayer.check(cells[i]);
            let isWin = secondPlayer.winCheker(i);
            if (isWin) win(secondPlayer);
        }
       // console.log(`CheckCells` + checkTieCells)
    }
} 

function addCellListeners() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', clickHandler(i), { once: true })
    }
}

function clearGameBoard(){
    firstPlayer.combination.length = 0;
    secondPlayer.combination.length = 0;
    for (let i = 0; i< cells.length; i++){
        cells[i].click();
        firstPlayer.combination.length = 0;
        secondPlayer.combination.length = 0;
        cells[i].innerHTML = '';
    }
    flag = true;
}

function newGame() {
    flag = true;
    clearGameBoard()
    addCellListeners();
    button.innerHTML = 'Clear Board';
    cellsLeft = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    checkTieCells = 9;
    header.innerHTML = 'TicTacToe Game'
}

function blockState(){
    let cellsToClick = [...cellsLeft];
    checkTieCells = 100;
    // console.log(`Cells Left: ${cellsToClick}`)
    cellsToClick.forEach( function (elem) { 
        // console.log(`Cells Left: ${cellsToClick}`)
        // console.log(`working on cell ${elem}`)
        cells[elem].click();
        firstPlayer.combination.length = 0;
        secondPlayer.combination.length = 0;
        cells[elem].innerHTML = '';
    })
}

function win(player){
    player.score++;
    player.writeScore();
    blockState();
    firstPlayer.combination.length = 0;
    secondPlayer.combination.length = 0;
}

function tie() {
    header.innerHTML = 'TIE'
}

addCellListeners();