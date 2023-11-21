import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const REMOTE_SERVER = "https://serverfuturafinds.onrender.com"

const fetchProducts = async () => {
  const { data } = await axios.get(`${REMOTE_SERVER}/api/v1/products`, {
    withCredentials: true,
  });
  console.log(data);
  return data;
};

const useFetchProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};

export default useFetchProducts;
