import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import PostLink from "../features/home/PostLink";
import SearchForm from "../features/home/SearchForm";
import Section from "../shared/Section";
import LayoutSwitcher from "../features/home/LayoutSwitcher";
import Spinner from "../shared/Spinner";
import { queryPosts, firstRenderPosts } from "../services/searchApi";
import {
  getAllSearchParamsAsObject,
  showSearchResultsTitle,
  isLayoutChangeAllowed,
  saveToLocalStorage,
  getGridModeFromStorage,
  GRID_STORAGE_NAME,
} from "../features/home/helpers";

// TODO: see if can separate some objects
const defaultSearchParams = {
  search: "",
  postType: "",
  location: "",
  category: "",
};

const Home = () => {
  //TODO: parent container should be flex and children full width
  const [posts, setPosts] = useState([]);
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
      const data = hasSearchParams ? await queryPosts(queryParams) : await firstRenderPosts();

      setPosts(data);
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

  return (
    <div className="w-full max-w-4xl h-full min-h-screen mx-auto text-center space-y-10">
      <SearchForm onSubmit={getSearchValues} searchParams={searchedParams} />

      {isLoading ? (
        <Spinner className="pt-0 xs:pt-32" />
      ) : (
        <Section className="flex flex-col items-start justify-start gap-4 bg-transparent border-none p-0 shadow-none">
          <div className="w-full flex items-start gap-1 pl-1 select-none">
            <h2 className="w-full my-auto text-start text-xl xs:text-2xl font-medium text-stone-700">
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
  );
};

export default Home;
