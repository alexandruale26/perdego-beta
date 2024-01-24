const imageRandomName = () => {
  return `${Math.floor(Math.random() * 99999999)}-${Math.floor(Math.random() * 99999999)}`;
};

const removeDiacritics = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const capitalizeFirstChar = (string) => string.charAt(0).toUpperCase();

const wordToUppercase = (string, noDiacritics = false) => {
  const trimmedString = string.trim();
  const firstCharToUpper = capitalizeFirstChar(trimmedString);
  const fullString = firstCharToUpper.concat(trimmedString.slice(1));

  return noDiacritics ? removeDiacritics(fullString) : fullString;
};

const capitalizeEachWordFromString = (string) => {
  const words = string.toLowerCase().split(" ");
  const converted = words.map((word) => wordToUppercase(word));
  return converted.join(" ");
};

const formatPostDate = (timestamp) => {
  //TODO: post should be 15 or 30 days available. if 30 days modify the function
  const postDate = new Date(timestamp);
  const today = new Date();

  const todayDay = today.getDate();
  const postDay = postDate.getDate();

  const hours = postDate.getHours();
  const minutes = postDate.getMinutes();

  if (postDay === todayDay) {
    return `Azi la ${hours}:${minutes}`;
  } else if (postDay === todayDay - 1) {
    return `Ieri la ${hours}:${minutes}`;
  } else {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("ro-RO", options).format(postDate);
  }
};

const filterData = (data, search) => {
  return data.filter((value) => {
    const noDiacriticsSearch = removeDiacritics(value);
    const noDiacriticsTarget = removeDiacritics(search);
    return noDiacriticsSearch.toLowerCase().includes(noDiacriticsTarget.toLowerCase());
  });
};

const setDefaultValue = (initialValue) => (initialValue ? initialValue : "");

const getFromLocalStorage = (name) => {
  return localStorage.getItem(name);
};

const saveToLocalStorage = (name, value) => {
  const prevValue = getFromLocalStorage(name);
  const stringifiedValue = typeof value === "string" ? value : value.toString();

  if (prevValue === stringifiedValue) return;
  localStorage.setItem(name, value);
};

const generateErrorMessage = (inputName, minLength, maxLength) => {
  const messageBase = `${inputName} trebuie sǎ conținǎ`;

  if (minLength) return `${messageBase} minim ${minLength}${minLength >= 20 ? " de" : ""} caractere.`;
  if (maxLength) return `${messageBase} maxim ${maxLength}${maxLength >= 20 ? " de" : ""} caractere.`;
};

export {
  removeDiacritics,
  capitalizeFirstChar,
  wordToUppercase,
  imageRandomName,
  formatPostDate,
  filterData,
  setDefaultValue,
  saveToLocalStorage,
  getFromLocalStorage,
  generateErrorMessage,
  capitalizeEachWordFromString,
};
