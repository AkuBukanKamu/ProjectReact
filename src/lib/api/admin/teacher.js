import instance from "../instance";

const index = () => instance.auth.get("/teachers");
const listTeacherByUnit = (unit) => instance.auth.get(`/teachers/unit/${unit}`);
const view = (id) => instance.auth.get(`/teacher/${id}`);
const update = (id, data) => instance.auth.put(`/teacher/${id}`, data);
const deleted = (id) => instance.auth.delete(`/teacher/${id}`);

export const apiTeacher = { index, listTeacherByUnit, view, update, deleted };
