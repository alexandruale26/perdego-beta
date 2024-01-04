import ImageResizer from "react-image-file-resizer";

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

const convertImage = async (imageFile, maxWidth = 800, maxHeight = 800) => {
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

export { convertImage };
