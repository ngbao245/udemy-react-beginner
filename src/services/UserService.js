// import axios from "axios";
import axios from "./Customize-Axios";

const fetchAllUser = () => {
  return axios.get("/api/users?page=1");
};

export { fetchAllUser };
