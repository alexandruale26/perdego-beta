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

const EditPostForm = () => {
  const [isPostCreated, setIsPostCreated] = useState(false);
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
        postType: response.data.postType,
        category: response.data.category,
        description: response.data.description,
        location: response.data.location,
        name: user.name,
        phone: user.phone,
        imageUrl,
      });

      setIsPostDataFetched(true);
    };

    process();
  }, [state?.postId, user.name, user.phone]);

  const handlePostCreate = (values) => {
    console.log(values);

    setIsLoading(true);
    postEditProcess(values, user, state?.postId, setIsLoading, setIsPostCreated);
  };

  // if user === null, user's data will be null at default values
  // form will re-render when user will not be null
  const isPostFetchCompleted = isPostDataFetched && Object.keys(defaultValues).length === 0;
  if (user === null) return;
  if ((pathname === "/edit" && state?.postId === null) || isPostFetchCompleted) {
    return <Error errorMessage="Ne pare rǎu, dar a apǎrut o problemǎ." buttonMessage="Du-mǎ inapoi" to="/manage" />;
  }

  const formData = { schema, defaultValues };

  return (
    <PageContainer className={isPostCreated ? "flex items-center justify-center" : ""}>
      {isPostCreated && <Confirmation message="Felicitǎri! Anunțul tǎu a fost modificat cu succes." />}

      {isPostCreated === false && (
        <div className="max-w-2xl mx-auto space-y-8">
          {(isLoading || isPostDataFetched === false) && (
            <Spinner className="fixed z-20 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 backdrop-blur-[4px]" />
          )}
          <h1 className="text-xl xs:text-3xl font-medium select-none">Modificǎ anunțul tǎu</h1>
          {isPostDataFetched && (
            <FormContent formData={formData} handleOnSubmit={handlePostCreate} submitButtonTitle="Modificǎ anunțul" />
          )}
        </div>
      )}
    </PageContainer>
  );
};

export default EditPostForm;
