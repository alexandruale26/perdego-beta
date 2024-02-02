import supabase from "./supabase";
import { imageRandomName } from "../utils/helpers";
import { generateResponse } from "./helpers";
import { imageExtension } from "../features/postForm/data";
import { GENERIC_ERROR_MESSAGE } from "./constants";

const postImagePath = "posts-images";
const postsPath = "posts";

const createPost = async (post) => {
  try {
    const { status, error } = await supabase.from(postsPath).insert([
      {
        title: post.title,
        description: post.description,
        location: post.location,
        category: post.category,
        image: post.image,
        postType: post.postType,
      },
    ]);

    if (error || status !== 201) throw new Error(GENERIC_ERROR_MESSAGE);
    console.log("created post - ok");
    return generateResponse("ok", null);
  } catch (error) {
    console.log(error);
    return generateResponse(null, null, error.message);
  }
};

const getPost = async (id) => {
  try {
    const { data, error, status } = await supabase.from(postsPath).select().eq("id", id).single();

    if (error || status !== 200 || data === null) throw new Error("Could not find post");
    return generateResponse("ok", data);
  } catch (error) {
    console.log(error);
    return generateResponse(null, null);
  }
};

const getPostsByUserId = async (userId) => {
  try {
    const { data, error, status } = await supabase
      .from(postsPath)
      .select("id, title, location, createdAt, category, image, postType")
      .order("createdAt", { ascending: false })
      .eq("userId", userId);

    if (error || status !== 200 || data === null) throw new Error("Error fetching posts");
    return generateResponse("ok", data);
  } catch (error) {
    console.log(error);
    return generateResponse(null, null);
  }
};

const deletePost = async (postId) => {
  try {
    const { error, status } = await supabase.rpc("delete_image_at_deleting_post", { post_id: postId });
    if (error || status !== 204) throw new Error(GENERIC_ERROR_MESSAGE);
    console.log(`post deleted: ${postId}`, status === 204);
    return generateResponse("ok", null);
  } catch (error) {
    console.log(error.message);
    return generateResponse(null, null, error.message);
  }
};

const uploadImage = async (image) => {
  if (image === null) return generateResponse("ok", null);

  const imageUniqueName = imageRandomName();
  const imageFullName = `${imageUniqueName}.${imageExtension}`;

  try {
    const { data, error } = await supabase.storage.from(postImagePath).upload(imageFullName, image, {
      cacheControl: "3600",
      upsert: false,
    });

    if (error || data === null) throw new Error(GENERIC_ERROR_MESSAGE);

    return generateResponse("ok", data.path);
  } catch (error) {
    console.log(error);
    return generateResponse(null, null, error.message);
  }
};

const getImageUrl = (imageName) => {
  const { data } = supabase.storage.from(postImagePath).getPublicUrl(imageName);

  if (data.publicUrl.endsWith(`${postImagePath}/null`)) return null;
  return data.publicUrl;
};

const deleteImage = async (imageName) => {
  console.log("deleted", imageName);
  try {
    const { data, error } = await supabase.storage.from(postImagePath).remove([imageName]);

    // user shouldn't know if the image cannot be deleted
    // an Edge function will clear any leftovers once a month
    if (error) throw new Error("Error deleting image");
    return generateResponse("ok", data);
  } catch (error) {
    console.log(error);
    return generateResponse(null, null);
  }
};

export { createPost, getPost, deletePost, uploadImage, getImageUrl, deleteImage, getPostsByUserId };
