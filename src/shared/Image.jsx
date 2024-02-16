import { useState } from "react";
import { twMerge } from "tailwind-merge";

const placeholderImg = "camera.png";

const Image = ({ className, src, placeholderStyle, ...imgProps }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [failedToFetchImg, setFailedToFetchImg] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setFailedToFetchImg(true);
  };

  return (
    <div className={twMerge("w-full h-full flex items-center justify-center", className)}>
      {isLoading && <div className="w-full h-full flex items-center justify-center loading"></div>}

      {failedToFetchImg ? (
        <div
          className={twMerge(
            "w-full h-full flex items-center justify-center bg-grey-100 border-2 border-grey-200 rounded-sm",
            placeholderStyle
          )}
        >
          <img src={placeholderImg} alt="placeholder" />
        </div>
      ) : (
        <img
          src={src}
          style={{ display: isLoading ? "none" : "block" }}
          alt="object"
          draggable="false"
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={twMerge("w-full h-full", className)}
          {...imgProps}
        />
      )}
    </div>
  );
};

export default Image;
