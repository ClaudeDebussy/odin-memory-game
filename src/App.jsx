import { useEffect, useState } from "react";
import { fetchColors, shuffleColors } from "./colorService.js";
import Card from "./components/Card.jsx";
import Header from "./components/Header.jsx";

const NUMBER_OF_COLORS_DESIRED = 12;

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [seenColors, setSeenColors] = useState([]);
  const [hasWon, setHasWon] = useState(false);

  async function newColors() {
    setData(null);
    setIsLoading(true);
    setError(null);
    setScore(0);
    setSeenColors([]);
    setHasWon(false);

    try {
      const colors = await fetchColors(NUMBER_OF_COLORS_DESIRED);
      setData(colors);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  function handleTakeTurn(color) {
    if (!seenColors.includes(color)) {
      const nextScore = score + 1;
      setSeenColors([...seenColors, color]);
      setScore(nextScore);
      if (nextScore >= highScore) setHighScore(nextScore);
      if (seenColors.length + 1 === NUMBER_OF_COLORS_DESIRED) setHasWon(true);
    } else {
      setScore(0);
      setSeenColors([]);
    }
  }

  function handleShuffle() {
    setData(shuffleColors(data));
  }

  useEffect(() => {
    newColors();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <Header
        newColors={newColors}
        score={score}
        highScore={highScore}
        hasWon={hasWon}
      />
      <div className="play-area">
        {data.map((color) => (
          <Card
            key={color.name}
            color={color}
            shuffle={handleShuffle}
            takeTurn={handleTakeTurn}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
