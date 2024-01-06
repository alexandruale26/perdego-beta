import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PostLink from "../features/home/PostLink";
import SearchForm from "../features/home/SearchForm";
import Section from "../shared/Section";
import Spinner from "../shared/Spinner";
import queryPosts from "../services/searchApi";
import { POSTTYPE } from "../sharedData";

const getAllSearchParamsAsObject = (searchParams) => {
  return Array.from(searchParams.entries()).reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
};

const defaultSearchParams = {
  search: "",
  postType: POSTTYPE[1],
  location: "",
  category: "",
};

const Home = () => {
  //TODO: parent container should be flex and children full width
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams(defaultSearchParams);

  useEffect(() => {
    setIsLoading(true);

    const process = async () => {
      const queryParams = getAllSearchParamsAsObject(searchParams);
      const data = await queryPosts(queryParams);

      setPosts(data);
      setIsLoading(false);
    };

    process();
  }, [searchParams]);

  const searchPosts = (queryData) => {
    setSearchParams(queryData);
  };

  return (
    <div className="w-full max-w-4xl h-full min-h-screen mx-auto text-center space-y-10">
      <SearchForm onSubmit={searchPosts} />

      {isLoading ? (
        <Spinner className="pt-0 xs:pt-32" />
      ) : (
        <Section className="flex flex-col items-start justify-start gap-2 bg-transparent border-none p-0 shadow-none">
          {posts && (
            <h2 className="w-full text-start pl-1 mb-2 text-lg xs:text-xl font-medium text-stone-700">
              Am gǎsit {posts.length} rezultate
            </h2>
          )}

          {posts && posts.map((post) => <PostLink key={post.postId} post={post} />)}
        </Section>
      )}
    </div>
  );
};

export default Home;
