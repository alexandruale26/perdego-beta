import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import SearchForm from "../features/home/SearchForm";
import Spinner from "../shared/Spinner";
import Error from "../shared/Error";
import { queryPosts } from "../services/searchApi";
import generateSearchParamsTitle from "../features/post/helpers";
import PageContainer from "../shared/PageContainer";
import SearchResults from "../features/home/SearchResults";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { defaultSearchParams } from "../features/home/data";
import { getAllSearchParamsAsObject } from "../features/home/helpers";
import Cookies from "../features/home/cookies/Cookies";

const xsSize = 480; // size from tailwind.config.js

const Home = () => {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hideFilters, setHideFilters] = useState(false);
  const [isOnMobile, setIsOnMobile] = useState(false);
  const [urlSearchParams, setUrlSearchParams] = useSearchParams(defaultSearchParams);

  const hasSearchParams = !!useLocation().search;
  const searchedParams = getAllSearchParamsAsObject(urlSearchParams);

  useEffect(() => {
    const process = async () => {
      setIsLoading(true);
      const queryParams = getAllSearchParamsAsObject(urlSearchParams);
      const response = await queryPosts(queryParams, hasSearchParams);

      // no need to use response.status
      setPosts(response.data);
      setIsLoading(false);
    };

    process();
  }, [urlSearchParams, hasSearchParams]);

  useEffect(() => {
    const handleResize = () => {
      const userIsOnMobile = window.innerWidth < xsSize;

      setIsOnMobile(userIsOnMobile);
      return hasSearchParams ? setHideFilters(false) : setHideFilters(userIsOnMobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [hasSearchParams]);

  const handleHideFilters = (event) => {
    event.preventDefault();
    setHideFilters(!hideFilters);
  };

  const getSearchValues = (queryData) => setUrlSearchParams(queryData);
  const loadedAndHasData = isLoading === false && posts !== null;

  return (
    <PageContainer className="bg-inherit">
      <div className="w-full max-w-4xl h-full mx-auto text-center space-y-6 xs:space-y-8">
        <div className="w-full space-y-4">
          <SearchForm
            onSubmit={getSearchValues}
            searchParams={searchedParams}
            hasSearchParams={hasSearchParams}
            isOnMobile={isOnMobile}
            hideFilters={hideFilters}
            handleHideFilters={handleHideFilters}
          />

          {loadedAndHasData && (
            <div className="flex items-center justify-center gap-1 pl-0.5 text-grey-700">
              {hasSearchParams && <MagnifyingGlassIcon className="w-5 h-5" />}

              <p className="w-full text-left text-xs xs:text-sm font-light pl-1">
                {generateSearchParamsTitle(searchedParams)}
              </p>
            </div>
          )}
        </div>

        {isLoading && <Spinner fullHeight={false} className="pt-6 xs:pt-24" />}

        {isLoading === false && posts === null && (
          <Error fullHeight={false} showButton={false} errorMessage="Ne pare rǎu, dar a apǎrut o problemǎ :(" />
        )}

        {loadedAndHasData && (
          <SearchResults hasSearchParams={hasSearchParams} posts={posts} searchedParams={searchedParams} />
        )}
      </div>
      <Cookies />
    </PageContainer>
  );
};

export default Home;
