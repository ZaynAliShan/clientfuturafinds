import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const REMOTE_SERVER = "api.futurafinds.com"

const deleteProduct = async (productID) => {
  return await axios.delete(
    `${REMOTE_SERVER}/api/v1/products/${productID}`,
    { withCredentials: true }
  );
};

const useDeleteProduct = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully!!!", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.msg?.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/");
    },
  });
};

export default useDeleteProduct;
