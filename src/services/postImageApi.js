import supabase from "./supabase";
import { imageUniqueName } from "../utils/helpers";

const uploadImage = async (image) => {
  const imageName = imageUniqueName(image.type);

  const { data, error } = await supabase.storage.from("posts-images").upload(`public/${imageName}`, image, {
    cacheControl: "3600",
    upsert: false,
  });

  return data.path;
};

const getImageUrl = (name) => {
  const { data } = supabase.storage.from("posts-images").getPublicUrl(`public/${name}`);
  console.log(data);

  return data.publicUrl;
};

const deleteImage = async (path) => {
  const { data, error } = await supabase.storage.from("posts-images").remove([path]);
  console.log("deleted");
};

export { uploadImage, getImageUrl, deleteImage };
