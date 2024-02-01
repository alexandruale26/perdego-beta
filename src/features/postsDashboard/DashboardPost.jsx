import { useState, useEffect, useRef } from "react";
import Button from "../../shared/button";
import LinkButton from "../../shared/LinkButton";
import PostLink from "../home/PostLink";
import { DotsVerticalIcon, TrashIcon, Pencil2Icon } from "@radix-ui/react-icons";

const iconsAnimationStyle = "transition-all hover:scale-125";

const DashboardPost = ({ post }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const parentRef = useRef(null);

  const handleOnClick = (e) => {
    e.preventDefault();
    setMenuIsOpen(!menuIsOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setMenuIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div key={post.id} ref={parentRef} onClick={handleOnClick} className="relative w-full cursor-pointer select-none">
      <PostLink post={post} backToUserPosts={true} className="xs:pr-14" />

      <div
        className={`absolute min-h-[54px] min-w-[54px] flex flex-col items-center justify-center rounded-full p-2 top-3 xs:top-1 right-3 xs:right-2 transition-all ${
          menuIsOpen ? "text-white bg-grey-800/80 xs:bg-grey-800" : "text-black bg-white/60 hover:bg-grey-300"
        }`}
      >
        <DotsVerticalIcon
          height={menuIsOpen ? 38 : 20}
          width={menuIsOpen ? 38 : 20}
          className={`transition-all ${menuIsOpen ? "hover:scale-125 hover:text-primary p-2 rotate-90" : ""}`}
        />

        {menuIsOpen && (
          <div className="flex flex-col gap-2">
            <LinkButton
              className={`p-1 flex items-center justify-center text-white hover:text-primary ${iconsAnimationStyle}`}
            >
              <Pencil2Icon height="24" width="24" />
            </LinkButton>
            <Button
              className={`p-1 flex items-center justify-center text-white hover:text-rose-400 ${iconsAnimationStyle}`}
            >
              <TrashIcon height="30" width="30" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPost;
