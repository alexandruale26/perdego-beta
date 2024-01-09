const minWidth = 480;
const GRID_STORAGE_NAME = "layout";

const isLayoutChangeAllowed = () => window.innerWidth >= minWidth;

const getFromLocalStorage = (name) => {
  return localStorage.getItem(name);
};

const saveToLocalStorage = (name, value) => {
  const prevValue = getFromLocalStorage(name);
  const stringifiedValue = typeof value === "string" ? value : value.toString();

  if (prevValue === stringifiedValue) return;
  localStorage.setItem(name, value);
};

const getGridModeFromStorage = () => {
  const isInStorage = getFromLocalStorage(GRID_STORAGE_NAME);

  if (isInStorage === null || isInStorage === "false") return false;
  return true;
};

const getAllSearchParamsAsObject = (searchParams) => {
  return Array.from(searchParams.entries()).reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
};

const showSearchResultsTitle = (hasSearchParams, postsLength) => {
  if (postsLength < 1) return "Niciun rezultat :(";
  if (!hasSearchParams) return "Cele mai recente anunțuri";

  return `Am gǎsit ${postsLength} anunțuri`;
};

export {
  getAllSearchParamsAsObject,
  showSearchResultsTitle,
  isLayoutChangeAllowed,
  saveToLocalStorage,
  getGridModeFromStorage,
  GRID_STORAGE_NAME,
};
