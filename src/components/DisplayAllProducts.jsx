import React, { useState } from "react";
import { useProductsContext } from "../context/ProductsProvider";
import Modal from "./Modal";
import { FaEdit, FaPlus, FaMinus, FaCheckSquare } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import ModalSaveChanges from "./ModalSaveChanges";
import ColumnsHeadings from "./ColumnsHeadings";

const DisplayAllProducts = ({ products }) => {
  const {
    user,
    search,
    showModal,
    sortBy,
    isDeleteModal,
    handleShowModal,
    handleProductID,
    handleIsDeleteModalTrue,
    handleIsDeleteModalFalse,
  } = useProductsContext();
  const [productsArray, setProductsArray] = useState(products);

  const handleIncrement = (productID) => {
    const newProductsArray = productsArray.map((product) => {
      if (product._id === productID) {
        const newOnHold = product.onHold + 1;
        return { ...product, onHold: newOnHold };
      }
      return { ...product };
    });
    setProductsArray(newProductsArray);
  };

  const handleDecrement = (productID) => {
    const newProductsArray = productsArray.map((product) => {
      if (product._id === productID && product.onHold > 0) {
        const newOnHold = product.onHold - 1;
        const newSold = product.sold + 1;
        return { ...product, onHold: newOnHold, sold: newSold };
      }
      return { ...product };
    });
    setProductsArray(newProductsArray);
  };

  let filteredProducts = productsArray
    .filter(
      (product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "ascending") {
        return a.name.toLowerCase().localeCompare(b.name);
      } else {
        return b.name.toLowerCase().localeCompare(a.name);
      }
    });

  return (
    <div className="wrapper products-wrapper">
      {!showModal ? (
        <table>
          <caption>{filteredProducts.length} products in the inventory</caption>
          <tbody>
            <ColumnsHeadings />
            {filteredProducts.map((product) => {
              const { _id, sku, name, onHold, sold, toCome } = product;
              return (
                <tr key={_id} className="product">
                  <td datatype="sku">{sku}</td>
                  <td datatype="name">{name}</td>
                  <td datatype="onHold">{onHold}</td>
                  <td datatype="sold">{sold}</td>
                  <td datatype="toCome">{toCome}</td>
                  <td datatype="edit">
                    <button className="edit-btn">
                      {user?.userRole === "admin" ? (
                        <Link to={`/updateProduct/${_id}`}>
                          <FaEdit />
                        </Link>
                      ) : (
                        <span>
                          <FaEdit />
                        </span>
                      )}
                    </button>
                  </td>
                  <td datatype="delete">
                    <button
                      className="delete-btn"
                      disabled={user?.userRole !== "admin"}
                      onClick={() => {
                        handleProductID(_id);
                        handleShowModal();
                        handleIsDeleteModalTrue();
                      }}
                    >
                      <ImCross />
                    </button>
                  </td>

                  <td datatype="increment">
                    <button
                      className="plus-btn"
                      disabled={user?.userRole !== "admin"}
                      onClick={() => handleIncrement(_id)}
                    >
                      <FaPlus />
                    </button>
                  </td>
                  <td datatype="decrement">
                    <button
                      className="minus-btn"
                      disabled={user?.userRole !== "admin"}
                      onClick={() => handleDecrement(_id)}
                    >
                      <FaMinus />
                    </button>
                  </td>
                  <td datatype="saveChanges">
                    <button
                      className="save-btn"
                      disabled={user?.userRole !== "admin"}
                      onClick={() => {
                        handleProductID(_id);
                        handleShowModal();
                        handleIsDeleteModalFalse();
                      }}
                    >
                      <FaCheckSquare />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : isDeleteModal ? (
        <Modal />
      ) : (
        <ModalSaveChanges products={productsArray} />
      )}
    </div>
  );
};

export default DisplayAllProducts;
