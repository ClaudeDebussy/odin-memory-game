import "../styles/header.css";

function Header(props) {
  return (
    <div className="header">
      <button className="New Game" onClick={props.newColors}>
        New Colors
      </button>
      <h1>
        {props.hasWon
          ? `You win with ${props.score} points! `
          : `Score: ${props.score}`}
      </h1>
      <h1>High score: {props.highScore}</h1>
    </div>
  );
}

export default Header;
