import { getFromLocalStorage } from "../../utils/helpers";
import { GRID_STORAGE_NAME } from "./data";

const minWidth = 480;

const isLayoutChangeAllowed = () => window.innerWidth >= minWidth;

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

  return `Am gǎsit ${postsLength} ${postsLength === 1 ? "anunț" : "anunțuri"}`;
};

export { getAllSearchParamsAsObject, showSearchResultsTitle, isLayoutChangeAllowed, getGridModeFromStorage };
