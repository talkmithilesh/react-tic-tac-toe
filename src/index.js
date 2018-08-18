import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       value: null
//     };
//   }

//   render() {
//     return (
//       <button className="square"
//         onClick={() => { this.props.onClick()}}>
//         {this.props.value}
//       </button>
//     );
//   }
// }

//functional component
//this functional component is same as above commented Square component 
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />);
  }

  render() {

    return (
      <div>
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

  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      isXNext: true,
      stepNumber: 0
    };
  }

  render() {
    let history = this.state.history;
    let current = history[history.length - 1];
    let winner = calculateWinner(current.squares)

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next Player: ' + (this.state.isXNext ? 'X' : 'O')
    }

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}> {desc} </button>
        </li>
      );
    });

    return (
      <div className="game">

        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();

    const winner = calculateWinner(squares);

    if (winner || squares[i]) {
      return
    }

    squares[i] = this.state.isXNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      isXNext: !this.state.isXNext,
      stepNumber: history.length
    });
  }

  jumpTo(step) {
    this.setState({
      history:this.state.history.slice(0, step + 1), //clears board
      stepNumber: step,
      isXNext: (step % 2) === 0
    });
  }
}

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
  for (var i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }

  return null
}

//render components
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
