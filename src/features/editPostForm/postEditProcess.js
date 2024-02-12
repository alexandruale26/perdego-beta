import toastNotification from "../../shared/Toasts";
import { wordToUppercase } from "../../utils/helpers";
import { updatePost, deleteImage } from "../../services/postApi";
import { handleImageUpload } from "../postForm/formHelpers";

const deleteExistingImage = async (imageName) => await deleteImage(imageName);

const postEditProcess = async (values, postId, imageName, setIsLoading, setIsPostModified) => {
  setIsLoading(true);

  let image = imageName;

  if (values.image.size > 0) {
    const imageUploaderResponse = await handleImageUpload(values.image);

    if (imageUploaderResponse.status !== "ok") {
      setIsLoading(false);
      return toastNotification(imageUploaderResponse.message);
    }

    image = imageUploaderResponse.data;
  }

  const sanitizedFormValues = {
    title: wordToUppercase(values.title, true),
    description: wordToUppercase(values.description),
  };

  // userId automatically added by DB whenever user creates or modifies post
  const newData = { ...values, ...sanitizedFormValues, image };
  const postResponse = await updatePost(newData, postId);

  if (postResponse.status !== "ok") {
    deleteExistingImage(image);

    setIsLoading(false);
    return toastNotification(postResponse.message);
  }

  if (image !== imageName) deleteExistingImage(imageName);
  setIsPostModified(true);
  setIsLoading(false);
};

export default postEditProcess;
