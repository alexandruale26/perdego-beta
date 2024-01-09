import { useLoaderData, useLocation } from "react-router-dom";
import { getPost, getImageUrl } from "../services/postApi";
import Section from "../shared/Section";
import Tag from "../shared/Tag";
import UserProfile from "../shared/UserProfile";
import LinkButton from "../shared/LinkButton";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
// import FavoriteButton from "../shared/FavoriteButton";
// import MinifiedSearchForm from "../features/home/MinifiedSearchForm";
import Telephone from "../features/post/Telephone";
import { formatPostDate } from "../utils/helpers";
import generateSearchParamsTitle from "../features/post/helpers";

const Post = () => {
  // TODO: image should load after render
  // TODO: put user member data at create post

  const post = useLoaderData();
  const image = getImageUrl(post.image);
  const { searchParams } = useLocation().state;

  return (
    <div className="w-full max-w-4xl flex flex-col gap-4 rounded-md mx-auto">
      {/* <MinifiedSearchForm /> */}
      <LinkButton to={-1} className="justify-start xs:text-lg font-medium text-stone-700 select-none">
        <ChevronLeftIcon className="w-10 h-10 pb-1 mr-[-4px]" /> Înapoi{" "}
        <span className="pl-4 text-xs xs:text-sm font-light">{generateSearchParamsTitle(searchParams)}</span>
      </LinkButton>

      <div className="w-full h-[280px] xs:h-[400px] sm:h-[500px] p-2 bg-white rounded-md overflow-hidden shadow-sm transition-all">
        <img src={image} alt="object" className="w-full h-full object-contain" />
      </div>

      <Section className="flex-col items-start justify-center">
        <div className="w-full flex items-center justify-between">
          <p className="text-sm font-light text-stone-600">{formatPostDate(post.createdAt)}</p>
          {/* <FavoriteButton isFavorite={true}></FavoriteButton> */}
        </div>

        <h1 className="text-xl xs:text-2xl font-semibold text-stone-800">{post.title}</h1>

        <div className="w-full flex flex-wrap gap-2 items-center justify-start mb-2">
          <Tag title="Tip anunț:" description={post.postType} />
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

const loader = async ({ request, params }) => {
  //TODO: manage request and response params, and unknown id

  const postId = params.pid;
  const receivedData = await getPost(postId);

  return receivedData;
};

export default Post;
export { loader };
