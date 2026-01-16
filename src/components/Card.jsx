import "../styles/card.css";

function Card(props) {
  const colorStyle = {
    backgroundColor: `hsl(${props.color.h},${props.color.s}%,${props.color.l}%)`,
    color: `${props.color.contrastHex}`,
  };

  return (
    <div className="card" style={colorStyle} onClick={props.shuffle}>
      <h1>{props.color.name}</h1>
    </div>
  );
}

export default Card;
