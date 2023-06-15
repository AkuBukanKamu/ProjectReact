import instance from "./instance";

const store = (data) => instance.auth.post(`/payment`, data);
const studentThisMonth = () => instance.auth.get(`/students/month`);
const profileTeacher = () => instance.auth.get(`/profile/teacher`);

const pengeluaran = () => instance.auth.get("/expense");
const storePengeluaran = (data) => instance.auth.post(`/expense`, data);
const updatePengeluaran = (id, data) =>
  instance.auth.put(`/expense/${id}`, data);
const deletePengeluaran = (id) => instance.auth.delete(`/expense/${id}`);

const apiSpp = {
  store,
  studentThisMonth,
  profileTeacher,
  pengeluaran,
  storePengeluaran,
  updatePengeluaran,
  deletePengeluaran,
};

export default apiSpp;
