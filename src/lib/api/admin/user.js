import instance from "../instance";

const index = () => instance.auth.get("/users");
const view = (id) => instance.auth.get(`/user/${id}`);
const store = (data) => instance.auth.post(`/user`, data);
const update = (id, data) => instance.auth.put(`/user/${id}`, data);
const deleted = (id) => instance.auth.delete(`/user/${id}`);
const user = (id) => instance.auth.get("/user");

const income = () => instance.auth.get(`/income`);

const apiUser = { index, view, store, update, deleted, user, income };

export default apiUser;
