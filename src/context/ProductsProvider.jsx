import React, { createContext, useContext, useReducer } from "react";
import productsReducer from "../reducer/productsReducer";

const ProductsContext = createContext();
const initialState = {
  search: "",
  showModal: false,
  isDeleteModal: false,
  productID: "",
  sortBy: "ascending",
  user: {
    userID: "",
    userName: "",
    userRole: "",
  },
};

const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  const handleProductsArray = (products) => {
    dispatch({ type: "SET_PRODUCTS_ARRAY", payload: products });
  };

  const handleSearch = (input) => {
    dispatch({ type: "SET_SEARCH", payload: input });
  };
  const handleEmptySearch = (input) => {
    dispatch({ type: "SET_EMPTY_SEARCH", payload: input });
  };

  const handleShowModal = () => {
    dispatch({ type: "SET_SHOW_MODAL" });
  };

  const handleHideModal = () => {
    dispatch({ type: "SET_HIDE_MODAL" });
  };

  const handleIsDeleteModalTrue = () => {
    dispatch({ type: "SET_IS_DELETE_MODAL_TRUE" });
  };
  const handleIsDeleteModalFalse = () => {
    dispatch({ type: "SET_IS_DELETE_MODAL_FALSE" });
  };

  const handleProductID = (productID) => {
    dispatch({ type: "SET_PRODUCT_ID", payload: productID });
  };

  const handleSortBy = (value) => {
    dispatch({ type: "SET_SORT_BY", payload: value });
  };

  const handleUser = (value) => {
    dispatch({ type: "SET_USER_DETAILS", payload: value });
  };

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        handleProductsArray,
        handleSearch,
        handleEmptySearch,
        handleShowModal,
        handleHideModal,
        handleIsDeleteModalTrue,
        handleIsDeleteModalFalse,
        handleProductID,
        handleSortBy,
        handleUser,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

// Custom Hook
export const useProductsContext = () => {
  return useContext(ProductsContext);
};

export default ProductsProvider;
