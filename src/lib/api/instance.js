import axios from "axios";
import baseURl from "../../config";

const api = baseURl + "/api";

const noAuth = axios.create({
  baseURL: api,
  "Access-Control-Allow-Origin": "*",
  withCredentials: true,
});

const auth = axios.create({
  baseURL: api,
  headers: {
    Content_Type: "application/json",
    authorization: "Bearer " + localStorage.getItem("token"),
  },
});

const authwithFile = axios.create({
  baseURL: api,
  headers: {
    Content_Type: "multipart/form-data",
    authorization: "Bearer " + localStorage.getItem("token"),
  },
});

const instance = {
  noAuth,
  auth,
  authwithFile,
};

export default instance;