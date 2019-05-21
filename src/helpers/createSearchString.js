function createSearchString(paramsObj) {
  let searchString = `?`;
  const filters = Object.keys(paramsObj).map(key => {
    return `${key}=${paramsObj[key]}`;
  });
  console.log(filters);
  searchString += filters.join("&");
  return searchString;
}

export default createSearchString;
