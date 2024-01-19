import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import PostLink from "../features/home/PostLink";
import SearchForm from "../features/home/SearchForm";
import Section from "../shared/Section";
import LayoutSwitcher from "../features/home/LayoutSwitcher";
import Spinner from "../shared/Spinner";
import Error from "../shared/Error";
import { queryPosts } from "../services/searchApi";
import { saveToLocalStorage } from "../utils/helpers";
import generateSearchParamsTitle from "../features/post/helpers";
import PageContainer from "../shared/PageContainer";
import { GRID_STORAGE_NAME, defaultSearchParams } from "../features/home/data";
import {
  getAllSearchParamsAsObject,
  showSearchResultsTitle,
  isLayoutChangeAllowed,
  getGridModeFromStorage,
} from "../features/home/helpers";

const Home = () => {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [gridMode, setGridMode] = useState(getGridModeFromStorage());
  const [allowLayoutChange, setAllowLayoutChange] = useState(isLayoutChangeAllowed());
  const [searchParams, setSearchParams] = useSearchParams(defaultSearchParams);

  const hasSearchParams = !!useLocation().search;
  const searchedParams = getAllSearchParamsAsObject(searchParams);

  useEffect(() => {
    setIsLoading(true);

    const process = async () => {
      const queryParams = getAllSearchParamsAsObject(searchParams);
      const response = await queryPosts(queryParams, hasSearchParams);

      // no need to use response.status
      setPosts(response.data);
      setIsLoading(false);
    };

    process();
  }, [searchParams, hasSearchParams]);

  useEffect(() => {
    const setIfLayoutAllowed = (e) => {
      e.preventDefault();
      setAllowLayoutChange(isLayoutChangeAllowed());
    };

    window.addEventListener("resize", setIfLayoutAllowed);
    return () => window.removeEventListener("resize", setIfLayoutAllowed);
  }, []);

  const getSearchValues = (queryData) => {
    setSearchParams(queryData);
  };

  const handleLayoutSwitch = (value) => {
    setGridMode(value);
    saveToLocalStorage(GRID_STORAGE_NAME, value);
  };

  const loadedAndHasData = isLoading === false && posts !== null;

  return (
    <PageContainer className="bg-inherit">
      <div className="w-full max-w-4xl h-full mx-auto text-center space-y-8 xs:space-y-10">
        <div className="w-full space-y-4">
          <SearchForm onSubmit={getSearchValues} searchParams={searchedParams} hasSearchParams={hasSearchParams} />

          {loadedAndHasData && (
            <p className="w-full text-left text-xs xs:text-sm font-light text-grey-700 pl-1 underline">
              {generateSearchParamsTitle(searchedParams)}
            </p>
          )}
        </div>

        {isLoading && <Spinner fullHeight={false} className="pt-6 xs:pt-24" />}

        {isLoading === false && posts === null && (
          <Error
            className="p-0 pt-6 xs:pt-20 min-h-0"
            fullHeight={false}
            errorMessage="Ne pare rǎu, dar a apǎrut o problemǎ :("
            showButton={false}
          />
        )}

        {loadedAndHasData && (
          <Section className="flex flex-col items-start justify-start gap-4 bg-transparent border-none p-0 shadow-none">
            <div className="w-full flex items-start gap-1 pl-1 select-none">
              <h2 className="w-full my-auto text-start text-xl xs:text-2xl font-medium">
                {showSearchResultsTitle(hasSearchParams, posts.length)}
              </h2>
              {hasSearchParams && allowLayoutChange && (
                <LayoutSwitcher isGridSelected={gridMode} onSelect={handleLayoutSwitch} />
              )}
            </div>

            {hasSearchParams === true && (
              <Section gridMode={gridMode} className="flex-col p-0 bg-transparent shadow-none rounded-none">
                {posts.map((post) => (
                  <PostLink key={post.postId} post={post} gridMode={gridMode} searchParams={searchedParams} />
                ))}
              </Section>
            )}

            {hasSearchParams === false && (
              <Section gridMode={true}>
                {posts.map((post) => (
                  <PostLink key={post.postId} post={post} gridMode={true} searchParams={searchedParams} />
                ))}
              </Section>
            )}
          </Section>
        )}
      </div>
    </PageContainer>
  );
};

export default Home;
