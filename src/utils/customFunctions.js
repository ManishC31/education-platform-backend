// first alphabet will be capital and others will be in lowercase
export const SentenceCase = (value) => {
  if (!value) {
    return null;
  }

  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

export const CapitalizeWordsOfSentence = (string) => {
  if (!string) return null;
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
