import { BG_COLORS } from "../../sharedData";

const randomBgColor = () => {
  if (BG_COLORS.length < 1) throw new Error("Must have at least 1 color for background");
  return Math.floor(Math.random() * BG_COLORS.length);
};

export { randomBgColor };
