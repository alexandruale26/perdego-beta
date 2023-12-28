const imageRandomName = (extension) => {
  return `${Math.floor(Math.random() * 99999999)}-${Math.floor(Math.random() * 99999999)}.${extension}`;
};

const removeDiacritics = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const imageUniqueName = (imageType) => {
  const slashPosition = imageType.lastIndexOf("/");
  const type = imageType.slice(slashPosition + 1);

  return imageRandomName(type);
};

const convertPostTypeToRou = (postType) => (postType === "lost" ? "Pierdute" : "Gǎsite");

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

export { removeDiacritics, imageUniqueName, convertPostTypeToRou, formatPostDate };
