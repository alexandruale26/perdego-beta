const imageRandomName = (extension) => {
  return `${Math.floor(Math.random() * 99999999)}-${Math.floor(Math.random() * 99999999)}.${extension}`;
};

const removeDiacritics = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const imageUniqueName = (imageType) => {
  const slashPosition = imageType.lastIndexOf("/");
  const type = imageType.slice(slashPosition + 1);

  return imageRandomName(type);
};

export { removeDiacritics, imageUniqueName };
