const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.payload;
    default:
      return state;
  }
};

export const setFilter = (filter) => {
  console.log("here filer=", filter);
  return {
    type: "SET_FILTER",
    payload: filter,
  };
};

export default filterReducer;
