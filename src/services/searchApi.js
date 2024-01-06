import supabase from "./supabase";
import { convertToMatchSearch } from "./helpers";

const queryPosts = async (queryData) => {
  console.log("api search", queryData);

  const filterBySearch = !!queryData.search;
  const filterByCategory = !!queryData.category;
  const filterByLocation = !!queryData.location;

  let query = supabase
    .from("posts")
    .select("postId, title, location, createdAt, category, image, postType")
    .eq("postType", queryData.postType);

  if (filterByCategory) {
    query = query.eq("category", queryData.category);
  }
  if (filterByLocation) {
    query = query.eq("location", queryData.location);
  }
  if (filterBySearch) {
    query = query.ilikeAnyOf("title", convertToMatchSearch(queryData.search));
  }

  const { data, error } = await query;

  // console.log(data);
  // console.log(error);

  return data;
};

//TODO: 10 results per page. Could use range() to get any the results

export default queryPosts;
