const generateSearchParamsTitle = (searchParams) => {
  const arrangedSearchParams = {
    postType: searchParams.postType,
    category: searchParams.category,
    location: searchParams.location,
  };

  return Object.entries(arrangedSearchParams).reduce((acc, [key, value]) => {
    if (key === "postType") {
      return value === "" ? acc + "Toate postǎrile" : acc + value;
    }

    if (key === "category") {
      return value === "" ? acc + " / Toate categoriile" : acc + " / " + value;
    }

    if (key === "location") {
      return value === "" ? acc + " / Toatǎ țara" : acc + " / " + value;
    }

    return "";
  }, "");
};

export default generateSearchParamsTitle;
