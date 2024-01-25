import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import SearchForm from "../features/home/SearchForm";
import Spinner from "../shared/Spinner";
import Error from "../shared/Error";
import { queryPosts } from "../services/searchApi";
import generateSearchParamsTitle from "../features/post/helpers";
import PageContainer from "../shared/PageContainer";
import SearchResults from "../features/home/SearchResults";
import { defaultSearchParams } from "../features/home/data";
import { getAllSearchParamsAsObject } from "../features/home/helpers";

const Home = () => {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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

  const getSearchValues = (queryData) => setSearchParams(queryData);

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
            fullHeight={false}
            showButton={false}
            errorMessage="Ne pare rǎu, dar a apǎrut o problemǎ :("
            className=""
          />
        )}

        {loadedAndHasData && (
          <SearchResults hasSearchParams={hasSearchParams} posts={posts} searchedParams={searchedParams} />
        )}
      </div>
    </PageContainer>
  );
};

export default Home;
