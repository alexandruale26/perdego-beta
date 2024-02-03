import { errorToast } from "../../shared/Toasts";
import { wordToUppercase } from "../../utils/helpers";
import { updatePost, deleteImage } from "../../services/postApi";
import { handleImageUpload } from "../postForm/formHelpers";

const postEditProcess = async (values, user, postId, setIsLoading, setIsPostCreated) => {
  // console.log(user);
  if (user === null || postId === null) return errorToast("A apǎrut o problemǎ. Te rugǎm conecteazǎ-te.");
  // const imageUploaderResponse = await handleImageUpload(values.image);

  // if (imageUploaderResponse.status !== "ok") {
  //   setIsLoading(false);
  //   return errorToast(imageUploaderResponse.message);
  // }

  // const sanitizedFormValues = {
  //   title: wordToUppercase(values.title, true),
  //   description: wordToUppercase(values.description),
  // };

  // userId automatically added by DB whenever user creates or modifies post
  // const newData = { ...values, ...sanitizedFormValues, image: imageUploaderResponse.data };
  // const newData = { ...values, ...sanitizedFormValues };
  const newData = { ...values };
  const postResponse = await updatePost(newData, postId);

  if (postResponse.status !== "ok") {
    // await deleteImage(imageUploaderResponse.data); // no need to use response.status
    setIsLoading(false);

    return errorToast(postResponse.message);
  }
  setIsPostCreated(true);
  setIsLoading(false);
};

export default postEditProcess;
