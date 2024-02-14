import supabase from "./supabase";
import { convertToMatchSearch } from "./apiHelpers/helpers";
import { generateResponse } from "./apiHelpers/helpers";

const postsTable = "posts";

const queryPosts = async (queryData, hasSearchParams = false) => {
  let query = supabase.from(postsTable).select("id, title, location, created_at, category, image, post_type");

  if (hasSearchParams) {
    const filterBypost_type = !!queryData.post_type;
    const filterByCategory = !!queryData.category;
    const filterByLocation = !!queryData.location;
    const filterBySearch = !!queryData.search;

    if (filterBypost_type) {
      query = query.eq("post_type", queryData.post_type);
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

  query = query.order("created_at", { ascending: false });

  try {
    const { data, error, status } = await query;

    if (error || status !== 200 || data === null) throw new Error("Error fetching posts");
    return generateResponse("ok", data);
  } catch (error) {
    return generateResponse(null, null);
  }
};

//TODO: 10 results per page. Could use range() to get any number of results

export { queryPosts };
