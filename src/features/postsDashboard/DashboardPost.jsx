import { useState, useEffect, useRef, Fragment } from "react";
import PostLink from "../home/PostLink";
import PostSettingsMenu from "./PostSettingsMenu";
import ConfirmationBox from "../../shared/ConfirmationBox";
import { deletePost } from "../../services/postApi";
import { errorToast } from "../../shared/Toasts";

const DashboardPost = ({ post }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const parentRef = useRef(null);

  const handleMenuOnClick = (e) => {
    e.preventDefault();
    setMenuIsOpen(!menuIsOpen);
  };

  const handleModal = (e) => {
    e.preventDefault();
    setModalIsOpen(!modalIsOpen);
  };

  const closeMenuAndModal = () => {
    setMenuIsOpen(false);
    setModalIsOpen(false);
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

  const handleDeletePost = () => {
    const process = async () => {
      const postResponse = await deletePost(post.id);

      if (postResponse.status !== "ok") {
        closeMenuAndModal();
        return errorToast(postResponse.message);
      }

      window.location.reload();
    };

    process();
  };

  return (
    <Fragment key={post.id}>
      <div ref={parentRef} onClick={handleMenuOnClick} className="relative w-full cursor-pointer select-none">
        <PostLink post={post} backToUserPosts={true} className="xs:pr-14" />
        <PostSettingsMenu menuIsOpen={menuIsOpen} handleModal={handleModal} postId={post.id} />
      </div>

      {modalIsOpen && (
        <ConfirmationBox handleOnDeny={handleModal} handleOnConfirm={handleDeletePost}>
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
