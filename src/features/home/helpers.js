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

export { getAllSearchParamsAsObject, showSearchResultsTitle };
