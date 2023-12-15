import { useLoaderData } from "react-router-dom";
import { getPost, getImageUrl } from "../services/postApi";
import Separator from "../formComponents/Separator";

const Post = () => {
  const post = useLoaderData();
  console.log(post);
  return (
    <div className="w-full max-w-3xl flex flex-col gap-4 mx-auto">
      <img src={post.image} alt="post object" className="w-full h-auto rounded-lg" />
      <Separator />
    </div>
  );
};

const loader = async () => {
  //TODO: manage request and response params, and unknown id
  const postId = "71088321-707e-4cd3-9ddc-20d65e8b6577";
  const receivedData = await getPost(postId);
  const image = getImageUrl(receivedData.image);

  const post = { ...receivedData, image };
  return post;
};

export default Post;
export { loader };
