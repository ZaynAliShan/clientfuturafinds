import React from "react";
import { useProductsContext } from "../context/ProductsProvider";

const Filters = () => {
  const { sortBy, handleSortBy } = useProductsContext();

  return (
    <div className="filters-container">
      <label htmlFor="filters" className="filters-label">
        Sort By:
      </label>
      <select
        className="filter-select btn"
        name="filters"
        id="filters"
        value={sortBy}
        onChange={(e) => handleSortBy(e.target.value)}
      >
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
      </select>
    </div>
  );
};

export default Filters;
