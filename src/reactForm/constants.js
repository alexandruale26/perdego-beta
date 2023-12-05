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

const COUNTIES = [
  "Alba",
  "Arad",
  "Argeș",
  "Bacău",
  "Bihor",
  "Bistrița-Năsăud",
  "Botoșani",
  "Brăila",
  "Brașov",
  "Buzău",
  "Călărași",
  "Caraș-Severin",
  "Cluj",
  "Constanța",
  "Covasna",
  "Dâmbovița",
  "Dolj",
  "Galați",
  "Giurgiu",
  "Gorj",
  "Harghita",
  "Hunedoara",
  "Ialomița",
  "Iași",
  "Ilfov",
  "Maramureș",
  "Mehedinți",
  "Mureș",
  "Neamț",
  "Olt",
  "Prahova",
  "Sălaj",
  "Satu Mare",
  "Sibiu",
  "Suceava",
  "Teleorman",
  "Timiș",
  "Tulcea",
  "Vâlcea",
  "Vaslui",
  "Vrancea",
  "Sectorul 1",
  "Sectorul 2",
  "Sectorul 3",
  "Sectorul 4",
  "Sectorul 5",
  "Sectorul 6",
];

export default INITIAL_STATE;
export { FORM_REGISTER_DATA, FIELD_REGISTER, FIELD_REGISTER_ERROR, FIELD_SET_VALIDITY, COUNTIES };
