import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductsProvider from "./context/ProductsProvider.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <ToastContainer />
    <ProductsProvider>
      <App />
    </ProductsProvider>
  </QueryClientProvider>
);
