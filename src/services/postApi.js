import supabase from "./supabase";

import { imageUniqueName } from "../utils/helpers";

const createPost = async (post) => {
  const { data, error } = await supabase
    .from("posts")
    .insert([
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
    ])
    .select();

  console.log(data);
  console.log(error);
};

const getPost = async (postId) => {
  const { data, error } = await supabase.from("posts").select().eq("postId", postId).single();
  return data;
};

const uploadImage = async (image) => {
  const imageName = imageUniqueName(image.type);

  // TODO: add try-catch
  const { data, error } = await supabase.storage.from("posts-images").upload(imageName, image, {
    cacheControl: "3600",
    upsert: false,
  });

  return data.path;
};

const getImageUrl = (imageName) => {
  const { data } = supabase.storage.from("posts-images").getPublicUrl(imageName);

  return data.publicUrl;
};

const deleteImage = async (path) => {
  const { data, error } = await supabase.storage.from("posts-images").remove([path]);
  console.log("deleted");
};

export { createPost, getPost, uploadImage, getImageUrl };
