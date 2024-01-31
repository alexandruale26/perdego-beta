import { useState, useEffect } from "react";
import PageContainer from "../shared/PageContainer";
import LinkButton from "../shared/LinkButton";
import Section from "../shared/Section";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { showSearchResultsTitle } from "../features/home/helpers";
import WarningIcon from "../shared/icons/WarningIcon";
import PostLink from "../features/home/PostLink";
import Spinner from "../shared/Spinner";
import Error from "../shared/Error";
import { getPostsByUserId } from "../services/postApi";
import { useUserSessionContext } from "../ui/UserSession";

const PostsDashboard = () => {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useUserSessionContext();

  useEffect(() => {
    setIsLoading(true);

    const process = async () => {
      const response = await getPostsByUserId(user.id);

      // no need to use response.status
      setPosts(response.data);
      setIsLoading(false);
    };

    process();
  }, [user.id]);

  const loadedAndHasData = isLoading === false && posts !== null;

  return (
    <PageContainer className="bg-inherit">
      <div className="w-full max-w-4xl h-full mx-auto text-center space-y-6">
        {/* <LinkButton to="/" className="justify-start xs:text-lg font-medium text-grey-700 select-none">
          <ChevronLeftIcon className="w-10 h-10 pb-1 mr-[-4px]" /> Înapoi
          <span className="pl-4 text-xs xs:text-sm font-light underline">Pagina principalǎ</span>
        </LinkButton> */}
        <div className="flex flex-col items-start justify-center gap-6">
          <h1 className="text-start text-xl xs:text-2xl font-medium">Anunțurile tale</h1>
          <div className="flex items-center justify-center gap-2">
            <WarningIcon className="w-6 h-6 shrink-0" />
            <h3 className="text-start text-sm xs:text-base text-grey-600 font-light">
              Anunțurile vor fi șterse dupǎ 30 de zile de la crearea lor.
            </h3>
          </div>
        </div>

        {isLoading && <Spinner fullHeight={false} className="pt-6 xs:pt-24" />}

        {isLoading === false && posts === null && (
          <Error fullHeight={false} showButton={false} errorMessage="Ne pare rǎu, dar a apǎrut o problemǎ :(" />
        )}

        {loadedAndHasData && (
          <Section className="flex flex-col items-start justify-start gap-4 bg-transparent border-none p-0 shadow-none">
            {posts.length < 1 ? (
              <div className="w-full flex flex-col items-center justify-center gap-4 text-xl text-grey-700 py-20">
                Ai pierdut sau ai gǎsit un obiect?
                <LinkButton to="/" disguiseAsFullButton={true} className="p-2">
                  Adaugǎ anunț nou
                </LinkButton>
              </div>
            ) : (
              posts.map((post) => <PostLink key={post.id} post={post} backToUserPosts={true} />)
            )}
          </Section>
        )}
      </div>
    </PageContainer>
  );
};

export default PostsDashboard;
