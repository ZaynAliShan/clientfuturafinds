import React from "react";
import useSaveChanges from "../customHooks/useSaveChanges";
import { useProductsContext } from "../context/ProductsProvider";

const ModalSaveChanges = ({ products }) => {
  const { productID, handleHideModal } = useProductsContext();
  const { mutate: saveChanges } = useSaveChanges();

  const productToBeSaved = products.filter(
    (product) => product._id === productID
  );
  const { sku, name, onHold, sold, toCome } = productToBeSaved[0];

  const handleSaveChangesMutation = () => {
    const details = { sku, name, onHold, sold, toCome };
    saveChanges({ productID, details });
    handleHideModal();
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <h3>Are you sure you want to save these changes?</h3>
        <div className="btns-container">
          <button className="btn" onClick={handleSaveChangesMutation}>
            Save Changes
          </button>
          <button className="modal-btn" onClick={handleHideModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSaveChanges;
