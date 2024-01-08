import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PostLink from "../features/home/PostLink";
import SearchForm from "../features/home/SearchForm";
import Section from "../shared/Section";
import Spinner from "../shared/Spinner";
import { queryPosts, firstRenderPosts } from "../services/searchApi";
import { getAllSearchParamsAsObject, showSearchResultsTitle } from "../features/home/helpers";

// TODO: see if can separate some objects
const defaultSearchParams = {
  search: "",
  postType: "",
  location: "",
  category: "",
};

const Home = () => {
  //TODO: parent container should be flex and children full width
  const [firstRender, setFirstRender] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams(defaultSearchParams);

  useEffect(() => {
    setIsLoading(true);

    const process = async () => {
      const queryParams = getAllSearchParamsAsObject(searchParams);
      const data = firstRender ? await firstRenderPosts() : await queryPosts(queryParams);

      setPosts(data);
      setIsLoading(false);
    };

    process();
  }, [searchParams, firstRender]);

  const getSearchValues = (queryData) => {
    setSearchParams(queryData);
    setFirstRender(false);
  };

  const searchedParams = getAllSearchParamsAsObject(searchParams);

  return (
    <div className="w-full max-w-4xl h-full min-h-screen mx-auto text-center space-y-10">
      <SearchForm onSubmit={getSearchValues} searchParams={searchedParams} />

      {isLoading ? (
        <Spinner className="pt-0 xs:pt-32" />
      ) : (
        <Section className="flex flex-col items-start justify-start gap-4 bg-transparent border-none p-0 shadow-none">
          <h2 className="w-full text-start pl-1 mb-2 text-xl xs:text-2xl font-medium text-stone-700 select-none">
            {showSearchResultsTitle(firstRender, posts.length)}
          </h2>

          {posts.map((post) => (
            <PostLink key={post.postId} post={post} searchParams={searchedParams} />
          ))}
        </Section>
      )}
    </div>
  );
};

export default Home;
