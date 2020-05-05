import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


  function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  } // Creates a button with an onClick property
  
  
  class Board extends React.Component {
    constructor(props) {
        super(props);
         this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    } // Checks if 'x' is true or false and fills the squares with null.

    handleClick(i) {
      const squares = this.state.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
          this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
      });
    } // If a winner is determined then 'handleClick' stops else it continues to work.

    renderSquare(i) {
      return (
        <Square 
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />
      );
    } // Renders the squares as null or gives them a value if 'onClick' has been handled.
  
    render() {
      const winner = calculateWinner(this.state.squares);
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      } // Checks if there is a winner otherwise it tells you which player is next.
      
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  } 


  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[a] && squares[c]) {
        return squares[a];
      }
    }
    return null;
  } // Calculates if there is 3 in a row or not. If 3 is found then it calculates that player as a winner.