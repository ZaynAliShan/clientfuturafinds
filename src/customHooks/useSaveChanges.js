import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const REMOTE_SERVER = "api.futurafinds.com"

const saveChanges = async ({ productID, details }) => {
  const { data } = await axios.patch(
    `${REMOTE_SERVER}/api/v1/products/${productID}`,
    details,
    {
      withCredentials: true,
    }
  );
  return data;
};

const useSaveChanges = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveChanges,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Changes Saved Successfully!!!", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.msg, {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/");
    },
  });
};

export default useSaveChanges;
