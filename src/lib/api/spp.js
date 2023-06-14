import instance from "./instance";

const store = (data) => instance.auth.post(`/payment`, data);
const studentThisMonth = () => instance.auth.get(`/students/month`);
const profileTeacher = () => instance.auth.get(`/profile/teacher`);

const apiSpp = { store, studentThisMonth, profileTeacher };

export default apiSpp;
