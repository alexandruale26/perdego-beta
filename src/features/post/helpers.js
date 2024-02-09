const generateSearchParamsTitle = (searchParams, skipSearchInputValue = false) => {
  if (Object.entries(searchParams).length === 0) {
    return "Toate postǎrile ⁄ Toate categoriile ⁄ Toatǎ țara";
  }

  const arrangedSearchParams = {
    search: searchParams.search,
    postType: searchParams.postType,
    location: searchParams.location,
    category: searchParams.category,
  };

  return Object.entries(arrangedSearchParams).reduce((acc, [key, value]) => {
    if (key === "search") {
      return skipSearchInputValue || value === "" ? acc : acc + value + " ⁄ ";
    }
    if (key === "postType") {
      return value === "" ? acc + "Toate postǎrile" : acc + value;
    }

    if (key === "location") {
      return value === "" ? acc + " ⁄ Toatǎ țara" : acc + " ⁄ " + value;
    }

    if (key === "category") {
      return value === "" ? acc + " ⁄ Toate categoriile" : acc + " ⁄ " + value;
    }

    return "";
  }, "");
};

export default generateSearchParamsTitle;
