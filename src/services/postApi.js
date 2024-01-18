import supabase from "./supabase";
import { imageRandomName } from "../utils/helpers";
import { generateResponse } from "./helpers";
import { imageExtension } from "../features/postForm/data";

const postImagePath = "posts-images";

const createPost = async (post) => {
  try {
    const { status, error } = await supabase.from("posts").insert([
      {
        name: post.name,
        phone: post.phone,
        title: post.title,
        description: post.description,
        location: post.location,
        category: post.category,
        image: post.image,
        postType: post.postType,
      },
    ]);

    if (error || status !== 201) throw new Error("Error creating post");
    console.log("created - ok");
    return generateResponse("ok", null);
  } catch (error) {
    console.log(error);
    return generateResponse(null, null);
  }
};

const getPost = async (postId) => {
  try {
    const { data, error, status } = await supabase.from("posts").select().eq("postId", postId).single();

    if (error || status !== 200 || data === null) throw new Error("Could not find post");
    return generateResponse("ok", data);
  } catch (error) {
    console.log(error);
    return generateResponse(null, null);
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

    if (error || data === null) throw new Error("Failed to upload image");
    return generateResponse("ok", data.path);
  } catch (error) {
    console.log(error);
    return generateResponse(null, null);
  }
};

const getImageUrl = (imageName) => {
  const { data } = supabase.storage.from(postImagePath).getPublicUrl(imageName);

  if (data.publicUrl.endsWith(`${postImagePath}/null`)) return null;
  return data.publicUrl;
};

// const deleteImage = async (path) => {
//   const { data, error } = await supabase.storage.from(postImagePath).remove([path]);
//   console.log("deleted");
// };

export { createPost, getPost, uploadImage, getImageUrl };
