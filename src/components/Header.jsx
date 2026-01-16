import "../styles/header.css";

function Header(props) {
  return (
    <div className="header">
      <button className="Shuffle" onClick={props.shuffleColors}>
        Shuffle
      </button>
      <button>Two</button>
      <button>Three</button>
    </div>
  );
}

export default Header;
