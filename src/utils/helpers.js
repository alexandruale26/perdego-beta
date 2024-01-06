const imageRandomName = () => {
  return `${Math.floor(Math.random() * 99999999)}-${Math.floor(Math.random() * 99999999)}`;
};

//TODO: change the input data to search to a better type {name:name, value:value}
const removeDiacritics = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const capitalizeFirstLetter = (string) => {
  const trimmedString = string.trim();
  const firstCharToUpper = trimmedString.charAt(0).toUpperCase();

  return firstCharToUpper.concat(trimmedString.slice(1));
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

export { removeDiacritics, capitalizeFirstLetter, imageRandomName, formatPostDate, filterData };
