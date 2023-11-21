const productsReducer = (state, action) => {
  if (action.type === "SET_PRODUCTS_ARRAY") {
    return { ...state, productsArray: action.payload };
  }

  if (action.type === "SET_SEARCH") {
    return { ...state, search: action.payload };
  }

  if (action.type === "SET_EMPTY_SEARCH") {
    return { ...state, search: action.payload };
  }

  if (action.type === "SET_SHOW_MODAL") {
    return { ...state, showModal: true };
  }

  if (action.type === "SET_HIDE_MODAL") {
    return { ...state, showModal: false };
  }

  if (action.type === "SET_IS_DELETE_MODAL_TRUE") {
    return { ...state, isDeleteModal: true };
  }

  if (action.type === "SET_IS_DELETE_MODAL_FALSE") {
    return { ...state, isDeleteModal: false };
  }

  if (action.type === "SET_PRODUCT_ID") {
    return { ...state, productID: action.payload };
  }

  if (action.type === "SET_SORT_BY") {
    return { ...state, sortBy: action.payload };
  }

  if (action.type === "SET_USER_DETAILS") {
    return { ...state, user: action.payload };
  }

  return { ...state };
};

export default productsReducer;
