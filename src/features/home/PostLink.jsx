import { Link } from "react-router-dom";
// import FavoriteButton from "../../shared/FavoriteButton";
import { formatPostDate } from "../../utils/helpers";
import { getImageUrl } from "../../services/postApi";

const PostLink = ({ post, searchParams }) => {
  const image = getImageUrl(post.image);

  return (
    <Link
      to={`${post.postId}`}
      state={{ searchParams }}
      className="w-full h-[360px] xs:h-[170px] flex flex-col xs:flex-row items-center justify-between gap-4 mx-auto p-2 bg-white shadow-sm rounded-md text-start focus-visible:outline-none focus-visible:border-2 focus-visible:border-stone-700 overflow-hidden"
    >
      <img
        src={image}
        alt="object"
        className="w-full shrink-0 xs:w-[170px] sm:w-[230px] h-[200px] xs:h-full object-cover rounded-sm transition-all"
      />
      <div className="h-full w-full flex flex-col items-start justify-between py-1 gap-2">
        <h3 className="sm:text-lg text-stone-800 hover:text-white hover:bg-stone-800 flex break-words word-break">
          {post.title}
        </h3>

        <div className=" w-full flex flex-col items-start gap-1">
          <p className="text-xs sm:text-sm font-medium text-stone-700">
            {post.postType} - {post.category}
          </p>

          <div className="w-full flex items-center justify-between">
            <p className="text-xs sm:text-sm font-light text-stone-600">
              {post.location} - {formatPostDate(post.createdAt)}
            </p>
            {/* <FavoriteButton className="w-6 h-6" /> */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostLink;
