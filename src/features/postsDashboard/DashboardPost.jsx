import { useState, useEffect, useRef, Fragment } from "react";
import { DotsVerticalIcon, TrashIcon, Pencil2Icon } from "@radix-ui/react-icons";
import Button from "../../shared/button";
import LinkButton from "../../shared/LinkButton";
import PostLink from "../home/PostLink";
import ConfirmationBox from "./ConfirmationBox";
import { BARS_HEIGHT } from "../../utils/sharedData";
import { windowScroll } from "../../utils/helpers";

const iconsAnimationStyle = "transition-all hover:scale-125";

const DashboardPost = ({ post }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const parentRef = useRef(null);

  const handleOnClick = (e) => {
    e.preventDefault();
    setMenuIsOpen(!menuIsOpen);
  };

  const handleModal = (e) => {
    e.preventDefault();
    setModalIsOpen(!modalIsOpen);
    windowScroll(modalIsOpen);
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
    <Fragment key={post.id}>
      <div ref={parentRef} onClick={handleOnClick} className="relative w-full cursor-pointer select-none">
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
                onClick={handleModal}
                className={`p-1 flex items-center justify-center text-white hover:text-rose-400 ${iconsAnimationStyle}`}
              >
                <TrashIcon height="30" width="30" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {modalIsOpen && (
        <ConfirmationBox denyButtonTitle="Anuleazǎ" confirmButtonTitle="Sunt sigur" handleOnDeny={handleModal}>
          <div className="h-full flex flex-col items-center justify-between gap-8">
            <p className="px-0 text-sm xxs:text-base font-light text-grey-700 text-center">
              Ești sigur cǎ dorești sǎ ștergi anunțul{" "}
              <span className="text-grey-800 font-semibold">'{post.title}'</span>?
            </p>
            <p className="text-xs font-light text-grey-500 mr-auto">Anunțul tǎu va fi șters definitiv</p>
          </div>
        </ConfirmationBox>
      )}
    </Fragment>
  );
};

export default DashboardPost;
