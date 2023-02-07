const winnerCheck = (inputBoard, n) => {

    if (inputBoard.length !== n * n) {
        console.log("incorrect dimensions, please check inputs")
        return 
    }
    
    //convert board to grid instead of flattened board
    const boardCopy = [];
    for (let i = 0; i < n; i++) {
        let inputRow = [];
        for (let j = 0; j < n; j++) {
            inputRow.push(inputBoard[i * n + j]);
        }
        boardCopy.push(inputRow);
    }
    console.log(boardCopy)

    const checkRow = (row) => {
      for (let item of row) {
        if (!item.held) {
            console.log("row", item)
          return false;
        }
      }
      return true;
    }
  
    const checkCol = (board, column) => {
      for (let r = 0; r < n; r++) {
        if (!board[r][column].held) {
            console.log("column", r, column, board[r][column])
          return false
        }
      }
      return true;
    }
  
    const checkWinner = () => {
      for (let i = 0; i < n; i++) {
        // since n x n board, can use the same index
  
        //check rows, if a row returns true, return right away
        if (checkRow(boardCopy[i])) {
            console.log("winner (row): ", i, boardCopy);
            return true
        }

        //check cols, if a col returns true, return right away
        if (checkCol(boardCopy, i)) {
            console.log("winner (col): ", i, boardCopy)
            return true
        }
      }
      return false
    };

    return checkWinner();
    
  }

  export default winnerCheck