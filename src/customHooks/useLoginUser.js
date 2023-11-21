import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const REMOTE_SERVER = "api.futurafinds.com"

import { Cookies, useCookies } from "react-cookie";

const loginUser = async (user) => {
  const { data } = await axios.post(
    `${REMOTE_SERVER}/api/v1/auth/login`,
    user,
    {
      withCredentials: true,
    }
  );
  return data.user;
};

const useLoginUser = () => {
  const navigate = useNavigate();
  console.log("up");
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      const [ cookies ] = useCookies([]);
      console.log(JSON.stringify(cookies));
      console.log(cookies.token);
      console.log("PLEASE WORK :(");
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
      console.log("below");
      navigate("/login");
    },
  });
};

export default useLoginUser;
