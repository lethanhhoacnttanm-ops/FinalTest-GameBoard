let tiles = [1,2,3,4,5,6,7,8,9,10,11,0];

let timeCounting = 0;

let timeId = null;

let step = 0;

let num = 0;

let historyList = [];

function startGame(){

    tiles.sort(() => Math.random() - 0.5);

    timeCounting = 0

    clearInterval(timeId);
    startTimer();

    renderGameboard();
}

function renderGameboard(){

    const board = document.getElementById('gameboard');

    board.innerHTML ='';

    tiles.forEach((num, index) => {
        const tile = document.createElement('div');

        tile.classList.add('tile');

        if(num === 0){
            tile.classList.add('empty');
        }
        else{
            tile.innerText = num;
            tile.onclick = () => moveId(index);
        }

        board.appendChild(tile);
    })
}

function moveId(index){
    const findIndex = tiles.indexOf(0);

    if(isAdjacent(index, findIndex)){
        [tiles[index], tiles[findIndex]] = [tiles[findIndex], tiles[index]]

        step++;
        renderGameboard();

        checkWin();
    }
}

function isAdjacent(index1, index2){
    // const diff = Math.abs(index1 - index2);

    // return diff === 1 || diff === 4;

    

    const row1 = Math.floor(index1 / 4);

    const col1 = index1 % 4;

    const row2 = Math.floor(index2 / 4);

    const col2 = index2 % 4;

    const rowDiff = Math.abs(row1 - row2);

    const colDiff = Math.abs(col1 - col2);

    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}

function moveByButton(click){

    const findIndex = tiles.indexOf(0);

    let moveStep = -1;

    if(click === "up") moveStep = findIndex + 4;
    if(click === "left") moveStep = findIndex + 1;
    if(click === "right") moveStep = findIndex - 1;
    if(click === "down") moveStep = findIndex - 4;

    if(moveStep >= 0 && moveStep < 12){
        moveId(moveStep);
    }

}

function checkWin(){
    if(tiles.join('') === '12345678910110'){
        clearInterval(timeId)

        const matchResult = {
            id: historyList.length + 1,
            moves: step,
            time: 0 + timeCounting 
        };

        historyList.push(matchResult);


        alert("Congratulations you are the winner 🎉 ")

        showHistory();

        step = 0;
    }
}


function startTimer(){

    timeId = setInterval(() => {
        timeCounting++;

        document.getElementById('timer').innerText = `Time : ${timeCounting}s`

        if(timeCounting === 120){
            clearInterval(timeId);

            alert("Timeover 120s you are loser !!!")

            startGame()
        }
    }, 800)
}



function showHistory() {
    const history = document.getElementById('history-body')

    history.innerHTML = ''

    historyList.forEach((item) => {
        const row = `
        <tr>
           <td style="border: 1px solid #333;">${item.id}</td>
           <td style="border: 1px solid #333;">${item.moves} step</td>
           <td style="border: 1px solid #333;">${item.time}s</td>
        <tr>
        `;

        history.innerHTML += row;
    });
}
renderGameboard();