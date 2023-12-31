import PostLink from "../features/home/PostLink";
import SearchForm from "../features/home/SearchForm";

const post = {
  id: 33,
  createdAt: "2023-12-27T10:40:48.038939+00:00",
  name: "Carmen",
  phone: "0753555287",
  title: "Pierdut bichon alb zona garii bacau piata centrala",
  description:
    "Pierdut bichon alb in zona garii. Avea o zgarda de culoare rosie si raspunde la numele de Pufi. Ofer recompensa.",
  location: "Bacău",
  category: "Animale de companie",
  image: "https://asmcrxdpkgfqurghvgkv.supabase.co/storage/v1/object/public/posts-images/35383886-82902299.png",
  postId: "8a53b447-6c38-4ffb-931f-a68c80422617",
  postType: "lost",
};

const Home = () => {
  //TODO: parent container should be flex and children full width
  return (
    <div className="h-screen mx-auto text-center space-y-10">
      <SearchForm />
      <PostLink post={post} />
    </div>
  );
};

export default Home;
