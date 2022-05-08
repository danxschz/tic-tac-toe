const gameBoard = (() => {
  const board = {1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: ''};

  const render = () => {
    let squares = document.querySelectorAll('.square');
    squares.forEach(square => {
      let i = square.getAttribute('data-index');
      square.textContent = gameBoard.board[i];
    });
  }
  return {board, render};
})();


const Player = (sym) => {
  let symbol = sym;

  const markSpot = (spot) => {
    gameBoard.board[spot] = symbol;
    gameBoard.render();
  }

  return {markSpot, symbol};
}


const gameFlow = (() => {
  const player1 = Player('X');
  const player2 = Player('O');

  let turn = player1;
  let playNumber = 0;

  const checkWin = () => {
    if (playNumber >= 5) {
      if (
      // Horizontal
      (gameBoard.board[1] !== '' && gameBoard.board[1] === gameBoard.board[2] && gameBoard.board[2] === gameBoard.board[3]) || 
      (gameBoard.board[4] !== '' && gameBoard.board[4] === gameBoard.board[5] && gameBoard.board[5] === gameBoard.board[6]) || 
      (gameBoard.board[7] !== '' && gameBoard.board[7] === gameBoard.board[8] && gameBoard.board[8] === gameBoard.board[9]) || 
      
      // Vertical
      (gameBoard.board[1] !== '' && gameBoard.board[1] === gameBoard.board[4] && gameBoard.board[4] === gameBoard.board[7]) || 
      (gameBoard.board[2] !== '' && gameBoard.board[2] === gameBoard.board[5] && gameBoard.board[5] === gameBoard.board[8]) || 
      (gameBoard.board[3] !== '' && gameBoard.board[3] === gameBoard.board[6] && gameBoard.board[6] === gameBoard.board[9]) || 

      // Diagonal
      (gameBoard.board[1] !== '' && gameBoard.board[1] === gameBoard.board[5] && gameBoard.board[5] === gameBoard.board[9]) || 
      (gameBoard.board[3] !== '' && gameBoard.board[3] === gameBoard.board[5] && gameBoard.board[5] === gameBoard.board[7])) {

        return true;
      }
    }
    if (playNumber === 9) return 'tie';
  }

  const endGame = (turn) => {
    // Remove event listeners
    let gameBoardContainer = document.querySelector('.gameboard');
    let gameBoardNew = gameBoardContainer.cloneNode(true);
    gameBoardContainer.parentNode.replaceChild(gameBoardNew, gameBoardContainer);

    // Announce winner
    let result = document.querySelector('.result');
    if (turn === 'tie') {
      result.textContent = `It's a tie!`;
    } else {
      result.textContent = `${turn.symbol} wins!`;
    }
  }

  const restartGame = () => {
    for (let i = 1; i < 10; i++) {
      gameBoard.board[i] = '';
    }
    turn = player1;
    playNumber = 0;
    gameBoard.render();
    let result = document.querySelector('.result');
    result.textContent = '';
    setClickEvents(turn);
  }

  const setRestartButton = () => {
    let restartButton = startButton.cloneNode(true);
    startButton.parentNode.replaceChild(restartButton, startButton);
    restartButton.textContent = 'Restart';
    restartButton.addEventListener('click', () => {
      restartGame();
    });
  }

  const setClickEvents = (turn) => {
    let squares = document.querySelectorAll('.square');
    squares.forEach(square => {
      let spot = square.getAttribute('data-index');
      square.addEventListener('click', () => {
        if (!(gameBoard.board[spot] === '')) return;
        turn.markSpot(spot);
        playNumber++
        if (checkWin() === true) {
          endGame(turn);
          setRestartButton();
        } else if (checkWin() === 'tie') {
          endGame('tie');
          setRestartButton();
        } else {
          turn = (turn === player1) ? player2 : player1;
        }
      });
    });
  }

  const startButton = document.querySelector('.start');
  startButton.addEventListener('click', () => {
    setClickEvents(turn);
  });
})();





