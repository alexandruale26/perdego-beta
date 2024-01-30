import { useState } from "react";
import PageContainer from "../shared/PageContainer";
import LinkButton from "../shared/LinkButton";
import Section from "../shared/Section";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { showSearchResultsTitle } from "../features/home/helpers";
import PostLink from "../features/home/PostLink";
import Spinner from "../shared/Spinner";
import Error from "../shared/Error";

const PostsDashboard = () => {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const searchedParams = "";

  const loadedAndHasData = isLoading === false && posts !== null;

  return (
    <PageContainer>
      <div className="w-full max-w-4xl h-full mx-auto text-center space-y-4">
        <LinkButton to="/" className="justify-start xs:text-lg font-medium text-grey-700 select-none">
          <ChevronLeftIcon className="w-10 h-10 pb-1 mr-[-4px]" /> Înapoi
          <span className="pl-4 text-xs xs:text-sm font-light underline">Pagina principalǎ</span>
        </LinkButton>
        <div className="flex flex-col items-start justify-center gap-4">
          <h1 className="text-start text-xl xs:text-2xl font-medium">Anunțurile tale</h1>
          <h3 className="text-start text-sm xs:text-base font-light">
            Anunțurile vor fi șterse dupǎ 30 de zile de la crearea lor
          </h3>
        </div>

        {isLoading && <Spinner fullHeight={false} className="pt-6 xs:pt-24" />}

        {isLoading === false && posts === null && (
          <Error fullHeight={false} showButton={false} errorMessage="Ne pare rǎu, dar a apǎrut o problemǎ :(" />
        )}

        {loadedAndHasData && (
          <Section className="flex flex-col items-start justify-start gap-4 bg-transparent border-none p-0 shadow-none">
            <div className="w-full flex items-start gap-1 pl-1 select-none">
              <h2 className="text-start text-xl xs:text-2xl font-medium">
                {showSearchResultsTitle(false, posts.length)}
              </h2>

              {posts.map((post) => (
                <PostLink key={post.id} post={post} gridMode={false} searchParams={searchedParams} />
              ))}
            </div>
          </Section>
        )}
      </div>
    </PageContainer>
  );
};

export default PostsDashboard;
