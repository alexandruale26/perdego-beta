import SimpleInput from "../../formComponents/SimpleInput";
import Selector from "../../formComponents/Selector";
import SubmitButton from "../../shared/SubmitButton";
import Division from "./Division";
import { Form } from "../../formBase/FormContext";
import { FormField, FormItem } from "../../formComponents/form";
import { POSTTYPE } from "../../sharedData";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useNavigate, useSearchParams } from "react-router-dom";

// TODO: maybe should add "Toata tara" && "Toate categoriile" as values.

// TODO: not sure if it fits for now. Not to be removed yet.

const MinifiedSearchForm = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = (values) => {
    console.log(values);
    navigate("/");
    setSearchParams(values);
  };

  return (
    <Form
      {...{ schema: {}, defaultValues: {} }}
      onSubmit={handleSubmit}
      className="flex flex-col w-full items-start justify-center py-4 md:py-6 px-4 bg-white mx-auto rounded-md shadow-sm"
    >
      <div className="flex flex-col md:flex-row w-full gap-6 md:gap-4">
        <Division>
          <FormField
            name="search"
            render={(field) => (
              <FormItem className="max-w-full">
                <SimpleInput placeholder="Cautǎ altceva..." {...field} />
              </FormItem>
            )}
          />
          <FormField
            name="postType"
            render={(field) => (
              <FormItem className="max-w-full">
                <Selector values={POSTTYPE} defaultValue="" {...field} />
              </FormItem>
            )}
          />
        </Division>

        <SubmitButton className="h-9 w-full xsm:max-w-[200px] flex items-center justify-center gap-2" type="submit">
          Cǎutare
          <MagnifyingGlassIcon className="w-6 h-6" />
        </SubmitButton>
      </div>
    </Form>
  );
};

export default MinifiedSearchForm;
