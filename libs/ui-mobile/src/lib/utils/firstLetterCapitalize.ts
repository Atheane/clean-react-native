export default (string: string) => {
  try {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  } catch (e) {
    return string;
  }
};
