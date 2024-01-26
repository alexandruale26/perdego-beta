import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getPost, getImageUrl } from "../services/postApi";
import Section from "../shared/Section";
import Tag from "../features/post/Tag";
import UserProfile from "../shared/UserProfile";
import LinkButton from "../shared/LinkButton";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Telephone from "../features/post/Telephone";
import PageContainer from "../shared/PageContainer";
import Image from "../shared/Image";
import Spinner from "../shared/Spinner";
import Error from "../shared/Error";
import { formatPostDate } from "../utils/helpers";
import generateSearchParamsTitle from "../features/post/helpers";
import { getProfile } from "../services/profileApi";

const placeholderStyle = "p-20 bg-grey-200";

const Post = () => {
  const [post, setPost] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const id = useLocation().pathname.replaceAll("/", "");

  useEffect(() => {
    setIsLoading(true);

    const process = async () => {
      const postResponse = await getPost(id);

      if (postResponse.status !== "ok") {
        return setIsLoading(false);
      }

      const profileResponse = await getProfile(postResponse.data.userId);

      if (profileResponse.status !== "ok") {
        return setIsLoading(false);
      }

      setPost(postResponse.data);
      setProfile(profileResponse.data);
      setIsLoading(false);
    };

    process();
  }, [id]);

  const urlParams = useLocation()?.state;
  const validParams = !!urlParams?.searchParams;

  if (isLoading && !post) return <Spinner />;
  if (!post) return <Error errorMessage="Ne pare rǎu, dar anunțul nu existǎ :(" />;

  const image = getImageUrl(post.image);

  return (
    <PageContainer className="bg-inherit">
      <div className="w-full h-full max-w-4xl flex flex-col gap-4 rounded-md mx-auto">
        <LinkButton
          to={validParams ? -1 : "/"}
          className="justify-start xs:text-lg font-medium text-grey-700 select-none"
        >
          <ChevronLeftIcon className="w-10 h-10 pb-1 mr-[-4px]" /> Înapoi{" "}
          <span className="pl-4 text-xs xs:text-sm font-light underline">
            {validParams ? generateSearchParamsTitle(urlParams?.searchParams, true) : "Pagina principalǎ"}
          </span>
        </LinkButton>

        <div className="w-full h-[280px] xs:h-[400px] sm:h-[500px] p-2 bg-white rounded-md overflow-hidden shadow-sm transition-all">
          <Image
            src={image}
            alt="object"
            className={`max-w-full object-contain ${image === null ? placeholderStyle : ""}`}
          />
        </div>

        <Section className="flex-col items-start justify-center">
          <div className="w-full flex items-center justify-between">
            <p className="text-sm font-light text-grey-600">{formatPostDate(post.createdAt)}</p>
          </div>

          <h1 className="text-xl xs:text-2xl font-semibold text-grey-800">{post.title}</h1>

          <div className="w-full flex flex-wrap gap-2 items-center justify-start mb-2">
            <Tag title="Tip anunț:" description={post.postType} />
            <Tag title="Locație:" description={post.location} />
            <Tag title="Categorie:" description={post.category} />
          </div>

          <h2 className="text-lg xs:text-xl font-semibold uppercase text-grey-800 mt-2">Descriere</h2>
          <p className="text-sm xs:text-base font-light text-grey-700">{post.description}</p>
        </Section>

        <Section className="flex-col items-start justify-start">
          <h3 className="text-base xs:text-lg font-semibold text-grey-800 uppercase">Contacteazǎ-mǎ</h3>
          <div className="w-full flex items-center justify-between flex-wrap gap-4">
            <UserProfile profile={profile} />
            <Telephone number={profile.phone} />
          </div>
        </Section>
      </div>
    </PageContainer>
  );
};

export default Post;
