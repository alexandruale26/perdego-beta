const BG_COLORS = [
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-yellow-500",
  "bg-lime-500",
  "bg-green-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-sky-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-violet-500",
  "bg-purple-500",
  "bg-fuchsia-500",
  "bg-pink-500",
  "bg-rose-500",
];

const randomBgColor = () => {
  if (BG_COLORS.length < 1) throw new Error("Must have at least 1 color for background");
  const randomNumber = Math.floor(Math.random() * BG_COLORS.length);
  return BG_COLORS[randomNumber];
};

export { randomBgColor };
