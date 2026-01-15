import { useEffect, useState } from "react";
import { getHslValues, createUrls } from "./colorService.js";
import Card from "./components/Card.jsx";

const NUMBER_OF_COLORS_DESIRED = 12;

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchColors = async (totalColors) => {
      const finalColors = [];

      while (finalColors.length < totalColors) {
        const hslValues = getHslValues(totalColors - finalColors.length);
        const urls = createUrls(hslValues);

        try {
          const responses = await Promise.all(urls.map((u) => fetch(u)));

          for (const response of responses) {
            if (!response.ok) {
              throw new Error(`HTTP error! Status ${response.status}`);
            }
          }

          const jsonDatas = await Promise.all(responses.map((r) => r.json()));

          const colorObjects = jsonDatas.map((json) => {
            return { value: `${json.hsl.value}`, name: `${json.name.value}` };
          });

          for (let i = 0; i < colorObjects.length; i++) {
            if (
              !finalColors.some(
                (color) =>
                  // If color not in finalColors, push it.
                  color.name === colorObjects[i].name
              )
            ) {
              finalColors.push(colorObjects[i]);
            } else {
              console.log(
                `Color "${colorObjects[i].name}" already present! Searching again...`
              );
            }
          }
        } catch (error) {
          setError(error.message);
          setData(null);
        }
      }
      setIsLoading(false);
      setData(finalColors);
    };

    fetchColors(NUMBER_OF_COLORS_DESIRED);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {data.map((color) => (
        <pre key={color.name}>{JSON.stringify(color, null, 2)}</pre>
      ))}
    </div>
  );
}

export default App;
