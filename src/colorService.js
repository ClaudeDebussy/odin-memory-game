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

export const getHslValues = (totalColors) => {
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

export const createUrls = (colors) => {
  const arr = [];
  for (let i = 0; i < colors.length; i++) {
    arr.push(
      `https://www.thecolorapi.com/id?hsl=${colors[i].hue},${colors[i].saturation}%,${colors[i].lightness}%`
    );
  }
  return arr;
};
