import "../styles/card.css";

function Card(props) {
  const colorStyle = {
    color: `hsl(${props.color.h},${props.color.s}%,${props.color.l}%)`,
  };

  return (
    <h1 style={colorStyle}>
      {props.color.name} {props.color.h} {props.color.s} {props.color.l}
    </h1>
  );
}

export default Card;
