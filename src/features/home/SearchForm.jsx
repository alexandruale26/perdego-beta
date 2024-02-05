import { useState, useEffect } from "react";
import SimpleInput from "../../formComponents/SimpleInput";
import ComboBox from "../../formComponents/ComboBox";
import Selector from "../../formComponents/Selector";
import SubmitButton from "../../shared/SubmitButton";
import LinkButton from "../../shared/LinkButton";
import Division from "./Division";
import { Form } from "../../formBase/FormContext";
import { FormField, FormItem } from "../../formComponents/form";
import { COUNTIES, OBJECT_CATEGORY, POSTTYPE } from "../../utils/sharedData";
import { filterData, setDefaultValue } from "../../utils/helpers";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const SearchForm = ({ onSubmit, searchParams, hasSearchParams }) => {
  const [search, setSearch] = useState("");
  const [postType, setPostType] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    setSearch(setDefaultValue(searchParams.search));
    setPostType(setDefaultValue(searchParams.postType));
    setLocation(setDefaultValue(searchParams.location));
    setCategory(setDefaultValue(searchParams.category));
  }, [searchParams]);

  const handleSearchOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleSubmit = (values) => {
    onSubmit(values);
  };

  return (
    <Form
      schema={{}}
      defaultValues={{}}
      onSubmit={handleSubmit}
      className="flex flex-col w-full items-start justify-center gap-6 p-4 bg-white mx-auto rounded-md shadow-sm"
    >
      <div className="flex flex-col w-full gap-4">
        <h1 className="text-lg font-medium text-grey-800 text-start pl-1 select-none">Cautǎ un anunț</h1>
        <Division>
          <FormField
            name="search"
            render={(field) => (
              <FormItem className="max-w-full">
                <SimpleInput
                  placeholder="ex.: Cheie autoturism"
                  {...field}
                  value={search}
                  onChange={handleSearchOnChange}
                  maxLength={60}
                />
              </FormItem>
            )}
          />
          <FormField
            name="postType"
            render={(field) => (
              <FormItem className="max-w-full">
                <Selector
                  values={POSTTYPE}
                  defaultValue={postType}
                  exportValue={(value) => setPostType(value)}
                  {...field}
                />
              </FormItem>
            )}
          />
        </Division>

        <Division>
          <FormField
            name="location"
            render={(field) => (
              <FormItem className="max-w-full">
                <ComboBox
                  placeholder="Toatǎ țara"
                  filter={filterData}
                  data={COUNTIES}
                  defaultValue={location}
                  exportValue={(value) => setLocation(value)}
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
                  filter={filterData}
                  data={OBJECT_CATEGORY}
                  defaultValue={category}
                  exportValue={(value) => setCategory(value)}
                  render={(item) => <p className="text-left">{item}</p>}
                  {...field}
                />
              </FormItem>
            )}
          />
        </Division>
      </div>

      <Division className="w-full gap-4 xsm:gap-8 items-start xsm:items-center">
        <SubmitButton className="h-9 w-full xsm:w-56 flex items-center justify-center gap-2" type="submit">
          Cǎutare
          <MagnifyingGlassIcon className="w-6 h-6" />
        </SubmitButton>

        {hasSearchParams && (
          <LinkButton
            to={"/"}
            className="text-sm xs:text-base border-b-[1px] border-black hover:border-primary focus-visible:text-lg"
          >
            Șterge filtrele
          </LinkButton>
        )}
      </Division>
    </Form>
  );
};

export default SearchForm;
