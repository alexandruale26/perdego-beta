import { useState } from "react";
import PostLink from "../features/home/PostLink";
import SearchForm from "../features/home/SearchForm";
import Section from "../shared/Section";
import Spinner from "../shared/Spinner";
import queryPosts from "../services/searchApi";

const Home = () => {
  //TODO: parent container should be flex and children full width
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState(null);

  const searchPosts = (searchParams) => {
    setIsLoading(true);
    const process = async () => {
      const results = await queryPosts(searchParams);
      setPosts(results);
      setIsLoading(false);
    };

    process();
  };

  return (
    <div className="w-full max-w-4xl h-full min-h-screen mx-auto text-center space-y-10">
      <SearchForm onSubmit={searchPosts} />

      {isLoading ? (
        <Spinner className="pt-0 xs:pt-32" />
      ) : (
        <Section className="flex flex-col items-start justify-start gap-2 bg-transparent border-none p-0">
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
