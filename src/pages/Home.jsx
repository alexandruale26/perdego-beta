import { Link } from "react-router-dom";
import FavoriteButton from "../shared/FavoriteButton";

const post = {
  id: 15,
  createdAt: "2023-12-22T10:35:21.860431+00:00",
  name: "Claudiu",
  phone: "0753555765",
  title: "Pierdut bichon alb",
  description:
    "Pierdut bichon alb in zona garii. Avea o zgarda de culoare rosie si raspunde la numele de Pufi. Ofer recompensa.",
  location: "Bacău",
  category: "Animale de companie",
  image: "https://asmcrxdpkgfqurghvgkv.supabase.co/storage/v1/object/public/posts-images/98425263-60458317.jpeg",
  postId: "bc19f00a-c300-4f61-8d1c-b656f38b3b3d",
  postType: "lost",
};

const PostLink = ({ post }) => {
  return (
    <>
      <Link to={"post/11"} className="w-full flex items-center justify-between p-2 bg-white border rounded-md">
        <img
          src={post.image}
          alt="object"
          className="w-[216px] h-[152px] min-w-[216px] min-h-[152px] object-cover rounded-md border"
        />
        <div className="h-full w-full flex flex-col items-start">
          <div className="w-full flex items-center justify-between">
            <h3>{post.title}</h3>
            <FavoriteButton />
          </div>
          <p className="text-xs">
            {post.location} - {post.createdAt}
          </p>
        </div>
      </Link>
      <Link to={"post/11"} className="w-full flex items-center justify-between p-2 bg-white border rounded-md">
        <img
          src={post.image}
          alt="object"
          className="w-[216px] h-[152px] min-w-[216px] min-h-[152px] object-cover rounded-md border"
        />
        <div className="h-full w-full flex flex-col items-start">
          <div className="w-full flex items-center justify-between">
            <h3>{post.title}</h3>
            <FavoriteButton />
          </div>
          <p className="text-xs">
            {post.location} - {post.createdAt}
          </p>
        </div>
      </Link>
      <Link to={"post/11"} className="w-full flex items-center justify-between p-2 bg-white border rounded-md">
        <img
          src={post.image}
          alt="object"
          className="w-[216px] h-[152px] min-w-[216px] min-h-[152px] object-cover rounded-md border"
        />
        <div className="h-full w-full flex flex-col items-start">
          <div className="w-full flex items-center justify-between">
            <h3>{post.title}</h3>
            <FavoriteButton />
          </div>
          <p className="text-xs">
            {post.location} - {post.createdAt}
          </p>
        </div>
      </Link>
    </>
  );
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
