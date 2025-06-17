// HTML要素を取得
const statusDisplay = document.querySelector('.game-status');
const restartButton = document.querySelector('.game-restart');
const cells = document.querySelectorAll('.cell');

// ゲームの状態を管理する変数
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

// 勝利メッセージと現在のプレイヤーのターンを表示する関数
const winningMessage = () => `プレイヤー ${currentPlayer} の勝ち！`;
const drawMessage = () => `引き分け！`;
const currentPlayerTurn = () => `プレイヤー ${currentPlayer} の番です`;

// 最初に現在のプレイヤーのターンを表示
statusDisplay.innerHTML = currentPlayerTurn();

// 勝敗のパターン
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// セルがクリックされたときの処理
function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    // もしセルがすでに埋まっているか、ゲームが終了している場合は何もしない
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    // セルに現在のプレイヤーのマークを記録し、表示する
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    if (currentPlayer === "X") {
        clickedCell.classList.add('x');
    } else {
        clickedCell.classList.add('o');
    }

    // 勝敗判定
    handleResultValidation();
}

// 勝敗を判定する処理
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    // 引き分け判定
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    // プレイヤーを交代
    handlePlayerChange();
}

// プレイヤーを交代する処理
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

// ゲームをリセットする処理
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    cells.forEach(cell => {
        cell.innerHTML = "";
        cell.classList.remove('x', 'o');
    });
}

// 各セルとリセットボタンにクリックイベントを設定
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestartGame);