const FORM_REGISTER_DATA = "form/registerData";
const FIELD_REGISTER = "field/register";
const FIELD_SET_INVALID = "field/setInvalid";
const FIELD_SET_VALID = "field/setValid";

const INITIAL_STATE = {
  refs: [], //TODO: should remove refs and get the element by name from DOM
  schema: {},
  defaultValues: {},
  fieldsState: {},
};

export default INITIAL_STATE;
export { FORM_REGISTER_DATA, FIELD_REGISTER, FIELD_SET_INVALID, FIELD_SET_VALID };
