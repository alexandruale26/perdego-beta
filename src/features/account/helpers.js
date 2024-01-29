const BG_COLORS = [
  "#ef4444", //red
  "#f97316", //orange
  "#f59e0b", //amber
  "#eab308", //yellow
  "#84cc16", //lime
  "#22c55e", //green
  "#14b8a6", //teal
  "#06b6d4", //cyan
  "#0ea5e9", //sky
  "#3b82f6", //blue
  "#6366f1", //indigo
  "#8b5cf6", //violet
  "#a855f7", //purple
  "#d946ef", //fuchsia
  "#f43f5e", //rose
];

const EMAIL_AND_PASSWORD_LENGTHS = {
  email: {
    max: 100,
  },
  password: {
    min: 8,
    max: 30,
  },
};

const randomColor = () => {
  if (BG_COLORS.length < 1) throw new Error("Must have at least 1 color for background");
  const randomNumber = Math.floor(Math.random() * BG_COLORS.length);
  return BG_COLORS[randomNumber];
};

export { randomColor, EMAIL_AND_PASSWORD_LENGTHS };
