import * as React from 'react'
import * as ReactBootstrap from 'react-bootstrap'

const { Badge, Button, Card, ButtonGroup } = ReactBootstrap;

export default function App() {
  const [player, setPlayer] = React.useState(1); // different players
  const [squares, setSquares] = React.useState(Array(9).fill("")); // actual board
  const [whoWon, setWhoWon] = React.useState(""); // who won
  const [phase, setPhase] = React.useState("place"); // phases of placing vs moving
  const [turnNumber, increment] = React.useState(1);
  const [selected, setSelected] = React.useState(null);

  // function changePlayer changes player 
  const changePlayer = () =>
    setPlayer(player === 1 ? 2 : 1);

  // adjacency maps indexes and the different symbols
  const adjacency = {
    0: [1, 3, 4],
    1: [0, 2, 4],
    2: [1, 5, 4],
    3: [0, 6, 4],
    4: [0, 1, 2, 3, 5, 6, 7, 8], // center connects to all
    5: [2, 8, 4],
    6: [3, 7, 4],
    7: [6, 8, 4],
    8: [5, 7, 4]
  };

  // function to see if the player actually has any moves they can do and if they can continue the game
  // no softlock option
  function canPlayerMove(squares, symbol) {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] !== symbol) continue;

      const moves = adjacency[i];

      for (const j of moves) {
        if (squares[j] === "") {
          return true; // found at least one legal move
        }
      }
    }
    return false;
  }

  // function changes the array to have updated text, makes sure overwriting doesn't happen
  // writing when won can't happen either
  // and it changes to the next player
  const changeSquare = (index) => {
    const newSquares = [...squares];
    const symbol = player === 1 ? "X" : "O";
    const now = Date.now(); // the time now at time of refresh
    let newIndex = index;

    // less than 3 pieces on the board for each
    if (phase === "place") {

      // prevent overwriting
      if (newSquares[index] !== "") return;

      newSquares[index] = symbol; // writes symbol onto function

      winConditions(newSquares);

      increment(prev => {
        const next = prev + 1;
        if (next > 6) setPhase("move");
        return next;
      });


      // prevents writing when something is won
      if (whoWon !== "") return;

      setSquares(newSquares);
      changePlayer();

      // after 6 turns, we change phases
      if (turnNumber > 5) {
        setPhase("move");
      }

      return;

    }

    // only when phase is "move" does this trigger

    // needs to select center and change, otherwise it won't work
    if (newSquares[4] === symbol && selected !== 4) {
      if (index === 4) {
        setSelected(4);
      }
      return;
    }

    // only changes when selected hasn't been selected
    if (selected === null) {
      if (newSquares[index] === symbol) {
        setSelected(index); // changes selected
      }
      return;
    }

    // allow re-selecting / unselecting / switching pieces
    if (squares[index] === symbol) {
      setSelected(prev => {
        if (prev === index) return null; // unselect
        return index; // switch selection
      });
      return;
    }

    // prevent overwriting (has to be empty)
    if (newSquares[index] !== "") return;

    // prevents not writing if not adjacent
    if (!adjacency[selected].includes(index)) return;


    // moves the square to a different one
    newSquares[index] = symbol;
    newSquares[selected] = ""; // erases current one

    winConditions(newSquares);


    // prevents writing when something is won
    if (whoWon !== "") return;
    setSquares(newSquares);
    setSelected(null);

    // predicting and making sure they can't falsely move
    const nextPlayer = player === 1 ? 2 : 1;
    const nextSymbol = nextPlayer === 1 ? "X" : "O";

    if (!canPlayerMove(newSquares, nextSymbol)) {
      setWhoWon(`Player ${player} wins! Player ${nextPlayer} has no legal moves.`);
      return;
    }


    changePlayer();

  };

  // function reset resets all values to a new game
  const reset = () => {
    setPlayer(1);
    setSquares(Array(9).fill(""));
    setWhoWon("");
    setPhase("place");
    increment(1);
    setSelected(null);
  }

  // determines what exactly are win conditions in the tictactoe game
  function winConditions(squares) {

    // 1, 2, 3
    if (squares[0] === squares[1] && squares[1] === squares[2] && squares[0] !== "") {
      (squares[0] === "X") ? (setWhoWon("Player 1 has won the game!")) : (setWhoWon("Player 2 has won the game!"));
    }
    // 4, 5, 6
    else if (squares[3] === squares[4] && squares[4] === squares[5] && squares[3] !== "") {
      (squares[3] === "X") ? (setWhoWon("Player 1 has won the game!")) : (setWhoWon("Player 2 has won the game!"));
    }
    // 7, 8, 9
    else if (squares[6] === squares[7] && squares[7] === squares[8] && squares[6] !== "") {
      (squares[6] === "X") ? (setWhoWon("Player 1 has won the game!")) : (setWhoWon("Player 2 has won the game!"));
    }
    // 1, 4, 7
    else if (squares[0] === squares[3] && squares[3] === squares[6] && squares[0] !== "") {
      (squares[0] === "X") ? (setWhoWon("Player 1 has won the game!")) : (setWhoWon("Player 2 has won the game!"));
    }
    // 2, 5, 8
    else if (squares[1] === squares[4] && squares[4] === squares[7] && squares[1] !== "") {
      (squares[1] === "X") ? (setWhoWon("Player 1 has won the game!")) : (setWhoWon("Player 2 has won the game!"));
    }
    // 3, 6, 9
    else if (squares[2] === squares[5] && squares[5] === squares[8] && squares[2] !== "") {
      (squares[2] === "X") ? (setWhoWon("Player 1 has won the game!")) : (setWhoWon("Player 2 has won the game!"));
    }
    // 1,5,9
    else if (squares[0] === squares[4] && squares[4] === squares[8] && squares[0] !== "") {
      (squares[0] === "X") ? (setWhoWon("Player 1 has won the game!")) : (setWhoWon("Player 2 has won the game!"));
    }
    // 3,5,7
    else if (squares[2] === squares[4] && squares[4] === squares[6] && squares[2] !== "") {
      (squares[2] === "X") ? (setWhoWon("Player 1 has won the game!")) : (setWhoWon("Player 2 has won the game!"));
    }
    else if (squares.every(s => s !== "")) { // tie (every tile is filled)
      setWhoWon("Player 1 and Player 2 have tied!");
    }

  }



  // actual html statements
  return (
    <div className="container py-4">
      <Card className="starter-card shadow-sm">
        <Card.Body className="p-4">
          <h1 className="greeting display-6 fw-bold">Terni Lapilli</h1>
          <h3 className="mb-3 text-secondary">
            Current Player: Player {player}
          </h3>
          <div>
            <ButtonGroup>
              <Button className="square" onClick={() => changeSquare(0)} className={`square ${selected === 0 && whoWon ===  "" ? "selected" : ""}`}>{squares[0]}</Button>
              <Button className="square" onClick={() => changeSquare(1)} className={`square ${selected === 1 && whoWon ===  "" ? "selected" : ""}`}>{squares[1]}</Button>
              <Button className="square" onClick={() => changeSquare(2)} className={`square ${selected === 2 && whoWon ===  "" ? "selected" : ""}`}>{squares[2]}</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button className="square" onClick={() => changeSquare(3)} className={`square ${selected === 3 && whoWon ===  "" ? "selected" : ""}`}>{squares[3]}</Button>
              <Button className="square" onClick={() => changeSquare(4)} className={`square ${selected === 4 && whoWon ===  "" ? "selected" : ""}`}>{squares[4]}</Button>
              <Button className="square" onClick={() => changeSquare(5)} className={`square ${selected === 5 && whoWon ===  "" ? "selected" : ""}`}>{squares[5]}</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button className="square" onClick={() => changeSquare(6)} className={`square ${selected === 6 && whoWon ===  "" ? "selected" : ""}`}>{squares[6]}</Button>
              <Button className="square" onClick={() => changeSquare(7)} className={`square ${selected === 7 && whoWon ===  "" ? "selected" : ""}`}>{squares[7]}</Button>
              <Button className="square" onClick={() => changeSquare(8)} className={`square ${selected === 8 && whoWon ===  "" ? "selected" : ""}`}>{squares[8]}</Button>
            </ButtonGroup>
          </div>
          <div>
            <Card>
              <Card.Body>
                <p className="win">
                  {whoWon}
                </p>
              </Card.Body>
            </Card>
          </div>
          <div className="d-flex gap-2 flex-wrap align-items-center">
            <Button onClick={reset}>Reset</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
