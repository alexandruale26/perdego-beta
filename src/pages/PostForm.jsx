import { useState } from "react";
import ImageSelect from "../formComponents/ImageSelect";
import ValidationInput from "../formComponents/ValidationInput";
import Textarea from "../formComponents/Textarea";
import { Form } from "../formBase/FormContext";
import { FormField, FormItem, FormMessage, FormLabel } from "../formComponents/form";
import ComboBox from "../formComponents/ComboBox";
import Selector from "../formComponents/Selector";
import PageContainer from "../shared/PageContainer";
import { COUNTIES, OBJECT_CATEGORY, POSTTYPE } from "../utils/sharedData";
import { schema } from "../features/postForm/data";
import { handleImageUpload } from "../features/postForm/formHelpers";
import { filterData, wordToUppercase } from "../utils/helpers";
import { createPost, deleteImage } from "../services/postApi";
import SubmitButton from "../shared/SubmitButton";
import { warningToast } from "../shared/Toasts";
import Confirmation from "../shared/Confirmation";
import Spinner from "../shared/Spinner";

// TODO: separate process() from all files

const PostForm = ({ user }) => {
  const [isPostCreated, setIsPostCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues = user === null ? {} : { name: user.name, phone: user.phone };
  const formData = { schema, defaultValues };

  const handleOnSubmit = (values) => {
    setIsLoading(true);

    const process = async () => {
      const imageUploaderResponse = await handleImageUpload(values.image);

      if (imageUploaderResponse.status !== "ok") {
        setIsLoading(false);
        return warningToast(imageUploaderResponse.message);
      }

      const sanitizedFormValues = {
        title: wordToUppercase(values.title, true),
        description: wordToUppercase(values.description),
      };

      const newData = { ...values, ...sanitizedFormValues, image: imageUploaderResponse.data };
      const postResponse = await createPost(newData);

      if (postResponse.status !== "ok") {
        await deleteImage(imageUploaderResponse.data); // no need to use response.status
        setIsLoading(false);

        return warningToast(postResponse.message);
      }
      setIsPostCreated(true);
      setIsLoading(false);
    };

    process();
  };

  return (
    <PageContainer className={isPostCreated ? "flex items-center justify-center" : ""}>
      {isPostCreated && <Confirmation message="Felicitǎri! Anunțul tǎu a fost postat cu succes." />}

      {isPostCreated === false && (
        <div className="max-w-lg mx-auto space-y-8">
          {isLoading && (
            <Spinner className="fixed z-20 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 backdrop-blur-[4px]" />
          )}

          <h1 className="text-xl xs:text-3xl font-medium">Ce anume ai gǎsit | pierdut...?</h1>
          <Form {...formData} onSubmit={handleOnSubmit} className="space-y-5 w-full">
            <FormField
              name="title"
              render={(field) => (
                <FormItem>
                  <FormLabel>Titlul anunțului</FormLabel>
                  <ValidationInput placeholder="ex.: Portofel de piele de culoare negru" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="image"
              render={(field) => (
                <FormItem>
                  <FormLabel>
                    Imaginea anunțului<span className="font-light"> (Opțional)</span>
                  </FormLabel>
                  <ImageSelect {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              render={(field) => (
                <FormItem>
                  <FormLabel>Descriere</FormLabel>
                  <Textarea placeholder="Adaugǎ o descriere detaliatǎ" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="postType"
              render={(field) => (
                <FormItem>
                  <FormLabel>Tipul anunțului</FormLabel>
                  <Selector values={POSTTYPE} defaultValue="" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="category"
              render={(field) => (
                <FormItem>
                  <FormLabel>Categorie</FormLabel>
                  <ComboBox
                    placeholder="Cautǎ dupǎ categorie"
                    defaultValue={defaultValues.category}
                    filter={filterData}
                    data={OBJECT_CATEGORY}
                    render={(item) => <p className="text-left">{item}</p>}
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="location"
              render={(field) => (
                <FormItem>
                  <FormLabel>Județ | Sector</FormLabel>
                  <ComboBox
                    placeholder="Cautǎ dupǎ județ sau sector"
                    defaultValue={defaultValues.county}
                    filter={filterData}
                    data={COUNTIES}
                    render={(item) => <p className="text-left">{item}</p>}
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="name"
              render={(field) => (
                <FormItem>
                  <FormLabel>Nume</FormLabel>
                  <ValidationInput disabled {...field} />
                </FormItem>
              )}
            />
            <FormField
              name="phone"
              render={(field) => (
                <FormItem>
                  <FormLabel>Telefon</FormLabel>
                  <ValidationInput disabled {...field} />
                </FormItem>
              )}
            />
            <div className="w-full">
              <SubmitButton className="h-12 w-full mt-10">Publicǎ anunțul</SubmitButton>
            </div>
          </Form>
        </div>
      )}
    </PageContainer>
  );
};

export default PostForm;
