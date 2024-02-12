import { removeDiacritics } from "../../utils/helpers";
import toastNotification from "../../shared/Toasts";
import { NO_INTERNET_ERROR_MESSAGE } from "./apiErrorMessages";

const convertToMatchSearch = (string) => {
  const splittedWords = string.split(" ");
  const noBlankWordsArray = splittedWords.filter((word) => word !== "");

  return noBlankWordsArray.map((word) => {
    const noDiacriticsWord = removeDiacritics(word);

    // supabase syntax for seaching pieces of text
    return `%${noDiacriticsWord}%`;
  });
};

const generateResponse = (status, data, message = null) => ({ status, data, message });

const handleApiAction = (performApiAction, offlineAction = null) => {
  if (window.navigator.onLine === false) {
    toastNotification(NO_INTERNET_ERROR_MESSAGE);
    if (offlineAction !== null) offlineAction();
  } else {
    performApiAction();
  }
};

export { convertToMatchSearch, generateResponse, handleApiAction };
