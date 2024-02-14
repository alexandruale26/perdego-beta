import { useState, useEffect } from "react";
import PageContainer from "../shared/PageContainer";
import { schema } from "../features/postForm/data";
import Confirmation from "../shared/Confirmation";
import Spinner from "../shared/Spinner";
import { useUserSessionContext } from "../ui/UserSession";
import postEditProcess from "../features/editPostForm/postEditProcess";
import { useLocation } from "react-router-dom";
import FormContent from "../features/postForm/FormContent";
import Error from "../shared/Error";
import { getPost, getImageUrl } from "../services/postApi";
import { handleApiAction } from "../services/apiHelpers/helpers";

const EditPostForm = () => {
  const [isPostModified, setIsPostModified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPostDataFetched, setIsPostDataFetched] = useState(false);
  const [defaultValues, setDefaultValues] = useState({});
  const { user } = useUserSessionContext();
  const { pathname, state } = useLocation();

  useEffect(() => {
    if (state?.postId === null) return;

    const process = async () => {
      setIsPostDataFetched(false);

      const response = await getPost(state?.postId);

      if (response.status !== "ok") {
        return setIsPostDataFetched(true);
      }

      const imageUrl = getImageUrl(response.data.image);

      setDefaultValues({
        title: response.data.title,
        post_type: response.data.post_type,
        category: response.data.category,
        description: response.data.description,
        location: response.data.location,
        name: user.name,
        phone: user.phone,
        imageName: response.data.image, // old image to be deleted if necesssary
        imageUrl,
      });

      setIsPostDataFetched(true);
    };

    process();
  }, [state?.postId, user.name, user.phone]);

  const handlePostCreate = (values) => {
    handleApiAction(() =>
      postEditProcess(values, state?.postId, defaultValues.imageName, setIsLoading, setIsPostModified)
    );
  };

  // if user === null, user's data will be null at default values
  // form will re-render when user will not be null
  const isPostFetchCompleted = isPostDataFetched && Object.keys(defaultValues).length === 0;
  if (user === null) return;
  if ((pathname === "/modifica-anuntul" && state?.postId === null) || isPostFetchCompleted) {
    return (
      <Error
        errorMessage="Ne pare rǎu, dar a apǎrut o problemǎ."
        buttonMessage="Du-mǎ inapoi"
        to="/administreaza-anunturile"
      />
    );
  }

  const formData = { schema, defaultValues };

  return (
    <PageContainer className={isPostModified ? "flex items-center justify-center" : ""}>
      {isPostModified && <Confirmation message="Anunțul tǎu a fost modificat cu succes." />}

      {isPostModified === false && (
        <div className="max-w-2xl mx-auto space-y-8">
          {(isLoading || isPostDataFetched === false) && (
            <Spinner className="fixed z-20 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 backdrop-blur-[4px]" />
          )}
          <h1 className="text-2xl font-medium text-grey-700 leading-none select-none">Modificǎ anunțul</h1>
          {isPostDataFetched && (
            <FormContent formData={formData} handleOnSubmit={handlePostCreate} submitButtonTitle="Modificǎ anunțul" />
          )}
        </div>
      )}
    </PageContainer>
  );
};

export default EditPostForm;
