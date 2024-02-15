import ImageSelect from "../../formComponents/ImageSelect";
import ValidationInput from "../../formComponents/ValidationInput";
import Textarea from "../../formComponents/Textarea";
import { Form } from "../../formBase/FormContext";
import { FormField, FormItem, FormMessage, FormLabel } from "../../formComponents/form";
import ComboBox from "../../formComponents/ComboBox";
import Selector from "../../formComponents/Selector";
import { LOCATIONS, OBJECT_CATEGORY, POST_TYPE } from "../../utils/sharedData";
import { filterData } from "../../utils/helpers";
import SubmitButton from "../../shared/SubmitButton";

const FormContent = ({ formData, handleOnSubmit, submitButtonTitle = null }) => {
  const title = submitButtonTitle ? submitButtonTitle : "Publicǎ anunțul";

  return (
    <Form {...formData} onSubmit={handleOnSubmit} className="space-y-5 w-full">
      <FormField
        name="title"
        render={(field) => (
          <FormItem>
            <FormLabel>Titlu</FormLabel>
            <ValidationInput placeholder="ex.: Portofel bǎrbǎtesc de culoare maro" {...field} />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="image"
        render={(field) => (
          <FormItem>
            <FormLabel>
              Imagine<span className="font-light"> (Opțional)</span>
            </FormLabel>
            <ImageSelect imageUrl={formData.defaultValues.imageUrl} {...field} />
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
        name="post_type"
        render={(field) => (
          <FormItem>
            <FormLabel>Categorie anunț</FormLabel>
            <Selector values={POST_TYPE} {...field} />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="category"
        render={(field) => (
          <FormItem>
            <FormLabel>Categorie obiect</FormLabel>
            <ComboBox
              placeholder="Cautǎ dupǎ categorie"
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
            <FormLabel>Locație</FormLabel>
            <ComboBox
              placeholder="Cautǎ dupǎ județ sau sector"
              filter={filterData}
              data={LOCATIONS}
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
        <SubmitButton className="h-12 w-full mt-10">{title}</SubmitButton>
      </div>
    </Form>
  );
};

export default FormContent;
