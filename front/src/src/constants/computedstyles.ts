export const computeStyle = (
  rating: number | undefined,
  current: boolean = false
) => {
  let gradientColor = "";

  if (rating) {
    if (rating < 4) gradientColor = "#ed213a, #93291e";
    else if (rating >= 4 && rating < 8) gradientColor = "#fdc830, #f37335";
    else gradientColor = "#00b09b, #96c93d";
  } else return {};

  if (current) gradientColor = "#8e9eab, #eef2f3";

  return {
    fontSize: "2rem",
    backgroundImage: `-webkit-linear-gradient(${gradientColor})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };
};
