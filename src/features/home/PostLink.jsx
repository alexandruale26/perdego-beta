import { Link } from "react-router-dom";
import { formatPostDate } from "../../utils/helpers";
import { getImageUrl } from "../../services/postApi";

const linkBaseStyle = "xs:h-[150px] xs:flex-row";
const linkGridStyle = "xs:h-[320px]";
const imageBaseStyle = "xs:w-[170px] sm:w-[230px] h-[200px] xs:h-full";
const imageGridStyle = "h-[200px] xs:h-[150px]";

const PostLink = ({ post, searchParams, gridMode = false }) => {
  const image = getImageUrl(post.image);

  return (
    <Link
      to={`${post.postId}`}
      state={{ searchParams }}
      className={`w-full h-[340px] flex flex-col items-center justify-between gap-4 p-2 bg-white shadow-sm rounded-md text-start focus-visible:outline-none focus-visible:border-2 focus-visible:border-grey-700 overflow-hidden transition-all ${
        gridMode ? linkGridStyle : linkBaseStyle
      }`}
    >
      <img
        src={image}
        alt="object"
        className={`w-full shrink-0 object-cover rounded-sm ${gridMode ? imageGridStyle : imageBaseStyle}`}
      />
      <div className="h-full w-full flex flex-col items-start justify-between py-1 gap-2">
        <h3
          className={`${
            gridMode ? "text-base" : "sm:text-lg"
          } text-grey-800 hover:text-white hover:bg-grey-800 flex break-words word-break`}
        >
          {post.title}
        </h3>

        <div className="w-full flex flex-col items-start gap-1">
          <p className={`text-xs ${gridMode ? "" : "sm:text-sm"} font-medium text-grey-700`}>
            {post.postType} - {post.category}
          </p>

          <div className="w-full flex items-center justify-between">
            <p className={`text-xs ${gridMode ? "" : "sm:text-sm"} font-light text-grey-600`}>
              {post.location} - {formatPostDate(post.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostLink;
