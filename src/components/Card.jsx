import "../styles/card.css";

function Card(props) {
  const colorStyle = {
    backgroundColor: `hsl(${props.color.h},${props.color.s}%,${props.color.l}%)`,
    color: `${props.color.contrastHex}`,
  };

  return <h1 style={colorStyle}>{props.color.name}</h1>;
}

export default Card;
