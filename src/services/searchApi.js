import supabase from "./supabase";
import { convertToMatchSearch } from "./helpers";

const queryPosts = async (searchParams) => {
  const filterBySearch = !!searchParams.search;
  const filterByCategory = !!searchParams.category;
  const filterByLocation = !!searchParams.location;

  let query = supabase
    .from("posts")
    .select("postId, title, location, createdAt, category, image, postType")
    .eq("postType", searchParams.postType);

  if (filterByCategory) {
    query = query.eq("category", searchParams.category);
  }
  if (filterByLocation) {
    query = query.eq("location", searchParams.location);
  }
  if (filterBySearch) {
    query = query.ilikeAnyOf("title", convertToMatchSearch(searchParams.search));
  }

  const { data, error } = await query;

  // console.log(data);
  // console.log(error);

  return data;
};

//TODO: 10 results per page. Could use range() to get any the results

export default queryPosts;
