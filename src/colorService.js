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

export const fetchColors = async (totalColors) => {
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
        return {
          h: `${json.hsl.h}`,
          s: `${json.hsl.s}`,
          l: `${json.hsl.l}`,
          name: `${json.name.value}`,
          contrastHex: `${json.contrast.value}`,
        };
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
      console.log(error.message);
    }
  }
  return finalColors;
};

export const shuffleColors = (colors) => {
  let pointer = colors.length - 1;
  while (pointer != 0) {
    const randomIndex = Math.floor(Math.random() * (colors.length - 1));
    const temp = colors[pointer];
    colors[pointer] = colors[randomIndex];
    colors[randomIndex] = temp;
    pointer -= 1;
  }
};
