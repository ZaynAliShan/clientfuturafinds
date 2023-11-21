import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchSingleProduct from "../customHooks/useFetchSingleProduct";
import { Loader } from "../components";
import useSaveChanges from "../customHooks/useSaveChanges";

const UpdateProduct = () => {
  const [sku, setSku] = useState(0);
  const [name, setName] = useState("");
  const [sold, setSold] = useState(0);
  const [onHold, setOnHold] = useState(0);
  const [toCome, setToCome] = useState(0);

  const { productID } = useParams();
  const { mutate } = useSaveChanges();
  const { isLoading, isError, error, data } = useFetchSingleProduct(productID);

  const handleUpdateProductMutation = () => {
    const details = {
      sku,
      name,
      sold: sold || 0,
      onHold: onHold || 0,
      toCome: toCome || 0,
    };
    mutate({ productID, details });
  };

  useEffect(() => {
    setSku(data?.product?.sku || 0);
    setName(data?.product?.name || "");
    setSold(data?.product?.sold || 0);
    setOnHold(data?.product?.onHold || 0);
    setToCome(data?.product?.toCome || 0);
  }, [data]);

  if (isLoading) return <Loader />;
  if (isError) return <h1 className="error">{error?.response?.data?.msg}</h1>;

  return (
    <div className="create-product">
      <div className="wrapper">
        <h1>Update Product</h1>
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
            <h3>Update Product</h3>
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
            <button className="btn" onClick={handleUpdateProductMutation}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
