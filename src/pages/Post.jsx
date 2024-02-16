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

  const urlState = useLocation()?.state;
  const validParams = !!urlState?.searchParams;
  const backToUserPosts = !!urlState?.backToUserPosts;

  const linkRedirect = backToUserPosts || validParams ? -1 : "/";

  if (isLoading && !post) return <Spinner />;
  if (!post) return <Error errorMessage="Ne pare rǎu, dar anunțul nu existǎ :(" />;

  const image = getImageUrl(post.image);

  return (
    <PageContainer className="bg-inherit">
      <div className="w-full h-full max-w-3xl flex flex-col gap-4 rounded-md mx-auto">
        <LinkButton to={linkRedirect} className="justify-start -mt-2 font-medium text-grey-700 select-none">
          <ChevronLeftIcon className="shrink-0 w-8 h-8 pb-1 mr-[-4px]" /> Înapoi
          <span className="pl-4 text-xs xs:text-sm font-light">
            {backToUserPosts
              ? "Anunțurile tale"
              : validParams
                ? generateSearchParamsTitle(urlState?.searchParams, true)
                : "Pagina principalǎ"}
          </span>
        </LinkButton>

        <div className="w-full h-[280px] xs:h-[400px] sm:h-[500px] p-2 bg-white rounded-md overflow-hidden shadow-sm transition-all">
          <Image src={image} className="object-contain" />
        </div>

        <Section className="flex-col items-start justify-center">
          <p className="text-xs font-light text-grey-600">{formatPostDate(post.created_at)}</p>

          <h1 className="-mt-1 text-xl xsm:text-2xl font-semibold leading-none text-grey-800">{post.title}</h1>
          <p className="text-sm font-normal text-grey-700 mb-2">{post.description}</p>

          <div className="w-full flex flex-wrap gap-2 items-center justify-start mb-1">
            <Tag title="Tip anunț:" description={post.post_type} />
            <Tag title="Locație:" description={post.location} />
            <Tag title="Categorie:" description={post.category} />
          </div>
        </Section>

        <Section className="flex-col items-start justify-start">
          <h3 className="text-sm xsm:text-base font-medium text-grey-800 uppercase">Contacteazǎ-mǎ</h3>
          <div className="w-full flex flex-col xsm:flex-row items-start xsm:items-center justify-between gap-5 xsm:gap-0 pb-1">
            <UserProfile profile={profile} />
            <Telephone number={profile.phone} />
          </div>
        </Section>
      </div>
    </PageContainer>
  );
};

export default Post;
