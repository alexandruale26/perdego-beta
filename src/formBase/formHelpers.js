import ImageResizer from "react-image-file-resizer";
import { removeDiacritics } from "../utils/helpers";

const compressImage = (file, maxWidth, maxHeight) => {
  return new Promise((resolve) => {
    ImageResizer.imageFileResizer(
      file,
      maxWidth, // maxWidth
      maxHeight, // maxHeight
      "png", // format
      100, // quality
      0, // rotation
      (uri) => {
        resolve(uri);
      },
      "file" // output type
    );
  });
};

const convertImage = async (imageFile, maxWidth, maxHeight) => {
  if (imageFile) {
    try {
      //TODO: check if compressed image is bigger than the original. very rare case (could ignore?)
      const compressedImage = await compressImage(imageFile, maxWidth, maxHeight);
      return compressedImage;
    } catch (error) {
      //TODO: manage errors
      console.error("Error compressing image:", error);
    }
  }
};

const filterData = (data, search) => {
  return data.filter((value) => {
    const noDiacriticsSearch = removeDiacritics(value);
    const noDiacriticsTarget = removeDiacritics(search);
    return noDiacriticsSearch.toLowerCase().includes(noDiacriticsTarget.toLowerCase());
  });
};

export { convertImage, filterData };
