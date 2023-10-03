import axios from "axios";
import { Task } from "@/types/index";

const instance = axios.create({
  baseURL: `http://localhost:3000/api/`,
  withCredentials: true,
});

export async function axiosPost(route: string, body = {}) {
  return await instance
    .post(`${route}`, body)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
}
export async function axiosPut(route: string, body = {}) {
    return await instance
      .put(`${route}`, body)
      .then(({ data }) => {
        return data;
      })
      .catch((error) => {
        throw error;
      });
  }
export async function axiosGet(route: string) {
    return await instance
      .get(`${route}`)
      .then(({ data }) => {
        return data;
      })
      .catch((error) => {
        throw error;
      });
}
async function axiosDelete(route: string) {
    return await instance
      .delete(route)
      .then(({ data }) => {
        return data;
      })
      .catch((error) => {
        throw error;
      });
  }
  export async function dbgetTask() {
    return await axiosGet(`/task`);
  }
  export async function dbaddTask(task:Task) {
    return await axiosPost(`/task`,task );
  }
  export async function dbupdateTask(id:string,task:Task) {
    return await axiosPut(`/task/${id}`,task);
  }
  export async function dbdeleteTask(id:string) {
    return await axiosDelete(`/task/${id}`);
  }