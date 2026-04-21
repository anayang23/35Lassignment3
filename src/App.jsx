import * as React from 'react'
import * as ReactBootstrap from 'react-bootstrap'

const { Badge, Button, Card, ButtonGroup } = ReactBootstrap;

export default function App() {
  const [player, setPlayer] = React.useState(1); // different players
  const [squares, setSquares] = React.useState(Array(9).fill("")); // actual board
  const [whoWon, setWhoWon] = React.useState(""); // who won

  // function changePlayer changes player 
  const changePlayer = () =>
      setPlayer(player === 1 ? 2 : 1);

  // function changes the array to have updated text, makes sure overwriting doesn't happen
  // writing when won can't happen either
  // and it changes to the next player
  const changeSquare = (index) => {
    const newSquares = [...squares];

  // prevent overwriting
    if (newSquares[index] !== "") return;

    newSquares[index] = player === 1 ? "X" : "O";
    winConditions(newSquares);

    
    // prevents writing when something is won
    if(whoWon !== "") return;

    setSquares(newSquares);
    changePlayer();


};

// function reset resets all values to a new game
const reset = () => {
    setPlayer(1);
    setSquares(Array(9).fill(""));
    setWhoWon("");
}

// determines what exactly are win conditions in the tictactoe game
function winConditions(squares) {

      // 1, 2, 3
      if(squares[0] === squares[1] && squares[1] === squares[2] && squares[0] !== "") {
          (squares[0] === "X") ? (setWhoWon("Player 1 has won the game!")) : (setWhoWon("Player 2 has won the game!"));
      }
      // 4, 5, 6
      else if(squares[3] === squares[4] && squares[4] === squares[5] && squares[3] !== "") {
          (squares[3] === "X") ? (setWhoWon("Player 1 has won the game!")) : (setWhoWon("Player 2 has won the game!"));
      }
          // 7, 8, 9
      else if(squares[6] === squares[7] && squares[7] === squares[8] && squares[6] !== "") {
          (squares[6] === "X") ? (setWhoWon("Player 1 has won the game!")) : (setWhoWon("Player 2 has won the game!"));
      }
      // 1, 4, 7
      else if(squares[0] === squares[3] && squares[3] === squares[6] && squares[0] !== "") {
          (squares[0] === "X") ? (setWhoWon("Player 1 has won the game!")) : (setWhoWon("Player 2 has won the game!"));
      }
      // 2, 5, 8
      else if(squares[1] === squares[4] && squares[4] === squares[7] && squares[1] !== "") {
          (squares[1] === "X") ? (setWhoWon("Player 1 has won the game!")) : (setWhoWon("Player 2 has won the game!"));
      }
      // 3, 6, 9
      else if(squares[2] === squares[5] && squares[5] === squares[8] && squares[2] !== "") {
          (squares[2] === "X") ? (setWhoWon("Player 1 has won the game!")) : (setWhoWon("Player 2 has won the game!"));
      }
     // 1,5,9
     else if(squares[0] === squares[4] && squares[4] === squares[8] && squares[0] !== "") {
          (squares[0] === "X") ? (setWhoWon("Player 1 has won the game!")) : (setWhoWon("Player 2 has won the game!"));
      }
     // 3,5,7
     else if(squares[2] === squares[4] && squares[4] === squares[6] && squares[2] !== "") {
          (squares[2] === "X") ? (setWhoWon("Player 1 has won the game!")) : (setWhoWon("Player 2 has won the game!"));
      }
      else if(squares.every(s => s !== "")) { // tie (every tile is filled)
        setWhoWon("Player 1 and Player 2 have tied!");
      }

}



// actual html statements
  return (
    <div className="container py-4">
      <Card className="starter-card shadow-sm">
        <Card.Body className="p-4">
          <h1 className="greeting display-6 fw-bold">Tic-Tac-Toe</h1>
          <h3 className="mb-3 text-secondary">
            Current Player: Player {player}
          </h3>
          <div>
              <ButtonGroup>
                <Button className="square" onClick={ () => changeSquare(0) }>{squares[0]}</Button>
                <Button className="square" onClick={ () => changeSquare(1) }>{squares[1]}</Button>
                <Button className="square" onClick={ () => changeSquare(2) }>{squares[2]}</Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button className="square" onClick={ () => changeSquare(3) }>{squares[3]}</Button>
                <Button className="square" onClick={ () => changeSquare(4) }>{squares[4]}</Button>
                <Button className="square" onClick={ () => changeSquare(5) }>{squares[5]}</Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button className="square" onClick={ () => changeSquare(6) }>{squares[6]}</Button>
                <Button className="square" onClick={ () => changeSquare(7) }>{squares[7]}</Button>
                <Button className="square" onClick={ () => changeSquare(8) }>{squares[8]}</Button>
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
