import React from "react";
import useDeleteProduct from "../customHooks/useDeleteProduct";
import { useProductsContext } from "../context/ProductsProvider";

const Modal = () => {
  const { productID, handleHideModal } = useProductsContext();
  const { mutate: deleteProduct } = useDeleteProduct();

  const handleDeleteMutation = () => {
    deleteProduct(productID);
    handleHideModal();
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <h3>Are you sure you want to delete this product?</h3>
        <div className="btns-container">
          <button className="btn" onClick={handleDeleteMutation}>
            Delete
          </button>
          <button className="modal-btn" onClick={handleHideModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
