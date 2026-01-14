import { useEffect, useState } from "react";

const getRandomHsl = () => {
  // settings below for vibrant colors
  const satMax = 90;
  const satMin = 50;
  const lightMax = 60;
  const lightMin = 40;

  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * (satMax - satMin) + satMin);
  const lightness = Math.floor(
    Math.random() * (lightMax - lightMin) + lightMin
  );

  return {
    hue,
    saturation,
    lightness,
  };
};

const getArrayOfHslValues = () => {
  const desiredNumberOfColors = 12;
  const array = [];

  while (array.length < desiredNumberOfColors) {
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

const getArrayOfUrls = (colors) => {
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
    const hslValues = getArrayOfHslValues();
    const urls = getArrayOfUrls(hslValues);

    const fetchMultipleColors = async () => {
      try {
        const urlsToFetch = urls;

        const responses = await Promise.all(
          urlsToFetch.map((url) => fetch(url))
        );

        for (const response of responses) {
          if (!response.ok) {
            throw new Error(`HTTP error! Status ${response.status}`);
          }
        }

        const jsonDatas = await Promise.all(
          responses.map((response) => response.json())
        );

        const colorObjects = jsonDatas.map((json) => {
          return { value: `${json.hsl.value}`, name: `${json.name.value}` };
        });

        setData(colorObjects);

        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMultipleColors();
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
