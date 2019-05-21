function getFilledParams(params) {
  const filledParams = {};
  Object.entries(params).forEach(entry => {
    const [key, value] = entry;
    if (value) {
      filledParams[key] = value;
    }
  });
  return filledParams;
}

export default getFilledParams;