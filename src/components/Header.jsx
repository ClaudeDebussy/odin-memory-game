import "../styles/header.css";

function Header(props) {
  return (
    <div className="header">
      <button className="New Game" onClick={props.newColors}>
        New Colors
      </button>
      <button>Two</button>
      <button>Three</button>
    </div>
  );
}

export default Header;
