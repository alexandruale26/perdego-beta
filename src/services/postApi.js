import supabase from "./supabase";

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

export default createPost;
