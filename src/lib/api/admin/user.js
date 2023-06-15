import instance from "../instance";

const index = () => instance.auth.get("/users");
const view = (id) => instance.auth.get(`/user/${id}`);
const store = (data) => instance.auth.post(`/user`, data);
const update = (id, data) => instance.auth.put(`/user/${id}`, data);
const deleted = (id) => instance.auth.delete(`/user/${id}`);
const user = (id) => instance.auth.get("/user")

const apiUser = { index, view, store, update, deleted,user };

export default apiUser
