import { useState, useEffect } from "react";
import SimpleInput from "../../formComponents/SimpleInput";
import ComboBox from "../../formComponents/ComboBox";
import Selector from "../../formComponents/Selector";
import SubmitButton from "../../shared/SubmitButton";
import LinkButton from "../../shared/LinkButton";
import Division from "./Division";
import { Form } from "../../formBase/FormContext";
import { FormField, FormItem } from "../../formComponents/form";
import { LOCATIONS, OBJECT_CATEGORY, POST_TYPE } from "../../utils/sharedData";
import { filterData } from "../../utils/helpers";
import { MagnifyingGlassIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import Info from "../../shared/Info";
import Button from "../../shared/button";

const SearchForm = ({ onSubmit, searchParams, hasSearchParams, isOnMobile, hideFilters, handleHideFilters }) => {
  const [defaultValues, setDefaultValue] = useState({});

  useEffect(() => {
    setDefaultValue({
      search: searchParams.search,
      post_type: searchParams.post_type,
      location: searchParams.location,
      category: searchParams.category,
    });
  }, [searchParams]);

  const handleSubmit = (values) => {
    onSubmit(values);
  };

  const hiddenFiltersApplyedStyle = hideFilters ? "hidden" : "flex";
  const formData = { schema: {}, defaultValues };

  return (
    <Form
      {...formData}
      onSubmit={handleSubmit}
      className="flex flex-col w-full items-start justify-center gap-6 p-4 pb-5 bg-white mx-auto rounded-md shadow-sm"
    >
      <div className="flex flex-col w-full gap-4">
        <Info className="justify-start">
          <p className="text-start text-xs xs:text-sm text-grey-500 font-light">
            Folosește filtrele de cǎutare pentru rezultate mai bune
          </p>
        </Info>

        <Division>
          <FormField
            name="search"
            render={(field) => (
              <FormItem>
                <SimpleInput placeholder="Ce anume cauți?" {...field} maxLength={60} />
              </FormItem>
            )}
          />
          <FormField
            name="post_type"
            render={(field) => (
              <FormItem className={hiddenFiltersApplyedStyle}>
                <Selector aria-label="select post type" values={POST_TYPE} {...field} />
              </FormItem>
            )}
          />
        </Division>

        <Division className={hiddenFiltersApplyedStyle}>
          <FormField
            name="location"
            render={(field) => (
              <FormItem>
                <ComboBox
                  aria-label="select location"
                  placeholder="Toatǎ țara"
                  filter={filterData}
                  data={LOCATIONS}
                  render={(item) => <p className="text-left">{item}</p>}
                  {...field}
                />
              </FormItem>
            )}
          />
          <FormField
            name="category"
            render={(field) => (
              <FormItem>
                <ComboBox
                  aria-label="select object category"
                  placeholder="Toate categoriile"
                  filter={filterData}
                  data={OBJECT_CATEGORY}
                  render={(item) => <p className="text-left">{item}</p>}
                  {...field}
                />
              </FormItem>
            )}
          />
        </Division>
      </div>

      <Division className="w-full gap-4 xsm:gap-8 items-start xsm:items-center">
        <SubmitButton
          aria-label="submit search values"
          className="h-9 w-full xsm:w-56 flex items-center justify-center gap-2"
          type="submit"
        >
          Cǎutare
          <MagnifyingGlassIcon className="w-6 h-6" />
        </SubmitButton>

        <div className="w-full flex items-center justify-between -mb-2">
          {hasSearchParams && (
            <LinkButton
              to={"/"}
              className="shrink-0 p-1 text-sm xs:text-base font-medium text-grey-900 hover:text-rose-500 focus-visible:text-lg"
            >
              Șterge filtrele
            </LinkButton>
          )}

          {isOnMobile && (
            <Button
              aria-label="search posts"
              onClick={handleHideFilters}
              className="w-full flex items-start justify-end -my-2"
            >
              <ChevronUpIcon className={`w-8 h-8 transition-all ${hideFilters ? "rotate-180" : "0"}`} />
            </Button>
          )}
        </div>
      </Division>
    </Form>
  );
};

export default SearchForm;
