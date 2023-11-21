import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const REMOTE_SERVER = "api.futurafinds.com"

const logoutUser = async () => {
  return await axios.get(`${REMOTE_SERVER}/api/v1/auth/logout`, {
    withCredentials: true,
  });
};

const useLogoutUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.clear();
      toast.success("User logged out successfully!!!", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.msg, {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/login");
    },
  });
};

export default useLogoutUser;
