import instance from "../instance";

const index = () => instance.auth.get("/users");
const view = (id) => instance.auth.get(`/user/${id}`);
const store = (data) => instance.auth.post(`/user`, data);
const update = (id, data) => instance.auth.put(`/user/${id}`, data);
const deleted = (id) => instance.auth.delete(`/user/${id}`);
const user = (id) => instance.auth.get("/user");
const chart = () => instance.auth.get(`/chart`);

const monthOptions = () => instance.auth.get(`/monthOptions`);
const income = (data) => instance.auth.get(`/income?month=${data}`);

const apiUser = {
  index,
  view,
  store,
  update,
  deleted,
  user,
  income,
  chart,
  monthOptions,
};

export default apiUser;
