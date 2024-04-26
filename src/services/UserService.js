// import axios from "axios";
import axios from "./Customize-Axios";

const fetchAllUser = (page) => {
  return axios.get(`/api/users?page=${page}`);
};

export { fetchAllUser };
