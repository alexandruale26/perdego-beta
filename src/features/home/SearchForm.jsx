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
  postType: "found",
};

const formData = {
  schema: {},
  defaultValues,
};

const postType = [
  ["found", "Gǎsite"],
  ["lost", "Pierdute"],
];

const SearchForm = ({ onSubmit }) => {
  const handleSubmit = (values) => onSubmit(values);

  return (
    <Form
      {...formData}
      onSubmit={handleSubmit}
      className="flex flex-col w-full items-start justify-center gap-6 p-4 bg-white mx-auto rounded-md border"
    >
      <div className="flex flex-col w-full gap-4">
        <h1 className="text-lg text-stone-700 text-start pl-1">Ce anume cauți?</h1>
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
            name="postType"
            render={(field) => (
              <FormItem className="max-w-full">
                <Selector values={postType} defaultValue={defaultValues.postType} {...field} />
              </FormItem>
            )}
          />
        </SearchFormDivision>
        <SearchFormDivision>
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
          <FormField
            name="category"
            render={(field) => (
              <FormItem className="max-w-full">
                <ComboBox
                  placeholder="Toate categoriile"
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
