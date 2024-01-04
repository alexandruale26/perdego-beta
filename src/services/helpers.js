import { removeDiacritics } from "../utils/helpers";

const convertToMatchSearch = (string) => {
  const splittedWords = string.split(" ");
  const noBlankWordsArray = splittedWords.filter((word) => word !== "");

  return noBlankWordsArray.map((word) => {
    const noDiacriticsWord = removeDiacritics(word);
    return `%${noDiacriticsWord}%`;
  });
};

export { convertToMatchSearch };
