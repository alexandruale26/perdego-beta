import supabase from "./supabase";
import { convertToMatchSearch } from "./helpers";

const queryPosts = async (queryData, hasSearchParams = false) => {
  let query = supabase.from("posts").select("postId, title, location, createdAt, category, image, postType");

  if (hasSearchParams) {
    const filterByPostType = !!queryData.postType;
    const filterByCategory = !!queryData.category;
    const filterByLocation = !!queryData.location;
    const filterBySearch = !!queryData.search;

    if (filterByPostType) {
      query = query.eq("postType", queryData.postType);
    }
    if (filterByCategory) {
      query = query.eq("category", queryData.category);
    }
    if (filterByLocation) {
      query = query.eq("location", queryData.location);
    }
    if (filterBySearch) {
      query = query.ilikeAnyOf("title", convertToMatchSearch(queryData.search));
    }
  }

  query = query.order("createdAt", { ascending: false });

  const { data, error } = await query;

  // console.log(data);
  // console.log(error);

  return data;
};

//TODO: 10 results per page. Could use range() to get any number of results

export { queryPosts };
