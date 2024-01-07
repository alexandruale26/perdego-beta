import { useState, useEffect } from "react";
import ControlledInput from "./searchForm/ControlledInput";
import ControlledSelector from "./searchForm/ControllerSelector";
import SubmitButton from "../../shared/SubmitButton";
import { COUNTIES, OBJECT_CATEGORY, POSTTYPE } from "../../sharedData";
import { filterData } from "../../utils/helpers";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const setDefaultInputValue = (searchParamValue) => (searchParamValue ? searchParamValue : "");

const SearchFormDivision = ({ children }) => {
  return <div className="flex flex-col xsm:flex-row w-full gap-4">{children}</div>;
};

const SearchForm = ({ onSubmit, formParams }) => {
  const [search, setSearch] = useState("");
  const [postType, setPostType] = useState("");

  useEffect(() => {
    setSearch(setDefaultInputValue(formParams.search));
    setPostType(setDefaultInputValue(formParams.postType));
  }, [formParams]);

  const handleSearchOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const getValueOnSelect = (value) => {
    setPostType(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const values = Object.fromEntries(data.entries());

    console.log(values);
    onSubmit(values);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full items-start justify-center gap-6 p-4 bg-white mx-auto rounded-md shadow-sm"
    >
      <div className="flex flex-col w-full gap-4">
        <h1 className="text-lg text-stone-700 text-start pl-1 select-none">Ce anume cauți ...?</h1>

        <SearchFormDivision>
          <ControlledInput
            name="search"
            id="search"
            placeholder="ex.: Cheie autoturism"
            value={search}
            onChange={handleSearchOnChange}
          />
          <ControlledSelector
            id="postType"
            name="postType"
            values={POSTTYPE}
            defaultValue={postType}
            onChange={getValueOnSelect}
          />
        </SearchFormDivision>
        <SearchFormDivision></SearchFormDivision>
      </div>

      <div className="w-full">
        <SubmitButton className="h-9 w-full xsm:w-56" type="submit">
          Cǎutare
          <MagnifyingGlassIcon className="w-6 h-6" />
        </SubmitButton>
      </div>
    </form>

    //   <div className="flex flex-col w-full gap-4">
    //     <SearchFormDivision>
    //       <FormField
    //         name="location"
    //         render={(field) => (
    //           <FormItem className="max-w-full">
    //             <ComboBox
    //               placeholder="Toatǎ țara"
    //               filter={filterData}
    //               data={COUNTIES}
    //               render={(item) => <p className="text-left">{item}</p>}
    //               {...field}
    //             />
    //           </FormItem>
    //         )}
    //       />
    //       <FormField
    //         name="category"
    //         render={(field) => (
    //           <FormItem className="max-w-full">
    //             <ComboBox
    //               placeholder="Toate categoriile"
    //               filter={filterData}
    //               data={OBJECT_CATEGORY}
    //               render={(item) => <p className="text-left">{item}</p>}
    //               {...field}
    //             />
    //           </FormItem>
    //         )}
    //       />
    //     </SearchFormDivision>
    //   </div>
  );
};

export default SearchForm;