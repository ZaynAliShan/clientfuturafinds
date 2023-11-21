import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { Loader, DisplayAllProducts, Form, Filters } from "../components";
import { Link } from "react-router-dom";
import { useProductsContext } from "../context/ProductsProvider";
import { useQuery } from "@tanstack/react-query";
const REMOTE_SERVER = "api.futurafinds.com"


const AllProducts = () => {
  const { data, isLoading, isFetching, isError, error } = useQuery({
  queryKey: ["products"],
  queryFn: async () => {
    await axios.get(
      `${REMOTE_SERVER}/api/v1/products`,
      {
        withCredentials: true,
      }
    )},
  });
  const { sortBy, user, handleUser, handleSortBy } = useProductsContext();
  console.log(data);
  console.log(JSON.stringify(data));
  useEffect(() => {
    handleUser(data?.user);
  }, [data]);

  if (isLoading) return <Loader />;
  if (isFetching) return;
  if (isError) return <h1>{error?.response?.data?.msg}</h1>;

  if (!data) {
    return <h1>Waiting...</h1>;
  }

  return (
    <div className="products">
      <div className="products-sub-container">
        <h1>All Products</h1>
        <div className="plus-icon-container">
          <button>
            {user?.userRole === "admin" && (
              <Link to="/createProduct" className=" btn create-btn">
                <span>Add new Product</span>
                <FaPlus className="plus-icon" />
              </Link>
            )}
          </button>
        </div>
        <Form />
        <Filters />
        <DisplayAllProducts products={data.products} />
      </div>
    </div>
  );
};

export default AllProducts;