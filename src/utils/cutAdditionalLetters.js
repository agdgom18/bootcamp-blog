const cutLetter = (word) => {
  if (word.length > 55) {
    const result = word.slice(0, 30) + '.' + word.split('.').pop();
    return result;
  }

  return word;
};
export default cutLetter;
