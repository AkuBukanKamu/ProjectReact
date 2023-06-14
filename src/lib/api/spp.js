import instance from "./instance";

const store = (data) => instance.auth.post(`/payment`, data);
const studentThisMonth = () => instance.auth.get(`/students/month`);

const apiSpp = { store, studentThisMonth };

export default apiSpp;
