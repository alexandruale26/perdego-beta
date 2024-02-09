import { removeDiacritics } from "../../utils/helpers";

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

export { convertToMatchSearch, generateResponse };
