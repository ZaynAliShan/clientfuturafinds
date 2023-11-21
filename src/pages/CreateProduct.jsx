import React, { useState } from "react";
import { Link } from "react-router-dom";
import useCreateProduct from "../customHooks/useCreateProduct";

const CreateProduct = () => {
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [sold, setSold] = useState("");
  const [onHold, setOnHold] = useState("");
  const [toCome, setToCome] = useState("");

  const { isLoading, isError, mutate } = useCreateProduct();

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error...</h1>;

  const handleCreateMutation = () => {
    mutate({ sku, name, sold, onHold, toCome });
    setSku("");
    setName("");
    setSold("");
    setOnHold("");
    setToCome("");
  };

  return (
    <div className="create-product">
      <div className="wrapper">
        <h1>Create Product</h1>
        <Link to="..">
          <h4>Go back to Products</h4>
        </Link>
        <div className="wrapper create-product-wrapper">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="create-product-form"
          >
            <h3>Create Product</h3>
            <div className="sku-container">
              <label htmlFor="sku">SKU</label>
              <input
                type="number"
                name="sku"
                id="sku"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                min={0}
                required
              />
            </div>
            <div className="name-container">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="sold-container">
              <label htmlFor="sold">Sold</label>
              <input
                type="number"
                sold="sold"
                id="sold"
                value={sold}
                onChange={(e) => setSold(e.target.value)}
                min={0}
                required
              />
            </div>
            <div className="onHold-container">
              <label htmlFor="onHold">On Hold</label>
              <input
                type="number"
                sold="onHold"
                id="onHold"
                value={onHold}
                onChange={(e) => setOnHold(e.target.value)}
                min={0}
                required
              />
            </div>
            <div className="toCome-container">
              <label htmlFor="toCome">To Come</label>
              <input
                type="number"
                sold="toCome"
                id="toCome"
                value={toCome}
                onChange={(e) => setToCome(e.target.value)}
                min={0}
                required
              />
            </div>
            <button className="btn" onClick={handleCreateMutation}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
