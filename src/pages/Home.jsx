import PostLink from "../features/home/PostLink";

const post = {
  id: 16,
  createdAt: "2023-12-28T10:40:48.038939+00:00",
  name: "Catalin",
  phone: "0753555287",
  title: "Pierdut bichon alb zona garii bacau piata centrala",
  description:
    "Pierdut bichon alb in zona garii. Avea o zgarda de culoare rosie si raspunde la numele de Pufi. Ofer recompensa.",
  location: "Bacău",
  category: "Animale de companie",
  image: "https://asmcrxdpkgfqurghvgkv.supabase.co/storage/v1/object/public/posts-images/45157879-60397090.png",
  postId: "dba9034b-80c3-42d0-b662-9e7cb8a79d85",
  postType: "lost",
};

const Home = () => {
  return (
    <div className="h-screen mx-auto text-center">
      <p>HOME PAGE</p>
      <PostLink post={post} />
    </div>
  );
};

export default Home;
