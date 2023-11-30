const FORM_REGISTER_DATA = "form/registerData";
const FIELD_REGISTER = "field/register";
const FIELD_REGISTER_ERROR = "field/registerError";
const FIELD_SET_VALIDITY = "field/setValidity";

const INITIAL_STATE = {
  refs: [],
  schema: {},
  defaultValues: {},
  fieldsState: {},
  delayError: 0,
};

export default INITIAL_STATE;
export { FORM_REGISTER_DATA, FIELD_REGISTER, FIELD_REGISTER_ERROR, FIELD_SET_VALIDITY };
