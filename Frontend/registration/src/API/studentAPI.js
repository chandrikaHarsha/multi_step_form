import { api } from "../API/api";

console.log(api.baseURL);

// export const createStudent = () => api.post("/student");

export const getStudent = (id) => api.get('/student/draft');

export const saveDraftStep = (id, step, data) =>
  api.put(`/student/draft/${id}`, { step, data });

export const publishStudent = (id) => api.put(`/student/publish/${id}`);
