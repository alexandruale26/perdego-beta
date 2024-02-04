import { useState } from "react";
import PageContainer from "../shared/PageContainer";
import { schema } from "../features/postForm/data";
import Confirmation from "../shared/Confirmation";
import Spinner from "../shared/Spinner";
import { useUserSessionContext } from "../ui/UserSession";
import postFormProcess from "../features/postForm/postFormProcess";
import FormContent from "../features/postForm/FormContent";

const PostForm = () => {
  const [isPostCreated, setIsPostCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserSessionContext();

  const defaultValues = user === null ? {} : { name: user.name, phone: user.phone, location: user.location };
  const formData = { schema, defaultValues };

  const handlePostCreate = (values) => {
    setIsLoading(true);
    postFormProcess(values, setIsLoading, setIsPostCreated);
  };

  // if user === null, user's data will be null at default values
  // form will re-render when user will not be null
  if (user === null) return;

  return (
    <PageContainer className={isPostCreated ? "flex items-center justify-center" : ""}>
      {isPostCreated && <Confirmation message="Felicitǎri! Anunțul tǎu a fost postat cu succes." />}

      {isPostCreated === false && (
        <div className="max-w-2xl mx-auto space-y-8">
          {isLoading && (
            <Spinner className="fixed z-20 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 backdrop-blur-[4px]" />
          )}
          <h1 className="text-xl xs:text-3xl font-medium select-none">Ai pierdut sau ai gǎsit un obiect?</h1>
          <FormContent formData={formData} handleOnSubmit={handlePostCreate} />
        </div>
      )}
    </PageContainer>
  );
};

export default PostForm;
