import { Link } from "react-router-dom";
import FavoriteButton from "../../shared/FavoriteButton";
import { convertPostTypeToRou, formatPostDate } from "../../utils/helpers";

const PostLink = ({ post }) => {
  return (
    <div className="flex flex-col gap-2">
      <Link
        to={"post/11"}
        className="w-full max-w-4xl h-[170px] flex items-center justify-between mx-auto p-2 bg-white border rounded-md text-start overflow-hidden"
      >
        <img
          src={post.image}
          alt="object"
          className="w-[210px] sm:w-[250px] h-full object-cover rounded-sm transition-all"
        />
        <div className="h-full w-full flex flex-col items-start justify-between pl-4">
          <div className="w-full flex items-start justify-between">
            <h3 className="font-light text-sm sm:text-xl text-stone-900 flex break-words word-break">{post.title}</h3>
            <FavoriteButton className="w-6 h-6" />
          </div>

          <div className="flex flex-col items-start gap-2">
            <p className="text-sm font-normal sm:font-medium text-stone-800">
              {convertPostTypeToRou(post.postType)} - {post.category}
            </p>

            <p className="text-xs font-light text-stone-600">
              {post.location} - {formatPostDate(post.createdAt)}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostLink;
