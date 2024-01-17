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

const convertImage = async (imageFile, maxWidth = 600, maxHeight = 600) => {
  if (imageFile.type.startsWith("image/") === false) return null;

  try {
    const compressedImage = await compressImage(imageFile, maxWidth, maxHeight);

    if (compressedImage === null) throw new Error("Error converting image");
    return compressedImage;
  } catch (error) {
    console.log(error);
  }
};

export { convertImage };
