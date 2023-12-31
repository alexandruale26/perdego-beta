import SimpleInput from "../../formComponents/SimpleInput";
import ComboBox from "../../formComponents/ComboBox";
import Selector from "../../formComponents/Selector";
import SubmitButton from "../../shared/SubmitButton";
import { Form } from "../../formBase/FormContext";
import { FormField, FormItem } from "../../formComponents/form";
import { COUNTIES, OBJECT_CATEGORY } from "../../sharedData";
import { filterData } from "../../utils/helpers";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const SearchFormDivision = ({ children }) => {
  return <div className="flex flex-col xsm:flex-row w-full gap-4">{children}</div>;
};

const defaultValues = {
  search: "",
  location: "",
  category: "",
  postType: "all",
};

const formData = {
  schema: {},
  defaultValues,
};

const postType = [
  ["all", "Toate"],
  ["lost", "Pierdute"],
  ["found", "Gǎsite"],
];

const SearchForm = () => {
  const onSubmit = (values) => console.log("submitted search", values);

  return (
    <Form
      {...formData}
      onSubmit={onSubmit}
      className="flex flex-col w-full max-w-4xl items-start justify-center gap-6 p-4 bg-white mx-auto rounded-md border"
    >
      <div className="flex flex-col w-full gap-4">
        <h3 className="text-base text-stone-800 text-start pl-1">Ce anume cauți?</h3>

        <SearchFormDivision>
          <FormField
            name="search"
            render={(field) => (
              <FormItem className="max-w-full">
                <SimpleInput placeholder="ex.: Cheie autoturism" {...field} />
              </FormItem>
            )}
          />

          <FormField
            name="location"
            render={(field) => (
              <FormItem className="max-w-full">
                <ComboBox
                  placeholder="Toatǎ țara"
                  defaultValue={defaultValues.county}
                  filter={filterData}
                  data={COUNTIES}
                  render={(item) => <p className="text-left">{item}</p>}
                  {...field}
                />
              </FormItem>
            )}
          />
        </SearchFormDivision>

        <SearchFormDivision>
          <FormField
            name="postType"
            render={(field) => (
              <FormItem className="max-w-full">
                <Selector values={postType} defaultValue={defaultValues.postType} {...field} />
              </FormItem>
            )}
          />
          <FormField
            name="category"
            render={(field) => (
              <FormItem className="max-w-full">
                <ComboBox
                  placeholder="Cautǎ dupǎ categorie"
                  defaultValue={defaultValues.category}
                  filter={filterData}
                  data={OBJECT_CATEGORY}
                  render={(item) => <p className="text-left">{item}</p>}
                  {...field}
                />
              </FormItem>
            )}
          />
        </SearchFormDivision>
      </div>

      <div className="w-full">
        <SubmitButton className="h-9 w-full xsm:w-56 flex items-center justify-center gap-2" type="submit">
          Cǎutare
          <MagnifyingGlassIcon className="w-6 h-6" />
        </SubmitButton>
      </div>
    </Form>
  );
};

export default SearchForm;
