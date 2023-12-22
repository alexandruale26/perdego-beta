import { useLoaderData } from "react-router-dom";
import { getPost, getImageUrl } from "../services/postApi";
import Section from "../shared/Section";
import Tag from "../shared/Tag";
import UserProfile from "../shared/UserProfile";
import FavoriteButton from "../shared/FavoriteButton";
import Telephone from "../features/post/Telephone";

const Post = () => {
  // TODO: separate tags into in array and map them (location, category, type, maybe other in the future)
  // TODO: image should load after render
  // TODO: favorite if user is logged
  // TODO: put user member date at create post

  const post = useLoaderData();
  console.log(post);

  return (
    <div className="w-full max-w-3xl flex flex-col gap-4 py-4 rounded-md mx-auto">
      <div className="w-full h-[280px] xs:h-[400px] sm:h-[500px] bg-white rounded-md overflow-hidden border transition-all">
        <img src={post.image} alt="object" className="w-full h-full object-contain" />
      </div>

      <Section className="flex-col items-start justify-center">
        <div className="w-full flex items-center justify-between">
          <p className="text-xs font-light text-stone-600">{post.createdAt}</p>
          <FavoriteButton isFavorite={true}></FavoriteButton>
        </div>

        <h1 className="text-xl xs:text-2xl font-semibold text-stone-800">{post.title}</h1>

        <div className="w-full flex flex-wrap gap-2 items-center justify-start">
          <Tag title="Tip anunț:" description={post.postType === "lost" ? "Pierdute" : "Gǎsite"} />
          <Tag title="Locație:" description={post.location} />
          <Tag title="Categorie:" description={post.category} />
        </div>

        <h2 className="text-lg xs:text-xl font-semibold uppercase text-stone-800 mt-2">Descriere</h2>
        <p className="text-sm xs:text-base font-light text-stone-700">{post.description}</p>
      </Section>

      <Section className="flex-wrap items-center justify-between">
        <div className="flex items-start justify-center flex-col gap-2">
          <h3 className="text-base xs:text-lg font-semibold  text-stone-800 uppercase">Contacteazǎ-mǎ</h3>
          <UserProfile name={post.name} memberSinceDate="iunie 2023" />
        </div>

        <Telephone number={post.phone} />
      </Section>
    </div>
  );
};

const loader = async () => {
  //TODO: manage request and response params, and unknown id
  const postId = "bc19f00a-c300-4f61-8d1c-b656f38b3b3d";
  const receivedData = await getPost(postId);
  const image = getImageUrl(receivedData.image);

  const post = { ...receivedData, image };
  return post;
};

export default Post;
export { loader };
