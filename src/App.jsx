import { useEffect, useState } from "react";
import { fetchColors } from "./colorService.js";
import Card from "./components/Card.jsx";
import Header from "./components/Header.jsx";

const NUMBER_OF_COLORS_DESIRED = 12;

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const colors = await fetchColors(NUMBER_OF_COLORS_DESIRED);
        setData(colors);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <Header />
      <div className="play-area">
        {data.map((color) => (
          <Card key={color.name} color={color} />
        ))}
      </div>
    </div>
  );
}

export default App;
