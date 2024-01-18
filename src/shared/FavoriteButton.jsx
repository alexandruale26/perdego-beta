import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import Button from "./button";

// IMPORTANT should not use

const iconStyle = "text-orange-500";

const animate = (firstRender) => {
  return !firstRender ? "animate-in zoom-in-150 duration-200" : "";
};

const FavoriteButton = ({ isFavorite, className }) => {
  const [favorite, setFavorite] = useState(isFavorite);
  const [firstRender, setFirstRender] = useState(true);

  const saveFavorite = (e) => {
    e.preventDefault();
    setFavorite(!favorite);
    setFirstRender(false);
  };

  return (
    <Button onClick={saveFavorite} className={twMerge("w-8 h-8", className)}>
      {favorite ? (
        <HeartFilledIcon className={`h-full w-full ${iconStyle} ${animate(firstRender)}`} />
      ) : (
        <HeartIcon className={`h-full w-full ${iconStyle} ${animate(firstRender)}`} />
      )}
    </Button>
  );
};

export default FavoriteButton;
