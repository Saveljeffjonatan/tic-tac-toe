import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const defaultState = {
  history: [
    {
      squares: Array(9).fill(null),
    },
  ],
  stepNumber: 0,
  xIsNext: true,
};

const Square = (props) => (
  <button className="square" onClick={props.onClick}>
    {props.value}
  </button>
);
// Creates a button with an onClick property

const Board = (props) => {
  const renderSquare = (i) => {
    return <Square value={props.squares[i]} onClick={() => props.onClick(i)} />;
  };

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const Game = (props) => {
  const [state, setState] = useState(defaultState);

  const handleClick = (i) => {
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = state.xIsNext ? "X" : "O";
    setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !state.xIsNext,
    });
  }; // If a winner is determined then 'handleClick' stops or it continues to work.

  const jumpTo = (step) => {
    if (step !== 0) {
      setState({
        stepNumber: step,
        xIsNext: step % 2 === 0,
      });
    } else {
      setState(defaultState);
    }
  };

  console.log(state);
  const history = state.history;
  const current = history[state.stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((_step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (state.xIsNext ? "X" : "O");
  } // Checks what move has been made or if a winner is declared

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />{" "}
        {/* Renders the squares as null or gives them a value if 'onClick' has been handled.*/}
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
} // Calculates if there is 3 in a row or not. If 3 is found then it calculates that player as a winner.
