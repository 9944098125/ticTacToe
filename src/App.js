import React, { useState, useEffect } from "react";
import "./App.css";

const initMatrix = [];

function App() {
  const [matrix, setMatrix] = useState(initMatrix);
  const [matrixSize] = useState(3);
  const [currentPlayer, setCurrentPlayer] = useState("o");
  const [selR, setSelR] = useState(null);
  const [selC, setSelC] = useState(null);
  const [winner, setWinner] = useState(false);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    setWinner(false);
    setSelC(null);
    setSelR(null);
    const row = new Array(matrixSize).fill(null); // it creates a row
    const tempMatrix = [];
    for (let i = 0; i < matrixSize; i++) {
      tempMatrix.push([...row]);
    }
    setMatrix(tempMatrix);
  }, [reset]); /* it initializes on the first render */

  function squareClick(r, c) {
    console.log(r, c);
    if (!matrix[r][c] && !winner) {
      setSelC(c);
      setSelR(r);
      // if a specific matrix has nothing then player should change or nothing should happen
      let nxtPlayer = currentPlayer === "x" ? "o" : "x";
      setCurrentPlayer(nxtPlayer);
      // let's make a copy of the matrix
      const matrixCopy = [...matrix];
      matrixCopy[r][c] = nxtPlayer;
      setMatrix(matrixCopy);
      /* after one player selects x or o, then a copy of matrix is created and player is changed again   */
    }
  }

  function isWinner() {
    let vertical = true;
    let horizontal = true;
    let d1 = true;
    let d2 = true;
    if (selC === null || selR === null) {
      return;
    }

    for (let i = 0; i < matrixSize; i++) {
      if (matrix[i][selC] !== currentPlayer) {
        vertical = false;
      }
      if (matrix[selR][i] !== currentPlayer) {
        horizontal = false;
      }
      if (matrix[i][i] !== currentPlayer) {
        d1 = false;
      }
      if (matrix[i][matrixSize - i - 1] !== currentPlayer) {
        d2 = false;
      }
    }
    if (vertical || horizontal || d1 || d2) {
      setWinner(true);
    }
  }

  useEffect(() => {
    if (!winner) {
      isWinner();
    }
  });

  function resetGame() {
    setReset(!reset);
    /* if winner is declared, the button reset doesn't work. For that this toggling is set  */
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {matrix.map((val, c) => (
            <div className="c">
              {/* c is for border of the row and r is for rows */}
              {val.map((val1, r) => (
                <div onClick={() => squareClick(r, c)} className="r">
                  {matrix[r][c]}
                </div>
              ))}
            </div>
          ))}
        </div>
        <h3 className="head3">
          {winner ? `Player ${currentPlayer} is the winner` : ""}
        </h3>
        <button onClick={resetGame} className="reset-btn">
          Reset
        </button>
      </header>
    </div>
  );
}

export default App;
