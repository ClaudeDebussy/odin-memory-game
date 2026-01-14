import { useEffect, useState } from "react";

const ColorFetcher = () => {
  // Helper functions:
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

    function addNewHslToArray(arr) {
      const newHsl = getRandomHsl();
      if (!arr.includes(newHsl)) {
        arr.push(newHsl);
      }
    }

    while (array.length < desiredNumberOfColors) {
      addNewHslToArray(array);
    }

    return array;
  };

  console.log(getArrayOfHslValues());

  const randomHslValues = getRandomHsl();
  const url = `https://www.thecolorapi.com/id?hsl=${randomHslValues.hue},${randomHslValues.saturation}%,${randomHslValues.lightness}%`;

  // Component:
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOneColor = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOneColor();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ColorFetcher;
