import { useEffect, useState } from "react";

const NUMBER_OF_COLORS_DESIRED = 12;

const getRandomHsl = () => {
  // settings below for vibrant colors
  const SAT_MAX = 90;
  const SAT_MIN = 50;
  const LIGHT_MAX = 60;
  const LIGHT_MIN = 40;

  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * (SAT_MAX - SAT_MIN) + SAT_MIN);
  const lightness = Math.floor(
    Math.random() * (LIGHT_MAX - LIGHT_MIN) + LIGHT_MIN
  );

  return {
    hue,
    saturation,
    lightness,
  };
};

const getHslValues = (totalColors) => {
  const array = [];

  while (array.length < totalColors) {
    const newColor = getRandomHsl();
    const isRepeated = array.some(
      (color) =>
        color.hue === newColor.hue &&
        color.saturation === newColor.saturation &&
        color.lightness === newColor.lightness
    );

    if (!isRepeated) {
      array.push(newColor);
    } else {
      console.log(
        "Duplicate color created! \nThere is a only 1/3,600,000 chance of this! \nRecalculating..."
      );
    }
  }

  return array;
};

const getUrls = (colors) => {
  const arr = [];
  for (let i = 0; i < colors.length; i++) {
    arr.push(
      `https://www.thecolorapi.com/id?hsl=${colors[i].hue},${colors[i].saturation}%,${colors[i].lightness}%`
    );
  }
  return arr;
};

const ColorFetcher = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchColors = async (totalColors) => {
      const finalColors = [];

      while (finalColors.length < totalColors) {
        const hslValues = getHslValues(totalColors - finalColors.length);
        const urls = getUrls(hslValues);

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
};

export default ColorFetcher;
