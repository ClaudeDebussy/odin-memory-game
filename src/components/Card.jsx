import { useState } from "react";
import "../styles/card.css";

function Card(props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const baseStyle = {
    backgroundColor: `hsl(${props.color.h},${props.color.s}%,${props.color.l}%)`,
    color: `${props.color.contrastHex}`,
    transition: "background-color 0.1s ease, transform 0.1s ease",
  };

  const hoveredStyle = {
    backgroundColor: `hsl(${props.color.h},${props.color.s}%,${
      props.color.l - 10
    }%)`,
    transform: "rotate(2deg)",
  };

  const mouseDownStyle = {
    backgroundColor: `hsl(${props.color.h},${props.color.s}%,${
      props.color.l - 20
    }%)`,
    transform: "rotate(4deg)",
  };

  const currentStyle = {
    ...baseStyle,
    ...(isHovered && hoveredStyle),
    ...(isMouseDown && mouseDownStyle),
  };

  return (
    <div
      className="card"
      style={currentStyle}
      onClick={props.shuffle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
    >
      <h1>{props.color.name}</h1>
    </div>
  );
}

export default Card;
