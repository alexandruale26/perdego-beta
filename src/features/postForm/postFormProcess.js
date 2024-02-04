import { errorToast } from "../../shared/Toasts";
import { wordToUppercase } from "../../utils/helpers";
import { createPost, deleteImage } from "../../services/postApi";
import { handleImageUpload } from "./formHelpers";

const postFormProcess = async (values, setIsLoading, setIsPostCreated) => {
  const imageUploaderResponse = await handleImageUpload(values.image);

  if (imageUploaderResponse.status !== "ok") {
    setIsLoading(false);
    return errorToast(imageUploaderResponse.message);
  }

  const sanitizedFormValues = {
    title: wordToUppercase(values.title, true),
    description: wordToUppercase(values.description),
  };

  // userId automatically added by DB whenever user creates or modifies post
  const newData = { ...values, ...sanitizedFormValues, image: imageUploaderResponse.data };
  const postResponse = await createPost(newData);

  if (postResponse.status !== "ok") {
    await deleteImage(imageUploaderResponse.data); // no need to use response.status
    setIsLoading(false);

    return errorToast(postResponse.message);
  }
  setIsPostCreated(true);
  setIsLoading(false);
};

export default postFormProcess;
