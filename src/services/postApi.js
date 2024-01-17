import supabase from "./supabase";
import { imageRandomName } from "../utils/helpers";

//TODO: manage all errors from server

const imageExtension = "png";
const postImagePath = "posts-images";

const createPost = async (post) => {
  try {
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

    if (error) throw new Error("A apǎrut o problemǎ. Te rugǎm incearcǎ din nou :(");

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const getPost = async (postId) => {
  //TODO: fix errors if any
  const { data, error } = await supabase.from("posts").select().eq("postId", postId).single();
  return data;
};

const uploadImage = async (image) => {
  if (image === null) return null;

  const imageUniqueName = imageRandomName();
  const imageFullName = `${imageUniqueName}.${imageExtension}`;

  try {
    const { data, error } = await supabase.storage.from(postImagePath).upload(imageFullName, image, {
      cacheControl: "3600",
      upsert: false,
    });

    if (error) throw new Error("Failed to upload image");
    return data.path;
  } catch (error) {
    console.log(error);
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
