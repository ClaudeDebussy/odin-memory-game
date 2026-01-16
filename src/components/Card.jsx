import { useState } from "react";
import "../styles/card.css";

function Card(props) {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle = {
    backgroundColor: `hsl(${props.color.h},${props.color.s}%,${props.color.l}%)`,
    color: `${props.color.contrastHex}`,
    transition: "background-color 0.1s ease, transform 0.1s ease",
  };

  const hoveredStyle = {
    backgroundColor: `hsl(${props.color.h},${props.color.s}%,${
      props.color.l - 10
    }%)`,
    color: `${props.color.contrastHex}`,
    transform: "rotate(2deg)",
  };

  const currentStyle = {
    ...baseStyle,
    ...(isHovered && hoveredStyle),
  };

  return (
    <div
      className="card"
      style={currentStyle}
      onClick={props.shuffle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h1>{props.color.name}</h1>
    </div>
  );
}

export default Card;
