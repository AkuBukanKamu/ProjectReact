import instance from "../instance";

const index = () => instance.auth.get("/students");
const view = (id) => instance.auth.get(`/student/${id}`);
const store = (data) => instance.auth.post(`/student`, data);
const update = (id, data) => instance.auth.put(`/student/${id}`, data);
const deleted = (id) => instance.auth.delete(`/student/${id}`);

const apiStudent = { index, view, store, update, deleted };

export default apiStudent
