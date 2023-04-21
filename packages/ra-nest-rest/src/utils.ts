/*transform from RA filter to mongodb filter so nestjs CRUD can handle
from RA frontend can add filter with source = source_gte, source_lte. source_neq
from filter: 
{ date_gte: '2022-09-09', date_lte: '2022-09-30',abc1_neq: '2022-09-30', abc: 1 }
to filter: 
{
  date: { '$gte': '2022-09-09', '$lte': '2022-09-30' },
  abc1: { '$neq': '2022-09-30' },
  abc: 1
}
*/
const filterTransform = (filter) => {
  let newFilter = {};
  for (const [key, value] of Object.entries(filter)) {
    const includeOptions =
      key.includes("_gte") ||
      key.includes("_gt") ||
      key.includes("_lte") ||
      key.includes("_lt") ||
      key.includes("_ne");
    if (key.includes("_") && includeOptions) {
      let [field, operator] = key.split("_");
      newFilter.hasOwnProperty(field)
        ? (newFilter[field] = { ...newFilter[field], ["$" + operator]: value })
        : (newFilter[field] = { ["$" + operator]: value });
    } else {
      newFilter[key] = value;
    }
  }
  return newFilter;
};

const localStorageManager = {
  removeItems: () => {
    localStorage.removeItem("username");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("fullName");
    localStorage.removeItem("refreshToken");
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
  },
  setItems: (username, accessToken, refreshToken, fullName) => {
    localStorage.setItem("username", username);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("fullName", fullName);
  },

  setItem: (key, value) => {
    localStorage.setItem(key, value);
  },

  getItems: () => ({
    username: localStorage.getItem("username"),
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
    fullName: localStorage.getItem("fullName"),
  }),
  getItem: (key) => localStorage.getItem(key),
};

export { filterTransform, localStorageManager };
